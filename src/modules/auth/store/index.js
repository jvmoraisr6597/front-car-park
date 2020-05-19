import * as actions from './actions'
import mutations from './mutations'
import state from './state'
import * as getters from './getters'

export default {
    state,
    actions,
    getters,
    mutations,
    namespaced: true
}