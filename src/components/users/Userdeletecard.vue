<template>
<v-card>
<v-card-row class="red lighten-3">
    <v-card-title><span class="">Удаление пользователя</span></v-card-title>
            </v-card-row>
    <v-card-text>
       <v-layout row v-for="(prop, indx) in userProps" :key="prop.id">
          <v-flex xs4>            
            <v-text-field 
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
    export default {
        name: 'userDetailCard',
        data() {
            return {
                userProps: [],
                newUser: {}
            };
        },
        mounted() {
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
            confirmDeleteBtn() {
                this.userProps.forEach(prop => {
                    this.newUser[prop.name] = prop.value;
                });
                this.newUser._id = this.currUser._id;
                this.$store.dispatch('deleteUser', this.newUser);
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
   
</style>
