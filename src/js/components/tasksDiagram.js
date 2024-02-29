const gantDiagram = document.querySelector('.gant-diagram')

const tasksList = gantDiagram.querySelectorAll('.gant-diagram__tasks')

const diagramTasks = gantDiagram.querySelectorAll('.task-item')

if (gantDiagram) {
  gantDiagram.addEventListener('click', (e) => {
    if (e.target.classList.contains('gant-diagram__trigger')) {
      e.target.parentNode.classList.toggle('_collapsed')
    }
  })
}

if(diagramTasks) {
  diagramTasks.forEach(item => item.style.gridColumn = item.dataset.gridColumn)
}


const weekendsItems = document.querySelectorAll('.weekends')

if(weekendsItems) {
  weekendsItems.forEach(weekend => {
    const weekendsContainer = document.createElement("div");

    const weekendsCount = weekend.dataset.weekendsCount

    for(let i = 0; i < weekendsCount; i += 1) {
      const weekend = document.createElement("span");
      weekend.textContent = 'Выходной'
      weekendsContainer.append(weekend)
    }
    weekend.append(weekendsContainer)
  })
}