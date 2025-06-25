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

    const scientistsData = data.map(scientists => scientists.scientists)
    console.log(scientistsData)

    const roster = `
      <ul>
        ${data.map(roster => `
            <li>
              <h2 id="teamHeader">Faction ${roster.id} - ${roster.teamName}</h2>
              <strong class="teamInfo">Invention: </strong> <p>${roster.invention}</p> <br>
              <strong class="teamInfo">Description: </strong> <p>${roster.description}</p> <br>
              <strong class="teamInfo">Victory Theme: </strong> <p>${roster.themeSong}</p> <br>
            </li>`).join(" ")}
        
      </ul>
    `

    const reviews = ``;

    rosterContainer.innerHTML = roster;
    reviewsContainer.innerHTML = reviews;

  } catch (error) {
    console.error("Error:", error);
    rosterContainer.textContent = "Failed to load data. Check console for details.";
  }

}

document.addEventListener("DOMContentLoaded", fetchAndDisplayData);