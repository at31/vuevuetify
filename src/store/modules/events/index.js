import axios from 'axios';
import moment from 'moment';

// initial state
const state = {
    events: [],
    currEvent: {
        title: '',
        start: {format: () => {}},
        end: {format: () => {}},
        status: 1,
        description: '',
        socket: ''
    },
    newEvent: {

    },
    showEventDialog: false,
    cardType: 'info'
};

// getters
const getters = {
};

// actions
const actions = {
    loadAllEvents(context) {
        axios.get('http://127.0.0.1:3000/evnt')
                 .then(response => {
                     if (response.status === 200) {
                         context.commit('EVENTS_LOADED', response.data);
                     }
                 })
                 .catch(e => {
                     console.log('ошибка загрузки заданий $err', err);
                     context.commit('INFO_SNACKBAR', {show: true, context: 'error', text: 'ошибка загрузки заданий'});
                 });
    },
    saveNewEvent(context, nevnt) {
        let evntarr = [];
        context.rootState.po.selectedPO.forEach(po => {
            let event = Object.assign({}, nevnt);
            event.postalCode = po.postalCode;
            evntarr.push(event);
        });
        if (evntarr.length > 0) {
            console.log('send axios post');
            axios.post('http://127.0.0.1:3000/evnt/save/multi', evntarr)
                 .then(response => {
                     console.log('new event  $response', response);
                     context.commit('INFO_SNACKBAR', {show: true, context: 'success', text: 'Новое задание создано'});
                     context.dispatch('loadAllEvents');
                     context.dispatch('loadAllPO');
                 })
                 .catch(e => {
                     console.log('ошибка создания задания $err', err);
                     context.commit('INFO_SNACKBAR', {show: true, context: 'error', text: 'ошибка создания задания'});
                 });
        }
    },
    updateEvent(context, event) {
        context.commit('CARD_TYPE', 'none');
        axios.post('http://127.0.0.1:3000/evnt/update/' + event._id, event)
            .then(response => {
                console.log('event update $response', response);
                context.commit('INFO_SNACKBAR', {show: true, context: 'success',
                    text: 'Задача обновлена'});
                context.dispatch('loadAllEvents');
                context.dispatch('loadAllPO');
            }).catch(err => {
                console.log('ошибка изменения задачи $err', err);
                context.commit('INFO_SNACKBAR', {show: true, context: 'error',
                    text: 'ошибка изменения задачи'});
            });
    },
    deleteEvent(context, event) {
        context.commit('CARD_TYPE', 'none');
        axios.post('http://127.0.0.1:3000/evnt/tdel', event)
            .then(response => {
                console.log('event deleted $response', response);
                context.commit('INFO_SNACKBAR', {show: true, context: 'success',
                    text: 'Задача удалена'});
                context.dispatch('loadAllEvents');
                context.dispatch('loadAllPO');
            }).catch(err => {
                console.log('ошибка удаления задачи $err', err);
                context.commit('INFO_SNACKBAR', {show: true, context: 'error',
                    text: 'ошибка удаления задачи'});
            });
    }
};

// mutations
const mutations = {
    SHOW_EVENT_DIALOG(state, st) {
        state.showEventDialog = st;
    },
    SET_CURR_EVENT(state, event) {
        state.currEvent = event;
    },
    CARD_TYPE_EVENT(state, type) {
        state.cardType = '';
        state.cardType = type;
    },
    EVENTS_LOADED(state, events) {
        state.events = events.map(event => {
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
                show: true
            };
        });
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};

