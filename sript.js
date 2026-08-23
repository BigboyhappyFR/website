function RunStandings() {
  fetch("https://statsapi.mlb.com/api/v1/standings?leagueId=103,104")
    .then(response => response.json())
    .then(data => {

      const ALEastTable = document.getElementById("StandingALEast");
      ALEastTable.innerHTML = "";

      data.records[0].teamRecords.forEach(team => {
        ALEastTable.innerHTML += `
          <tr>
            <td>${team.team.name}</td>
            <td>${team.wins}</td>
            <td>${team.losses}</td>
            <td>${team.gamesBack}</td>
          </tr>
        `;
      });


      const ALCentralTable = document.getElementById("StandingALCentral");
      ALCentralTable.innerHTML = "";

      data.records[1].teamRecords.forEach(team => {
        ALCentralTable.innerHTML += `
          <tr>
            <td>${team.team.name}</td>
            <td>${team.wins}</td>
            <td>${team.losses}</td>
            <td>${team.gamesBack}</td>
          </tr>
        `;
      });


      const ALWestTable = document.getElementById("StandingALWest");
      ALWestTable.innerHTML = "";

      data.records[2].teamRecords.forEach(team => {
        ALWestTable.innerHTML += `
          <tr>
            <td>${team.team.name}</td>
            <td>${team.wins}</td>
            <td>${team.losses}</td>
            <td>${team.gamesBack}</td>
          </tr>
        `;
      });


      const NLEastTable = document.getElementById("StandingNLEast");
      NLEastTable.innerHTML = "";

      data.records[3].teamRecords.forEach(team => {
        NLEastTable.innerHTML += `
          <tr>
            <td>${team.team.name}</td>
            <td>${team.wins}</td>
            <td>${team.losses}</td>
            <td>${team.gamesBack}</td>
          </tr>
        `;
      });


      const NLCentralTable = document.getElementById("StandingNLCentral");
      NLCentralTable.innerHTML = "";

      data.records[4].teamRecords.forEach(team => {
        NLCentralTable.innerHTML += `
          <tr>
            <td>${team.team.name}</td>
            <td>${team.wins}</td>
            <td>${team.losses}</td>
            <td>${team.gamesBack}</td>
          </tr>
        `;
      });


      const NLWestTable = document.getElementById("StandingNLWest");
      NLWestTable.innerHTML = "";

      data.records[5].teamRecords.forEach(team => {
        NLWestTable.innerHTML += `
          <tr>
            <td>${team.team.name}</td>
            <td>${team.wins}</td>
            <td>${team.losses}</td>
            <td>${team.gamesBack}</td>
          </tr>
        `;
      });

    });
}


RunStandings();

// Update every 60 seconds
setInterval(RunStandings, 1000);


// =========================
// LEAGUE BUTTONS
// =========================

function showAL() {
  document.getElementById("ALStandings").style.display = "block";
  document.getElementById("NLStandings").style.display = "none";

  document.getElementById("ALButton").classList.add("active");
  document.getElementById("NLButton").classList.remove("active");
}


function showNL() {
  document.getElementById("ALStandings").style.display = "none";
  document.getElementById("NLStandings").style.display = "block";

  document.getElementById("NLButton").classList.add("active");
  document.getElementById("ALButton").classList.remove("active");
}

