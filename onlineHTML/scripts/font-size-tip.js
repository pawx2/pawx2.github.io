/**
 * 字体尺寸提示框动画
 */

// 用信号量加锁，不愧是我，欸嘿
let infoLock = 0
let mutliclickLock = 0

// 准备详情信息框逻辑
function showIn(){
    let infoFrame = document.getElementById('info')
    infoFrame.style.opacity = '1'
    infoFrame.style.position = 'block'
    if(infoLock === 0)
    {
        infoLock = 1
        let timer = setInterval(function(){
            if(mutliclickLock === 0)
            {
                mutliclickLock = 1
            } else {
                infoFrame.style.opacity -= 0.03
                if(infoFrame.style.opacity === '0')
                {
                    clearInterval(timer)
                    infoLock = 0
                    mutliclickLock = 0
                    infoFrame.style.position = 'none'
                }
            }
        }, 100)
    }
    else mutliclickLock = 0
}