const path = require('path');
const utils = require('../utils/utils');
const async = require('async');
const newman = require('newman');
const testDirs = ['./postman/tests'];
var   parallelCollectionRun = [];
var   options = {
        bail: true,
        reporters: ['html'],
        reporter: {
            html: {
                export: 'reports/collection.hbs',
                template: 'postman/templates/htmlreqres.hbs'
            }
        }
      };
console.log(">> Starting postman test on ");
testDirs.forEach((directory) => utils.getTestPaths(directory, ".json").forEach((file) => {
    var opt = JSON.parse(JSON.stringify(options));
    opt.collection = file;
    opt.reporter.html.export = 'reports/' + path.basename(file, '.json') + '.html';
    parallelCollectionRun.push((done) => newman.run(opt, done));
}));

var startTime = new Date();
// reportPostman checks if any test failed, returning the number of errors. 0 means no errors found.
async.parallel(parallelCollectionRun, (err, result) => process.exit(utils.reportPostman(err, result, startTime) ? 1 : 0));
