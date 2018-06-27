window.onload = function() {
  renderButtons();
}

var giphs = ["car", "soccer", "basketball"];

function displayInfo() {

  var searchTerm = $("#giphy-input").val();
  var giphName = $(this).attr("data-name");
  var apiKey = "6Qny4dlr1HaDqscS3xo7ydJJ2DNAsDQ1";
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphName + "&api_key="+ apiKey +"&limit=5";

  $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response.data[0].images.original.url);
        var $giphyImg = $("<img>")
        $giphyImg.attr("src", response.data[0].images.original.url);
        $("#giphy-view").append($giphyImg);
  });

}


function renderButtons() {

  $("#buttons-view").empty();

    for (var i = 0; i < giphs.length; i++) {
      var giphButton = $("<button>");
      giphButton.addClass("giph");
      giphButton.attr("data-name", giphs[i]);
      giphButton.text(giphs[i]);
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
