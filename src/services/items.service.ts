import * as shortid from 'shortid'
import config from '../config/config'
import * as cron from 'node-cron'
import Items from '../models/items.model'

export default class ItemsService {
    private readonly items: Items
    private heapUsed: number
    constructor() {
        this.items = new Items()
        // Check memory state every ~5 sec
        cron.schedule('*/5 * * * * *', () => {
            this.heapUsed = process.memoryUsage().heapUsed
        })
    }

    private generateUniqueKey(): string {
        let key: string
        do {
            key = shortid.generate()
        } while (this.items.contains(key)) // check that key does not exist yet
        return key
    }

    /**
     * Cache new object and return assigned key. If we've reached memory limit, remove the oldest
     * item from cache before adding the new one (we can think of a better approach taking in account sizes of adding
     * and removing objects).
     *
     * If for some reason memory limit is reached, but cache is empty, return null assuming controller will handle it and
     * return 507 (Insufficient Storage).
     *
     * @param data object to store in cache
     * @return key of added object or null if
     */
    public add(data: object): string {
        if (this.memoryLimitReached()) {
            if (this.items.isEmpty()) return null
            // Currently least recently added order is used, can be optimized. For example, to least recently used (LRU),
            // least frequently used (LFU) or least frequent recently used (LFRU).
            this.items.removeLeastRecentlyAdded()
        }
        // This can be optimized by generating keys in advance when server is not too busy
        const key = this.generateUniqueKey()
        this.items.put(key, data)
        return key
    }

    public memoryLimitReached(): boolean {
        return this.heapUsed > config.MEMORY_LIMIT
    }

    /**
     * @param key
     * @return object if found, otherwise return undefined
     */
    public get(key: string): object {
        return this.items.get(key)
    }


    /**
     * @param key unique id of removing object
     * @return true if object is found and removed, otherwise false
     */
    public remove(key: string): boolean {
        return this.items.remove(key)
    }

    // Below methods used for testing

    public getAll(): object {
        const map: object = this.items.getMap()
        const result: object = {}
        Object.keys(map).forEach(key =>{
            result[key] = map[key].data
        })
        return result
    }
}
