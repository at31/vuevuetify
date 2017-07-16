<template>
   <v-card>
      <v-card-row class="blue lighten-3">
         <v-card-title><span class="">Отделение редактирование</span></v-card-title>
      </v-card-row>
      <v-card-text>

      <v-layout row v-for="(prop, indx) in poProps" :key="prop.id">
          <v-flex xs4 v-if="!prop.conf">
            <v-text-field 
              name=""
              label=""
              id=""
              v-model="prop.title" readonly
            ></v-text-field>
          </v-flex>
          <v-flex xs2 v-if="prop.conf">
            <v-text-field 
              name=""
              label=""
              id=""
              v-model="prop.name" 
            ></v-text-field>
          </v-flex>
          <v-flex xs2 v-if="prop.conf">
            <v-text-field 
              name=""
              label=""
              id=""
              v-model="prop.title" 
            ></v-text-field>
          </v-flex>
          <v-flex xs6>
            <v-text-field v-if="!prop.conf"
              name=""
              label=""
              id=""
              v-model="prop.value" 
            ></v-text-field>
            <v-text-field v-if="prop.conf"
              name=""
              label=""
              id=""
              v-model="prop.value" 
            ></v-text-field>
          </v-flex>
          <v-flex xs1>
              <v-btn icon class="red--text text--darken-4" @click.native="deleteProp(indx)" v-show="prop.conf">
                  <v-icon>delete</v-icon>
                </v-btn>       
          </v-flex>
        </v-layout>
       
      </v-card-text>
      <v-divider></v-divider> 
      
      <v-divider></v-divider>
      <v-card-row actions>
         <!--v-btn @click.native="showAddress" primary light>
            <v-icon light>pin_drop</v-icon>
            Адрес на карте
         </v-btn-->
          <v-btn @click.native="addNewProp" success light class="mr-2 green ">
            <v-icon light>add</v-icon>
            Добавить свойство
        </v-btn>  
      </v-card-row>
      <v-card-row actions>
             
        <v-btn @click.native="goDetailView" success light class="pr-1">
            <v-icon light>details</v-icon>
            Техника & ПО
         </v-btn>
         <v-btn @click.native="confirmNewBtn" primary light>
            <v-icon light>done</v-icon>
            Подтвердить изменения
         </v-btn>
      </v-card-row>
   </v-card>
</template>
<script>
import moment from 'moment';

moment().locale('ru');
export default {
    name: 'editPOCard',
    data() {
        return {
            soft: [
          {title: 'какой-то софт', description: 'какое-то пописание', id: '123'},
          {title: 'какой-то софт2', description: 'какое-то пописание', id: '1234'}
            ],
            poProps: []
        };
    },
    mounted() {
        this.poProps = [];
        for (let prop in this.po) {
            let conf = Object.getOwnPropertyDescriptor(this.po, prop);
            this.poProps.push(
                {
                    title: this.po[prop].title,
                    value: this.po[prop].value,
                    conf: conf.configurable,
                    name: prop
                });
        }
    },
    watch: {
        po: function (n) {
            this.poProps = [];
            for (let prop in n) {
                let conf = Object.getOwnPropertyDescriptor(n, prop);
                this.poProps.push(
                    {
                        title: n[prop].title,
                        value: n[prop].value,
                        conf: conf.configurable,
                        name: prop
                    });
            }
        }
    },
    computed: {
        po() {
            return this.$store.state.po.currPO;
        }
    },
    methods: {
        addNewProp() {
            this.poProps.push({name: 'название свойства', value: 'занчение свойства', conf: true, title: 'отобр название'});
        },
        deleteProp(indx) {
            console.log('deleteProp $indx', indx);
            this.poProps.splice(indx, 1);
        },
        confirmNewBtn() {
            this.$store.dispatch('updatePO', this.po);
        },
        showAddress() {
            this.$store.commit('SHOW_NEW_ADDRESS', this.po.addressSource);
        },
        addNewHard() {
            this.soft.push({title: 'какой-то софт2', description: 'какое-то пописание', id: '12345'});
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
