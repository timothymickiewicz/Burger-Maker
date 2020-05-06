$(function() {

    // Eatburger buttons click event
    $(".eatburger").click(function(event) {
      var id = $(this).data("burgerid");
      console.log(id);
      var isEaten = {
        isEaten: 1
      };
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: isEaten
      }).then(
        function() {
          console.log("changed isEaten to", isEaten);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });

    // Click event for making a burger, with progress bar animation and timeout features
    $("#make").click(function(event) {
    event.preventDefault();
    $(".progress-bar").css({"width":"100%","transition":"3s"});
    // having this code run after the 3 second transition on the progress bar
    setTimeout(
        `var burgerObject = {
            name: $("#burger").val().trim(),
            isEaten: 0
        };
        $.ajax("/api/burgers", {
            type: "POST",
            data: burgerObject
        }).then(function() {
            console.log("created new burger");
            location.reload();
        }
    );`, 3250);
    });
});
  