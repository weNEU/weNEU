const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
//获取当前日期，以“/”连接
const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('/')
}
//获取当前日期，以“-”连接
const formatDateByH = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}
//将string格式日期转换为“/”连接只包含月日的日期
const formatDateToSimple = data => {
  var date = new Date(Date.parse(data));
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [month, day].join('/')
}
//获取string格式日期的星期
const formatDateToWeek = data => {
  var date = new Date(Date.parse(data));
  const month = date.getDay();
  var weekDay;
  switch (month) {
    case 0:
      weekDay = '周日';
      break;
    case 1:
      weekDay = '周一';
      break;
    case 2:
      weekDay = '周二';
      break;
    case 3:
      weekDay = '周三';
      break;
    case 4:
      weekDay = '周四';
      break;
    case 5:
      weekDay = '周五';
      break;
    case 6:
      weekDay = '周六';
      break
  }
  return weekDay;
}

//日期的加减
const addDay = data => {
  //下面的不是时间戳，是时间戳*1000
  var timestamp = Date.parse(new Date());
  var newTimestamp = timestamp + data * 24 * 60 * 60 * 1000;
  var date = new Date(newTimestamp);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return [year, month, day].map(formatNumber).join('-');
}

//月份的加减
const addMonth = num => {
  if (typeof num == "string") {
    num = parseInt(num);
  }
  var date = new Date();
  const curYear = date.getFullYear();
  const curMonth = date.getMonth() + 1;
  const curDay = date.getDate();
  let month = (curMonth + num - 1) % 12;
  let year = curYear + (curMonth + num - month) / 12;
  let days = curDay;
  date = new Date(year, month, days);
  year = date.getFullYear();
  month = date.getMonth() + 1;
  const day = date.getDate();

  return [year, month, day].map(formatNumber).join('-')
}
//月份第几天增加后获取月份的第几天
const getDayByAddDay = data => {
  //下面的不是时间戳，是时间戳*1000
  var timestamp = Date.parse(new Date());
  var newTimestamp = timestamp + data * 24 * 60 * 60 * 1000;
  var date = new Date(newTimestamp);

  return date.getDate();
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  formatDateByH: formatDateByH,
  addDay: addDay,
  addMonth: addMonth,
  getDayByAddDay: getDayByAddDay,
  formatDateToSimple: formatDateToSimple,
  formatDateToWeek: formatDateToWeek,
}