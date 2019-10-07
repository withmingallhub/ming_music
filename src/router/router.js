/* eslint-disable */
import SignUp from '@/views/SignUp/SignUp'
import Login from '@/views/login/login'
import main from '@/views/main/main'
import listenList from '@/views/main/listenList'

import musicList from '@/views/main/musicList'
import ranking from '@/views/main/ranking'
import singer from '@/views/main/singer'
import special from '@/views/main/special'
import rankingI from '@/views/main/rankingI'
import typeSinger from '@/views/main/typeSinger/typeSinger'
import thisType from '@/views/main/typeSinger/thisType'
import singerInfo from '@/views/main/typeSinger/singerInfo'
import listClass from '@/views/main/listClass/listClass'
import albumsInfo from '@/views/main/albums/albumsInfo'
import myLove from '@/views/main/myLove/myLove'

import loveUser from '@/views/myLoves/loveUser'
import loveSinger from '@/views/myLoves/loveSinger'
import loveUserInfo from '@/views/myLoves/loveUserInfo'

import loveUserSayCom from '@/views/myLoves/loveUser/loveUserSayCom'

import musicMore from '@/views/musicMore/musicMore'
import musicComment from '@/views/musicMore/musicComment'
import changeInfo from '@/views/changeInfo/changeInfo'
import broadStation from '@/views/broadStation/broadStation'
import goclass from '@/views/broadStation/goclass'
import getclass from '@/views/broadStation/getclass'
import broadUserInfo from '@/views/broadStation/broadUserInfo'
import playBroad from '@/views/broadStation/playBroad'
import sublist from '@/views/broadStation/sublist'
import buyWell from '@/views/broadStation/buyWell'
import MV from '@/views/MV/MV'
import moreMV from '@/views/MV/moreMV'
import playMV from '@/views/MV/playMV'
import search from '@/views/search/search'
import Layout from '@/views/Layout'
import listen from '@/views/listen'

import listenHistory from '@/views/history/listenHistory'
import newInfo from '@/views/newInfo/newInfo'
import sendInfo from '@/views/sendInfo/sendInfo'

export default[
    {
        path:'/',
        component:resolve => require(['@/views/listen'],resolve),
        children: [
            {
                path: '/',
                // name: 'Layout',
                component: resolve => require(['@/views/Layout'],resolve),
                children: [
                    {
                        path: '/',
                        component: resolve => require(['@/views/main/main'],resolve)
                    },
                    {
                        path: '/listenList',
                        component: resolve => require(['@/views/main/listenList'],resolve)
                    },
                    {
                        path: '/broadStation',
                        component: resolve => require(['@/views/broadStation/broadStation'],resolve)
                    },
                    {
                        path: '/goclass',
                        component: resolve => require(['@/views/broadStation/goclass'],resolve)
                    },
                    {
                        path: '/getclass',
                        component: resolve => require(['@/views/broadStation/getclass'],resolve)
                    },
                    {
                        path: '/MV',
                        component: resolve => require(['@/views/MV/MV'],resolve)
                    },
                    {
                        path: '/moreMV',
                        component: resolve => require(['@/views/MV/moreMV'],resolve)
                    },
                    {
                        path: '/search',
                        component: resolve => require(['@/views/search/search'],resolve)
                    },
                    {
                        path: '/broadUserInfo',
                        component: resolve => require(['@/views/broadStation/broadUserInfo'],resolve)
                    },
                    {
                        path: '/sublist',
                        component: resolve => require(['@/views/broadStation/sublist'],resolve)
                    },
                    {
                        path: '/buyWell',
                        component: resolve => require(['@/views/broadStation/buyWell'],resolve)
                    },
                    {
                        path: '/musicList',
                        component: resolve => require(['@/views/main/musicList'],resolve)
                    },
                    {
                        path: '/ranking',
                        component: resolve => require(['@/views/main/ranking'],resolve)
                    },
                    {
                        path: '/singer',
                        component: resolve => require(['@/views/main/singer'],resolve)
                    },
                    {
                        path: '/special',
                        component: resolve => require(['@/views/main/special'],resolve)
                    },
                    {
                        path: '/rankingI',
                        component: resolve => require(['@/views/main/rankingI'],resolve)
                    },
                    {
                        path: '/typeSinger',
                        component: resolve => require(['@/views/main/typeSinger/typeSinger'],resolve)
                    },
                    {
                        path: '/thisType',
                        component: resolve => require(['@/views/main/typeSinger/thisType'],resolve)
                    },
                    {
                        path: '/singerInfo',
                        component: resolve => require(['@/views/main/typeSinger/singerInfo'],resolve)
                    },
                    {
                        path: '/listClass',
                        component: resolve => require(['@/views/main/listClass/listClass'],resolve)
                    },
                    {
                        path: '/albumsInfo',
                        component: resolve => require(['@/views/main/albums/albumsInfo'],resolve)
                    },
                    {
                        path: '/listenHistory',
                        component: resolve => require(['@/views/history/listenHistory'],resolve)
                    }

                ]
            },
            {
                path: '/musicMore',
                component: resolve => require(['@/views/musicMore/musicMore'],resolve)
            },
            {
                path: '/musicComment',
                component: resolve => require(['@/views/musicMore/musicComment'],resolve)
            },
            {
                path: '/changeInfo',
                component: resolve => require(['@/views/changeInfo/changeInfo'],resolve)
            },
            {
                path: '/playBroad',
                component: resolve => require(['@/views/broadStation/playBroad'],resolve)
            },
            {
                path: '/loveUser',
                component: resolve => require(['@/views/myLoves/loveUser'],resolve)
            },
            {
                path: '/loveSinger',
                component: resolve => require(['@/views/myLoves/loveSinger'],resolve)
            },
            {
                path: '/myLove',
                component: resolve => require(['@/views/main/myLove/myLove'],resolve)
            },
            {
                path: '/loveUserInfo',
                component: resolve => require(['@/views/myLoves/loveUserInfo'],resolve)
            },
            {
                path: '/loveUserSayCom',
                component: resolve => require(['@/views/myLoves/loveUser/loveUserSayCom'],resolve)
            },
            {
                path: '/newInfo',
                component: resolve => require(['@/views/newInfo/newInfo'],resolve)
            },
            {
                path: '/sendInfo',
                component: resolve => require(['@/views/sendInfo/sendInfo'],resolve)
            }
            
        ]
    },
    {
        path: '/SignUp',
        component: resolve => require(['@/views/SignUp/SignUp'],resolve),
    },
    {
        path: '/Login',
        component: resolve => require(['@/views/login/login'],resolve)
    },
    {
        path: '/playMV',
        component: resolve => require(['@/views/MV/playMV'],resolve)
    }
    
]