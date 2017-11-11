$( document ).ready(function() {

    $("#paymentForm").hide();

    $(document).on('click', ".btn_type1", function(event){
        event.preventDefault();
        $("#hiddenReportId").val($(this).attr('href'));
        $("#paymentForm").show();
        $('html,body').animate({ scrollTop: $("#paymentForm").offset().top - 50}, 'slow');

    });

    $(document).on('click', ".btn_type3", function(event){
        event.preventDefault();
        alert($(this).attr('href'));
    });

    $( "#searchBar" ).keyup(function( event ) {

        $.get( "/reports/fuzzySearch", { searchTerm: $("#searchBar").val()}).done(function( data ) {
            if(event.keyCode == 13)
            {
                $("#reportDisplayDiv").html("<div id=\"reportDisplayDiv\" class=\"row\"></div>");
                if(data.length != 0)
                {
                    data.forEach(function(report) {
                        $("#reportDisplayDiv").append("<div class=\"col-md-4\"><div class=\"products_box\"><h4>Report</h4><p class=\"products_price\">99</p><ul class=\"products_list\"><li>Address: "  + report.address + "</li><li>MLS: " + report.mls + "</li><li>Inspector: " + report.inspector + "</li></ul><div><a href=\"" + report.report_id + "\" class=\"btn_type1\"><span>Order Now</span></a></div></div></div>");
                    });
                }
                else
                {
                    $("#reportDisplayDiv").append("<div class=\"col-md-4\"><div class=\"products_box\"><h4>Schedule Inspection</h4><p class=\"products_price\">250</p><ul class=\"products_list\"><li>Schedule within 48 Hours</li><li>Licensed Professional</li><li>Refund $50 for Every Additional Buyer</li></ul><div><a href=\"" + $("#searchBar").val() + "\" class=\"btn_type3\"><span>Schedule Now</span></a></div></div></div>");
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