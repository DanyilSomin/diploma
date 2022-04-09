#!/usr/bin/bash

mkdir ./build

g++  -o ./build/a.out \
     -std=c++17 \
     ./src/linux.cpp \
     ./src/tests.cpp \
     ./src/bible.cpp \
     ./src/md5.cpp \
     -O3

sudo chmod u+x ./build/a.out

./build/a.out