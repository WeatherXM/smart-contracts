#!/bin/bash

# To allow `ctrl + c` to exit from the script
trap "exit" INT

# Create the folder if it not exist
mkdir -p ./flat

for i in $(find ./src -name *.sol); do 
    echo ${i##*/}
    forge flatten --output ./flat/${i##*/} $i
done