const iw = require('inline-webassembly');

const wasm = `;;wasm
    (module
        (func (export "add") (param $n1 i32) (param $n2 i32) (result i32)
            get_local $n1
            get_local $n2
            i32.add
        )
    )
`;

const int1 = 44;
const int2 = 99;

// Put the output somewhere other than console
var elem = document.querySelector('#wasm_output_ex1');

iw(wasm).then((wasmModule) => {
    const sum = wasmModule.add(int1, int2);
    // send output to console
    console.log(`Sum = ${sum}`); // 143
    // send output to html element
    elem.innerHTML = `Sum = ${sum}`;
});
