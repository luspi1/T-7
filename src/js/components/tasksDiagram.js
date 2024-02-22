const gantDiagram = document.querySelector('.gant-diagram')

if (gantDiagram) {
  gantDiagram.addEventListener('click', (e) => {
    if (e.target.classList.contains('gant-diagram__trigger')) {
      e.target.parentNode.classList.toggle('_collapsed')
    }
  })
}
