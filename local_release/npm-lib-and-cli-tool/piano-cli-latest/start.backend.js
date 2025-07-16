"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const lib_1 = require("tnp-helpers/lib");
async function run([]) {
    console.log('Hello from', require('path').basename(process.argv[1]));
    const command = args.shift();
    if (command === 'test') {
        lib_1.Helpers.clearConsole();
        console.log('waiting for nothing...');
        process.stdin.resume();
    }
    this._exit();
}
//# sourceMappingURL=start.backend.js.map