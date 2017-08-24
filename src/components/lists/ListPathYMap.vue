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
        console.log('ygmap mounted');
        self = this;
        if (window.ymaps.Map !== undefined) {
            mapRender();
        } else {
            let handler = () => {
                document.body.removeEventListener('ymapsloaded', handler, false);
                mapRender();
            };
            document.body.addEventListener('ymapsloaded', handler, false);
        }
    },
    beforeDestroy() {
        _route = null;
        mymap.destroy();
        mymap = null;
    },
    watch: {
        currList: function (n, o) {
            if (n.path.length > 0) {
                createPath();
            }
        }
    },
    computed: {
        currList() {
            return this.$store.state.lists.currList;
        }
    },
    methods: {

    }
};
function createPath() {
    if ((typeof _route) === 'object') {
        mymap.geoObjects.remove(_route);
    }
    var pathArr = self.currList.path.map(function (otd) {
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
                el.properties.set('iconContent', self.currList.path[i].postalCode + ' точка №' + (i + 1));
                el.properties.set('balloonContent', self.currList.path[i].postalCode + ' точка №' + (i + 1));
            });
        },
        function (error) {
            alert('Возникла ошибка: ' + error.message);
        }
    );
}
/*
function clearMap() {
    self.geoCollection.removeAll();
    self.geoCollection = null;
    self.geoCollection = new ymaps.GeoObjectCollection();
}
*/
function mapRender() {
    mymap = new window.ymaps.Map('ymap', {
        center: [50.59, 36.58],
        zoom: 10,
        controls: ['routeEditor']
    });
    if (self.currList.path.length > 0) {
        createPath();
    }
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
