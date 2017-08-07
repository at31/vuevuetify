import axios from 'axios';
import moment from 'moment';

moment().locale('ru');
// initial state
const state = {
    showListDialog: false,
    lists: [],
    currList: {
        _id: '',
        title: '',
        description: '',
        executor: {fio: ''},
        path: [],
        evnts: []
    },
    newList: {
        title: '',
        description: '',
        executor: {fio: ''},
        path: [],
        evnts: []
    },
    newList4Print: {
        title: '',
        description: '',
        executor: {fio: ''},
        path: [],
        evnts: []
    },
    cardTypeLists: ''

};

// getters
const getters = {
};

// actions
const actions = {
    updateList(context, list) {
        axios.post('http://127.0.0.1:3000/lists/update', list)
            .then(response => {
                console.log('list updated $response', response);
                context.commit('INFO_SNACKBAR', {show: true, context: 'success',
                    text: 'Обновление успешно'});
                context.dispatch('getListsAll');
            }).catch(err => {
                console.log('ошибка записи списка $err', err);
                context.commit('INFO_SNACKBAR', {show: true, context: 'error',
                    text: 'ошибка обновления списка'});
            });
    },
    deleteList(context, list) {
        console.log(list);
        axios.post('http://127.0.0.1:3000/lists/del', list)
            .then(response => {
                console.log('list deleted $response', response);
                ontext.commit('INFO_SNACKBAR', {show: true, context: 'success',
                    text: 'Список удален успешно'});
                context.dispatch('getListsAll');
           //
            }).catch(err => {
                console.log('ошибка записи списка $err', err);
                context.commit('INFO_SNACKBAR', {show: true, context: 'error',
                    text: 'ошибка удалдения списка'});
            });
    },
    saveNewList(context, newList) {
        context.state.newList.createdDate = new Date();
        context.state.newList.created = '588530e0bf376a0e34420fa1'; // хак
        context.state.newList.executor = newList.executor._id;
        context.state.newList.title = newList.title;
        context.state.newList.description = newList.description;
        let evnts = [];
        context.rootState.po.selectedPO.forEach(po => {
            evnts = evnts.concat(po.evnts.map(evnt => { return {evnt: evnt.id, postalCode: evnt.postalCode}; }));
        });
        context.state.newList.evnts = evnts;
        context.state.newList.path = context.rootState.po.selectedPO.map(po => po.postalCode);
        axios.post('http://127.0.0.1:3000/lists/new', context.state.newList)
            .then(response => {
                console.log('new lists saved $response', response);
                context.commit('INFO_SNACKBAR', {show: true, context: 'success',
                    text: 'Новый список сохранен успешно'});

                // 4print pdf
                let pevnts = [];
                context.rootState.po.selectedPO.forEach(po => {
                    pevnts = pevnts.concat(po.evnts.map(evnt => { return evnt.title; }));
                });
                state.newList4Print = {
                    title: newList.title,
                    description: newList.description,
                    executor: newList.executor.fio,
                    path: context.rootState.po.selectedPO.map(po => po.addressSource),
                    evnts: pevnts
                };
                context.state.newList = {evnts: [], executor: '', title: '', description: ''};
                context.dispatch('getListsAll');
            }).catch(err => {
                console.log('ошибка записи списка $err', err);
                context.commit('INFO_SNACKBAR', {show: true, context: 'error',
                    text: 'ошибка сохранения списка'});
            });
    },

    getListsAll(context, filter) {
        // console.log('dispatch getListsAll command');
        axios.get('http://127.0.0.1:3000/lists/all').then(response => {
            if (response.status === 200) {
                const data = response.data;
                data.forEach(list => {
                    list.listsAllEvnts = list.evnts.length;

                    const set = new Set();
                    list.evnts.forEach(evnt => {
                        evnt.start = moment(evnt.start);
                        evnt.end = moment(evnt.end);
                        set.add(evnt.postalCode);
                    });
                    list.listsAllPOs = set.size;

                    const path = [];
                    list.path.forEach(_postalCode => {
                        console.log('_postalCode', context.rootState.po.postOffices);
                        context.rootState.po.postOffices.forEach(po => {
                            if (po.postalCode === _postalCode) {
                                path.push(po);
                            }
                        });
                    });
                    list.path = path;
                    list.endDate = moment();
                });
                context.commit('LISTS_LOADED', data);
            }
        }).catch(err => {
            console.log('ошибка загрузки всех списков $err', err);
        });
    }
};

// mutations
const mutations = {
    SHOW_LIST_DIALOG(state, showDialog) {
        state.showListDialog = showDialog;
    },
    LISTS_LOADED(state, data) {
        state.lists = data;
    },
    SET_CURR_LIST(state, list) {
        state.currList = list;
    },
    CARD_TYPE_LIST(state, type) {
        state.cardTypeLists = type;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
