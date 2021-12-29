<div id="top"></div>
<!-- PROJECT LOGO -->
<br />
<h3 align="center">Nine-Grid React App</h3>

  <p align="center">
This application mainly utilizes React hooks to re-render the page and store user-inputted sequences to an API. When the user enters a 9-digit number sequence, the 3x3 grid updates to reflect the user's input, and the sequence is saved externally.
</div>

### Installation Instructions

The entire application has been deployed to Heroku and can be viewed here: https://nine-grid.herokuapp.com/
<br />
To run the application from your machine locally:
1. Open the nine-grid folder in your IDE
2. Install the necessary packages / dependencies:<br />
Node package manager
```
npm install -g npm
```
React-router-dom
```
npm install react-router-dom --save
```
Axios
```
npm add axios
```
Run the application
```
npm start
```

### Technologies used

* HTML5
* CSS3
* JavaScript
* React.js

### Description / Features

* Use of React hooks
* Manual input validation via JS logic and alerts
* Use of Axios library for various fetching methods (GET, POST, PUT, DELETE)
* Saving of latest 3 user-inputted sequences to external API
* Reset button that re-renders page and fully clears API
* Final app and subsequent edits connected and deployed to Heroku

### Possible Improvements

* Re-factor inefficient code
* Improve validation somehow, prevent user from typing invalid sequences at all
* Improve the way data is handled and then re-rendered to page
* Fix minor remaining bugs
