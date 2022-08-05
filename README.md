# The Living Library
## The human face of academia
The Living Library is an interactive platform made to help you orient yourself in the academic literature speaking about education in connection with the pandemic. While other search tools that have been created to date are run by algorithms and aim to be comprehensive, extracting and visualising quantitative data, the Living Library takes a complementary approach: it invites you to get to know a sampled part of the literature from an interpretive, human perspective.

##It's alive!
The library is a small-scale project run by a team of devoted teachers, students and researchers. The thematic organisation of articles is based on continuous qualitative analyses of the literature with a coding scheme that evolves along with the academic conversation. Our aim is to identify and help others integrate the various red threads running through the literature. Throughout the aftermath of the pandemic, we will keep a finger on the pulse, asking: what has happened, what is happening now, and what matters? In the Living Library, you can explore overall themes in the literature in a connective manner and observe how the academic conversation changes over time.

## Contact us
We invite you to write to us with ideas, questions, praise and criticism on the Living Library: [E-MAIL ADDRESS FORTHCOMING]

# Running the application
The Living Library is built using [Vue](https://vuejs.org/) and [Ionic](https://ionicframework.com/).

To run the application on your own machine, you will need to install [Node.js](https://nodejs.org/en/).

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

## Using your own data
**Literature and logbook data** are retrieved from separate Google Sheets files. You can change the links to your own CSV files in the `src/config.js` file (`LIT_CSV_URL` and `THEME_LOGBOOK_CSV_URL`).

Note that you might be using different **column header names** in your data files. Please update the `CSV_KEYS` settings in the `src/config.js` file to match accordingly.

## Adding new filters
See the `LIT_CSV_FILTER_KEYS` and `LIT_CSV_EDUCATION_FILTER_KEYS` settings in `src/config.js`. Note that these filters work independently of each other!

## Adding new themes
Themes are processed from the CSV as semicolon-separated strings (e.g. `them.REL;them.AFF;them.EQU`).

- The **CSV column header names** from which themes are retrieved can be set in `src/config.js` ( `LIT_CSV_KEYS: { THEMES: [...] }`).
- **Ignored theme codes** can be set in `src/config.js` as well (`IGNORED_THEMES`). These theme codes will not be shown in the application.
- **New themes** can be added by adding a new entry to the `src/assets/data/themes.json` file.
  - fdsaf
