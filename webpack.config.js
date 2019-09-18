const path = require('path');
var webpack = require('webpack');
var combineLoaders = require('webpack-combine-loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/App.js',
	output: {
		filename: "App.js",
		path: path.resolve(__dirname, 'shop')
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
		extensions: ['.js', '.jsx']
	},
	plugins: [
		new webpack.DefinePlugin({ // <-- key to reducing React's size
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		//new webpack.optimize.UglifyJsPlugin(), //minify everything
		//new webpack.optimize.AggressiveMergingPlugin(),	//Merge chunks
		new HtmlWebpackPlugin({
			template: './index.template.ejs',
			inject: 'body',
		})
  	],
	module: {
		loaders: [
	    	{
	    		test: /\.js?$/, 
	    		loader: 'babel-loader', 
	    		exclude: /node_modules/, 
	    		query: {
	    			cacheDirectory: true, 
	    			presets: ['react','env']
	    		}
	    	},
	    	{
	    		test: /\.css$/, 
	    		loader: combineLoaders([
		    		{
		    			loader: 'style-loader'
		    		}, {
		    			loader: 'css-loader', 
		    			query: {
			    			modules: true, 
			    			//localIdentName: '[name]__[local]--[hash:base64:5]',
			    			localIdentName: '[local]',
			    			camelCase:true
		    			}
		    		}
	    		])
	    	}
	    ]
	}  
};