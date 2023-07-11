// Main jQuery function
$(function () {
  let pm_am = "";
  // for loop that looks for the id "hour-9" and then copy's it after the container div ".container-fluid"
  // The loop will start at 10 and end at 17
  for(let i = 10; i < 18; i++){
    // Will set the id of each cloned div as "hour-" and value of "i"
    const clone = $("#hour-9").clone().attr("id", `hour-${i}`);
    const hour_text = clone.find(".hour");
    // Sets the text content for each copied div by passing the value of "i" to the time_if function
    hour_text.text(`${time_if(i)+pm_am}`);
    // Appends the copied div under the ".container-fluid" div
    $(".container-fluid").append(clone);
    // Adds comment before each div that is created by loop
    $( "<!-- This div was created and added by the for loop in the linked script.js -->").insertBefore($(`#hour-${i}`));
  }
  // Function for displaying the date & time and changing colors of the calendar slots
  function date_time(){
    // Gets the date and sets as a variable
    let date = dayjs();
    let hours = date.format("H");
    // Gets the minutes for the date variable
    let minutes = date.format("mm");
    // Sets the text of "#currentDay" to be the current date time 
    $("#currentDay").text(`Today's is ${date.format("dddd, MMMM DD")} at ${time_if(hours)}:${minutes}${pm_am}`);
    // for loop that checks the hours and changes the color of calendar slot
    // Loop begins at 9 and will end at 17 the same as number of hours in the calendar app
    for(let i = 9; i<18;i++ ){
    // Sets the the id the loop looks at to a variable "#hour-${i}" with the value of i changing as the loop iterates
    let element_hour = $(`#hour-${i}`);
    // If statement that will change the class and in turn the color of the calendar slot based on the time
    if(i == hours){
      element_hour.removeClass("past future").addClass("present");
    }else if(i > hours){
      element_hour.removeClass("past present").addClass("future");
    }else if(i < hours){
      element_hour.removeClass("present future").addClass("past");
      }
    }
  } 
  // Calls the date_time() function to display the date and time and set calendar slot colors
  date_time()
  // Calls the date_time func every second to update 
  setInterval(date_time,1000)
  // Event Listener for "click" on saveBtn
  $(".saveBtn").on("click", function(){
    // Records the text content of the div for the button press
    let event = $(this).siblings(".description").val();
    // Gets the parent element of the clicked button
    let event_time = $(this).parent().attr("id");
    // Sets the text from the variable event into the local storage
    localStorage.setItem(event_time,event);
    // Removes "hour-" from the parent id to be used in the popup message
    event_hour = event_time.replace("hour-","")
    // Calls show_local func to display the local storage items
    show_local();  
    // Creates and displays the popup message element when an event is added to the local storage
    $(`<p id="pop_up">Your Event "${event}" has been added to ${time_if(event_hour)+pm_am} in Local Storage</p>`).insertAfter("#currentDay");
    // Deletes the popup message element after 4 seconds
    setTimeout(remove_pop_up, 4000)
  })
  // Deletes the message for adding the event to local storage
  function remove_pop_up(){
    $("#pop_up").remove();
  }
  // Function for displaying to local storage 
  function show_local(){
    const num_elements = 18
    for(let i = 9; i < num_elements; i++){
      $(`#hour-${i} .description`).val(localStorage.getItem(`hour-${i}`))
    }
  }
  // Function for converting the 24hr time to 12hr
  function time_if(input){
    if(input<12){
      pm_am = "AM"
    }else{
      pm_am = "PM"
      input -= 12 
    }if(input == 0){
      input = 12
    }
    return input
  }

  show_local();
});
