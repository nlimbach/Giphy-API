var topics = ["baseball","hockey","football","basketball","Pittsburgh Penguins","Stanley Cup", "Superbowl Champions","Sidney Crosby"];

initializeButtons();

$("#add-Button").on("click", function() {

    event.preventDefault();

    var newTopic = $("#NewButton").val().trim();
    topics.push(newTopic);


    console.log(topics);

    renderButtons(newTopic);


});


function initializeButtons () {
    for (i = 0; i < 8; i++) {
        var addButton = $("<button>");
        var topicName = topics[i];
        addButton.addClass("button btn-primary");
        addButton.attr("topic-Name", topicName);
        addButton.text(topicName);
        $("#DisplayButtons").append(addButton);

    }

    ClickButton();

}
ClickButton();
function renderButtons (newTopic)
{
    //Add button for each item in array

    var addButton = $("<button>");
    var topicName = newTopic;
    addButton.addClass("button btn-primary");
    addButton.attr("topic-Name", topicName);
    addButton.text(topicName);
    $("#DisplayButtons").append(addButton);

    ClickButton();





}



function ClickButton() {
    $("button").on("click", function () {
        event.preventDefault();

        // In this case, the "this" keyword refers to the button that was clicked
        var thisTopic = $(this).attr("topic-Name");
        console.log(thisTopic);
        // Constructing a URL to search Giphy for the name of the person who said the quote
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + thisTopic + "&api_key=dc6zaTOxFJmzC&limit=10";

        console.log(queryURL);


        $.ajax({
            url: queryURL,
            method: "GET"
        })

        // After the data from the AJAX request comes back
            .done(function (response) {

                var results = response.data;
                console.log(results);

                loopData(results);

            })


    })
}

function loopData(results){
    console.log("looping data");

    for (i = 0; i < results.length; i++) {
        // Creating and storing an image tag
        var image = $("<img>");

        var rating = results[i].rating;
        var animate = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height_still.url;

        image.attr("src", still);
        image.addClass("gif");
        image.attr("alt", "topic-image");
        image.attr("data-still", still);
        image.attr("data-animate", animate);
        image.attr("current", "still");

        $("#DisplayGifs").prepend("Rating: " + rating);
        $("#DisplayGifs").prepend("</br>");
        $("#DisplayGifs").prepend(image);
        $("#DisplayGifs").prepend("</br>");


    }
    imageClick();
}

function imageClick(){

    $("img").on("click", function() {

        console.log("GIF CLICKED");
        var state = $(this).attr("current");

        if (state === "animate") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("current", "still");
        } else {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("current", "animate");
        }
    });
}
