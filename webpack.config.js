const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
	context: path.resolve(__dirname, './src'),
	entry: {
		index: './index.js'
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].bundle.js',
		publicPath: ''
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: [/node_modules/],
				use: [
					{
						loader: 'babel-loader',
						options: {presets: ['env']}
					}
				]
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					//resolve-url-loader may be chained before sass-loader if necessary
					use: ['css-loader', 'sass-loader']
				})
			}
		]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: 'styles.css'
		})
	]
};
