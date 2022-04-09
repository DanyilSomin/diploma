#!/usr/bin/bash

source /home/somin/emsdk/emsdk_env.sh

emcc -lembind \
     -o ./public/index.js \
     ./src/index.cpp \
     ./src/bible.cpp \
     ./src/tests.cpp \
     ./src/md5.cpp \
     -sMODULARIZE \
     -s 'EXPORT_NAME="createWasmBench"' \
     -O3

# python3 -m http.server 8888 --bind 0.0.0.0 --directory ./src