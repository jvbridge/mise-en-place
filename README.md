# Mise-en-Place

A time managment application that allows for user to have everything they need in one place. The application lets users create a checklist with to do's, view their dashboard with today's events, as well as view a calendar that they can add events to.

## Getting Started

Simply just visit the deployed link at the bottom, sign up with an email and password to make an account. You will not be able to access any other pages if you are not logged in.

### Prequisites

There are no prequisites needed if you are using the website from the deployed link. If you are cloning and installing the repositroy, see "Installation" for more details.

### Installation

To install this website, the first thing you want to do is navigate to the repository on GitHub. Once there, hit the "Code" button and copy the link provide. You then want to open Bash on you machine

```
git clone
```

follwed by the link you just got. You should have the repository on your system now. Once that is done, you want to navigate to the directory the repository is in. After you are there, you want to run the folllowing code:

```
npm install
```

This will install all of the node modules required to run this program. After this, you need to open mySql. This is done by typing

```
mySQL -u root -p
```

while you are still in the repositroy folder. It was prompt you for a password which should be "password". Once that is done, you should see a message saying you are logged in. From there, you want to copy the contents of the file named "schema.db" and paste that into your bash and hit enter. It should give you a message saying "OK". That mean's you have succesfully created the database. From there, you want to exit mySQL by typing the word "quit". You can now type in

```
npm start
```

and wait for a message saying "Server running on port 3001". This means the app should be running on your local machine! You can access it by using Insomnia or your browser and using the link

```
localhost:3001
```

You should fully be able to use the application now!

## Built With

- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Bootstrap](https://getbootstrap.com/)
- [Handlebars](https://handlebarsjs.com/)
- [Node](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [Sequelize](https://sequelize.org/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Express Session](https://www.npmjs.com/package/express-session)
- [Full Calendar](https://fullcalendar.io/)

## Preview

![Mise en Place Screen Shot](http://url/to/img.png)

## Deployed Link

- [Mise en Place](https://mise-en-place-planner.herokuapp.com/)

## Authors

Maitreya Carmen

- [GitHub](https://github.com/Miacarmen)

Jonathan Bridge

- [GitHub](https://github.com/jvbridge)

Devin Nguyen

- [GitHub](https://github.com/kuyadevin)

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
