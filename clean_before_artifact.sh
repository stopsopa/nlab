
set -x
rm -rf .github
rm -rf .husky
rm -rf playwright-report
rm -rf .vscode
rm -rf bash
rm -rf controller
rm -rf docker
rm -rf .vscode
rm -rf .env*
rm -rf package.json

/bin/bash jasmine/clean_node_modules.sh 

echo 'after clean_before_artifact'

ls -la