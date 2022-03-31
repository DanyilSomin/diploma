#include <emscripten/bind.h>

using namespace emscripten;

#include <cctype>

uint32_t getInt() {
    return 100;
}

EMSCRIPTEN_BINDINGS(diploma_module) {
    function("getInt", &getInt);
}