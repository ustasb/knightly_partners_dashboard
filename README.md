# Knightly Partners Dashboard

This is just a prototype and I created it over a weekend. The code is very
rushed and needs to be refactored.

Initial release: 09/23/15

## What is it?

A dashboard intended for a campus police dispatcher that shows students in
panic or uncomfortable, and the officers that are patrolling and/or responding to
incidents.

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

    npm install -g webpack webpack-dev-server
    npm install

For development:

    npm run dev

For a production build:

    npm run prod

## Usage with Docker

First, build the Docker image:

    docker build -t knightly_partners_dashboard .

To build the production output (`public/`):

    ./build_public.sh
