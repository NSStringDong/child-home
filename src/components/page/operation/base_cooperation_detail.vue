<template>
	<div class="list-content">
		<div class="top-break">
			<!-- <el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{path: '/base_cooperation'}">{{`合作伙伴`}}</el-breadcrumb-item>
				<el-breadcrumb-item>
					<template>
						<p v-text="partnerName"></p>
					</template>
				</el-breadcrumb-item>
			</el-breadcrumb> -->
			<el-tabs v-model="message" @tab-click="tabPress">
				<el-tab-pane label="基础资料" name="0">
					<ul class="tab-ul">
						<li class="firstItem">
							<h2>基础信息</h2>
							<el-link :underline="true" icon="el-icon-edit">编辑</el-link>
						</li>
						<li>
							<h2>ID：</h2>
							<p v-cloak>{{partnerId}}</p>
						</li>
						<li>
							<h2>名称：</h2>
							<p v-text="partnerDetail.partnerName"></p>
						</li>
						<li>
							<h2>类型：</h2>
							<p>{{partnerDetail.partnerType | getPartnerType}}</p>
						</li>
						<li>
							<h2>结算周期：</h2>
							<p>{{partnerDetail.timeCycle | getTimecycleType}}</p>
						</li>
						<li>
							<h2>分成方式：</h2>
							<p>{{partnerDetail.settlementType | getProrationType}}</p>
						</li>
						<li v-if="partnerDetail.settlementType==1">
							<h2>分成比例：</h2>
							<p>{{`${partnerDetail.proration}%`}}</p>
						</li>
						<li v-if="partnerDetail.settlementType!=1">
							<h2>度数分成：</h2>
							<p>{{`${partnerDetail.unit/100}元/度`}}</p>
						</li>
						<li>
							<h2>4S店优惠：</h2>
							<p v-text="partnerDetail.discountFlag==1?'是':'否'"></p>
						</li>
						<li>
							<h2>公司主体：</h2>
							<p>{{partnerDetail.xlvrenType | getXlvrenType}}</p>
						</li>
						<li>
							<h2>优惠时间：</h2>
							<p>{{`${partnerDetail.discountStartDate}--${partnerDetail.discountEndDate}`}}</p>
						</li>
						<li>
							<h2>开户银行：</h2>
							<p v-text="partnerDetail.bank"></p>
						</li>
						<li>
							<h2>银行户名：</h2>
							<p v-text="partnerDetail.bankUserName"></p>
						</li>
						<li>
							<h2>银行账户：</h2>
							<p v-text="partnerDetail.bankAccount"></p>
						</li>
						<li>
							<h2>银行开户城市：</h2>
							<p v-text="partnerDetail.bankCityName"></p>
						</li>
						<li>
							<h2>邮箱地址：</h2>
							<p v-text="partnerDetail.email"></p>
						</li>
						<li>
							<h2>管理员：</h2>
							<p v-text="partnerDetail.username"></p>
						</li>
						<li>
							<h2>管理员电话：</h2>
							<p v-text="partnerDetail.userMobile"></p>
						</li>
						<li>
							<h2>备注：</h2>
							<p v-text="partnerDetail.comment"></p>
						</li>
					</ul>
				</el-tab-pane>
				<el-tab-pane label="充电站点" name="1">
					
				</el-tab-pane>
				<el-tab-pane label="月结单" name="2">
					
				</el-tab-pane>
				<el-tab-pane label="钱包" name="3">
					
				</el-tab-pane>
				<el-tab-pane label="管理员" name="4">
					
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'partnerDetail',
		data() {
			return {
				message: 0,
				tabList: [false, false, false, false, false],
				partnerId: this.$route.query.partnerId,
				partnerName: '',
				partnerDetail: {
					partnerId: '',
					partnerName: '',
					partnerType: '',
					timeCycle: '',
					proration: '',
					settlementType: '',
					unit: '',
					discountFlag: '',
					xlvrenType: '',
					discountStartDate: '',
					discountEndDate: '',
					bank: '',
					bankCityName: '',
					bankUserName: '',
					bankAccount: '',
					email: '',
					username: '',
					userMobile: '',
					comment: ''
				},
				baseDetail: ''
			}
		},
		created() {
			this.getPartnerDetail();
		},
		mounted() {

		},
		watch: {

		},
		methods: {
			/**
			 * 合作伙伴详情
			 * @return {Object} 
			 */
			getPartnerDetail() {
				let self = this;
				this.$http({
					url: 'findPartnerById.json',
					method: 'GET',
					data: {
						partnerId: self.partnerId
					}
				}).then(res => {
					// self.partnerDetail = res;
					self.getPartnerManagerInfo(res);
				})
			},
			/**
			 * 合作伙伴管理员信息
			 * @param  {Object} base 详情信息
			 * @return {Object}      
			 */
			getPartnerManagerInfo(base) {
				let self = this;
				this.$http({
					url: 'getPartnerManagerInfo.json',
					method: 'GET',
					data: {
						partnerId: self.partnerId
					}
				}).then(res => {
					self.partnerDetail.partnerId         = base.partnerId;
					self.partnerDetail.partnerName       = base.partnerName;
					self.partnerDetail.partnerType       = base.partnerType;
					self.partnerDetail.timeCycle         = base.timeCycle;
					self.partnerDetail.settlementType    = base.settlementType;
					self.partnerDetail.proration		 = base.proration;
					self.partnerDetail.unit              = base.unit;
					self.partnerDetail.discountFlag      = base.discountFlag;
					self.partnerDetail.xlvrenType        = base.xlvrenType;
					self.partnerDetail.discountStartDate = base.discountStartDate?base.discountStartDate.substring(0, 10):'';
					self.partnerDetail.discountEndDate   = base.discountEndDate?base.discountEndDate.substring(0, 10):'';
					self.partnerDetail.bank              = base.bank;
					self.partnerDetail.bankCityName      = base.bankCityName;
					self.partnerDetail.bankUserName      = base.bankUserName;
					self.partnerDetail.bankAccount       = base.bankAccount;
					self.partnerDetail.email             = base.email;
					self.partnerDetail.username          = res.username;
					self.partnerDetail.userMobile        = res.userMobile;
					self.partnerDetail.comment           = base.comment;
				})
			},
			/**
			 * 合作伙伴名下站点列表
			 * @param  {Number} page 页数
			 * @return {Object}      列表
			 */
			getChargeStationList(page) {

			},
			tabPress(tab) {
				console.log(tab.name);
			} 
		}
	}
</script>