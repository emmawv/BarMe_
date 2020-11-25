let fav = []
let barlist= []
document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false)

const BarsAPI = new APIHandler()


document.querySelector('#favButton').onclick = e => {
  const barid= document.querySelector('#barid input').value
  BarsAPI
    .addFav(barid)
  .then((result) => {
    
  }).catch((err) => {
    
  });
  
}