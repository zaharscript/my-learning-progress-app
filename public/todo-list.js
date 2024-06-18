// Add JavaScript to dynamically update button text based on accordion state
// $('#collapseExample').on('show.bs.collapse hide.bs.collapse', function () {
//   $('#toggleButton1').text($(this).hasClass('show') ? 'Collapse' : 'Expand');
// });

// $('#collapseExample2').on('show.bs.collapse hide.bs.collapse', function () {
//   $('#toggleButton2').text($(this).hasClass('show') ? 'Collapse' : 'Expand');
// });

// $('#collapseExample3').on('show.bs.collapse hide.bs.collapse', function () {
//   $('#toggleButton3').text($(this).hasClass('show') ? 'Collapse' : 'Expand');
// });

$(document).ready(function () {
  $("#collapse").click(function () {
    // Toggle button text
    var buttonText =
      $(this).attr("aria-expanded") === "false" ? "Collapse " : "Expand ";
    $(this).text(buttonText);
  });
  
});

document.getElementById('checkBox').addEventListener('click', function (e) {
  e.preventDefault(); // Prevent the default checkbox behavior
  // Your checkbox handling logic here
});

$(document).ready(function(){
  $('#toggleButton').on("click",function(){
    if($(this).prop('checked')){
     
      $('#collapseOne').attr('id', 'collapseOneNew').removeClass('collapseNew').addClass('collapse');
    } else {
      
      $('#collapseOneNew').attr('id', 'collapseOne').removeClass('collapse').addClass('collapseNew');
    }
  });
});