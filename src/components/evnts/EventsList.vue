<template>                          
        <v-card >
        <v-card-row class="green lighten-3"> 
            <v-card-title>
                <span class="">Задачи</span>
            </v-card-title>
        </v-card-row>            
            <v-list class="W900" three-line>
            <v-list-item v-for="(evnt, indx) in list" v-bind:key="evnt._id"> 
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
              <v-list-tile-action>
                <v-btn icon ripple @click.native="deleteEvent(evnt,indx)">
                  <v-icon class="red--text text--darken-4" >delete</v-icon>
                </v-btn>                
              </v-list-tile-action>
              <v-list-tile-action>
                <v-btn icon  class="indigo--text" @click.native="editEvent(evnt)">
                  <v-icon>edit</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>                               
            <v-divider v-if="indx + 1 < list.length"></v-divider>
            </v-list-item>
            </v-list>

        <v-divider></v-divider>
        <v-card-row actions>
        <v-btn @click.native="pdfCreate" default>
            <v-icon>picture_as_pdf</v-icon>
            Печать списка
        </v-btn>        
        </v-card-row>          
        </v-card>  
</template>

<script>
import moment from 'moment';

moment().locale('ru');

export default {
    name: 'eventpolist',
    components: {

    },
    props: {
        poevents: {
            type: Array
        }
    },
    data() {
        return {
            // list: []
        };
    },
    mounted() {

    },
    created() {
        this.$store.dispatch('loadAllEvents');
    },
    watch: {
        '$store.state.events.events': function (n) {
            // this.list = n;
        }
    },
    computed: {
        list() {
            return this.$store.state.events.events;
        }
    },
    methods: {
        showDetailEvent(event) {
            console.log('info');
            this.$store.commit('SET_CURR_EVENT', event);
            this.$store.commit('CARD_TYPE_EVENT', 'info');
        },
        deleteEvent(event, indx) {
            console.log('delete');
            this.$store.commit('SET_CURR_EVENT', event);
            this.$store.commit('CARD_TYPE_EVENT', 'delete');
        },
        editEvent(event, indx) {
            console.log('edit btn');
            this.$store.commit('SET_CURR_EVENT', event);
            this.$store.commit('CARD_TYPE_EVENT', 'edit');
        },
        pdfCreate() {
            var elist = this.list.map(list => {
                return 'Заголовок: ' + list.title + '\n Описание:' + list.description + '\n Начало:' + moment(list.start).format('HH:mm DD-MM-YYYY') + '\n Окончание:' + moment(list.end).format('HH:mm DD-MM-YYYY') + '\n Статус:' + list.status + '\n Объект: ' + list.evntobj.id;
            });

            var dd = {
                content: [
                    {
                        text: 'Задачи',
                        style: 'header',
                        alignment: 'center'
                    },
                    {
                        ol: elist
                    },
                    {
                        text: 'Всего задач: ' + this.list.length,
                        style: 'header'
                    }
                ],
                styles: {
                    header: {
                        fontSize: 18,
                        bold: true,
                        alignment: 'justify'
                    }
                }
            };
            pdfMake.createPdf(dd).open();
        }

    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>
    .W900{
      max-height: 700px;
      overflow-y: scroll;
    }  
    .hrbold{
        border-top: 2px solid grey;
    }   
   .input-group--text-field.input-group--dark.input-group--disabled.sshow input{
    color:black;
   }
   .icon-btn-upm-30{
        margin-bottom: 30px;
   }
</style>
