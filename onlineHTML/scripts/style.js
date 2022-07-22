/**
 * JS样式动画及样式动态调整
 */

// 动态调整按钮组的位置
let btns = document.querySelector('#btns')
let vw = document.body.clientWidth
btns.style.left = vw / 2 - 80 + 'px'
window.onresize = function(){
    vw = document.body.clientWidth
    btns.style.left = vw / 2 - 80 + 'px'
}

// 设置指针悬停&按下时按钮样式
let buttons = document.getElementsByClassName('btn')
for(let i = 0; i < buttons.length; i++)
{
    let btn = buttons[i]
    btn.addEventListener('mouseenter', function(){
        btn.style.opacity = '0.9'
    })
    btn.addEventListener('mouseleave', function(){
        btn.style.opacity = '1'
    })
    btn.addEventListener('mousedown', function(){
        btn.style.opacity = '0.7'
    })
    btn.addEventListener('mouseup', function(){
        btn.style.opacity = '1'
    })
    let child = btn.childNodes[1]
    btn.addEventListener('mouseenter', function(){
        child.style.display = 'block'
    })
    btn.addEventListener('mouseleave', function(){
        child.style.display = 'none'
    })
}