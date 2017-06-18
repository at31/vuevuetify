<template>
<v-card>
<v-card-row class="green lighten-3">
    <v-card-title><span class="">Пользователь подробно</span></v-card-title>
            </v-card-row>
    <v-card-text>
        <h4>_id: {{currUser._id}}</h4>
        <h4>email: {{currUser.email}}</h4>
        <h4>login: {{currUser.login}}</h4>
        <h4>ФИО: {{currUser.fio}}</h4>
    </v-card-text>        
            <v-divider></v-divider>
        <v-card-row actions>        
        </v-card-row>  
            </v-card>
</template>

<script>
    export default {
        name: 'userDetailCard',
        data() {
            return {
                /* currUser: {
                    _id: '',
                    email: '',
                    pass: '',
                    role: '',
                    login: '',
                    fio: ''
                }*/
            };
        },
        mounted() {
        },
        watch: {
        },
        computed: {
            currUser() {
                return this.$store.state.users.currUser;
            }
        },
        methods: {
    
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
   
</style>
