<template>
    <div id="ymap" style="height:800px">
        <h4 v-if="error">{{pathLongError}}</h4>
    </div> 
    
</template>

<script>
let mymap = {};
let _route = '';

var self;
export default {
    name: 'pathgmap',
    components: {
    },
    data() {
        return {

            error: false,
            pathLongError: 'Нет данных для построения маршрута'
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
        _route = null;
        mymap.destroy();
        mymap = null;
    },
    watch: {
        selectedPO: function (n, o) {
            if (window.ymapsloaded) {
                if (n.length > 0) {
                    this.error = false;
                    createPath();
                } else if (n.length === 0) {
                    this.error = true;
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
function mapRender() {
    mymap = new window.ymaps.Map('ymap', {
        center: [50.59, 36.58],
        zoom: 10,
        controls: ['routeEditor']
    });
    if (self.selectedPO.length > 0) {
        createPath();
    }
}
function createPath() {
    if ((typeof _route) === 'object') {
        mymap.geoObjects.remove(_route);
    }
    var pathArr = self.selectedPO.map(function (otd) {
        return {
            type: 'wayPoint',
            point: [otd.latitude, otd.longitude]
        };
    });
    window.ymaps.route(pathArr).then(
                    function (route) {
                        mymap.geoObjects.add(route);
                        _route = route;
                        mymap.geoObjects.add(route);
                        var points = route.getWayPoints();
                        points.options.set('preset', 'islands#blueStretchyIcon');
                        points.each(function (el, i) {
                            el.properties.set('iconContent', self.selectedPO[i].postalCode + ' точка №' + (i + 1));
                            el.properties.set('balloonContent', self.selectedPO[i].postalCode + ' точка №' + (i + 1));
                        });
                    },
                    function (error) {
                        alert('Возникла ошибка: ' + error.message);
                    }
                );
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
</style>
