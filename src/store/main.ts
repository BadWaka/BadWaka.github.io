
import {
    defineStore
} from 'pinia';
import articles from '../../src/articles/articles.json';

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
        list: articles
    }),

    getters: {
    },

    actions: {
    },

});
