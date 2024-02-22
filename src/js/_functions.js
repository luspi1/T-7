// Обрезка длинного текста на определенную длину
import { infoModal } from './_vars'

//Сбор данных форм

export const serializeForm = (formNode) => {
  return new FormData(formNode)
}

// Преобразование formData в объект
export const formToObj = (formData) => {
  return Array.from(formData.entries()).reduce(
    (memo, pair) => ({
      ...memo,
      [pair[0]]: pair[1],
    }),
    {},
  )
}

// Фунцкия отправки fetch запросов
export async function sendData(data, url) {
  return await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    body: data,
  })
}

// показ/скрытие модалки ошибки

export const showInfoModal = (responseText) => {
  infoModal.addEventListener('click', (e) => {
    if (e.target.classList.contains('info-modal')) {
      infoModal.classList.add('hidden')
    }
  })
  const modalText = infoModal.querySelector('.info-modal__content-text')
  modalText.textContent = responseText
  infoModal.classList.remove('hidden')
}
