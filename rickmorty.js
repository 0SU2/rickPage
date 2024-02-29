document.addEventListener('DOMContentLoaded', () => {
    fetchData()
})

const cards = document.querySelector('#card-dinamica')
const templateCard = document.querySelector('#template-card').content

const fetchData = async() => {
    try {
        loadingData(true)
        const res = await fetch('https://rickandmortyapi.com/api/character')
        const data = await res.json()
        pintarCards(data)
    } catch (error) {
        console.log('error => ', error);
    } finally {
        loadingData(false)
    }
}

const loadingData = estado => {
    // obtenemos la seccion
    const loading = document.querySelector('#loading')

    // si el estado esta en verdader, se tiene que ver que esta cargando
    if(estado) {
        loading.classList.remove('d-none')
    } else {
        loading.classList.add('d-none')
    }
}

const pintarCards = data => {
    const fragment = document.createDocumentFragment()
    cards.textContent = ''
    data.results.forEach(item => {
        const clone = templateCard.cloneNode(true)
        clone.querySelector('h5').textContent = item.name
        clone.querySelector('p').textContent = item.species
        clone.querySelector('img').setAttribute('src', item.image)
        fragment.appendChild(clone)
    });
    cards.appendChild(fragment)
}