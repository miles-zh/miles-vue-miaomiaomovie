import Vue from 'vue'
import Router from 'vue-router'
import mineRouter from './mine/mine.js'
import cinemaRouter from './cinema/cinema.js'
import movieRouter from './movie/movie.js'
import adminRouter from './admin/admin.js'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    mineRouter,
    movieRouter,
    cinemaRouter,
    adminRouter,
    {
      path: '/',
      redirect: './movie'
    }
  ]
})
