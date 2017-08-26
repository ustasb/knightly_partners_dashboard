#!/usr/bin/env bash

docker run \
  -v $(pwd)/src:/opt/knightly_partners_dashboard/src \
  -v $(pwd)/public:/opt/knightly_partners_dashboard/public \
  knightly_partners_dashboard \
  npm run prod
