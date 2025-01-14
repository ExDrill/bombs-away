import { world, Player, RawMessage } from '@minecraft/server'

export default class ScreenDisplayUtils {

    /**
     * Displays a message on the action bar to a group of players.
     * 
     * @param message The message to display.
     * @param targets The list of players to target.
     */
    public static setActionBar(message: string | RawMessage, targets: Player[] = world.getAllPlayers()) {
        for (const player of targets) {
            player.onScreenDisplay.setActionBar(message)
        }
    }

    /**
     * Displays a title message to a group of players.
     * 
     * @param message The message to display.
     * @param targets The list of players to target.
     */
    public static setTitle(message: string | RawMessage, targets: Player[] = world.getAllPlayers()) {
        for (const player of targets) {
            player.onScreenDisplay.setTitle(message)
        }
    }
}