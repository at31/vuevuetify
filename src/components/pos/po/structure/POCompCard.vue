<template>
   <v-card>
      <v-card-row v-bind:class="{blue: edit , red: del, green: info, 'lighten-3': true}">
         <v-card-title><span class="">Оборудование подробно</span></v-card-title>
      </v-card-row>
      <v-card-text v-if="edit">
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
                  v-model="comp.title" 
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
                  v-model="comp.description" 
                  ></v-text-field>
            </v-flex>
         </v-layout>
                                 
      </v-card-text>

      <v-card-text v-if="!edit">
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
                  v-model="comp.title" readonly
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
                  v-model="comp.description" readonly
                  ></v-text-field>
            </v-flex>
         </v-layout>
                                 
      </v-card-text>  

      <v-divider></v-divider>
      <v-card-row actions v-if="edit">
             <v-btn @click.native="confirmChngBtn" primary light >
            <v-icon light>done</v-icon>
            Подтвердить изменения
         </v-btn>
         <v-btn @click.native="confirmDelBtn" error light>
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
    name: 'eventdetail',
    props: {
        type: {
            type: String
        }
    },
    data() {
        return {
            newComp: {},
            edit: false,
            del: false,
            info: false,
            new: false

        };
    },
    mounted() {
        switch (this.type) {
            case 'edit':
                this.edit = true;
                break;
            case 'delete':
                this.del = true;
                break;
            case 'info':
                this.info = true;
                break;
        }
    },
    watch: {
    },
    computed: {
        comp() {
            return this.$store.state.po.currComp;
        }
    },
    methods: {
        confirmChngBtn() {
        },
        confirmDelBtn() {
        },
        goDetailView() {
            this.$router.push({
                path: '/post-offices-detail',
                params: {
                    hi: 'hi @at31'
                }
            });
        },
        newCompTrigger() {
            this.showAddNew = true;
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
