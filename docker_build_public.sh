#!/usr/bin/env bash

docker run \
  -e "KNIGHTLY_GMAPS_API_KEY=$KNIGHTLY_GMAPS_API_KEY" \
  -v $(pwd)/src:/opt/knightly_partners_dashboard/src \
  -v $(pwd)/public:/opt/knightly_partners_dashboard/public \
  knightly_partners_dashboard
