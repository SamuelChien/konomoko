$( document ).ready(function() {
    $( "#target" ).submit(function( event ) {
        $.get( "/reports/getreportsbymls", { mls: $("#searchBox").val()} )
            .done(function( data ) {
                console.log(data);
                $("#searchResultList").html("");
                data.forEach(function(item){
                    console.log(item);
                    $("#searchResultList").append("<li><a href='/pdf/"+ item.mls + ".pdf'>" + item.address +"</a></li>");
                });
            });

        event.preventDefault();
    });
});