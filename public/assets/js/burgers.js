// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $("#eatburger").on("submit", function(event) {
      var id = $(this).data("id");
      var isEaten = {
        isEaten: true
      };
      // Send the PUT request.
      $.ajax("/api:" + id, {
        type: "PUT",
        data: isEaten
      }).then(
        function() {
          console.log("changed sleep to", isEaten);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
    $("#make").click(function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
      var burgerObject = {
        name: $("#burger").val().trim(),
        isEaten: 0
      };
      // Send the POST request.
      $.ajax("/api/burgers", {
        type: "POST",
        data: burgerObject
      }).then(function() {
          console.log("created new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
});
  