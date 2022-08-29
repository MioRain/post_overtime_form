const weekdayBtn = document.querySelector('#weekday-btn')
const holidayFullBtn = document.querySelector('#holiday-full-btn')
const holidayBtn = document.querySelector('#holiday-btn')
const form = document.querySelector('form')
const type = document.querySelector('#type')
const startDate = document.querySelector('#start-date')
const endDate = document.querySelector('#end-date')
const restTime = document.querySelector('#rest-time')
const overtimeReason = document.querySelector('#overtime-reason')
const noRestReason = document.querySelector('.no-rest-reason')
const noRestReasonInput = document.querySelector('#no-rest-reason')

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

weekdayBtn.addEventListener('click', event => {
  form.classList.remove('hidden')
  const startValue = `${todayData.year}-${todayData.month}-${todayData.date}T05:00`
  const endValue = `${todayData.year}-${todayData.month}-${todayData.date}T08:00`

  // 帶入 value
  type.options.selectedIndex = 0
  startDate.value = startValue
  endDate.value = endValue
  restTime.value = 1
  overtimeReason.value = '配合生產'
})

holidayFullBtn.addEventListener('click', event => {
  form.classList.remove('hidden')
  const startValue = `${yesterdayData.year}-${yesterdayData.month}-${yesterdayData.date}T20:00`
  const endValue = `${todayData.year}-${todayData.month}-${todayData.date}T08:00`

  // 帶入 value
  type.options.selectedIndex = 2
  startDate.value = startValue
  endDate.value = endValue
  restTime.value = 2
  overtimeReason.value = '配合生產'
})


holidayBtn.addEventListener('click', event => {
  form.classList.remove('hidden')
  const startValue = `${yesterdayData.year}-${yesterdayData.month}-${yesterdayData.date}T20:00`
  const endValue = `${todayData.year}-${todayData.month}-${todayData.date}T05:00`

  // 帶入 value
  type.options.selectedIndex = 2
  startDate.value = startValue
  endDate.value = endValue
  restTime.value = 1
  overtimeReason.value = '配合生產'
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
})