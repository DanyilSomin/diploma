#include "tests.h"

#include <cstdlib>
#include <chrono>
#include <vector>
#include <algorithm>
#include <string>

#include "md5.h"

float bubbleSortTest()
{
    srand(time(0));

    static constexpr int LEN = 10'000;
    float arr[LEN];
    for (int i = 0; i < LEN; ++i)
    {
        arr[i] = rand() / (float)RAND_MAX;
    }

    const auto start = std::chrono::steady_clock::now();

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

    const auto end = std::chrono::steady_clock::now();

    return std::chrono::duration_cast<std::chrono::nanoseconds>(end - start).count() / 1'000'000.0;
}

float arrayOperationsTest()
{
    srand(time(0));

    const auto start = std::chrono::steady_clock::now();

    static constexpr int LEN = 10'000;
    std::vector<int> vec;
    vec.reserve(LEN);

    std::generate_n(std::back_inserter(vec), LEN, []() { return rand(); });

    std::sort(vec.begin(), vec.end());

    int sum = 0;
    for (auto n : vec)
        sum += n;

    if (!sum) return 0;

    const auto end = std::chrono::steady_clock::now();

    return std::chrono::duration_cast<std::chrono::nanoseconds>(end - start).count() / 1'000'000.0;
}

float md5Test()
{
    extern std::string bible;

    const auto start = std::chrono::steady_clock::now();

    const auto md5Str = md5(bible);

    const auto end = std::chrono::steady_clock::now();

    return std::chrono::duration_cast<std::chrono::nanoseconds>(end - start).count() / 1'000'000.0;
}

float findPrimeTest()
{
    const auto start = std::chrono::steady_clock::now();

    static constexpr int LEN = 10'000;
    
    int currentNumber = 0;
    int primesAmount = 0;
    while (primesAmount < LEN)
    {
        currentNumber += 1;

        bool prime = true;
        const auto searchUntil = currentNumber / 2 + 1;
        for (int i = 2; i < searchUntil; ++i)
        {
            if (currentNumber % i == 0)
            {
                prime = false;
                break;
            }
        }

        if (prime)
            primesAmount += 1;
    }

    const auto end = std::chrono::steady_clock::now();

    return std::chrono::duration_cast<std::chrono::nanoseconds>(end - start).count() / 1'000'000.0;
}