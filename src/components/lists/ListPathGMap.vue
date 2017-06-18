<template>
    <div id="gmap" style="height:800px">
        <h4 v-if="error">{{pathLongError}}</h4>
    </div> 
    
</template>

<script>

// import MarkerWithLabel from 'markerwithlabel';

var self;
export default {
    name: 'pathgmap',
    components: {
    },
    data() {
        return {
            mymap: {},
            markers: [],
            error: false,
            pathLongError: 'К сожалению, GOOGLE не обрабатывает больше 23 промежуточных точек маршрута.'
        };
    },
    mounted() {
        console.log('gmap mounted');
        self = this;
        if (this._path.length > 0 & this._path.length < 23) {
            this.error = false;
            if (typeof (window.google) === 'object') {
               // mapRender();
            } else {
                window.addEventListener('gmaploaded', function (e) {
                   // mapRender();
                }, false);
            }
        } else if (this._path.length >= 23) {
            this.error = true;
        }
    },
    watch: {
        _path: function (n, o) {
            clearMap();
            console.log('n', n.length);
            if (n.length > 0 & n.length < 23) {
                this.error = false;
                if (typeof (window.google) === 'object') {
                    mapRender();
                } else {
                    window.addEventListener('gmaploaded', function (e) {
                        mapRender();
                    }, false);
                }
            } else if (n.length >= 23) {
                this.error = true;
            }
        }
    },
    computed: {
        _path() {
            return this.$store.state.lists.currList.path;
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
    // var MarkerWL = MarkerWithLabel(window.google.maps);
    map = new google.maps.Map(document.getElementById('gmap'), {
        center: {lat: 50.59, lng: 36.58},
        zoom: 12});
    // console.log(map, self);

    var directionsDisplay = new google.maps.DirectionsRenderer();
    var directionsService = new google.maps.DirectionsService();
    let _last = self._path.length - 1;
    let waypts = self._path.map(po => {
        return {
            location: new google.maps.LatLng(po.latitude, po.longitude),
            stopover: true};
    });
    waypts.splice(_last, 1);
    waypts.splice(0, 1);
    console.log(waypts);
    var request = {
        origin: new google.maps.LatLng(self._path[0].latitude, self._path[0].longitude),
        destination: new google.maps.LatLng(self._path[_last].latitude, self._path[_last].longitude),
        waypoints: waypts,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };

    directionsService.route(request, function (response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });

    directionsDisplay.setMap(map);


    /*

    self._path.forEach((po, indx) => {
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
    });*/
}

/*
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
*/

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
