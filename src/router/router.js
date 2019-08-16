/* eslint-disable */
import SignUp from '@/views/SignUp/SignUp'
import Login from '@/views/login/login'
import main from '@/views/main/main'
import musicMore from '@/views/musicMore/musicMore'
import musicComment from '@/views/musicMore/musicComment'
import changeInfo from '@/views/changeInfo/changeInfo'
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
                ]
            },
            {
                path: '/musicMore',
                component: musicMore
            },
            {
                path: '/musicComment',
                component: musicComment
            },{
                path: '/changeInfo',
                component: changeInfo
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
    }
    
]