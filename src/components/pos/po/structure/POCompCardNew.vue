<template>
   <v-card>
      <v-card-row v-bind:class="{green: true, 'lighten-3': true}">
         <v-card-title><span class="">ПО новое</span></v-card-title>
      </v-card-row>
      <v-card-text >         
        
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
                  v-model="newComp.id" 
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
                  v-model="newComp.title" 
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
                  v-model="newComp.description"

                  ></v-text-field>
            </v-flex>
         </v-layout>
         <v-layout row v-for="(prop, indx) in addPrms" :key="prop.id">
           <v-flex xs2>
           <v-text-field                  
                  v-model="prop.name" 
                  ></v-text-field>
         </v-flex>
         <v-flex xs4>
           <v-text-field                  
                  v-model="prop.title" 
                  ></v-text-field>
         </v-flex>
         <v-flex xs4>
           <v-text-field                  
                  v-model="prop.value" 
                  ></v-text-field>         
         </v-flex>
         <v-flex xs1>
              <v-btn icon class="red--text text--darken-4" @click.native="deleteProp(indx)">
                  <v-icon>delete</v-icon>
                </v-btn>       
          </v-flex>
        </v-layout> 
      </v-card-text>
                                 
      </v-card-text>
 

      <v-divider></v-divider>
      <v-card-row actions>
          <v-btn @click.native="addNewProp" success light class="mr-2 green ">
            <v-icon light>add</v-icon>
            Добавить свойство
        </v-btn>  
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
// let self = '';
export default {
    name: 'eventdetail',
    data() {
        return {
            newComp: {},
            addPrms: []
        };
    },
    mounted() {
        // self = this;
    },
    watch: {
        'newComp.comp': function (cid) {
            alert('new soft comp selected');
        }
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
            this.po.comps.push(
                {
                    id: this.newComp.id,
                    title: this.newComp.title,
                    description: this.newComp.description,
                    addedprms: this.addPrms,
                    soft: []
                });

            this.$store.commit('SET_CURR_PO', Object.assign({}, this.po));
            console.log('new soft ', this.po);
        },
        addNewProp() {
            this.addPrms.push({name: '', title: '', value: ''});
        },
        deleteProp(indx) {
            this.addPrms.splice(indx, 1);
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
