import axios from 'axios';
import moment from 'moment';
// initial state
const state = {
    postOffices: [],
    selectedPO: [],
    selectedPostCodeSet: new Set(),
    currPO: {
        label: '',
        postalCode: '',
        latitude: '',
        longitude: '',
        addressSource: '',
        region: '',
        settlement: ''
    },
    showPODialog: false,
    poCardType: '',
    newAddressSource: ''
};

// getters
const getters = {
    listPO: state => {
        return state.postOffices.map((otd) => prepData4ListView(otd));
    }
};

// actions
const actions = {
    loadAllPO(context) {
        axios.get('http://127.0.0.1:3000/po/all').then(response => {
            if (response.status === 200) {
                context.commit('PO_LOADED', response.data);
                console.log(response.data);
            }
        }).catch(err => {
            console.log(err);
        });
    },
    filterMap(context, filter) {

    },
    removeFilterMap(context) {
        const arr = state.postOffices.map((otd) => prepData4ListView(otd));
        // state.selectedPO = arr;
        context.commit('SET_SELECTED_PO', arr);
    }
};

// mutations
const mutations = {
    SHOW_NEW_ADDRESS(state, address) {
        state.newAddressSource = address;
    },
    CARD_TYPE_PO(state, type) {
        console.log('po card type = ' + type);
        state.poCardType = type;
    },
    SHOW_PO_DIALOG(state, st) {
        console.log('show-po-dialog', st);
        state.showPODialog = st;
    },
    SET_CURR_PO(state, po) {
        console.log('set-curr-po', po);
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
                console.dir(_f[k]);
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
                console.log('state.postOffice');
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
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};

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
        evntsLength: po.evnts.length,
        fixed: false,
        pindx: 0
    };

    return listel;
}
