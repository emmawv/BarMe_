
document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false)

const BarsAPI = new APIHandler()

// document.querySelector('#addComment').onclick = e => {
//     e.preventDefault()
//     BarsAPI.addComment()
// }

document.querySelector('#favButton').onclick = e => {
  BarsAPI.addFav()
}