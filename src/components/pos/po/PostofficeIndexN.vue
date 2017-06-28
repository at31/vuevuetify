<template>                          
        <v-layout row wrap>
        <v-btn class="ml-2 teal darken-3" @click.native="filterShow=!filterShow" light>
            <v-icon light class="mr-2">filter_list</v-icon>
            Фильтр
        </v-btn> 
        <v-btn class="ml-2 teal " @click.native="" light>
            <v-icon light class="mr-2">account_balance</v-icon>
            Новое отделение
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
                <newcard v-if="cardType==='new'"></newcard>
                <editcard v-if="cardType==='edit'"></editcard>
                <deletecard v-if="cardType==='delete'"></deletecard>
                <infocard v-if="cardType==='info'"></infocard>
           </v-flex>
           </v-flex>
        </v-layout>
</template>

<script>
import Pogmap from '@/components/pos/po/Postofficegmap';
import Pofilter from '@/components/pos/Postofficesfilter';
import Polist from '@/components/pos/po/Postofficesselectedlist';
import Newcard from '@/components/pos/po/PostofficeNewCard';
import Editcard from '@/components/pos/po/PostofficeEditCard';
import Deletecard from '@/components/pos/po/PostofficeDeleteCard';
import Infocard from '@/components/pos/po/PostofficeInfoCard';


export default {
    name: 'pos',
    components: {
        Pofilter,
        Polist,
        Pogmap,
        Newcard,
        Editcard,
        Deletecard,
        Infocard
    },
    data() {
        return {
            filterShow: true // for dev false in production
        };
    },
    mounted() {
        this.$store.commit('ATITLE', {title: 'Управление данными об отделениях', color: 'teal'});
    },
    watch: {

    },
    computed: {
        cardType() {
            return this.$store.state.po.poCardType;
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
    left: 500px;
}
.a-position-r{
    position: absolute;
    top: 50px;
    right: 50px;
}

</style>
