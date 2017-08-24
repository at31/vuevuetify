<template>                          
        <v-layout row wrap>
           <v-flex xs12 md12 sm12 class="pb-2">
               <div id="ymap" style="height:800px"></div>
           </v-flex>
        </v-layout>
</template>

<script>

var self;
export default {
    name: 'usersList',
    components: {

    },
    data() {
        return {
            geoCollection: {removeAll: function () { return true; }},
            myBalloonContentBodyLayout: {},
            showPODetail: false,
            filter: {},
            postalCodeVal: '',
            postalCodeOpt: false,
            evntsVal: '',
            evntsOpt: false,
            fdVisible: false,
            mymap: {}
        };
    },
    mounted() {
        self = this;
        // mapRender();
    },
    watch: {
        selectedPO: function (n, o) {
            if (n.length > 0) {
                console.log('selectedPO');
                mapRender();
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
    window.ymaps.ready(() => {
        console.log('map loaded');
        self.mymap = new window.ymaps.Map('ymap', {
            center: [50.59, 36.58],
            zoom: 10,
            controls: ['routeEditor']
        });
        setMark();
    });
}

function setMark() {
    if (self._route) { self.mymap.geoObjects.remove(self._route); }
    self.geoCollection.removeAll();
    self.geoCollection = null;
    self.myBalloonContentBodyLayout = customBCBL();
    self.geoCollection = new ymaps.GeoObjectCollection();
    self.$store.state.po.selectedPO.forEach(function (otd) {
        var pmark = pmarkFab(otd, self.myBalloonContentBodyLayout);
        self.geoCollection.add(pmark);
    });
    self.mymap.geoObjects.add(self.geoCollection);
}

function customBCBL() {
    console.log(ymaps.templateLayoutFactory);
    var myBalloonContentBodyLayout = ymaps.templateLayoutFactory.createClass(
        '<p>$[properties.data.postalCode]</p><p>$[properties.data.addressSource]</p><p>$[properties.data.typeCode]</p><p>кол-во заявок $[properties.data.evnts.length]</p><br /><button id="show-po-detail-btn">Подробно</button><br /><button id="add-to-path-btn">В список</button>', {
            build: function () {
                myBalloonContentBodyLayout.superclass.build.call(this);
                var _this = this;
                var el = document.getElementById('show-po-detail-btn');
                el.addEventListener('click', function () {
                    self.openPODetail(_this._data.properties._data.data);
                });

                el = document.getElementById('add-to-path-btn');
                el.addEventListener('click', function () {
                    self.addToSelectedPOList(_this._data.properties._data.data);
                });
            },
            clear: function () {
                myBalloonContentBodyLayout.superclass.clear.call(this);
            }
        });
    return myBalloonContentBodyLayout;
}

function pmarkFab(otd, myBalloonContentBodyLayout) {
    var stl = 'islands#darkgreenStretchyIcon';
    if (otd.evnts.length >= '1') {
        stl = 'islands#darkblueStretchyIcon';
    }
    if (otd.evnts.length >= '3') {
        stl = 'islands#violetStretchyIcon';
    }

    const pmark = new window.ymaps.Placemark([otd.latitude, otd.longitude], {
        data: otd,
        iconContent: otd.postalCode + ' / ' + otd.evnts.length,
        iconCaption: otd.postalCode
    }, {
        balloonContentLayout: myBalloonContentBodyLayout,
        preset: stl
    });

    return pmark;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
   
</style>
