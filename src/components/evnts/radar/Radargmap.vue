<template>
    <div id="gmap" style="height:800px"></div> 
</template>

<script>

import MarkerWithLabel from 'markerwithlabel';

var self;
var map;
var MarkerWL;

export default {
    name: 'radargmap',
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
        preevnts: function (n, o) {
            console.log(this.mapCenter.status);
            if (this.mapCenter.status === 'dummy') {
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
        mapCenter: function (evnt) {
            if (evnt.status !== 'dummy') {
                clearMap();
                markerRemake(evnt.po.postalCode);
                map.panTo(new window.google.maps.LatLng(evnt.po.latitude, evnt.po.longitude));
            }
        }
    },
    computed: {
        preevnts() {
            return this.$store.state.radar.preevnts;
        },
        selectedPO() {
            return this.$store.getters.preEvntPO;
        },
        mapCenter() {
            return this.$store.state.radar.currEvent;
        }
    },
    methods: {

    }
};

function clearMap() {
    console.log('clearMap');
    self.markers.forEach(m => {
        m.map = null;
        m.setMap(null);
    });
    self.markers = [];
    console.log('clearMap', self.markers);
}
function markerRemake(selectedPostalCode) {
    self.selectedPO.forEach((po, indx) => {
        if (po.postalCode !== selectedPostalCode) {
            let _color = 'grey';
            let _size = 0.5;
            /* if (po.postalCode === selectedPostalCode) {
            _color = 'red';
            _size = 0.7;
        } */

            let marker = new MarkerWL({
                position: new google.maps.LatLng(po.latitude, po.longitude),
                // map: map,
                draggable: true,
                raiseOnDrag: true,
                labelContent: po.label,
                labelAnchor: new google.maps.Point(27, -5), // new google.maps.Point(27, 65),
                labelClass: 'labels', // the CSS class for the label
                labelInBackground: false,
                icon: pinSymbol(_color, _size),
                scaledSize: new window.google.maps.Size(50, 50),
                // animation: window.google.maps.Animation.DROP,
                postalCode: po.postalCode
            });


            marker.setMap(map);
            self.markers.push(marker);
        // console.log(marker);
        } else if (po.postalCode === selectedPostalCode) {
            let marker = new google.maps.Marker({
                map: map,
                draggable: true,
                animation: window.google.maps.Animation.DROP,
                position: new window.google.maps.LatLng(po.latitude, po.longitude)
            });
            marker.setAnimation(window.google.maps.Animation.BOUNCE);
            self.markers.push(marker);
        }
    });
}

function mapRender() {
    MarkerWL = MarkerWithLabel(window.google.maps);
    map = new google.maps.Map(document.getElementById('gmap'), {
        center: {lat: 50.59, lng: 36.58},
        zoom: 12});
    // if (self.preevnts.length > 0) {
    self.selectedPO.forEach((po, indx) => {
        var _color = 'skyblue';


        var marker = new MarkerWL({
            position: new google.maps.LatLng(po.latitude, po.longitude),
            // map: map,
            draggable: true,
            raiseOnDrag: true,
            labelContent: po.label,
            labelAnchor: new google.maps.Point(27, -5), // new google.maps.Point(27, 65),
            labelClass: 'labels', // the CSS class for the label
            labelInBackground: false,
            icon: pinSymbol(_color, 0.5),
            scaledSize: new window.google.maps.Size(50, 50),
            animation: window.google.maps.Animation.DROP,
            postalCode: po.postalCode
        });

        window.setTimeout(function () {
            marker.setMap(map);
        }, indx + 550);
        self.markers.push(marker);
        // console.log(marker);
    });
    // }
    console.log('mapRender', self.markers);
}

function pinSymbol(color, size) {
    return {
        path: 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z',
        fillColor: color,
        fillOpacity: 1,
        strokeColor: '#000',
        strokeWeight: 1,
        scale: size// 0.5
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
