/**
 * 管理cookie：网页打开时加载本地cookie，关闭/刷新时保存已有信息
 */

// 打开页面事件
window.onload = function(){
    let newMsg = localStorage.getItem('funnyText')
    if(newMsg !== ''){
        app.$data.msg = newMsg
    }
}
// 关闭页面事件
window.onbeforeunload = function(){
    localStorage.setItem('funnyText', app.$data.msg)
}