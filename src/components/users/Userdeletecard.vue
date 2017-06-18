<template>
<v-card>
<v-card-row class="red lighten-3">
    <v-card-title><span class="">Удаление пользователя</span></v-card-title>
            </v-card-row>
    <v-card-text>
        <h4>_id: {{currUser._id}}</h4>
        <h4>email: {{currUser.email}}</h4>
        <h4>login: {{currUser.login}}</h4>
        <h4>ФИО: {{currUser.fio}}</h4>
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
            confirmDeleteBtn() {
                this.$store.dispatch('deleteUser', this.currUser);
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
   
</style>
