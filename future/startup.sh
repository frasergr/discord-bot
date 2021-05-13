#!/bin/bash

# cp -r /home/node/cache/frontend/node_modules/. /home/node/app/frontend/node_modules/
cp -r /home/node/cache/backend/node_modules/. /home/node/app/node_modules/

exec npm run dev