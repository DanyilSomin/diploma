#!/usr/bin/bash

mkdir ../build

g++  -o ../build/a.out \
     linux.cpp \
     tests.cpp \
     bible.cpp \
     md5.cpp \
     -O3

sudo chmod u+x ../build/a.out

../build/a.out