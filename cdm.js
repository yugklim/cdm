(function (cdm) {

    function xml_to_string(xml_node) {
        if (xml_node.xml)
            return xml_node.xml;
        else if (XMLSerializer) {
            var xml_serializer = new XMLSerializer();
            return xml_serializer.serializeToString(xml_node);
        }
        else {
            alert("ERROR: Extremely old browser");
            return "";
        }
    }
    cdm.onLoad = function() {

        $.ajax({
            type: "GET",
            //dataType: 'xml',
            url: "http://localhost/x?sql=SELECT+*+FROM+dbo.Table2+FOR+XML+AUTO&root=root",
            //url: "/x",
            //contentType: "text/plain",
            username: 'sa',
            password: 'jacques1#',
            crossDomain : true,
            xhrFields: {
                withCredentials: true
            }
        })
            .done(function( data ) {
                console.log("done");
                var x = $.xml2json(data);
                $('textarea').text($.xml2json(data).message);
                //text(xml_to_string(data));
            })
            .fail( function(xhr, textStatus, errorThrown) {
                alert(xhr.responseText + textStatus);
            });

        //$.ajax({url: "http://www.kcm.org.ua/", success: function(result){
        //    $("body").html(result);
        //}});

        //$.get("http://www.kcm.org.ua/", function(data,status,xhr){
        //    alert("status " + status);
       //});

    }

}(window.cdm = window.cdm || {}));

$(function() {

    cdm.onLoad();
})

