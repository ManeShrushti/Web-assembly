exports.cmd =
  'docker run --rm -v $(pwd):/src emscripten/emsdk emcc -Os src/app/wasm/console-logger/console-logger.c -o src/assets/wasm/console-logger.js -s ALLOW_MEMORY_GROWTH=1 -s EXTRA_EXPORTED_RUNTIME_METHODS="[\'ccall\']" -s MODULARIZE=1 -s EXPORT_NAME="ConsoleLoggerModule"';
