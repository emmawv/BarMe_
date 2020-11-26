let fav = []
let barlist= []

//const BarsAPI = new APIHandler()


// document.querySelector('#addComment').onclick = e => {
//     e.preventDefault()
//     BarsAPI.addComment()
// }

// document.querySelector('#favButton').onclick = e => {
//   BarsAPI.addFav()
// }

document.querySelector('#mail-btn').onclick = e => {
  e.preventDefault()
  document.querySelector('#mail-form').classList.remove('none')
}