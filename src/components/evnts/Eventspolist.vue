<template>                          
        <v-card>
        <v-card-row class="green lighten-3"> 
            <v-card-title>
                <span class="">Задачи</span>
            </v-card-title>
        </v-card-row>    
        <v-list class="polist" three-line>
          <v-list-item v-for="(po, index) in poevents" v-bind:key="po._id">
            <v-list-tile avatar class="green lighten-5">
            <v-list-tile-avatar >
            <v-flex sm5>
                <v-text-field name="pathPlace"  :value="index"></v-text-field>
                </v-flex>
              </v-list-tile-avatar>
              <v-list-tile-content class="">
                <v-list-tile-title>{{ po.postalCode }}</v-list-tile-title>
                <v-list-tile-sub-title>zzzzz</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn ripple icon class="green--text text--lighten-2" @click.native="showDetailPO(po)" >
                  <v-icon>info</v-icon>
                </v-btn>                
              </v-list-tile-action>
              <v-list-tile-action>
                <v-btn icon ripple @click.native="deletePO(po)">
                  <v-icon class="green--text text--lighten-2" >delete</v-icon>
                </v-btn>                
              </v-list-tile-action>
            </v-list-tile>

            <v-list v-if="po.evntsLength>0" >
            <v-list-item v-for="(evnt, indx) in po.evnts" v-bind:key="evnt._id"> 
                <v-list-tile avatar>
              <v-list-tile-avatar>
              <v-flex sm11>
                <v-icon>event</v-icon>
               </v-flex> 
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ evnt.label }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ evnt.start.format('HH:mm YYYY-MM-DD') }} - {{ evnt.end.format('HH:mm YYYY-MM-DD') }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon ripple @click.native="showDetailEvent(evnt)">
                  <v-icon class="indigo--text text--lighten-1" >info</v-icon>
                </v-btn>
              </v-list-tile-action>
              <v-list-tile-action>
                <v-btn icon ripple @click.native="deleteEvent(po,evnt,indx)">
                  <v-icon class="red--text text--darken-4" >delete</v-icon>
                </v-btn>                
              </v-list-tile-action>
            </v-list-tile>                               
            <v-divider v-if="indx + 1 < po.evnts.length"></v-divider>
            </v-list-item>
            </v-list>

            <v-divider class="hrbold"></v-divider>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-card-row actions>
       <v-btn class="ml-2" @click.native="createPath" success light>
            <v-icon light>map</v-icon>
            Построить путь
        </v-btn> 
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
            list: []
        };
    },
    mounted() {
    },
    watch: {

    },
    computed: {

    },
    methods: {
        showDetailEvent(event) {
            console.log('showDetailEvent', event);
            this.$store.commit('SET_CURR_EVENT', event);
            this.$store.commit('SHOW_EVENT_DIALOG', true);
        },
        showDetailPO(po) {
            this.$store.commit('SET_CURR_PO', po);
            this.$store.commit('SHOW_PO_DIALOG', true);
        },
        deleteEvent(po, event, indx) {
            this.$store.commit('EVNT_REMOVE_FROM_LIST', {po: po, event: event, indx: indx});
        },
        deletePO(po) {
            this.$store.commit('PO_REMOVE_FROM_LIST', po);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped> 
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
