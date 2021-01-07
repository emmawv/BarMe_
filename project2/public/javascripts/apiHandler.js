class APIHandler {

    constructor() {
        this.axiosServer = axios.create({
            baseURL: 'http://bar-me.herokuapp.com/'
        })
    }

    //Adds the bar to favourites in the DB
    addFav = (barid) => this.axiosServer.post("/profile/favourites", {barid})   
    
    //Removes the bar from favourites in the DB
    removeFav = (barid) =>  this.axiosServer.post("/profile/remove-favourites", { barid })
   
} 
