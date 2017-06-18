<template>
   <v-card>
      <v-card-row class="red lighten-3">
         <v-card-title><span class="">Задача удаление</span></v-card-title>
      </v-card-row>
      <v-card-text>
         <v-layout row>
            <v-flex xs4>
               <v-subheader>Заголовок</v-subheader>
            </v-flex>
            <v-flex xs8>
               <v-text-field
                  name="title"
                  label="заголовок"
                  id="title"
                  v-model="event.title" readonly
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
                  v-model="event.description" readonly
                  ></v-text-field>
            </v-flex>
         </v-layout>
         
         <v-layout row>
            <v-flex xs4>
               <v-subheader>Дата нач.</v-subheader>
            </v-flex>
            <v-flex xs8>               
                  <v-text-field 
                     label="Дата начала"
                     v-model="start"
                     prepend-icon="event"
                     readonly
                     ></v-text-field>                  
            </v-flex>
         </v-layout>
         <v-layout row>
            <v-flex xs4>
               <v-subheader>Дата завершения</v-subheader>
            </v-flex>
            <v-flex xs8>               
                  <v-text-field 
                     label="Дата завершения"
                     v-model="end"
                     prepend-icon="event"
                     readonly
                     ></v-text-field>                  
            </v-flex>
         </v-layout>
               
      </v-card-text>
      <v-divider></v-divider>
      <v-card-row actions>
         <v-btn @click.native="confirmDeleteBtn" error light>
            <v-icon light>delete</v-icon>
            Подтвердить удаление
        </v-btn>        
      </v-card-row>
   </v-card>
</template>
<script>
import moment from 'moment';

moment().locale('ru');
export default {
    name: 'eventdeletedetail',
    data() {
        return {

        };
    },
    mounted() {

    },
    watch: {

    },
    computed: {
        event() {
            return this.$store.state.events.currEvent;
        },
        start() {
            return this.event.start.format('YYYY-MM-DD HH:mm');
        },
        end() {
            return this.event.end.format('YYYY-MM-DD HH:mm ');
        }
    },
    methods: {
        confirmDeleteBtn() {
            this.$store.dispatch('deleteEvent', this.event);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
   
</style>
