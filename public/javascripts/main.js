$( document ).ready(function() {

    $("#reportSearch").click(function(){
        window.location.href = "/";
    });

    $("#sellMyReportBtn").click(function(){
        window.location.href = "/dashboard";
    });

    $("#feedbackBtn").click(function(){
        window.location.href = "/feedback";
    });

    $("#scheduleButton").click(function(){
        window.location.href = "/";
    });
    
    $("#paymentForm").hide();

    $("#searchResult").hide();

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


    $("#report-on-the-go-button").click(function() {
    $('html,body').animate({
        scrollTop: $("#section1").offset().top},
        'slow');
    });
});