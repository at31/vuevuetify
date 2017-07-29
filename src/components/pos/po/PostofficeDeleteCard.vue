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
                  prepend-icon="dvr"
                  v-model="newPO.postalCode" readonly
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
                  v-model="newPO.addressSource" readonly
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
                  v-model="newPO.region" readonly
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
                  v-model="newPO.settlement" readonly
                  ></v-text-field>
            </v-flex>
         </v-layout>
      
       <v-layout row v-for="(prop, indx) in newPO.addedprms" :key="prop.id">
           <v-flex xs2>
           <v-text-field                  
                  v-model="prop.name" readonly
                  ></v-text-field>
         </v-flex>
         <v-flex xs4>
           <v-text-field                  
                  v-model="prop.title" readonly
                  ></v-text-field>
         </v-flex>
         <v-flex xs4>
           <v-text-field                  
                  v-model="prop.value" readonly
                  ></v-text-field>         
         </v-flex>
         <v-flex xs1>      
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
            newPO: {}
        };
    },
    mounted() {
        this.newPO = Object.assign({}, this.po);
    },
    watch: {
        po: function (n) {
            this.newPO = Object.assign({}, this.po);
        }
    },
    computed: {
        po() {
            return this.$store.state.po.currPO;
        }
    },
    methods: {
        confirmNewBtn() {
            this.$store.dispatch('deletePO', this.newPO);
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
