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
/***********************************运营管理******************************/
const base_cooperation = r => require.ensure([], () => r(require('../components/page/operation/base_cooperation.vue')), 'base_cooperation');
const partnerDetail = r => require.ensure([], () => r(require('../components/page/operation/base_cooperation_detail.vue')), 'base_cooperation_detail');
const base_fee = r => require.ensure([], () => r(require('../components/page/operation/base_fee.vue')), 'base_fee');
const base_rule = r => require.ensure([], () => r(require('../components/page/operation/base_rule.vue')), 'base_rule');
const base_user = r => require.ensure([], () => r(require('../components/page/operation/base_user.vue')), 'base_user');
const base_chargeOrder = r => require.ensure([], () => r(require('../components/page/operation/base_chargeOrder.vue')), 'base_chargeOrder');
const base_rechargeMoney = r => require.ensure([], () => r(require('../components/page/operation/base_rechargeMoney.vue')), 'base_rechargeMoney');
const base_coupon = r => require.ensure([], () => r(require('../components/page/operation/base_coupon.vue')), 'base_coupon');
const base_message = r => require.ensure([], () => r(require('../components/page/operation/base_message.vue')), 'base_message');
const base_refund = r => require.ensure([], () => r(require('../components/page/operation/base_refund.vue')), 'base_refund');
/***********************************运营管理END******************************/
/***********************************售前管理*********************************/
const presale_contract = r => require.ensure([], () => r(require('../components/page/presale/presale_contract.vue')), 'presale_contract');
const presale_send = r => require.ensure([], () => r(require('../components/page/presale/presale_send.vue')), 'presale_send');
const presale_online = r => require.ensure([], () => r(require('../components/page/presale/presale_online.vue')), 'presale_online');
const presale_siteSurvey = r => require.ensure([], () => r(require('../components/page/presale/presale_siteSurvey.vue')), 'presale_siteSurvey');
const presale_electrician = r => require.ensure([], () => r(require('../components/page/presale/presale_electrician.vue')), 'presale_electrician');
const presale_order = r => require.ensure([], () => r(require('../components/page/presale/presale_order.vue')), 'presale_order');
const presale_reject = r => require.ensure([], () => r(require('../components/page/presale/presale_reject.vue')), 'presale_reject');
const presale_transfer = r => require.ensure([], () => r(require('../components/page/presale/presale_transfer.vue')), 'presale_transfer');
/***********************************售前管理END******************************/
/***********************************站点管理*********************************/
const site_station = r => require.ensure([], () => r(require('../components/page/site/site_station.vue')), 'site_station');
const site_device = r => require.ensure([], () => r(require('../components/page/site/site_device.vue')), 'site_device');
const site_module = r => require.ensure([], () => r(require('../components/page/site/site_module.vue')), 'site_module');
const site_meshModule = r => require.ensure([], () => r(require('../components/page/site/site_meshModule.vue')), 'site_meshModule');
const site_simManage = r => require.ensure([], () => r(require('../components/page/site/site_simManage.vue')), 'site_simManage');
/***********************************站点管理END******************************/
/***********************************维护管理*********************************/
const defend_warning = r => require.ensure([], () => r(require('../components/page/defend/defend_warning.vue')), 'defend_warning');
const defend_orderAnalys = r => require.ensure([], () => r(require('../components/page/defend/defend_orderAnalys.vue')), 'defend_orderAnalys');
const defend_hitchAnalys = r => require.ensure([], () => r(require('../components/page/defend/defend_hitchAnalys.vue')), 'defend_hitchAnalys');
const defend_upgrade = r => require.ensure([], () => r(require('../components/page/defend/defend_upgrade.vue')), 'defend_upgrade');
const defend_hardDevice = r => require.ensure([], () => r(require('../components/page/defend/defend_hardDevice.vue')), 'defend_hardDevice');
const defend_maintance = r => require.ensure([], () => r(require('../components/page/defend/defend_maintance.vue')), 'defend_maintance');
const defend_maintanceAnalys = r => require.ensure([], () => r(require('../components/page/defend/defend_maintanceAnalys.vue')), 'defend_maintanceAnalys');
const defend_map = r => require.ensure([], () => r(require('../components/page/defend/defend_map.vue')), 'defend_map');
const defend_message = r => require.ensure([], () => r(require('../components/page/defend/defend_message.vue')), 'defend_message');
const defend_testOrder = r => require.ensure([], () => r(require('../components/page/defend/defend_testOrder.vue')), 'defend_testOrder');
/***********************************维护管理END******************************/
/***********************************财务管理*********************************/
const finance_carBill = r => require.ensure([], () => r(require('../components/page/finance/finance_carBill.vue')), 'finance_carBill');
const finance_installer = r => require.ensure([], () => r(require('../components/page/finance/finance_installer.vue')), 'finance_installer');
const finance_4SBill = r => require.ensure([], () => r(require('../components/page/finance/finance_4SBill.vue')), 'finance_4SBill');
const finance_stationBill = r => require.ensure([], () => r(require('../components/page/finance/finance_stationBill.vue')), 'finance_stationBill');
const finance_propertyBill = r => require.ensure([], () => r(require('../components/page/finance/finance_propertyBill.vue')), 'finance_propertyBill');
const finance_reward = r => require.ensure([], () => r(require('../components/page/finance/finance_reward.vue')), 'finance_reward');
const finance_applyCash = r => require.ensure([], () => r(require('../components/page/finance/finance_applyCash.vue')), 'finance_applyCash');
const finance_liquidation_old = r => require.ensure([], () => r(require('../components/page/finance/finance_liquidation_old.vue')), 'finance_liquidation_old');
const finance_liquidation = r => require.ensure([], () => r(require('../components/page/finance/finance_liquidation.vue')), 'finance_liquidation');
const finance_commercial = r => require.ensure([], () => r(require('../components/page/finance/finance_commercial.vue')), 'finance_commercial');
const finance_ammeter = r => require.ensure([], () => r(require('../components/page/finance/finance_ammeter.vue')), 'finance_ammeter');
/***********************************财务管理END******************************/
/***********************************报表管理*********************************/
const charts_bikeAnalys = r => require.ensure([], () => r(require('../components/page/charts/charts_bikeAnalys.vue')), 'charts_bikeAnalys');
const charts_operationAnalys = r => require.ensure([], () => r(require('../components/page/charts/charts_operationAnalys.vue')), 'charts_operationAnalys');
const charts_carAnalys = r => require.ensure([], () => r(require('../components/page/charts/charts_carAnalys.vue')), 'charts_carAnalys');
const charts_managerAnalys = r => require.ensure([], () => r(require('../components/page/charts/charts_managerAnalys.vue')), 'charts_managerAnalys');
const charts_mainAnalys = r => require.ensure([], () => r(require('../components/page/charts/charts_mainAnalys.vue')), 'charts_mainAnalys');
/***********************************报表管理END******************************/
/***********************************绩效管理*********************************/
const performance_analys = r => require.ensure([], () => r(require('../components/page/performance/performance_analys.vue')), 'performance_analys');
/***********************************绩效管理END******************************/
/***********************************系统管理*********************************/
const system_user = r => require.ensure([], () => r(require('../components/page/system/system_user.vue')), 'system_user');
const system_form = r => require.ensure([], () => r(require('../components/page/system/system_form.vue')), 'system_form');
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
            path: '/base_cooperation',
            component: base_cooperation,
            meta: { 
                title: '合作伙伴' 
            }
        }, {
            path: '/base_cooperation_detail',
            component: partnerDetail,
            meta: {
                title: '合作伙伴详情'
            }
        }, {
            path: '/base_fee',
            component: base_fee,
            meta: {
                title: '资费定义'
            }
        }, {
            path: '/base_rule',
            component: base_rule,
            meta: { 
                title: '结算规则' 
            }
        }, {
            path: '/base_user',
            component: base_user,
            meta: {
                title: '用户管理'
            }
        }, {
            path: '/base_chargeOrder',
            component: base_chargeOrder,
            meta: {
                title: '充电订单'
            }
        }, {
            path: '/base_rechargeMoney',
            component: base_rechargeMoney,
            meta: {
                title: '营收管理'
            }
        }, {
            path: '/base_coupon',
            component: base_coupon,
            meta: {
                title: '月卡管理'
            }
        }, {
            path: '/base_message',
            component: base_message,
            meta: {
                title: '用户反馈'
            }
        }, {
            path: '/presale_contract',
            component: presale_contract,
            meta: {
                title: '合同管理'
            }
        }, {
            path: '/presale_send',
            component: presale_send,
            meta: {
                title: '发货申请'
            }
        }, {
            path: '/presale_online',
            component: presale_online,
            meta: {
                title: '上线申请'
            }
        }, {
            path: '/presale_siteSurvey',
            component: presale_siteSurvey,
            meta: {
                title: '站点勘察'
            }
        }, {
            path: '/presale_electrician',
            component: presale_electrician,
            meta: {
                title: '电工管理'
            }
        }, {
            path: '/presale_order',
            component: presale_order,
            meta: {
                title: '订货管理'
            }
        }, {
            path: '/presale_reject',
            component: presale_reject,
            meta: {
                title: '退货管理'
            }
        }, {
            path: '/presale_transfer',
            component: presale_transfer,
            meta: {
                title: '迁移管理'
            }
        }, {
            path: '/site_station',
            component: site_station,
            meta: {
                title: '自行车充电站'
            }
        }, {
            path: '/site_device',
            component: site_device,
            meta: {
                title: '设备管理'
            }
        }, {
            path: '/site_module',
            component: site_module,
            meta: {
                title: '充电口'
            }
        }, {
            path: '/site_meshModule',
            component: site_meshModule,
            meta: {
                title: '无线中继'
            }
        }, {
            path: '/site_simManage',
            component: site_simManage,
            meta: {
                title: 'sim卡管理'
            }
        }, {
            path: '/defend_warning',
            component: defend_warning,
            meta: {
                title: '告警管理'
            }
        }, {
            path: '/defend_orderAnalys',
            component: defend_orderAnalys,
            meta: {
                title: '异常订单分析'
            }
        }, {
            path: '/defend_hitchAnalys',
            component: defend_hitchAnalys,
            meta: {
                title: '故障分析'
            }
        }, {
            path: '/defend_upgrade',
            component: defend_upgrade,
            meta: {
                title: '升级任务'
            }
        }, {
            path: '/defend_hardDevice',
            component: defend_hardDevice,
            meta: {
                title: '硬件管理'
            }
        }, {
            path: '/defend_maintance',
            component: defend_maintance,
            meta: {
                title: '维修单'
            }
        }, {
            path: '/defend_maintanceAnalys',
            component: defend_maintanceAnalys,
            meta: {
                title: '维修单分析'
            }
        }, {
            path: '/defend_map',
            component: defend_map,
            meta: {
                title: '上报地图'
            }
        }, {
            path: '/defend_message',
            component: defend_message,
            meta: {
                title: '消息记录'
            }
        }, {
            path: '/defend_testOrder',
            component: defend_testOrder,
            meta: {
                title: '测试站订单'
            }
        }, {
            path: '/finance_carBill',
            component: finance_carBill,
            meta: {
                title: '工单开票回款'
            }
        }, {
            path: '/finance_installer',
            component: finance_installer,
            meta: {
                title: '安装商账单'
            }
        }, {
            path: '/finance_4SBill',
            component: finance_4SBill,
            meta: {
                title: '4S店账单'
            }
        }, {
            path: '/finance_stationBill',
            component: finance_stationBill,
            meta: {
                title: '站点账单'
            }
        }, {
            path: '/finance_propertyBill',
            component: finance_propertyBill,
            meta: {
                title: '物业账单'
            }
        }, {
            path: '/finance_reward',
            component: finance_reward,
            meta: {
                title: '安装补贴'
            }
        }, {
            path: '/finance_applyCash',
            component: finance_applyCash,
            meta: {
                title: '提现申请'
            }
        }, {
            path: '/finance_liquidation_old',
            component: finance_liquidation_old,
            meta: {
                title: '财务清算表(旧)'
            }
        }, {
            path: '/finance_liquidation',
            component: finance_liquidation,
            meta: {
                title: '财务清算表'
            }
        }, {
            path: '/finance_commercial',
            component: finance_commercial,
            meta: {
                title: '资产报表'
            }
        }, {
            path: '/finance_ammeter',
            component: finance_ammeter,
            meta: {
                title: '抄表'
            }
        }, {
            path: '/charts_bikeAnalys',
            component: charts_bikeAnalys,
            meta: {
                title: '自行车分析'
            }
        }, {
            path: '/charts_operationAnalys',
            component: charts_operationAnalys,
            meta: {
                title: '运营数据'
            }
        }, {
            path: '/charts_carAnalys',
            component: charts_carAnalys,
            meta: {
                title: '工单分析'
            }
        }, {
            path: '/charts_managerAnalys',
            component: charts_managerAnalys,
            meta: {
                title: '业务员分析'
            }
        }, {
            path: '/charts_mainAnalys',
            component: charts_mainAnalys,
            meta: {
                title: '公司业务分析'
            }
        }, {
            path: '/performance_analys',
            component: performance_analys,
            meta: {
                title: '绩效分析'
            }
        }, {
            path: '/system_user',
            component: system_user,
            meta: {
                title: '用户管理'
            }
        }, {
            path: '/system_form',
            component: system_form,
            meta: {
                title: '组织管理'
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
