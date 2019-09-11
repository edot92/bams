
const routes = [
  {
    path: '/',
    meta: {kunci: true},
    component: () => import('layouts/Default.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue'), name: 'stream' },
      { path: 'tentang', component: () => import('pages/Tentang.vue'), name: 'tentang' },
      { path: 'data', component: () => import('pages/Data.vue'), name: 'data' },
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
