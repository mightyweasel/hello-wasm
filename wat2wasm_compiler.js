const { readFileSync, writeFileSync } = require("fs");
const wabt = require("wabt")();
const path = require("path");

const ins = [
    "add",
    "helloworld",
    "calljs",
    "stringreverse"
];

// write out .wasm from the .wat
var wat_wasm = ins.map(function (inputWat) {
    let wasmModule = wabt.parseWat(`wat/${inputWat}.wat`, readFileSync(`wat/${inputWat}.wat`, "utf8"));
    let { buffer } = wasmModule.toBinary({});

    return writeFileSync(`wasm/${inputWat}.wasm`, Buffer.from(buffer));
});

// run with node wat2wasm_compiler.js