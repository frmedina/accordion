'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const glob = require('glob');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require(path.resolve(__dirname, '../webpack.config'));

const PATH_TO_MOCKS_DIR = path.resolve(__dirname, '../mocks'),
	app = express(),
	compiler = webpack(webpackConfig),
	routerHandlers = glob.sync(PATH_TO_MOCKS_DIR + '/**/handlers.js'),
	port = 3000,
	serverOptions = {
		quiet: false,
		noInfo: false,
		hot: false,
		inline: true,
		lazy: false,
		publicPath: webpackConfig.output.publicPath,
		stats: {
			color: true
		}
	};

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(webpackDevMiddleware(compiler, serverOptions));
app.use(express.static('./'));

if (Array.isArray(routerHandlers) && routerHandlers.length > 0) {
	routerHandlers.forEach((handler) => {
		const endpoint = require(handler),
			result = endpoint(app);
		console.log('#### Registered mock >>', result);
	});
}

app.use((err, req, res, next) => {
	if(err.status !== 404) {
		return next();
	}
	return res.status(404).json({
		errorCode: 'endpoint.not.found',
		message: 'The endpoint you want to access has no associated resource.'
	});
});

app.listen(port, (err) => {
	if(err) {
		console.error('ERROR during server start', err);
	} else {
		console.log('Server started successfully in port', port + '!');
	}
});
