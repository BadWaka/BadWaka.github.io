
import {
    defineStore
} from 'pinia';

export interface MainState {
}

export const useMainStore = defineStore('main', {

    state: (): MainState => ({
        tabs: [
            {
                name: '主页',
                router: 'index'
            },
            {
                name: '留言',
                router: 'message'
            }
        ]
    }),

    getters: {
    },

    actions: {
    },

});
