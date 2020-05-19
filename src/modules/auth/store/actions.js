import * as types from './mutation-types'
import * as storage from '../storage'
import services from '@/http'

export const ActionDoLogin = ({ dispatch }, payload) => {
    return services.auth.login(payload).then(res => {
        dispatch('ActionSetToken', res.data.access_token)
    })
}

export const ActionCheckToken = ({dispatch, state}) => {
    if(state.token){
        return Promise.resolve(state.token)
    }

    const token = storage.getLocalToken()

    if(!token){
        return Promise.reject(new Error('Token Inválido'))
    }

    dispatch('ActionSetToken', token)
    return dispatch('ActionLoadSession')
}

export const ActionLoadSession = ({ dispatch }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { data: { token }} = await services.auth.loadSession()

            resolve()
        } catch (error) {
            dispatch('ActionSingOut')
            reject(error)
        }
    })
}

export const ActionSetToken = ({ commit }, payload) => {
    storage.setLocalToken(payload)
    storage.setHeaderToken(payload)
    commit(types.SET_TOKEN, payload)
}

export const ActionSingOut = ({dispatch}) => {
    storage.setHeaderToken('')
    storage.deleteLocalToken()
    dispatch('ActionSetToken', '')
}