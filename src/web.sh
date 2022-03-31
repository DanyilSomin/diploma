#!/usr/bin/bash

source /home/somin/emsdk/emsdk_env.sh

emcc -lembind -o main.js main.cpp -sMODULARIZE -s 'EXPORT_NAME="createWasmBench"'

python3 -m http.server