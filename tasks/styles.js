'use strict';

const fs = require('fs');
const path = require('path');
const sass = require('node-sass');

const scss_filename = path.resolve(__dirname, '../src/componentes/accordion/styles/index.scss'),
	output_filename = path.resolve(__dirname, '../dist/styles.css');

sass.render({
	file: scss_filename,
	outFile: output_filename
}, function(error, result) {
	if (!error) {
		fs.writeFile(output_filename, result.css, function(err) {
			if (!err) {
				console.log('CSS file generated succesfully!');
			}
		});
	}
});
