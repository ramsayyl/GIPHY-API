window.onload = function() {
  renderButtons();
}

var giphs = ["car", "soccer", "basketball"];

function displayInfo() {

  var searchTerm = $("#giphy-input").val().trim();
  var giphName = $(this).attr("data-name");
  var apiKey = "6Qny4dlr1HaDqscS3xo7ydJJ2DNAsDQ1";
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphName + "&api_key="+ apiKey +"&limit=5";

  $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
        var $giphyImg = $("<img>")
        $giphyImg.attr("data-still", response.data[i].images.original_still.url)
          .attr("data-animate", response.data[i].images.original.url)
          .attr("state", "still")
          .attr("src", $giphyImg.attr("data-still"))
          .attr("width", "225")
          .attr("height", "125")
          .attr("data-giphname", giphs[i])
          .addClass("giph-img")
          .css("padding", "10px");
        $("#giphy-view").append($giphyImg);
      }
  });


}

function updateState() {
$(".giph-img").on("click", function() {
  var state = $(this).attr("state");

for (var i = 0; i < giphs.length; i++) {
  if (state == "still" && $("")) {
    $(this).attr("src", $(this).attr("data-animate"))
    .attr("state", "animate");
  }
  else if (state =="animate") {
    $(this).attr("src", $(this).attr("data-still"))
    .attr("state", "still");
  }
}
});
}


function renderButtons() {

  $("#buttons-view").empty();

    for (var i = 0; i < giphs.length; i++) {
      var giphButton = $("<button>");
      giphButton.addClass("giph")
        .attr("data-name", giphs[i])
        .text(giphs[i])
        .addClass("btn")
        .addClass("btn-info")
        .css("margin", "5px");
      $("#buttons-view").append(giphButton);
    }
}

$("#add-giphy").on("click", function(event) {
    event.preventDefault();

      if ($("#category-input").val().trim() == "") {
        alert("You must add a category name")
      } else {
        var newCategory = $("#category-input").val().trim();
        giphs.push(newCategory);
        renderButtons();
        $("#category-input").val("");
      }

  });

  $(document).on("click", ".giph", displayInfo);
  $(document).on("click", ".giph-img", updateState);


  $("#giphy-submit").on("click", function(event) {
    event.preventDefault();
  });
