const express = require('express')
const cors = require("cors");
const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {

    response.status(200).send({
        responseMessage: "Welcome to the root. Please navigate to /scienceFair within your path to see all participating groups and other important information!"
    });

});

app.get("/scienceFair", async (request, response) => {
    try {
        
        /*
        we're grabbing data from the DB in the shape of the structure that 
        follows their relationship
        */

        const teamFullOverview = await prisma.team.findMany({
            include: { 
                scientists: { 
                    include: { 
                        reviews: true 
                    }
                }
            }
        });

        return response.status(200).json(teamFullOverview);

    } catch (error) {
        console.error(`Error fetching data: ${error}`);
        response.status(500).json({
            error: 'Internal server Error'
        });
    }
});


app.listen(5555, () => {
    console.log("Server is listening on port 5555");
});