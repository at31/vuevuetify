<template>                          
        <v-card >
        <v-card-row class="green lighten-3"> 
            <v-card-title>
                <span class="">Заявки</span>
            </v-card-title>
        </v-card-row>            
            <v-list class="W900" three-line>
            <v-list-item v-for="(evnt, indx) in list" v-bind:key="evnt._id" > 
                <v-list-tile ref="li" avatar  v-bind:class="{ at31active: evnt.active }">
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
                <v-btn icon  class="indigo--text" @click.native.stop="editEvent(evnt)">
                  <v-icon>done</v-icon>
                </v-btn>
              </v-list-tile-action>              
              <v-list-tile-action>
                <v-btn icon ripple @click.native="deleteEvent(evnt,indx)">
                  <v-icon class="red--text text--darken-4" >delete</v-icon>
                </v-btn>                
              </v-list-tile-action>              
            </v-list-tile>                               
            <v-divider v-if="indx + 1 < list.length"></v-divider>
            </v-list-item>
            </v-list>

        <v-divider></v-divider>
        <v-card-row actions>
        
        </v-card-row>          
        </v-card>  
</template>

<script>
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
            isActive: false
            // list: []
        };
    },
    mounted() {

    },
    created() {
        this.$store.dispatch('loadAllPreEvents');
    },
    watch: {
        /* list: function (n, old) {
        } */
    },
    computed: {
        list() {
            return this.$store.state.radar.preevnts;
        }
    },
    methods: {
        liClick(evnt) {
            // console.log(e.currentTarget);
            // evnt.active = true;
        },
        showDetailEvent(event) {
            console.log('info');
            this.$store.commit('SET_CURR_PREEVENT', event);
            this.$store.commit('CARD_TYPE_PREEVENT', 'info');
        },
        deleteEvent(event, indx) {
            this.list.forEach(evnt => { evnt.active = false; });
            event.active = true;
            console.log('delete');
            this.$store.commit('SET_CURR_PREEVENT', event);
            this.$store.commit('CARD_TYPE_PREEVENT', 'delete');
        },
        editEvent(event, indx) {
            this.list.forEach(evnt => { evnt.active = false; });
            event.active = true;
            console.log('edit btn');
            this.$store.commit('SET_CURR_PREEVENT', event);
            this.$store.commit('CARD_TYPE_PREEVENT', 'edit');
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
   .at31active{
        background-color: rgba(175, 235, 135, 0.35);
   }
</style>
