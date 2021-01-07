let mapInstance


function initApp() {
    drawMap()
    getBar()
}


function drawMap() {
    mapInstance = new google.maps.Map(
        document.querySelector('#barMap'),
        { center: { lat: 37.408752, lng: -1.585035 }, zoom: 15 }
    )
}


function getBar() {
    axios
        .get('/api/bars')
        .then(response => drawMarkers(response.data))
        .catch(err => console.log(err))
}


function drawMarkers(sitios) {
    let myUrl = window.location.href
    let id = myUrl.substring(myUrl.lastIndexOf('/') + 1)

    sitios.forEach(elm => {
        if (elm._id === id) {
            let position = { lat: elm.location.coordinates[0], lng: elm.location.coordinates[1] }

            new google.maps.Marker({
                map: mapInstance,
                position,
                title: elm.name
            })
            mapInstance.setCenter({ lat: elm.location.coordinates[0], lng: elm.location.coordinates[1] })
        }
    })
}