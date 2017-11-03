$( document ).ready(function() {

    $( "#searchBar" ).keyup(function( event ) {

        $.get( "/reports/fuzzySearch", { searchTerm: $("#searchBar").val()}).done(function( data ) {
            if(event.keyCode == 13)
            {
                $("#reportDisplayDiv").html("<div id=\"reportDisplayDiv\" class=\"row\"></div>");
                data.forEach(function(report) {
                    $("#reportDisplayDiv").append("<div class=\"col-md-4\"><div class=\"products_box\"><h4>Instant Report</h4><p class=\"products_price\">99</p><ul class=\"products_list\"><li>Address: "  + report.address + "</li><li>MLS: " + report.mls + "</li><li>Inspector: " + report.inspector + "</li></ul><div><a href=\"javascript'';\" class=\"btn_type1\"><span>Order Now</span></a></div></div></div>");
                });
                $("#reportDisplayDiv").append("<div class=\"col-md-4\"><div class=\"products_box\"><h4>Schedule Inspection</h4><p class=\"products_price\">250</p><ul class=\"products_list\"><li>Schedule within 24 Hours</li><li>Licensed Professional</li><li>Online Report Portal</li></ul><div><a href=\"javascript'';\" class=\"btn_type1\"><span>Schedule Now</span></a></div></div></div>");
                $('html,body').animate({ scrollTop: $("#reportDisplayDiv").offset().top - 100}, 'slow');
            }
            else
            {
                var availableTags = [...new Set(data.map(i=>i.address))].concat([...new Set(data.map(i=>i.mls))]);
                $( "#searchBar" ).autocomplete({
                    source: availableTags
                });
            }
        });
    });
});