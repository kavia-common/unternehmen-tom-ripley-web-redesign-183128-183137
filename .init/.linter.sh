#!/bin/bash
cd /home/kavia/workspace/code-generation/unternehmen-tom-ripley-web-redesign-183128-183137/unternehmen_tom_ripley_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

