class APIHandler {

    constructor() {
        this.axiosServer = axios.create({
            baseURL: 'http://localhost:3000'
        })
    }
    
    addFav = (barinfo, favlist) => {
        return this.axiosServer.post('/profile/favourites', { barinfo , favlist})   
    }
} 