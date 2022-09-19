import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../firebase/config'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'
import CreatePlaylist from '../views/playlists/CreatePlaylist.vue'
import PlaylistDetails from '../views/playlists/PlaylistDetails.vue'
import UserPlaylists from '../views/playlists/UserPlaylists.vue'

const requireAuth = (to: any, from: any, next: (arg0?: { name: string } | undefined) => void) => {
  let user = auth.currentUser
  if (!user) {
    next({name: 'login'})
  } else {
    next()
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: requireAuth
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/playlists/create',
      name: 'createPlaylist',
      component: CreatePlaylist,
      beforeEnter: requireAuth
    },
    {
      path: '/playlists/:id',
      name: 'playlistDetails',
      component: PlaylistDetails,
      beforeEnter: requireAuth,
      props: true
    },
    {
      path: '/playlists/user',
      name: 'userPlaylists',
      component: UserPlaylists,
      beforeEnter: requireAuth
    }
  ]
})

export default router
