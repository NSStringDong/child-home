module.exports = {
  	presets: [
    	'@vue/app',
    	[
    		'@babel/preset-env',
    		{
    			"modules": "commonjs",
    			"useBuiltIns": "entry",
    			"corejs": "2"
    		}
    	]
  	],
  	plugins: [
  		'@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-transform-runtime',
        '@babel/plugin-transform-modules-commonjs',
        'add-module-exports'
  	]
}
