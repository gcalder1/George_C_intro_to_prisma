# George Calderon - TKH Innovation Fellowship: Web Development Cohort A

Intro to Prisma

* This repository contains the source control history which will show the final outcome of the guided exercise and my proceeding work creating my own models and seeding new data.

## 📦 Prerequisites

This full stack project requires some of the following to be installed through NPM:

Backend:

```
Dependencies:

- Prisma: v@6.7.0 [ npm i prisma@6.7.0 ]
- Express: @latest [ npm i express ]
- CORS: @latest [ npm i cors ]

Developer Dependencies:

//Testing with fake data//

- Faker: @latest [ npm i @faker-js/faker --save-dev ]
```

Frontend:
```
Dependencies:

n/a

Developer Dependencies:

//Quicker front end start up times/live refreshed views//

- vite: @latest [npm i vite@latest --save-dev]
```

## 🛠️ Installation

After creating your designated directory for your project, please make sure to correctly copy the repository link.git to successfully clone the project.

Or simply use ```git clone https://github.com/gcalder1/George_C_intro_to_prisma.git``` within your designated directory and then go inside of the root of this project using ``cd George_C_intro_to_prisma.

Ensure that you navigate to your respective back-end and front-end directories to install all the required dependencies:

```
Back-end:
- cd backend
(npm init -y to generate your package.json if it was not cloned over or is missing ) 
- npm install prisma @6.7.0
- npm install @faker-js/faker --save-dev
- npm install express
- npm install express cors
```

```
Front-end:
- cd ../frontend
- npm install vite@latest --save-dev
```

🔧 Configuration

After installing all dependencies, please make sure to create a .env file within the prisma folder (ensuring that the ```.env``` and ```schema.prisma``` are within the same folder). The .env file will be where we will tell prisma which database to connect to:
```
For the sake of this assignment:

DATABASE_URL="file:test.sqlite"

(assuming that is the name of your .sqlite file)
```

Finally, after defining your database path, make sure your prisma client is generated (```npx prisma migrate dev --name [designatedName]```) and then populate your tables with the data from our seed.js (generates fake data using _faker_: ```node seed.js```).

🚀 Running the Project

Upon ensuring your tables are seeded with data, proceed to run the backend server (```node server.js```) and the frontend preview (```npm run dev```) from their respective directories to see the entire project with the seeded with data.

---

_Thank you for visiting my repo!_

**George Calderon** | [George's GitHub Profile](https://github.com/gcalder1)