<template>
   <v-card>
      <v-card-row class="blue lighten-3">
         <v-card-title><span class="">Отделение редактирование</span></v-card-title>
      </v-card-row>
      <v-card-text>
       <v-layout row>
            <v-flex xs4>
               <v-subheader>Индекс</v-subheader>
            </v-flex>
            <v-flex xs8>
               <v-text-field                  
                  prepend-icon="dvr"
                  v-model="newPO.postalCode" 
                  ></v-text-field>
            </v-flex>
         </v-layout>
         <v-layout row>
            <v-flex xs4>
               <v-subheader>Адрес</v-subheader>
            </v-flex>
            <v-flex xs8>
               <v-text-field                  
                  prepend-icon="dvr"
                  v-model="newPO.addressSource" 
                  ></v-text-field>
            </v-flex>
         </v-layout> 
         <v-layout row>
            <v-flex xs4>
               <v-subheader>Регион</v-subheader>
            </v-flex>
            <v-flex xs8>
               <v-text-field                  
                  prepend-icon="dvr"
                  v-model="newPO.region" 
                  ></v-text-field>
            </v-flex>
         </v-layout>
         <v-layout row>
            <v-flex xs4>
               <v-subheader>Нас. пункт</v-subheader>
            </v-flex>
            <v-flex xs8>
               <v-text-field                  
                  prepend-icon="dvr"
                  v-model="newPO.settlement" 
                  ></v-text-field>
            </v-flex>
         </v-layout>
      
       <v-layout row v-for="(prop, indx) in newPO.addedprms" :key="prop.id">
           <v-flex xs2>
           <v-text-field                  
                  v-model="prop.name" 
                  ></v-text-field>
         </v-flex>
         <v-flex xs4>
           <v-text-field                  
                  v-model="prop.title" 
                  ></v-text-field>
         </v-flex>
         <v-flex xs4>
           <v-text-field                  
                  v-model="prop.value" 
                  ></v-text-field>         
         </v-flex>
         <v-flex xs1>
              <v-btn icon class="red--text text--darken-4" @click.native="deleteProp(indx)">
                  <v-icon>delete</v-icon>
                </v-btn>       
          </v-flex>
        </v-layout> 
      </v-card-text>
      <v-divider></v-divider>       
      <v-divider></v-divider>
      <v-card-row actions>
         <!--v-btn @click.native="showAddress" primary light>
            <v-icon light>pin_drop</v-icon>
            Адрес на карте
         </v-btn-->
          <v-btn @click.native="addNewProp" success light class="mr-2 green ">
            <v-icon light>add</v-icon>
            Добавить свойство
        </v-btn>  
      </v-card-row>
      <v-card-row actions>
             
        <v-btn @click.native="goDetailView" success light class="pr-1">
            <v-icon light>details</v-icon>
            Техника & ПО
         </v-btn>
         <v-btn @click.native="confirmNewBtn" primary light>
            <v-icon light>done</v-icon>
            Подтвердить изменения
         </v-btn>
      </v-card-row>
   </v-card>
</template>
<script>
import moment from 'moment';

moment().locale('ru');
export default {
    name: 'editPOCard',
    data() {
        return {
            newPO: {},
            addPrms: []
        };
    },
    mounted() {
        this.addPrms = [];
        this.newPO = Object.assign({}, this.po);
        this.addPrms = this.po.addedprms.map(prm => prm);
    },
    watch: {
        po: function (n) {
            this.addPrms = [];
            this.newPO = Object.assign({}, this.po);
            this.addPrms = this.po.addedprms.map(prm => prm);
        }
    },
    computed: {
        po() {
            return this.$store.state.po.currPO;
        }
    },
    methods: {
        addNewProp() {
            this.newPO.addedprms.push({name: 'название свойства', value: 'занчение свойства', conf: true, title: 'отобр название'});
        },
        deleteProp(indx) {
            console.log('deleteProp $indx', indx);
            this.newPO.addedprms.splice(indx, 1);
        },
        confirmNewBtn() {
            this.$store.dispatch('updatePO', this.newPO);
        },
        showAddress() {
            this.$store.commit('SHOW_NEW_ADDRESS', this.po.addressSource);
        },
        addNewHard() {
            this.soft.push({title: 'какой-то софт2', description: 'какое-то описание', id: '12345'});
        },
        goDetailView() {
            this.$store.commit('SET_CURR_PO', this.newPO);
            this.$router.push({
                path: '/post-offices-detail',
                params: {
                    // po: this.newPO
                }
            });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
   div.card__row--actions{
    justify-content: space-between;
   }
</style>
