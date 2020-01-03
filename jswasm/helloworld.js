const iw = require('inline-webassembly');

const wasm = `;;wasm
    (module
        (memory (export "memory") 1)
        (func (export "hello") (result i32)
            i32.const 16
        )
        (data (i32.const 16)
            "Hello World"
        )
    )
`;

// Put the output somewhere other than console
var elem = document.querySelector('#wasm_output_ex2');

iw(wasm).then((wasmModule) => {
    const stringPointer = wasmModule.hello(44, 99);
    const string = wasmModule.readString(stringPointer);
    // send output to console
    console.log(`Result = ${string}`); // Hello World
    // send output to html element
    elem.innerHTML = `Result = ${string}`;
});
