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
        component:listen,
        children: [
            {
                path: '/',
                // name: 'Layout',
                component: Layout,
                children: [
                    {
                        path: '/',
                        component: main
                    },
                    {
                        path: '/listenList',
                        component: listenList
                    },
                    {
                        path: '/broadStation',
                        component: broadStation
                    },
                    {
                        path: '/goclass',
                        component: goclass
                    },
                    {
                        path: '/getclass',
                        component: getclass
                    },
                    {
                        path: '/MV',
                        component: MV
                    },
                    {
                        path: '/moreMV',
                        component: moreMV
                    },
                    {
                        path: '/search',
                        component: search
                    },
                    {
                        path: '/broadUserInfo',
                        component: broadUserInfo
                    },
                    {
                        path: '/sublist',
                        component: sublist
                    },
                    {
                        path: '/buyWell',
                        component: buyWell
                    },
                    {
                        path: '/musicList',
                        component: musicList
                    },
                    {
                        path: '/ranking',
                        component: ranking
                    },
                    {
                        path: '/singer',
                        component: singer
                    },
                    {
                        path: '/special',
                        component: special
                    },
                    {
                        path: '/rankingI',
                        component: rankingI
                    },
                    {
                        path: '/typeSinger',
                        component: typeSinger
                    },
                    {
                        path: '/thisType',
                        component: thisType
                    },
                    {
                        path: '/singerInfo',
                        component: singerInfo
                    },
                    {
                        path: '/listClass',
                        component: listClass
                    },
                    {
                        path: '/albumsInfo',
                        component: albumsInfo
                    },
                    {
                        path: '/listenHistory',
                        component: listenHistory
                    }

                ]
            },
            {
                path: '/musicMore',
                component: musicMore
            },
            {
                path: '/musicComment',
                component: musicComment
            },
            {
                path: '/changeInfo',
                component: changeInfo
            },
            {
                path: '/playBroad',
                component: playBroad
            },
            {
                path: '/loveUser',
                component: loveUser
            },
            {
                path: '/loveSinger',
                component: loveSinger
            },
            {
                path: '/myLove',
                component: myLove
            },
            {
                path: '/loveUserInfo',
                component: loveUserInfo
            },
            {
                path: '/loveUserSayCom',
                component: loveUserSayCom
            },
            {
                path: '/newInfo',
                component: newInfo
            },
            {
                path: '/sendInfo',
                component: sendInfo
            }
            
        ]
    },
    {
        path: '/SignUp',
        component: SignUp,
    },
    {
        path: '/Login',
        component: Login
    },
    {
        path: '/playMV',
        component: playMV
    }
    
]