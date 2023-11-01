$(function () {
  // Display the current date in the header
  $("#currentDay").text(dayjs().format("dddd, MMMM D"));

  // Function to apply past, present, or future class to time blocks
  function updateBlockColors() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      if (blockHour < currentHour) {
        $(this).addClass("past");
      } else if (blockHour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  }

  updateBlockColors();

  // Function to load saved events from local storage
  function loadEvents() {
    for (var i = 9; i <= 17; i++) {
      var eventText = localStorage.getItem("event-" + i);
      if (eventText !== null) {
        $("#hour-" + i + " .description").val(eventText);
      }
    }
  }

  loadEvents();

  // Click event listener for save buttons
  $(".saveBtn").on("click", function () {
    var hour = $(this).closest(".time-block").attr("id").split("-")[1];
    var eventText = $(this).siblings(".description").val();
    localStorage.setItem("event-" + hour, eventText);
  });
});

