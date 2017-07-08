<template>
    <div id="ymap" style="height:800px"></div> 
</template>

<script>

// import MarkerWithLabel from 'markerwithlabel';

let mymap = {};
let geoCollection = {removeAll: function () { return true; }};

export default {
    name: 'poYmap',
    components: {
    },
    data() {
        return {

        };
    },
    mounted() {
        if (window.ymapsloaded) {
            mapRender();
        } else {
            window.addEventListener('ymapsloaded', function (e) {
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
        poCardType: function (pct) {
            let color = 'islands#darkGreenStretchyIcon';
            if (pct === 'edit') {
                color = 'islands#nightStretchyIcon';
            }
            if (pct === 'delete') {
                color = 'islands#redStretchyIcon';
            }
            geoCollection.removeAll();
            geoCollection = null;
            let pmark = new ymaps.Placemark([this.currPO.latitude, this.currPO.longitude], {
                balloonContent: '<strong>' + this.currPO.postalCode + '</strong>',
                iconContent: '<strong>' + this.currPO.postalCode + '</strong>',
                hintContent: '<strong>' + this.currPO.addressSource + '</strong>'
            }, {
                preset: color
            // iconColor: '#735184'
            });
            geoCollection = new ymaps.GeoObjectCollection();
            geoCollection.add(pmark);
            mymap.setCenter([this.currPO.latitude, this.currPO.longitude]);
            mymap.geoObjects.add(geoCollection);
        }

    },
    computed: {
        poCardType() {
            return this.$store.state.po.poCardType;
        },
        currPO() {
            return this.$store.state.po.currPO;
        }
    },
    methods: {

    }
};


function mapRender() {
    console.log('mapRender');
    mymap = new window.ymaps.Map('ymap', {
        center: [50.59, 36.58],
        zoom: 10
    });
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

</style>
