$(document).ready(function () {
  var data = JSON.parse(localStorage.getItem("player")); //data of every indivisual player
  var card = $("<div>").attr({
    class: "img-container",
  });
  var img1 = $("<img>").attr({
    class: "players-img",
    src: data.photos,
    alt: "player image",
  });
  // console.log(img1);
  var card1 = $("<div>").attr({
    class: "player-infocard",
  });
  var n1 = $("<p>").html(`player name: <span>${data.name}</span>`).attr({
    class: "player-info",
  });
  var n3 = $("<p>").html(`team: <span>${data.team}</span>`).attr({
    class: "player-info",
  });
  var n4 = $("<p>").html(`role: <span>${data.role}</span>`).attr({
    class: "player-info",
  });
  var n5 = $("<p>")
    .html(`playing status: <span>${data.playingStaus}</span>`)
    .attr({
      class: "player-info",
    });
  var n6 = $("<p>").html(`price: <span>${data.price}</span>`).attr({
    class: "player-info",
  });
  // var n2 = $("<p>").html(`description: <span>${data.description}</span>`).attr({
  //   class: "player-info",
  // });
  $(card).append(img1);
  $("#player-main-two").append(card);
  $(card1).append(n1, n3, n4, n5, n6); //n2
  $("#player-details-two").append(card1);

// Add a Team
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
// Add a Player
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
        localStorage.setItem("teamData", JSON.stringify(data));
        alert("Player Created !!");
        location.reload();
      }
      if (i == data.length) {
        alert("team not found !!! --- try again or create the team first !!!");
      }
    }
  });

  var search = document.getElementById("search-text");
// Search for team
  search.oninput = function () {
    if (search.value == "") {
      $(".search-drop").css("display", "none");
      $(".player-drop").css("display", "none");
    }
    let j = search.value.length;
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
