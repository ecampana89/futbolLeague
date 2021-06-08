# ** challengeAccelOne **

This  back-end project working like an API rest service based on NodeJS and Express frameworks

## Setup & Start
1 - Install NodeJS dependecies
``` bash
npm install
```
2 - crear un archivo .env y pegar el contenido de https://gist.github.com/ecampana89/3b5a18bc79025ae7bf56e0687dc7f9e9
3 - Start the backend project using the `'default'` configuration
``` bash
npm run start
```
4 - Check if the service status is up using curl
``` bash
curl -XGET http://localhost:3000
# {"success":true,"code":200,"messages":["Back-end is up in 'developer' mode!"]}
```
##  use
### import
GET http://localhost:3000/api/v1/league/import?code=PPL
### import
GET http://localhost:3000/api/v1/league?code=PPL


## goals
The goal is to create a basic but functional project that exposes a REST API.
What should this API do?
We’ll be hitting http://www.football-data.org/ API (you can see the documentation in the site, use the API v2) 
to populate the data locally and then expose it.
Import League:
There should be 2 endpoints :
 1) importLeague, that takes a leagueCode as input, 
    pull the data from the source API and populate the DB.
 2) getLeague, that takes a leagueCode as input and return a response with all its related data
The import league implementation must get data using the given {leagueCode}, 
by making requests to http://www.football-data.org/ API, and import the data into a DB. 
Any SQL or NoSQL DB can be used, as long as there are clear instructions 
on how to run the project locally as well as an explanation for the decision in the README.
The data we’re importing is:
Competition ("name", "code", "areaName")
Team ("name", "tla", "shortName", "areaName", "email")
Player ("name", "position", "dateOfBirth", "countryOfBirth", "nationality")
Feel free to add to this data structure any other field that you might need.
