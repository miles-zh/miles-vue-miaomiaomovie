export default {
    path: '/admin',
    component: () => import('@/views/Admin/admin.vue'),
    children:[
    	{path:'usermanagement',component:()=>import('@/views/Admin/usersmanagement.vue')},
    	{path:'moviemanagement',component:()=>import('@/views/Admin/moviemanagement.vue')},
    	{path:'cinemamanagement',component:()=>import('@/views/Admin/cinemamanagement.vue')},
    	{path:'/admin',redirect:'usermanagement'}
    ]

}
