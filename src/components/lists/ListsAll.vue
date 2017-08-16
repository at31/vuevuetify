<template>
<v-card >
    <v-card-row>
        <v-card-title>
            <span class="">Все списки</span>
        </v-card-title>
    </v-card-row>
    <v-list class="polist">
          <v-list-item v-for="(list, index) in lists" v-bind:key="list._id" >
            <v-list-tile avatar class="l-list-item">
              <v-list-tile-action>
                <!--v-checkbox v-model="list.fixed" @change="fixedlist(list)"></v-checkbox-->
                <v-icon>list</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ list.title }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ list.description.substr(0,50) }}</v-list-tile-sub-title>
                <v-list-tile-sub-title class="grey--text text--darken-4">заданий: 
                <v-chip class="green lighten-5">
      {{ list.evnts.length }}
    </v-chip></v-list-tile-sub-title>
    <v-list-tile-sub-title class="grey--text text--darken-4">исполнитель: 
      {{ list.executor.fio }} 
                </v-list-tile-sub-title>                
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon class="indigo--text" @click.native="showDetail(list)">
                  <v-icon>info</v-icon>
                </v-btn>                
              </v-list-tile-action>
              <v-list-tile-action>
                <v-btn icon class="red--text text--darken-4"  @click.native="showDelete(list)">
                  <v-icon>delete</v-icon>
                </v-btn>                
              </v-list-tile-action>
              <v-list-tile-action>
                <v-btn icon  class="indigo--text" @click.native="showEdit(list)">
                  <v-icon>edit</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="index + 1 < lists.length"></v-divider>
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
    name: 'listsall',
    components: {

    },
    data() {
        return {

        };
    },
    mounted() {

    },
    watch: {
        lists: function (n, o) {

        }
    },
    computed: {
        lists() {
            return this.$store.state.lists.lists;
        }
    },
    methods: {
        showDetail(list) {
            this.$store.commit('SET_CURR_LIST', list);
            this.$store.commit('CARD_TYPE_LIST', 'info');
        },
        showDelete(list) {
            this.$store.commit('SET_CURR_LIST', list);
            this.$store.commit('CARD_TYPE_LIST', 'delete');
        },
        showEdit(list) {
            this.$store.commit('SET_CURR_LIST', list);
            this.$store.commit('CARD_TYPE_LIST', 'edit');
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
    .l-list-item{
        height: 150px;
    }
</style>
