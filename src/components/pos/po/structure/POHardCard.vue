<template>
   <v-card>
      <v-card-row v-bind:class="{blue: edit , red: del, green: info, 'lighten-3': true}">
         <v-card-title><span class="">Доп. оборудование подробно</span></v-card-title>
      </v-card-row>
      <v-card-text v-if="edit">
      <v-layout row>
            <v-flex xs4>
               <v-subheader>Где установлено</v-subheader>
            </v-flex>
            <v-flex xs8>
               <v-text-field
                  name="compname"
                  label="где установлено"
                  id="compname"
                  prepend-icon="dvr"
                  v-model="hard.compname" 
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
                  v-model="hard.label" 
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
                  v-model="hard.description" 
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

      <v-card-text v-if="!edit">
      <v-layout row>
            <v-flex xs4>
               <v-subheader>Где установлено</v-subheader>
            </v-flex>
            <v-flex xs8>
               <v-text-field
                  name="compname"
                  label="где установлено"
                  id="compname"
                  prepend-icon="dvr"
                  v-model="hard.compname" readonly
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
                  v-model="hard.title" readonly
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
                  v-model="hard.description" readonly
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
              
          </v-flex>
        </v-layout>                       
      </v-card-text>  

      <v-divider></v-divider>
      <v-card-row actions actions v-if="edit">
          <v-btn @click.native="addNewProp" success light class="mr-2 green ">
            <v-icon light>add</v-icon>
            Добавить свойство
        </v-btn>  
      </v-card-row>
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
            newhard: {},
            addPrms: [],
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
        this.addPrms = this.hard.addedprms;
    },
    watch: {
        hard: function () {
            this.addPrms = this.hard.addedprms;
            console.log(this.addPrms);
        }
    },
    computed: {
        hard() {
            return this.$store.state.po.currHard;
        }
    },
    methods: {
        confirmChngBtn() {
            const so = {
                addedprms: this.addPrms,
                id: this.hard.id,
                title: this.hard.label,
                description: this.hard.description,
                indx: this.hard.indx,
                compid: this.hard.compid
            };
            this.$store.commit('UPDATE_HARD', so);
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
