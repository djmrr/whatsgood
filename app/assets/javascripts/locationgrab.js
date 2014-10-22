
  if (navigator.geolocation) {
   var timeoutVal = 10 * 1000 * 1000;
   navigator.geolocation.getCurrentPosition(
     displayPosition, 
     displayError,
     { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
   );
  } else {
   alert("Geolocation is not supported by this browser");
  }

  function displayPosition(position) {
    // alert("Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.latitude);
    $("#latitudesnagg").val(position.coords.latitude);
    $("#longitudesnagg").val(position.coords.longitude);  
    //document.getElementByID("latitudesnagg").innerHTML().value = new Float (JSON.parse(position.coords.latitude));
    //document.getElementByID("longitudesnagg").innerHTML().value = new Float (JSON.parse(position.coords.longitude));
  }



  // $.ajax({ 
  //     type: 'POST', 
  //     url: 'static_pages/home', 
  //     data: {'@latlatlat' : My_id_lat, 
  //       '@lonlonlon' : My_id_lon, 
  //     success: function(data){
  //       alert('finally');
  //       alert("#{@latlatlat}");
  //       alert("#{@lonlonlon}");
  //     } 
  // }); 

  function displayError(error) {
   var errors = { 
     1: 'Permission denied',
     2: 'Position unavailable',
     3: 'Request timeout'
   };
   alert("Error: " + errors[error.code]);
  }



// $('.your-class-name').click(function(){
//   var my_id = $(this).attr('id');
//   var url = window.location.href;
//   $.get(url,{your-variable-to-catch-in-controller : my_id}).done(function() {
//     alert("done!");
// //Do stuff
//     });
// });

// $(window).load(function()



$(window).load(function partyOverhurrr(){
  var my_id_lat = $("#latitudesnagg").val();
  var my_id_lon = $("#longitudesnagg").val();
  // var url = '/static_pages/home';
  // debugger;
  setTimeout(function() {
    $.ajax({
      url: '/static_pages/home.json',
      type: 'GET',
      // beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      data: {
        latlatlat: $("#latitudesnagg").val(), 
        lonlonlon: $("#longitudesnagg").val()
      }
    }).done(function(data){
      console.log(data)
      alert('snagged the coordzz');
    });
  }, 400);
}
); 

// $.ajax({
//       url: '/staff/accept_answer',
//       type: 'PUT',
//       data: {
//         accepted: $(this).prop('checked'),
//         answer_id: $(this).attr('id')
//       }
//     });


// partyOverhurrr(); 



// function betheParty(postion){
//   var my_id_lat = $(this).attr("#latitudesnagg").val;
//   var my_id_lon = $(this).attr("#longitudesnagg").val;
//   var url = window.location.href;
//   $.get(url,{@latlatlat : my_id_lat, @lonlonlon : my_id_lon}).done(function(){
//     alert('snagged the coordzzz');
//   });  
// }


// function locationNation(position) {
//   var grabbedLat = position.coords.latitude;
//   var grabbedLon = position.coords.longitude;
//   document.getElementByID("latitudesnag").innerHTML.value = (JSON.parse(grabbedLat));
//   document.getElementByID("longitudesnag").innerHTML.value = (JSON.parse(grabbedLon));
//   document.cookie = 'sconsnaggedLat='+grabbedLat+'; expires=Wed, 1 Jan 2070 13:47:11 UTC; path=/static_pages/'
//   document.cookie = 'sconsnaggedLon='+grabbedLon+'; expires=Wed, 1 Jan 2070 13:47:11 UTC; path=/static_pages/'
// }

