#include <emscripten/bind.h>

using namespace emscripten;

#include <cctype>
#include <chrono>
#include <cstdlib>

uint32_t getInt() {
    return 100;
}

int bubbleSortTest()
{
    static constexpr int LEN = 10'000;
    int arr[LEN];
    for (int i = 0; i < LEN; ++i)
    {
        for (int j = i + 1; j < LEN; ++j)
        {
            if (arr[j] < arr[j - 1])
            {
                int temp = arr[j];
                arr[j] = arr[j - 1];
                arr[j - 1] = temp;
            }
        }
    }
}

EMSCRIPTEN_BINDINGS(diploma_module) {
    function("getInt", &getInt);
}