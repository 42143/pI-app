export default ({
    state: {
        listOfItems: []
    },
    getters: {
        listDevices: state => {
            return state.listOfItems;
        }
    },
    mutations: {
        SET_LIST_OF_ITEMS(state, payload) {
            state.listOfItems.push({payload});
        }
    },
    actions: {}
})