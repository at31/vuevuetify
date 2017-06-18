<template>
<v-card >
    <v-card-row>
        <v-card-title>
            <span class="">Список выбранных отделений</span>
        </v-card-title>
    </v-card-row>
    <v-list three-line class="polist">
          <v-list-item v-for="(po, index) in selectedPO" v-bind:key="po._id">
            <v-list-tile avatar>
              <v-list-tile-action>
                <v-checkbox v-model="po.fixed" @change="fixedPO(po)"></v-checkbox>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Индекс: {{ po.postalCode }}</v-list-tile-title>
                <v-list-tile-sub-title class="grey--text text--darken-4">заданий: 
                <v-chip >
      {{ po.evntsLength }}
    </v-chip>
                
                </v-list-tile-sub-title>                
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon class="indigo--text" @click.native="showPODetail(po)">
                  <v-icon>info</v-icon>
                </v-btn>                
              </v-list-tile-action>
              <v-list-tile-action>
                <v-btn icon class="red--text text--darken-4" :disabled="po.fixed" @click.native="deletePO(po)">
                  <v-icon>delete</v-icon>
                </v-btn>                
              </v-list-tile-action>
              <v-list-tile-action>
                <v-btn icon  class="indigo--text" :disabled="po.fixed">
                  <v-icon>edit</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="index + 1 < selectedPO.length"></v-divider>
          </v-list-item>
        </v-list>    
            <v-divider></v-divider>
        <v-card-row actions>
        <v-btn class="ml-2" @click.native="deleteUnSelected" success light>
            <v-icon light>highlight_off</v-icon>
            Удалить не выбранные
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
            filter: {postalCode: ''}

        };
    },
    mounted() {

    },
    watch: {
        selectedPO: function (n, o) {

        }
    },
    computed: {
        selectedPO() {
            return this.$store.state.po.selectedPO;
        }
    },
    methods: {
        deleteUnSelected() {
            this.$store.commit('PO_REMOVE_UNSELECTED');
        },
        deletePO(po) {
            this.$store.commit('PO_REMOVE_FROM_LIST', po);
        },
        fixedPO() {

        },
        showPODetail(po) {
            this.$store.commit('SET_CURR_PO', po);
            this.$store.commit('SHOW_PO_DIALOG', true);
        }
    }
};


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
    .polist{
        max-height: 550px;
        overflow-y: scroll;
    }
</style>
