// Main jQuery function
$(function () {
  let date = new Date();
  let hours = date.getHours();
  const hour_container = $(".container-fluid");
  const hour_template = $("#hour-9")
  const number_hours = 18;
  let pm_am = "";
  for(let i = 10; i < number_hours; i++){
    const clone = hour_template.clone().attr("id", `hour-${i}`);
    const hour_text = clone.find(".hour");
    hour_text.text(`${time_if(i)+pm_am}`);
    hour_container.append(clone);
  }

  function date_time(){
    minutes = date.getMinutes();
    if(minutes<10){
      minutes="0"+date.getMinutes()
    }
    $("#currentDay").text(`Today's Date ${date.getMonth()}/${date.getDay()}/${date.getFullYear()} ${time_if(hours)}:${minutes}${pm_am}`);

    const ids = 18;
    for(let i = 9; i<ids;i++ ){
    let element_hour = $(`#hour-${i}`);
    let element_hour_id_value = i;
    if(element_hour_id_value === hours){
      element_hour.removeClass("past future").addClass("present");
    }else if(element_hour_id_value > hours){
      element_hour.removeClass("past present").addClass("future");
    }else if(element_hour_id_value < hours){
      element_hour.removeClass("present future").addClass("past");
      }
    }
  } 

  date_time()
  setInterval(date_time,1000)
  // Event Listener for "click" on saveBtn
  let save_button = $(".saveBtn");
  save_button.on("click", function(){
    let event = $(this).siblings(".description").val();
    let event_time = $(this).parent().attr("id");
    localStorage.setItem(event_time,event);

    event_hour = event_time.replace("hour-","")
    show_local();   
    $(`<p id="pop_up">Your Event "${event}" has been added to ${time_if(event_hour)+pm_am} in Local Storage</p>`).insertAfter("#currentDay");
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
