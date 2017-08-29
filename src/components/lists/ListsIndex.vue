<template>
    <v-layout row wrap>
           <v-flex xs12 md12 sm12 class="pb-2">
                <v-btn @click.native="onAddBtn" light success class="">
                <v-icon>list</v-icon>
                Новый список
                </v-btn>
                <v-btn @click.native="showFilter" light success class="">
                <v-icon>search</v-icon>
                Фильтр
                </v-btn>
          </v-flex> 
          <v-flex xs12 md4 sm12 class="r-list">
                <listslist></listslist>                        
          </v-flex>
          <v-flex xs12 md4 sm12 class="r-list">
                <listinfo v-if="cardType==='info'"></listinfo>
                <listedit v-if="cardType==='edit'"></listedit>
                <listdelete v-if="cardType==='delete'"></listdelete>
                <listfilter v-if="filter"></listfilter>                
          </v-flex>
          <v-flex xs12 md4 sm12 class="r-list">
              <pathgmap ></pathgmap>
          </v-flex>
    </v-layout>  
</template>

<script>
import Listslist from './ListsAll';
import Listinfo from './ListInfo';
import Listedit from './ListEdit';
import Listdelete from './ListDelete';
import Pathgmap from './ListPathYMap';
import Listfilter from './ListFilter';


export default {
    name: 'listindex',
    components: {
        Listslist,
        Pathgmap,
        Listinfo,
        Listedit,
        Listdelete,
        Listfilter
    },
    data() {
        return {

        };
    },
    props: {
        atitle: {
            type: String,
            default: 'Vue!'
        }
    },
    created() {
        this.$store.dispatch('getListsAll');
    },
    mounted() {
        this.$store.commit('ATITLE', {title: 'Управление списками', color: 'green'});
    },
    watch: {

    },
    computed: {
        cardType() {
            return this.$store.state.lists.cardTypeLists;
        },
        filter() {
            return this.$store.state.lists.filter;
        }
    },
    methods: {
        showFilter() {
            this.$store.commit('LISTS_FILTER', !this.filter);
        },
        onAddBtn() {
            this.$router.push({
                path: '/list-new',
                params: {
                    hi: 'hi @at31'
                }
            });
        }

    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
   
</style>
