// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $(".eatburger").click(function(event) {
      var id = $(this).data("burgerid");
      console.log(id);
      var isEaten = {
        isEaten: 1
      };
      // Send the PUT request.
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
    $("#make").click(function(event) {
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
  