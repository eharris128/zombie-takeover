This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Quick Overview

The goal of this project is to create a react based frontend webpage that displays critical information in a visually appealing and functional way.

## Technical Requirements

- NodeJS > 6.x
- Git
- create-react-app open source boilerplate


## Submission Requirements
- A working dashboard displaying all the data in a performant/clean UI/UX
- A git project with all dependencies included in package.json


## Project Summary
Zombies have taken over the city! You've been tasked with creating a Zombie watch dashboard to keep tabs on the zombies walking in the city. Quickly parse the json file to find out who is still human and who you need to quarantine.

The walkers.json file contains the "people" to display.
Display all "people" in a tabular format with the columns 
- "Full Name"
- "Status"
- "Age"
- "Company"

Status should be displayed as a color coded tag

human(green)
bitten(yellow)
dead(black)
walker(red)

## Bonus
A mapbox map displaying all the "people" from walkers.js


#Deployment

https://blog.heroku.com/deploying-react-with-zero-configuration

Create a branch and deploy to Heroku. Requires Heroku CLI.

heroku create -b https://github.com/mars/create-react-app-buildpack.git

git push heroku master

heroku open

