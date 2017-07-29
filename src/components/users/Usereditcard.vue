<template>
<v-card>
<v-card-row class="indigo lighten-3">
    <v-card-title><span class="">Редактирование пользователя</span></v-card-title>
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
        <v-card-row actions>
        <v-btn @click.native="addNewProp" success light class="mr-2 green ">
            <v-icon light>add</v-icon>
            Добавить свойство
        </v-btn>        
        <v-btn @click.native="confirmEditBtn" info light>
            <v-icon light>done</v-icon>
            Подтвердить изменения
        </v-btn>        
        </v-card-row>  
            </v-card>
</template>

<script>
    export default {
        name: 'userEditCard',
        data() {
            return {
                newUser: {},
                userProps: []
            };
        },
        mounted() {
            // this.newUser = Object.assign({}, this.currUser);
            for (let prop in this.currUser) {
                let conf = Object.getOwnPropertyDescriptor(this.currUser, prop);
                this.userProps.push(
                    {
                        name: prop,
                        value: this.currUser[prop],
                        conf: conf.configurable
                    });
            }
        },
        watch: {
            currUser: function (n) {
                this.userProps = [];
                for (let prop in n) {
                    let conf = Object.getOwnPropertyDescriptor(n, prop);
                    this.userProps.push(
                        {
                            name: prop,
                            value: n[prop],
                            conf: conf.configurable
                        });
                }
            }
        },
        computed: {
            currUser() {
                return this.$store.state.users.currUser;
            }
        },
        methods: {
            confirmEditBtn() {
                let _user = {};
                this.userProps.forEach(prop => {
                    _user[prop.name] = prop.value;
                });
                _user._id = this.currUser._id;
                this.$store.dispatch('updateUser', _user);
            },
            addNewProp() {
                this.userProps.push({name: 'название свойства', value: 'значение свойства', conf: true});
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
