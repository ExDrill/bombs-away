import { world, Player, TitleDisplayOptions } from '@minecraft/server'

export default class ScreenDisplayUtils {

    /**
     * Displays a message on the action bar to a group of players.
     * 
     * @param message The message to display.
     * @param targets The list of players to target.
     */
    public static setActionBar(message: string, targets: Player[] = world.getAllPlayers()) {
        for (const player of targets) {
            player.onScreenDisplay.setActionBar(message)
        }
    }

    /**
     * Displays a title message to a group of players.
     * 
     * @param title The title to display.
     * @param targets The list of players to target.
     */
    public static setTitle(title: string, targets: Player[] = world.getAllPlayers()) {
        for (const player of targets) {
            player.onScreenDisplay.updateSubtitle('') // clear the subtitle.
            player.onScreenDisplay.setTitle(title)
        }
    }


    /**
     * Displays a title message to a group of players.
     * 
     * @param title The title to display.
     * @param options Additional settings.
     * @param targets The list of players to target.
     */
    public static setAdvancedTitle(title: string, options: TitleDisplayOptions, targets: Player[] = world.getAllPlayers()) {
        for (const player of targets) {
            player.onScreenDisplay.updateSubtitle('') // clear the subtitle.
            player.onScreenDisplay.setTitle(title, options)
        }
    }

    /**
     * Displays a title message with a subtitle to a group of players.
     * 
     * @param title The title to display.
     * @param subtitle The subtitle to display.
     * @param targets The list of players to target.
     */
    public static setTitleWithSubtitle(title: string, subtitle: string, targets: Player[] = world.getAllPlayers()) {
        for (const player of targets) {
            player.onScreenDisplay.updateSubtitle(subtitle)
            player.onScreenDisplay.setTitle(title)
        }
    }
}