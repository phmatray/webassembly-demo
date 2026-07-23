![webassembly-demo banner](.github/banner.png)

# WebAssembly demo with React and Go 1.12

<!-- portfolio-badges:start -->
<!-- Identity -->
[![phmatray - webassembly-demo](https://img.shields.io/static/v1?label=phmatray&message=webassembly-demo&color=blue&logo=github)](https://github.com/phmatray/webassembly-demo)
![Top language](https://img.shields.io/github/languages/top/phmatray/webassembly-demo)
[![Stars](https://img.shields.io/github/stars/phmatray/webassembly-demo?style=social)](https://github.com/phmatray/webassembly-demo/stargazers)
[![Forks](https://img.shields.io/github/forks/phmatray/webassembly-demo?style=social)](https://github.com/phmatray/webassembly-demo/network/members)
[![License](https://img.shields.io/github/license/phmatray/webassembly-demo)](https://github.com/phmatray/webassembly-demo/blob/HEAD/LICENSE)

<!-- Activity -->
[![Issues](https://img.shields.io/github/issues/phmatray/webassembly-demo)](https://github.com/phmatray/webassembly-demo/issues)
[![Pull requests](https://img.shields.io/github/issues-pr/phmatray/webassembly-demo)](https://github.com/phmatray/webassembly-demo/pulls)
[![Last commit](https://img.shields.io/github/last-commit/phmatray/webassembly-demo)](https://github.com/phmatray/webassembly-demo/commits)
<!-- portfolio-badges:end -->

<!-- portfolio-toc:start -->

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Tech Stack](#tech-stack)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Some ideas for pull requests](#some-ideas-for-pull-requests)
- [Resources](#resources)
- [Licence](#licence)

<!-- portfolio-toc:end -->



A Go-based WebAssembly sample with React app!

![Demo capture](capture.png?raw=true 'Demo capture')

## Features

- **Go compiled to WebAssembly**: `server/go/main.go` is compiled with `GOOS=js GOARCH=wasm go build` into `main.wasm`, exposing Go functions to JavaScript via `syscall/js`.
- **JS ↔ Go function bridge**: `registerCallbacks()` registers `sayHi` and `sayHello` on the global JS scope; `sayHello` shows how to pass a Node-style `(err, message)` callback from JS into a Go function and invoke it back.
- **React client**: A minimal React app (`client/src/components/App.js`) fetches and instantiates the `.wasm` module in the browser with `WebAssembly.instantiateStreaming`, then wires two buttons to the exposed Go functions.
- **Express WASM server**: A small Express server (`server/index.js`) serves `main.wasm` with the correct `application/wasm` content type, plus CORS and gzip compression middleware.
- **Webpack dev tooling**: The client uses Webpack 5 and Babel (with the React preset) for a hot-reloading dev server and a production `build` script.
- **Official Go WASM glue**: Ships the standard `wasm_exec.js` script from the Go toolchain to bootstrap the Go runtime (`Go` class) in the browser.

## Installation

### _Client_

```bash
cd client
npm i
npm run dev
```

The client is available on https://localhost:8080

### _Server_

```bash
cd server
npm i
npm run dev
```

The server is available on https://localhost:3000

### _Build the WASM_

```bash
cd server/go
GOOS=js GOARCH=wasm go build -o main.wasm
```

## Usage

With the server and client running (see Installation above), open the client at
https://localhost:8080. It fetches https://localhost:3000 for the compiled `main.wasm`, instantiates
it, and shows two buttons wired to the Go-exported functions:

- **"Click to say Hi in console!"** calls the Go-exported `sayHi`, which prints `Hi!` from Go into the
  browser console.
- **"Click to send a value from Client!"** calls the Go-exported `sayHello` with the current `name`
  state and a JS callback; Go invokes the callback back with `"Did you say " + message`, logged to the
  console.

To expose a new Go function, add a `js.FuncOf(...)` registration in `registerCallbacks()`
(`server/go/main.go`), rebuild the wasm binary (`cd server/go && GOOS=js GOARCH=wasm go build -o main.wasm`),
and call it from `client/src/components/App.js` the same way `sayHi`/`sayHello` are called.

<!-- portfolio-techstack:start -->

## Tech Stack

- **JavaScript**
- react
- react-dom

<!-- portfolio-techstack:end -->

## Roadmap

- [ ] Add a CI workflow that builds the WASM binary and the client bundle on every push
- [ ] Add automated tests for the exposed `sayHi`/`sayHello` Go functions
- [ ] Keep the Go, Webpack, and React toolchains current as a working `syscall/js` reference
- [ ] Work through the [ideas for pull requests](#some-ideas-for-pull-requests) below — Create React App/Vite migration, TypeScript, styling, more WASM scenarios

See the [open issues](https://github.com/phmatray/webassembly-demo/issues) for the current backlog.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Some ideas for pull requests

- Use Create-React-App
- Use TypeScript
- Style the exemple
- Add more scenarii using WebAssembly
- Write a script to install all dependencies with a single command

## Resources

- [How to take off with WebAssembly for Go in React](https://medium.freecodecamp.org/taking-off-with-webassembly-for-go-in-react-7c099bd907fa) by Chris Chuck
- [The world’s easiest introduction to WebAssembly🕹](https://medium.freecodecamp.org/webassembly-with-golang-is-fun-b243c0e34f02) by Martin Olsansky
- [Learning Golang through WebAssembly](https://www.aaron-powell.com/posts/2019-02-04-golang-wasm-1-introduction/) by Aaron Powell

## Licence

[MIT](LICENCE)
