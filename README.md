# Zetty - Smart Note-Taking App

This repo is an implementation for Front-End Web Development With React Final Project Course.

## Folder Structure
<pre>
.
├── node_modules/
├── public/
├── src/
│   ├── pages/                          <= All page component goes here
│   │   ├── [PageName]Page/
│   │   ┇   ├── index.js
│   │       └── [PageName]Page.js
│   │ 
│   │ 
│   ├── components/                     <= All component other than pages goes here
│   │   ├── [ComponentName]/
│   │   ┇   ├── index.js
│   │       └── [ComponentName].js
│   │ 
│   │ 
│   ├── store/                          <=  All action and reducer implementation
│   │   ├── index.js                        with useReducer hooks goes here
│   │   ├── [store-name].action.js
│   │   ├── [store-name].reducer.js
│   │   ┇   
│   │       
│   │  
│   ├── utils/                          <=  All utilities logic e.g formatting text, 
│   │   ├── index.js                        date format, etc. goes here
│   │   ├── [util-name].util.js
│   │   ┇
│   │
│   │
│   ├── constants/                      <=  All constants e.g TEXT_COLOR, 
│   │   └── index.js                        PRIMARY_COLOR, etc. goes here
│   │ 
│   │ 
│   ├── services/                       <=  All database layer logic goes here,
│   │   ├── index.js                        e.g idea CRUD logic
│   │   ├── [service-name].service.js
│   │   ┇
│   │   
│   │   
│   ├── app.ts
│   ├── index.ts
│   ├── logo.svg
│   ┇
│ 
├── .gitignore
├── README.md
├── package.json
┇
</pre>
