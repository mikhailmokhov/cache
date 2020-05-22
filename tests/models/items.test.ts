import {expect} from 'chai'
import Items from "../../src/models/items.model";


// Items class should be tested to make sure it works as expected
// console.log(items.toString()) can be used to see current list state

describe('calculate', function () {

    it('put new elements', function () {
        let items = new Items()
        expect(items.isEmpty()).true
        items.put("key1", "obj1")
        items.put("key2", "obj2")
        items.put("key3", "obj3")
        expect(items.size()).equals(3)
        expect(items.isEmpty()).false
        expect(items.contains("key1")).true
        expect(items.contains("key2")).true
        expect(items.contains("key3")).true
        expect(items.get("key1")).equals('obj1')
        expect(items.get("key2")).equals('obj2')
        expect(items.get("key3")).equals('obj3')
    })

    it('remove old elements', function () {
        let items = new Items()
        items.put("key1", "obj1")
        items.put("key2", "obj2")
        items.put("key3", "obj3")
        expect(items.size()).equals(3)
        expect(items.contains("key1")).true
        expect(items.contains("key2")).true
        expect(items.contains("key3")).true
        items.removeLeastRecentlyAdded()
        expect(items.size()).equals(2)
        expect(items.contains("key1")).false
        expect(items.contains("key2")).true
        expect(items.contains("key3")).true
        items.removeLeastRecentlyAdded()
        expect(items.size()).equals(1)
        expect(items.contains("key1")).false
        expect(items.contains("key2")).false
        expect(items.contains("key3")).true
        items.removeLeastRecentlyAdded()
        expect(items.size()).equals(0)
        expect(items.contains("key1")).false
        expect(items.contains("key2")).false
        expect(items.contains("key3")).false
        expect(items.isEmpty()).true
    })

    it('remove by key when only one element in list', function () {
        let items = new Items()
        items.put("key1", "obj1")
        expect(items.size()).equals(1)
        expect(items.contains("key1")).true
        expect(items.remove("key1")).true
        expect(items.contains("key1")).false
        expect(items.size()).equals(0)
        expect(items.isEmpty()).true
    })

    it('remove head', function () {
        let items = new Items()
        items.put("key1", "obj1")
        items.put("key2", "obj2")
        items.put("key3", "obj3")
        expect(items.size()).equals(3)
        expect(items.remove("key1")).true
        expect(items.contains("key2")).true
        expect(items.contains("key3")).true
        expect(items.contains("key1")).false
        expect(items.size()).equals(2)
    })

    it('remove middle', function () {
        let items = new Items()
        items.put("key1", "obj1")
        items.put("key2", "obj2")
        items.put("key3", "obj3")
        expect(items.size()).equals(3)
        expect(items.remove("key2")).true
        expect(items.contains("key2")).false
        expect(items.contains("key3")).true
        expect(items.contains("key1")).true
        expect(items.size()).equals(2)
    })

    it('remove tail and all others', function () {
        let items = new Items()
        items.put("key1", "obj1")
        items.put("key2", "obj2")
        items.put("key3", "obj3")
        expect(items.size()).equals(3)
        expect(items.remove("key3")).true
        expect(items.contains("key2")).true
        expect(items.contains("key3")).false
        expect(items.contains("key1")).true
        expect(items.size()).equals(2)
        items.removeLeastRecentlyAdded()
        expect(items.contains("key2")).true
        expect(items.contains("key3")).false
        expect(items.contains("key1")).false
        expect(items.size()).equals(1)
        items.removeLeastRecentlyAdded()
        expect(items.toString()).equals('{empty}')
        expect(items.size()).equals(0)
    })

})