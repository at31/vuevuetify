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
               
      </v-card-text>
      <v-divider></v-divider>
      <v-card-row actions>
         <v-btn @click.native="showAddress" primary light>
            <v-icon light>pin_drop</v-icon>
            Адрес на карте
         </v-btn>
      </v-card-row>
      <v-card-row actions>
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
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
   
</style>
