<template>                          
        <v-layout row wrap>
        <v-btn class="ml-2" @click.native="goPathFilter" success light>
            <v-icon light>navigate_next</v-icon>
            Выбор маршрута и заданий
        </v-btn> 
           <v-flex xs12 md12 sm12 class="pb-2 r-position">
               <pogmap></pogmap> 
            <v-flex md4 class='a-position'>
                <pofilter></pofilter>
           </v-flex>
            <v-flex md4 class='a-position-r'>
                <polist></polist>
           </v-flex>
           </v-flex>
        </v-layout>
</template>

<script>
import Pogmap from '@/components/pos/PostofficeYmap';
import Pofilter from '../pos/Postofficesfilter';
import Polist from '../pos/Postofficesselectedlist';


export default {
    name: 'listnew',
    components: {
        Pofilter,
        Polist,
        Pogmap
    },
    data() {
        return {
        };
    },
    mounted() {
        this.$store.commit('ATITLE', {title: 'Создание нового списка - шаг 1 ( из 2 )', color: 'indigo'});
    },
    watch: {

    },
    computed: {

    },
    methods: {
        goPathFilter() {
            this.$router.push({
                path: '/list-new-evnt',
                params: {
                    hi: 'hi @at31'
                }
            });
        }
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
    width: 300px;

}
.a-position-r{
    position: absolute;
    top: 50px;
    right: 50px;
}

</style>
