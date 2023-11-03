# examination-system
Examination system created using node.js, express.js and mongoDB with mongoose 

Steps to run this application: 


1.) In terminal, run npm i	


2.) Create config.env file in the root directory and populate it the way below

	NODE_ENV=development
 
	DB_CONNECT=YOUR_MONGODB_CONNECTION_STRING
 
	DB_PASSWORD=YOUR_MONGODB_PASSWORD
 
	LOCALHOST=127.0.0.1
 
	PORT=8080
 
	JWT_SECRET=YOUR_JWT_SECRET
 
	JWT_EXPIRES_IN=90d
 
	JWT_COOKIE_EXPIRES_IN=90
 
	EMAIL_HOST=smtp.mailtrap.io
 
	EMAIL_PORT=587
 
	EMAIL_USERNAME=YOUR_MAILTRAP_USERNAME
 
	EMAIL_PASSWORD=YOUR_MAILTRAP_PASSWORD

 
3.) Create an account on MongoDB Atlas and paste the connection string and your database password in the config.env as shown above

3.1.) Download and install MongoDB and Mongo shell and connect to database locally


4.) Run this command in terminal: node utils/import-dev-data.js --import

		This command will populate the database with data stored in .json files in dev-data folder

5.) Run this command in terminal if you want to run the application in dev environment: npm run startDev

5.1.) Run this command in terminal if you want to run the application in production environment: npm run startProd

You can use Postman and test the API

API documentation: https://documenter.getpostman.com/view/29068541/2s9YXe84q6


This application allows you to sign up and log in.
Password for all of the users imported in the database from .json file is: testpass123456


-You can sign up as a student and participate in the examination process


-After submitting a certain test, you can check your submitted tests and wait for the teacher to grade it


-If you log in as a teacher, you can see who submitted the test and which test and then you can grade it


-You can edit your profile and password. As a teacher, you can create, edit and delete tests


TODO: -FIX ERROR HANDLING

TODO: -FIX RESPONSIVITY

TODO: -ADD START DATE AND TIME FOR TEST






