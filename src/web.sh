#!/usr/bin/bash

source /home/somin/emsdk/emsdk_env.sh

emcc -lembind \
     -o index.js \
     index.cpp \
     bible.cpp \
     tests.cpp \
     md5.cpp \
     -sMODULARIZE \
     -s 'EXPORT_NAME="createWasmBench"' \
     -O3

python3 -m http.server 8888 --bind 0.0.0.0