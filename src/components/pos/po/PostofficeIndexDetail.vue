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
        <v-btn class="ml-2 " @click.native="newHardShowHandler" primary light v-show="cardType==='edit'">
            <v-icon light class="mr-2">chrome_reader_mode</v-icon>
            Добавить доп. оборудование
        </v-btn> 
            </v-flex>        
           <v-flex sm12 md8 xs8>
               <structure></structure>
           </v-flex>
           <v-flex sm12 md4 xs4>
                <pocompcard v-bind:type="cardType" v-if="currComp.show"></pocompcard>
                <posoftcard v-bind:type="cardType" v-if="currSoft.show"></posoftcard>
                <pohardcard v-bind:type="cardType" v-if="currHard.show"></pohardcard>
                <posoftcardnew v-if="newSoft.show"></posoftcardnew>
                <pocompcardnew v-if="newComp.show"></pocompcardnew>
                <pohardcardnew v-if="newHard.show"></pohardcardnew>
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
import Pohardcard from '@/components/pos/po/structure/POHardCard';
import Pohardcardnew from '@/components/pos/po/structure/POHardCardNew';

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
        Structure,
        Pohardcard,
        Pohardcardnew
    },
    data() {
        return {
            softnew: false
        };
    },
    created() {
        this.allClose();
    },
    mounted() {
        this.$store.commit('ATITLE', {title: 'Управление данными об отделениях - детали', color: 'teal'});
    },
    watch: {

    },
    computed: {
        newHard() {
            return this.$store.state.po.newHardShow;
        },
        newSoft() {
            return this.$store.state.po.newSoftShow;
        },
        newComp() {
            return this.$store.state.po.newCompShow;
        },
        currHard() {
            return this.$store.state.po.currHard;
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
            this.allClose();
            this.$store.commit('SET_NEW_SOFT', {show: true});
        },
        newCompShowHandler() {
            this.allClose();
            this.$store.commit('SET_NEW_COMP', {show: true});
        },
        newHardShowHandler() {
            this.allClose();
            this.$store.commit('SET_NEW_HARD', {show: true});
        },
        allClose() {
            this.$store.commit('SET_CURR_COMP', {show: false});
            this.$store.commit('SET_CURR_SOFT', {show: false});
            this.$store.commit('SET_CURR_HARD', {show: false});
            this.$store.commit('SET_NEW_COMP', {show: false});
            this.$store.commit('SET_NEW_SOFT', {show: false});
            this.$store.commit('SET_NEW_HARD', {show: false});
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
