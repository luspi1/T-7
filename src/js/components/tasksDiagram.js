const gantDiagram = document.querySelector('.gant-diagram')

if (gantDiagram) {
  gantDiagram.addEventListener('click', (e) => {
    if (e.target.classList.contains('gant-diagram__trigger')) {
      e.target.parentNode.classList.toggle('_collapsed')
    }
  })

  // определение длины трека задачи, исходя из значения в data-interval
  const taskTracks = gantDiagram.querySelectorAll('.gant-diagram__task-track')

  taskTracks?.forEach((track) => {
    const trackInterval = Number(track.dataset.interval)
    track.style.width = `${trackInterval * 100 - 20}px`
  })

  // определение высоты строки, исходя из максимального количества треков задач в строке
}
