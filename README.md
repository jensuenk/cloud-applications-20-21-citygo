<h1 align="center">
  CityGo
</h1>

<h4 align="center">A citygame app with admin panel and API</h4>

<p align="center">
  <a href="https://app.bitrise.io/app/f8e4f5158cfde012#/builds">
    <img src="https://app.bitrise.io/app/f8e4f5158cfde012/status.svg?token=cLg-X0PmNx5LMdekTn0WvA&branch=master"
         alt="Builds">
  </a>
  <a href="https://github.com/AP-Elektronica-ICT/cloud-applications-20-21-citygo/actions?query=workflow%3A%22Deploy+to+Firebase+Hosting+on+merge%22">
    <img src="https://github.com/AP-Elektronica-ICT/cloud-applications-20-21-citygo/workflows/Deploy%20to%20Firebase%20Hosting%20on%20merge/badge.svg"
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

CityGo is a project of 5 IT students from Antwerp. The user interface was developed in react native. An admin panel has also been developed using Angular. The third part of this project is an API, which is hosted using Microsoft Azure.
With the CityGo app you can play a city game in Antwerp. There are 'sights' at various locations. You can visit these sights and collect items all over the city. You can also see other active players in the city on the map.

## Key Features

- Learn about the city trough a game
- Map with realtime userlocation 
- See other players location on a map
- Ability to cath items
- Compete with other players
- Play certain challanges depending on the users location
- Ability to register a user profile
- Profile page
- Ability to send and accept a friend requests
- Login using Oauth2
- Admin panel to control the game and user settings
- Geofencing 
- API with 3 layerd architecture


## Demo

**APP**  
TODO: Add app demo  
  
**Admin panel**  
You can find a demo of the panel [here](https://panel.citygo.xyz). It's hosted on Firebase hosting.  
Username: panel@citygo.xyz  
Password: admin  
  
**API**  
You can find a demo of the API [here](https://citygoaspbackend20201224141859.azurewebsites.net/Sights). The API is hosted on an Azure Web Service with an SQL Database. For more info on how you should use the API, navigate to <a href="#api-usage">API Usage</a>.  

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
TODO: Document commands  

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
