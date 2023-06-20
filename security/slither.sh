#!/bin/bash

# To allow `ctrl + c` to exit from the script
trap "exit" INT

# Create the folder if it not exist
mkdir -p ./slither/slither-report

# Loop each file present in `flat` folder and run securify
for filename in $(find ./flat -name *.sol); do
	name=${filename##*/}
    echo name
  	slither $filename --print human-summary 2>&1 | sed 's/\x1B\[[0-9;]\+[A-Za-z]//g' | tee ./slither/slither-report/$name.log
   	slither $filename 2>&1 | sed 's/\x1B\[[0-9;]\+[A-Za-z]//g' | tee ./slither/slither-report/$name-default.log
done

# Run the default slither on all contracts
slither . 2>&1 | sed 's/\x1B\[[0-9;]\+[A-Za-z]//g' | tee ./slither-report/slither.log