import {createRouter, createWebHistory} from 'vue-router';
import LoginPage from '@/pages/LoginPage.vue';
// import DashboardPage from '@/pages/DashboardPage.vue';
import LeaderBoard from '@/pages/LeaderBoard.vue';
import AssessmentsPage from '@/pages/AssessmentsPage.vue';
import ResponderData from '@/pages/ResponderData.vue';
import IncidentInfo from '@/pages/IncidentInfo.vue';
import UploadCourses from '@/pages/UploadCourses.vue';
import MetricsPage from '@/pages/MetricsPage.vue';
import GenerateAccessCodes from '@/pages/GenerateAccessCodes.vue';
// import AuthLayout from '@/router/AuthRouter.vue';

const routes = [
    {
        path: '/',
        redirect: '/login', // Redirect the root URL to the login page
    },
    {
        path: '/login',
        name: 'LoginPage',
        component: LoginPage,
        meta: {
            showTitle: true,
            showProfileIcon: false,
            showSidebar: false,
            showFooter: false,
        },
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: LeaderBoard,
        meta: {
            showTitle: true,
            showProfileIcon: true,
            showSidebar: true,
            showFooter: true,
        },
    },
    {
        path: '/leaderboard',
        name: 'leaderboard',
        component: LeaderBoard,
        meta: {
            activeMenu: 'leaderboard',
            showTitle: true,
            showProfileIcon: true,
            showSidebar: true,
            showFooter: true,
        },
        children:[

        ]
    },
    {
        path: '/assessments',
        name: 'assessments',
        component: AssessmentsPage,
        meta: {
            activeMenu: 'assessments',
            showTitle: true,
            showProfileIcon: true,
            showSidebar: true,
            showFooter: true,
        },
    },
    {
        path: '/responder-data',
        name: 'responder-data',
        component: ResponderData,
        meta: {
            activeMenu: 'responder-data',
            showTitle: true,
            showProfileIcon: true,
            showSidebar: true,
            showFooter: true,
        },
    },
    {
        path: '/incident-info',
        name: 'incident-info',
        component: IncidentInfo,
        meta: {
            activeMenu: 'incident-info',
            showTitle: true,
            showProfileIcon: true,
            showSidebar: true,
            showFooter: true,
        },
    },
    {
        path: '/upload-courses',
        name: 'UploadCourses',
        component: UploadCourses,
        meta: {
            activeMenu: 'assessments',
            showTitle: true,
            showProfileIcon: true,
            showSidebar: true,
            showFooter: true,
        },
    },
    {
        path: '/metrics',
        name: 'MetricsPage',
        component: MetricsPage,
        meta: {
            activeMenu: 'assessments',
            showTitle: true,
            showProfileIcon: true,
            showSidebar: true,
            showFooter: true,
        },
    },
    {
        path: '/generate-access-codes',
        name: 'GenerateAccessCodes',
        component: GenerateAccessCodes,
        meta: {
            activeMenu: 'assessments',
            showTitle: true,
            showProfileIcon: true,
            showSidebar: true,
            showFooter: true,
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('token'); // authentication check
    if (to.name !== 'LoginPage' && !isAuthenticated) next({ name: 'LoginPage' });
    else next();
  });

export default router;
