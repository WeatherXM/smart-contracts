#!/bin/bash

# To allow `ctrl + c` to exit from the script
trap "exit" INT

# Create the folder if it not exist
mkdir -p ./mythril/mythril-report

# Loop each file present in `flat` folder and run mythril
for filename in $(find ./flat -name *.sol); do
	name=${filename##*/}
    echo $name
	docker run -v $PWD/./flat:/tmp mythril/myth analyze /tmp/$name --solv 0.8.18
done