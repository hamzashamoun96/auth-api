# auth-api

## Setup
* First creating the repository on github.
* Clone it on the local machine.
* npm i express dotenv cors morgan jest nodemon mongoose supertest or @code-fellows/supergoose base-64 bcrypt jsonwebtoken.
* Create the needed directories and files for the application.

## DataBase 
MongoDB
## The end points for the Application

* ( api/v2/signup ) with the POST method to save username and password in the database and generate a token for the user.
* ( api/v2/singin ) with the POST method to access the profile after validate the username and the password.
* ( api/v2/users ) with the get method to login without rewrite the username and password based on the token.

* ( api/v2/food or clothes) with the GET method to get all the food in the database it is able to all users.
* ( api/v2/food or clothes) with the POST to create a food in the database it is able to the admin and editor.
* ( api/v2/food or clothes /:id ) with the GET method to get one food by id it is able to all users.
* ( api/v2/food or clothes /:id ) with the PUT method to update one food by id it is able to admin and editor.
* ( api/v2/food or clothes /:id ) with the DELETE method to delete one food by id it is only able to the admin.

* ( api/v1/food or clothes) with the GET method to get all the cloth in the database.
* ( api/v1/food or clothes ) with the POST to create a colth in the database.
* ( api/v1/food or clothes/:id ) with the GET method to get one cloth by id.
* ( api/v1/food or clothes/:id ) with the PUT method to update one cloth by id.
* ( api/v1/food or clothes/:id ) with the DELETE method to delete one cloth by id.


## Middleware in the Application 
* morgan.
* basicAuth to validate the password.
* bearerAuth to verify token.

## Heroku Deploying Url's

[Heroku v1](https://hamza-api-server.herokuapp.com/api/v1)<br>
[Heroku v2](https://hamza-auth-api.herokuapp.com/api/v2)<br>

## Github Test
[Github Actions](https://github.com/hamzashamoun96/auth-api/actions)

## Github Pull Request
[Pull Request](https://github.com/hamzashamoun96/auth-api/pull/1)

## Test
* for testing the application run the command npm test.

## UML 
![uml](/uml.png)
## WRRC
![wrrc](/wrrc.png)