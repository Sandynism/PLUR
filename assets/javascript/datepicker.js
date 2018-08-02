$(function () {
    $("#startDatePicker").datepicker({ 
          autoclose: true, 
          todayHighlight: true
    }).datepicker('update', new Date());
})
    $("#endDatePicker").datepicker({ 
        autoclose: true, 
        todayHighlight: true
  })

//   $(function () {
//     $('.listing-block').slimScroll({
//         height: '500px'
//     });
// });
// what is this for?