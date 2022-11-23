# onlineShop
Online Shop project with a front and back end using NodeJs, MongoDb, Amazon S3 and dockerized 


## Description 
This is a project for an online Shop with a backend implemented to store products, shopppings carts, orders and sessions.  The user can shop for items without an account
but in order to place a order they need to sign in  and log in with the credentials. One can also become an admin user in that case, one can manage  the store mainly adding,
editing or deleting products  or orders. The project also uses "Stripe" for handling payments.
For the database component, this project uses MongoDb for storing products, users, orders, etc. The images for every product are stored in a AWS S3 bucket and then the link
is stored in the collection products. 
For deployment, I encountered some issues doing it directly from git so I decided to first dockerized. From there, the deployment went smoothly. 


## Requirements 
You will need an AMAZON S3 bucket, a MongoDb connection String and a Stripe key. 
Replace the value in the following file

  **MongoDb connection string:**  
  - Config -> sessions
  * Data -> database 
  + docker-compose.yml
  
  **Stripe key**
  - Controllers -> orders.controllers
  
  **AWS S3 bucket**
  - Middlewares -> imageUpload
  
## Steps for installing and running the project

    1.Clone this repo
    2.Replace values described previously
    3.Run npm install
    4.Run npm start
    
    


