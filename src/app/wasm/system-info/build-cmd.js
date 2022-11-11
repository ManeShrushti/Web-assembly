exports.cmd =
  'docker run --rm -v $(pwd):/src emscripten/emsdk em++ -Os src/app/wasm/system-info/system-info.cpp -o src/assets/wasm/system-info.js --preload-file src/app/wasm/system-info/system-info.font.txt -s EXTRA_EXPORTED_RUNTIME_METHODS="[\'ccall\']" -s MODULARIZE=1 -s EXPORT_NAME="SystemInfoModule"';
