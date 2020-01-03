# hello-wasm
Basic WASM examples: Add, Hello World, Call JS, and String Reverse 

See it in action [hello-wasm](https://mightyweasel.github.io/hello-wasm/)

# Getting it running

Get the inline webassembly package, and get browserify. Add wabt (part of inline-webassembly so probably can skip)

```bash
npm install --save inline-webassembly
npm i -g browserify
npm install wabt
```

Then bundle up the examples you want to test out (from the jswasm the inline examples)

```bash
browserify jswasm/add.js jswasm/helloworld.js jswasm/calljs.js jswasm/stringreverse.js -o build/bundle.js
```

Examples include `add.js`, `helloworld.js`, `calljs.js`, and `stringreverse.js`

Run `index.html` and take a look at the `console` to see the fruits of your labor!

If you need more "webservery" performance, you can always fire up a basic http.server (or whatever method you prefer really). It works running the file directly from the drive too though.

```bash
cd hello-wasm
python -m http.server 8888
```

Happy hacking!

# WAT about WASM?

I've got a real simple .wat to .wasm setup that converts the text based wat to the binary wasm files. This will compile all the wat files to wasm.

```bash
node wat2wasm_compiler.js
```

Takes the examples from the /wat directory and writes .wasm files to the /wasm directory 

# Sources

Example code lifted and modified from [npm inline-webassembly](https://www.npmjs.com/package/inline-webassembly), bundling by [browserify](http://browserify.org/)

Also consider getting the vscode wasm syntax highlighting extention - It makes life much easier. I snagged the WebAssembly Toolkit for VSCode from WebAssembly Foundation.
