/**
 * Created by vitaliy on 09.06.15.
 */
$.ajax({
    url: "test.html",
    context: document.body
}).done(function() {
    $( this ).addClass( "done" );
});


$.ajax({
    type: "POST",
    url: url,
    data: data,
    success: success,
    dataType: dataType
});

$.post( "ajax/test.html", function( data ) {
    $( ".result" ).html( data );
});

/* if GET url = demo_get2.asp?fname=Henry&lname=Ford */
/*If POST params = fname=Henry&lname=Ford*/
AjaxRequest = function(params, id){

    var XHR=window.XDomainRequest||window.XMLHttpRequest;
    var xhr=new XHR();
    xhr.open('POST','/update_brief_blocks_fields/',true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload=function(){var response=null;};
    xhr.onerror=function(){var response="Error";};
    xhr.send(params);
}