window.onload = function () {
    var vm = new Vue({
        el: '#page',
        data: {
            header: {
                imgSrc: 'http://upload-images.jianshu.io/upload_images/1828354-8b9f339cd1b05194.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
                title: 'Maxine',
                subTitle: '我就是又好看又聪明又爱笑身材好学习好又爱读书爱学习勤奋上进的 Maxine',
            },
            tabs: [
                {
                    id: 0,
                    text: 'ME'
                }, {
                    id: 1,
                    text: 'HOME'
                }, {
                    id: 2,
                    text: 'FOOD'
                }, {
                    id: 3,
                    text: 'STUDY'
                }, {
                    id: 4,
                    text: 'EXERCISE'
                }, {
                    id: 5,
                    text: 'CONTACT'
                }
            ],
            tabSelected: 0,
            footer: {
                title: 'Maxine in Beijing',
                infos: [
                    'Beijing',
                    'Phone number :  +86 666 6666',
                    'Corporate registration number : 666-66-6666',
                    'Address : Beijing Beijing Beijing',
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
                        title: '"只有树与我相依"',
                        subTitle: '"穿裙子不冷吗"',
                        videoSrc: '',
                        imgSrc: 'http://img.hb.aicdn.com/c3eaaebd8abf3378abe814fc67317a89a527b35e785ea-YcUNHD_fw658',
                        bottomInfo: '\'KISS THE TIRAMISU\' Community',
                    },
                    {
                        type: 'news',
                        title: '"一天换一个发型"',
                        imgs: [
                            {
                                imgSrc: 'http://img.hb.aicdn.com/f6844c84f52021f2486e795d596f5e6026dc12022318b-Yh6QFj_fw658',
                                url: '',
                                texts: [
                                    '"强掩内心激动"'
                                ]
                            },
                            {
                                imgSrc: 'http://img.hb.aicdn.com/5da54447bb7b7044597542f229af779a9487726d1efa6-bkN7K3_fw658',
                                url: '',
                                texts: [
                                    '"我像吴亦凡吗？"',
                                    '"不，你像gai"'
                                ]
                            },
                            {
                                imgSrc: 'http://img.hb.aicdn.com/878869ab0b834521a9793516115c3d8b2dc019cc21b53-1ayVgV_fw658',
                                url: '',
                                texts: [
                                    '"我擦今天没带眼镜！！"',
                                    '"我是谁！"',
                                    '"我在哪里！！"',
                                    '"我在干什么！！！"'
                                ]
                            },
                        ]
                    },
                ]
            },
            history: {
                cards: [
                    {
                        type: 'img-content',
                        imgSrc: 'http://img.hb.aicdn.com/a924d662bcd4ba09ff37dc776f617a1e98930e73181041-UDg6k8_fw658',
                        title: 'HOME',
                        content: '我的家在东北\n' +
                        '松花江上啊\n' +
                        '那里有满山遍野大豆高粱\n' +
                        '庞龙\n' +
                        '在那青山绿水旁\n' +
                        '门前两棵大白杨\n' +
                        '齐整整的篱笆院\n' +
                        '一间小草房啊\n' +
                        '哎…\n' +
                        '我爸爸有事没事\n' +
                        '总想喝点酒\n' +
                        '就算是没有菜那也得喝二两\n' +
                        '大碗茶大碗的酒\n' +
                        '左邻右舍在两旁\n' +
                        '五魁首六六六\n' +
                        '笑声满堂啊\n' +
                        '哎…哟\n' +
                        '我妈妈从小嗓门就亮啊\n' +
                        '每天她喝着山歌去学堂\n' +
                        '直唱得老大爷\n' +
                        '放下了他的大烟袋\n' +
                        '直唱得小伙子\n' +
                        '更加思念他姑娘\n' +
                        '直唱得老大娘\n' +
                        '放下针线听一段\n' +
                        '直唱得大姑娘\n' +
                        '眼泪汪汪啊\n' +
                        '忘记了洗衣裳\n'
                    }
                ]
            },
            menu: {
                bigImgSrc: 'http://img.hb.aicdn.com/e1307ff7de0ea0d06a2c96b3fbc03f8e8c0614e920573-qQNmj4_fw658',
                title: '老子吃泡面',
                subTitle: '你吃调味料包',
                middleImgSrc: 'https://static.wixstatic.com/media/dd4890_440a9bf9a2a8409d8bd3c5267e69f717~mv2.jpg/v1/fill/w_488,h_657,al_c,q_80,usm_0.66_1.00_0.01/dd4890_440a9bf9a2a8409d8bd3c5267e69f717~mv2.webp',
                middleImgText: 'Enjoy \'KISS THE TIRAMISU\' with\n' +
                'different flavors.',
                foods: [
                    {
                        title: 'ICE-CREAM （太多糖）',
                        imgSrc: 'https://static.wixstatic.com/media/dd4890_fc5dbb9f4e1b4bcaa0e23cc5102f70c1~mv2.jpg/v1/fill/w_972,h_960,al_c,q_85/dd4890_fc5dbb9f4e1b4bcaa0e23cc5102f70c1~mv2.webp'
                    },
                    {
                        title: 'BAKERY（太多奶油）',
                        imgSrc: 'https://static.wixstatic.com/media/dd4890_75fab3a2d7264845917b3b07636b07f6~mv2.jpg/v1/fill/w_972,h_764,al_c,q_85/dd4890_75fab3a2d7264845917b3b07636b07f6~mv2.webp'
                    },
                    {
                        title: 'COFFEE（拿铁！）',
                        imgSrc: 'https://static.wixstatic.com/media/dd4890_4d4571097ae84595b90a17dcbd6bde05~mv2.jpg/v1/fill/w_972,h_1161,al_c,q_85/dd4890_4d4571097ae84595b90a17dcbd6bde05~mv2.webp'
                    },
                    {
                        title: 'TEA（你好，我要绿tea）',
                        imgSrc: 'https://static.wixstatic.com/media/dd4890_915fe2b04f8c442bafe8b79c775ab453~mv2.jpg/v1/fill/w_972,h_1046,al_c,q_85/dd4890_915fe2b04f8c442bafe8b79c775ab453~mv2.webp'
                    },
                ]
            }
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