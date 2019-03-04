[![Build Status](https://travis-ci.com/Realtime-josh/EPIC_Mail.svg?branch=develop)](https://travis-ci.com/Realtime-josh/EPIC_Mail)
[![Maintainability](https://api.codeclimate.com/v1/badges/a0486eea2f1e5fa4df8e/maintainability)](https://codeclimate.com/github/Realtime-josh/EPIC_Mail)
[![Coverage Status](https://coveralls.io/repos/github/Realtime-josh/EPIC_Mail/badge.svg?branch=develop)](https://coveralls.io/github/Realtime-josh/EPIC_Mail?branch=develop)
[![Coverage Status](https://coveralls.io/repos/github/Realtime-josh/EPIC_Mail/badge.svg)](https://coveralls.io/github/Realtime-josh/EPIC_Mail)
# EPIC_MAIL
EPIC Mail is an internet web based messaging application designed to serve user needs. It allows users to send messages to individuals signed up to its platform and encourages group messaging via mails.

# Features
* Users can sign up.
* Users can login.
* Users can create groups.
* Users can send a message to individuals.
* Users can view their inbox and read messages.
* Users can retract sent messages.
* Users can save an email as draft and send it later or delete it.

# Github Pages
* https://realtime-josh.github.io/EPIC_Mail/index.html

# Heroku App
* https://protected-badlands-67908.herokuapp.com/

# Project Management
* https://www.pivotaltracker.com/n/projects/2314491
## Running App
* Install Node.js on your computer and run the command: "npm start" at the root directory of the project.
# Testing
* Run "npm test" at the root directory of the project.
# API Routes
| Endpoint  | Functionality | Notes |
| ------------- | ------------- |------------- |
|POST /api/v1/contacts/createaccount|Register a user |This endpoint creates a new user.
|POST /api/v1/contacts/signin|Login a user |
|POST /api/v1/message/sendmessage  | Send email to individuals  | Should send email to signed up users|
|GET /api/v1/message/receivedmessages/:id|Fetch all received emails for user|Get all received email in inbox.User must supply the id parameter equivalent to unique userId|
|GET /api/v1/message/sentemails/:id|Fetch all sent emails peculiar to user|Get all sent items in user outbox using the id|
|GET /api/v1/message/unreadmails/:id|Fetch all unread messages|Fetch unread messages in user inbox.User must supply the id parameter equivalent to userId|
|GET /api/v1/message/email/:id|Fetch a specific user email|Fetch a user's email.|
|DELETE /api/v1/message/email/:id|Delete an email from inbox.|