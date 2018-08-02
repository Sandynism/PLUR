$(function () {
    $("#startdatepicker").datepicker({ 
          autoclose: true, 
          todayHighlight: true
    }).datepicker('update', new Date());
})
    $("#enddatepicker").datepicker({ 
        autoclose: true, 
        todayHighlight: true
  })