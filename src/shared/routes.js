import React from 'react'
import loadable from '@loadable/component'

import Loader from './components/Loader/Loader'

const News = loadable(()=>import('./components/News'),{fallback: <Loader/>})
const User = loadable(()=>import('./components/User'),{fallback: <Loader/>})
const HomePage = loadable(()=>import('./pages/HomePage'),{fallback: <Loader/>})
const UserPage = loadable(()=>import('./pages/UserPage'),{fallback: <Loader/>})
const AboutPage = loadable(()=>import('./pages/AboutPage'),{fallback: <Loader/>})


const routes = [
  {
    path: '/',
    component: HomePage,
    exact: true
  },
  {
    path: '/news',
    component: News
  },
  {
    path: '/user',
    component: User
  },
  {
    path: '/about-page',
    component: AboutPage
  },
  {
    path: '/user-page',
    component: UserPage
  },
]

export default routes