<template>
    <div id="ymap" style="height:800px"></div> 
</template>

<script>
var self;
let mymap = {};
var geoCollection = {removeAll: function () { return true; }};

export default {
    name: 'radarymap',
    components: {
    },
    data() {
        return {
        };
    },
    mounted() {
        self = this;
        if (window.ymapsloaded) {
            mapRender();
        } else {
            window.addEventListener('ymapsloaded', function (e) {
                mapRender();
                window.removeEventListener('ymapsloaded');
            }, false);
        }
    },
    beforeDestroy() {
        console.log('beforeDestroy rdar');
        geoCollection.removeAll();
        // geoCollection = null;
        mymap.destroy();
        mymap = null;
    },
    watch: {
        preevnts: function (n, o) {

        },
        mapCenter: function (evnt) {
            if (evnt.status !== 'dummy') {
                createMarks();
                this.mymap.setCenter([evnt.po.latitude, evnt.po.longitude]);
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

function createMarks() {
    clearMap();
    self.selectedPO.forEach(po => {
        let color = 'islands#nightStretchyIcon';
        if (self.mapCenter.status !== 'dummy') {
            if (po.postalCode === self.mapCenter.po.postalCode) {
                color = 'islands#redStretchyIcon';
            }
        }
        let pmark = new ymaps.Placemark([po.latitude, po.longitude], {
            balloonContent: '<strong>' + po.postalCode + '</strong>',
            iconContent: '<strong>' + po.postalCode + '</strong>',
            hintContent: '<strong>' + po.addressSource + '</strong>'
        }, {
            preset: color
            // iconColor: '#735184'
        });
        geoCollection.add(pmark);
    });
    mymap.geoObjects.add(geoCollection);
}

function clearMap() {
    geoCollection.removeAll();
    geoCollection = null;
    geoCollection = new ymaps.GeoObjectCollection();
}

function mapRender() {
    console.log('mapRender');
    mymap = new window.ymaps.Map('ymap', {
        center: [50.59, 36.58],
        zoom: 10,
        controls: ['routeEditor']
    });
    if (self.selectedPO.length > 0) {
        createMarks();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

</style>
