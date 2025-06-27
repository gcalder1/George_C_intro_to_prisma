const rosterContainer = document.getElementById("teamsRoster");
const scientistsContainer = document.getElementById("scientistsInTeam")
const reviewsContainer = document.getElementById("reviewsForScientists");
const documentBody = document.getElementById("body");
const footer = document.getElementById("footer");
const errorBody = document.getElementById("error");

async function fetchAndDisplayData () {
  try {

    documentBody.textContent = "Loading...";
    rosterContainer.textContent = "Loading...";
    reviewsContainer.textContent = "Loading...";
    footer.textContent = "Loading...";

    const response = await fetch("http://localhost:5555/scienceFair");

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

    const body = `
      <div id="home" class="header">
      <p id="pageHeader">Timeless Mad-Scientist Science Fair</p>
      <p>Madness. Innovation. Timeless.</p>
    </div>

    <div id="navContainer">
      <nav id="navBar">
        <ul>
          <li><a href="#" class="category">Home</a></li>
          <li><a href="#teams" class="category">Teams</a></li>
          <li><a href="#scientists" class="category">Scientists</a></li>
          <li><a href="#reviews" class="category">Reviews</a></li>
        </ul>
      </nav>
    </div>

    <div id="bannerContainer" alt="madScientist">
      <img id="banner" src="/madScientistCreations.png"/> <!--Free Stock AI-Generated Image from Gemini by Google-->
      <div id="bannerAnnouncement">
        <p>Compete for a chance to win the Grand Prize:</p>
        <p>$1,000,000,000</p>
      </div>
    </div>
    `;

    const roster = `
      <div class="teamsBanner">Participating Factions: </div>
      <div class="rosterContainer">
        ${data.map(roster => `
          <div class="rosterCard">
            <h2 class="teamHeader">Faction ${roster.id} - ${roster.teamName}</h2>
              <div class="teamDetails">
                <strong class="infoHeader">Invention: </strong><p class="infoDetails">${roster.invention}</p>
                <strong class="infoHeader">Description: </strong><p class="infoDetails">${roster.description}</p>
                <strong class="infoHeader">Victory Theme: </strong><p class="infoDetails">${roster.themeSong}</p>
                <br>
              </div>
              
          </div>
          <br>
          `).join(" ")}
      </div>
    `;

    const scientist = `
      <div class="scientistsBanner">Participating Scientists: </div>
      <div class="scientistsContainer">
        ${data.map(data => `
          <div class="scientistCard">
            <h2 class="teamNameHeader">${data.teamName}' faction members: </h2>
              ${data.scientists.map(scientists => `
                <div class="sciCardBody">
                <strong class="infoHeader">${scientists.role}: </strong><p class="infoDetails">${scientists.name}</p>
                <strong class="infoHeader">Era: </strong><p class="infoDetails">${scientists.era}</p>
                <strong class="infoHeader">Location: </strong><p class="infoDetails">${scientists.location}</p>
                <strong class="infoHeader">Victory Emote: </strong><p class="infoDetails">${scientists.favEmoji}</p>
                <div class="seperator">◆</div>
                </div>  
                <br>            
                `).join(" ")}
          </div>
          <br>
          `).join(" ")}
      </div>
    `;

    const reviews = `
      <div class="reviewsBanner">Thoughts from our community: </div>
      <div class="reviewsContainer">
        ${data.map(data => data.scientists.map(data => `
          <div class="reviewCard">
            <h2 class="reviewHeader">Reviews for ${data.name}</h2>
            <div class="reviewCard_reviewerInfo">
              ${data.reviews.map(review => `
                <strong class="infoHeader">Reviewer Name: </strong><p class="infoDetails">${review.reviewerName}</p>
                <strong class="infoHeader">Verified Association Member: </strong><p class="infoDetails">${review.fromMadSci ? "✅" : "❌"}</p>
                <strong class="infoHeader">Rating: </strong><p class="infoDetails">${review.ratingStars} ⭐</p>
                <strong class="infoHeader">Review: </strong><p class="infoDetails">${review.reviewDesc}</p>
                <strong class="infoHeader">Audience Seat Number: </strong><p class="infoDetails">${review.id}</p>
                <div class="seperator">◆</div>
                <br>
                `).join(" ")}
            </div>
          </div>
          <br>
          `).join(" ")).join(" ")}
      </div>
    `;

    const foot = `
      <div class="footerContainer">
        <ul class="footerList">
          <li class="footDetails"><a href="#" class="footText">Contact Our Lab</a></li>
          <li class="footDetails"><a href="#" class="footText">About Our Experiments</a></li>
          <li class="footDetails"><a href="#" class="footText">Test Subject Sign-Up</a></li>
          <li class="footDetails"><a href="#" class="footText">Hall Of Madness</a></li>
          <li class="footDetails"><a href="#" class="footText">"Safety" Regulations</a></li>
          <li class="footDetails"><a href="#" class="footText">Evil Sponsors</a></li>
        </ul>
        <div class="copyright">©2025 Timeless Mad-Scientist Science Fair</div>
      </div>
    `;
    
    documentBody.innerHTML = body;
    rosterContainer.innerHTML = roster;
    scientistsContainer.innerHTML = scientist;
    reviewsContainer.innerHTML = reviews;
    footer.innerHTML = foot;

  } catch (error) {
    console.error("Error:", error);
    errorBody.textContent = "Failed to load data. Check console for details.";
    documentBody.textContent = "";
    rosterContainer.textContent = "";
    reviewsContainer.textContent = "";
  }

}

document.addEventListener("DOMContentLoaded", fetchAndDisplayData);