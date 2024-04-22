
import {
    defineStore
} from 'pinia';

export interface MainState {
}

export const useMainStore = defineStore('main', {

    state: (): MainState => ({
        // tabs
        tabs: [
            {
                name: '主页',
                router: 'index'
            },
            {
                name: '留言',
                router: 'message'
            }
        ],
        // 文章列表
        list: [
            {
                title: '测试文章'
            }
        ]
    }),

    getters: {
    },

    actions: {
    },

});
