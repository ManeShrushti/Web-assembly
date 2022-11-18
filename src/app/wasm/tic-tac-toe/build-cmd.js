exports.cmd =
  'docker run --rm -v $(pwd):/src emscripten/emsdk emcc -Os src/app/wasm/tic-tac-toe/tic-tac-toe.c -o src/assets/wasm/tic-tac-toe.js -s ALLOW_MEMORY_GROWTH=1 -s EXTRA_EXPORTED_RUNTIME_METHODS="[\'ccall\']" -s MODULARIZE=1 -s EXPORT_NAME="TicTacToeModule"';
