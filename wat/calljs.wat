(module
    (import "env" "sayHey" (func $sayHey))
    (func (export "hello")
        (call $sayHey)
    )
)