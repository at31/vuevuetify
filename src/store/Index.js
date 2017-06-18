import Vue from 'vue';
import Vuex from 'vuex';
import po from './modules/po';
import users from './modules/users';
import lists from './modules/lists';
import events from './modules/events';

Vue.use(Vuex);

const state = {
    atitle: {title: '', color: ''},
    infoSnackbar: {show: false, context: 'info', text: ''}
};

const actions = {

};

const mutations = {
    ATITLE(state, val) {
        state.atitle = val;
    },
    INFO_SNACKBAR(state, sncbr) {
        var _sncbr = Object.assign({}, sncbr);
        state.infoSnackbar = _sncbr;
    }
};

export default new Vuex.Store({
    state,
    actions,
    mutations,
    modules: {
        users,
        po,
        lists,
        events
    }
});
