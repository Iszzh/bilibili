export const times = sendtime => {
  try {
    let oldTime = sendtime
    // 发布时间去 '-'符号
    let oDate = new Date(Date.parse(sendtime.replace(/-/g, '/')))
    // 发布时间转换为 字符串
    let send = Date.parse(oDate)
    // 获取现在时间
    let now = new Date()
    // 现在的时间转换 字符串
    let nowNew = Date.parse(now)
    // 定义时间差
    let x = 0

    x = nowNew - send
    // console.log(nowNew+"-"+send+"="+x);
    if (x <= 1000 * 60 * 1) {
      sendtime = '刚刚'
    } else if (1000 * 60 * 1 < x && x <= 1000 * 60 * 60) {
      sendtime = Math.round(x / (1000 * 60)) + '分钟前'
    } else if (1000 * 60 * 60 * 1 < x && x <= 1000 * 60 * 60 * 24) {
      sendtime = Math.round(x / (1000 * 60 * 60)) + '小时前'
    } else if (1000 * 60 * 60 * 24 < x && x <= 1000 * 60 * 60 * 24 * 15) {
      sendtime = Math.round(x / (1000 * 60 * 60 * 24)) + '天前'
    } else if (x > 1000 * 60 * 60 * 24 * 15) {
      sendtime = oldTime
    } else {
      sendtime = '很久很久以前'
    }
    return sendtime
  } catch (error) {}
}
