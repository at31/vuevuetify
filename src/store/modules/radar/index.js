import axios from 'axios';
import moment from 'moment';
import io from 'socket.io-client';

// initial state
const state = {
    preevnts: [],
    currEvent: {
        title: '',
        start: {format: () => {}},
        end: {format: () => {}},
        status: 'dummy',
        description: '',
        socket: ''
    },
    newEvent: {

    },
    showPreEventDialog: false,
    cardTypePreEvnt: 'info'
};

// getters
const getters = {
    preEvntPO: state => {
        let rarr = state.preevnts.map((evnt) => {
            return prepData4ListView(evnt.po);
        });
        const map = new Map();
        rarr.forEach(po => {
            map.set(po.postalCode, po);
        });
        return [... map.values()];
    }
};

// actions
const actions = {
    preevntFilter(context, fstr) {
        let filter = {match: JSON.parse(fstr)};
        axios.post('http://127.0.0.1:3000/pre-evnt/search', filter)
                 .then(response => {
                     if (response.status === 200) {
                         console.log('pre evnts loaded');
                         context.commit('SET_CURR_PREEVENT', currEvntToDefault());
                         context.commit('PREEVENTS_LOADED', response.data);
                     }
                 })
                 .catch(e => {
                     console.log('ошибка загрузки заявок $err', err);
                     context.commit('INFO_SNACKBAR', {show: true, context: 'error', text: 'ошибка загрузки заданий'});
                 });
    },
    onRadarSocketIO(context) {
        context.socket = io.connect('http://localhost:3000');
        context.socket.on('mainsocket', function (data) {
            // console.log('======================socket connect========================');
            // console.log(data.data);
            // console.log('======================socket connect========================');
            if (data.type === 'newPreEvnt') {
                context.commit('INFO_SNACKBAR', {show: true, context: 'success', text: 'Поступила новая заявка'});
                context.commit('NEW_PREEVENT', data.data[0]);
            }
        });
    },
    offRadarSocketIO(context) {
        socket.off('mainsocket');
    },
    loadAllPreEvents(context) {
        axios.get('http://127.0.0.1:3000/pre-evnt')
                 .then(response => {
                     if (response.status === 200) {
                         console.log('pre evnts loaded');
                         context.commit('SET_CURR_PREEVENT', currEvntToDefault());
                         context.commit('PREEVENTS_LOADED', response.data);
                     }
                 })
                 .catch(e => {
                     console.log('ошибка загрузки заявок $err', err);
                     context.commit('INFO_SNACKBAR', {show: true, context: 'error', text: 'ошибка загрузки заданий'});
                 });
    },
    saveNewEventFromPre(context, nevnt) {
        let evntarr = [];
        evntarr.push(nevnt);
        if (evntarr.length > 0) {
            console.log('send axios post');
            axios.post('http://127.0.0.1:3000/evnt/save/multi', evntarr)
                 .then(response => {
                     console.log('new event  $response', response);
                     context.commit('INFO_SNACKBAR', {show: true, context: 'success', text: 'Новое задание создано'});
                     context.dispatch('deletePreEvent', nevnt);
                 })
                 .catch(e => {
                     console.log('ошибка создания задания $err', err);
                     context.commit('INFO_SNACKBAR', {show: true, context: 'error', text: 'ошибка создания задания'});
                 });
        }
    },
    deletePreEvent(context, event) {
        context.commit('CARD_TYPE', 'none');
        axios.post('http://127.0.0.1:3000/pre-evnt/del', event)
            .then(response => {
                console.log('event deleted $response', response);
                context.commit('INFO_SNACKBAR', {show: true, context: 'success',
                    text: 'Заявка удалена'});
                context.commit('CARD_TYPE_PREEVENT', 'dummy');
                context.commit('SET_CURR_PREEVENT', currEvntToDefault());
                context.dispatch('loadAllPreEvents');
            }).catch(err => {
                console.log('ошибка удаления задачи $err', err);
                context.commit('INFO_SNACKBAR', {show: true, context: 'error',
                    text: 'ошибка удаления задачи'});
            });
    }
};

// mutations
const mutations = {
    NEW_PREEVENT(state, preevnt) {
        state.preevnts.forEach(pe => { pe.active = false; });
        let _evnt = prepEvnt4ListView(preevnt);
        _evnt.active = true;
        state.preevnts.push(_evnt);
        state.currEvent = _evnt;
    },
    PREEVENTS_LOADED(state, data) {
        state.preevnts = data.map(event => {
            return {
                id: event._id,
                label: event.title,
                title: event.title,
                start: moment(event.start),
                end: moment(event.end),
                postalCode: event.postalCode,
                status: event.status,
                description: event.description,
                executor: event.executor,
                show: true,
                po: event.po,
                active: false
            };
        });
    },
    SHOW_PREEVENT_DIALOG(state, st) {
        state.showPreEventDialog = st;
    },
    SET_CURR_PREEVENT(state, event) {
        state.currEvent = event;
    },
    CARD_TYPE_PREEVENT(state, type) {
        state.cardTypePreEvnt = '';
        state.cardTypePreEvnt = type;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};

function currEvntToDefault() {
    return {
        title: '',
        start: {format: () => {}},
        end: {format: () => {}},
        status: 'dummy',
        description: '',
        socket: ''
    };
}

function prepEvnt4ListView(event) {
    const _evnt = {
        id: event._id,
        label: event.title,
        title: event.title,
        start: moment(event.start),
        end: moment(event.end),
        postalCode: event.postalCode,
        status: event.status,
        description: event.description,
        executor: event.executor,
        show: true,
        po: event.po,
        active: false
    };

    return _evnt;
}

function prepData4ListView(po) {
    const listel = {
        id: po._id,
        label: po.postalCode,
        postalCode: po.postalCode,
        latitude: po.latitude,
        longitude: po.longitude,
        addressSource: po.addressSource,
        region: po.region,
        settlement: po.settlement,
        fixed: false,
        pindx: 0
    };

    return listel;
}
