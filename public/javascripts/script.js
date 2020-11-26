
const barid = document.querySelector('#barId').value
const favButton = document.querySelector('#favButton')
const nofavButton = document.querySelector('#nofavButton')

const BarsAPI = new APIHandler()

document.querySelector('#favButton').onclick = e => {

  favButton.classList.toggle('none')
  nofavButton.classList.toggle('none')

  BarsAPI.addFav(barid)
}

document.querySelector('#nofavButton').onclick = e => {

  favButton.classList.toggle('none')
  nofavButton.classList.toggle('none')

  BarsAPI.removeFav(barid)
}

document.querySelector('#mail-btn').onclick = e => {
  e.preventDefault()
  document.querySelector('#mail-form').classList.remove('none')
} 
