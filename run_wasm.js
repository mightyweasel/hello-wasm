const { readFileSync } = require("fs");

const run = async () => {
    const buffer = readFileSync("wasm/add.wasm");
    const module = await WebAssembly.compile(buffer);
    const instance = await WebAssembly.instantiate(module);
    console.log(instance.exports.add(1, 2));
};

run();

// node run_wasm.js
