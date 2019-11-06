/**
 * 防抖函数
 * @param func 用户传入的防抖函数
 * @param wait 等待的时间
 * @param immediate 是否立即执行
 */
const debounce = (func, wait = 50, immediate = false) => {
  // 缓存一个定时器id
  let timer = null;
  // 这里返回的函数时每次用户实际调用的防抖函数
  return function (...args) {
    // 如果已经设定过定时器了就清空上一次的定时器
    if (timer) clearTimeout(timer);
    if (immediate) {
      let callNow = !timer;
      //等待wait的时间间隔后，timer为null的时候，函数才可以继续执行
      timer = setTimeout(() => {
        timer = null;
      }, wait);
      //未执行过，执行
      if (callNow) func.apply(this, args);
    } else {
      // 开始一个定时器，延迟执行用户传入的方法
      timer = setTimeout(() => {
        //将实际的this和参数传入用户实际调用的函数
        func.apply(this, args);
      }, wait);
    }
  }
}

/**
 * 节流
 * @param {*} fn 执行的函数
 * @param {*} gapTime 设置时间
 */
const throttle = (fn, gapTime) => {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 1500
  }

  let _lastTime = null

  // 返回新的函数
  return function () {
    let _nowTime = +new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(this, arguments)   //将this和参数传给原函数
      _lastTime = _nowTime
    }
  }
}

/**
 * 绘制圆角矩形
 */
const roundedRect = (ctx, x, y, width, height, radius) => {
  ctx.beginPath()
  ctx.moveTo(x, y + radius)
  ctx.lineTo(x, y + height - radius)
  ctx.quadraticCurveTo(x, y + height, x + radius, y + height)
  ctx.lineTo(x + width - radius, y + height)
  ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius)
  ctx.lineTo(x + width, y + radius)
  ctx.quadraticCurveTo(x + width, y, x + width - radius, y)
  ctx.lineTo(x + radius, y)
  ctx.quadraticCurveTo(x, y, x, y + radius)
  ctx.stroke()
}

// export default {
//   debounce,
//   throttle,
//   roundedRect
// }
