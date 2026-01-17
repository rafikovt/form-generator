import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';
import ContactForm from '@/views/ContactForm.vue';
import RegistrationForm from '@/views/RegistrationForm.vue';
import SurveyForm from '@/views/SurveyForm.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactForm
  },
  {
    path: '/registration',
    name: 'Registration',
    component: RegistrationForm
  },
  {
    path: '/survey',
    name: 'Survey',
    component: SurveyForm
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;

