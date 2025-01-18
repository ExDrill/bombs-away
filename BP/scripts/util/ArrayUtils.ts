
export default class ArrayUtils {

    /**
     * Sorts an array in a random order and returns a new one.
     * @param list The array to shuffle
     */
    public static shuffle<T>(list: T[]): T[] {
        const newList = list

        for (let i = 0; i < list.length; i++) {
            let randI = Math.floor(Math.random() * i)
            const value = newList[i]

            newList[i] = newList[randI]
            newList[randI] = value
        }
        return newList
    }
}