
 
class CountriesApiHandler {

    constructor() {

        console.log('API handler inicializada')

        this.axiosApp = axios.create({
            baseURL: 'http://localhost:3000/bars/api'
        })
    }
}
    // getOneCountry = country => this.axiosApp.get(`/name/${country}`)
    // getAllCountries = () => this.axiosApp.get('/all')
    // getCountriesByCurrency = currency => this.axiosApp.get(`/currency/${currency}`)