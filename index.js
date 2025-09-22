document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput')
  const buttons = Array.from(document.querySelectorAll('.video-btn'))
  const videoContainer = document.getElementById('video-container')
  const noResults = document.getElementById('no-results')

  function normalizeText(text = '') {
    return text.toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim()
  }

  function abrirVideo(link) {
    videoContainer.innerHTML = `<div class="video-wrapper"><iframe src="${link}" allowfullscreen></iframe></div>`
    videoContainer.scrollIntoView({ behavior: 'smooth' })
  }

  function filterButtons() {
    const filtro = normalizeText(searchInput.value)
    let visibleCount = 0
    buttons.forEach(btn => {
      const keywords = normalizeText(btn.dataset.search || btn.textContent)
      if (filtro === '' || keywords.includes(filtro)) {
        btn.style.display = 'block'
        visibleCount++
      } else {
        btn.style.display = 'none'
      }
    })
    noResults.style.display = visibleCount ? 'none' : 'block'
    return visibleCount
  }

  filterButtons()

  searchInput.addEventListener('input', filterButtons)

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const firstVisible = buttons.find(btn => btn.style.display !== 'none' && getComputedStyle(btn).display !== 'none')
      if (firstVisible) {
        firstVisible.buttons()
      } else {
        noResults.style.display = 'block'
        searchInput.classList.add('shake')
        setTimeout(() => searchInput.classList.remove('shake'), 360)
      }
    }
  })

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const link = btn.dataset.link
      if (link) abrirVideo(link)
    })
  })
})