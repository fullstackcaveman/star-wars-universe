[![Netlify Status](https://api.netlify.com/api/v1/badges/dd57bb97-dabe-40b8-b358-2f0c82bed83e/deploy-status)](https://app.netlify.com/sites/suspicious-clarke-fe9f6a/deploys)

While attending Lambda School, one of our Sprint Challenges was to create a Star Wars themed React.js app using advanced styling techniques and utilizing an external API to get the Star Wars data from.

I've always been a Star Wars fan and the idea of the Star Wars app really intrigued me. I had a lot of ideas for the app but we only had 3 hours to complete it during the Sprint Challenge.

So, I built a simple Star Wars app for the Sprint Challenge and 5 days later, I started on creating the app that I envisioned.

The Star Wars App that I am currently working on is a large database full of Star Wars information that can be browsed by a simple user interface.

Originally, I was pulling data from 5 different APIs to get all the information that my app needed. This became quite tedious and problematic to set up and keep all of the information synced. I decided to take all the data from the external APIs and load it into my own MongoDB database. It was quite a chore to get the models and routes set up properly but I love a good challenge and was able to produce a great data structure to get everything meshing.

While there is a ton of data on the app now, I still need to add more. Each individual data section (ie: characters, films, planets, species, vehicles and starships) has a list of related items. I created an admin backend area that allows me to update each data point with related items so that they appear on the data point info page.

I'm also in the process of styling the app which comes with its own set of issues. Getting all information on one page per data point in a visually pleasing manner is quite the chore!

The app is deployed on Heroku at this time here: http://starwars.fullstackcaveman.com
I am finding some issues with the deployed version that is on my list to work through... There are custom routes that call data that need to be reworked to keep the app from breaking on page refresh.

FIXED ^^^^^^^^^^^^^^^^^^^^^^

More fun to come!
