import AirDatepicker from 'air-datepicker'
import {getNoun} from '../_functions'


const setCurrentDate = (calendar, date) => {
  if (calendar.dataset.value) {
    return new Date(calendar.dataset.value)
  }
  if (calendar.classList.contains('booking-calendar__exit')) {
    return new Date(date.setDate(date.getDate() + 1))
  }
  return date
}

export const initAllDates = () => {
  const monthsArr = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ]

  const allDateInputs = document.querySelectorAll('input[data-date-start]')
  const bookingCalendars = document.querySelectorAll('.booking-calendar input')

  if (allDateInputs) {
    allDateInputs.forEach((el) => {
      const {dateStart} = el.dataset
      const formatDate = dateStart.split('.').reverse().join('.')

      const customDate = new AirDatepicker(el, {
        startDate: formatDate,
        container: '.date-custom-container',
      })

      el.addEventListener('click', (e) => {
        const featuredDate = e.currentTarget.value
          .split('.')
          .reverse()
          .join('-')
        if (featuredDate) {
          customDate.selectDate(featuredDate)
          customDate.setViewDate(featuredDate)
        }
      })
    })
  }

  if (bookingCalendars) {
    bookingCalendars.forEach((calendar) => {
      const formatDate = new Date()
      const customDate = new AirDatepicker(calendar, {
        startDate: setCurrentDate(calendar, formatDate),
        container: '.date-custom-container',
        selectedDates: calendar.dataset.value ? [calendar.dataset.value] : [formatDate],
        minDate: [formatDate],
        range: true,
        navTitles: {
          days: '<h4>MMMM yyyy</h4>',
        },
        onSelect: ({date, formattedDate, datepicker}) => {
          const checkInInput = document.querySelector('input[name="check_in"]')
          const checkOutInput = document.querySelector(
            'input[name="check_out"]'
          )

          if (checkInInput && checkOutInput) {
            checkInInput.value = formattedDate[0]
            checkOutInput.value = formattedDate[1]
          }

          let checkInText = datepicker.$datepicker?.querySelector(
            '.check-info__check-in'
          )
          let checkInCurrentDate = date[0]

          if (checkInText) {
            if (checkInCurrentDate) {
              checkInText.classList.add('_bold')
              checkInText.textContent = `Заезд ${checkInCurrentDate.getDate()} ${
                monthsArr[checkInCurrentDate.getMonth()]
              }`
            } else {
              checkInText.classList.remove('_bold')
              checkInText.textContent = 'Выберите дату заезда'
            }
          }

          let checkOutText = datepicker.$datepicker?.querySelector(
            '.check-info__check-out'
          )

          // Для второй даты в одном input
          let checkOutCurrentDate = date[1]
          if (checkOutText) {
            if (checkOutCurrentDate) {
              checkOutText.classList.add('_bold')
              checkOutText.textContent = `Выезд ${checkOutCurrentDate.getDate()} ${
                monthsArr[checkOutCurrentDate.getMonth()]
              }`
            } else {
              checkOutText.classList.remove('_bold')
              checkOutText.textContent = 'Выберите дату выезда'
            }
          }

          let dateSeparator = datepicker.$datepicker?.querySelector(
            '.check-info__separator'
          )
          let nightCountText = datepicker.$datepicker?.querySelector(
            '.check-info__nights'
          )

          if (dateSeparator && nightCountText) {
            if (date.length > 1) {
              let rangeElements = datepicker.$datepicker.querySelectorAll(
                '.air-datepicker-cell.-day-.-range-from-, .air-datepicker-cell.-day-.-in-range-, .air-datepicker-cell.-day-.-range-to-'
              )
              let nightCount = rangeElements.length - 1

              dateSeparator.textContent = '—'
              dateSeparator.style.marginLeft = '5px'
              nightCountText.textContent = `(${nightCount} ${getNoun(
                nightCount,
                'ночь',
                'ночи',
                'ночей'
              )})`
            } else {
              dateSeparator.textContent = '.'
              dateSeparator.style.marginLeft = '0'
              nightCountText.textContent = ''
            }
          }
        },

        onShow: (isFinished) => {
          if (isFinished) {
            let checkInfo = document.createElement('div')
            checkInfo.className = 'check-info'
            checkInfo.innerHTML = `<h3 class="check-info__check-in _bold">Заезд ${customDate.viewDate.getDate()} ${
              monthsArr[customDate.viewDate.getMonth()]
            }</h3><span class="check-info__separator">.</span> <h3 class="check-info__check-out">Выберите дату выезда</h3> <h3 class="check-info__nights _bold"></h3>`
            customDate.$datepicker.append(checkInfo)
          }
        },
      })

      calendar.addEventListener('click', (e) => {
        const featuredDate = e.currentTarget.value
          .split('.')
          .reverse()
          .join('-')

        if (featuredDate) {
          customDate.selectDate(featuredDate)
          customDate.setViewDate(featuredDate)
        }
      })
    })
  }
}

initAllDates()
