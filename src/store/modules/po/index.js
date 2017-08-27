import axios from 'axios';
import moment from 'moment';
import settings from '@/settings.js';
// initial state
const state = {
    postOffices: [],
    selectedPO: [],
    selectedPostCodeSet: new Set(),
    currPO: {
        label: '',
        postalCode: '',
        latitude: 50.59,
        longitude: 36.58,
        addressSource: '',
        region: '',
        settlement: '',
        comps: [{id: '', soft: [{'id': ''}]}]
    },
    showPODialog: false,
    poCardType: '',
    newAddressSource: '',
    currComp: {show: false},
    currSoft: {show: false},
    newCompShow: {show: false},
    newSoftShow: {show: false},
    currHard: {show: false},
    newHardShow: {show: false},
    uObj: []
};
// console.log('index');
// getters
const getters = {
    listPO: state => {
        return state.postOffices.map((otd) => prepData4ListView(otd));
    }

};

// actions
const actions = {
    newPO(context, po) {
        axios.post(settings.SERVER_ADDRESS + 'po/new', po).then(response => {
            if (response.status === 200) {
                context.dispatch('loadAllPO');
                context.commit('INFO_SNACKBAR', {show: true, context: 'success',
                    text: 'Отделение добвлено успешно'});
            }
        }).catch(err => {
            console.log('ошибка добавления отделения $err', err);
            context.commit('INFO_SNACKBAR', {show: true, context: 'error',
                text: 'ошибка добавления отделения'});
        });
    },
    updatePO(context, po) {
        console.log('po', po);
        axios.post(settings.SERVER_ADDRESS + '/po/update', po).then(response => {
            if (response.status === 200) {
                context.dispatch('loadAllPO');
                context.commit('INFO_SNACKBAR', {show: true, context: 'success',
                    text: 'Отделение обновлено успешно'});
            }
        }).catch(err => {
            console.log('ошибка обновления отделения $err', err);
            context.commit('INFO_SNACKBAR', {show: true, context: 'error',
                text: 'ошибка обновления отделения'});
        });
    },
    deletePO(context, po) {
        axios.post(settings.SERVER_ADDRESS + '/po/del', po).then(response => {
            if (response.status === 200) {
                context.dispatch('loadAllPO');
                context.commit('INFO_SNACKBAR', {show: true, context: 'success',
                    text: 'Отделение удалено успешно'});
            }
        }).catch(err => {
            console.log('ошибка удаления отделения $err', err);
            context.commit('INFO_SNACKBAR', {show: true, context: 'error',
                text: 'ошибка удаления отделения'});
        });
    },
    loadAllPO(context) {
        console.log('SERVER_ADDRESS', settings.SERVER_ADDRESS);
        axios.get(settings.SERVER_ADDRESS + '/po/all').then(response => {
            if (response.status === 200) {
                context.commit('PO_LOADED', response.data);
            }
        }).catch(err => {
            console.log(err);
        });
    },
    filterMap(context, filter) {

    },
    removeFilterMap(context) {
        // const arr = state.postOffices.map((otd) => prepData4ListView(otd));
        // state.selectedPO = arr;
        // context.commit('SET_SELECTED_PO', arr);
        state.selectedPO = [];
        context.dispatch('loadAllPO');
    },
    freePOFilter(context, fstr) {
        let filter = {match: JSON.parse(fstr)};
        axios.post(settings.SERVER_ADDRESS + '/po/search', filter)
            .then(response => {
                if (response.status === 200) {
                    console.log('pre evnts loaded');
                    context.commit('PO_LOADED', response.data);
                }
            })
            .catch(e => {
                console.log('ошибка загрузки PO $err', err);
                context.commit('INFO_SNACKBAR', {show: true, context: 'error', text: 'ошибка загрузки отделений'});
            });
    }
};

// mutations
const mutations = {
    DELETE_HARD(state, hard) {
        state.currPO.comps.forEach(comp => {
            if (comp.id === hard.compid) {
                comp.hard.splice(hard.indx, 1);
            }
        });
        var tcpo = state.currPO;
        state.currPO = Object.assign({}, tcpo);
    },
    UPDATE_HARD(state, hard) {
        state.currPO.comps.forEach(comp => {
            if (comp.id === hard.compid) {
                const i = hard.indx;
                comp.hard[i] = hard;
                delete comp.hard[i].indx;
                delete comp.hard[i].compid;
            }
        });
        var tcpo = state.currPO;
        state.currPO = Object.assign({}, tcpo);
    },
    DELETE_SOFT(state, soft) {
        state.currPO.comps.forEach(comp => {
            if (comp.id === soft.compid) {
                comp.soft.splice(soft.indx, 1);
            }
        });
        var tcpo = state.currPO;
        state.currPO = Object.assign({}, tcpo);
    },
    UPDATE_SOFT(state, soft) {
        state.currPO.comps.forEach(comp => {
            if (comp.id === soft.compid) {
                const i = soft.indx;
                comp.soft[i] = soft;
                delete comp.soft[i].indx;
                delete comp.soft[i].compid;
            }
        });
        var tcpo = state.currPO;
        state.currPO = Object.assign({}, tcpo);
    },
    DELETE_COMP(state, indx) {
        state.currPO.comps.splice(indx, 1);
        var tcpo = state.currPO;
        state.currPO = Object.assign({}, tcpo);
    },
    UPDATE_COMP(state, hard) {
        // console.log('hard', hard);
        const i = hard.indx;
        hard.soft = state.currPO.comps[i].soft;
        state.currPO.comps[i] = hard;
        delete state.currPO.comps[i].indx;
        var tcpo = state.currPO;
        state.currPO = Object.assign({}, tcpo);
    },
    SET_NEW_HARD(state, s) {
        state.newHardShow = s;
    },
    SET_CURR_HARD(state, s) {
        state.currHard = s;
    },
    SET_NEW_COMP(state, s) {
        state.newCompShow = s;
    },
    SET_NEW_SOFT(state, s) {
        state.newSoftShow = s;
    },
    SET_CURR_COMP(state, comp) {
        // comp.show = true;
        state.currComp = comp;
    },
    SET_CURR_SOFT(state, soft) {
        // soft.show = true;
        state.currSoft = soft;
    },
    SHOW_NEW_ADDRESS(state, address) {
        state.newAddressSource = address;
    },
    CARD_TYPE_PO(state, type) {
        state.poCardType = type;
    },
    SHOW_PO_DIALOG(state, st) {
        state.showPODialog = st;
    },
    SET_CURR_PO(state, po) {
        state.currPO = po;
    },
    EVNT_REMOVE_FROM_LIST(state, {po, event, indx}) {
        po.evnts.splice(indx, 1);
        let tsarr = state.selectedPO;
        state.selectedPO = [];
        state.selectedPO = tsarr;
        tsarr = null;
    },
    PO_REMOVE_FROM_LIST(state, po) {
        let indx = state.selectedPO.indexOf(po);
        state.selectedPO.splice(indx, 1);
    },
    PO_REMOVE_UNSELECTED(state) {
        let arr = [];
        state.selectedPO.forEach(po => {
            if (po.fixed) {
                arr.push(po);
            }
        });
        state.selectedPO = [].concat(arr);
    },
    PO_FILTER(state, filter) {
        let tsarr = [];
        state.selectedPO.forEach((o) => {
            if (o.fixed) {
                tsarr.push(o);
            }
        });
        if (tsarr.length > 0) {
            state.selectedPO = [].concat(tsarr);
        } else {
            state.selectedPO = [];
        }

        state.postOffices.forEach((otd) => {
            let _f = filter;
            for (let k in _f) {
                // console.dir(_f[k]);
                let res = _f[k](otd);
                if (res) {
                    if (!state.selectedPostCodeSet.has(otd.postalCode)) {
                        // console.log(state.selectedPO);
                        state.selectedPO.push(prepData4ListView(otd));
                    }
                }
            }
        });
    },
    SET_SELECTED_PO(state, val) {
        state.selectedPO = val;
    },
    PO_LOADED(state, pos) {
        state.postOffices = pos;

        let arr = [];
        if (state.selectedPO.length > 0) {
            state.selectedPO.forEach(spo => {
                // console.log('state.postOffice');
                state.postOffices.forEach(el => {
                    if (el.postalCode === spo.postalCode) {
                        arr.push(prepData4ListView(el));
                    }
                });
            });
        } else {
            arr = pos.map((otd) => prepData4ListView(otd));
        }
        state.selectedPO = arr;
        if (state.currPO.postalCode !== '') {
            state.currPO = state.selectedPO.find(po => {
                if (state.currPO.postalCode === po.postalCode) {
                    return po;
                }
            });
        }
        let robj = {};
        let keyArr = [];
        console.log('state.selectedPO', state.selectedPO);
        var ao = state.selectedPO.map(po => po.comps);
        ao = ao.reduce(function (pc, lp) {
            return pc.concat(lp);
        });
        ao = ao.map(_c => {
            var c = Object.assign({}, _c);
            var tr = c.soft.concat(c.hard);
            delete c.soft;
            delete c.hard;
            return [c].concat(tr);
        });
        ao = ao.reduce(function (pc, lp) {
            return pc.concat(lp);
        });
        ao.forEach(csh => {
            if (robj[csh.id]) {
                ++robj[csh.id];
            } else {
                robj[csh.id] = 1;
            }
        });
        keyArr = Object.keys(robj).filter(key => robj[key] === state.selectedPO.length);
        ao = keyArr.map(key => {
            return ao.find(csh => csh.id === key);
        });
        console.log('____AO_____ ', keyArr, robj, ao);
        state.uObj = ao;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};

function prepData4ListView(po) {
    po.comps.forEach(c => {
        c.tip = 'comp';
        c.text = c.id + ' тип: комп.';
        c.soft.forEach(s => {
            s.tip = 'soft';
            s.text = s.id + 'тип: ПО';
        });
        if (!c.hard) {
            c.hard = [];
        }
        c.hard.forEach(h => {
            h.tip = 'hard';
            h.text = h.id + 'тип: оборуд.';
        });
    });

    const listel = {
        id: po._id,
        label: po.postalCode,
        postalCode: po.postalCode,
        latitude: po.latitude,
        longitude: po.longitude,
        addressSource: po.addressSource,
        region: po.region,
        settlement: po.settlement,
        evnts: po.evnts.map((o) => {
            const chld = {
                id: o._id,
                label: o.title,
                title: o.title,
                start: moment(o.start),
                end: moment(o.end),
                postalCode: o.postalCode,
                status: o.status,
                description: o.description,
                executor: o.executor,
                show: true
            };
            return chld;
        }),
        comps: po.comps,
        addedprms: po.addedprms || [],
        evntsLength: po.evnts.length,
        fixed: false,
        pindx: 0
    };
    /*
    const listel = {
        id: {value: po._id, title: 'id'},
        label: {value: po.postalCode, title: 'Название'},
        postalCode: {value: po.postalCode, title: 'Индекс'},
        latitude: {value: po.latitude, title: 'Широта'},
        longitude: {value: po.longitude, title: 'Долгота'},
        addressSource: {value: po.addressSource, title: 'Адрес'},
        region: {value: po.region, title: 'Регион'},
        settlement: {value: po.settlement, title: 'Город'},
        evnts: po.evnts.map((o) => {
            const chld = {
                id: o._id,
                label: o.title,
                title: o.title,
                start: moment(o.start),
                end: moment(o.end),
                postalCode: o.postalCode,
                status: o.status,
                description: o.description,
                executor: o.executor,
                show: true
            };
            return chld;
        }),
        comps: po.comps,
        evntsLength: po.evnts.length,
        fixed: false,
        pindx: 0
    };
    */
    Object.defineProperty(listel, 'id', {
        // enumerable: false,
        configurable: false
    });
    /*
    Object.defineProperty(listel, 'evnts', {
        enumerable: false
    });
    Object.defineProperty(listel, 'comps', {
        enumerable: false
    });
    Object.defineProperty(listel, 'evntsLength', {
        enumerable: false
    });
    Object.defineProperty(listel, 'fixed', {
        enumerable: false
    });
    Object.defineProperty(listel, 'pindx', {
        enumerable: false
    });

    Object.defineProperty(listel, 'label', {
        configurable: false
    });
    Object.defineProperty(listel, 'postalCode', {
        configurable: false
    });
    Object.defineProperty(listel, 'latitude', {
        configurable: false
    });
    Object.defineProperty(listel, 'longitude', {
        configurable: false
    });
    Object.defineProperty(listel, 'addressSource', {
        configurable: false
    });
    Object.defineProperty(listel, 'region', {
        configurable: false
    });
    Object.defineProperty(listel, 'settlement', {
        configurable: false
    });
    */
    return listel;
}
