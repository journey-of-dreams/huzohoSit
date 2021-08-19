import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

const Home = () => import('@/views/Home')
const Soft = () => import('@/views/Soft')
const Equipment = () => import('@/views/Equipment')
const Power = () => import('@/views/Power')
const TestDraw = () => import('@/views/TestDraw')
const Download = () => import('@/views/Download.vue')
const About = () => import('@/views/About.vue')
const Contact = () => import('@/views/Contact.vue')
const ProductList = () => import('@/views/ProductList.vue')
const ServiceList = () => import('@/views/ServiceList.vue')
const Product = () => import('@/views/Product.vue')


Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/soft',
    name: 'Soft',
    component: Soft
  },
  {
    path: '/equipment',
    name: 'Equipment',
    component: Equipment
  },
  {
    path: '/power',
    name: 'Power',
    component: Power
  },
  {
    path: '/testDraw',
    name: 'TestDraw',
    component: TestDraw
  },
  {
    path: '/download',
    name: 'Download',
    component: Download
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/productList',
    name: 'ProductList',
    component: ProductList
  },
  {
    path: '/serviceList',
    name: 'ServiceList',
    component: ServiceList
  },
  {
    path: '/product',
    name: 'Product',
    component: Product
  },
]

const router = new VueRouter({
  routes,
  // mode: 'history',
})
console.log(router);
// router.beforeEach((to, from, next) => {
//   // if ((to.path=='/serviceList' && from.path=='/')||(to.path=='/productList' && from.path=='/')) {
//   //   window.location.reload()
//   // }
//   console.log(to.path, from.path);
//   next()
// })

export default router;