const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
	mode: 'production',
	context: __dirname,
	optimization: {
		// minimize: true,
		splitChunks: false,
	},
	entry: {
		'upload-largest-files': './src/upload-largest-files.ts',
		'upload-largest-files.min': './src/upload-largest-files.ts',
	},
	output: {
		filename: 'upload-largest-files.js',
		library: 'UploadLargestFiles',
	},
	resolve: {
		plugins: [
			/**
			 * Use this to load modules whose location is specified in the paths section
			 * of tsconfig.json when using webpack. This package provides the functionality
			 * of the tsconfig-paths package but as a webpack plug-in.
			 *
			 * Using this plugin means that you should no longer need to add alias entries
			 * in your webpack.config.js which correspond to the paths entries in your tsconfig.json.
			 * This plugin creates those alias entries for you, so you don't have to!
			 */
			new TsconfigPathsPlugin(),
		],
		extensions: ['.ts', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.ts?$/,
				loader: 'ts-loader',
				exclude: [/node_modules/],
			},
			{
				test: /\.(node|txt)$/i,
				loader: 'file-loader',
				options: {
					emitFile: false,
				},
			},
		],
	},
};
