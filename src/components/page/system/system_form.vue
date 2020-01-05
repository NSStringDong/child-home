<style scoped>
	.el-input,.el-select {
	    width: 320px; 
	}
</style>
<template>
	<div class="list-content">
		<div class="search-content">
			<div class="search-input">
				<el-input placeholder='请输入员工姓名查询' v-model="key" clearable>
					<el-button slot="append" icon="el-icon-search"></el-button>
				</el-input>
			</div>
			<div class="search-btn">
				<el-button class="new-btn" type="primary" @click="showCreate">新增组织</el-button>
			</div>
		</div>
		<div class="table-content">
			<!-- @filter-change="filterHandler" -->
			<el-table :data="tableData" border stripe @cell-dblclick="goToDetail">
				<el-table-column align="center" prop="id" label="ID"></el-table-column>
				<el-table-column align="center" prop="name" label="部门名称"></el-table-column>
				<el-table-column align="center" prop="status" label="状态"></el-table-column>
				<el-table-column align="center" prop="createTime" label="添加时间">
					<template slot-scope="scope">
						<p>{{scope.row.createTime.substring(0, 10)}}</p>
					</template>
				</el-table-column>
				<el-table-column align="center" label="操作">
					<template slot-scope="scope">
						<el-button type="primary" samll @click="showUpdate(scope.row)">编辑</el-button>
						<el-button type="danger" samll @click="showDeleteOrganization(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="block">
                <el-pagination background @current-change="handleCurrentChange" :current-page.sync="nowPage" :page-size="20" layout="prev, pager, next, jumper" :page-count="totalPage"></el-pagination>
            </div>
			<el-dialog :title="changeText" :visible.sync="isNew" center width="35%">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm">
					<el-form-item label="父级组织" prop="partnerType" :label-width="formLabelWidth">
						<el-select style="width: 100px" v-model="ruleForm.partnerType" placeholder="请选择">
							<el-option v-for="item in partnerTypeDic" :key="item.value" :label="item.text" :value="item.value"></el-option>
						</el-select>
						<el-select style="width: 100px; margin-left: 10px;" v-model="ruleForm.partnerType" placeholder="请选择">
							<el-option v-for="item in partnerTypeDic" :key="item.value" :label="item.text" :value="item.value"></el-option>
						</el-select>
						<el-select style="width: 100px; margin-left: 10px;" v-model="ruleForm.partnerType" placeholder="请选择">
							<el-option v-for="item in partnerTypeDic" :key="item.value" :label="item.text" :value="item.value"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="组织名称" prop="organizName" :label-width="formLabelWidth">
						<el-input v-model="ruleForm.organizName" autocomplete="off"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="isNew=false">取 消</el-button>
					<el-button type="primary" :loading="isLoading" :disabled="isLock" @click="createNewOrganization">确 定</el-button>
				</div>
			</el-dialog>
		</div>
	</div>
</template>
<script type="text/javascript">
	import {userData} from '../../../utils/data.js';
	export default {
		name: 'system_form',
		data() {
			var validateType = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择父级组织'));
                    this.isDisable = true;
                } else {
                    if (this.ruleForm.organizName!== '') {
                        this.$refs.ruleForm.validateField('organizName');
                    }
                    callback();
                }
            };
			var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入组织名称'));
                    this.isLock = true;
                } else {
                    this.isLock = false;
                    callback();
                }
            };
			return {
				key: '',
				tableData: [],
				nowPage: null,
				totalPage: null,
				searchDate: '',
				formLabelWidth: '80px',
				partnerTypeDic: Object.freeze([{
					text: '请选择',
					value: ''
				}, {
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
				isNew: false,
				isLoading: false,
				isLock: true,
				changeText: '',
				isUpdate: false,
				ruleForm: {
					partnerType: '',
					organizName: ''
				},
				rules: {
					partnerType: [
						{validator: validateType, trigger: 'change'}
					],
					organizName: [
            			{ validator: validatePass, trigger: 'change' }
          			]
				}
			}
		},
		created() {
			this.getOrganizationList(1);
		},
		mounted() {

		},
		watch: {
			'isNew': function(val) {
				if (val == false) {
					this.ruleForm.partnerType = '';
					this.ruleForm.organizName = '';
					this.changeText = '';
					this.isLock = true;
					this.isUpdate = false;
				}
			}
		},
		methods: {
			/**
			 * 获取组织列表
			 * @param  {Number} currentPage 当前页
			 * @return {Array}             组织列表
			 */
			getOrganizationList(currentPage) {
				let self = this;
				self.nowPage = currentPage;
				self.tableData = [];
				let postData = {
					rows: 20,
					page: currentPage
				};
				this.$http({
					url: 'system/organization/list',
					method: 'POST',
					data: postData
				}).then((res) => {
					console.info("res", res);
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
				this.changeText = '新增组织'; 
			},
			showUpdate(item) {
				this.isNew = true;
				this.changeText = '更新组织';
				this.isUpdate = true;
				this.ruleForm.partnerType = item.pid;
				this.ruleForm.organizName = item.name;
			},
			/**
			 * 新增组织
			 * @return {Null} 
			 */
			createNewOrganization() {
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
						name: self.ruleForm.organizName,
						pid: self.ruleForm.partnerType,
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
							this.getOrganizationList(1);
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
			showDeleteOrganization(item) {
				this.$confirm(`确认删除${item.name}组织？`,`删除组织`, {
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
                                    this.deleteOrganization(item);
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
			 * 删除当前组织
			 * @param  {Object} item 当前组织
			 * @return {Null}      
			 */
			deleteOrganization(item) {
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
						this.getOrganizationList(1);
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
				self.getOrganizationList(self.nowPage);
			},
			handleCurrentChange(val) {
                this.getOrganizationList(val);
            }
		},
		filters: {

		}
	}
</script>