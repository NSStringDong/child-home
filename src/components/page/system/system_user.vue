<style scoped>
	.el-input,.el-select {
	    width: 320px; 
	}
</style>
<template>
	<div class="list-content">
		<div class="search-content">
			<div class="search-input">
				<el-input placeholder='请输入员工姓名查询' v-model="key" @keyup.enter.native="getUserList(1)" clearable>
					<el-button slot="append" icon="el-icon-search" @click="getUserList(1)"></el-button>
				</el-input>
			</div>
			<div class="search-btn">
				<el-button class="new-btn" type="primary" @click="showCreate">新增用户</el-button>
			</div>
		</div>
		<div class="table-content">
			<!-- @filter-change="filterHandler" -->
			<el-table :data="tableData" border stripe @cell-dblclick="goToDetail">
				<el-table-column align="center" prop="id" label="ID" width="120px"></el-table-column>
				<el-table-column align="center" prop="realName" label="姓名" width="120px"></el-table-column>
				<el-table-column align="center" prop="name" label="用户名"></el-table-column>
				<el-table-column align="center" prop="phone" label="手机号"></el-table-column>
				<el-table-column align="center" prop="email" label="邮箱"></el-table-column>
				<el-table-column align="center" prop="status" label="用户状态" width="120px"></el-table-column>
				<el-table-column align="center" prop="organizationName" label="归属组织"></el-table-column>
				<el-table-column align="center" prop="registTime" label="添加时间"></el-table-column>
				<el-table-column align="center" label="操作" width="400px">
					<template slot-scope="scope">
						<el-button type="info" samll @click="goToDetail(scope.row)">分配组织</el-button>
						<el-button type="warning" samll @click="goToDetail(scope.row)">分配角色</el-button>
						<el-button type="primary" samll @click="showUpdate(scope.row)">编辑</el-button>
						<el-button type="danger" samll @click="showDeleteUser(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="block">
                <el-pagination background @current-change="handleCurrentChange" :current-page.sync="nowPage" :page-size="20" layout="prev, pager, next, jumper" :page-count="totalPage"></el-pagination>
            </div>
			<el-dialog :title="changeText" :visible.sync="isNew" center width="35%">
				<el-form >
					<el-form-item label="姓名" :label-width="formLabelWidth">
						<el-input autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="用户名" :label-width="formLabelWidth">
						<el-input autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="手机号" :label-width="formLabelWidth">
						<el-input autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="密码" :label-width="formLabelWidth">
						<el-input autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="邮箱" :label-width="formLabelWidth">
						<el-input autocomplete="off"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="isNew=false">取 消</el-button>
					<el-button type="primary" :loading="isLoading" @click="createNewUser">确 定</el-button>
				</div>
			</el-dialog>
		</div>
	</div>
</template>
<script type="text/javascript">
	import {userData} from '../../../utils/data.js';
	export default {
		name: 'system_user',
		data() {
			return {
				key: '',
				tableData: [],
				nowPage: null,
				totalPage: null,
				searchDate: '',
				formLabelWidth: '80px',
				isNew: false,
				changeText: '',
				isUpdate: false,
				isLoading: false
			}
		},
		created() {
			this.getUserList(1);
		},
		mounted() {

		},
		watch: {
			'isNew': function(val) {
				if (val == false) {
					// this.ruleForm.partnerType = '';
					// this.ruleForm.organizName = '';
					// this.isLock = true;
					this.changeText = '';
					this.isUpdate = false;
				}
			}
		},
		methods: {
			/**
			 * 获取用户列表
			 * @param  {Number} currentPage 当前页数
			 * @return {Array}             列表数组
			 */
			getUserList(currentPage) {
				let self = this;
				self.nowPage = currentPage;
				self.tableData = [];
				let postData = {
					rows: 20,
					page: currentPage
				};
				this.$http({
					url: 'system/list',
					method: 'POST',
					data: postData
				}).then(res => {
					self.tableData = res.rows;
					self.totalPage = 20%res.total;
				})
				// self.tableData = userData.data;
			},
			goToDetail(item) {
				
			},
			/**
			 * 显示新建
			 * @return {Null} 
			 */
			showCreate() {
				this.isNew = true;
				this.changeText = '新增用户'; 
			},
			/**
			 * 显示更新
			 * @param  {Object} item 当前选中的用户信息
			 * @return {Object}      返回信息
			 */
			showUpdate(item) {
				this.isNew = true;
				this.changeText = '更新用户信息';
				this.isUpdate = true;
				// this.ruleForm.partnerType = item.pid;
				// this.ruleForm.organizName = item.name;
			},
			createNewUser() {
				let self = this;
				let url = '',
					showStr = '';
				if (this.isUpdate == true) {
					url = `system/update`;
				} else {
					url = `system/add`;
				}
				self.isLoading = true;
				this.$http({
					url: url,
					method: 'POST',
					data: {
						// name: self.ruleForm.organizName,
						// pid: self.ruleForm.partnerType,
						status: 1
					}
				}).then((res) => {
					setTimeout(() => {
						if (res.code >= 0) {
							if (this.isUpdate == true) {
								showStr = `更新成功`;
							} else {
								showStr = `新增成功`;
							}
							this.isLoading = false;
							this.isNew = false;
							this.$message.success(showStr);
							this.getUserList(1);
						} else {
							self.$message({
								showClose: true,
								message: res.data.msg,
								type: 'error'
							});
						}
					}, 1500);
				})
			},
			showDeleteUser(item) {
				this.$confirm(`确认删除${item.realName}用户？`,`删除用户`, {
                    confirmButtonText: '是',
                    cancelButtonText: '否',
                    type: 'warning',
                    distinguishCancelAndClose: true,
                    // center: true,
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '执行中...';
                            setTimeout(() => {
                                done();
                                setTimeout(() => {
                                    this.deleteUser(item);
                                    instance.confirmButtonLoading = false;
                                }, 300);
                            }, 3000);
                        } else {
                            done();
                        }
                    }
                }).then(() => {
                    
                }).catch(action => {
                    if (action === 'close'||action === 'cancel') {
                        this.$message({
                            type: 'info',
                            message: `放弃操作`
                        });
                    }          
                });
			},
			/**
			 * 删除当前用户
			 * @param  {Object} item 当前用户
			 * @return {Null}      
			 */
			deleteUser(item) {
				let self = this;
				let postData = {
					id: item.id
				};
				this.$http({
					url: 'system/organization/delete',
					method: 'POST',
					data: postData
				}).then((res) => {
					if (res.code >= 0) {
						this.$message.success(`删除成功`);
						this.getUserList(1);
					} else {
						self.$message({
							showClose: true,
							message: res.data.msg,
							type: 'error'
						});
					}
				})
			},
			handleCurrentChange(val) {
				getUserList(val);
			}
		},
		filters: {

		}
	}
</script>