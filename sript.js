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

function RunTodayGames() {
  const today = new Date().toISOString().split("T")[0];

  fetch(`https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${today}`)
    .then(response => response.json())
    .then(data => {

      const gamesTable = document.getElementById("GamesTable");

      gamesTable.innerHTML = "";

      data.dates.forEach(date => {

        date.games.forEach(game => {

          // Get the game status
          const status = game.status.detailedState;

          // Get the scores
          const awayScore = game.teams.away.score ?? "-";
          const homeScore = game.teams.home.score ?? "-";

          // Decide what to display
          let displayStatus;

          if (status === "Scheduled") {
            displayStatus = "Scheduled";
          } 
          else if (
            status === "In Progress" ||
            status === "Warmup" ||
            status === "Pre-Game"
          ) {
            displayStatus = "In Progress";
          } 
          else if (
            status === "Final" ||
            status === "Game Over" ||
            status === "Completed Early"
          ) {
            displayStatus = "Final";
          } 
          else {
            displayStatus = status;
          }

          gamesTable.innerHTML += `
            <tr>
              <td>${game.teams.away.team.name}</td>

              <td>${game.teams.home.team.name}</td>

              <td>
                ${new Date(game.gameDate).toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit"
                })}
              </td>

              <td>
                ${awayScore} - ${homeScore}
              </td>

              <td>
                ${displayStatus}
              </td>
            </tr>
          `;

        });

      });

    });
}

function RunWorldSeries() {
  const bracket = document.getElementById("WorldSeriesBracket");
  if (!bracket) return;

  fetch("https://statsapi.mlb.com/api/v1/series?leagueId=103,104&season=2026")
    .then(response => response.json())
    .then(data => {
      if (data.series && data.series.length > 0) {
        const series = data.series[0];
        bracket.innerHTML = `
          <div class="bracket-team">
            <div>${series.teams.away.team.name}</div>
            <div>${series.teams.away.wins}</div>
          </div>
          <div class="bracket-vs">VS</div>
          <div class="bracket-team">
            <div>${series.teams.home.team.name}</div>
            <div>${series.teams.home.wins}</div>
          </div>
        `;
      } else {
        bracket.innerHTML = "";
      }
    })
    .catch(error => {
      console.log("World Series fetch error:", error);
      bracket.innerHTML = "";
    });
}

function RunPostseasonBracket() {
  const container = document.getElementById("BracketContainer");
  if (!container) return;
  
  fetch("https://statsapi.mlb.com/api/v1/tournaments")
    .then(response => response.json())
    .then(data => {
      if (!data.tournaments || data.tournaments.length === 0) {
        container.innerHTML = "";
        return;
      }

      let html = "";
      
      // Process each tournament
      data.tournaments.forEach(tournament => {
        if (tournament.name.includes("Playoffs") || tournament.name.includes("World Series")) {
          html += `<div class="bracket-round">
            <div class="bracket-round-title">${tournament.name}</div>
            <div class="bracket-matchups">`;
          
          if (tournament.rounds) {
            tournament.rounds.forEach(round => {
              html += `<h4 style="color: #1f6feb; margin: 10px 0;">${round.name}</h4>`;
              
              if (round.series) {
                round.series.forEach(series => {
                  html += `<div class="bracket-matchup">
                    <div class="bracket-team-name">${series.teams.away.team.name} <span class="bracket-team-wins">${series.teams.away.wins}</span></div>
                    <div class="bracket-team-name">${series.teams.home.team.name} <span class="bracket-team-wins">${series.teams.home.wins}</span></div>
                  </div>`;
                });
              }
            });
          }
          
          html += `</div></div>`;
        }
      });

      container.innerHTML = html;
    })
    .catch(error => {
      console.log("Error fetching postseason data:", error);
      container.innerHTML = "";
    });
}

function RunPlayerStanding() {
  fetch(`https://statsapi.mlb.com/api/v1/stats?stats=season&group=hitting&season=${new Date().getFullYear()}&sportId=1&sortStat=onBasePlusSlugging&limit=50`)
    .then(response => response.json())
    .then(data => {
      const table = document.getElementById("PlayerStandings");
      table.innerHTML = "";

      data.stats[0].splits.forEach((player, index) => {
        table.innerHTML += `
          <tr>
            <td>${index + 1}</td>
            <td>${player.player.fullName}</td>
            <td>${player.team.name}</td>
            <td>${player.stat.avg}</td>
            <td>${player.stat.ops}</td>
            <td>${player.stat.hits}</td>
            <td>${player.stat.homeRuns}</td>
            <td>${player.stat.rbi}</td>
          </tr>
        `;
      });
    });
}






// =========================
//  BUTTONS
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

function DoPlayerFetch() {
  document.getElementById("standings").classList.add("InActive");
  document.getElementById("players").classList.remove("InActive");
  document.getElementById("TodayGames").classList.add("InActive");
  RunPlayerStanding()
  
}
function DoTodayGames() {
  document.getElementById("standings").classList.add("InActive");
  document.getElementById("TodayGames").classList.remove("InActive");
  document.getElementById("players").classList.add("InActive");
  RunTodayGames();
  
}
function DoStandings() {
  document.getElementById("TodayGames").classList.add("InActive");
  document.getElementById("standings").classList.remove("InActive");
  document.getElementById("players").classList.add("InActive");
  RunStandings()
  
}
setInterval(RunTodayGames, 15000);
setInterval(RunStandings, 60000);
setInterval(RunWorldSeries, 30000);
setInterval(RunPostseasonBracket, 30000);

// Wait for DOM to load before running
document.addEventListener("DOMContentLoaded", function() {
  showAL();
  RunStandings();
  RunTodayGames();
  RunWorldSeries();
  RunPostseasonBracket();
});
