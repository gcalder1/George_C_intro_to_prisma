const express = require('express')
const cors = require("cors");
const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient(); //new prisma client
const app = express(); //new express client

app.use(cors());
app.use(express.json());

app.get("/api/scienceFair", async (request, response) => {
    try {
        
        const teamData = await prisma.team.findMany();
        const scientistData = await prisma.scientist.findMany();
        const reviewData = await prisma.review.findMany();

        const data = { 
            scientists: scientistData,
            teams: teamData,
            reviews: reviewData
        };

        return response.json(data);

    } catch (error) {
        console.error ('Error fetching data: ', error);
        response.status(500).json({error: 'Internal server error'});
    }
});

app.listen(5555, () => {
    console.log("Server is listening on port 5555");
});