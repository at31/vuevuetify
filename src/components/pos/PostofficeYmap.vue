<template>
    <div id="ymap" style="height:800px"></div> 
</template>

<script>
var self;
let mymap = {};
let geoCollection = {removeAll: function () { return true; }};

export default {
    name: 'pogmap',
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
                window.removeEventListener('ymapsloaded');
                mapRender();
            }, false);
        }
    },
    beforeDestroy() {
        console.log('beforeDestroy PostofficeYMap.vue');
        geoCollection.removeAll();
        // geoCollection = null;
        mymap.destroy();
        mymap = null;
    },
    watch: {
        selectedPO: function (n, o) {
            console.log('whatch', n, o);
            if (n.length > 0) {
                if (window.ymapsloaded) {
                    createMarks();
                }
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
function createMarks() {
    clearMap();
    self.selectedPO.forEach(po => {
        let pmark = new ymaps.Placemark([po.latitude, po.longitude], {
            balloonContent: '<strong>' + po.postalCode + '</strong>',
            iconContent: '<strong>' + po.postalCode + '</strong>',
            hintContent: '<strong>' + po.addressSource + '</strong>'
        }, {
            preset: 'islands#nightStretchyIcon'
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
