import Item from "./item.model"

/**
 * Double linked list for managing items
 */
export default class Items {
    private map: object = {}
    private head: Item
    private tail: Item

    /**
     * Put item to the head. If key already exists, the data is replaced.
     * @param key
     * @param data
     */
    public put(key: string, data: any) {
        const newItem = new Item(key, data)
        if (this.head == null) { // list is empty
            this.head = newItem
            this.tail = newItem
        } else { // Add before head
            newItem.next = this.head
            this.head.prev = newItem
            this.head = this.head.prev
        }
        this.map[key] = this.head
    }

    /**
     * @param key of searching item
     * @return data associated with the given key if such found, otherwise return null
     */
    public get(key: string): any {
        const item = this.map[key]
        if (item === undefined) return null
        return item.data
    }

    /**
     * Remove one tail element if map isn't empty
     */
    public removeOldest(): void {
        if (this.isEmpty()) return
        delete this.map[this.tail.key]
        console.log(`Removed oldest item ${this.tail.key}`)
        this.tail = this.tail.prev
        if (this.tail === null)
            this.head = null
        else
            this.tail.next = null
    }

    /**
     * Remove data associated with the given key
     * @param key
     * @return true if key found, otherwise false
     */
    public remove(key: string): boolean {
        if (this.isEmpty()) return false
        const item: Item = this.map[key]
        if (!item) return false
        if (item.prev != null) {
            item.prev.next = item.next
        }
        if (item.next != null) {
            item.next.prev = item.prev
        }
        if (this.tail === item) this.tail = item.prev
        if (this.head === item) this.head = item.next
        delete this.map[item.key]
        return true
    }

    /**
     * Check if key exists
     * @param key
     */
    public contains(key: string): boolean {
        return this.map.hasOwnProperty(key)
    }

    public isEmpty(): boolean {
        return this.head == null
    }


    // Below methods are for testing

    public size(): number {
        return Object.keys(this.map).length
    }

    public getMap(): object{
        return this.map
    }

    public toString(): string {
        let str: string = '{'
        if (this.isEmpty()) {
            str += 'empty'
        } else {
            let pointer: Item = this.head
            do {
                str += '['
                if (this.head === pointer) {
                    str += 'head -> '
                }
                if (this.tail === pointer) {
                    str += 'tail -> '
                }
                str += pointer.key + '] '
                pointer = pointer.next
            } while (pointer != null)
        }
        str += '}'
        return str
    }
}