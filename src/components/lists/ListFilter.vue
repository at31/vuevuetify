<template>
<v-card>
<v-card-row>
    <v-card-title>
        <span class="">Фильтр</span>
        
        </v-card-title>
            </v-card-row>
    <v-card-text>        
        
        <v-layout row wrap>               
                <v-flex xs12>
                  <v-text-field
                    label="MongoDB $match"
                    v-model="mongoMatch"
                    counter
                    multi-line
                    max="200"
                  ></v-text-field>
                </v-flex>
              </v-layout>

    </v-card-text>        
            <v-divider></v-divider>        
        <v-card-row actions>
        <v-btn  @click.native="removeFilter" floating light small error>
            <v-icon light>clear</v-icon>            
        </v-btn>
        <v-btn class="ml-2" @click.native="doFilter" success light>
            <v-icon light>filter_list</v-icon>
            Применить фильтр
        </v-btn>        
        </v-card-row>
          
    </v-card>
</template>

<script>

export default {
    name: 'pofilter',
    components: {

    },
    data() {
        return {
            mongoMatch: '{"status":{"$ne": "open"}}',
            filter: {}

        };
    },
    mounted() {

    },
    watch: {
        'filterForm.postalCode': function (n, o) {
            var foobody = `if (obj.postalCode.search(${n})>-1){
                                    return true;
                                }else{
                                    return false;
                                }`;
            this.filter.postalCode = new Function('obj', foobody);
        }
    },
    computed: {
        selectedPO() {
            return this.$store.state.po.selectedPO;
        }
    },
    methods: {
        doFilter() {
            var filter = {search: JSON.parse(this.mongoMatch)};
            this.$store.dispatch('filterList', filter);
            this.$store.commit('LISTS_FILTER', false);
        },
        removeFilter() {
            this.$store.dispatch('getListsAll');
        }
    }
};


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

</style>
