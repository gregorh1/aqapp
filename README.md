# Air Quality app
App, that fetches air condition data from several sources and display it on map. Build on: 
- node.js and express.js (with mongo db and mongoose) deployed on heroku, 
- react (cra), Leaflet (openstreetmaps), SCSS
- cordova.

### Trello board
- https://trello.com/b/WFB7sHFa/aqapp 

### Deploys: 
- http://mobiletest.me/htc_one_emulator/?u=http://devgreg.pl/projects/aqapp/ (or http://devgreg.pl/projects/aqapp/ )
- Google Play: https://play.google.com/store/apps/details?id=pl.devgreg.airqcheck

### To work with project fetch repo instal tools (listed above), install dependencies and:

- to run frontend app (with backend on heroku) in watch mode: `npm run front`
- to run just backend server: `npm run backend`
- to run boath front and backend - with backend on local: `npm run dev`
- to build react app (and copy it to cordova): `npm run build-react`
- to build or test cordova app (android, ios) run: `cordova build -h` to learn about building in cordova
