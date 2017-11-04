window.onload = function () {
    var vm = new Vue({
        el: '#page',
        data: {
            headerImg: 'http://img.hb.aicdn.com/44d7e4a4a4f65e93421a0eb8292b0c17bd63d2e7544b3-xqXKft_fw658',
            tabs: [
                {
                    id: 0,
                    text: 'MAIN'
                }, {
                    id: 1,
                    text: 'HISTORY'
                }, {
                    id: 2,
                    text: 'MENU'
                }, {
                    id: 3,
                    text: 'NEWS'
                }, {
                    id: 4,
                    text: 'LOCATION'
                }, {
                    id: 5,
                    text: 'CONTACT'
                }
            ],
            tabSelected: 1,
            footer: {
                title: 'KISS THE TIRAMISU in FTAY Co., Ltd',
                infos: [
                    'FTAY CO., Ltd',
                    'Phone number :  +82 6267 6111',
                    'Corporate registration number : 639-87-00207',
                    'Address : 71-2, Dasan-ro 36-gil, Jung-gu, Seoul, Korea',
                    'COPYRIGHT (c) 2016 KISS THE TIRAMISU. ALL RIGHTS RESERVED'
                ]
            },
            index: {
                banners: [
                    {
                        imgSrc: 'http://img.hb.aicdn.com/44d7e4a4a4f65e93421a0eb8292b0c17bd63d2e7544b3-xqXKft_fw658'
                    },
                    {
                        imgSrc: 'http://img.hb.aicdn.com/e5994de8e9551d92236e2a7ab850c283e0d215768bdd5-3mQQF5_fw658'
                    },
                    {
                        imgSrc: 'http://img.hb.aicdn.com/c26d7dcdce9a219ad98cbfec2c51be9e03915f1269d22-NmO1F0_fw658'
                    }
                ],
                cards: [
                    {
                        type: 'video',
                        title: '视频卡',
                        subTitle: '副标题',
                        videoSrc: '',
                        imgSrc: 'http://img.hb.aicdn.com/c3eaaebd8abf3378abe814fc67317a89a527b35e785ea-YcUNHD_fw658',
                        bottomInfo: '\'KISS THE TIRAMISU\' Community',
                    },
                    {
                        type: 'news',
                        title: '图集卡',
                        imgs: [
                            {
                                imgSrc: 'http://img.hb.aicdn.com/f6844c84f52021f2486e795d596f5e6026dc12022318b-Yh6QFj_fw658',
                                url: '',
                                texts: [
                                    '11111',
                                    '22222'
                                ]
                            },
                            {
                                imgSrc: 'http://img.hb.aicdn.com/5da54447bb7b7044597542f229af779a9487726d1efa6-bkN7K3_fw658',
                                url: '',
                                texts: [
                                    '33333',
                                ]
                            },
                            {
                                imgSrc: 'http://img.hb.aicdn.com/878869ab0b834521a9793516115c3d8b2dc019cc21b53-1ayVgV_fw658',
                                url: '',
                                texts: [
                                    '44444',
                                    '55555',
                                    '66666'
                                ]
                            },
                        ]
                    },
                ]
            },
        },
        created: function () {
            console.log('created');
        },
        mounted: function () {
            console.log('mounted');

            // 初始化 swiper 
            var mySwiper = new Swiper('.swiper-container', {
                loop: true,
                speed: 1000,
                effect: 'slide',
                autoplay: {
                    delay: 3000,
                },
                pagination: {
                    el: '.swiper-pagination',
                }
            });
        },
        methods: {
            onTabClick: function (obj) {
                console.log('onTabClick', obj);
                this.tabSelected = obj.id;
            }
        }
    });
};