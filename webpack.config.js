const path = require('path');
const isDevelopment = process.env.NODE_ENV !== 'production';
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const nodeExternals = require('webpack-node-externals');
const { SourceMapDevToolPlugin } = require("webpack");
const CssNano = require('cssnano');


const dist = path.resolve(__dirname, 'dist');

module.exports = {
	target: 'node',
	externals: [nodeExternals()],
	devtool: 'eval-source-map',
	mode: isDevelopment ? 'development' : 'production',
	entry: ['babel-polyfill', './src/js/index.js', './src/scss/index.scss'],
	output: {
		path: dist,
		filename: 'js/bundle.js'
	},
	devServer: {
		contentBase: './dist'
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				styles: {
					name: 'styles',
					test: /\.css$/,
					chunks: 'all',
					enforce: true,
				},
			},
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.html'
		}),
		new MiniCssExtractPlugin({
			filename: isDevelopment ? 'css/style.min.css' : 'css/style.[hash].css',

		}),
		new SourceMapDevToolPlugin({
			//filename: '[name].js.map',
		}),
		new CleanWebpackPlugin(),
	].filter(a => !!a),
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader','source-map-loader']
			},
			{
				test: /\.(css|sass|scss)$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							instance: 'css',
						}
					},
					{
						loader: "css-loader",
						options: {
							importLoaders: 3,
							sourceMap: true,
						}
					},
					{
						loader: "postcss-loader",
						options: {
							ident: "postcss",
							plugins: [
								isDevelopment ? null : new CssNano(),
								require("autoprefixer")
							].filter(a => !!a),
							sourceMap: true
						}
					},
					{
						loader: 'resolve-url-loader',
						options: {
							keepQuery: true,
							sourceMap: true
						}
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true,
						}
					}
				].filter(a => !!a)
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loader: "file-loader?name=app/images/[name].[ext]"
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	}
}