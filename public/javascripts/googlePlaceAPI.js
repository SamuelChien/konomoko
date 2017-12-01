 jQuery(document).ready(function () {
        initAutocomplete(); 
      });

    var placeSearch, autocomplete;

    function initAutocomplete() {
      // Create the autocomplete object, restricting the search to geographical
      // location types.

      var options = {
        componentRestrictions: {country: "us"}
       };

      autocomplete = new google.maps.places.Autocomplete(
          /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
          options);

      // When the user selects an address from the dropdown, populate the address
      // fields in the form.
      autocomplete.addListener('place_changed', alertChange);
    }

    function escapeRegex(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };

    function alertChange() {
      // Get the place details from the autocomplete object.
      var place = autocomplete.getPlace();

      $("#paymentForm").hide();
      $("#searchResult").show();
      $.get( "/reports/fuzzySearch", { searchTerm: escapeRegex($("#autocomplete").val())}).done(function( data ) {
          $("#reportDisplayDiv").html("<div id=\"reportDisplayDiv\" class=\"row\"></div>");
          if(data.length != 0)
          {
              data.forEach(function(report) {
                  $("#reportDisplayDiv").append("<div class=\"col-md-4\"><div class=\"products_box\"><h4>Report</h4><p class=\"products_price\">99</p><ul class=\"products_list\"><li>Address: "  + report.address + "</li><li>MLS: " + report.mls + "</li><li><a href=\"" + report.preview_location + "\">Preview</li></ul><div><a href=\"" + report.report_id + "\" class=\"btn_type1 buyReport\"><span>Order Now</span></a></div></div></div>");
              });
          }
          else
          {
              $("#reportDisplayDiv").append("<div class=\"col-md-4\"><div class=\"products_box\"><h4>Schedule Inspection</h4><p class=\"products_price\">250</p><ul class=\"products_list\"><li>Schedule within 48 Hours</li><li>Licensed Professional</li><li>Refund $50 for Every Additional Buyer</li></ul><div><a href=\"" + $("#searchBar").val() + "\" class=\"btn_type1 scheduleReport\"><span>Schedule Now</span></a></div></div></div>");
          }
          $('html,body').animate({ scrollTop: $("#reportDisplayDiv").offset().top - 100}, 'slow');
      });

    }

    // Bias the autocomplete object to the user's geographical location,
    // as supplied by the browser's 'navigator.geolocation' object.
    function geolocate() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          var circle = new google.maps.Circle({
            center: geolocation,
            radius: position.coords.accuracy
          });
          autocomplete.setBounds(circle.getBounds());
        });
      }
    }