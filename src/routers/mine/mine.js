export default{
    path:'/mine',
    component: ()=>import ('@/views/Mine/mine.vue'),
    children:[
        {path:'center',component:()=>import('@/views/Mine/center.vue')},
        { path: 'login', component: () => import('@/components/Login/login.vue') },
        { path: 'register', component: () => import('@/components/Register/register.vue') },
        { path: 'findpassword', component: () => import('@/components/FindPassword/findpassword.vue') },
        {path:'/mine',redirect:'center'}
    ]
}