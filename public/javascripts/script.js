
document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);
function getRestaurantsFromAPI() {

axios
.get('/api/restaurants')
.then(response => drawMarkers(response.data))
.catch(err => console.log(err))
} 

document.querySelector('#addComment').onclick = e => {
  e.preventDefault()
const inputs= document.querySelectorAll('#form-comment input')

  const barid = inputs[0].value
  const userid = inputs[1].value
const comment =inputs[2].value
  console.log(inputs[0].value)
  console.log(inputs[1].value)
  console.log(inputs[2].value)
  
}

    const apiHandler = new CountriesApiHandler()
