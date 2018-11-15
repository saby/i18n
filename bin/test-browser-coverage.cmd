rem Run unit testing via browser

node -v
call npm install

node node_modules/istanbul/lib/cli instrument --complete-copy --output Data-covered WS.Data

@rename WS.Data data-origin
@rename Data-covered WS.Data

node test --browser --coverage

@rmdir /S /Q WS.Data
@rename data-origin WS.Data

node coverageUnusedFiles

node node_modules/istanbul/lib/cli report --dir "coverage-report" --include "**\coverage.json" html
node node_modules/istanbul/lib/cli report --dir "cobertura" --include "**\coverage.json" cobertura
