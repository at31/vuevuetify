<template>
        <v-tabs
    id="mobile-tabs-1"
    grow
    scroll-bars
    v-model="active"
    class="black--text">
<v-card class="red white--text">
<v-card-row>
          <v-card-title>Удаление</v-card-title>
        </v-card-row>
  </v-card>
    <v-tabs-bar slot="activators" class="white">
      <v-tabs-item        
        :key="1"
        :href="'#detail'"
        ripple>
        Общая информация
      </v-tabs-item>
      <v-tabs-item        
        :key="1"
        :href="'#events-list'"
        ripple>
        Задачи
      </v-tabs-item>
      <v-tabs-item        
        :key="1"
        :href="'#path'"
        ripple>
        Маршрут
      </v-tabs-item>
      <v-tabs-slider class="red darken-"></v-tabs-slider>
    </v-tabs-bar>
    <v-tabs-content         

      :id="'detail'"
    >
      <v-card flat>     
        <v-layout row>
            <v-flex xs4>
               <v-subheader>Заголовок</v-subheader>
            </v-flex>
            <v-flex xs8>
               <v-text-field
                  name="tile"
                  label="заголовок"
                  id="tile"
                  v-model="currList.title" readonly
                  ></v-text-field>
            </v-flex>
         </v-layout>
        <v-layout row>
            <v-flex xs4>
               <v-subheader>Описание</v-subheader>
            </v-flex>
            <v-flex xs8>
               <v-text-field
                  name="description"
                  label="описание"
                  id="description"
                  v-model="currList.description" readonly
                  ></v-text-field>
            </v-flex>
         </v-layout>
         <v-layout row>
            <v-flex xs4>
               <v-subheader>Исполнитель</v-subheader>
            </v-flex>
            <v-flex xs8>
               <v-text-field
                  name="fio"
                  label="исполнитель"
                  id="executor-fio"
                  v-model="currList.executor.fio"
                  readonly
                  ></v-text-field>
            </v-flex>            
         </v-layout> 
             <v-divider></v-divider>
      <v-card-row actions>
         <v-btn @click.native="confirmDeleteBtn" error light>
            <v-icon light>delete</v-icon>
            Подтвердить удаление
        </v-btn>        
      </v-card-row>     
      </v-card>
    </v-tabs-content>
    
    <v-tabs-content       
      :id="'events-list'"
    >
      <v-card flat>
       <v-list class="W900" three-line>
            <v-list-item v-for="(evnt, indx) in currList.evnts" v-bind:key="evnt._id"> 
                <v-list-tile avatar>
              <v-list-tile-avatar>
              <v-flex sm11>
                <v-icon>event</v-icon>
               </v-flex> 
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ evnt.label }}</v-list-tile-title>
                <v-list-tile-sub-title>{{evnt.postalCode}}</v-list-tile-sub-title>
                <v-list-tile-sub-title>{{ evnt.start.format('HH:mm YYYY-MM-DD') }} - {{ evnt.end.format('HH:mm YYYY-MM-DD') }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon ripple @click.native="showDetailEvent(evnt)">
                  <v-icon class="indigo--text text--lighten-1" >info</v-icon>
                </v-btn>
              </v-list-tile-action>              
            </v-list-tile>                               
            <v-divider v-if="indx + 1 < currList.evnts.length"></v-divider>
            </v-list-item>
            </v-list>
      </v-card>
    </v-tabs-content>
    <v-tabs-content   
      :id="'path'"
    >
      <v-card flat>
        <v-list class="W900" three-line>
            <v-list-item v-for="(po, indx) in currList.path" v-bind:key="po._id"> 
                <v-list-tile avatar>
              <v-list-tile-avatar>
              <v-flex sm11>
                <v-icon>account_balance</v-icon>
               </v-flex> 
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ po.label }}</v-list-tile-title>
                <v-list-tile-sub-title>{{po.postalCode}}</v-list-tile-sub-title>
                 <v-list-tile-sub-title>{{po.addressSource}}</v-list-tile-sub-title>                
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon ripple @click.native="showDetailPO(po)">
                  <v-icon class="indigo--text text--lighten-1" >info</v-icon>
                </v-btn>
              </v-list-tile-action>              
            </v-list-tile>                               
            <v-divider v-if="indx + 1 < currList.path.length"></v-divider>
            </v-list-item>
            </v-list>            
      </v-card>

    </v-tabs-content>

  </v-tabs>
</template>
<script>
import moment from 'moment';

moment().locale('ru');
export default {
    name: 'eventdetail',
    data() {
        return {
            active: null

        };
    },
    mounted() {
        console.log(this.$store.state.lists.currList);
    },
    watch: {

    },
    computed: {
        currList() {
            return this.$store.state.lists.currList;
        }
    },
    methods: {
        confirmDeleteBtn() {
            this.$store.dispatch('deleteList', this.currList);
            this.$store.commit('CARD_TYPE_LIST', '');
        },
        showDetailPO(po) {
            this.$store.commit('SET_CURR_PO', po);
            this.$store.commit('SHOW_PO_DIALOG', true);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
   
</style>
