<template>
    <div id="gmap" style="height:800px"></div> 
</template>

<script>

import MarkerWithLabel from 'markerwithlabel';

var self;
export default {
    name: 'pogmap',
    components: {
    },
    data() {
        return {
            mymap: {},
            markers: []
        };
    },
    mounted() {
        console.log('gmap mounted');
        self = this;
        if (typeof (window.google) === 'object') {
            mapRender();
        } else {
            window.addEventListener('gmaploaded', function (e) {
                mapRender();
            }, false);
        }
    },
    watch: {
        selectedPO: function (n, o) {
            clearMap();
            // console.log('n', n);
            if (n.length > 0) {
                if (typeof (window.google) === 'object') {
                    mapRender();
                } else {
                    window.addEventListener('gmaploaded', function (e) {
                        mapRender();
                    }, false);
                }
            } else if (n.length === 0) {
                // clearMap();
            }
        }
    },
    computed: {
        selectedPO() {
            return this.$store.state.po.selectedPO;
        }
    },
    methods: {

    }
};

function clearMap() {
    self.markers.forEach(m => {
        m.map = null;
    });
    self.markers = [];
}

function mapRender() {
    var map;
    var MarkerWL = MarkerWithLabel(window.google.maps);
    map = new google.maps.Map(document.getElementById('gmap'), {
        center: {lat: 50.59, lng: 36.58},
        zoom: 12});
    // console.log(map, self);

   /* var directionsDisplay = new google.maps.DirectionsRenderer();
    var directionsService = new google.maps.DirectionsService();

    var request = {
        origin: new google.maps.LatLng(60.023539414725356, 30.283663272857666), // точка старта
        destination: new google.maps.LatLng(59.79530896374892, 30.410317182540894), // точка финиша
        travelMode: google.maps.DirectionsTravelMode.DRIVING // режим прокладки маршрута
    };

    directionsService.route(request, function (response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });

    directionsDisplay.setMap(map); */

    self.selectedPO.forEach((po, indx) => {
        var _color = 'skyblue';
        if (po.evnts.length >= '1') {
            _color = 'yellow';
        }
        if (po.evnts.length >= '3') {
            _color = 'red';
        }

        var marker = new MarkerWL({
            position: new google.maps.LatLng(po.latitude, po.longitude),
            // map: map,
            draggable: true,
            raiseOnDrag: true,
            labelContent: po.label,
            labelAnchor: new google.maps.Point(27, -5), // new google.maps.Point(27, 65),
            labelClass: 'labels', // the CSS class for the label
            labelInBackground: false,
            icon: pinSymbol(_color),
            scaledSize: new window.google.maps.Size(50, 50),
            animation: window.google.maps.Animation.DROP
        });

        window.setTimeout(function () {
            marker.setMap(map);
        }, indx + 550);
        self.markers.push(marker);
        // console.log(marker);
    });
}

function pinSymbol(color) {
    return {
        path: 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z',
        fillColor: color,
        fillOpacity: 1,
        strokeColor: '#000',
        strokeWeight: 1,
        scale: 0.5
    };
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.labels {
    color: black;
    padding: 3px;
    /*font-weight: bold;*/
    background-color: white;
    font-family:"Lucida Grande", "Arial", sans-serif;
    font-size: 14px;
    text-align: center;
    white-space: nowrap;
    -webkit-box-shadow: 0px 3px 1px 0px rgba(0,0,0,0.5);
-moz-box-shadow: 0px 3px 1px 0px rgba(0,0,0,0.5);
box-shadow: 0px 3px 1px 0px rgba(0,0,0,0.5);
}

</style>
