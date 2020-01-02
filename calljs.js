const iw = require('inline-webassembly');

// Put the output somewhere other than console
var elem = document.querySelector('#wasm_output_ex3');

const sayHey = function () {
    const msg = `Hey!`;
    // send output to console
    console.log(`Message = ${msg}`);
    // send output to html element
    elem.innerHTML = `Message = ${msg}`;
}

const wasm = `;;wasm
    (module
        (import "env" "sayHey" (func $sayHey))
        (func (export "hello")
            (call $sayHey)
        )
    )
`;

iw(wasm, { env: { sayHey } }).then((wasmModule) => {
    wasmModule.hello(); // Hey!
});
