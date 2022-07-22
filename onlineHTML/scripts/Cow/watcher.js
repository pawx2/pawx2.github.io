/**
 * Watcher类
 *  用于绑定数据更新引发的事件
 */
class Watcher{
    constructor(cow, expr, cb){
        this.$cow = cow
        this.$expr = expr
        this.$cb = cb
        // 获取旧值
        this.$value = this.get()
    }
    getVal(cow, expr){
        expr = expr.split('.')
        return expr.reduce((prev, next)=>{
            return prev[next]
        }, cow.$data)
    }
    get(){
        Dep.$target = this
        let value = this.getVal(this.$cow, this.$expr)
        Dep.$target = null
        return value
    }
    // 对外暴露的方法
    update(){
        let newValue = this.getVal(this.$cow, this.$expr)
        let oldValue = this.$value
        if(newValue != oldValue){
            this.$cb(newValue)
            this.$value = newValue
        }
    }
}