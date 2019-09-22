
const routes = [
  {
    path: '/',
    meta: {kunci: true},
    component: () => import('layouts/Default.vue'),
    children: [
      { path: '', component: () => import('pages/Dashboard.vue'), name: 'dashboard'},
    ]
  },
  {
    path: '/tentang',
    meta: {kunci: true},
    component: () => import('layouts/Default.vue'),
    children: [
      { path: '', component: () => import('pages/Tentang.vue'), name: 'tentang' },
    ]
  },
  {
    path: '/query',
    meta: {kunci: true},
    component: () => import('layouts/Default.vue'),
    children: [
      { path: '', component: () => import('pages/Query.vue'), name: 'query' },
    ]
  },
  {
    path: '/masuk',
    component: () => import('layouts/Auth.vue'),
    children: [
      { path: '', component: () => import('pages/Masuk.vue'), name: 'masuk' },
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
