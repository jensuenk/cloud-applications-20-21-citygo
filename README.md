<h1 align="center">
  CityGo
</h1>

<h4 align="center">A city game app with API and admin panel</h4>

<p align="center">
  <a href="https://github.com/AP-Elektronica-ICT/cloud-applications-20-21-citygo/actions?query=workflow%3A%22Deploy+to+Firebase+Hosting+on+merge%22">
    <img src="https://github.com/AP-Elektronica-ICT/cloud-applications-20-21-citygo/workflows/Panel%20Deploy/badge.svg"
         alt="Panel Build">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg"
         alt="License">
  </a>
</p>

<p align="center">
  <a href="#about">About</a> •
  <a href="#key-features">Key Features</a> •
  <a href="#demo">Demo</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#api-usage">API Usage</a> •
  <a href="#contributions">Contributions</a> •
  <a href="#more-info">More info</a> •
  <a href="#license">License</a>
</p>

## About

CityGo is a project created by 5 IT students from Antwerp. With the CityGo app you can play a city game in Antwerp. The app has a map on which various monuments or sights are indicated which you can visit. Every sight has a challenge you need to complete. When completing a challenge you get rewarded with an item which has something to do with the city Antwerp. In addition to this, there are also various items scattered around the map which you can collect. The goal is to collect as many items and complete as many challenges as you can while exploring the city. Besides that you can also see other active players in the city on the map, so you can team up or compete with others and make friends inside the app.

This project consists of 3 parts. The app itself with an API in the backend and a panel to manage the game. The app is developed in react native, the API is an ASP.NET Core API, and the admin panel is developed with Angular and the [ngx-admin](https://github.com/akveo/ngx-admin) library.

## Key Features

- Learn about the city trough a game
- Map with realtime userlocation
- See other players's location on a map
- Ability to catch items
- Compete with other players
- Play certain challanges depending on the users location
- Ability to register a user profile
- Profile page
- Ability to send and accept a friend requests
- Geofencing
- Login using Auth0
- Admin panel to control the game and user settings
- API with clean code architecture

## Demo

**Admin panel**  
You can find a demo of the panel [here](https://panel.citygo.xyz). It's hosted on Firebase hosting.  
Username: panel@citygo.xyz  
Password: admin

**API**  
You can find a demo of the API [here](https://citygo-ap.azurewebsites.net/Sights). The API is hosted on an Azure Web Service with an SQL Database. For more info on how you should use the API, navigate to <a href="#api-usage">API Usage</a>.

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer.

**Run the app on your device**  
You will also need [Expo](https://docs.expo.io) to be able to run the app on your device. Start with downloading the Expo client app from the [Andriod Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) or form the [iOS App Store](https://apps.apple.com/nl/app/expo-client/id982107779). Expo client allows you to open up apps that are being served through Expo CLI.

```bash
# Clone the repository (if you havn't done this yet)
$ git clone https://github.com/AP-Elektronica-ICT/ap-valley-20-21-apv12/

# Move into the app folder
$ cd ap-valley-20-21-apv12/CityGoApp

# Install the expo-cli globally
$ npm install --global expo-cli

# Start expo
$ expo start

# Scan the QR code with the expo-client app or emulate the app
```

**Setup the admin panel**  
The admin panel acts as an interface between you and the API. This allows you to manage sights, challenges, items and users without having to run a single request.

```bash
# Clone the repository (if you havn't done this yet)
$ git clone https://github.com/AP-Elektronica-ICT/ap-valley-20-21-apv12/

# Move into the panel folder
$ cd ap-valley-20-21-apv12/AdminPanel

# Install dependencies
$ npm install

# Run the app on your browser
$ npm start
```

**Setup the API**  
You will need Visual Studio 2019 and .NET Core 3.1 to run the API.

```bash
# Clone the repository (if you havn't done this yet)
$ git clone https://github.com/AP-Elektronica-ICT/ap-valley-20-21-apv12/

# Open the CityGoASPBackEnd folder with Visual Studio
```

## API Usage

The API is made with ASP.NET CORE 3.1 written in the clean code architecture.  
Here you can find all possible requests which get handled by the API:

<details>
  <summary>Challenges requests</summary>
  
  Get all challenges without relations  
  ```http
  GET /Challenges
  ```
  Get a challenge by id without relations  
  ```http
  GET /Challenges/{cid}
  ```
  Get a challenge by id with the relation of items  
  ```http
  GET /Challenges/{cid}/Items
  ```
  Get a challenge by id with the relation of sights  
  ```http
  GET /Challenges/{cid}/Sights
  ```
  Create a challenge  
  ```http
  POST /Challenges
  ```
  Update a challenge  
  ```http
  PUT /Challenges
  ```
  Create a relation with an item to a challenge  
  ```http
  PUT /Challenges/{cid}/Items/{iid}
  ```
  Create a relation with a sight to a challenge  
  ```http
  PUT /Challenges/{cid}/Sights/{sid}
  ```
  Delete a challenge by id  
  ```http
  DELETE /Challenges/{cid}
  ```
  _cid = challengeId, sid = sightId, uid = userId, iid = itemId_
</details>
<details>
  <summary>Items requests</summary>
  
  Get all items without relations  
  ```http
  GET /Items
  ```
  Get an item by id without relations  
  ```http
  GET /Items/{iid}
  ```
  Create an item  
  ```http
  POST /Items
  ```
  Update an item  
  ```http
  PUT /Items
  ```
  Delete an item by id  
  ```http
  DELETE /Items/{iid}
  ```
  _iid = itemId_
</details>
<details>
  <summary>Sights requests</summary>
  
  Get all sights without relations  
  ```http
  GET /Sights
  ```
  Get all sights with all relations  
  ```http
  GET /Sights/All
  ```
  Get a sight by id without relations  
  ```http
  GET /Sights/{sid}
  ```
  Get a sight by id with the relation of challenges  
  ```http
  GET /Sights/{sid}/Challenges
  ```
  Create a challenge  
  ```http
  POST /Sights
  ```
  Update a sight  
  ```http
  PUT /Sights
  ```
  Delete a sight by id  
  ```http
  DELETE /Sights/{sid}
  ```
  _sid = sightId_
</details>
<details>
  <summary>Users requests</summary>
  
  Get all users without relations  
  ```http
  GET /Users
  ```
  Get all users with all relations 
  ```http
  GET /Users/All
  ```
  Get all users with all their friends 
  ```http
  GET /Users/Friends
  ```
  Get a user by id without relations  
  ```http
  GET /Users/{uid}
  ```
  Get a user by id with the relation of items  
  ```http
  GET /Users/{uid}/Items
  ```
  Get a user by id with the relation of challenges  
  ```http
  GET /Users/{uid}/Challenges
  ```
  Get a user by id with the relation of friends  
  ```http
  GET /Users/{uid}/Friends
  ```
  Get a user by id with the relation of friend requests
  ```http
  GET /Users/{uid}/FriendRequests
  ```
  Create a user  
  ```http
  POST /Users
  ```
  Update a user  
  ```http
  PUT /Users
  ```
  Create a relation with an item to a user  
  ```http
  PUT /Users/{uid}/Items/{iid}
  ```  
  Create a relation with a challenge to a user  
  ```http
  PUT /Users/{uid}/Challenges/{cid}
  ```
  Create a relation with a friend to a user  
  ```http
  PUT /Users/{uid}/Friends/{fid}
  ``` 
  Create a relation with a friend request to a user  
  ```http
  PUT /Users/{uid}/FriendRequests/{fid}
  ```
  Delete a user by id  
  ```http
  DELETE /Users/{uid}
  ```
  Get a user by email  
  ```http
  GET /Users/{email}/Email
  ```
  Change profile picture of a user 
  ```http
  PUT /Users/ProfilePicture
  ```
  _cid = challengeId, sid = sightId, uid = userId, iid = itemId, fid = friendId_
</details>

## Contributions

This project has been made possible by:

- [Maximilian Senten](https://github.com/BePotato)
- [Jan Boeckx](https://github.com/jb500)
- [Philip De Rudder](https://github.com/PhilipDeRudder)
- [Stef Martens](https://github.com/stef2607)
- [Jens Uenk](https://github.com/jensuenk)

## More info

- [Azure DevOps](https://dev.azure.com/s107714/CloudApplictions%20CityGo/_dashboards/dashboard/fdc8c4c4-f96d-44ac-abaa-803af60584f3) - Our Azure DevOps board

## License

MIT

---

> GitHub [@cloud-applications-20-21-citygo](https://github.com/AP-Elektronica-ICT/cloud-applications-20-21-citygo)
