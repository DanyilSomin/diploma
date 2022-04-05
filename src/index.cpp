#include <emscripten/bind.h>

#include "tests.h"

using namespace emscripten;

EMSCRIPTEN_BINDINGS(diploma_module) {
    function("findPrimeTest", &findPrimeTest);
    function("bubbleSortTest", &bubbleSortTest);
    function("arrayOperationsTest", &arrayOperationsTest);
    function("md5Test", &md5Test);
}