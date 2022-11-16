#include <math.h>
#include<stdio.h>
#include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
int int_sqrt(int x) {
  return sqrt(x);
}