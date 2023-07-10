set -e # exit on error

npm run generate:testing-data

# generates lcov.info
forge coverage --ffi --report lcov

# generates coverage/lcov.info
npx hardhat coverage

# Foundry uses relative paths but Hardhat uses absolute paths.
# Convert absolute paths to relative paths for consistency.
sed -i -e 's/\/.*solidity.//g' coverage/lcov.info

# Merge lcov files
lcov \
    --rc lcov_branch_coverage=1 \
    --add-tracefile coverage/lcov.info \
    --add-tracefile lcov.info \
    --output-file ./coverage/lcov.info

# Filter out node_modules, test, and mock files
lcov \
    --rc lcov_branch_coverage=1 \
    --remove ./coverage/lcov.info \
    --output-file filtered-lcov.info \
    "*node_modules*" "*test*" "*mock*"

# Generate summary
lcov \
    --rc lcov_branch_coverage=1 \
    --list filtered-lcov.info

# Open more granular breakdown in browser
if [ "$CI" != "true" ]
then
    genhtml \
        --rc genhtml_branch_coverage=1 \
        --output-directory coverage \
        filtered-lcov.info
    open coverage/index.html
fi