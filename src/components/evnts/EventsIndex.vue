<template>
    <v-layout row wrap>
           <v-flex xs12 md12 sm12 class="pb-2">
                <v-btn @click.native="onAddBtn" light success class="">
                <v-icon>event</v-icon>
                Новая задача
                </v-btn>
          </v-flex> 
          <v-flex xs12 md6 sm12 class="r-list">
                <eventslist></eventslist>                        
          </v-flex>
          <v-flex xs12 md6 sm12 class="r-list">
                <eventscard v-if="cardType==='info'"></eventscard>
                <eventdeletecard v-if="cardType==='delete'"></eventdeletecard>
                <eventeditcard v-if="cardType==='edit'"></eventeditcard>
          </v-flex>
    </v-layout>  
</template>

<script>
import Eventslist from './EventsList';
import Eventscard from './Eventscard';
import Eventdeletecard from './Eventdeletecard';
import Eventeditcard from './Eventeditcard';

export default {
    name: 'allevent',
    components: {
        Eventslist,
        Eventscard,
        Eventdeletecard,
        Eventeditcard
    },
    data() {
        return {
            cardType: ''
        };
    },
    props: {
        atitle: {
            type: String,
            default: 'Vue!'
        }
    },
    mounted() {
        this.$store.commit('ATITLE', {title: 'Управление задачами', color: 'green'});
    },
    watch: {
        '$store.state.events.cardType': function (n, o) {
            console.log(n);
            this.cardType = '';
            this.cardType = n;
        }
    },
    computed: {
    },
    methods: {
        onAddBtn() {
            this.$router.push({
                path: '/event-new',
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
   
</style>
