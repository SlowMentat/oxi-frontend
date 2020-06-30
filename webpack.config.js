const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDevelopment = true;//process.env.NODE_ENV === 'development';
//const productionConfig = merge([parts.generateSourceMaps({ type: "source-map" })]);

var webpack = require('webpack');
var combineLoaders = require('webpack-combine-loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	//devtool: 'eval-source-map',
	optimization:{
		minimize: false,
		chunkIds: 'named',
		splitChunks: {
			cacheGroups: {
				default: false,
				vendor: false,
				//vendor chunk
				//vendor: {
				//	name:'vendor',
				//	//sy + async chunks
				//	chunks: 'all',
				//	//import file path contianing nodemodules
				//	test: /node_modules/
				//}
			}
		}
	},
	entry: ['./src/App.js'],
	output: {
		filename: "App.js",
		chunkFilename: '[name].js',
		path: path.resolve(__dirname, 'shop'),
	},
	externals: {
	  lodash: {
	    commonjs: 'lodash',
	    commonjs2: 'lodash',
	    amd: 'lodash',
	    root: '_'
	  }
	},
	resolve: {
		extensions: ['.js', '.jsx', '.scss']
	},
	plugins: [
		new webpack.DefinePlugin({ // <-- key to reducing React's size
			'process.env': {
				'NODE_ENV': JSON.stringify('development')
			}
		}),
		//new webpack.optimize.UglifyJsPlugin(), //minify everything
		//new webpack.optimize.AggressiveMergingPlugin(),	//Merge chunks
		new HtmlWebpackPlugin({
			template: './index.template.ejs',
			inject: 'body',
		}),
		//new MiniCssExtractPlugin({
		//	filename: isDevelopment ? '[name].css' : '[name].[hash].css', //add hash to filename for easy/efficient cache busting
		//	chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css',
		//})
  	],
	module: {
		//loaders: [
		rules:[
	    	{
	    		test: /\.js?$/, 
	    		loader: [
	    			{
	    				loader:'babel-loader',
	    				options: {
	    					cacheDirectory: true, 
	    					presets: ['@babel/react','@babel/env'],
	    					plugins: ["@babel/plugin-syntax-dynamic-import", "@babel/plugin-proposal-object-rest-spread", "babel-plugin-styled-components"]
	    				},
	    			}
	    		],
				exclude: /node_modules/, 
	    	},
	    	//{
	    	//	test: /\.css$/, 
	    	//	loader: combineLoaders([
		    //		{
		    //			loader: 'style-loader'
		    //		}, {
		    //			loader: 'css-loader', 
		    //			options: {
			//    			modules: {
			//    				mode:'local',
			//    				localIdentName: '[local]--[hash:base64:5]',//'[local]',//true, 
			//    				//localIdentName: '[name]__[local]--[hash:base64:5]'
			//    				//hashPrefix: 'I am the GOLden gOD!',
			//    			},
			//    			localsConvention: 'camelCase'//true
		    //			}
		    //		}
	    	//	])
	    	//},
	    	{
	    		test: /\.css$/, 
	    		loader: [
	    			isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
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
	    					sourceMap: isDevelopment
		    			}
		    		}
	    		]
	    	},
	    	{
	    		test: /\.module\.s(a|c)ss$/,
	    		loader:[
	    			isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
	    			{
	    				loader: 'css-loader',
	    				options:{
	    					modules: {
			    				mode:'local',
			    				localIdentName: '[local]',
	    					},
			    			localsConvention: 'camelCase',
	    					sourceMap: isDevelopment,
	    				}
	    			},
	    			{
	    				loader: 'sass-loader',
	    				options:{
	    					sourceMap: isDevelopment
	    				}
	    			}
	    		]
	    	},
	    	{
	    		test: /\.s[ac]ss$/,
	    		loader:[
	    			isDevelopment ? 'style-loader' : MiniCssExtractPlugin,
	    			//'css-loader',
	    			{
	    				loader: 'css-loader',
	    				options:{
	    					modules: {
			    				mode:'local',
			    				localIdentName: '[local]',
	    					},
			    			localsConvention: 'camelCase',
	    					sourceMap: isDevelopment,
	    				}
	    			},
	    			{
	    				loader: 'sass-loader',
	    				options: {
	    					sourceMap: isDevelopment
	    				}
	    			}
	    		]
	    	}
	    ]
	}  
};
