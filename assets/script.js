// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
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
  }
  if(hour == 0){
    hour = 12
  }
  hour_text.textContent = `${hour+pm_am}`;
  hour_container.appendChild(clone);

}

function date_time(){
  hours = date.getHours();
  minutes = date.getMinutes();
  if(minutes<10){
    minutes="0"+date.getMinutes()
  }
  if(hours<12){
    pm_am = "AM"
  }else{
    pm_am = "PM"
    hours -= 12 
  }
  document.getElementById("currentDay").textContent = `Today's Date ${date.getMonth()}/${date.getDay()}/${date.getFullYear()} ${hours}:${minutes}${pm_am}`;
} 
date_time()
setInterval(date_time,1000);


hours = date.getHours();
let ids = 18;
for(let i = 9; i<ids;i++ ){
let element_hour = document.getElementById(`hour-${i}`);
let element_hour_id = element_hour.id;
let element_hour_id_value = element_hour_id.replace('hour-', '');
if(element_hour_id_value == hours){
  element_hour.classList.remove('past');
  element_hour.classList.add('present');
}else if(element_hour_id_value > hours){
  element_hour.classList.remove('past');
  element_hour.classList.remove('present')
  element_hour.classList.add('future');
}
}



$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
