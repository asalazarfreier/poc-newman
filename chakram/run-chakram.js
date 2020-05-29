const debugMode = process.execArgv.join().includes('inspect') || process.execArgv.join().includes('debug');
const Mocha = debugMode ? require('mocha') : require('mocha-parallel-tests').default;
const fs = require('fs');
const path = require('path');
const MOCHA_TIMEOUT_MS = 200000;
// const sinon = require('sinon');
const utils = require('../utils/utils');
// const env = process.argv[2] ? process.argv[2] : 'prod';
// const dotenv = require('dotenv').config({path: path.join(__dirname, '/env/' + env  + '/.env')});
const testDirs = ['./chakram/tests'];
const logSymbols = require('log-symbols');


const mocha = new Mocha({
    timeout: MOCHA_TIMEOUT_MS,
    reporter: 'mochawesome',
    maxParallel: 30,
    reporterOptions: {
        reportDir: 'reports'
    }

});

// var lockLogs = () => {
//         sinon.stub(console, "log");
//         sinon.stub(process.stdout, "write");
//     },
//     unlockLogs = () => {
//         console.log.restore ? console.log.restore() : void(0);
//         process.stdout.write.restore ? process.stdout.write.restore() : void(0);
//     };

// Get all .js paths and add each file to the mocha instance.
testDirs.forEach((testDir) => {
    utils.getTestPaths(testDir, ".js").forEach((file) => {
        mocha.addFile(
            path.join(file)
        );
    });
});

console.log(">> Starting chakram test on ");
// lockLogs();
// Run the tests.
var startTime = new Date();
mocha.run(
    (failures) => {
        var endTime = new Date();
        // unlockLogs();
        console.log((failures ? logSymbols.error + " Chakram " + failures + " test failed." : logSymbols.success + " Chakram test success.") + '('+ (endTime - startTime) +' ms)');
        process.exit(failures ? 1 : 0);
    }
).on('fail', (test) => {
        // unlockLogs();
        utils.printChakramTestFailed(test);
        // lockLogs();
    }
);

