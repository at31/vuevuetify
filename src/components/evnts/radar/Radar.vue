<template>                          
        <v-layout row wrap>
        <v-btn class="ml-2 teal darken-3" @click.native="filterShow=!filterShow" light>
            <v-icon light class="mr-2">filter_list</v-icon>
            Фильтр
        </v-btn>         
           <v-flex xs12 md12 sm12 class="pb-2 r-position">
               <pogmap></pogmap> 
            <v-flex md4 class='a-position-l' v-if="filterShow">
                <pofilter></pofilter>
           </v-flex>
            <v-flex sm12 class='a-position'>
                <preevntlist></preevntlist>
           </v-flex>
           <v-flex sm12 class='a-position-r'>
                <eventdeletecard v-if="cardType==='delete'"></eventdeletecard>
                <eventeditcard v-if="cardType==='edit'"></eventeditcard>
           </v-flex>
           </v-flex>
        </v-layout>
</template>

<script>
import Pogmap from '@/components/evnts/radar/Radargmap';
import Pofilter from '@/components/evnts/radar/Filter';
import Preevntlist from './PreevntList';
import Eventeditcard from '@/components/evnts/radar/Eventeditcard';
import Eventdeletecard from '@/components/evnts/radar/Eventdeletecard';


export default {
    name: 'radar',
    components: {
        Pofilter,
        Preevntlist,
        Pogmap,
        Eventeditcard,
        Eventdeletecard
    },
    data() {
        return {
            // cardType: '',
            filterShow: false // for dev false in production
        };
    },
    created() {
        this.$store.dispatch('onRadarSocketIO');
    },
    mounted() {
        this.$store.commit('ATITLE', {title: 'Радар', color: 'teal'});
    },
    watch: {
        /* '$store.state.events.cardType': function (n, o) {
            console.log(n);
            this.cardType = '';
            this.cardType = n;
        } */
    },
    computed: {
        cardType() {
            return this.$store.state.radar.cardTypePreEvnt;
        }
    },
    methods: {
        /* goPathFilter() {
            this.$router.push({
                path: '/list-new-evnt',
                params: {
                    hi: 'hi @at31'
                }
            });
        } */
    }
};


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.r-position{
    position:relative;
}
.a-position{
    position: absolute;
    top: 50px;
    left: 50px;
    max-width: 500px;
}
.a-position-l{
    position: absolute;
    top: 50px;
    left: 550px;
}
.a-position-r{
    position: absolute;
    top: 50px;
    right: 50px;
}

</style>
