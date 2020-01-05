<template>
	<div class="sidebar">
		<el-menu class="sidebar-el-menu" id="lastclass" :default-active="onRoutes" :collapse="collapse" background-color="#324157" text-color="#bfcbd9" active-text-color="#32B16C" unique-opened router>
		<!-- <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#3f3f3f" text-color="#ffffff" active-text-color="#79bd3b" unique-opened router> -->
			<template v-for="item in items">
				<template v-if="item.subs">
					<el-submenu :index="item.index" :key="item.index">
						<template slot="title">
							<i :class="item.icon"></i>
							<span slot="title">{{ item.title }}</span>
						</template>
						<template v-for="subItem in item.subs">
							<el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
								<template slot="title">{{ subItem.title }}</template>
								<el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">{{ threeItem.title }}</el-menu-item>
							</el-submenu>
							<el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
						</template>
					</el-submenu>
				</template>
				<template v-else>
					<el-menu-item :index="item.index" :key="item.index">
						<i :class="item.icon"></i>
						<span slot="title">{{ item.title }}</span>
					</el-menu-item>
				</template>
			</template>
		</el-menu>
	</div>
</template>

<script>
import bus from '../common/bus';
export default {
	data() {
		return {
			collapse: false,
			items: [{
				icon: 'el-icon-s-home',
				index: 'dashboard',
				title: '系统首页'
			}, {
				icon: 'el-icon-menu',
				index: 'school',
				title: '幼儿园管理',
				subs: [{
					index: 'school_schoolList',
					title: '幼儿园管理'
				}]
			}, {
				icon: 'el-icon-user-solid',
				index: 'student',
				title: '学生管理',
				subs: [{
					index: 'student_studentList',
					title: '学生管理'
				}]
			}, {
				icon: 'el-icon-s-custom',
				index: 'parent',
				title: '家长管理',
				subs: [{
					index: 'parent_parentList',
					title: '家长管理'
				}]
			}, {
				icon: 'el-icon-s-cooperation',
				index: 'data',
				title: '数据管理',
				subs: [{
					index: 'defend_warning',
					title: '数据管理'
				}]
			}, {
				icon: 'el-icon-s-tools',
				index: 'system',
				title: '系统管理',
				subs: [{
					index: 'system_user',
					title: '用户管理'
				}, {
					index: 'system_player',
					title: '角色管理'
				}, {
					index: 'system_right',
					title: '权限管理'
				}]
			}/*, {
				icon: 'el-icon-lx-warn',
				index: '7',
				title: '错误处理',
				subs: [{
					index: 'permission',
					title: '权限测试'
				}, {
					index: '404',
					title: '404页面'
				}]
			}*/]
		};
	},
	computed: {
		onRoutes() {
			console.log(`侧边路由:${this.$route.path.replace('/', '')}`);
			return this.$route.path.replace('/', '');
		}
	},
	watch: {
		// collapse:function(){
  //           this.collapse=!this.collapse;
  //           var uiwidth = document.getElementById('lastclass');
  //           if(uiwidth.offsetHeight===0){
  //               uiwidth.style.height = "100%"
  //           }
  //       }
	},
	created() {
		// 通过 Event Bus 进行组件间通信，来折叠侧边栏
		bus.$on('collapse', msg => {
			this.collapse = msg;
			bus.$emit('collapse-content', msg);
		});
	}
};
</script>
<style scoped>
	.sidebar {
		display: block;
		position: absolute;
		left: 0;
		top: 70px;
		bottom: 0;
		overflow-y: scroll;
	}
	.sidebar::-webkit-scrollbar {
		width: 0;
	}
	.sidebar-el-menu:not(.el-menu--collapse) {
		width: 170px;
		height: 100%;
	}
	.sidebar > ul {
		height: 100%;
	}
	.el-submenu .el-menu-item {
	    height: 50px;
	    line-height: 50px;
	    padding: 0 20px 0 50px !important;
	    /*text-align: center;*/
	    min-width: 170px; 
	}
</style>
