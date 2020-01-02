const iw = require('inline-webassembly');

const wasm = `;;wasm
    (module
        (memory $0 1)
        (export "memory" (memory $0))
        ;; declaring and exporting a function named "reverse"
        ;; it takes two arguments, the pointer to a string and its length
        ;; and it returns a 32 bit integer which is going to be the pointer
        ;; to the reversed string
        (func (export "reverse") (param $sref i32) (param $slen i32) (result i32)
 
            ;; declaring new variable to store result pointer
            (local $result i32)
 
            ;; seclaring iterator variable
            (local $iterator i32)
 
            ;; write pointer
            (local $write_to i32)
 
            ;; setting $result = $sref + $slen + 1
            (set_local $result
                ;; adding 1
                (i32.add
                    ;; adding the string pointer with its length
                    (i32.add
                        (get_local $sref)
                        (get_local $slen)
                    )
                    (i32.const 1)
                )
            )
            
            ;; setting iterator to 0, for the following loop
            (set_local $iterator
                (i32.const 0)    
            )
 
            ;; we'll start writing to the start of the result
            (set_local $write_to
                (get_local $result)    
            )
                
            (block
                (loop
                    
                    ;; store one character from original string to resulting string
                    (i32.store
                        (get_local $write_to)
                        ;; load 1 byte and sign-extend i8 to i32
                        (i32.load8_s
                            (i32.sub
                                (i32.sub
                                    (i32.add
                                        (get_local $sref)
                                        (get_local $slen)
                                    )
                                    (get_local $iterator)
                                )
                                (i32.const 1)
                            )
                        )    
                    )
 
                    ;; increment position to write to on next loop iteration
                    (set_local $write_to
                        (i32.add
                            (get_local $write_to)
                            (i32.const 1)    
                        )    
                    )
 
                    ;; increment iterator by 1 for every loop iteration
                    (set_local $iterator
                        (i32.add
                            (get_local $iterator)
                            (i32.const 1)    
                        )    
                    )
                    
                    ;; break loop if iterator reaches string length
                    (br_if 1
                        (i32.ge_s
                            (get_local $iterator)
                            (get_local $slen)
                        )
                    )
                    
                    ;; repeat loop
                    (br 0)
                )
            )
 
            ;; returning result which contains pointer to the reversed string
            (get_local $result)
        )
    )
`;

// Put the output somewhere other than console
var elem = document.querySelector('#wasm_output_ex4');

iw(wasm).then((wasmModule) => {
    const inputString = `Web Assembly is Cool!`;
    const stringToReverse = wasmModule.createString(inputString);
    const resultPointer = wasmModule.reverse(stringToReverse, inputString.length);
    const resultString = wasmModule.readString(resultPointer);
    // send output to console
    console.log(`Result = ${resultString}`);
    // send output to html element
    elem.innerHTML = `Result = ${resultString}`;
});

