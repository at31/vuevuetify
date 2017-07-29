<template>        
        <v-layout row wrap>
            <v-flex sm12 md12 xs12>                 
        <v-btn class="ml-2 teal " @click.native="backToRoot" light>
            <v-icon light class="mr-2">arrow_back</v-icon>
            Общие данные
        </v-btn> 
        <v-btn class="ml-2 " @click.native="newCompShowHandler" primary light v-show="cardType==='edit'">
            <v-icon light class="mr-2">laptop</v-icon>
            Добавить оборудование
        </v-btn>
        <v-btn class="ml-2 " @click.native="newSoftShowHandler" primary light v-show="cardType==='edit'">
            <v-icon light class="mr-2">chrome_reader_mode</v-icon>
            Добавить ПО
        </v-btn> 
            </v-flex>        
           <v-flex sm12 md8 xs8>
               <structure></structure>
           </v-flex>
           <v-flex sm12 md4 xs4>
                <pocompcard v-bind:type="cardType" v-if="currComp.show"></pocompcard>
                <posoftcard v-bind:type="cardType" v-if="currSoft.show"></posoftcard>
                <posoftcardnew v-if="newSoft.show"></posoftcardnew>
                <pocompcardnew v-if="newComp.show"></pocompcardnew>
           </v-flex>
           
        </v-layout>
</template>

<script>
import Posoftcardnew from '@/components/pos/po/structure/POSoftCardNew';
import Pocompcardnew from '@/components/pos/po/structure/POCompCardNew';
import Pocompcard from '@/components/pos/po/structure/POCompCard';
import Posoftcard from '@/components/pos/po/structure/POSoftCard';
import Newcard from '@/components/pos/po/PostofficeNewCard';
import Editcard from '@/components/pos/po/PostofficeEditCard';
import Deletecard from '@/components/pos/po/PostofficeDeleteCard';
import Infocard from '@/components/pos/po/PostofficeInfoCard';
import Structure from '@/components/pos/po/PostofficeStructure';


export default {
    name: 'POSructure',
    components: {
        Pocompcardnew,
        Posoftcardnew,
        Pocompcard,
        Posoftcard,
        Newcard,
        Editcard,
        Deletecard,
        Infocard,
        Structure
    },
    data() {
        return {
            softnew: false
        };
    },
    created() {
        this.$store.commit('SET_CURR_COMP', {show: false});
        this.$store.commit('SET_CURR_SOFT', {show: false});
        this.$store.commit('SET_NEW_SOFT', {show: false});
        this.$store.commit('SET_NEW_COMP', {show: false});
    },
    mounted() {
        this.$store.commit('ATITLE', {title: 'Управление данными об отделениях - детали', color: 'teal'});
    },
    watch: {

    },
    computed: {
        newSoft() {
            return this.$store.state.po.newSoftShow;
        },
        newComp() {
            return this.$store.state.po.newCompShow;
        },
        currComp() {
            return this.$store.state.po.currComp;
        },
        currSoft() {
            return this.$store.state.po.currSoft;
        },
        cardType() {
            return this.$store.state.po.poCardType;
        }
    },
    methods: {
        backToRoot() {
            this.$router.push({
                path: '/post-offices',
                params: {
                    hi: 'hi @at31'
                }
            });
        },
        newSoftShowHandler() {
            this.$store.commit('SET_CURR_COMP', {show: false});
            this.$store.commit('SET_CURR_SOFT', {show: false});
            this.$store.commit('SET_NEW_COMP', {show: false});
            this.$store.commit('SET_NEW_SOFT', {show: true});
        },
        newCompShowHandler() {
            this.$store.commit('SET_CURR_COMP', {show: false});
            this.$store.commit('SET_CURR_SOFT', {show: false});
            this.$store.commit('SET_NEW_COMP', {show: true});
            this.$store.commit('SET_NEW_SOFT', {show: false});
        }
    }
};


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.r-position{
    position:relative;
}
.a-position{
    position: absolute;
    top: 50px;
    left: 50px;
    max-width: 500px;
}
.a-position-l{
    position: absolute;
    top: 50px;
    left: 500px;
}
.a-position-r{
    position: absolute;
    top: 50px;
    right: 50px;
}

</style>
