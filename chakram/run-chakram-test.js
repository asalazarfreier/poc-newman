const MOCHA_TIMEOUT_MS = 200000;
const path = require('path');
const Mocha = require('mocha');
const testDirs = './chakram/tests';


const mocha = new Mocha({
    timeout: MOCHA_TIMEOUT_MS
});
mocha.addFile(path.join(testDirs, process.argv[2]));

mocha.run();
