<template>
<v-card>
<v-card-row>
    <v-card-title>
        <span class="">Фильтр</span>
        
        </v-card-title>
            </v-card-row>
    <v-card-text>        
        <v-layout row>
          <v-flex xs4>
            <v-subheader>Индекс</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              name="postalCodeInput"
              label="индекс"
              id="postalCode"
              v-model="filterForm.postalCode"
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
            filterForm: {postalCode: ''},
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
            this.$store.commit('PO_FILTER', this.filter);
        },
        removeFilter() {
            this.$store.dispatch('removeFilterMap');
        }
    }
};


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

</style>
