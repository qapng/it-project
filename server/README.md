# Contact Saver App (BackEnd)

## About
This is the back end of our contact saver app. It was made using Nodejs and Express and Mongoose. This app works with an external mongo database to get and store data user's contacts.

## Configuration File (config.env)
The content of these files includes:
- PORTT: specify the port for running it locally
- DB: the url that is used to connect to the database
- DB_USERNAME: username credentials for connecting to database
- DB_PASSWORD: password credentials for connecting to database
- JWT_SECRET: json web token key for encrypting and decrypting user login key
- JWT_EXPIRES_IN: when the key expiress
- JWT_COOKIE_EXPIRES_IN: when the key expiress
- EMAIL_USERNAME: email that the backend use to send email for password recovery 
- EMAIL_PASSWORD: password for the email
- EMAIL_HOST: email host
- EMAIL_PORT: port for sending email

## Deployment
This project was deployed to https://davinci-server.herokuapp.com/ using Heroku. The process was completed by connecting heroku with our git repository and deploy as usual. The back end needs the environmental variables, from the configuration files to run properly. This can be done by navigating to settings then to add config vars on heroku.

## Starting the backend

1. Install the npm packages.

```bash
npm i
```
2. Run the app.

```bash
npm start
```

## npm Scripts
1. npm start: run the app
2. npm start prod: run the app in development mode

## Linting
This coding standard for this project is airbnb eslint standard. There are few exceptions and rules that we turned off. These are specified in the .eslintrcc.json

## Author
This was developed by Team Davinci, members include:
- Quang Anh Nguyen (Quang)
- May Myat Noe Htet (May)
- Soe Wei Yan Phyo (Wei)
- Alicia Christabella Andreas (Alicia)
- Caroline Tsin Kei Voo (Caroline)
