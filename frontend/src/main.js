const rosterContainer = document.getElementById("teamsRoster");
const scientistsContainer = document.getElementById("scientistsInTeam")
const reviewsContainer = document.getElementById("reviewsForScientists");
const documentBody = document.getElementById("body");
const errorBody = document.getElementById("error");

async function fetchAndDisplayData () {
  try {

    documentBody.textContent = "Loading...";
    rosterContainer.textContent = "Loading...";
    reviewsContainer.textContent = "Loading...";

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

    // const roster = `
    //   <ul class="rosterInfo">
    //     <div id="rosterInfoScrollable">
    //       ${data.map(roster => `

    //           <li>
    //             <div id="rosterCard">
    //               <h2 id="teamHeader">Faction ${roster.id} - ${roster.teamName}</h2>
    //               <strong class="teamInfo">Invention: </strong> <p>${roster.invention}</p> <br>
    //               <strong class="teamInfo">Description: </strong> <p>${roster.description}</p> <br>
    //               <strong class="teamInfo">Victory Theme: </strong> <p>${roster.themeSong}</p> <br>
    //             </div>
    //             ${roster.scientists.map(scientistInfo => `
                  
    //             <ul class="scientistInfo">

    //               <li>
    //                 <div id="scientistCard">
    //                   <strong class="teamInfo">${scientistInfo.role}: </strong> <p>${scientistInfo.name}</p> <br>
    //                   <strong class="teamInfo">Geographic Origin: </strong> <p>${scientistInfo.location}</p> <br>
    //                   <strong class="teamInfo">Era: </strong> <p>${scientistInfo.era}</p> <br>
    //                   <strong class="teamInfo">Victory Emoji: </strong> <p>${scientistInfo.favEmoji}</p> <br>
    //                   <strong class="teamInfo">Signup Number: </strong> <p>${scientistInfo.id}</p> <br>
    //                 </div>
    //               </li>

    //             </ul>

    //           </li>
              
    //             `).join(" ")}

    //           </li>
              
    //           `).join(" ")}
    //     </div>
    //   </ul>
    // `;

    const roster = `
      <div class="rosterContainer">
        ${data.map(roster => `
          <div class="rosterCard">
            <h2 class="teamHeader">Faction ${roster.id} - ${roster.teamName}</h2>
              <div class="teamDetails">
                <strong class="infoHeader">Invention: </strong><p class="infoDetails">${roster.invention}</p>
                <strong class="infoHeader">Description: </strong><p class="infoDetails">${roster.description}</p>
                <strong class="infoHeader">Victory Theme: </strong><p class="infoDetails">${roster.themeSong}</p>
              </div>
              
          </div>
          <div class="divider"></div>
          `).join(" ")}
      </div>
    `;

    const scientist = `
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
                <div class="divider"></div>              
                `).join(" ")}
          </div>
          <div class="divider"></div>
          `).join(" ")}
      </div>
    `;

    const reviews = `
      <div class="reviewsContainer">
        ${data.map(data => data.scientists.map(data => `
          <div class="reviewCard">
            <h2 class="reviewHeader">Reviews for ${data.name}</h2>
            <div class="reviewCard_reviewerInfo">
              ${data.reviews.map(review => `
                <strong class="infoHeader">Reviewer Name: </strong><p class="infoDetails">${review.reviewerName}</p>
                <strong class="infoHeader">Verified Association Member: </strong><p class="infoDetails">${review.fromMadSci}</p>
                <strong class="infoHeader">Rating: </strong><p class="infoDetails">${review.ratingStars} ⭐</p>
                <strong class="infoHeader">Review: </strong><p class="infoDetails">${review.reviewDesc}</p>
                <strong class="infoHeader">Audience Seat Number: </strong><p class="infoDetails">${review.id}</p>
                <div class="seperator">◆</div>
                <div class="divider"></div>
                `).join(" ")}
            </div>
          </div>
          <div class="divider"></div>
          `).join(" ")).join(" ")}
      </div>
    `

    // const reviews = `
    //   <ul id="reviewsInfo">
    //     <div id="reviewsInfoScrollable">
    //       ${data.map(teams => teams.scientists.map(scientists => `

    //     <li>
    //       <div id="reviewCard">
    //         <h2>Reviews for ${scientists.name}</h2><p>by ${scientists.reviews.map(reviews => " " + reviews.reviewerName)}</p> <br>
    //       </div>
    //       ${scientists.reviews.map(reviews => `
    //       <div id="reviewCardDetails">
    //         <strong class="teamInfo">Audience Seat Number: </strong> <p>${reviews.id}</p> <br>
    //         <strong class="teamInfo">Rating: </strong> <p>${reviews.ratingStars} Stars</p> <br>
    //         <strong class="teamInfo">Reviewer Name: </strong> <p>${reviews.reviewerName}</p> <br>
    //         <strong class="teamInfo">Mad-Scientist Foundation Member? </strong> <p>${reviews.fromMadSci}</p> <br>
    //         <strong class="teamInfo">Review: </strong> <p>${reviews.reviewDesc}</p> <br>
            
    //         `).join(" ")}
    //       </div>  
    //     </li>

    //     `).join(" ")).join(" ")}
    //     </div>
    //   <ul>
    // `;
    
    documentBody.innerHTML = body;
    rosterContainer.innerHTML = roster;
    scientistsContainer.innerHTML = scientist;
    reviewsContainer.innerHTML = reviews;

  } catch (error) {
    console.error("Error:", error);
    errorBody.textContent = "Failed to load data. Check console for details.";
    documentBody.textContent = "";
    rosterContainer.textContent = "";
    reviewsContainer.textContent = "";
  }

}

document.addEventListener("DOMContentLoaded", fetchAndDisplayData);