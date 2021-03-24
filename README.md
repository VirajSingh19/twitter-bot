# Twitter Bot

## Introduction

Every thirty minutes this bot :

1. Syncs [@VirajSingh110](https://twitter.com/VirajSingh110) account's followers and followings into mongodb.

2. Syncs the tweets made by [@VirajSingh110](https://twitter.com/VirajSingh110) account's followers.

3. Makes a tweet tagging a random follower of 
[@VirajSingh110](https://twitter.com/VirajSingh110)


## Installation

Step 1:
```bash
npm install
```

Step 2:

create a .env file take a look at .env.example file for contents or request .env file from virajsingh5897@gmail.com 


## Usage

```bash
npm start
```

API Endpoints

GET Followers:   {{baseUrl}}/api/followers?skip=0&limit=10

GET Followings:   {{baseUrl}}/api/followings?skip=0&limit=10

GET Tweets:   {{baseUrl}}/api/tweets?skip=0&limit=10


## Live On Heroku
https://virajsingh.herokuapp.com/

## License
[MIT](https://choosealicense.com/licenses/mit/)