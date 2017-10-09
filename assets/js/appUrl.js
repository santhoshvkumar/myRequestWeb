/* exported   domainAddress */

//var domainAddress = "https://dev.api.myrequest.co.uk/";

var domainAddress = "https://api.myrequest.co.uk/";

// var domainAddress = "http://localhost:8888/myRequestHome/myrequestapi/";

var getCountry = localStorage.getItem("MyRequest_countryCode");

var adminType = localStorage.getItem("MyRequest_AdminType");
    if(adminType == "SuperAdmin"){
        $("body").addClass("bgUKImage");
    }

    if(getCountry == "UK"){
        $("body").addClass("bgUKImage");
    } else if(getCountry == "US"){
        $("body").addClass("bgUSImage");
    } else if(getCountry == "Canada"){
        $("body").addClass("bgCanImage");
    } else if(getCountry == "India"){
        $("body").addClass("bgIndImage");
    }