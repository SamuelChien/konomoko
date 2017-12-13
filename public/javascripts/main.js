$( document ).ready(function() {

    $("#sellMyReportBtn").click(function(){
        window.location.href = "/dashboard";
    });

    $("#feedbackBtn").click(function(){
        window.location.href = "/feedback";
    });
    
    $("#paymentForm").hide();

    $("#searchResult").hide();

    $(document).on('click', ".buyReport", function(event){
        event.preventDefault();
        $("#hiddenBuyReportOption").val("true");
        $("#hiddenReportId").val($(this).attr('href'));
        $("#submitButton").text("Pay $150");
        $("#paymentForm").show();
        $('html,body').animate({ scrollTop: $("#paymentForm").offset().top - 50}, 'slow');

    });

    $(document).on('click', ".scheduleReport", function(event){
        event.preventDefault();
        $("#hiddenBuyReportOption").val("false");
        $("#submitButton").text("Pay $400");
        $("#paymentForm").show();
        $('html,body').animate({ scrollTop: $("#paymentForm").offset().top - 50}, 'slow');
    });


    $("#report-on-the-go-button").click(function() {
    $('html,body').animate({
        scrollTop: $("#section1").offset().top},
        'slow');
    });
});