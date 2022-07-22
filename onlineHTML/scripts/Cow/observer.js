/**
 * Observer类
 *  用于实现数据劫持
 *  起始时为目标DOM元素进行defineProperty，设定属性的get和set事件
 */
class Observer{
    constructor(data){
        this.observe(data)
    }

    observe(data){
        if(!data || typeof data !== 'object'){
            return null
        }
        Object.keys(data).forEach(key=>{
            this.defineReactive(data, key, data[key])
            this.observe(data[key])
        })
    }
    defineReactive(obj, key, value){
        let that = this
        let dep = new Dep()
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get(){
                Dep.$target && dep.addSub(Dep.$target)
                return value
            },
            set(newValue){
                if(newValue != value){
                    that.observe(newValue)
                    value = newValue
                    dep.notify()
                }
            }
        })
    }
}