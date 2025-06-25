const rosterContainer = document.getElementById("teamsRoster");
const reviewsContainer = document.getElementById("reviewsForScientists")

async function fetchAndDisplayData () {
  try {

    rosterContainer.textContent = "Loading data...";

    const response = await fetch("http://localhost:5555/api/scienceFair");

    if (!response.ok) {
      console.log("Response is not okay")
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    console.log(data);

    if (data.length === 0) {
      rosterContainer.textContent = "No data found";
      return;
    }

    const scientistsData = data.map(nested => nested.scientists.map(deeper => deeper.name))
    console.log(scientistsData)

    const roster = `
      <ul class="rosterInfo">

        ${data.map(roster => `

            <li>

              <h2 id="teamHeader">Faction ${roster.id} - ${roster.teamName}</h2>
              <strong class="teamInfo">Invention: </strong> <p>${roster.invention}</p> <br>
              <strong class="teamInfo">Description: </strong> <p>${roster.description}</p> <br>
              <strong class="teamInfo">Victory Theme: </strong> <p>${roster.themeSong}</p> <br>

              ${roster.scientists.map(scientistInfo => `
                
              <ul class="scientistInfo">

                <li>
                  <strong class="teamInfo">${scientistInfo.role}: </strong> <p>${scientistInfo.name}</p> <br>
                  <strong class="teamInfo">Geographic Origin: </strong> <p>${scientistInfo.location}</p> <br>
                  <strong class="teamInfo">Era: </strong> <p>${scientistInfo.era}</p> <br>
                  <strong class="teamInfo">Victory Emoji: </strong> <p>${scientistInfo.favEmoji}</p> <br>
                  <strong class="teamInfo">Signup Number: </strong> <p>${scientistInfo.id}</p> <br>
                </li>

              </ul>

            </li>
            
              `).join(" ")}

            </li>
            
            `).join(" ")}
        
      </ul>
    `;

    const reviews = `
      <ul>

      ${data.map(teams => teams.scientists.map(scientists => `

        <li>

          <h2>Reviews for ${scientists.name}</h2><p>by ${scientists.reviews.map(reviews => " " + reviews.reviewerName)}</p> <br>
          
          ${scientists.reviews.map(reviews => `

            <strong class="teamInfo">Audience Seat Number: </strong> <p>${reviews.id}</p> <br>
            <strong class="teamInfo">Rating: </strong> <p>${reviews.ratingStars} Stars</p> <br>
            <strong class="teamInfo">Reviewer Name: </strong> <p>${reviews.reviewerName}</p> <br>
            <strong class="teamInfo">Mad-Scientist Foundation Member? </strong> <p>${reviews.fromMadSci}</p> <br>
            <strong class="teamInfo">Review: </strong> <p>${reviews.reviewDesc}</p> <br>
            
            `).join(" ")}

        </li>

        `).join(" ")).join(" ")}

      <ul>

    `;

    rosterContainer.innerHTML = roster;
    reviewsContainer.innerHTML = reviews;

  } catch (error) {
    console.error("Error:", error);
    rosterContainer.textContent = "Failed to load data. Check console for details.";
  }

}

document.addEventListener("DOMContentLoaded", fetchAndDisplayData);