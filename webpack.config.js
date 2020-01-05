const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
// const extractCSS = new ExtractTextPlugin({
// 	disable: process.env.NODE_ENV == 'development' ? true : false, // 开发环境下直接内联，不抽离
//     // filename: 'style/extractFromCss.css', // 单个entry时，可写死
//     filename: 'style/[name].css', // 多entry时
// });

module.exports = {
	performance: {
		hints:false
	},
	entry: {
	  	app: './src/main.js'
	},
	output: {
		path: path.join(__dirname,'./dist'),
        filename: '[name].bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'        // 处理vue
			},
			// 它会应用到普通的 `.js` 文件
			// 以及 `.vue` 文件中的 `<script>` 块
			{
				test: /\.js$/,
				loader: 'babel-loader',
				query: {compact: false},
				exclude: /node_modules/,
				include: /src/
			},
			// 它会应用到普通的 `.css` 文件
			// 以及 `.vue` 文件中的 `<style>` 块
			{
				test: /\.css$/,
				use: [
					'vue-style-loader',
					'css-loader'
				]
				// use: extractCSS.extract({
    //                 fallback: 'vue-style-loader',
    //                 use: 'css-loader',
    //                 publicPath: '../'
    //             })
			},
			{
				test: /\.(png|jpg|gif)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							name: '[name].[ext]?[hash]', // 文件名规则，默认是[hash].[ext]
							outputPath: 'images/', // 输出路径
						},
					},
				],
			},
			{
				test: /\.(eot|woff2?|ttf|svg)$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 5000  	// fonts file size <= 5KB, use 'base64'; else, output svg file
						}
					}
				]
			}
		]
	},
	resolve: {
        alias: {
            'vue$': 'vue/dist/vue.runtime.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
	plugins: [
		new VueLoaderPlugin(),
		new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
		new htmlWebpackPlugin({
			hash: true,
            template: path.join(__dirname,'./index.html'),   //指定模板页面
            fileName:'index.html',   							//指定生成页面的名称，index.html浏览器才会默认直接打开
            minify:{    										//html-webpack-plugin内部集成了html-minifier
	            collapseWhitespace:true,    					//压缩空格
	            removeAttributeQuotes:true, 					//移除引号
	            removeComments:true,       						//移除注释
	        },
		}),
		// extractCSS,
		new webpack.HotModuleReplacementPlugin(),
		new CleanWebpackPlugin()
	],
	devServer: {
		contentBase: './dist',
		host: 'localhost',
		port: 9000,
		open: true,
		hot: true
	}
}