/**
 * Dep类
 *  用于实现发布订阅模式
 *  为每个数据创建一个数组，所有订阅该数据的插值表达式、DOM元素的更新方法加入到该数组中
 *  当数据发生变化，遍历数组，向所有订阅者发出更新消息
 */
class Dep{
    constructor(){
        this.subs = []
    }
    addSub(watcher){
        this.subs.push(watcher)
    }
    notify(){
        this.subs.forEach(watcher=>watcher.update())
    }
}