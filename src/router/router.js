/* eslint-disable */
import SignUp from '@/views/SignUp/SignUp'
import Login from '@/views/login/login'
import main from '@/views/main/main'
import musicMore from '@/views/musicMore/musicMore'
import musicComment from '@/views/musicMore/musicComment'
import changeInfo from '@/views/changeInfo/changeInfo'
import broadStation from '@/views/broadStation/broadStation'
import goclass from '@/views/broadStation/goclass'
import getclass from '@/views/broadStation/getclass'
import broadUserInfo from '@/views/broadStation/broadUserInfo'
import playBroad from '@/views/broadStation/playBroad'
import MV from '@/views/MV/MV'
import moreMV from '@/views/MV/moreMV'
import playMV from '@/views/MV/playMV'
import search from '@/views/search/search'
import listenList from '@/views/main/listenList'
import Layout from '@/views/Layout'
import listen from '@/views/listen'

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