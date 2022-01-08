$(document).ready(function () {
  //Get The data From Local Storage
  var data = JSON.parse(localStorage.getItem("teamData"));
  // console.log(data);

  //Create a flex card to show teams
  function createTeam(data) {
    var card = $("<div>").attr({
      class: "card-team",
    });
    var img1 = $("<img>").attr({
      class: "img-team",
      src: data.teamIcon, //team logo
    });
    var div1 = $("<div>").attr({
      class: "div-team",
    });
    var name1 = $("<p>")
      .html(`<b>Team: </b> ${data.fullName} (${data.key})`) //team name
      .attr({
        class: "name-team",
      });
    var cham1 = $("<p>")
      .html(`<b>Championship Won : </b> ${data.championshipsWon}`) //no. of times champions
      .attr({
        class: "cham-team",
      });
    var play1 = $("<p>")
      .html(`<b> No. Of Players: </b> ${data.players.length}`) //no. of players
      .attr({
        class: "play-team",
      });
    //rander team name, championship no. , no. of players inside division tag(div1).
    $(div1).append(name1, cham1, play1);
    //add div1 and team logo inside division tag (card)
    $(card).append(img1, div1);
    //reach to the players page after clicking on respective team
    card.click(function () {
      localStorage.setItem("team", JSON.stringify(data));
      window.location = "./players.html";
    });
    //all teams data add to div tag
    $("#teams-1").append(card);
  }

  for (var i = 0; i < data.length; i++) {
    createTeam(data[i]);
  }
  //Create a new Team
  $("#sub-1").click(function (e) {
    e.preventDefault();
    var data = JSON.parse(localStorage.getItem("teamData"));
    let n8 = $("#n8").val(); //fnam
    let n9 = $("#n9").val().toUpperCase(); //key
    let n10 = $("#n10").val(); //cham
    let n11 = $("#n11").val().toUpperCase(); //logo
    var obj = {
      id: data.length + 1,
      fullName: n8,
      key: n9,
      championshipsWon: n10,
      teamIcon: n11,
      players: [],
    };
    data.push(obj);
    localStorage.setItem("teamData", JSON.stringify(data));
    alert("Team Created !!");
    location.reload();
  });

  //Create a new player
  $("#sub-2").click(function (e) {
    e.preventDefault();
    var data = JSON.parse(localStorage.getItem("teamData"));
    let n1 = $("#n1").val(); //name
    let n2 = $("#n2").val(); //link
    // let n3 = $("#n3").val(); //des
    let n4 = $("#n4").val().toUpperCase(); //team
    let n5 = $("#n5").val(); //role
    let n6 = $("#n6").val(); //status
    let n7 = $("#n7").val(); //price
    for (let i = 0; i <= data.length; i++) {
      if (data[i].key == n4) {
        var obj = {
          id: data[i].players.length + 1,
          name: n1,
          photos: n2,
          // description: n3,
          team: n4,
          role: n5,
          playingStaus: n6,
          price: n7 + " crores",
        };
        data[i].players.push(obj);
        localStorage.setItem("teamData", JSON.stringify(data)); //save data in local storage
        alert("Player Created...!!");
        location.reload();
      }
      if (i == data.length) {
        alert("Team not found !!!..Try again or Create the team first !!!");
      }
    }
  });
  //Search for teams with their key name
  var search = document.getElementById("search-text");
  search.oninput = function () {
    let data = JSON.parse(localStorage.getItem("teamData"));
    function createDiv(data) {
      let div1 = $("<div>").attr({
        class: "search-drop",
      });
      let name1 = $("<p>").html(`${data.fullName}`).attr({
        class: "drop-text",
      });
      $(div1).append(name1);
      $(div1).click(function () {
        localStorage.setItem("team", JSON.stringify(data));
        window.location = "./players.html";
      });
      $("#search-box").append(div1);
    }

    for (let i = 0; i < data.length; i++) {
      if (data[i].fullName.toUpperCase() == search.value.toUpperCase()) {
        createDiv(data[i]);
      }
      if (data[i].key.toUpperCase() == search.value.toUpperCase()) {
        createDiv(data[i]);
      }
    }
  };
});
