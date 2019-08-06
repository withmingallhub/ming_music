/* eslint-disable */
import SignUp from '@/views/SignUp/SignUp'
import Login from '@/views/login/login'
import main from '@/views/main/main'
import listenList from '@/views/main/listenList'
import listenMusic from '@/components/listenMusic/listenMusic'
import Layout from '@/views/Layout'

export default[
    {
        path: '/',
        name: 'Layout',
        component: Layout,
        children: [
            {
                path: '/',
                component: main
            },
            {
                path: '/listenList',
                component: listenList
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
        path: '/listenMusic',
        component: listenMusic
    },
    
]