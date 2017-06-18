<template>
   <v-card>
      <v-card-row class="green lighten-3">
         <v-card-title><span class="">Новое задание</span></v-card-title>
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
                  v-model="newEvent.title"
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
                  v-model="newEvent.description"
                  ></v-text-field>
            </v-flex>
         </v-layout>
         <!--v-layout row>
            <v-flex xs4>
               <v-subheader>Исполнитель</v-subheader>
            </v-flex>
            <v-flex xs8>
               <v-select
                  v-bind:items="users"
                  v-model="newEvent.executor"
                  label="Выберите исполнителя"
                  dark
                  single-line
                  item-value="fio"
                  ></v-select>
            </v-flex>
         </v-layout-->
         <v-layout row>
            <v-flex xs4>
               <v-subheader>Дата нач.</v-subheader>
            </v-flex>
            <v-flex xs8>
               <v-dialog
                  persistent
                  v-model="modal1"
                  lazy>
                  <v-text-field  slot="activator"          
                     label="Дата начала"
                     v-model="dateBegin"
                     prepend-icon="event"
                     readonly
                     ></v-text-field>
                  <v-date-picker v-model="dateBegin" scrollable>
                     <template scope="{ save, cancel }">
                        <v-card-row actions>
                           <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                           <v-btn flat primary @click.native="save()">Save</v-btn>
                        </v-card-row>
                     </template>
                  </v-date-picker>
               </v-dialog>
            </v-flex>
         </v-layout>
         <v-layout row>
            <v-flex xs4>
               <v-subheader>Время нач.</v-subheader>
            </v-flex>
            <v-flex xs8>
               <v-dialog
                  persistent
                  v-model="modal"
                  lazy
                  >
                  <v-text-field slot="activator"
                     label="Дата начала"
                     v-model="timeBegin"
                     prepend-icon="event"
                     readonly
                     ></v-text-field>
                  <v-time-picker v-model="timeBegin" actions format="24hr">
                     <template scope="{ save, cancel }">
                        <v-card-row actions>
                           <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                           <v-btn flat primary @click.native="save()">Save</v-btn>
                        </v-card-row>
                     </template>
                  </v-time-picker>
               </v-dialog>
            </v-flex>
         </v-layout>

        <v-layout row>
            <v-flex xs4>
               <v-subheader>Дата зак.</v-subheader>
            </v-flex>
            <v-flex xs8>
               <v-dialog
                  persistent
                  v-model="modal2"
                  lazy>
                  <v-text-field  slot="activator"          
                     label="Дата начала"
                     v-model="dateEnd"
                     prepend-icon="event"
                     readonly
                     ></v-text-field>
                  <v-date-picker v-model="dateEnd" scrollable>
                     <template scope="{ save, cancel }">
                        <v-card-row actions>
                           <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                           <v-btn flat primary @click.native="save()">Save</v-btn>
                        </v-card-row>
                     </template>
                  </v-date-picker>
               </v-dialog>
            </v-flex>
         </v-layout>
         <v-layout row>
            <v-flex xs4>
               <v-subheader>Время зак.</v-subheader>
            </v-flex>
            <v-flex xs8>
               <v-dialog
                  persistent
                  v-model="modal3"
                  lazy
                  >
                  <v-text-field slot="activator"
                     label="Дата начала"
                     v-model="timeEnd"
                     prepend-icon="event"
                     readonly
                     ></v-text-field>
                  <v-time-picker v-model="timeEnd" actions format="24hr">
                     <template scope="{ save, cancel }">
                        <v-card-row actions>
                           <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                           <v-btn flat primary @click.native="save()">Save</v-btn>
                        </v-card-row>
                     </template>
                  </v-time-picker>
               </v-dialog>
            </v-flex>
         </v-layout>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-row actions>
         <v-btn @click.native="confirmNewBtn" success light>
            <v-icon light>done</v-icon>
            Подтвердить создание
         </v-btn>
      </v-card-row>
   </v-card>
</template>
<script>
import moment from 'moment';

moment().locale('ru');
export default {
    name: 'eventNewCard',
    data() {
        return {
            dateBegin: '',
            timeBegin: '',
            dateEnd: '',
            timeEnd: '',
            modal: false,
            modal1: false,
            modal2: false,
            modal3: false,
            newEvent: {
                title: '',
                start: '',
                end: '',
                status: 1,
                description: ''
            }
        };
    },
    mounted() {
        console.log(this.users);
    },
    watch: {

    },
    computed: {
        users() {
            return this.$store.state.users.users;
        }
    },
    methods: {
        confirmNewBtn() {
            this.newEvent.start = moment(this.dateBegin + ' ' + this.timeBegin).toDate();
            this.newEvent.end = moment(this.dateEnd + ' ' + this.timeEnd).toDate();
            this.$store.dispatch('saveNewEvent', this.newEvent);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
   
</style>
