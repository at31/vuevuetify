<template>                          
        <v-card>
        <v-card-row class="green lighten-3"> 
            <v-card-title>
                <span class="">Все пользователи</span>
            </v-card-title>
        </v-card-row>    
        <v-list three-line>
          <v-list-item v-for="(user, index) in users" v-bind:key="user._id">
            <v-list-tile avatar>
              <v-list-tile-action>
                <v-checkbox v-model="user.selected" @change="selectUsr(user)"></v-checkbox>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>ФИО: {{ user.fio }}</v-list-tile-title>
                <v-list-tile-sub-title class="grey--text text--darken-4">login: {{ user.login }}</v-list-tile-sub-title>
                <v-list-tile-sub-title class="grey--text text--darken-4">роль: {{ user.role }}</v-list-tile-sub-title>
                <v-list-tile-sub-title>e-mail: {{ user.email }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon class="indigo--text" @click.native="showDetail(user)">
                  <v-icon>info</v-icon>
                </v-btn>                
              </v-list-tile-action>
              <v-list-tile-action>
                <v-btn icon class="red--text text--darken-4" @click.native="showDelete(user)">
                  <v-icon>delete</v-icon>
                </v-btn>                
              </v-list-tile-action>
              <v-list-tile-action>
                <v-btn icon  class="indigo--text" @click.native="showEdit(user)">
                  <v-icon>edit</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="index + 1 < users.length"></v-divider>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-card-row actions>
       
        <!--v-btn @click.native="onAddBtn" floating class="green a-btn">
            <v-icon light>add</v-icon>
        </v-btn-->
        </v-card-row>          
        </v-card>  
</template>

<script>
    export default {
        name: 'usersList',
        components: {
    
        },
        data() {
            return {
                selected: []
            };
        },
        mounted() {
        },
        watch: {
        },
        computed: {
            users() {
                return this.$store.state.users.users;
            }
        },
        methods: {
            onAddBtn(e) {
                // this.$store.commit('ATITLE', 'atitle from users component add btn');
            },
            selectUsr(user) {
                console.log('checkbox', user);
                if (user.selected) {
                    this.selected.push(user);
                    // this.$store.commit('CURR_USER', user);
                } else {
                    const indx = this.selected.indexOf(user);
                    if (indx > -1) {
                        this.selected.splice(indx, 1);
                    }
                }
            },
            showDetail(user) {
                this.$store.commit('CURR_USER', user);
                this.$store.commit('CARD_TYPE', 'info');
            },
            showDelete(user) {
                this.$store.commit('CURR_USER', user);
                this.$store.commit('CARD_TYPE', 'delete');
            },
            showEdit(user) {
                this.$store.commit('CURR_USER', user);
                this.$store.commit('CARD_TYPE', 'edit');
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
   
</style>
