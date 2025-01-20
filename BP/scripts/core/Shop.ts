import { world, PlayerInteractWithEntityAfterEvent, Player } from '@minecraft/server'
import { ActionFormData } from '@minecraft/server-ui'
import { DIMENSION, SHOP_OFFERS, EMERALD_SPAWNERS } from '../constants'
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
        
        if (response.selection == SHOP_OFFERS.length) {
            this.upgradeEmeraldSpawner(player)
            return
        }
        this.purchaseItem(player, response.selection)
    }

    private static upgradeEmeraldSpawner(player: Player): void {
        const team = player.getProperty('bombs_away:team') as number

        // Search for the emerald spawner
        const emeraldSpawner = DIMENSION.getEntities({
            type: 'bombs_away:emerald_spawner',
            propertyOptions: [
                {
                    propertyId: 'bombs_away:team',
                    value: {
                        equals: team
                    }
                }
            ]
        })[0]

        if (!emeraldSpawner) return

        const level = emeraldSpawner.getProperty('bombs_away:level') as number
        
        if (level >= 2) {
            player.sendMessage('Emerald Spawner has reached its max upgrade!')
            return
        }
        if (this.spendEmeralds(player, 25)) {
            player.sendMessage('Emerald Spawner has been upgraded!')
            emeraldSpawner.setProperty('bombs_away:level', level + 1)
            emeraldSpawner.triggerEvent(`bombs_away:switch_to_level_${level}`)
        }
    }

    private static purchaseItem(player: Player, selection: number): void {
        const team = player.getProperty('bombs_away:team') as number
        const offer = SHOP_OFFERS[selection]
        
        if (this.spendEmeralds(player, offer.cost)) {
            player.runCommand(`give @s ${offer.item[team]} ${offer.count}`)
        }
        
    }

    private static spendEmeralds(player: Player, cost: number): boolean {
        const container = PlayerUtils.getContainer(player)
        let emeraldCount = 0

        for (let i = 0; i < container.size; i++) {
            const stack = container.getItem(i)
            if (!stack) continue

            if (stack.typeId == 'minecraft:emerald') {
                emeraldCount += stack.amount
            }
        }
        if (emeraldCount < cost) {
            player.sendMessage('You cannot afford that!')
            return false
        }
        player.runCommand(`clear @s emerald 0 ${cost}`)
        return true
    }

    private static createForm(): ActionFormData {
        const data = new ActionFormData()
        data.title('Shop')

        for (const offer of SHOP_OFFERS) {
            data.button(`${offer.displayName} x ${offer.count}\n${offer.cost} Emeralds`, offer.iconTexture)
        }
        data.button('Upgrade Emerald Spawner\n25 Emeralds', 'textures/items/emerald')

        return data
    }
}