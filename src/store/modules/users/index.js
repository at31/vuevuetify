import axios from 'axios';
// initial state
const state = {
    users: [],
    currUser: {
        _id: '',
        email: '',
        pass: '',
        role: '',
        login: '',
        fio: ''
    },
    cardType: 'info'
};

// getters
const getters = {
};

// actions
const actions = {
    getUsers(context) {
        axios.get('http://127.0.0.1:3000/users/all').then(response => {
            if (response.status === 200) {
                context.commit('USERS_LOADED', response.data.map((usr) => {
                    // исключаем свойства из видимости для for in...
                    Object.defineProperty(usr, 'selected', {
                        value: false,
                        enumerable: false
                    });
                    Object.defineProperty(usr, 'text', {
                        value: usr.fio,
                        enumerable: false
                    }); // for vuetify select "Item object is required to have a text property"
                    Object.defineProperty(usr, '_id', {
                        enumerable: false,
                        configurable: false
                    });
                    // отмечаем дефолтные по согласованию с заказчиком при разработке модели свойства как неизменяемые
                    Object.defineProperty(usr, 'email', {
                        configurable: false
                    });
                    Object.defineProperty(usr, 'pass', {
                        configurable: false
                    });
                    Object.defineProperty(usr, 'role', {
                        configurable: false
                    });
                    Object.defineProperty(usr, 'login', {
                        configurable: false
                    });
                    Object.defineProperty(usr, 'fio', {
                        configurable: false
                    });
                    return usr;
                }));
                // context.dispatch('getListsAll');
            }
        }).catch(err => {
            console.log('ошибка загрузки users $err', err);
        });
    },
    saveNewUser(context, user) {
        context.commit('CARD_TYPE', 'none');
        axios.post('http://127.0.0.1:3000/users/new', user)
            .then(response => {
                console.log('user deleted $response', response);
                context.commit('INFO_SNACKBAR', {show: true, context: 'success', text: 'Новый пользователь создан'});
                context.dispatch('getUsers');
            }).catch(err => {
                console.log('ошибка создания пользователя $err', err);
                context.commit('INFO_SNACKBAR', {show: true, context: 'error', text: 'ошибка создания пользователя'});
            });
    },
    updateUser(context, user) {
        context.commit('CARD_TYPE', 'none');
        axios.post('http://127.0.0.1:3000/users/update', user)
            .then(response => {
                console.log('user deleted $response', response);
                context.commit('INFO_SNACKBAR', {show: true, context: 'success', text: 'Пользователь обновлен'});
                context.dispatch('getUsers');
            }).catch(err => {
                console.log('ошибка изменения пользователя $err', err);
                context.commit('INFO_SNACKBAR', {show: true, context: 'error', text: 'ошибка изменения пользователя'});
            });
    },
    deleteUser(context, user) {
        context.commit('CARD_TYPE', 'none');
        axios.post('http://127.0.0.1:3000/users/del', user)
            .then(response => {
                console.log('user deleted $response', response);
                context.commit('INFO_SNACKBAR', {show: true, context: 'success', text: 'Пользователь удален'});
                context.dispatch('getUsers');
            }).catch(err => {
                console.log('ошибка удаления пользователя $err', err);
                context.commit('INFO_SNACKBAR', {show: true, context: 'error', text: 'ошибка удаления пользователя'});
            });
    }
};

// mutations
const mutations = {
    USERS_LOADED(state, users) {
        state.users = users;
    },
    CURR_USER(state, user) {
        state.currUser = user;
    },
    CARD_TYPE(state, type) {
        state.cardType = type;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
