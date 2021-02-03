import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _1e32cb6a = () => interopDefault(import('../node_modules/@nuxt/content-theme-docs/src/pages/releases.vue' /* webpackChunkName: "pages/releases" */))
const _c9aa2620 = () => interopDefault(import('../node_modules/@nuxt/content-theme-docs/src/pages/_.vue' /* webpackChunkName: "pages/_" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/releases",
    component: _1e32cb6a,
    name: "releases___en"
  }, {
    path: "/zh",
    component: _c9aa2620,
    name: "index___zh"
  }, {
    path: "/zh/releases",
    component: _1e32cb6a,
    name: "releases___zh"
  }, {
    path: "/zh/*",
    component: _c9aa2620,
    name: "all___zh"
  }, {
    path: "/",
    component: _c9aa2620,
    name: "index___en"
  }, {
    path: "/*",
    component: _c9aa2620,
    name: "all___en"
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
