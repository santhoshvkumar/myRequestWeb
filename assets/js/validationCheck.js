/*eslint no-unused-vars: "error"*/
/* global  domainAddress, $ */
/*exported validationCheckForLogin, isNumber, isValidEmailAddress */
var sendURL = domainAddress + 'LoginAdminUser', userName = "", adminUserID = 0, adminType = "", businessName = "", lettingAgencyCode = "",  logo = "",
    businessEmail = "", isAgreeCheck = "", diffDate, count, user, validationCheckForLogin, isNumber, isValidEmailAddress, phoneCode, country, countryCode, gmt, phoneCode;
validationCheckForLogin = function( emailID, password, userTokenID ) {
  var dataForm = '{"Email":"' + emailID + '","Password":"' + password + '","UserToken":"' + userTokenID + '"}';
  console.log( sendURL );
  $.ajax( {
          type: "POST",
          url: sendURL,
          data: dataForm,
          success: function( dataCheck ) {
            console.log( dataCheck );
            count = dataCheck.record_count;
            console.log( count );
            for ( user in dataCheck.records ) {
              adminUserID = dataCheck.records[ user ].AdminID;
              userName = dataCheck.records[ user ].FirstName + " " + dataCheck.records[ user ].LastName;
              adminType = dataCheck.records[ user ].AdminType;
              businessName = dataCheck.records[ user ].BusinessName;
              lettingAgencyCode = dataCheck.records[ user ].LettingAgencyCode;
              diffDate = dataCheck.records[ user ].DiffDate;
              logo = dataCheck.records[ user ].logo;
              businessEmail = dataCheck.records[ user ].BusinessEmail;
              isAgreeCheck = dataCheck.records[ user ].IsAgreeUtility;
              country = dataCheck.records[ user ].Country;
              
              switch(country){
                    case "India":
                        countryCode="India";
                        gmt ="GMT+5:30";
                        phoneCode="+91";
                        break;
                    case "UK":
                        countryCode="UK";
                        gmt ="GMT+0:00";
                        phoneCode="+44";
                        break;
                    case "Canada":
                        countryCode="Canada";
                        gmt ="GMT-5:00";
                        phoneCode="+1";
                        break;
                    case "US":
                        countryCode="US";
                        gmt ="GMT-5:00";
                        phoneCode="+1";
                        break;
                }
            }

            if ( count === 0 ) {
              alert( "Please Check the UserName or Password" );
              return false;
            } else {
              localStorage.setItem( "MyRequest_AdminID", adminUserID );
              localStorage.setItem( "MyRequest_UserName", userName );
              localStorage.setItem( "MyRequest_AdminType", adminType );
              localStorage.setItem( "MyRequest_BusinessName", businessName );
              localStorage.setItem( "MyRequest_BusinessEmailID", businessEmail );
              localStorage.setItem( "MyRequest_LettingAgencyCode", lettingAgencyCode );
              localStorage.setItem( "MyRequest_myDiffDate", diffDate );
              localStorage.setItem( "MyRequest_Logo", logo );
              localStorage.setItem( "MyRequest_countryCode", countryCode );
              localStorage.setItem( "MyRequest_GMT", gmt );
              localStorage.setItem( "MyRequest_PhoneCode-prefix", phoneCode );
              localStorage.setItem( "MyRequest_IsAgreeUtility", isAgreeCheck );
              if ( adminType !== "SuperAdmin" ) {
                 $.get( domainAddress + "getAdminDetails/" + adminUserID, function( result ) {
                    if ( result.records[ 0 ].AdminFirstName === "" || result.records[ 0 ].Logo === "" || result.records[ 0 ].AdminLastName === "" || result.records[ 0 ].BusinessName === "" ||
                          result.records[ 0 ].Locality === "" || result.records[ 0 ].City === "" || result.records[ 0 ].State === "" || result.records[ 0 ].PhoneNumber === "" ||
                          result.records[ 0 ].EmergencyNumber === "" || result.records[ 0 ].EmergencyElectricityNumber === "" || result.records[ 0 ].UrlForRent === "" || result.records[ 0 ].BusinessEmail === "" ) {
                        localStorage.setItem( "MyRequest_profileFill", "true" );
                        window.location.href = 'MyProfile.html';
                    } else {
                       localStorage.setItem( "MyRequest_profileFill", "" );
                        window.location.href = "Dashboard.html";
                    }
                } );


               } else {
                  localStorage.setItem( "MyRequest_profileFill", "" );
                  window.location.href = "Dashboard.html";
                }  // Else for Admin Type
            }
          }
      } );
};


/********* To check isNumber & decimal ********/
isNumber = function( evt, element ) {
    var charCode = ( evt.which ) ? evt.which : event.keyCode;
    if ( ( charCode !== 45 || $( element ).val().indexOf( '-' ) !== -1 ) &&      // “-” CHECK MINUS, AND ONLY ONE.
        ( charCode !== 46 || $( element ).val().indexOf( '.' ) !== -1 ) &&      // “.” CHECK DOT, AND ONLY ONE.
        ( charCode < 48 || charCode > 57 ) ) {
          return false;
        }
     return true;
};
/********* End To check isNumber & decimal ********/
/********* To check email format ********/
isValidEmailAddress = function( emailAddress ) {
    var pattern = new RegExp( /^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i );
     return pattern.test( emailAddress );
};
/********* End To check email format ********/
$( "#page_content" ).click( function() {
    $( ".sidebar_main_swipe" ).removeClass( "sidebar_main_active" );
} );
