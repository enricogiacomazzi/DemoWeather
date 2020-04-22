


function loadMap(handler) {
    const mymap = L.map('map').setView([47.3774497, 8.5016957], 4);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: ''
    }).addTo(mymap);

    let marker;

    mymap.on('click', ({ latlng }) => {
        if (!marker) {
            marker = L.marker([latlng.lat, latlng.lng]).addTo(mymap);
        } else {
            marker.setLatLng(latlng);
        }

        handler.invokeMethodAsync('GetWeatherDataAsync', latlng.lat, latlng.lng);
    })
}


function drawChart(data, labels) {
    debugger;
    const ctx = document.getElementById('chart').getContext('2d');
    const color = Chart.helpers.color;
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: 'Dataset 1',
                backgroundColor: color('rgb(75, 192, 192)').alpha(0.5).rgbString(),
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 1,
                data
            }]

        },
        options: {
            responsive: true,
            legend: {
                position: 'top',
            },
            title: {
                display: false,
            }
        }
    });
}

