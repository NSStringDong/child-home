import Vue from 'vue';
import Router from 'vue-router/dist/vue-router.min.js';

Vue.use(Router);

// 此处代码是为了解决单个关闭Tags时，当关闭最后一个tag时报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const tabs = r => require.ensure([], () => r(require('../components/page/Tabs.vue')), 'tabs');
const login = r => require.ensure([], () => r(require('../components/page/Login.vue')), 'login');
/***********************************幼儿园管理******************************/
const school_schoolList = r => require.ensure([], () => r(require('../components/page/school/school_schoolList.vue')), 'school_schoolList');
/***********************************幼儿园管理END******************************/
/***********************************学生管理*********************************/
const student_studentList = r => require.ensure([], () => r(require('../components/page/student/student_studentList.vue')), 'student_studentList');
/***********************************学生管理END******************************/
/***********************************家长管理*********************************/
const parent_parentList = r => require.ensure([], () => r(require('../components/page/parent/parent_parentList.vue')), 'parent_parentList');
/***********************************家长管理END******************************/
/***********************************数据管理*********************************/
const data_dataList = r => require.ensure([], () => r(require('../components/page/data/data_dataList.vue')), 'data_dataList');
/***********************************数据管理END******************************/
/***********************************系统管理*********************************/
const system_user = r => require.ensure([], () => r(require('../components/page/system/system_user.vue')), 'system_user');
const system_player = r => require.ensure([], () => r(require('../components/page/system/system_player.vue')), 'system_player');
const system_right = r => require.ensure([], () => r(require('../components/page/system/system_right.vue')), 'system_right');
/***********************************系统管理END******************************/

export default new Router({
    routes: [{
        path: '/',
        redirect: '/dashboard'
    }, {
        path: '/',
        component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
        meta: { 
            title: '自述文件' 
        },
        children: [{
            path: '/dashboard',
            component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
            meta: { 
                title: '系统首页' 
            }
        }, {
            path: '/school_schoolList',
            component: school_schoolList,
            meta: { 
                title: '幼儿园管理' 
            }
        }, {
            path: '/student_studentList',
            component: student_studentList,
            meta: { 
                title: '学生管理' 
            }
        }, {
            path: '/parent_parentList',
            component: parent_parentList,
            meta: { 
                title: '家长管理' 
            }
        }, {
            path: '/data_dataList',
            component: data_dataList,
            meta: { 
                title: '数据管理' 
            }
        }, {
            path: '/system_user',
            component: system_user,
            meta: {
                title: '用户管理'
            }
        }, {
            path: '/system_player',
            component: system_player,
            meta: {
                title: '角色管理'
            }
        }, {
            path: '/system_right',
            component: system_right,
            meta: {
                title: '权限管理'
            }
        }, {
            path: '/tabs',
            component: tabs,
            meta: { 
                title: 'tab选项卡' 
            }
        }, {
            // vue-schart组件
            path: '/charts',
            component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
            meta: { 
                title: 'schart图表' 
            }
        }, {
            // 权限页面
            path: '/permission',
            component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
            meta: { 
                title: '权限测试', 
                permission: true 
            }
        }, {
            path: '/404',
            component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
            meta: { 
                title: '404' 
            }
        }, {
            path: '/403',
            component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
            meta: { 
                title: '403' 
            }
        }]
    }, {
        path: '/login',
        component: login,
        meta: { 
            title: '用户登录' 
        }
    }, {
        path: '*',
        redirect: '/404'
    }]
});
