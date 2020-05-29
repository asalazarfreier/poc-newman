const fs = require("fs");
const path = require("path");
const logSymbols = require('log-symbols');


var utils = {
    getTestPaths(dir, ext, fileList) {
        const files = fs.readdirSync(dir);
        // eslint-disable-next-line
        fileList = fileList || [];
        files.forEach((file) => {
            if (fs.statSync(path.join(dir, file)).isDirectory()) {
                // eslint-disable-next-line
                fileList = utils.getTestPaths(path.join(dir, file), ext, fileList);
            } else {
                fileList.push(path.join(dir, file));
            }
        });
        return fileList.filter((file => path.extname(file) === ext));
    },
    printChakramTestFailed(err) {
        console.info("      >> Chakram");
        console.info("        >> Test failed: " + err.parent.title);
        console.info("           >> " + err.title);
        console.info("           >> " + err.err.message);
        console.info("\n");
    },
    printPostmanTestFailed(err) {
        var failures = err.run.failures;
        failures.length ? console.info(">> Postman") : void(0);
        failures.forEach((failure) => {
            console.info(">> Test failed: " + failure.source.name + " - " + failure.error.name);
            console.info(">> " + failure.error.message);
        });
        failures.length ? console.info("\n") : void(0);
    },
    reportPostman(err, results, startTime) {
        var endTime = new Date();
        var testerr = results.reduce((acumulated, summary) => acumulated + summary.run.failures.length, 0);
        results.forEach(function (result) {
            utils.printPostmanTestFailed(result);
        });
        console.log((testerr ? logSymbols.error + " Postman " + testerr + " test failed." : logSymbols.success + " Postman test success.") +'('+ (endTime - startTime) +'ms)');
        return testerr;
    }
};

module.exports = utils;