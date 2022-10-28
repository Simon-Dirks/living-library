# The Living Library

## The human face of academia

The Living Library is an interactive platform made to help you orient yourself in the academic literature speaking about education in connection with the pandemic. While other search tools that have been created to date are run by algorithms and aim to be comprehensive, extracting and visualising quantitative data, the Living Library takes a complementary approach: it invites you to get to know a sampled part of the literature from an interpretive, human perspective.

## It's alive!

The library is a small-scale project run by a team of devoted teachers, students and researchers. The thematic organisation of articles is based on continuous qualitative analyses of the literature with a coding scheme that evolves along with the academic conversation. Our aim is to identify and help others integrate the various red threads running through the literature. Throughout the aftermath of the pandemic, we will keep a finger on the pulse, asking: what has happened, what is happening now, and what matters? In the Living Library, you can explore overall themes in the literature in a connective manner and observe how the academic conversation changes over time.

## Contact us

We invite you to write to us with ideas, questions, praise and criticism on the Living Library: livinglibrary@uu.nl.

# Running the application

The Living Library is built using [Vue](https://vuejs.org/) and [Ionic](https://ionicframework.com/).

To run the application on your own machine, you will need to install [Node.js](https://nodejs.org/en/) first.

## Initial setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

# Configuration

Most easily tweakable settings can be found in `src/config.js`.

## Prerequisites

1. Install [Node.js](https://nodejs.org/en/) on your machine.
2. Install the [Firebase CLI](https://firebase.google.com/docs/cli#mac-linux-npm) on your machine by running `npm install -g firebase-tools`.
3. Create a fork of https://github.com/Simon-Dirks/living-library.git, and clone it on your development machine.

## Setting up your own literature file

In this file, the Living Library maintenance work happens. New articles that fall under the current selection criteria, once coded, are entered in the Google Sheets file. Each article occupies one row, with the columns holding:

- basic information about the article (submission date, authors, key words, etc.)
- information about the coding (themes assigned to the article, coder, coding date)
- researchers’ notes (observations, thoughts, doubts) on the article content or the coding process specific to the article.
  Anyone with an access link can work in this file.

The Living Library platform displays newly added articles and their information immediately when the site is refreshed.

1. Make a copy of our Google Sheets literature [template](https://docs.google.com/spreadsheets/d/1n0ECfcbeiTpMPXv_fOnQ6Pao8U3o8wBZdZePa4Jv13g/edit?usp=sharing).
2. Make sure that your Google Sheets file can be viewed by “Anyone with the link”.
3. Copy the link to your newly created Google Sheets literature file. (e.g., [https://docs.google.com/spreadsheets/d/1gnNDzvtY12XTl4Q4sQNxLFA5-G8jcLngryO7OKOo8aM](https://docs.google.com/spreadsheets/d/1gnNDzvtY12XTl4Q4sQNxLFA5-G8jcLngryO7OKOo8aM/edit?usp=sharing)).
4. Update the `LIT_CSV_URL` value in `src/config.js` to match your copied Google Sheets file URL.
   1. Based on the copied link, find your Google Sheets ID (e.g., `1gnNDzvtY12XTl4Q4sQNxLFA5-G8jcLngryO7OKOo8aM`), and replace it in the following template URL: `https://docs.google.com/spreadsheets/u/0/d/**[YOUR_ID_HERE]**/gviz/tq?tqx=out:csv&tq=select+*`
5. Update the `LIT_CSV_KEYS`, `LIT_CSV_EDUCATION_FILTER_KEYS` and `LIT_CSV_FILTER_KEYS` values in `src/config.js` to match your Google Sheets file column header names. Please note that these values are CASE SENSITIVE.

## Setting up your own theme logbook file

In this file, researchers document the process of Living Library maintenance. This includes their observations, thoughts, and doubts on the methods, as well as discussions held in the team, decisions taken together and the reasoning behind them. The logbook is organized according to the coding themes to allow an overview on the developments and decisions taken regarding each theme. General notes that apply to the Living Library and/or its methods as a whole are documented under ‘deliberations’.

1. Make a copy of our Google Sheets theme logbook [template](https://docs.google.com/spreadsheets/d/1nx18TNl0fD0CtaMjmWhIBabLrM4jSUaE/edit?usp=sharing&ouid=116729142426546289681&rtpof=true&sd=true).
2. Make sure that your Google Sheets file can be viewed by “Anyone with the link”.
3. Copy the link to your newly created Google Sheets literature file. (e.g., [https://docs.google.com/spreadsheets/d/1nx18TNl0fD0CtaMjmWhIBabLrM4jSUaE](https://docs.google.com/spreadsheets/d/1nx18TNl0fD0CtaMjmWhIBabLrM4jSUaE)).
4. Update the `THEME_LOGBOOK_CSV_URL` value in `src/config.js` to match your copied Google Sheets file URL.
   1. Based on the copied link, find your Google Sheets ID (e.g., `1nx18TNl0fD0CtaMjmWhIBabLrM4jSUaE`), and replace it in the following template URL: `https://docs.google.com/spreadsheets/u/0/d/**[YOUR_ID_HERE]**/gviz/tq?tqx=out:csv&tq=select+*`
5. Update the `THEME_LOGBOOK_FILTER_VALUES` and `THEME_LOGBOOK_CSV_KEYS` values in `src/config.js` to match your Google Sheets file column header names. Please note that these values are CASE SENSITIVE.

## Adding or removing themes

1. Add or remove a theme to/from `THEME_LOGBOOK_CSV_KEYS` and `THEME_LOGBOOK_FILTER_VALUES` in `src/config.js` and in your theme logbook Google Sheets file.
2. Add or remove a theme to/from `src/assets/data/themes.json`. An example:

   ```json
   "newTheme": {
       "title": "New Theme",
       "color": "0, 255, 128",
       "themes": ["them.NEW"], // The theme key to be used in your Google Sheets for coding articles
       "description": "<h4>We give articles the label \"NEW THEME\" when they contain...</h4> ...",
       "reasoningKey": "New theme reasoning" // The theme key used in your Google Sheets file that describes why you coded this article with this theme
     }
   ```

## Adding or removing filters

See the `LIT_CSV_FILTER_KEYS` and `LIT_CSV_EDUCATION_FILTER_KEYS` settings in `src/config.js`. Note that these filters work independently of each other!

## Running your Living Library on your own machine

1. Go to the project folder and run `npm install`.
2. Run `npm run serve`.

## Deploying your Living Library to the web using Firebase

**Setting up Firebase hosting (once)**

1. Create a new [Firebase](http://console.firebase.google.com) project.
2. Add a Web app for your project through the [Firebase console](console.firebase.google.com).
3. Copy the `firebaseConfig` data to the `src/firebase-config.js` file. You might need to manually create this file.

   ```jsx
   export const firebaseConfig = {
     apiKey: "[...]",
     authDomain: "[...].firebaseapp.com",
     projectId: "[...]",
     storageBucket: "[...].appspot.com",
     messagingSenderId: "[...]",
     appId: "[...]",
   };
   ```

4. Run `firebase login`.
5. Run `firebase init`.
6. Set up Firebase hosting with the project you created earlier.
   1. Set the public directory to `dist`.
   2. Configure as a single-page app: `y`es.

### Deploying

1. Run `npm run build`.
2. Run `firebase deploy`.

## [EXPERIMENTAL] Setting up a Firebase database (to allow discussions)

Firebase offers both hosting functionalities (deploying your application to the web) as well as database functionalities (storing information of your application online). We can use Firebase database functionalities to allow discussions for each coded article, as well as the researcher logbook.

1. Create a Realtime Database for your Firebase project through the [Firebase console](console.firebase.google.com).
2. Start in “test mode”, or set the “Rules” to allow read and write access. **_Note that this allows anyone to view but also CHANGE, DOWNLOAD or even REMOVE all submitted comments. We have made a start on auth/login functionality, you are welcome to develop this further if needed. (See the `src/components/auth` files)_**

   Example of database Rules:

   ```json
   {
     "rules": {
       ".read": true,
       ".write": true
     }
   }
   ```

3. Update your `src/firebase-config.js` file with the newly created databaseURL. You can find the latest firebaseConfig for your web app in the [Firebase console](console.firebase.google.com) (in the Project Settings).
