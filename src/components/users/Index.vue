<template>
    <v-layout row wrap>
           <v-flex xs12 md12 sm12 class="pb-2">
                <v-btn @click.native="onAddBtn" light success class="">Новый пользователь</v-btn>
          </v-flex> 
          <v-flex xs12 md6 sm12 class="r-list">
                <userslist></userslist>                        
          </v-flex>
          <v-flex xs12 md6 sm12 class="r-list">
                <userscard v-if="cardType==='info'"></userscard>
                <userdeletecard v-if="cardType==='delete'"></userdeletecard>
                <usereditcard v-if="cardType==='edit'"></usereditcard>
                <usernewcard v-if="cardType==='new'"></usernewcard>
          </v-flex>
    </v-layout>  
</template>

<script>
import Userslist from './Userslist';
import Userscard from './Userscard';
import Userdeletecard from './Userdeletecard';
import Usereditcard from './Usereditcard';
import Usernewcard from './Usernewcard';

export default {
    name: 'allusers',
    components: {
        Userslist,
        Userscard,
        Userdeletecard,
        Usereditcard,
        Usernewcard
    },
    data() {
        return {
            cardType: 'info'
        };
    },
    props: {
        atitle: {
            type: String,
            default: 'Vue!'
        }
    },
    mounted() {
        this.$store.commit('ATITLE', {title: 'Управление пользователями', color: 'green'});
    },
    watch: {
        '$store.state.users.cardType': function (n, o) {
            console.log(n);
            this.cardType = n;
        }
    },
    computed: {
    },
    methods: {
        onAddBtn() {
            this.$store.commit('CARD_TYPE', 'new');
        }

    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
   
</style>
