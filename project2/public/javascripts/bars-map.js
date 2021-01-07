let mapInstance

function initApp() {
    drawMap()
    getBarsFromAPI()
}


function drawMap() {

    mapInstance = new google.maps.Map(
        document.querySelector('#barsMap'),
        { center: { lat: 40.419568, lng: -3.705675 }, zoom: 13}
    )
}


function getBarsFromAPI() {

    axios
        .get('/api/bars')
        .then(response => drawMarkers(response.data))
        .catch(err => console.log(err))
}


function drawMarkers(bars) {

    bars.forEach(elm => {

        let position = { lat: elm.location.coordinates[0], lng: elm.location.coordinates[1] }

        new google.maps.Marker({
            map: mapInstance,
            position,
            title: elm.name
        })
    })

    mapInstance.setCenter({ lat: bars[7].location.coordinates[0], lng: bars[7].location.coordinates[1] })
}