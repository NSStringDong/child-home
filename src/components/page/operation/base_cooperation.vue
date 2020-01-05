<style>
	.search-content {
		/*height: 92px;*/
		padding-top: 15px;
		display: flex;
	}
	.search-input {
		width: 35%;
		/*margin-left: 16px;*/
		flex: 60px;
	}
	.search-btn {
		width: 60%;
		/*flex: 1;*/
	}
	.new-btn {
		/*margin-right: 16px;*/
		float: right;
	}
	.table-content {
		margin-top: 25px;
	}
</style>
<template>
	<div class="list-content">
		<div class="search-content">
			<div class="search-input">
				<el-input placeholder='请输入内容' v-model="key" clearable>
					<el-button slot="append" icon="el-icon-search"></el-button>
				</el-input>
			</div>
			<div class="search-btn">
				<el-button class="new-btn" type="primary">新建</el-button>
			</div>
		</div>
		<div class="table-content">
			<el-table :data="tableData" border stripe @cell-dblclick="goToDetail" @filter-change="filterHandler">
				<el-table-column align="center" prop="partnerId" label="ID"></el-table-column>
				<el-table-column align="center" prop="partnerName" label="名称"></el-table-column>
				<el-table-column align="center" prop="partnerType" label="类型" column-key="partnerType" :filters="this.partnerTypeDic" :filter-multiple="false">
					<template slot-scope="scope">
						<p>{{scope.row.partnerType | getPartnerType}}</p>
					</template>
				</el-table-column>
				<el-table-column align="center" label="结算方式" >
					<template slot-scope="scope">
						<p>{{scope.row.settlementType | getProrationType}}</p>
					</template>
				</el-table-column>
				<el-table-column align="center" label="操作" >
					<template slot-scope="scope">
						<el-button type="text" icon="el-icon-view" @click="goToDetail(scope.row)">详情</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>
<script type="text/javascript">
	import {requestData} from '../../../utils/data.js';
	export default {
		name: 'base_cooperation',
		data() {
			return {
				key: '',
				tableData: [],
				nowPage: null,
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
				partnerType: ''
			}
		},
		created() {
			this.getPartnerList(1);
		},
		mounted() {

		},
		watch: {

		},
		methods: {
			/**
			 * 获取合作伙伴列表
			 * @param  {Number} currentPage 当前页数
			 * @return {Array}             伙伴数组
			 */
			getPartnerList(currentPage) {
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
				})
				*/
				self.tableData = requestData.data;
			},
			goToDetail(item) {
				this.$router.push({
					path: '/base_cooperation_detail',
					query: {
						partnerId: item.partnerId
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
				self.getPartnerList(self.nowPage);
			}
		},
		filters: {

		}
	}
</script>