# The Living Library

Welcome to the source code for building your own Living Library. The Living Library is an experimental format for open surveying of the academic literature on a topic of your choice. Some key features of the Living Library are its collaborative setup, thematic sorting according to article content, and temporal sorting according to the article submission date, all packaged in a lovely colourful layout, running on the simple and accessible format of Google Sheets. This setup is ideal for working together in a team on a shared database that allows you to observe how the academic (or public) discourse on a topic of interest develops over time. 

However, these are only some practical features. More importantly, the Living Library is designed to invite reflection on the meaning and the limits of open science when openness is practised as a value throughout the research process. The framework of the Living Library involves a researcher logbook where you can document and reflect on the process of maintaining your Living Library. That logbook is publicly visible on the platform – unless you choose otherwise by adjusting the source code accordingly. Your team members can also take notes on articles and the process of sorting them thematically. These notes can equally be visible on the platform – unless you choose otherwise. Finally, a commenting function allows anyone who visits your Living Library to enter the conversation – unless you choose otherwise. As you notice, your Living Library can take many shapes and become more or less open in different regards. This means that as a librarian, you get to reflect on your boundaries and values, with questions such as:

- "What role do we play as researchers/librarians in shaping the contents of this library and how it will be categorised and perceived by visitors and users?"
- "What parts of the 'behind the scenes' work should others be able to see, what parts should remain concealed, and why?"
- "How do we feel about others commenting on our work, and do we need to moderate such commentary?"
- "What does it mean to open up to changes in the discourse and what responses does this ask from us and from our thematic scheme and sorting activities?"

## A little history of the humans behind the Living Library

The first prototype of a Living Library is a small-scale project run by a team of devoted teachers, students and researchers at Utrecht University. You can find the platform here: https://living-library-uu.web.app/ Note that the source code we share here is tailored to the topic and purpose of the literature review project within which our Living Library prototype was developed. You can soon find more information about all that, along with deeper reflections on the purposes and potential of the Living Library, in an article that is soon to be published (we'll put the link in here).

The thematic organisation of articles in the Living Library prototype was based on continuous qualitative analyses of the literature with a coding scheme that evolved along with the academic conversation. Our aim was to identify and help others integrate the various red threads running through the educational literature on the pandemic. For over a year between 2020 and 2022, we kept a finger on the pulse, asking: What is happening, and what matters in education?

The Flow of Time was hand-painted by Lisi, one of the founders of the Living Library. It reminds us that themes in the literature are more fluent and intertwined than our categories make it seem. It also reminds us that an overview on the literature is always a snapshot in time.

While many other search tools that have been created to date are run by algorithms and aim to be comprehensive and time-efficient, extracting and visualising quantitative data, our prototype of a Living Library took a complementary approach: we sought to get to know a sampled part of the literature from an interpretive, human perspective. Essentially, instead of outsourcing human work, we have created a tool that helps us to 'insource', that is, to deepen the human dimensions of our work. We invite you to do the same!

## Contact us

Please write to us with ideas, questions, praise, and criticism on the Living Library: livinglibrary@uu.nl

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

1. Make a copy of our Google Sheets literature [template](https://docs.google.com/spreadsheets/d/1EKhDjiUBR55m67rKVSBKU3Va60Yj11PY).
2. Make sure that your Google Sheets file can be viewed by “Anyone with the link”.
3. Copy the link to your newly created Google Sheets literature file. (e.g., [https://docs.google.com/spreadsheets/d/1V4BaGLiVy-POnesEwbCOXSrNusscxoqs](https://docs.google.com/spreadsheets/d/1V4BaGLiVy-POnesEwbCOXSrNusscxoqs)).
4. Update the `LIT_CSV_URL` value in `src/config.js` to match your copied Google Sheets file URL.
   1. Based on the copied link, find your Google Sheets ID (e.g., `1V4BaGLiVy-POnesEwbCOXSrNusscxoqs`), and replace it in the following template URL: `https://docs.google.com/spreadsheets/u/0/d/**[YOUR_ID_HERE]**/gviz/tq?tqx=out:csv&tq=select+*`
5. Update the `LIT_CSV_KEYS`, `LIT_CSV_EDUCATION_FILTER_KEYS` and `LIT_CSV_FILTER_KEYS` values in `src/config.js` to match your Google Sheets file column header names. Please note that these values are CASE SENSITIVE.

## Setting up your own theme logbook file

In this file, researchers document the process of Living Library maintenance. This includes their observations, thoughts, and doubts on the methods, as well as discussions held in the team, decisions taken together and the reasoning behind them. The logbook is organized according to the coding themes to allow an overview on the developments and decisions taken regarding each theme. General notes that apply to the Living Library and/or its methods as a whole are documented under ‘deliberations’.

1. Make a copy of our Google Sheets theme logbook [template](https://docs.google.com/spreadsheets/d/1nx18TNl0fD0CtaMjmWhIBabLrM4jSUaE/edit?usp=sharing&ouid=116729142426546289681&rtpof=true&sd=true).
2. Make sure that your Google Sheets file can be viewed by “Anyone with the link”.
3. Copy the link to your newly created Google Sheets literature file. (e.g., [https://docs.google.com/spreadsheets/d/18-x3hThkgphINImYhXsNaE8BZlZfj4es](https://docs.google.com/spreadsheets/d/18-x3hThkgphINImYhXsNaE8BZlZfj4es)).
4. Update the `THEME_LOGBOOK_CSV_URL` value in `src/config.js` to match your copied Google Sheets file URL.
   1. Based on the copied link, find your Google Sheets ID (e.g., `1rTyiamxhqvaUunRiJ9nrcVQG09GnM0hF`), and replace it in the following template URL: `https://docs.google.com/spreadsheets/u/0/d/**[YOUR_ID_HERE]**/gviz/tq?tqx=out:csv&tq=select+*`
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

## [EXPERIMENTAL] Setting up a Firebase database (to allow pinboards)

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
