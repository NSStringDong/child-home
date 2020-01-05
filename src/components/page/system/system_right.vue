<style scoped>
	.el-input,.el-select {
	    width: 320px; 
	}
</style>
<template>
	<div class="list-content">
		<div class="search-content">
			<div class="search-input">
				<el-input placeholder='请输入员工姓名查询' v-model="key" @keyup.enter.native="getRightList(1)" clearable>
					<el-button slot="append" icon="el-icon-search"></el-button>
				</el-input>
			</div>
			<div class="search-btn">
				<el-button class="new-btn" type="primary" @click="showCreate">新增权限</el-button>
			</div>
		</div>
		<div class="table-content">
			<!-- @filter-change="filterHandler" -->
			<el-table :data="tableData" border stripe @cell-dblclick="goToDetail">
				<el-table-column align="center" prop="userId" label="ID" width="120px"></el-table-column>
				<el-table-column align="center" prop="realName" label="姓名" width="120px"></el-table-column>
				<el-table-column align="center" prop="mobile" label="手机号"></el-table-column>
				<el-table-column align="center" prop="userType" label="用户类型" width="120px"></el-table-column>
				<el-table-column align="center" prop="companyName" label="归属公司"></el-table-column>
				<el-table-column align="center" prop="registTime" label="添加时间"></el-table-column>
				<el-table-column align="center" label="操作" width="280px">
					<template slot-scope="scope">
						<!-- <el-button type="warning" samll @click="goToDetail(scope.row)">分配菜单</el-button> -->
						<el-button type="primary" samll @click="showUpdate(scope.row)">编辑</el-button>
						<el-button type="danger" samll @click="showDeleteRight(scope.row)">删除</el-button>
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
					<el-form-item label="手机号" :label-width="formLabelWidth">
						<el-input autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="密码" :label-width="formLabelWidth">
						<el-input autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="用户类型" :label-width="formLabelWidth">
						<el-select v-model="partnerType" placeholder="请选择">
							<el-option v-for="item in partnerTypeDic" :key="item.value" :label="item.text" :value="item.value"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="归属" :label-width="formLabelWidth">
						<el-input autocomplete="off"></el-input>
					</el-form-item>
					
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="isNew=false">取 消</el-button>
					<el-button type="primary" :loading="isLoading" @click="createNewRight">确 定</el-button>
				</div>
			</el-dialog>
		</div>
	</div>
</template>
<script type="text/javascript">
	import {userData} from '../../../utils/data.js';
	export default {
		name: 'system_right',
		data() {
			return {
				key: '',
				tableData: [],
				nowPage: null,
				totalPage: null,
				searchDate: '',
				formLabelWidth: '80px',
				partnerTypeDic: Object.freeze([{
					text: '小绿人',
					value: '0'
				}, {
					text: '电动汽车物业',
					value: '1'
				}, {
					text: '安装商',
					value: '2'
				}, {
					text: '4S店',
					value: '3'
				}, {
					text: '车企',
					value: '4'
				}, {
					text: '自行车物业',
					value: '5'
				}, {
					text: '自行车站主',
					value: '6'
				}, {
					text: '代理商',
					value: '7'
				}]),
				partnerType: '',
				isNew: false,
				changeText: '',
				isUpdate: false,
				isLoading: false
			}
		},
		created() {
			this.getRightList(1);
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
			 * 获取合作伙伴列表
			 * @param  {Number} currentPage 当前页数
			 * @return {Array}             伙伴数组
			 */
			getRightList(currentPage) {
				let self = this;
				self.nowPage = currentPage;
				self.tableData = [];
				let postData = {
					num: 20,
					page: currentPage,
					key: self.key,
					partnerType: self.partnerType
				};
				/*
				this.$http({
					url: 'listPartner.json',
					method: 'GET',
					data: postData
				}).then(res => {
					self.tableData = res;
					self.totalPage = 20%res.total;
				})
				*/
				self.tableData = userData.data;
			},
			goToDetail(item) {
				
			},
			/**
			 * 显示新建
			 * @return {Null} 
			 */
			showCreate() {
				this.isNew = true;
				this.changeText = '新增权限'; 
			},
			/**
			 * 显示更新
			 * @param  {Object} item 当前选中的角色信息
			 * @return {Object}      返回信息
			 */
			showUpdate(item) {
				this.isNew = true;
				this.changeText = '更新权限信息';
				this.isUpdate = true;
				// this.ruleForm.partnerType = item.pid;
				// this.ruleForm.organizName = item.name;
			},
			createNewRight() {
				let self = this;
				let url = '',
					showStr = '';
				if (this.isUpdate == true) {
					url = `system/organization/update`;
				} else {
					url = `system/organization/add`;
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
							this.getRightList(1);
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
			showDeleteRight(item) {
				this.$confirm(`确认删除当前权限？`,`删除权限`, {
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
                                    this.deleteRight(item);
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
			deleteRight(item) {
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
						this.getRightList(1);
					} else {
						self.$message({
							showClose: true,
							message: res.data.msg,
							type: 'error'
						});
					}
				})
			},
			filterHandler(filters) {
				let self = this;
				let row = null;
				let val = null;
				for(const i in filters) {
					row = i;
					val = filters[i];
				}
				self.partnerType = val[0];
				if (self.partnerType== null || self.partnerType == undefined) {
					self.partnerType = '';
				}
				self.getRightList(self.nowPage);
			},
			handleCurrentChange(val) {
				this.getRightList(val);
			}
		},
		filters: {

		}
	}
</script>