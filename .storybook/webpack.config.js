// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const path = require('path');
//your app's webpack.config.js
const custom = require('../webpack.config.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//module.exports = {
//  plugins: [
//    // your custom plugins
//  ],
//  module: {
//    rules: [
//      // add your custom rules.
//    ],
//  },
//};

module.exports = async ({ config, mode }) => {
  	// `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'

	config.module.rules = config.module.rules.filter( rule => rule.test.toString() !== '/\\.css$/' );

	const styleLoaders = [
		'style-loader',
		//{
		//	loader:'style-loader'
		//},
		{
			loader:'css-loader',
			options: {
				modules: true,
				localIdentName: '[local]',
				camelCase: true,
			} 
		}
	]

	const sassloader = [
		'style-loader',
		{
			loader:'sass-loader',
			//options: {
			//	modules: true,
			//	localIdentName: '[local]',
			//	camelCase: true,
			//} 
		}
	]

	const babelLoader = [
		{
			loader:'babel-loader',
		},
	]

	config.module.rules.push({
		test:/\.js?$/,
		use: babelLoader,
		//include: path.resolve(__dirname, '../src/'),
		exclude: /node_modules/,
	});
	
	//Make Whatever fine-grained changes you need
	config.module.rules.push({
		test: /\.css$/, 
		//include: path.resolve(__dirname, '../src/'),
		loader: [
			true ? 'style-loader' : MiniCssExtractPlugin.loader,
			{
				loader: 'css-loader', 
				options: {
					modules: {
						mode:'local',
						localIdentName: '[local]',//'[local]',//true, 
						//localIdentName: '[name]__[local]--[hash:base64:5]'
						//hashPrefix: 'I am the GOLden gOD!',
					},
					localsConvention: 'camelCase',//true
					sourceMap: true
				}
			}
		]
	}
	//{
	//	test:/\.css$/,
	//	use:styleLoaders,
    //	include: path.resolve(__dirname, '../src/'),
	//}
	);

	config.module.rules.push({
		//test: /\.module\.s(a|c)ss$/,
		test: /\.s(a|c)ss$/,
		//include: path.resolve(__dirname, '../src/'),
		loader:[
			'style-loader',
			{
				loader: 'css-loader',
				options:{
					modules: {
	    				mode:'local',
	    				localIdentName: '[local]',
					},
	    			localsConvention: 'camelCase',
					sourceMap: true,
				}
			},
			{
				loader: 'sass-loader',
				options:{
					sourceMap: true
				}
			}
		]
	});


	return config;
	//return {
	//	...config, 
	//	module: {
	//		...config.module, 
	//		rules: [
	//			...config.module.rules,
	//			...custom.module.rules
	//		]
	//	}
	//};
};
