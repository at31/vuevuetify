<template>
   <v-card>
      <v-card-row class="red lighten-3">
         <v-card-title><span class="">Отделение удаление</span></v-card-title>
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
                  v-model="po.postalCode" readonly
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
                  v-model="po.addressSource" readonly
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
                     readonly
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
                     readonly
                     ></v-text-field>                  
            </v-flex>
         </v-layout>
               
      </v-card-text>
      <v-divider></v-divider>
      <v-card-row actions>
      <v-btn @click.native="goDetailView" success light class="pr-1">
            <v-icon light>details</v-icon>
            Техника & ПО
         </v-btn>
         <v-btn @click.native="confirmNewBtn" error light>
            <v-icon light>done</v-icon>
            Подтвердить удаление
         </v-btn>
      </v-card-row>
   </v-card>
</template>
<script>
import moment from 'moment';

moment().locale('ru');
export default {
    name: 'deletePOCard',
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
            this.$store.dispatch('deletePO', this.po);
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
