/* exported   domainAddress */

//var domainAddress = "https://dev.api.myrequest.co.uk/";

var domainAddress = "https://api.myrequest.co.uk/";

// var domainAddress = "http://localhost:8888/Navaneeth/myRequestHome/myrequestapi/";

var getCountry = localStorage.getItem("MyRequest_countryCode");
var getNewCountryCode = localStorage.getItem("MyRequest_NewCountryCode");

var adminType = localStorage.getItem("MyRequest_AdminType");
    if(adminType == "SuperAdmin"){
        // $("body").addClass("bgUKImage");
        if(getNewCountryCode == "US"){
            $("body").addClass("bgUSImage");
        } else if(getNewCountryCode == "Canada"){
            $("body").addClass("bgCanImage");
        } else if(getNewCountryCode == "India"){
            $("body").addClass("bgIndImage");
        } else {
            $("body").addClass("bgUKImage");
        }
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