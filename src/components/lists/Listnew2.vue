<template>                          
        <v-layout row wrap>                   
            <v-flex md4 >
                <eventpolist v-bind:poevents="selectedPO"></eventpolist>
           </v-flex>
            <v-flex md5 >
                <pathgmap></pathgmap>
           </v-flex>
           <v-flex md3>
               <listnewcard></listnewcard>
           </v-flex>
        </v-layout>
</template>

<script>
import Eventpolist from '@/components/evnts/Eventspolist';
import Pathgmap from '@/components/evnts/Pathgmap';
import Listnewcard from '@/components/lists/Listnewcard';

export default {
    name: 'listnew2',
    components: {
        Eventpolist,
        Pathgmap,
        Listnewcard
    },
    data() {
        return {

        };
    },
    mounted() {
        this.$store.commit('ATITLE', {title: 'Создание нового списка - шаг 2 ( из 2 )', color: 'indigo'});
        this.$store.dispatch('getUsers');
    },
    watch: {

    },
    computed: {
        selectedPO() {
            return this.$store.state.po.selectedPO;
        }
    },
    methods: {

    }
};


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

</style>
