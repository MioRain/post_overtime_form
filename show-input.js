const body = document.querySelector('body')
const labels = document.querySelectorAll('label')
const turnDark = document.querySelector('.turn-dark')
const turnLight = document.querySelector('.turn-light')
const workdayBtn = document.querySelector('#workday-btn')
const holidayBtn = document.querySelector('#holiday-btn')
const form = document.querySelector('form')
const name = document.querySelector('#name')
const workNum = document.querySelector('#work-num')
const type = document.querySelector('#type')
const startDate = document.querySelector('#start-date')
const startTimeCheck = document.querySelector('#start-time-check')
const startYear = document.querySelector('#start-year')
const startMonth = document.querySelector('#start-month')
const startDay = document.querySelector('#start-day')
const startHour = document.querySelector('#start-hour')
const startMinute = document.querySelector('#start-minute')
const endDate = document.querySelector('#end-date')
const endTimeCheck = document.querySelector('#end-time-check')
const endYear = document.querySelector('#end-year')
const endMonth = document.querySelector('#end-month')
const endDay = document.querySelector('#end-day')
const endHour = document.querySelector('#end-hour')
const endMinute = document.querySelector('#end-minute')
const breakTime = document.querySelector('#break-time')
const overtimeReason = document.querySelector('#overtime-reason')
const noBreakReason = document.querySelector('.no-break-reason')
const noBreakReasonInput = document.querySelector('#no-break-reason')
const saveBtn = document.querySelector('#save-btn')
const submitBtn = document.querySelector('#submit-btn')
const recordBtn = document.querySelector('#record-btn')
const record = document.querySelector('#record')
const clearBtn = document.querySelector('#clear-btn')

const today = new Date()
const theDay = new Date() // 建立時間物件
const changeDay = -1 // 設定要往前或往後幾天
const timeStamp = theDay.setDate(theDay.getDate() + changeDay) // theDay.getDate() 是用來取得今天是幾號
const todayData = {
  year: String(today.getFullYear()),
  month: String(today.getMonth() + 1).padStart(2, '0'),
  date: String(today.getDate()).padStart(2, '0'),
  hour: String(today.getHours()).padStart(2, '0')
}
const yesterdayData = {
  year: String(theDay.getFullYear()),
  month: String(theDay.getMonth() + 1).padStart(2, '0'),
  date: String(theDay.getDate()).padStart(2, '0')
}
const btnArray = [
  workdayBtn,
  holidayBtn,
]

const status = {
  whichDay: '',
  workShift: 'morning',
  basicData: JSON.parse(localStorage.getItem('basicData')),
  workdayData: JSON.parse(localStorage.getItem('workdayData')),
  holidayData: JSON.parse(localStorage.getItem('holidayData')),
  recordData: JSON.parse(localStorage.getItem('recordData'))
}

window.onload = function () {
  if (status.basicData?.workShift === 'night') {
    turnDark.click()
  }

  if (status.basicData) {
    name.value = status.basicData?.name
    workNum.value = status.basicData?.workNum
  }
}

btnArray.forEach(btn => {
  btn.addEventListener('click', event => {
    form.classList.remove('none')
    document.querySelectorAll('button').forEach(btn => {
      btn.classList.remove('btn-dark')
    })
    event.target.classList.add('btn-dark')
  })
})

turnDark.addEventListener('click', event => {
  const animateArr = []
  status.workShift = 'night'

  for (let i = 130; i > 0; i--) {
    animateArr.push({
      background: `linear-gradient(325deg, white ${i - 30}%, black ${i}%)`
    });
  }

  body.animate(animateArr, {
    duration: 800
  });

  body.style.background = "linear-gradient(325deg, white 0%, black 0%)";
  turnDark.classList.add('none')
  turnLight.classList.remove('none')
  startTimeCheck.style.color = 'white'
  endTimeCheck.style.color = 'white'
  labels.forEach(label => {
    label.style.color = 'white'
  })
  form.classList.add('none')
  document.querySelectorAll('button').forEach(btn => {
    btn.classList.remove('btn-dark')
  })
})

turnLight.addEventListener('click', event => {
  const animateArr = []
  status.workShift = 'morning'

  for (let i = 130; i > 0; i--) {
    animateArr.push({
      background: `linear-gradient(325deg, black ${i - 30}%, white ${i}%)`
    });
  }

  body.animate(animateArr, {
    duration: 800
  });

  body.style.background = "linear-gradient(325deg, black 0%, white 0%)";
  turnDark.classList.remove('none')
  turnLight.classList.add('none')
  startTimeCheck.style.color = 'black'
  endTimeCheck.style.color = 'black'
  labels.forEach(label => {
    label.style.color = 'black'
  })
  form.classList.add('none')
  document.querySelectorAll('button').forEach(btn => {
    btn.classList.remove('btn-dark')
  })
})

workdayBtn.addEventListener('click', event => {
  noBreakReason.classList.add('none')
  breakTime.addEventListener('input', event => {
    if (Number(event.target.value) === 0) {
      noBreakReason.classList.remove('none')
    } else {
      noBreakReason.classList.add('none')
    }
  })

  let startValue = ''
  let endValue = ''

  status.whichDay = 'workday'

  if (status.workShift === 'morning') {
    if (Number(todayData.hour) < 17) {
      startValue = `${yesterdayData.year}-${yesterdayData.month}-${yesterdayData.date}T17:00`
      startTimeCheck.innerHTML = '下午(PM)'
      endValue = `${yesterdayData.year}-${yesterdayData.month}-${yesterdayData.date}T20:00`
      endTimeCheck.innerHTML = '下午(PM)'
    } else {
      startValue = `${todayData.year}-${todayData.month}-${todayData.date}T17:00`
      startTimeCheck.innerHTML = '下午(PM)'
      endValue = `${todayData.year}-${todayData.month}-${todayData.date}T20:00`
      endTimeCheck.innerHTML = '下午(PM)'
    }
  } else if (status.workShift === 'night') {
    if (Number(todayData.hour) < 5) {
      startValue = `${yesterdayData.year}-${yesterdayData.month}-${yesterdayData.date}T05:00`
      startTimeCheck.innerHTML = '上午(AM)'
      endValue = `${yesterdayData.year}-${yesterdayData.month}-${yesterdayData.date}T08:00`
      endTimeCheck.innerHTML = '上午(AM)'
    } else {
      startValue = `${todayData.year}-${todayData.month}-${todayData.date}T05:00`
      startTimeCheck.innerHTML = '上午(AM)'
      endValue = `${todayData.year}-${todayData.month}-${todayData.date}T08:00`
      endTimeCheck.innerHTML = '上午(AM)'
    }
  }

  type.options.selectedIndex = 0
  startDate.value = startValue
  endDate.value = endValue
  breakTime.value = 1
  overtimeReason.value = '配合生產'

  startYear.value = startValue.substr(0, 4)
  startMonth.value = startValue.substr(5, 2)
  startDay.value = startValue.substr(8, 2)
  startHour.value = startValue.substr(11, 2)
  startMinute.value = startValue.substr(14, 2)

  endYear.value = endValue.substr(0, 4)
  endMonth.value = endValue.substr(5, 2)
  endDay.value = endValue.substr(8, 2)
  endHour.value = endValue.substr(11, 2)
  endMinute.value = endValue.substr(14, 2)

  if (status.workdayData) {
    overtimeReason.value = status.workdayData?.overtimeReason
  }
})

holidayBtn.addEventListener('click', event => {
  noBreakReason.classList.add('none')
  breakTime.addEventListener('input', event => {
    if (Number(event.target.value) <= 1) {
      noBreakReason.classList.remove('none')
    } else {
      noBreakReason.classList.add('none')
    }
  })

  let startValue = ''
  let endValue = ''

  status.whichDay = 'holiday'

  if (status.workShift === 'morning') {
    if (Number(todayData.hour) >= 17 && Number(todayData.hour) < 20) {
      startValue = `${todayData.year}-${todayData.month}-${todayData.date}T08:00`
      startTimeCheck.innerHTML = '上午(AM)'
      endValue = `${todayData.year}-${todayData.month}-${todayData.date}T17:00`
      endTimeCheck.innerHTML = '下午(PM)'
      breakTime.value = 1
    } else if (Number(todayData.hour) >= 20) {
      startValue = `${todayData.year}-${todayData.month}-${todayData.date}T08:00`
      startTimeCheck.innerHTML = '上午(AM)'
      endValue = `${todayData.year}-${todayData.month}-${todayData.date}T20:00`
      endTimeCheck.innerHTML = '下午(PM)'
      breakTime.value = 2
    } else if (Number(todayData.hour) < 17) {
      startValue = `${yesterdayData.year}-${yesterdayData.month}-${yesterdayData.date}T08:00`
      startTimeCheck.innerHTML = '上午(AM)'
      endValue = `${yesterdayData.year}-${yesterdayData.month}-${yesterdayData.date}T20:00`
      endTimeCheck.innerHTML = '下午(PM)'
      breakTime.value = 2
    }
  } else if (status.workShift === 'night') {
    if (Number(todayData.hour) >= 5 && Number(todayData.hour) < 8) {
      startValue = `${yesterdayData.year}-${yesterdayData.month}-${yesterdayData.date}T20:00`
      startTimeCheck.innerHTML = '下午(PM)'
      endValue = `${todayData.year}-${todayData.month}-${todayData.date}T05:00`
      endTimeCheck.innerHTML = '上午(AM)'
      breakTime.value = 1
    } else if (Number(todayData.hour) >= 8 || Number(todayData.hour) < 5) {
      startValue = `${yesterdayData.year}-${yesterdayData.month}-${yesterdayData.date}T20:00`
      startTimeCheck.innerHTML = '下午(PM)'
      endValue = `${todayData.year}-${todayData.month}-${todayData.date}T08:00`
      endTimeCheck.innerHTML = '上午(AM)'
      breakTime.value = 2
    }
  }

  type.options.selectedIndex = 2
  startDate.value = startValue
  endDate.value = endValue
  overtimeReason.value = '假日配合生產保養'

  startYear.value = startValue.substr(0, 4)
  startMonth.value = startValue.substr(5, 2)
  startDay.value = startValue.substr(8, 2)
  startHour.value = startValue.substr(11, 2)
  startMinute.value = startValue.substr(14, 2)

  endYear.value = endValue.substr(0, 4)
  endMonth.value = endValue.substr(5, 2)
  endDay.value = endValue.substr(8, 2)
  endHour.value = endValue.substr(11, 2)
  endMinute.value = endValue.substr(14, 2)

  if (status.holidayData) {
    overtimeReason.value = status.holidayData?.overtimeReason
  }
})

startDate.addEventListener('input', event => {
  const inputValue = event.target.value
  const year = document.querySelector('#start-year')
  const month = document.querySelector('#start-month')
  const day = document.querySelector('#start-day')
  const hour = document.querySelector('#start-hour')
  const minute = document.querySelector('#start-minute')
  year.value = inputValue.substr(0, 4)
  month.value = inputValue.substr(5, 2)
  day.value = inputValue.substr(8, 2)
  hour.value = inputValue.substr(11, 2)
  minute.value = inputValue.substr(14, 2)
  if (Number(hour.value) < 12) {
    startTimeCheck.innerHTML = '上午(AM)'
  } else {
    startTimeCheck.innerHTML = '下午(PM)'
  }
})

endDate.addEventListener('input', event => {
  const inputValue = event.target.value
  const year = document.querySelector('#end-year')
  const month = document.querySelector('#end-month')
  const day = document.querySelector('#end-day')
  const hour = document.querySelector('#end-hour')
  const minute = document.querySelector('#end-minute')
  year.value = inputValue.substr(0, 4)
  month.value = inputValue.substr(5, 2)
  day.value = inputValue.substr(8, 2)
  hour.value = inputValue.substr(11, 2)
  minute.value = inputValue.substr(14, 2)
  if (Number(hour.value) < 12) {
    endTimeCheck.innerHTML = '上午(AM)'
  } else {
    endTimeCheck.innerHTML = '下午(AM)'
  }
})

saveBtn.addEventListener('click', event => {
  if (status.whichDay === 'workday') {
    const workdayData = {
      overtimeReason: overtimeReason.value
    }
    const basicData = {
      name: name.value,
      workNum: workNum.value,
      workShift: status.workShift
    }
    localStorage.setItem('workdayData', JSON.stringify(workdayData))
    localStorage.setItem('basicData', JSON.stringify(basicData))
    alert('儲存成功')
  } else if (status.whichDay === 'holiday') {
    const holidayData = {
      overtimeReason: overtimeReason.value
    }
    const basicData = {
      name: name.value,
      workNum: workNum.value,
      workShift: status.workShift
    }
    localStorage.setItem('holidayData', JSON.stringify(holidayData))
    localStorage.setItem('basicData', JSON.stringify(basicData))
    alert('儲存成功')
  }
})

recordBtn.addEventListener('click', event => {
  record.innerHTML = ''
  status.recordData.forEach(data => {
    record.innerHTML += `
    <p class='record'>
      <span>${data[0]}(${data[1]})</span>
      <br>
      <span style='color: red; font-weight: bold'>${data[2]} ～ ${data[3]}</span>
      <br>
      <span>${data[4]}</span>
      <br>
      <span>休息時間(Break Time)：${data[5]} 小時(hrs)</span>
      <br>
      <span>加班事由：${data[6]}</span>
      <br>
      <span>未休息原因：${data[7]}</span>
    </p>
    `
  })
})

clearBtn.addEventListener('click', event => {
  localStorage.removeItem('recordData')
  delete status.recordData
  record.innerHTML = ''
  alert('紀錄已清除')
})

submitBtn.addEventListener('click', event => {
  const result = confirm(`
  請確認一下申報資料是否正確？
  
  ${startDate.value}
  ${endDate.value}
  ${type.value}
  休息時間：${breakTime.value} hrs
  加班事由：${overtimeReason.value}
  未休息原因：${noBreakReason.value ? noBreakReason.value : '---(Null)'}
  `)
  if (!result) {
    event.preventDefault()
    return
  }

  let recordData = status.recordData ? status.recordData : []
  const recordStore = []

  recordStore.push(name.value)
  recordStore.push(workNum.value)
  recordStore.push(startDate.value)
  recordStore.push(endDate.value)
  recordStore.push(type.value)
  recordStore.push(breakTime.value)
  recordStore.push(overtimeReason.value)
  recordStore.push(noBreakReasonInput?.value ? noBreakReasonInput.value : '---(Null)')

  recordData.unshift(recordStore)

  localStorage.setItem('recordData', JSON.stringify(recordData))
})