// src/router/index.js
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import HomePage from '../pages/Home.vue'
import AgentsPage from '../pages/Agents.vue'
import WeaponsPage from '../pages/Weapons.vue'
import WeaponDetail from '../pages/WeaponDetail.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage, meta: { title: 'Valorant - Home' } },
  { path: '/agents', name: 'agents', component: AgentsPage, meta: { title: 'Valorant - Agents' } },
  { path: '/weapons', name: 'weapons', component: WeaponsPage, meta: { title: 'Valorant - Weapons' } },
  { path: '/weapons/:id', name: 'weapon-detail', component: WeaponDetail , meta: { title: 'Valorant - Weapons' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
