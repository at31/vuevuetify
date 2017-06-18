// initial state
const state = {
    testState: ''
};

// getters
const getters = {
};

// actions
const actions = {
    testAction(context) {
        console.log('test.js action testAction');
        context.commit('TEST');
        context.commit('TEST_ROOT');
    }
};

// mutations
const mutations = {
    TEST() {
        console.log('hi from test.js');
        state.testState = 'hi from test.js';
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
