const express = require('express')
const cors = require("cors");
const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// app.get("/api/scienceFair", async (request, response) => {
//     try {
        
//         const teamData = await prisma.team.findMany();
//         const scientistData = await prisma.scientist.findMany();
//         const reviewData = await prisma.review.findMany();

//         const data = { 
//             scientists: scientistData,
//             teams: teamData,
//             reviews: reviewData
//         };

//         return response.json(data);

//     } catch (error) {
//         console.error ('Error fetching data: ', error);
//         response.status(500).json({error: 'Internal server error'});
//     }
// });

app.get("/api/scienceFair", async (request, response) => {
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

        return response.json(teamFullOverview);

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