// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  let date = new Date();
  let hours = date.getHours();
  const hour_container = document.querySelector('.container-fluid');
  const hour_template = document.querySelector('#hour-9')
  const number_hours = 18;
  let pm_am = "";
  for(let i = 10; i < number_hours; i++){
    const clone = hour_template.cloneNode(true);
    clone.id = `hour-${i}`;
    const hour_text = clone.querySelector('.hour');
    let hour = i;
    if(i<12){
      pm_am = "AM"
    }else{
      pm_am = "PM"
      hour -=12;
    }if(hour == 0){
      hour = 12
    }
    hour_text.textContent = `${hour+pm_am}`;
    hour_container.appendChild(clone);

  }

  function date_time(){
    date = new Date();
    hours = date.getHours();
    minutes = date.getMinutes();
    if(minutes<10){
      minutes="0"+date.getMinutes()
    }if(hours<12){
      pm_am = "AM"
    }else{
      pm_am = "PM"
      hours -= 12 
    }
    document.getElementById("currentDay").textContent = `Today's Date ${date.getMonth()}/${date.getDay()}/${date.getFullYear()} ${hours}:${minutes}${pm_am}`;

    hours = date.getHours();
    let ids = 18;
    for(let i = 9; i<ids;i++ ){
    let element_hour = document.getElementById(`hour-${i}`);
    let element_hour_id = element_hour.id;
    let element_hour_id_value = element_hour_id.replace('hour-', '');
    if(element_hour_id_value == hours){
      element_hour.classList.remove('past');
      element_hour.classList.remove('future')
      element_hour.classList.add('present');
    }else if(element_hour_id_value > hours){
      element_hour.classList.remove('past');
      element_hour.classList.remove('present')
      element_hour.classList.add('future');
    }else if(element_hour_id_value < hours){
      element_hour.classList.remove('present');
      element_hour.classList.remove('future');
      element_hour.classList.add('past'); 
    }
    }
  } 
  date_time()
  setInterval(date_time,1000)

  let save_button = $('.saveBtn');

  save_button.on('click', function(){
    let event = $(this).siblings('.description').val();
    let event_time = $(this).parent().attr("id");
    localStorage.setItem(event_time,event);


    event_hour = event_time.replace('hour-','')
    if(event_hour<12){
      pm_am = "AM"
    }else{
      pm_am = "PM"
      event_hour -= 12 
    }

    show_local();   

    $(`<p id="pop_up">Your Event ${event} has be added to ${event_hour+pm_am} in Local Storage</p>`).insertAfter("#currentDay");

    setTimeout(remove_pop_up, 4000)

  })

  function remove_pop_up(){
    const popup_div = document.getElementById("pop_up");
    popup_div.remove();
  }

  function show_local(){
    let num_elements = 18
    for(let i = 9; i < num_elements; i++){
      $(`#hour-${i} .description`).val(localStorage.getItem(`hour-${i}`))
    }
  }
  show_local();

});
