/* eslint-disable */
import SignUp from '@/views/SignUp/SignUp'
import Layout from '@/views/Layout'

export default[
    {
        path: '/',
        name: 'Layout',
        component: Layout,
        children: [
            {
                path: '/SignUp',
                component: SignUp
            }
        ]
    },
    
]