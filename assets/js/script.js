$(function () {
  let date = new Date();
  let hours = date.getHours();
  const hour_container = document.querySelector(".container-fluid");
  const hour_template = document.querySelector("#hour-9")
  const number_hours = 18;
  let pm_am = "";
  for(let i = 10; i < number_hours; i++){
    const clone = hour_template.cloneNode(true);
    clone.id = `hour-${i}`;
    const hour_text = clone.querySelector(".hour");
    let hour = i;
    hour_text.textContent = `${time_if(hour)+pm_am}`;
    hour_container.appendChild(clone);
  }

  function date_time(){
    date = new Date();
    minutes = date.getMinutes();
    if(minutes<10){
      minutes="0"+date.getMinutes()
    }
    document.getElementById("currentDay").textContent = `Today's Date ${date.getMonth()}/${date.getDay()}/${date.getFullYear()} ${time_if(hours)}:${minutes}${pm_am}`;

    hours = date.getHours();
    let ids = 18;
    for(let i = 9; i<ids;i++ ){
    let element_hour = document.getElementById(`hour-${i}`);
    let element_hour_id = element_hour.id;
    let element_hour_id_value = element_hour_id.replace("hour-", "");
    if(element_hour_id_value == hours){
      element_hour.classList.remove("past");
      element_hour.classList.remove("future")
      element_hour.classList.add("present");
    }else if(element_hour_id_value > hours){
      element_hour.classList.remove("past");
      element_hour.classList.remove("present")
      element_hour.classList.add("future");
    }else if(element_hour_id_value < hours){
      element_hour.classList.remove("present");
      element_hour.classList.remove("future");
      element_hour.classList.add("past"); 
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
    $(`<p id="pop_up">Your Event ${event} has been added to ${time_if(event_hour)+pm_am} in Local Storage</p>`).insertAfter("#currentDay");
    setTimeout(remove_pop_up, 4000)
  })
  // Deletes the message for adding the event to local storage
  function remove_pop_up(){
    const popup_div = document.getElementById("pop_up");
    popup_div.remove();
  }
  // Function for displaying to local storage 
  function show_local(){
    let num_elements = 18
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
