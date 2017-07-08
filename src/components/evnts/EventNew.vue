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
                <polist></polist>
           </v-flex>
           <v-flex sm12 class='a-position-r'>
                <eventnewcard></eventnewcard>
           </v-flex>
           </v-flex>
        </v-layout>
</template>

<script>
import Pogmap from '@/components/pos/PostofficeYmap';
import Pofilter from '../pos/Postofficesfilter';
import Polist from '../pos/Postofficesselectedlist';
import Eventnewcard from '../evnts/EventNewCard';


export default {
    name: 'listnew',
    components: {
        Pofilter,
        Polist,
        Pogmap,
        Eventnewcard
    },
    data() {
        return {
            filterShow: true // for dev false in production
        };
    },
    mounted() {
        this.$store.commit('ATITLE', {title: 'Создание нового задания', color: 'teal'});
    },
    watch: {

    },
    computed: {

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
    left: 500px;
}
.a-position-r{
    position: absolute;
    top: 50px;
    right: 50px;
}

</style>
