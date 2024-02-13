import Choices from "choices.js"


export const initSelects = () => {
  const mainSelects = document.querySelectorAll('.main-select select')

  if (mainSelects) {
    mainSelects.forEach(select => {
      const choices = new Choices(select, {
        searchEnabled: false,
        itemSelectText: '',
        shouldSort: false,
        allowHTML: true
      })
    })
  }
  const customSelects = document.querySelectorAll('.custom-select select')

  if (customSelects) {
    customSelects.forEach(select => {
      const choices = new Choices(select, {
        searchEnabled: false,
        itemSelectText: '',
        shouldSort: false,
        allowHTML: true
      })
    })
  }
}

initSelects()




