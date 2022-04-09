#include <iostream>
#include <array>
#include <functional>
#include <algorithm>

#include "tests.h"


extern std::string bible;

const std::array<const std::function<float(void)>, 16> tests
{
    arrayOperationsTest, bubbleSortTest, findPrimeTest, md5Test,
    md5Test, arrayOperationsTest, bubbleSortTest, findPrimeTest,
    findPrimeTest, md5Test, arrayOperationsTest, bubbleSortTest,
    bubbleSortTest, findPrimeTest, md5Test, arrayOperationsTest
};

int main()
{
    float time = 0;
    for (int i = 0; i < tests.size(); ++i)
    {
        time += tests[i]();
    }

    std::cout << time << '\n';
}