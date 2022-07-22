/**
 * 实现的MVVM框架，由Compiler、Observer、Watcher三个主要部分组成，命名为Cow
 */
class Cow{
    constructor(options){
        // Step01.有效数据挂载于实例
        this.$el = options.el
        this.$data = options.data
        // Step02.存在模板，进行编译
        if(this.$el != undefined){
            // 进行数据劫持
            new Observer(this.$data)
            // 使用数据和DOM元素进行编译
            new Compiler(this.$el, this)
        }
    }
}