import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/pages/LoginPage.vue';
import DashboardPage from '@/pages/DashboardPage.vue';
import LeaderBoard from '@/pages/LeaderBoard.vue';
import AssessmentsPage from '@/pages/AssessmentsPage.vue';
import ResponderData from '@/pages/ResponderData.vue';
import IncidentInfo from '@/pages/IncidentInfo.vue';
import UploadCourses from '@/pages/UploadCourses.vue';
import MetricsPage from '@/pages/MetricsPage.vue';
import GenerateAccessCodes from '@/pages/GenerateAccessCodes.vue';

const routes = [
    {
        path: '/login',
        name: 'LoginPage',
        component: LoginPage,
        meta: { showTitle: true, showProfileIcon: false, showSidebar: false },
      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardPage,
        meta: { showTitle: true, showProfileIcon: true, showSidebar: true },
      },
  {
    path: '/',
    redirect: '/login', // Redirect the root URL to the login page
  },

  { path: '/leaderboard', name: 'leaderboard', component: LeaderBoard ,meta: { showTitle: true, showProfileIcon: true, showSidebar: true },},
  { path: '/assessments', name: 'assessments', component: AssessmentsPage },
  { path: '/responder-data', name: 'responder-data', component: ResponderData },
  { path: '/incident-info', name: 'incident-info', component: IncidentInfo },
  {
    path: '/upload-courses',
    name: 'UploadCourses',
    component: UploadCourses,
  },
  {
    path: '/metrics',
    name: 'MetricsPage',
    component: MetricsPage,
  },
  {
    path: '/generate-access-codes',
    name: 'GenerateAccessCodes',
    component: GenerateAccessCodes,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//     const isAuthenticated = !!localStorage.getItem('token'); // authentication check
//     if (to.name !== 'LoginPage' && !isAuthenticated) next({ name: 'LoginPage' });
//     else next();
//   });

export default router;
