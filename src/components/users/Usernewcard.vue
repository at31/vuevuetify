<template>
<v-card>
<v-card-row class="green lighten-3">
    <v-card-title><span class="">Новый пользователь</span></v-card-title>
            </v-card-row>
    <v-card-text>        
        <v-layout row>
          <v-flex xs4>
            <v-subheader>e-mail</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              name="emailInput"
              label="e-mail"
              id="email"
              v-model="newUser.email"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs4>
            <v-subheader>Лоин</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              name="loginInput"
              label="Логин"
              id="login"
              v-model="newUser.login"
            ></v-text-field>
          </v-flex>
        </v-layout>

        
        <v-layout row>
          <v-flex xs4>
            <v-subheader>ФИО</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              name="fioInput"
              label="ФИО"
              id="fio"
              v-model="newUser.fio"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs4>
            <v-subheader>Пароль</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              name="passInput"
              label="Пароль"
              id="pass"
              v-model="newUser.pass"
            ></v-text-field>
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
    export default {
        name: 'userNewCard',
        data() {
            return {
                newUser: {
                    _id: '', pass: '', fio: '', login: '', email: ''
                }
            };
        },
        mounted() {
    
        },
        watch: {
    
        },
        computed: {
    
        },
        methods: {
            confirmNewBtn() {
                this.$store.dispatch('saveNewUser', this.newUser);
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
   
</style>
