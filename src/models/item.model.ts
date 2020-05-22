export default class Item {
    key: string
    data: object
    next: Item
    prev: Item

    constructor(key: string, data: object) {
        this.key = key
        this.data = data
        this.next = null
        this.prev = null
    }
}