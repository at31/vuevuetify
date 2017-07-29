<template>
    <div id="ymap" style="height:800px"></div> 
</template>

<script>

// import MarkerWithLabel from 'markerwithlabel';

let mymap = {};
let geoCollection = {removeAll: function () { return true; }};
let self = {};
export default {
    name: 'poYmap',
    components: {
    },
    data() {
        return {
            po: {}
        };
    },
    mounted() {
        self = this;
        console.log('this.currPO ', this.currPO);
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
            markCentrChange(setColor(pct));
        },
        currPO: function (cp) {
            markCentrChange(setColor(this.poCardType));
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

function setColor(pct) {
    let color = 'islands#darkGreenStretchyIcon';
    if (pct === 'edit') {
        color = 'islands#nightStretchyIcon';
    }
    if (pct === 'delete') {
        color = 'islands#redStretchyIcon';
    }
    return color;
}
function markCentrChange(color) {
    geoCollection.removeAll();
    // geoCollection = null;
    let pmark = new window.ymaps.Placemark([self.currPO.latitude, self.currPO.longitude], {
        balloonContent: '<strong>' + self.currPO.postalCode + '</strong>',
        iconContent: '<strong>' + self.currPO.postalCode + '</strong>',
        hintContent: '<strong>' + self.currPO.addressSource + '</strong>'
    }, {
        preset: color
            // iconColor: '#735184'
    });
    geoCollection = new window.ymaps.GeoObjectCollection();
    geoCollection.add(pmark);
    mymap.setCenter([self.currPO.latitude, self.currPO.longitude]);
    mymap.geoObjects.add(geoCollection);
}

function mapRender() {
    console.log('mapRender');
    mymap = new window.ymaps.Map('ymap', {
        center: [50.59, 36.58],
        zoom: 10
    });
    if (self.currPO.postalCode !== '') {
        markCentrChange(setColor(self.poCardType));
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

</style>
