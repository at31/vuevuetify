<template>
<v-card>
<v-card-row class="green lighten-3">
    <v-card-title><span class="">Новый пользователь</span></v-card-title>
            </v-card-row>
    <v-card-text>        
        <v-layout row v-for="(prop, indx) in userProps" :key="prop.id">
          <v-flex xs4>
            <v-text-field v-if="!prop.conf"
              name=""
              label=""
              id=""
              v-model="prop.name" readonly
            ></v-text-field>
            <v-text-field v-if="prop.conf"
              name=""
              label=""
              id=""
              v-model="prop.name" 
            ></v-text-field>
          </v-flex>
          <v-flex xs7>
            <v-text-field
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
        <v-card-row actions>
        <v-btn @click.native="addNewProp" success light class="mr-2 green ">
            <v-icon light>add</v-icon>
            Добавить свойство
        </v-btn>        
        <v-btn @click.native="confirmNewBtn" success light>
            <v-icon light>done</v-icon>
            Подтвердить создание
        </v-btn>        
        </v-card-row>  
            </v-card>
</template>

<script>
    export default {
        name: 'userNewCard',
        data() {
            return {
                newUser: {},
                userProps: []
            };
        },
        mounted() {
            this.userProps = [
                {name: 'email', value: '', conf: false},
                {name: 'pass', value: '', conf: false},
                {name: 'login', value: '', conf: false},
                {name: 'role', value: '', conf: false},
                {name: 'fio', value: '', conf: false}
            ];
        },
        watch: {
            currUser: function (n, o) {

            }
        },
        computed: {
            currUser() {
                return this.$store.state.users.currUser;
            }
        },
        methods: {
            confirmNewBtn() {
                this.userProps.forEach(prop => {
                    this.newUser[prop.name] = prop.value;
                });
                this.$store.dispatch('saveNewUser', this.newUser);
            },
            addNewProp() {
                this.userProps.push({name: 'название свойства', value: 'занчение свойства', conf: true});
            },
            deleteProp(indx) {
                console.log('deleteProp $indx', indx);
                this.userProps.splice(indx, 1);
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
   
</style>
