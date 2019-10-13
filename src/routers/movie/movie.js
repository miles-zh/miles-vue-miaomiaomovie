export default {
    path: '/movie',
    component: () => import('@/views/Movie/movie.vue'),
    children:[
        {
            path:'city',
            component: ()=>import('@/components/City/city.vue') 
        },
        {
            path: 'nowplaying',
            component: () => import('@/components/NowPlaying/nowplaying.vue')
        },
        {
            path: 'search',
            component: () => import('@/components/Search/search.vue')
        },
        {
            path: 'comingsoon',
            component: () => import('@/components/ComingSoon/comingsoon.vue')
        },
        {
            path:'detail/1/:movieId',    // 配置电影详情页的的
            components:{
                // default: () => import('@/components/NowPlaying/nowplaying.vue'),   // 解决点击电影调转到详情时页面出现空白的问题
                detail:()=>import('@/views/Movie/detail.vue')
            },
            props:{
                detail:true
            }
        },
        {
            path: 'detail/2/:movieId', // 配置电影详情页的的
            components: {
                // default: () => import('@/components/NowPlaying/nowplaying.vue'), // 解决点击电影调转到详情时页面出现空白的问题
                detail: () => import('@/views/Movie/detail.vue')
            },
            props: {
                detail: true
            }
        },
        {
            path: '/movie',
            redirect:'/movie/nowplaying'
        },
    ],
    
}

