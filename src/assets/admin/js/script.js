/*
Author       : Dreamguys
Template Name: Mentoring - Bootstrap Admin Template
Version      : 1.0
*/

(function($) {
  "use strict";

// Variables declarations


var $slimScrolls = $('.slimscroll');

// Sidebar


// Page Content Height

if($('.page-wrapper').length > 0 ){
  var height = $(window).height();
  $(".page-wrapper").css("min-height", height);
}

// Page Content Height Resize

$(window).resize(function(){
  if($('.page-wrapper').length > 0 ){
    var height = $(window).height();
    $(".page-wrapper").css("min-height", height);
  }
});

// Select 2

  if ($('.select').length > 0) {
      $('.select').select2({
          minimumResultsForSearch: -1,
          width: '100%'
      });
  }

// Datetimepicker

// if($('.datetimepicker').length > 0 ){
//   $('.datetimepicker').datetimepicker({
//     format: 'DD/MM/YYYY',
//     icons: {
//       up: "fa fa-angle-up",
//       down: "fa fa-angle-down",
//       next: 'fa fa-angle-right',
//       previous: 'fa fa-angle-left'
//     }
//   });
//   $('.datetimepicker').on('dp.show',function() {
//     $(this).closest('.table-responsive').removeClass('table-responsive').addClass('temp');
//   }).on('dp.hide',function() {
//     $(this).closest('.temp').addClass('table-responsive').removeClass('temp')
//   });
// }

// Tooltip

if($('[data-bs-toggle="tooltip"]').length > 0 ){
  $('[data-bs-toggle="tooltip"]').tooltip();
}

  // Datatable

  if ($('.datatable').length > 0) {
      $('.datatable').DataTable({
          "bFilter": false,
      });
  }

// Sidebar Slimscroll

if($slimScrolls.length > 0) {
  $slimScrolls.slimScroll({
    height: 'auto',
    width: '100%',
    position: 'right',
    size: '7px',
    color: '#ccc',
    allowPageScroll: false,
    wheelStep: 10,
    touchScrollStep: 100
  });
  var wHeight = $(window).height() - 60;
  $slimScrolls.height(wHeight);
  $('.sidebar .slimScrollDiv').height(wHeight);
  $(window).resize(function() {
    var rHeight = $(window).height() - 60;
    $slimScrolls.height(rHeight);
    $('.sidebar .slimScrollDiv').height(rHeight);
  });
}

// Small Sidebar

$(document).on('click', '#toggle_btn', function() {
  if($('body').hasClass('mini-sidebar')) {
    $('body').removeClass('mini-sidebar');
    $('.subdrop + ul').slideDown();
  } else {
    $('body').addClass('mini-sidebar');
    $('.subdrop + ul').slideUp();
  }
  setTimeout(function(){
    // mA.redraw();
    // mL.redraw();
  }, 300);
  return false;
});
$(document).on('mouseover', function(e) {
  e.stopPropagation();
  if($('body').hasClass('mini-sidebar') && $('#toggle_btn').is(':visible')) {
    var targ = $(e.target).closest('.sidebar').length;
    if(targ) {
      $('body').addClass('expand-menu');
      $('.subdrop + ul').slideDown();
    } else {
      $('body').removeClass('expand-menu');
      $('.subdrop + ul').slideUp();
    }
    return false;
  }
});

//Full Screen
function toggleFullscreen(elem) {
  elem = elem || document.documentElement;
  if (!document.fullscreenElement && !document.mozFullScreenElement &&
  !document.webkitFullscreenElement && !document.msFullscreenElement) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
  }
  } else {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
  }
}

document.getElementById('btnFullscreen').addEventListener('click', function() {
  toggleFullscreen();
});

})(jQuery);
