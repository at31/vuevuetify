<template>
<v-card >
    <v-card-row>
        <v-card-title>
            <span class="">Список отделений</span>
        </v-card-title>
    </v-card-row>
    <v-list three-line class="polist">
          <v-list-item v-for="(po, index) in selectedPO" v-bind:key="po.id">
            <v-list-tile avatar>
              <v-list-tile-action>
                <!--v-checkbox v-model="po.fixed" @change="fixedPO(po)"></v-checkbox-->
                <v-icon>local_post_office</v-icon>
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
                <v-btn icon class="indigo--text" @click.native="showDetail(po)">
                  <v-icon>info</v-icon>
                </v-btn>                
              </v-list-tile-action>
              <v-list-tile-action>
                <v-btn icon class="red--text text--darken-4"  @click.native="showDelete(po)">
                  <v-icon>delete</v-icon>
                </v-btn>                
              </v-list-tile-action>
              <v-list-tile-action>
                <v-btn icon  class="indigo--text" @click.native="showEdit(po)">
                  <v-icon>edit</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="index + 1 < selectedPO.length"></v-divider>
          </v-list-item>
        </v-list>    
            <v-divider></v-divider>
        <v-card-row actions>
        <!--v-btn class="ml-2" @click.native="deleteUnSelected" success light>
            <v-icon light>highlight_off</v-icon>
            Удалить выбранные отделения
        </v-btn-->  
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
            return this.$store.getters.listPO;
        }
    },
    methods: {
        showDetail(po) {
            this.$store.commit('SET_CURR_PO', po);
            this.$store.commit('CARD_TYPE_PO', 'info');
        },
        showDelete(po) {
            this.$store.commit('SET_CURR_PO', po);
            this.$store.commit('CARD_TYPE_PO', 'delete');
        },
        showEdit(po) {
            this.$store.commit('SET_CURR_PO', po);
            this.$store.commit('CARD_TYPE_PO', 'edit');
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
