import { world, PlayerInteractWithEntityAfterEvent, Player } from '@minecraft/server'
import { ActionFormData } from '@minecraft/server-ui'
import { SHOP_OFFERS } from '../constants'
import PlayerUtils from '../util/PlayerUtils'

export default class Shop {

    public static initialize(): void {
        world.afterEvents.playerInteractWithEntity.subscribe(this.onPlayerInteractWithEntityAfter.bind(this))
    }

    private static async onPlayerInteractWithEntityAfter(event: PlayerInteractWithEntityAfterEvent): Promise<void> {
        const target = event.target

        if (target.typeId != 'bombs_away:shop') return

        const player = event.player
        const form = this.createForm()

        const response = await form.show(player)
        
        if (response.canceled) return

        this.purchase(player, response.selection)
    }

    private static purchase(player: Player, selection: number): void {
        const team = player.getProperty('bombs_away:team') as number
        const container = PlayerUtils.getContainer(player)
        const offer = SHOP_OFFERS[selection]
        
        let emeraldCount = 0

        for (let i = 0; i < container.size; i++) {
            const stack = container.getItem(i)
            if (!stack) continue

            if (stack.typeId == 'minecraft:emerald') {
                emeraldCount += stack.amount
            }
        }
        if (emeraldCount < offer.cost) {
            player.sendMessage('You cannot afford this item!')
            return
        }
        
        player.runCommand(`clear @s emerald 0 ${offer.cost}`)
        player.runCommand(`give @s ${offer.item[team]} ${offer.count}`)
    }

    private static createForm(): ActionFormData {
        const data = new ActionFormData()
        data.title('Shop')

        for (const offer of SHOP_OFFERS) {
            data.button(`${offer.displayName} x ${offer.count}\n${offer.cost} Emeralds`, offer.iconTexture)
        }
        return data
    }
}