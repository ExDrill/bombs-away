import { world, PlayerInteractWithEntityAfterEvent } from '@minecraft/server'
import { ActionFormData } from '@minecraft/server-ui'


export default class ShopEntity {

    public static initialize(): void {
        world.afterEvents.playerInteractWithEntity.subscribe(this.onPlayerInteractWithEntityAfter.bind(this))
    }

    private static async onPlayerInteractWithEntityAfter(event: PlayerInteractWithEntityAfterEvent): Promise<void> {
        const target = event.target

        if (target.typeId != 'bombs_away:shop') return

        const player = event.player
        const form = this.createForm()

        const response = await form.show(player)
    }


    private static createForm(): ActionFormData {
        const data = new ActionFormData()

        data.title('Shop')
        data.button('Sword x 1' + '\n' + '§q5 Emeralds', 'textures/items/wood_sword')
        data.button('Bomb x 1' + '\n' + '§q10 Emeralds', 'textures/items/bomb')
        data.button('Wool x 16' + '\n' + '§q2 Emeralds', 'textures/blocks/wool_colored_white')

        return data
    }
}