#!/bin/sh

rm -rf public

NODE_ENV=production ./node_modules/.bin/webpack -p --config webpack.production.config.js

cp -r src/favicons src/index.html public

sed_cmd='-e "s/\(maps\/api\/js\)/\1?key=$KNIGHTLY_GMAPS_API_KEY/" public/index.html'
if [[ $(uname) == 'Darwin' ]]; then
  sed_cmd="sed -i '' $sed_cmd"
else
  sed_cmd="sed -i $sed_cmd"
fi
eval $sed_cmd
