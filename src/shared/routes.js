import News from './components/News'
import User from './components/User'

const routes = [
  {
    path: '/',
    component: User,
    exact: true
  },
  {
    path: '/news',
    component: News
  }
]

export default routes