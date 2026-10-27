import { createRouter, createWebHistory } from '@ionic/vue-router'
import TabsPage from '../views/TabsPage.vue'
import AddUserPage from '../views/AddUserPage.vue'
import UsersPage from '../views/UsersPage.vue'
import UpdateUserPage from '../views/UpdateUserPage.vue'
import DeleteUserPage from '../views/DeleteUserPage.vue'

const routes = [
  { path: '/', redirect: '/tabs/create' },
  {
    path: '/tabs/', component: TabsPage,
    children: [
      { path: '', redirect: '/tabs/create' },
      { path: 'create', component: AddUserPage },
      { path: 'read', component: UsersPage },
      { path: 'update', component: UpdateUserPage },
      { path: 'delete', component: DeleteUserPage }
    ]
  }
]

export default createRouter({ history: createWebHistory(import.meta.env.BASE_URL), routes })
