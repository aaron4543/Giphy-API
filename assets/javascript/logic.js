// Array for GIF buttons
var GIFs = ["Spongebob", "Super Mario", "Rainbow Six Siege", "Pugs"];

// Function for displaying GIFS
function displayGIFs() {

    // Clears GIFs div so 10 new gifs are displayed
    $(".gifsDiv").empty();

    // Variable for attaching "data-name" as an
    // attribute for later use
    var GIF = $(this).attr("data-name");

    // Variables for building search URL
    // --------------------------------------------------

    // URL root
    var url = "https://api.giphy.com/v1/gifs/search?"

    // API Key
    var API = "api_key=2ut86fDVP8EuluoVvP5wTThTOEJxLt85"

    // Limit string to limit response to 10 gifs
    var limit = "&limit=10"

    // Builds full URL including text typed in serach box
    var queryURL = url + API + "&q=" + GIF + limit

    // --------------------------------------------------

    // Ajax call to API
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);

        // Loops through response from API
        for (var j = 0; j < response.data.length; j++) {

            // Stores gifsDiv Element into a variable 
            var GIFSdiv = $(".gifsDiv");

            // Stores still image url from response in a variable
            var stillURL = response.data[j].images.fixed_height_still.url;
            // Stores rating from response in a variable
            var ratingInfo = response.data[j].rating;

            // Variable that creates an IMAGE element and adds
            // still url from response as the default src
            var still = $("<img>").attr("src", stillURL)
                // Also adds multiple other attribues for later use
                .addClass("imageGif")
                .attr("data-still", response.data[j].images.fixed_height_still.url)
                .attr("data-animated", response.data[j].images.downsized_medium.url);

            // Variable that creates a paragraph element and adds
            // rating info from response 
            var rating = $("<p>").text("Rating: " + ratingInfo);


            // Adds an ID to each GIF so it can be styled in CSS
            still.attr("id", "still-img");
            rating.attr("id", "rating-info");

            // Appends all still and rating to the gifsDiv
            GIFSdiv.append(still);
            GIFSdiv.append(rating);

            // Waits for all gifs and elements to load before 
            // running code for status toggle event listener
            $(document).ready(function () {

                // Stores images status as a boolean
                var imgStatusStill = true;

                // On click event listener for each GIF
                $(".imageGif").on("click", function () {

                    // If statement that toggles GIFS between
                    // still and animated statuses
                    if (imgStatusStill == true) {

                        var animatedURL = $(this).attr("data-animated");
                        $(this).attr("src", animatedURL);
                        imgStatusStill = false;

                    } else {
                        var stillURL2 = $(this).attr("data-still");
                        $(this).attr("src", stillURL2);
                        imgStatusStill = true;
                    };
                });

            });

        };

    });

};

// Function for rendering new buttons
function renderBtns() {

    // Clears buttons div so original buttons aren't reloaded
    $(".buttons").empty();

    // For Loop that appends new buttons to the page
    for (var i = 0; i < GIFs.length; i++) {

        var newBtn = $("<button>");

        newBtn.addClass("new-btn");

        newBtn.attr("data-name", GIFs[i]);

        newBtn.attr("style", "margin:10px");

        // newBtn.attr("style", "background-color:lightskyblue");

        newBtn.text(GIFs[i]);

        $(".buttons").append(newBtn);
    };
};

// Click event listener for adding buttons
$("#add-btn").on("click", function (event) {

    event.preventDefault();
    // Trims white space from user input in text box
    var GIF = $("#searchInput").val().trim();
    // Pushes new item to GIFs array for buttons
    GIFs.push(GIF);

    renderBtns();
});

// Process for initiating displayGIFs and renderBtns functions
$(document).on("click", ".new-btn", displayGIFs);

renderBtns();




// 3. Style

