<template>
   <v-card>
      <v-card-row v-bind:class="{green: true, 'lighten-3': true}">
         <v-card-title><span class="">ПО новое</span></v-card-title>
      </v-card-row>
      <v-card-text >

         <v-layout row>
          <v-flex xs4>
            <v-subheader>Где установлено</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-select
              v-bind:items="comps"
              v-model="newSoft.comp"
              label="Выберите место установки"
              dark
              single-line
              
            ></v-select>
          </v-flex>
        </v-layout>
        
        <v-layout row>
            <v-flex xs4>
               <v-subheader>ID</v-subheader>
            </v-flex>
            <v-flex xs8>
               <v-text-field
                  name="id"
                  label="ID"
                  id="id"
                  prepend-icon="dvr"
                  v-model="newSoft.id" 
                  ></v-text-field>
            </v-flex>
         </v-layout>
         <v-layout row>
            <v-flex xs4>
               <v-subheader>Название</v-subheader>
            </v-flex>
            <v-flex xs8>
               <v-text-field
                  name="title"
                  label="Название"
                  id="title"
                  prepend-icon="dvr"
                  v-model="newSoft.title" 
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
                  label="Описание"
                  id="description"
                  prepend-icon="dvr"
                  v-model="newSoft.description"

                  ></v-text-field>
            </v-flex>
         </v-layout>
                                 
      </v-card-text>
 

      <v-divider></v-divider>
      <v-card-row actions>
             <v-btn @click.native="confirmNewBtn" success light >
            <v-icon light>done</v-icon>
            Сохранить
         </v-btn>        
      </v-card-row>
   </v-card>
</template>
<script>
import moment from 'moment';

moment().locale('ru');
let self = '';
export default {
    name: 'eventdetail',
    data() {
        return {
            newSoft: {}
        };
    },
    mounted() {
        self = this;
    },
    watch: {
    },
    computed: {
        po() {
            return Object.assign({}, this.$store.state.po.currPO);
        },
        comps() {
            let arr = this.po.comps.map(c => {
                return {id: c.id, text: c.title, title: c.title};
            });
            return arr;
        }
    },
    methods: {
        confirmNewBtn() {
            this.po.comps.forEach(c => {
                if (c.id === self.newSoft.comp.id) {
                    c.soft.push({id: self.newSoft.id, title: self.newSoft.title, description: self.newSoft.description});
                }
            });
            this.$store.commit('SET_CURR_PO', Object.assign({}, this.po));
            console.log('new soft ', this.po);
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
