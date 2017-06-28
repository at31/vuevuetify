<template>
    <div id="ymap" style="height:800px"></div> 
</template>

<script>

// import MarkerWithLabel from 'markerwithlabel';

var self;
// var map;
// var MarkerWL;

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
        console.log('ymap mounted');
        self = this;
        if (typeof (window.ymaps) === 'object') {
            mapRender();
        }
    },
    beforeDestroy() {
        self.mymap.destroy();
    },
    watch: {
        selectedPO: function (n, o) {

        },
        mapCenter: function (po) {

        },
        position: function (newAddress) {}

    },
    computed: {
        selectedPO() {
            return this.$store.getters.listPO;
        },
        mapCenter() {
            return this.$store.state.po.currPO;
        },
        position() {
            return this.$store.state.po.newAddressSource;
        }
    },
    methods: {

    }
};


function mapRender() {
    window.ymaps.ready(() => {
        console.log('map loaded');
        self.mymap = new window.ymaps.Map('ymap', {
            center: [50.59, 36.58],
            zoom: 10,
            controls: ['routeEditor']
        });
       // setMark();
    });
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

</style>
