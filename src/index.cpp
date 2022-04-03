#include <emscripten/bind.h>

#include "tests.h"

using namespace emscripten;

int getInt() {
    return 100;
}

EMSCRIPTEN_BINDINGS(diploma_module) {
    function("getInt", &getInt);
    function("bubbleSortTest", &bubbleSortTest);
    function("arrayOperationsTest", &arrayOperationsTest);
    function("md5Test", &md5Test);
}