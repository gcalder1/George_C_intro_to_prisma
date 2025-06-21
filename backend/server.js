const express = require('express')
const cors = require("cors");
const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient(); //new prisma client
const app = express(); //new express client

app.use(cors());
app.use(express.json());

app.get("/api/data", async (request, response) => {
    try {
        const data = await prisma.user.findMany();
        return response.json(data);
    } catch (error) {
        console.error ('Error fetching data: ', error);
        response.status(500).json({error: 'Internal server error'});
    }
});

app.listen(5555, () => {
    console.log("Server is listening on port 5555");
})