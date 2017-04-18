'use strict';

const del = require('del');
const path = require('path');

const PATHS_TO_CLEAN = [
	path.resolve(__dirname, '../dist')
];

del.sync(PATHS_TO_CLEAN);
