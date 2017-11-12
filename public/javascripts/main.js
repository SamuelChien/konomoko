$( document ).ready(function() {

    $("#paymentForm").hide();

    $(document).on('click', ".buyReport", function(event){
        event.preventDefault();
        $("#hiddenBuyReportOption").val("true");
        $("#hiddenReportId").val($(this).attr('href'));
        $("#submitButton").text("Pay $99");
        $("#paymentForm").show();
        $('html,body').animate({ scrollTop: $("#paymentForm").offset().top - 50}, 'slow');

    });

    $(document).on('click', ".scheduleReport", function(event){
        event.preventDefault();
        $("#hiddenBuyReportOption").val("false");
        $("#submitButton").text("Pay $250");
        $("#paymentForm").show();
        $('html,body').animate({ scrollTop: $("#paymentForm").offset().top - 50}, 'slow');
    });

    $( "#searchBar" ).keyup(function( event ) {
        $("#paymentForm").hide();
        $.get( "/reports/fuzzySearch", { searchTerm: $("#searchBar").val()}).done(function( data ) {

            if(event.keyCode == 13)
            {
                $("#reportDisplayDiv").html("<div id=\"reportDisplayDiv\" class=\"row\"></div>");
                if(data.length != 0)
                {
                    data.forEach(function(report) {
                        $("#reportDisplayDiv").append("<div class=\"col-md-4\"><div class=\"products_box\"><h4>Report</h4><p class=\"products_price\">99</p><ul class=\"products_list\"><li>Address: "  + report.address + "</li><li>MLS: " + report.mls + "</li><li>Inspector: " + report.inspector + "</li></ul><div><a href=\"" + report.report_id + "\" class=\"btn_type1 buyReport\"><span>Order Now</span></a></div></div></div>");
                    });
                }
                else
                {
                    $("#reportDisplayDiv").append("<div class=\"col-md-4\"><div class=\"products_box\"><h4>Schedule Inspection</h4><p class=\"products_price\">250</p><ul class=\"products_list\"><li>Schedule within 48 Hours</li><li>Licensed Professional</li><li>Refund $50 for Every Additional Buyer</li></ul><div><a href=\"" + $("#searchBar").val() + "\" class=\"btn_type1 scheduleReport\"><span>Schedule Now</span></a></div></div></div>");
                }
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