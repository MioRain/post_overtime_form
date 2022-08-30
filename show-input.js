const weekdayBtn = document.querySelector('#weekday-btn')
const holidayFullBtn = document.querySelector('#holiday-full-btn')
const holidayBtn = document.querySelector('#holiday-btn')
const tempBtn1 = document.querySelector('#btn-1')
const tempBtn2 = document.querySelector('#btn-2')
const tempBtn3 = document.querySelector('#btn-3')
const form = document.querySelector('form')
const name = document.querySelector('#name')
const workNum = document.querySelector('#work-num')
const type = document.querySelector('#type')
const startDate = document.querySelector('#start-date')
const startTimeCheck = document.querySelector('#start-time-check')
const endDate = document.querySelector('#end-date')
const endTimeCheck = document.querySelector('#end-time-check')
const restTime = document.querySelector('#rest-time')
const overtimeReason = document.querySelector('#overtime-reason')
const noRestReason = document.querySelector('.no-rest-reason')
const noRestReasonInput = document.querySelector('#no-rest-reason')
const saveBtn = document.querySelector('#save-btn')
const saveTemp1 = document.querySelector('#save-temp1')
const saveTemp2 = document.querySelector('#save-temp2')
const saveTemp3 = document.querySelector('#save-temp3')

const today = new Date()
const theDay = new Date() // 建立時間物件
const changeDay = -1 // 設定要往前或往後幾天
const timeStamp = theDay.setDate(theDay.getDate() + changeDay) // theDay.getDate() 是用來取得今天是幾號
const todayData = {
  year: String(today.getFullYear()),
  month: String(today.getMonth() + 1).padStart(2, '0'),
  date: String(today.getDate()).padStart(2, '0')
}
const yesterdayData = {
  year: String(theDay.getFullYear()),
  month: String(theDay.getMonth() + 1).padStart(2, '0'),
  date: String(theDay.getDate()).padStart(2, '0')
}
const btnArray = [
  weekdayBtn,
  holidayFullBtn,
  holidayBtn,
  tempBtn1,
  tempBtn2,
  tempBtn3
]

btnArray.forEach(btn => {
  btn.addEventListener('click', event => {
    form.classList.remove('hidden')
    document.querySelectorAll('button').forEach(btn => {
      btn.classList.remove('btn-dark')
      saveBtn.classList.remove('none')
      saveTemp1.classList.add('none')
      saveTemp2.classList.add('none')
      saveTemp3.classList.add('none')
    })
    event.target.classList.add('btn-dark')
    const saveData = JSON.parse(localStorage.getItem('temp'))
    if (saveData) {
      name.value = saveData.name
      workNum.value = saveData.workNum
    }
  })
})

weekdayBtn.addEventListener('click', event => {
  const startValue = `${todayData.year}-${todayData.month}-${todayData.date}T05:00`
  const endValue = `${todayData.year}-${todayData.month}-${todayData.date}T08:00`
  startTimeCheck.innerHTML = '上午'
  endTimeCheck.innerHTML = '上午'

  // 帶入 value
  type.options.selectedIndex = 0
  startDate.value = startValue
  endDate.value = endValue
  restTime.value = 1
  overtimeReason.value = '配合生產'
})

holidayFullBtn.addEventListener('click', event => {
  const startValue = `${yesterdayData.year}-${yesterdayData.month}-${yesterdayData.date}T20:00`
  const endValue = `${todayData.year}-${todayData.month}-${todayData.date}T08:00`
  startTimeCheck.innerHTML = '下午'
  endTimeCheck.innerHTML = '上午'

  // 帶入 value
  type.options.selectedIndex = 2
  startDate.value = startValue
  endDate.value = endValue
  restTime.value = 2
  overtimeReason.value = '假日配合生產保養'
})


holidayBtn.addEventListener('click', event => {
  const startValue = `${yesterdayData.year}-${yesterdayData.month}-${yesterdayData.date}T20:00`
  const endValue = `${todayData.year}-${todayData.month}-${todayData.date}T05:00`
  startTimeCheck.innerHTML = '下午'
  endTimeCheck.innerHTML = '上午'

  // 帶入 value
  type.options.selectedIndex = 2
  startDate.value = startValue
  endDate.value = endValue
  restTime.value = 1
  overtimeReason.value = '假日配合生產保養'
})

tempBtn1.addEventListener('click', event => {
  form.reset()
  saveBtn.classList.add('none')
  saveTemp1.classList.remove('none')
  saveTemp2.classList.add('none')
  saveTemp3.classList.add('none')
  const temp = JSON.parse(localStorage.getItem('temp1'))
  if (temp) {
    name.value = temp.name
    workNum.value = temp.workNum
    type.value = temp.type
    startDate.value = temp.startDate
    endDate.value = temp.endDate
    restTime.value = temp.restTime
    overtimeReason.value = temp.overtimeReason
  }
})

tempBtn2.addEventListener('click', event => {
  form.reset()
  saveBtn.classList.add('none')
  saveTemp1.classList.add('none')
  saveTemp2.classList.remove('none')
  saveTemp3.classList.add('none')
  const temp = JSON.parse(localStorage.getItem('temp2'))
  if (temp) {
    name.value = temp.name
    workNum.value = temp.workNum
    type.value = temp.type
    startDate.value = temp.startDate
    endDate.value = temp.endDate
    restTime.value = temp.restTime
    overtimeReason.value = temp.overtimeReason
  }
})

tempBtn3.addEventListener('click', event => {
  form.reset()
  saveBtn.classList.add('none')
  saveTemp1.classList.add('none')
  saveTemp2.classList.add('none')
  saveTemp3.classList.remove('none')
  const temp = JSON.parse(localStorage.getItem('temp3'))
  if (temp) {
    name.value = temp.name
    workNum.value = temp.workNum
    type.value = temp.type
    startDate.value = temp.startDate
    endDate.value = temp.endDate
    restTime.value = temp.restTime
    overtimeReason.value = temp.overtimeReason
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
    startTimeCheck.innerHTML = '上午'
  } else {
    startTimeCheck.innerHTML = '下午'
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
    endTimeCheck.innerHTML = '上午'
  } else {
    endTimeCheck.innerHTML = '下午'
  }
})

saveBtn.addEventListener('click', event => {
  const saveData = {
    name: name.value,
    workNum: workNum.value
  }
  localStorage.setItem('temp', JSON.stringify(saveData))
  alert('儲存成功')
})

saveTemp1.addEventListener('click', event => {
  const temp1 = {
    name: name.value,
    workNum: workNum.value,
    type: type.value,
    startDate: startDate.value,
    endDate: endDate.value,
    restTime: restTime.value,
    overtimeReason: overtimeReason.value
  }
  localStorage.setItem('temp1', JSON.stringify(temp1))
  alert('儲存成功')
})

saveTemp2.addEventListener('click', event => {
  const temp2 = {
    name: name.value,
    workNum: workNum.value,
    type: type.value,
    startDate: startDate.value,
    endDate: endDate.value,
    restTime: restTime.value,
    overtimeReason: overtimeReason.value
  }
  localStorage.setItem('temp2', JSON.stringify(temp2))
  alert('儲存成功')
})

saveTemp3.addEventListener('click', event => {
  const temp3 = {
    name: name.value,
    workNum: workNum.value,
    type: type.value,
    startDate: startDate.value,
    endDate: endDate.value,
    restTime: restTime.value,
    overtimeReason: overtimeReason.value
  }
  localStorage.setItem('temp3', JSON.stringify(temp3))
  alert('儲存成功')
})