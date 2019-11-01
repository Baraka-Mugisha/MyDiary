# MyDiary
MyDiary is an online journal where users can pen down their thoughts and feelings.

[![Build Status](https://travis-ci.org/mugishaje/MyDiary.svg?branch=develop)](https://travis-ci.org/mugishaje/MyDiary)
[![Coverage Status](https://coveralls.io/repos/github/mugishaje/MyDiary/badge.svg?branch=develop)](https://coveralls.io/github/mugishaje/MyDiary?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/c0b7f8951e06a34104e1/maintainability)](https://codeclimate.com/github/mugishaje/MyDiary/maintainability)


Here is the link to the website heroku app [https://my-diary-adc.herokuapp.com/](https://my-diary-adc.herokuapp.com/).

MyDiary is an online journal where users can pen down their thoughts and feelings. It provieds the user with functional features regarding Diary entries.

`## What does it do?`
- Users can **sign up**
- Users can **sign in**
- Users can **view all entries** showing the most recently created first
- Users can **write** and/or **share** entries 
- Users can **edit** their entries
- Users can **delete** their entries
- Users can **view** a specific entry

# UI TEMPLATE

## How to Find it

Here is the link to the website UI [link](https://mugishaje.github.io/MyDiary/UI/)

## Usage

- After you've reached the link you get the homepage.

- You can also contact us by filling the needed info in the `contact` section on the home page.

- Click on `Get started` to get to the Signing up page
- From there click `Create account` to get to the login page

- And from the login page, click `Log in` to get to the User Dash Board

- You can view the specific entry in your diary  by clicking one entry (div)  if you have arleady created one

# API (still in development)

## Tools:

- Server-side Framework: **Node/Express**
- Linting Library : **Eslint**
- Style Guide : **Airbnb**
- Testing Framework :**Mocha** with **chai**

---

## Other Tools:

- Travis CI for continous intergration
- Babel transpiler for javascript ES6
- nyc for test coverage

---

# Installation:

**Follow the step below:**

If you do not have node.js and git in your computer, install them first:

- download [node.js](https://nodejs.org/en/download/)

- download [git](https://git-scm.com/downloads)

Clone this project using:

```
$ git clone https://github.com/mugishaje/MyDiary.git
```

to install all dependencies required for this project run the below command in your terminal:

```
npm install
```

to start the server run the below command in your terminal

```
npm start
```

or

```
npm dev-start
```

to run the tests for this project run the below command in your terminal

```
npm test
```

---


Below is a list of API Endpoints you will find:

- **POST/auth/signup** : To sign up an User

- **POST/auth/signin** : Log in an User

- **POST/entries** : Creating a new entry

- **GET/entries** : Get all entries order from the recent

- **GET/entries/:entryID** : Viewing a specific entry

- **PATCH/entries/:entryID** : Modifying an entry

- **DELETE/entries/:entryID** : Deleting an entry

---

## Contribute

---

- To contribute to this project, clone and install the app as instructed above. Then create a new branch off the develop branch on which to make your changes.

- After you're done with the changes, push them upstream to my repo on that same branch and create a pull request and i will consider them.

## Instructions:

navigate to the MyDiary folder and in your terminal, type:

```
git checkout -b branchnameforyourchanges
```

then after making the changes, type:

```
git add .
```

then

```
git commit -m "your commit message"
```

and push like so

```
git push origin branchnameforyourchanges
```

# Author:

**Baraka Uwimana**

[Baraka-uwimana](http://github.com/mugishaje/) - Github

gitegob7@gmail.com - GMAIL
