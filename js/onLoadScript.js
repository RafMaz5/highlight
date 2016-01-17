$(document).ready(function () {
  var querystr = 'casta';
  var result = "dlòfCastasa sacastalcucaclator";
  var reg = new RegExp(querystr, 'gi');
  var final_str = 'foo ' + result.replace(reg, function(str) {return '<b>'+str+'</b>'});

  var reg2 = new RegExp('sta', 'gi');
  var final_str2 = 'fuffa' + final_str.replace(reg2, function(str) {return '<span style="color:aqua; font-style: italic;">'+str+'</span>'});

  $('#id').html(final_str2);

  var trigger = $('.hamburger'),
      overlay = $('.overlay'),
     isClosed = false;

    trigger.bind("mouseover", function () {
      hamburger_cross();      
    });

    function hamburger_cross() {

      if (isClosed == true) {          
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      } else {   
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
  }
  
  $('[data-toggle="offcanvas"]').bind('mouseover', function () {
        $('#wrapper').toggleClass('toggled');
  });  
  $('.overlay').bind('click', function () {
        trigger.trigger('mouseover');
  });
});

/* display div like table Liketable
$(function () {
    $('.like-table > .like-tr div.click').on('click', function(event) {
        event.preventDefault();
        $('#myModal').modal('show');
    });
});
*/






/* SELECTION JAVASCRIPT

selection = undefined;
(function ($, window) {

    $.fn.contextMenu = function (settings) {

        return this.each(function () {

            // Open context menu
            $(this).on("contextmenu", function (e) {
                // return native menu if pressing control
                if (e.ctrlKey) return;
                
                //open menu
                $(settings.menuSelector)
                    .data("invokedOn", $(e.target))
                    .show()
                    .css({
                        position: "absolute",
                        left: getMenuPosition(e.clientX, 'width', 'scrollLeft'),
                        top: getMenuPosition(e.clientY, 'height', 'scrollTop')
                    })
                    .off('click')
                    .on('click', function (e) {
                        $(this).hide();
                
                        var $invokedOn = $(this).data("invokedOn");
                        var $selectedMenu = $(e.target);
                        
                        settings.menuSelected.call(this, $invokedOn, $selectedMenu);
                });
                
                return false;
            });

            //make sure menu closes on any click
            $(document).click(function () {
                $(settings.menuSelector).hide();
            });
        });
        
        function getMenuPosition(mouse, direction, scrollDir) {
            var win = $(window)[direction](),
                scroll = $(window)[scrollDir](),
                menu = $(settings.menuSelector)[direction](),
                position = mouse + scroll;
                        
            // opening menu would pass the side of the page
            if (mouse + menu > win && menu < mouse) 
                position -= menu;
            
            return position;
        }    

    };
        $( "#select-text" ).contextMenu({
            menuSelector: "#contextMenu",
            menuSelected: function (invokedOn, selectedMenu) {
                var msg = "You selected the menu item '" + selectedMenu.text() +
                    "' on the value '" + invokedOn.text() + "'";
                alert(selection);
            }
        });
    $( "#select-text" ).select(function(e) {
        
        if (window.getSelection) {
          selection = window.getSelection();
        } else if (document.selection) {
          selection = document.selection.createRange();
        }
        $(this).trigger('contextmenu');
        $('[data-toggle="offcanvas"]').click();
        $( "#idiv" ).text( "Something was selected" ).show().fadeOut( 1000 );
    });
    $("#myTable td").contextMenu({
        menuSelector: "#contextMenu",
        menuSelected: function (invokedOn, selectedMenu) {
            var msg = "You selected the menu item '" + selectedMenu.text() +
                "' on the value '" + invokedOn.text() + "'";
            alert(msg);
        }
    });
})(jQuery, window);
*/
/*
$(function(){


    $(".overlay").click(function(){
        $('[data-toggle="offcanvas"]').click();
    })
    var fileSelect = document.getElementById("fileSelect"),
    fileElem = document.getElementById("fileElem");

    fileSelect.addEventListener("click", function (e) {
        if (fileElem) {
            fileElem.click();
        }
        e.preventDefault(); // prevent navigation to "#"
    }, false);

});
*/