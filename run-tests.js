const concurrently = require('concurrently');

const args = process.argv.slice(2).join(' ');


concurrently(
    [
        {command: 'npm:chakram ' + args, prefixColor: 'blue', name: 'chakram',},
        {command: 'npm:postman ' + args, prefixColor: 'magenta', name: 'postman'}
    ]
).then((args) => process.exit(0), (args) => process.exit(1));