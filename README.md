# examination-system
Examination system created using node.js, express.js and mongoDB with mongoose 

Steps to run this application: 


1.) In terminal, run npm init	


2.) Create config.env file in the root directory and populate it the way its shown in picture below	


![1](https://github.com/Kuki031/examination-system/assets/131341818/5976f948-ff21-4900-b25f-08dad961bd56)

 
3.) Create an account on MongoDB Atlas and paste the connection string and your database password in the config.env as shown above


4.) Run this command in terminal: node utils/import-dev-data.js --import

		This command will populate the database with data stored in .json files in dev-data folder

5.) Run this command in terminal if you want to run the application in dev environment: npm run startDev

5.1.) Run this command in terminal if you want to run the application in production environment: npm run startProd

You can use Postman and test the API

API documentation: https://documenter.getpostman.com/view/29068541/2s9YXe84q6


This application allows you to sign up and log in.


You can sign up as a student and participate in the examination process


![2](https://github.com/Kuki031/examination-system/assets/131341818/7b3f280d-58e6-471a-9523-8f42f73c3957)
![4](https://github.com/Kuki031/examination-system/assets/131341818/712d882f-3e66-4a02-aac2-49b5811aa242)

After submitting a certain test, you can check your submitted tests and wait for the teacher to grade it

![5](https://github.com/Kuki031/examination-system/assets/131341818/83403deb-8161-4d5f-b5c1-12e6513b1a80)

If you log in as a teacher, you can see who submitted the test and which test and then you can grade it
![t](https://github.com/Kuki031/examination-system/assets/131341818/e6d5b270-d94f-4263-90c3-226a3e166d21)
![gr](https://github.com/Kuki031/examination-system/assets/131341818/d08a0a51-55a8-4bf5-b23e-8eb7d43d833b)


You can edit your profile and password.As a teacher, you can create, edit and delete tests
![tt](https://github.com/Kuki031/examination-system/assets/131341818/814dc5ef-b093-46ea-8f8c-1c628fedc355)
Creating new test: 
![j](https://github.com/Kuki031/examination-system/assets/131341818/0fc92141-7e36-40bc-a2e7-87204ccc2a98)
Updating the test:
![l](https://github.com/Kuki031/examination-system/assets/131341818/83421b6c-4ace-4727-ad6a-398597e42991)
![m](https://github.com/Kuki031/examination-system/assets/131341818/14867b83-e118-42f1-97a8-1de937864d72)

TODO: -FIX ERROR HANDLING
TODO: -FIX RESPONSIVITY
TODO: -ADD START DATE AND TIME FOR TEST






