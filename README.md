# Angular & WebAssembly

This project shows how WebAssembly could be used in Angular in form of components and helper services. The examples are written in C/C++ and compiled to WebAssembly using [Emscripten](https://emscripten.org).

You can find the following examples:

- **Fibonacci** shows the "raw" communication between JavaScript and WebAssembly without using Emscripten's glue code. Inspired by [devlucky](https://hackernoon.com/how-to-get-a-performance-boost-using-webassembly-8844ec6dd665), the example demonstrates the performance difference between JavaScript and WebAssembly when calculating Fibonacci series using three different implementations.
- **Tic Tac Toe** Simple 2player game of tic-tac-toe which is binded with C program to do the permutations of the game and find the result of the game.
- **Text-to-ASCII** allows you to convert text to ASCII art on the fly.
- **BPM-to-ASCII** allows you to convert simple bitmaps to ASCII art.
- **3D Cube** shows how you can render 3D graphics using OpenGL (which is then converted to WebGL) and manipulate it on the fly.
- **Proof of Work** is a simple [Proof of Work](https://en.bitcoin.it/wiki/Proof_of_work) system (similar to the one used in bitcoin), which demonstrates activities that might take long time to complete.
- **Person Record** shows how to pass complex data between JavaScript and WebAssembly.

## Build

You need Docker installed on your machine to compile the C/C++ examples to WebAssembly.  

To build the demo locally run:

```
npm i
npm run wasm
npm start
```

Then you can open your browser at `http://localhost:4200` to see it.
