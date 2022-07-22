/**
 * 实现编辑菜单按钮逻辑
 */

let enter_btn = document.querySelector('#enter_btn')

enter_btn.addEventListener('mousedown', function(){
    enter_btn.style.opacity = '0.5'
})

enter_btn.addEventListener('mouseup', function(){
    enter_btn.style.opacity = '1'
})

let coverDiv = document.querySelector('#cover')

function closeCover(){
    for(let index = 0; index < 1000; index++)
    {
        setTimeout(()=>{
            coverDiv.style.top = -index + 'px'
        }, index / 2)
    }
}

enter_btn.addEventListener('click', closeCover)