(module
    (memory (export "memory") 1)
    (func (export "hello") (result i32)
        i32.const 16
    )
    (data (i32.const 16)
        "Hello World"
    )
)