# Knightly Partners Dashboard

- [brianustas.com/campus-safety-dashboard](http://brianustas.com/campus-safety-dashboard/)
- Initial release: 09/23/15
- Author: [Brian Ustas](http://brianustas.com)

This is just a prototype that I created over a week. The code is very rushed and
needs to be refactored.

## What is it?

A dashboard for campus police dispatchers that shows distressed students and the
officers that are patrolling and/or responding to incidents.

It is just a prototype but demonstrates the key value driver. All the data is
fake and randomly generated. For demonstration, many incidents are always
occurring.

This prototype only works with the latest desktop Chrome (recommended), Firefox
or Safari. Also, rendering the custom markers is expensive. Further, many things
could be optimized. It runs fine on my computer - let me know if your experience
isn't great.

## Key Features
- A live Google Maps instance around Northeastern University.
- Map update speed: 1 second
- Markers with profile pictures.
- As the student moves, their previous positions are recorded on the map.
- Officers that are following students are connected via a line.
- Hold `<space>` to increase the simulation speed.
- Press `<s>` to stop/start the simulation.
- Click on a map marker to view information about the user.
- Two side menus:
  - Live Feed Menu
    - Shows the latest event data.
  - Incidents Menu
    - Shows the currently panicked and uncomfortable students.
    - Shows the last 5 resolved student incidents.
  - Clicking on any side menu feed item will focus the map appropriately.

## What's not included?

I planned on including a "stats" menu but there's not much data to represent in
this demo. I'd recommended using this demo to showcase the key functionality and
use mockups to represent other potential features.

## Usage

First:

    npm install

For development:

    npm run dev

For production, first define:

    export KNIGHTLY_GMAPS_API_KEY=<fill-in>

To build the production output (`public/`):

    npm run prod

## Usage with Docker

First, build the Docker image:

    docker build -t knightly_partners_dashboard .

To build the production output (`public/`):

    ./docker_build_public.sh
