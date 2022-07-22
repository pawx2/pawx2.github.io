/**
 * PC端禁止用户缩放页面
 */

document.addEventListener('mousewheel', function (e) {
    e = e || window.event;
    if ((e.wheelDelta && e.ctrlKey) || e.detail) {
        e.preventDefault();
    }
}, { capture: false, passive: false });
document.addEventListener('keydown', function (event) {
    if ((event.ctrlKey === true || event.metaKey === true)
        && (event.key === 61 || event.key === 107
            || event.key === 173 || event.key === 109
            || event.key === 187 || event.key === 189)) {
        event.preventDefault();
    }
}, false);


// 移动端禁止缩放
let handler = function(e){
    e.preventDefault()
}

document.addEventListener('touchmove', handler, false)
