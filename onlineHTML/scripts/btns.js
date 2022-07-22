/**
 * 编辑菜单按钮逻辑功能实现
 */

let clearBtn = document.querySelector('#clear_btn')
let bgBtn = document.querySelector('#bg_btn')
let smBtn = document.querySelector('#sm_btn')
let edit = document.querySelector('#edit')
edit.style.fontSize = '15px'
clearBtn.addEventListener('click', function(){
    app.$data.msg = ''
})
bgBtn.addEventListener('click', function(){
    app.$data.fontSize++
    edit.style.fontSize = app.$data.fontSize + 'px'
    showIn()
})
smBtn.addEventListener('click', function(){
    if(app.$data.fontSize == 15)
    {
        showIn()
        return null
    }
    app.$data.fontSize--
    edit.style.fontSize = app.$data.fontSize + 'px'
    showIn()
})