/**
 * 编译器类
 *  在进行编译，通过挂载点逐层递归深入，获得目标的插值表达式、DOM元素，为其添加数据监视者以及发布订阅模式
 */
class Compiler{
    constructor(el, cow){
        // 使用框架时el属性可传入对象，也可传入CSS选择器
        this.$el = this.isElementNode(el) ? el : document.querySelector(el)
        this.$cow = cow
        // 如果可获取挂载的DOM元素，才开始编译
        if(this.$el != undefined){
            // Step01.将挂载的DOM元素移入内存
            let fragment = this.node2fragment(this.$el)
            // Step02.编译(提取v-属性和插值表达式{{}})
            this.compile(fragment)
            // Step03.将编译好的DOM元素放回到页面中
            this.$el.appendChild(fragment)
        }
    }

    /*编译方法*/
    compile(fragment){
        // 递归深入
        let childNodes = fragment.childNodes
        Array.from(childNodes).forEach(node=>{
            if(this.isElementNode(node)){
                // 是节点元素，编译并深入下一层
                this.compileElement(node)
                this.compile(node)
            } else {
                // 是文本节点，编译文本
                this.compileContent(node)
            }
        })
    }

    compileElement(node){
        // 编译带属性v-的DOM元素节点
        let attrs = node.attributes
        Array.from(attrs).forEach(attr=>{
            // 判断属性名是否包含v-
            let attrName = attr.name
            if(this.isDirective(attrName)){
                let expr = attr.value
                // 属性名可能会为v-model v-text v-html等，通过查表执行对应方法
                let [, type] = attrName.split('-')
                CompileUtil[type](node, this.$cow, expr)
            }
        })
    }

    compileContent(node){
        // 编译带插值表达式{{}}的文本节点
        let expr = node.textContent
        let reg = /\{\{([^}]+)\}\}/g
        if(reg.test(expr)){
            CompileUtil['mustache'](node, this.$cow, expr)
        }
    }

    /*辅助方法*/
    // 将目标节点移入内存
    node2fragment(node){
        // 创建内存文档片段
        let fragment = document.createDocumentFragment()
        // 循环移入
        let firstChild
        while (firstChild = node.firstChild) {
            fragment.appendChild(firstChild)
        }
        // 返回内存中的文档片段
        return fragment
    }

    // 判断是否为DOM元素节点
    isElementNode(node){
        return node.nodeType === 1
    }

    //判断是否属性名包含v-
    isDirective(attrName){
        return attrName.includes('v-')
    }
}

// 编译工具
// 单独抽离，需要添加新的命令时，仅需增加方法及对应的Updater方法
CompileUtil = {
    /*辅助方法组*/
    getVal(cow, expr){
        expr = expr.split('.')
        return expr.reduce((prev, next)=>{
            return prev[next]
        }, cow.$data)
    },
    getContent(cow, expr){
        return expr.replace(/\{\{([^}]+)\}\}/g, (...arguments)=>{
            return this.getVal(cow, arguments[1])
        })
    },
    setVal(cow, expr, value){
        expr = expr.split('.')
        return expr.reduce((prev, next, currentIndex)=>{
            if(currentIndex === expr.length - 1){
                return prev[next] = value
            }
            return prev[next]
        }, cow.$data)
    },
    /*核心方法组*/
    // 编译插值表达式
    mustache(node, cow, expr){
        let updateFn = this.updater['mustacheUpdater']
        let value = this.getContent(cow, expr)
        expr.replace(/\{\{([^}]+)\}\}/g, (...arguments)=>{
            new Watcher(cow, arguments[1], (newValue)=>{
                updateFn && updateFn(node, this.getContent(cow, expr))
            })
        })
        updateFn && updateFn(node, value)
    },
    // 编译v-html
    html(node, cow, expr){
        let updateFn = this.updater['htmlUpdater']
        new Watcher(cow, expr, (newValue)=>{
            updateFn && updateFn(node, this.getVal(cow, expr))
        })
        updateFn && updateFn(node, this.getVal(cow, expr))
    },
    // 编译v-text
    text(node, cow, expr){
        let updateFn = this.updater['textUpdater']
        new Watcher(cow, expr, (newValue)=>{
            updateFn && updateFn(node, this.getVal(cow, expr))
        })
        updateFn && updateFn(node, this.getVal(cow, expr))
    },
    // 编译v-model
    model(node, cow, expr){
        let updateFn = this.updater['modelUpdater']
        new Watcher(cow, expr, (newValue)=>{
            updateFn && updateFn(node, this.getVal(cow, expr))
        })
        // 追加输入框事件
        node.addEventListener('input', (e)=>{
            let newValue = e.target.value
            this.setVal(cow, expr, newValue)
        })
        updateFn && updateFn(node, this.getVal(cow, expr))
    },
    /*updater更新方法组*/
    updater:{
        // 插值表达更新
        mustacheUpdater(node, newValue){
            node.textContent = newValue
        },
        // innerhtml更新
        htmlUpdater(node, newValue){
            node.innerHTML = newValue
        },
        // innerText更新
        textUpdater(node, newValue){
            if(node.tagName === 'INPUT'){
                // 如果为输入框，更新其值
                node.value = newValue
            } else {
                node.innerText = newValue
            }
        },
        // 输入框值更新
        modelUpdater(node, newValue){
            node.value = newValue
        }
    }
}