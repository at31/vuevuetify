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
                  name="postalCode"
                  label="Индекс"
                  id="title"
                  prepend-icon="event"
                v-model="po.postalCode" 
                  ></v-text-field>
            </v-flex>
         </v-layout>
         <v-layout row>
            <v-flex xs4>
               <v-subheader>Адрес</v-subheader>
            </v-flex>
            <v-flex xs8>
               <v-text-field
                  name="addressSource"
                  label="Адрес"
                  id="addressSource"
                  prepend-icon="event"
                v-model="po.addressSource" 
                  ></v-text-field>
            </v-flex>
         </v-layout>
         
         <v-layout row>
            <v-flex xs4>
               <v-subheader>Регион</v-subheader>
            </v-flex>
            <v-flex xs8>               
                  <v-text-field 
                     label="Регион"
                     v-model="po.region"
                     prepend-icon="event"                     
                     ></v-text-field>                  
            </v-flex>
         </v-layout>
         <v-layout row>
            <v-flex xs4>
               <v-subheader>Город</v-subheader>
            </v-flex>
            <v-flex xs8>               
                  <v-text-field 
                     label="Город"
                     v-model="po.settlement"
                     prepend-icon="event"                     
                     ></v-text-field>                  
            </v-flex>
         </v-layout>
      <v-divider></v-divider>
           
      </v-card-text>
      <v-divider></v-divider>
      
      <v-divider></v-divider>
      <v-card-row actions>
         <v-btn @click.native="showAddress" primary light>
            <v-icon light>pin_drop</v-icon>
            Адрес на карте
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
            soft: [
          {title: 'какой-то софт', description: 'какое-то пописание', id: '123'},
          {title: 'какой-то софт2', description: 'какое-то пописание', id: '1234'}
            ]
        };
    },
    mounted() {

    },
    watch: {

    },
    computed: {
        po() {
            return this.$store.state.po.currPO;
        }
    },
    methods: {
        confirmNewBtn() {
          // delete
        },
        showAddress() {
            this.$store.commit('SHOW_NEW_ADDRESS', this.po.addressSource);
        },
        addNewHard() {
            this.soft.push({title: 'какой-то софт2', description: 'какое-то пописание', id: '12345'});
        },
        goDetailView() {
            this.$router.push({
                path: '/post-offices-detail',
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
   div.card__row--actions{
    justify-content: space-between;
   }
</style>
