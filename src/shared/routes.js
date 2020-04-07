
import News from './components/News'
import User from './components/User'
import HomePage from './pages/HomePage'
import UserPage from './pages/UserPage'
import AboutPage from './pages/AboutPage'


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