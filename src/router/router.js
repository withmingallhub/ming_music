/* eslint-disable */
import SignUp from '@/views/SignUp/SignUp'
import Layout from '@/views/Layout'

export default[
    {
        path: '/',
        name: 'Layout',
        component: Layout,
    },
    {
        path: '/SignUp',
        component: SignUp,
    }
    
]