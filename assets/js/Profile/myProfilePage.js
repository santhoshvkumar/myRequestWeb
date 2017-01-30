 var inputBusinessName = "";
 var inputAgencyCode = "";
 $(function() {
    var getPhoneCode = localStorage.getItem("MyRequest_PhoneCode-prefix");
    var adminType = localStorage.getItem("MyRequest_AdminType");

    if(adminType == "SuperAdmin"){
        $(".phno-prefix").text("+44");
        $(".adminEmerno-prefix").text("+44");
        $(".emerElectno-prefix").text("+44");
        $(".subAdminPhno-prefix").text("+44");
    }
    else{
        $(".phno-prefix").text(getPhoneCode);
        $(".adminEmerno-prefix").text(getPhoneCode);
        $(".emerElectno-prefix").text(getPhoneCode);
        $(".subAdminPhno-prefix").text(getPhoneCode);
    }

    $('#full_screen_toggle').on('click', function(e) {
       e.preventDefault();
       screenfull.toggle();
       $window.resize();
   })


    var $switcher = $('#style_switcher'),
    $switcher_toggle = $('#style_switcher_toggle'),
    $theme_switcher = $('#theme_switcher'),
    $mini_sidebar_toggle = $('#style_sidebar_mini');

    $switcher_toggle.click(function(e) {
       e.preventDefault();
       $switcher.toggleClass('switcher_active');
   });

    $("#getAddedit").click(function() {

       $(".inputTinymce").toggle();

       getTinymceContent('TermsCondition');


       $("#getLoadingModalContent").addClass('md-show');
       $.get(domainAddress + "GetTermCondition/" + adminUserID, {}, function(result) {
             //console.log(result);
             if (result.record_count == 0) {
               $("#hiddenTermsAndConditionID").val(0);
               $(".btnSubmitTermsAndCondition").show();
               $("#getLoadingModalContent").removeClass('md-show');
           } else {
               for (var getTermsCondition in result.records) {
                     //console.log(result.records[getTermsCondition].TermsCondition);
                     content = result.records[getTermsCondition].TermsCondition;

                     tinyMCE.get('inputTermsAndCondition').setContent(decodeURIComponent(result.records[getTermsCondition].TermsCondition));

                     $("#hiddenTermsAndConditionID").val(result.records[getTermsCondition].TermID);
                 }
                 $("#getLoadingModalContent").removeClass('md-show');
                 $(".btnSubmitTermsAndCondition").text("Update Terms And Condition");
                 $(".btnSubmitTermsAndCondition").show();
                 $(".md-fab-wrapper").hide();


             }
         });

});

 $theme_switcher.children('li').click(function(e) {
   e.preventDefault();
   var $this = $(this),
   this_theme = $this.attr('data-app-theme');

   $theme_switcher.children('li').removeClass('active_theme');
   $(this).addClass('active_theme');
   $('body')
   .removeClass('app_theme_a app_theme_b app_theme_c app_theme_d app_theme_e app_theme_f app_theme_g')
   .addClass(this_theme);

   if (this_theme == '') {
       localStorage.removeItem('altair_theme');
   } else {
       localStorage.setItem("altair_theme", this_theme);
   }

});


 $('input[name="radio_demo_inline1"]:checkBox').on('ifChecked', function(event) {
         //console.log(event.type + ' callback isVoid');
         $("#hiddenIsVoid").val(1);
     });


 $(".isAgreeReset").click(function() {
         //console.log("reset avail");
         $('.avail > div').removeClass('checked');
         $("#getAvail").prop("checked", false);
         $("#hiddenIsAgree").val(0);
     });

 $("#getAvail").on('change', function() {
         //console.log("Checked State : " + this.checked);
         if (this.checked) {
           $(".getIsVoid").show();
           $("#hiddenIsAgree").val(1);
       } else {
           $(".getIsVoid").hide();
           $("#hiddenIsAgree").val(0);
       }
   });

 $("#getVoid").on("change", function() {
   if (this.checked) {
       $("#hiddenIsVoid").val(1);
       $(".inVoidProgram").show();
   } else {
       $("#hiddenIsVoid").val(0);
       $(".inVoidProgram").hide();
       $(".showBillingAddress").hide();
   }
});
 $(".btnSubmitIsAgree").click(function() {
   $("#hiddenIsAgree").val(1);
   var isAgreeSet = $("#hiddenIsAgree").val();
   var modal = UIkit.modal("#modalAgreeSkip");
   var dataForm = '{"IsAgreeUtility":"' + isAgreeSet + '"}';
   var sendURL = domainAddress + 'UpdateAdminIsAgree/' + adminUserID;
   console.log(dataForm);
   console.log(sendURL);
   $.ajax({
       type: "POST",
       url: sendURL,
       data: dataForm,
       success: function(dataCheck) {
           console.log(dataCheck);
           modal.hide();
                 // UIkit.modal.alert("Is Agree done Successfully");
             }
         });

     }); // btnSubmitIsAgree



     // change input's state to checked if mini sidebar is active
     if ((localStorage.getItem("altair_sidebar_mini") !== null && localStorage.getItem("altair_sidebar_mini") == '1') || $('body').hasClass('sidebar_mini')) {
       $mini_sidebar_toggle.iCheck('check');
   }

     // toggle mini sidebar
     $mini_sidebar_toggle
     .on('ifChecked', function(event) {
       $switcher.removeClass('switcher_active');
       localStorage.setItem("altair_sidebar_mini", '1');
       location.reload(true);
   })
     .on('ifUnchecked', function(event) {
       $switcher.removeClass('switcher_active');
       localStorage.removeItem('altair_sidebar_mini');
       location.reload(true);
   });

     // hide style switcher
     $document.on('click keyup', function(e) {
       if ($switcher.hasClass('switcher_active')) {
           if (
               (!$(e.target).closest($switcher).length) ||
               (e.keyCode == 27)
               ) {
               $switcher.removeClass('switcher_active');
       }
   }
});

     if (localStorage.getItem("altair_theme") !== null) {
       $theme_switcher.children('li[data-app-theme=' + localStorage.getItem("altair_theme") + ']').click();
   }
});

 var domainAddrUploadImage = "";
 var adminUserID = "";
 var isAgreeUtilityCheck = "";
 var isVoidCheck = "";
 var isBillingAddress = "";

 $(".menuDashBoard").click(function(e) {
   var isFilled = localStorage.getItem("MyRequest_profileFill");
     //debugger;
     if (isFilled == "true")
       UIkit.notify("Please Make Sure that all values filled");
   else
       window.location.href = 'Dashboard.html';
});

 $("#menuCreateAdmin").click(function(e) {
   var isFilled = localStorage.getItem("MyRequest_profileFill");
   if (isFilled == "true")
       UIkit.notify("Please Make Sure that all values filled");
   else
       window.location.href = 'CreateAdmin.html';
});

 $("#menuSpeciality").click(function(e) {
   var isFilled = localStorage.getItem("MyRequest_profileFill");
   if (isFilled == "true")
       UIkit.notify("Please Make Sure that all values filled");
   else
       window.location.href = 'Speciality.html';
});


 $("#menuListPropery").click(function(e) {
   var isFilled = localStorage.getItem("MyRequest_profileFill");
   if (isFilled == "true")
       UIkit.notify("Please Make Sure that all values filled");
   else
       window.location.href = 'ListProperty.html';
});


 $("#menuContractor").click(function(e) {
   var isFilled = localStorage.getItem("MyRequest_profileFill");
   if (isFilled == "true")
       UIkit.notify("Please Make Sure that all values filled");
   else
       window.location.href = 'Contractor.html';
});


 $("#menuCreateAdmin").click(function(e) {
   var isFilled = localStorage.getItem("MyRequest_profileFill");
   if (isFilled == "true")
       UIkit.notify("Please Make Sure that all values filled");
   else
       window.location.href = 'CreateAdmin.html';
});

 $("#menuListTenant").click(function(e) {
   var isFilled = localStorage.getItem("MyRequest_profileFill");
   if (isFilled == "true")
       UIkit.notify("Please Make Sure that all values filled");
   else
       window.location.href = 'ListTenants.html';
});


 $("#menuListAllCase").click(function(e) {
   var isFilled = localStorage.getItem("MyRequest_profileFill");
   if (isFilled == "true")
       UIkit.notify("Please Make Sure that all values filled");
   else
       window.location.href = 'ListAllCase.html';
});



 $("#menuListTenant").click(function(e) {
   var isFilled = localStorage.getItem("MyRequest_profileFill");
   if (isFilled == "true")
       UIkit.notify("Please Make Sure that all values filled");
   else
       window.location.href = 'ListTenants.html';
});



 $("#menuAdvertisement").click(function(e) {
   var isFilled = localStorage.getItem("MyRequest_profileFill");
   if (isFilled == "true")
       UIkit.notify("Please Make Sure that all values filled");
   else
       window.location.href = 'Advertisement.html';
});


 $("#menuTerms").click(function(e) {
   var isFilled = localStorage.getItem("MyRequest_profileFill");
   if (isFilled == "true")
       UIkit.notify("Please Make Sure that all values filled");
   else
       window.location.href = 'TermsAndCondition.html';
});


 $("#menuPrivacy").click(function(e) {
   var isFilled = localStorage.getItem("MyRequest_profileFill");
   if (isFilled == "true")
       UIkit.notify("Please Make Sure that all values filled");
   else
       window.location.href = 'PrivacyPolicy.html';
});

 $("#menuNewsLetter").click(function(e) {
   var isFilled = localStorage.getItem("MyRequest_profileFill");
   if (isFilled == "true")
       UIkit.notify("Please Make Sure that all values filled");
   else
       window.location.href = 'NewsLetter.html';
});


 $('input[name="isBillingAddress"]:checkbox').on('ifChecked', function(event) {
     //console.log("isBillingAddress checkbox ifChecked");
     $(".showBillingAddress").show('slow');
     $(".btnSubmitBillingAddress").attr("disabled", false);
     isBillingAddress = 1;
 });

 $('input[name="isBillingAddress"]:checkbox').on('ifUnchecked', function(event) {
     //console.log("isBillingAddress checkbox unChecked");
     $(".showBillingAddress").hide('slow');
     $(".btnSubmitBillingAddress").attr("disabled", false);
     isBillingAddress = 0;
 });

 var adminUserID = "";
 var filePath = "";
 $(window).load(function() {
   $("#getLoadingModalContent").removeClass('md-show');
});

 $(document).ready(function() {
   console.log("ready call");
   var isFilled = localStorage.getItem("MyRequest_profileFill");
   if (isFilled == "true")
       UIkit.notify("Please Make Sure that all values filled");
   adminUserID = localStorage.getItem("MyRequest_AdminID");
   var adminUserName = localStorage.getItem("MyRequest_UserName");
   var adminType = localStorage.getItem("MyRequest_AdminType");

   var businessName = localStorage.getItem("MyRequest_BusinessName");
   var lettingAgencyCode = localStorage.getItem("MyRequest_LettingAgencyCode");
   var logo = localStorage.getItem("MyRequest_Logo");
   localStorage.setItem("MyRequest_RepairStatus", "");

   if (adminType == "SuperAdmin") {
    $(".myRequestAdminLogo").addClass("requestAdminLogo");
    $(".requestAdminLogo").removeClass("myRequestAdminLogo");
    $("#lettingAgentMenu").hide();
    $("#superAdminMenu").show();
} else {
    $(".myRequestAdminLogo").removeClass("requestAdminLogo");
    $("#lettingAgentMenu").show();
    $("#superAdminMenu").hide();
}
     //Not to allow Page
     $(".md-overlay").css("background", "rgba(0,0,0,0.5)");
     $("#getLoadingModalContent").addClass('md-show');
     $.get(domainAddress + "GetDateDiff/" + adminUserID, {}, function(result) {

       var getDiffDate = parseInt(result.records[0].DiffDate);


       var diffDate = 30 - getDiffDate;

       if (adminType == "SuperAdmin") {



       } else {
           if (diffDate < -6) {
               $("#mainBody").css("opacity", "0.1");
               $("#mainBody").css("pointer-events", "none");
               $("#mainBody").css("outline", "none");


               var modulus = Math.abs(diffDate);
               UIkit.modal.alert = function(content, options) {
                   var modal = UIkit.modal.dialog(([
                       '<div class="uk-margin uk-modal-content">' + String(content) + '<br > for immediate assitance Pls contact  <a href="mailto:enquiry@myrequest.co.uk"> Drop Us Mail </a></div>',
                       '<div class="uk-modal-footer uk-text-right">  <button class="md-btn md-btn-primary  uk-btn-CenterAlign" style="margin-top:15px;"><a href="https://dashboard.gocardless.com/api/paylinks/113KHDBWH0" style="color:#fcdb34" target="_blank">Pay Now</a></button></div>'
                       ]).join(""), UIkit.$.extend({
                           bgclose: false,
                           keyboard: false
                       }, options)).show();
                   return modal;
               };


               UIkit.modal.alert(messagePaymentDue.format(modulus), {
                   center: true
               }).on('hide.uk.modal', function() {
                     // custome js code
                 });



           }

       }
     }); // End's here
 if (adminUserID == "" || adminUserID == null) {
   window.location.href = "index.html";
} else {
   $(".getUserName").text(adminUserName);
   $("#FileURLUploadImage2").attr("action",domainAddress+"ajaximage.php");
   $("#FileURLUploadImage1").attr("action",domainAddress+"ajaximage.php");

}


if (adminType == "SuperAdmin") {
   $(".forAdmin").hide();
   $(".forSuperAdmin").show();
} else {
   $(".forAdmin").show();
   $(".forSuperAdmin").hide();
   if(logo==undefined || logo==null || logo=="undefined" || logo=="Fail upload folder with read access."){
    $(".myRequestAdminLogo").attr("src", "assets/img/myRequestLogo.png").show();
}
else{
    $(".myRequestAdminLogo").attr("src", domainAddress + logo).show();
    var getLogoImagePath = logo.slice(0,4);
    if(getLogoImagePath=="api/"){
        getLogoImagePath = logo.slice(4);
        $(".myRequestAdminLogo").attr("src", domainAddress + getLogoImagePath).show();
    }
    else{
        $(".myRequestAdminLogo").attr("src", domainAddress + logo).show();
    }
}
}

$("#inputTitle").select2();
$("#inputSubTitle").select2();
$("#inputBillingTitle").select2();

$("#inputCounty").select2()
.on("change", function(e) {
             //console.log("change val=" + $("#inputCounty").val());
             var stateID = $("#inputCounty").val();
             $.get("CityState/getCity.php?stateID=" + stateID, function(result) {
                 //debugger;
                 $("#inputBillingCity").html('');
                 $("#inputBillingCity").html("<option value='0'>Choose City</option>");
                 var getResult = JSON.parse(result);
                 for (inputCity in getResult.records) {
                   $("#inputBillingCity").append("<option value='" + getResult.records[inputCity].CityName + "'>" + getResult.records[inputCity].CityName + "</option>");
               }
               $("#getLoadingModalContent").removeClass('md-show');
               $("#inputBillingCity").select2();
           });
         });

$("#inputState").select2()
.on("change", function(e) {
             //console.log("change val=" + $("#inputState").val());
             var stateID = $("#inputState").val();
             $.get("CityState/getCity.php?stateID=" + stateID, function(result) {
                 //debugger;
                 $("#inputCity").html('');
                 $("#inputCity").html("<option value='0'>Choose City</option>");
                 var getResult = JSON.parse(result);
                 for (inputCity in getResult.records) {
                   $("#inputCity").append("<option value='" + getResult.records[inputCity].CityName + "'>" + getResult.records[inputCity].CityName + "</option>");
               }

               $("#getLoadingModalContent").removeClass('md-show');
               $("#inputCity").select2();
           });
         });
getUserProfile(adminUserID, false);

getAllSubAdminList(adminUserID);
getExistTermsAndCondition();
getExistPrivacypolicy();

 }); // ready

 function getExistPrivacypolicy() {
   $.get(domainAddress + "GetPrivacyPolicy/" + adminUserID, {}, function(result) {
         //console.log(result);
         if (result.record_count == 0) {
           $("#hiddenPrivacyPolicyID").val(0);

           $(".btnSubmitPrivacyPolicy").show();
       } else {
           for (var getPrivacyPolicy in result.records) {


               $("#hiddenPrivacyPolicyID").val(result.records[getPrivacyPolicy].PrivacyID);

           }

           $(".btnSubmitPrivacyPolicy").hide();

       }
   });
}

function getExistTermsAndCondition() {
   $.get(domainAddress + "GetTermCondition/" + adminUserID, {}, function(result) {
         //console.log(result);
         if (result.record_count == 0) {
           $("#hiddenTermsAndConditionID").val(0);
           $(".btnSubmitTermsAndCondition").show();

       } else {
           for (var getTermsCondition in result.records) {


               $("#hiddenTermsAndConditionID").val(result.records[getTermsCondition].TermID);

           }

           $(".btnSubmitTermsAndCondition").text("Update Terms And Condition");

           $(".btnSubmitTermsAndCondition").hide();

       }
   });
}

$("#inputPhoneNumber").keypress(function(e) {
   if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
       return false;
   }
});

$("#inputEmergencyNumber").keypress(function(e) {
   if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
       return false;
   }
});

$("#inputEmergencyElectricityNumber").keypress(function(e) {
   if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
       return false;
   }
});

$("#phoneNumber").keypress(function(e) {
   if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
       return false;
   }
});
var imageUrl1 = "";

$("#adminLogo").off('click').on('change', function() {
   $("#getLoadingModalContent").addClass('md-show');
     //console.log("image 1 upload click");
     var progressbox = $('#progressbox1');
     var progressbar = $('#progressbar1');
     var statustxt = $('#statustxt1');

     $("#preview1").html('');

     $("#FileURLUploadImage2").ajaxForm({
       target: '#preview1',
       beforeSubmit: function() {
           console.log('v');

       },
       uploadProgress: function(event, position, total, percentComplete) {
           console.log("on  progress");
             progressbar.width(percentComplete + '%') //update progressbar percent complete
             console.log(percentComplete);
             statustxt.html(percentComplete + '%'); //update status text
             $('#progressbar1').css("width", percentComplete + "%");
             $('#progressbox1').css("margin", "-40px 10px 10px 255px");
             $('#progressbox1').show();
             $('#progressbar1').show();

             if (percentComplete > 50) {
               console.log("if : " + percentComplete);
               statustxt.css('color', '#fff');
                 statustxt.html(percentComplete + '%'); //change status text to white after 50%
                 $('#progressbar1').css("width", percentComplete + "%");
                 $('#progressbox1').css("margin", "-40px 10px 10px 255px");
                 $('#progressbox1').show();
                 $('#progressbar1').show();
             }
             $(".btnSubmitProduct").attr("disabled", true);
         },
         success: function(result, percentComplete) {
           if (result == "Please select image..!") {
               $("#progressbox1").hide();
               alert("Please select image..!");
               return false;
           } else if (result == "Invalid file format..") {
               $("#progressbox1").hide();
               alert("Upload only JPG or PNG file format");
               return false;
           } else if (result == "Image file size max 1 MB") {
               $("#progressbox1").hide();
               alert("Upload Image file sixe less then 1 MB");
               return false;
           } else {
               if (percentComplete == "success") {
                   percentComplete = 100;
                   statustxt.html(percentComplete + ' %');
               }

               $('#progressbar1').css("width", percentComplete + "%");
               $('#progressbox1').css("margin", "-40px 10px 10px 255px");
               $('#progressbox1').show();
               $('#progressbar1').show();
               var getUrl = "url(" + result + ")";
               console.log('z ' + getUrl);
               imageUrl1 = result;
               console.log(imageUrl1);
               $(".help-block").hide();
               $(".help-block").text("");
               $("#getLoadingModalContent").removeClass('md-show');
               $(".btnUpdate").attr("disabled", false);
               $("#adminLogoImage").attr('src', domainAddress + imageUrl1);
               $(".inputBusinessLogo").attr('src', domainAddress + imageUrl1);
               $("#adminLogoImage").css("height", "80px").css("width", "110px");
               $(".fileupload-preview1").text(domainAddress + imageUrl1);
           }

       },
       error: function() {
           console.log('d');


       }
   }).submit();
});


 $("#inputFirstName").keyup(function() {
   var inputFirstName = $("#inputFirstName").val();
   if (inputFirstName == "") {
       $(".help-block").show();
       $(".help-block").text("* Enter the First Name");
       $(".btnUpdate").attr("disabled", true);
       return false;
   } else {
       $(".help-block").hide();
       $(".help-block").text("");
       $(".btnUpdate").attr("disabled", false);
   }
});


 $("#inputLastName").keyup(function() {
   var inputLastName = $("#inputLastName").val();
   if (inputLastName == "") {
       $(".help-block").show();
       $(".help-block").text("* Enter the Last Name");
       $(".btnUpdate").attr("disabled", true);
       return false;
   } else {
       $(".help-block").hide();
       $(".help-block").text("");
       $(".btnUpdate").attr("disabled", false);
   }
});


 $("#inputLocality").keyup(function() {
   var inputLocality = $("#inputLocality").val();
   if (inputLocality == "") {
       $(".help-block").show();
       $(".help-block").text("* Enter the Locality");
       $(".btnUpdate").attr("disabled", true);
       return false;
   } else {
       $(".help-block").hide();
       $(".help-block").text("");
       $(".btnUpdate").attr("disabled", false);
   }
});

 $("#inputCountry").keyup(function() {
   var inputCountry = $("#inputCountry").val();
   if (inputCountry == "") {
       $(".help-block").show();
       $(".help-block").text("* Enter the Country");
       $(".btnUpdate").attr("disabled", true);
       return false;
   } else {
       $(".help-block").hide();
       $(".help-block").text("");
       $(".btnUpdate").attr("disabled", false);
   }
});



 $("#inputState").on('change', function() {
   var inputState = $("#inputState").val();
   if (inputState == 0) {
       $(".help-block").show();
       $(".help-block").text("* Select the County");
       $(".btnUpdate").attr("disabled", true);
       return false;
   } else {
       $(".help-block").hide();
       $(".help-block").text("");
       $(".btnUpdate").attr("disabled", false);
   }
});



 $("#inputCity").on('change', function() {
   var inputCity = $("#inputCity").val();
   if (inputCity == 0) {
       $(".help-block").show();
       $(".help-block").text("* Select the City");
       $(".btnUpdate").attr("disabled", true);
       return false;
   } else {
       $(".help-block").hide();
       $(".help-block").text("");
       $(".btnUpdate").attr("disabled", false);
   }
});



 $("#inputEmail").keyup(function() {
   var inputEmail = $("#inputEmail").val();
   if (inputEmail == "") {
       $(".help-block").show();
       $(".help-block").text("* Enter the EmailID");
       $(".btnUpdate").attr("disabled", true);
       return false;
   } else {
       $(".help-block").hide();
       $(".help-block").text("");
       $(".btnUpdate").attr("disabled", false);
   }
});


 $("#inputPassword").keyup(function() {
   var inputPassword = $("#inputPassword").val();
   if (inputPassword == "") {
       $(".help-block").show();
       $(".help-block").text("* Enter the Password");
       $(".btnUpdate").attr("disabled", true);
       return false;
   } else {
       $(".help-block").hide();
       $(".help-block").text("");
       $(".btnUpdate").attr("disabled", false);
   }
});


 $("#inputUrlRent").keyup(function() {
   var inputUrlRent = $("#inputUrlRent").val();
   if (inputUrlRent == "") {
       $(".help-block").show();
       $(".help-block").text("* Enter the Url For How To Rent");
       $(".btnUpdate").attr("disabled", true);
       return false;
   } else {
       $(".help-block").hide();
       $(".help-block").text("");
       $(".btnUpdate").attr("disabled", false);
   }
});




 $("#inputPhoneNumber").keyup(function() {
   var inputPhoneNumber = $("#inputPhoneNumber").val();
   if (inputPhoneNumber == "") {
       $(".phno-prefix").hide();
       $("#inputPhoneNumber").removeAttr('style');
       $(".help-block").show();
       $(".help-block").text("* Enter the Phone Number");
       $(".btnUpdate").attr("disabled", true);
       return false;
   } else {
       $(".phno-prefix").show();
       $("#inputPhoneNumber").css("padding", "10px 10px 13px 30px");
       $(".help-block").hide();
       $(".help-block").text("");
       $(".btnUpdate").attr("disabled", false);
   }
});


 $("#inputEmergencyNumber").keyup(function() {
   var inputEmergencyNumber = $("#inputEmergencyNumber").val();
   if (inputEmergencyNumber == "") {
       $(".adminEmerno-prefix").hide();
       $("#inputEmergencyNumber").removeAttr('style');
       $(".help-block").show();
       $(".help-block").text("* Enter the Emergency Number");
       $(".btnUpdate").attr("disabled", true);
       return false;
   } else {
       $(".adminEmerno-prefix").show();
       $("#inputEmergencyNumber").css("padding", "10px 10px 10px 32px");
       $(".help-block").hide();
       $(".help-block").text("");
       $(".btnUpdate").attr("disabled", false);
   }
});

 $("#inputEmergencyElectricityNumber").keyup(function() {
   var inputEmergencyElectricityNumber = $("#inputEmergencyElectricityNumber").val();
   if (inputEmergencyElectricityNumber == "") {
       $(".emerElectno-prefix").hide();
       $("#inputEmergencyElectricityNumber").removeAttr('style');
       $(".help-block").show();
       $(".help-block").text("* Enter the Emergency Number");
       $(".btnUpdate").attr("disabled", true);
       return false;
   } else {
       $(".emerElectno-prefix").show();
       $("#inputEmergencyElectricityNumber").css("padding", "10px 10px 10px 32px");
       $(".help-block").hide();
       $(".help-block").text("");
       $(".btnUpdate").attr("disabled", false);
   }
});


 $("#firstName").keyup(function() {
   var inputFirstName = $("#firstName").val();
   if (inputFirstName == "") {
       $(".errorInfo").show();
       $("#firstName").css("border-color", "red");
       $(".errorInfo").text("* Enter the First Name");
       $(".btnUpdate").attr("disabled", true);
       return false;
   } else {
       $(".errorInfo").hide();
       $(".errorInfo").text("");
       $("#firstName").css("border-color", "rgba(0,0,0,.12)");
       $(".btnUpdate").attr("disabled", false);
   }
});

 $("#lastName").keyup(function() {
   var inputFirstName = $("#lastName").val();
   if (inputFirstName == "") {
       $(".errorInfo").show();
       $("#lastName").css("border-color", "red");
       $(".errorInfo").text("* Enter the First Name");
       $(".btnUpdate").attr("disabled", true);
       return false;
   } else {
       $(".errorInfo").hide();
       $(".errorInfo").text("");
       $("#lastName").css("border-color", "rgba(0,0,0,.12)");
       $(".btnUpdate").attr("disabled", false);
   }
});


 $("#emailID").keyup(function() {
   var inputEmail = $("#emailID").val();
   if (inputEmail == "") {
       $(".errorInfo").show();
       $("#emailID").css("border-color", "red");
       $(".errorInfo").text("* Enter the EmailID");
       $(".btnUpdate").attr("disabled", true);
       return false;
   } else {
       $(".errorInfo").hide();
       $(".errorInfo").text("");
       $("#emailID").css("border-color", "rgba(0,0,0,.12)");
       $(".btnUpdate").attr("disabled", false);
   }
});


 $("#phoneNumber").keyup(function() {
   var inputPhoneNumber = $("#phoneNumber").val();
   if (inputPhoneNumber == "") {
       $(".subAdminPhno-prefix").hide();
       $("#phoneNumber").removeAttr('style');
       $(".errorInfo").show();
       $("#phoneNumber").css("border-color", "red");
       $(".errorInfo").text("* Enter the Phone Number");
       $(".btnUpdate").attr("disabled", true);
       return false;
   } else {
       $(".subAdminPhno-prefix").show();
       $("#phoneNumber").css("padding", "10px 10px 13px 30px");
       $(".errorInfo").hide();
       $(".errorInfo").text("");
       $("#phoneNumber").css("border-color", "rgba(0,0,0,.12)");
       $(".btnUpdate").attr("disabled", false);
   }
});


 function getUserProfile(adminUserID, IsUpdate) {
   $.get(domainAddress + "getAdminDetails/" + adminUserID, function(result) {
         //console.log(result);
         if (result.record_count == 0) {

         } else {
           if (result.records[0].AdminFirstName != "" && result.records[0].AdminLastName != "" && result.records[0].BusinessName != "" && result.records[0].Locality != "" && result.records[0].City != "" && result.records[0].State != "" && result.records[0].PhoneNumber != "" && result.records[0].EmergencyNumber != "" && result.records[0].EmergencyElectricityNumber != "" && result.records[0].UrlForRent != "" && result.records[0].BusinessEmail != "") {
               var isFilled = localStorage.setItem("MyRequest_profileFill", "false");
           } else {
               var isFilled = localStorage.setItem("MyRequest_profileFill", "true");
           }
           for (var getUserInfo in result.records) {

               if (result.records[getUserInfo].AdminTitle == null || result.records[getUserInfo].AdminTitle == "") {
                   $("#select2-inputTitle-container").html("Select Title");
               } else {
                   $("#inputTitle").val(result.records[getUserInfo].AdminTitle);
                   $("#select2-inputTitle-container").html(result.records[getUserInfo].AdminTitle);
               }


               $("#inputFirstName").val(result.records[getUserInfo].AdminFirstName);
               $("#inputLastName").val(result.records[getUserInfo].AdminLastName);
               $("#inputBusinessName").text(result.records[getUserInfo].BusinessName);
               inputBusinessName = result.records[getUserInfo].BusinessName;
               $("#inputLocality").val(result.records[getUserInfo].Locality);
               $(".inputLocality").text(result.records[getUserInfo].Locality);

               if (result.records[getUserInfo].City == "undefined" || result.records[getUserInfo].City == null) {
                   $("#inputCity").html("<option value=''>No City Found</option>");
                   $("#inputCity").val('');
               } else {
                   $("#inputCity").html("<option value='" + result.records[getUserInfo].City + "'>" + result.records[getUserInfo].City + "</option>");
                   $("#inputCity").val(result.records[getUserInfo].City);
               }

               $("#inputCity").select2();
               $("#inputState").val(result.records[getUserInfo].State);
               $("#select2-inputState-container").html(result.records[getUserInfo].State);
               $("#inputCountry").val(result.records[getUserInfo].Country);


               if (result.records[getUserInfo].PhoneNumber == null) {
                   $("#inputPhoneNumber").val('');
               } else {
                   $("#inputPhoneNumber").val(result.records[getUserInfo].PhoneNumber.slice(3));
               }

               if (result.records[getUserInfo].EmergencyNumber == null) {
                   $("#inputEmergencyNumber").val();
               } else {
                   $("#inputEmergencyNumber").val(result.records[getUserInfo].EmergencyNumber.slice(3));
               }

               if (result.records[getUserInfo].EmergencyElectricityNumber == "") {
                   $("#inputEmergencyElectricityNumber").val('8003764076');
               } else {
                   $("#inputEmergencyElectricityNumber").val(result.records[getUserInfo].EmergencyElectricityNumber.slice(3));
               }

               if (result.records[getUserInfo].UrlForRent == "") {
                   $("#inputUrlRent").val("https://www.gov.uk/government/uploads/system/uploads/attachment_data/file/464910/How_to_Rent_October_2015_FINAL.pdf");
               } else
               $("#inputUrlRent").val(result.records[getUserInfo].UrlForRent);
               $("#inputEmail").val(result.records[getUserInfo].BusinessEmail);
               $("#inputPassword").val(result.records[getUserInfo].BusinessPassword);
               $("#inputAgencyCode").text(result.records[getUserInfo].AutoGenerate);
               inputAgencyCode = result.records[getUserInfo].AutoGenerate;
               $(".inputPhoneNumber").css("padding", "10px 10px 10px 30px");
               $(".phno-prefix").show();
               $("#inputEmergencyNumber").css("padding", "10px 10px 10px 32px");
               $("#inputEmergencyElectricityNumber").css("padding", "10px 10px 10px 32px");
               $(".adminEmerno-prefix").show();
               $(".emerElectno-prefix").show();
               if (result.records[getUserInfo].Logo == null || result.records[getUserInfo].Logo == "" || result.records[getUserInfo].Logo=="Fail upload folder with read access.") {
                   $("#adminLogoImage").show();
               } else {

                var getLogoImagePath = result.records[getUserInfo].Logo.slice(0,4);
                if(getLogoImagePath=="api/"){
                    getLogoImagePath = result.records[getUserInfo].Logo.slice(4);
                    $("#adminLogoImage").attr("src", domainAddress + getLogoImagePath).show();
                }
                else{
                    $("#adminLogoImage").attr("src", domainAddress + result.records[getUserInfo].Logo).show();
                }

                $("#adminLogoImage").css("height", "80px").css("width", "110px");

                imageUrl1 = result.records[getUserInfo].Logo;
            }

            isAgreeUtilityCheck = result.records[getUserInfo].IsAgreeUtility;
            $("#hiddenIsAgree").val(result.records[getUserInfo].IsAgreeUtility);
            if (isAgreeUtilityCheck == 1) {
               $('.avail > span').css('box-shadow', 'rgba(255, 179, 0, 0.498039) 0px 0px 0px 7px inset').css('border-color', 'rgba(255, 179, 0, 0.498039)').css('transition', 'border 0.4s').css('box-shadow', '0.4s').css('background-color', '1.2s').css('background-color', 'rgba(255, 179, 0, 0.498039)');
               $('.avail > span > small').css('left', '18px').css('transition', 'background-color 0.4s, left 0.2s').css('background-color', 'rgb(255, 179, 0)');
               $("#getAvail").prop("checked", true);
               $(".getIsVoid").css('display', 'block');
           } else {
               $('.avail > span').css('box-shadow', 'rgba(0, 0, 0, 0.258824) 0px 0px 0px 0px inset').css('border-color', 'rgba(0, 0, 0, 0.258824)').css('transition', 'border 0.4s, box-shadow 0.4s').css('background-color', 'rgba(0, 0, 0, 0.258824)');
               $('.avail > span > small').css('left', '0px').css('transition', 'background-color 0.4s, left 0.2s').css('background-color', 'rgb(250, 250, 250)');
               $("#getAvail").prop("checked", false);
               $(".getIsVoid").css('display', 'none');
           }

           isVoidCheck = result.records[getUserInfo].IsVoid;
           $("#hiddenIsVoid").val(result.records[getUserInfo].IsVoid);
           if (isVoidCheck == 1) {
               $('.void > span').css('box-shadow', 'rgba(255, 179, 0, 0.498039) 0px 0px 0px 7px inset').css('border-color', 'rgba(255, 179, 0, 0.498039)').css('transition', 'border 0.4s').css('box-shadow', '0.4s').css('background-color', '1.2s').css('background-color', 'rgba(255, 179, 0, 0.498039)');
               $('.void > span > small').css('left', '18px').css('transition', 'background-color 0.4s, left 0.2s').css('background-color', 'rgb(255, 179, 0)');
               $("#getVoid").prop("checked", true);
               $(".inVoidProgram").show();

               if (result.records[getUserInfo].IsBillingAddress == 1) {
                   $(".showBillingAddress").show();
                   $(".inVoidProgram > span > div").addClass("checked");
                   $("#isBillingAddress").prop("checked", true);
               } else {
                   $(".showBillingAddress").hide();
                   $(".inVoidProgram > span > div").removeClass("checked");
                   $("#isBillingAddress").prop("checked", false);
               }

               $("#select2-inputBillingTitle-container").html(result.records[getUserInfo].BillingTitle);
               $("#inputBillingTitle").val(result.records[getUserInfo].BillingTitle);



               $("#inputBillingFirstName").val(result.records[getUserInfo].BillingFirstName);
               $("#inputBillingLastName").val(result.records[getUserInfo].BillingLastName);
               $("#inputBillingAddress").val(result.records[getUserInfo].BillingAddress);
               $("#select2-inputCounty-container").html(result.records[getUserInfo].BillingCounty);
               $("#inputCounty").val(result.records[getUserInfo].BillingCounty);
               $("#inputBillingCity").html("<option value='" + result.records[getUserInfo].BillingCity + "'>" + result.records[getUserInfo].BillingCity + "</option>");
               $("#inputBillingCity").val(result.records[getUserInfo].BillingCity);
               $("#inputBillingCity").select2();

               $("#inputBillingPostalCode").val(result.records[getUserInfo].BillingPostalCode);
           } else {
               $('.void > span').css('box-shadow', 'rgba(0, 0, 0, 0.258824) 0px 0px 0px 0px inset').css('border-color', 'rgba(0, 0, 0, 0.258824)').css('transition', 'border 0.4s, box-shadow 0.4s').css('background-color', 'rgba(0, 0, 0, 0.258824)');
               $('.void > span > small').css('left', '0px').css('transition', 'background-color 0.4s, left 0.2s').css('background-color', 'rgb(250, 250, 250)');
               $("#getVoid").prop("checked", false);
               $(".inVoidProgram").hide();

           }

       }
   }
   $(".md-input-wrapper").addClass("md-input-filled");

   if (IsUpdate) {
       window.location.href = 'https://agent.myrequest.co.uk/Dashboard.html';
   }
});
}


$(".viewTermsAndCondition").click(function(){
    $(".btnSubmitPrivacyPolicy").hide();
    $(".inputTinymce").hide();
    $("#getLoadingModalContent").removeClass('md-show');
});

$(".viewPrivacyPolicy").click(function(){
    $(".btnSubmitPrivacyPolicy").hide();
    $(".inputTinymce").hide();
    $("#getLoadingModalContent").removeClass('md-show');
});

$("#getAddprivacy").click(function() {

   $(".inputTinymce").toggle();

   getTinymceContent('PrivacyPolicy');
   $("#getLoadingModalContent").addClass('md-show');
   $.get(domainAddress + "GetPrivacyPolicy/" + adminUserID, {}, function(result) {
         //console.log(result);
         if (result.record_count == 0) {
           $("#hiddenPrivacyPolicyID").val(0);
           $(".btnSubmitPrivacyPolicy").show();
           $("#getLoadingModalContent").removeClass('md-show');
       } else {
           for (var getPrivacyPolicy in result.records) {
                 //console.log(result.records[getPrivacyPolicy].PrivacyPolicy);
                 content = result.records[getPrivacyPolicy].PrivacyPolicy;
                 tinyMCE.get('inputPrivacyPolicy').setContent(decodeURIComponent(result.records[getPrivacyPolicy].PrivacyPolicy));

                 $("#hiddenPrivacyPolicyID").val(result.records[getPrivacyPolicy].PrivacyID);
             }
             $("#getLoadingModalContent").removeClass('md-show');
             $(".btnSubmitPrivacyPolicy").text("Update Privacy Policy");
             $(".btnSubmitPrivacyPolicy").show();
             $(".md-fab-wrapper").hide();


         }
     });

});


 function getTinymceContent(value) {
   var getSelector = "";
   if (value == "TermsCondition") {
       getSelector = "#inputTermsAndCondition";
   } else {
       getSelector = "#inputPrivacyPolicy";
   }

   tinymce.init({
       selector: getSelector,
       plugins: [
       "advlist autolink lists link image charmap print preview anchor",
       "searchreplace visualblocks code fullscreen",
       "insertdatetime media table contextmenu paste"
       ],
       toolbar: "styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",

       relative_urls: false,

       convert_urls: false,

       remove_script_host: false,

       menubar: false,
       toolbar_items_size: 'small',

       style_formats: [{
           title: 'Bold text',
           inline: 'b'
       }, {
           title: 'Red text',
           inline: 'span',
           styles: {
               color: '#ff0000'
           }
       }, {
           title: 'Red header',
           block: 'h1',
           styles: {
               color: '#ff0000'
           }
       }, {
           title: 'Example 1',
           inline: 'span',
           classes: 'example1'
       }, {
           title: 'Example 2',
           inline: 'span',
           classes: 'example2'
       }, {
           title: 'Table styles'
       }, {
           title: 'Table row 1',
           selector: 'tr',
           classes: 'tablerow1'
       }],



       file_browser_callback: function(field_name, url, type, win) {
           if (type == 'image') $('#my_form input').click();
       },

       onpageload: function() {
           console.log("onpageload");

       }

     }); // tinymce  
 } // getTermsAndConditions


 $(".btnUpdate").click(function() {
   var userProfileID = localStorage.getItem("MyRequestAdmin_UserID");
   var inputTitle = $("#inputTitle").val();
   var inputFirstName = $("#inputFirstName").val();
   var inputLastName = $("#inputLastName").val();
   var inputPhoneNumber = $("#inputPhoneNumber").val();
   var inputEmergencyNumber = $("#inputEmergencyNumber").val();
   var inputUrlRent = $("#inputUrlRent").val();
   var inputEmergencyElectricityNumber = $("#inputEmergencyElectricityNumber").val();
   var inputEmail = $("#inputEmail").val();
   var inputPassword = $("#inputPassword").val();
   var inputLocality = $("#inputLocality").val();
   var inputCity = $("#inputCity").val();
   var inputState = $("#inputState").val();
   var inputCountry = $("#inputCountry").val();

   var inputVoid = $("#hiddenIsVoid").val();
   var inputAvail = $("#hiddenIsAgree").val();

   if (inputTitle == "") {
       $(".help-block").css('color', 'red');
       $(".help-block").show();
       $(".help-block").text("* Select the Title");
       $(".btnUpdate").attr("disabled", true);
       return false;
   }

   if (inputFirstName == "") {
       $(".help-block").css('color', 'red');
       $(".help-block").show();
       $(".help-block").text("* Enter the First Name");
       $(".btnUpdate").attr("disabled", true);
       return false;
   }

   if (inputLastName == "") {
       $(".help-block").css('color', 'red');
       $(".help-block").show();
       $(".help-block").text("* Enter the Last Name");
       $(".btnUpdate").attr("disabled", true);
       return false;
   }

   if (inputPhoneNumber == "") {
       $(".help-block").css('color', 'red');
       $(".help-block").show();
       $(".help-block").text("* Enter the Phone Number");
       $(".btnUpdate").attr("disabled", true);
       return false;
   }

   if (inputEmergencyNumber == "") {
       $(".help-block").css('color', 'red');
       $(".help-block").show();
       $(".help-block").text("* Enter the Emergency Number");
       $(".btnUpdate").attr("disabled", true);
       return false;
   }

   if (inputUrlRent == "") {
       $(".help-block").css('color', 'red');
       $(".help-block").show();
       $(".help-block").text("* Enter the Url");
       $(".btnUpdate").attr("disabled", true);
       return false;
   }


   if (inputEmergencyElectricityNumber == "") {
       $(".help-block").css('color', 'red');
       $(".help-block").show();
       $(".help-block").text("* Enter the Emergency Electricity Number");
       $(".btnUpdate").attr("disabled", true);
       return false;
   }


   if (inputEmail == "") {
       $(".help-block").css('color', 'red');
       $(".help-block").show();
       $(".help-block").text("* Enter the Email");
       $(".btnUpdate").attr("disabled", true);
       return false;
   }

   if (inputPassword == "") {
       $(".help-block").css('color', 'red');
       $(".help-block").show();
       $(".help-block").text("* Enter the Password");
       $(".btnUpdate").attr("disabled", true);
       return false;
   }

   if (inputBusinessName == "") {
       $(".help-block").css('color', 'red');
       $(".help-block").show();
       $(".help-block").text("* Enter the Business Name");
       $(".btnUpdate").attr("disabled", true);
       return false;
   }


   if (inputCity == "") {

       $(".help-block").css('color', 'red');
       $(".help-block").show();
       $(".help-block").text("* Enter the City");
       $(".btnUpdate").attr("disabled", true);
       return false;
   }

   if (inputState == "") {

       $(".help-block").css('color', 'red');
       $(".help-block").show();
       $(".help-block").text("* Enter the State");
       $(".btnUpdate").attr("disabled", true);
       return false;
   }


   if (inputLocality == "") {

       $(".help-block").css('color', 'red');
       $(".help-block").show();
       $(".help-block").text("* Enter the Local");
       $(".btnUpdate").attr("disabled", true);
       return false;
   }


   if (inputCountry == "") {

       $(".help-block").css('color', 'red');
       $(".help-block").show();
       $(".help-block").text("* Enter the Country");
       $(".btnUpdate").attr("disabled", true);
       return false;
   }

   if (imageUrl1 == "") {
       $(".help-block").css('color', 'red');
       $(".help-block").show();
       $(".help-block").text("* Select the Logo Image");
       $(".btnUpdate").attr("disabled", true);
       return false;
   } else {

       var state = $("#select2-inputState-container").html();
       var city = $("#select2-inputCity-container").html();

       var dataForm = '{"AdminTitle":"' + inputTitle + '","AdminFirstName":"' + inputFirstName + '","AdminLastName":"' + inputLastName + '","BusinessName":"' + inputBusinessName + '","Locality":"' + inputLocality + '","City":"' + city + '","State":"' + state + '","Country":"' + inputCountry + '","BusinessEmail":"' + inputEmail + '","BusinessPassword":"'+inputPassword+'","AutoGenerate":"' + inputAgencyCode + '","PhoneNumber":"' + inputPhoneNumber + '","EmergencyNumber":"' + inputEmergencyNumber + '","EmergencyElectricityNumber":"' + inputEmergencyElectricityNumber + '","UrlForRent":"' + inputUrlRent + '","IsVoid":"' + inputVoid + '","Avail":"' + inputAvail + '","Logo":"' + imageUrl1 + '"}';
       var sendURL = domainAddress + 'updateAdminDetails/' + adminUserID;
       console.log(dataForm);
       console.log(sendURL);
       $.ajax({
           type: "POST",
           url: sendURL,
           data: dataForm,
           success: function(dataCheck) {
               console.log(dataCheck);
               if (dataCheck.Success == 1) {
                   localStorage.setItem("MyRequest_Logo", imageUrl1);
                   getUserProfile(adminUserID, true);
                   imageUrl1 = "";
                   $("#progressbox1").hide();
                   UIkit.modal.alert("Profile Updated Successfully");
                   window.location.href = 'https://agent.myrequest.co.uk/Dashboard.html';
               } else {
                   $("#progressbox1").hide();
                   UIkit.modal.alert(dataCheck.message_text);
                   return false;
               }

           }
       });
   }
 }); // #btnUpdateProfile 

 $("#inputBillingTitle").on('change', function() {
   var inputBillingTitle = $("#inputBillingTitle").html();
   if (inputBillingTitle == "" || inputBillingTitle == undefined) {
       $(".errorInfo").css("border-color", "red");
       $(".errorInfo").show();
       $(".errorInfo").text("* Select the County");
       $("#select2-inputBillingTitle-container").css("border", "1px solid red");
       $(".btnSubmitProperty").attr("disabled", true);
       return false;
   } else {
       $(".errorInfo").hide();
       $(".errorInfo").text("");
       $("#select2-inputBillingTitle-container").css("border", "");
       $(".btnSubmitProperty").attr("disabled", false);
   }
});

 $("#inputBillingFirstName").keyup(function() {
   var inputBillingFirstName = $("#inputBillingFirstName").val();
   if (inputBillingFirstName == "") {
       $("#inputBillingFirstName").css("border-color", "red");
       $(".errorInfo").show();
       $(".errorInfo").text("* Enter the First Name");
       $(".btnSubmitBillingAddress").attr("disabled", true);
       return false;
   } else {
       $(".errorInfo").hide();
       $(".errorInfo").text("");
       $("#inputBillingFirstName").css("border-color", "rgba(0,0,0,.12)");
       $(".btnSubmitBillingAddress").attr("disabled", false);
   }
});

 $("#inputBillingLastName").keyup(function() {
   var inputBillingLastName = $("#inputBillingLastName").val();
   if (inputBillingLastName == "") {
       $("#inputBillingLastName").css("border-color", "red");
       $(".errorInfo").show();
       $(".errorInfo").text("* Enter the Last Name");
       $(".btnSubmitBillingAddress").attr("disabled", true);
       return false;
   } else {
       $(".errorInfo").hide();
       $(".errorInfo").text("");
       $("#inputBillingLastName").css("border-color", "rgba(0,0,0,.12)");
       $(".btnSubmitBillingAddress").attr("disabled", false);
   }
});

 $("#inputBillingAddress").keyup(function() {
   var inputBillingAddress = $("#inputBillingAddress").val();
   if (inputBillingAddress == "") {
       $("#inputBillingAddress").css("border-color", "red");
       $(".errorInfo").show();
       $(".errorInfo").text("* Enter the Address");
       $(".btnSubmitBillingAddress").attr("disabled", true);
       return false;
   } else {
       $(".errorInfo").hide();
       $(".errorInfo").text("");
       $("#inputBillingAddress").css("border-color", "rgba(0,0,0,.12)");
       $(".btnSubmitBillingAddress").attr("disabled", false);
   }
});

 $("#inputCounty").on('change', function() {
   var inputCounty = $("#inputCounty").val();
   if (inputCounty == "" || inputCounty == undefined) {
       $(".errorInfo").css("border-color", "red");
       $(".errorInfo").show();
       $(".errorInfo").text("* Select the County");
       $("#select2-inputCounty-container").css("border", "1px solid red");
       $(".btnSubmitProperty").attr("disabled", true);
       return false;
   } else {
       $(".errorInfo").hide();
       $(".errorInfo").text("");
       $("#select2-inputCounty-container").css("border", "");
       $(".btnSubmitProperty").attr("disabled", false);
   }
});

 $("#inputBillingCity").on('change', function() {
   var inputBillingCity = $("#inputBillingCity").val();
   if (inputBillingCity == "" || inputCounty == undefined) {
       $(".errorInfo").css("border-color", "red");
       $(".errorInfo").show();
       $(".errorInfo").text("* Select the City");
       $("#select2-inputBillingCity-container").css("border", "1px solid red");
       $(".btnSubmitProperty").attr("disabled", true);
       return false;
   } else {
       $(".errorInfo").hide();
       $(".errorInfo").text("");
       $("#select2-inputBillingCity-container").css("border", "");
       $(".btnSubmitProperty").attr("disabled", false);
   }
});

 $("#inputBillingPostalCode").keyup(function() {
   var inputBillingPostalCode = $("#inputBillingPostalCode").val();
   if (inputBillingPostalCode == "") {
       $("#inputBillingPostalCode").css("border-color", "red");
       $(".errorInfo").show();
       $(".errorInfo").text("* Enter the Postal Code");
       $(".btnSubmitBillingAddress").attr("disabled", true);
       return false;
   } else {
       $(".errorInfo").hide();
       $(".errorInfo").text("");
       $("#inputBillingPostalCode").css("border-color", "rgba(0,0,0,.12)");
       $(".btnSubmitBillingAddress").attr("disabled", false);
   }
});


 $(".btnSubmitBillingAddress").click(function() {
  $("#getLoadingModalContent").addClass('md-show');
  var isBillingAddress = $("#isBillingAddress").prop("checked");
  var inputBillingTitle = $("#inputBillingTitle").val();
  var inputBillingFirstName = $("#inputBillingFirstName").val();
  var inputBillingLastName = $("#inputBillingLastName").val();
  var inputBillingAddress = $("#inputBillingAddress").val();
  var inputBillingCounty = $("#select2-inputCounty-container").html();
  var inputBillingCity = $("#select2-inputBillingCity-container").html();
  var inputBillingPostalCode = $("#inputBillingPostalCode").val();


  if (inputBillingTitle == "" || inputBillingTitle == undefined) {
   $(".billingHelp-block").css('color', 'red');
   $(".billingHelp-block").show();
   $(".billingHelp-block").text("* Select the Title");
   $("#inputBillingTitle").css("border", "1px solid red");
   $(".btnSubmitBillingAddress").attr("disabled", true);
   return false;
}

if (inputBillingFirstName == "") {
   $(".billingHelp-block").css('color', 'red');
   $(".billingHelp-block").show();
   $(".billingHelp-block").text("* Enter the First Name");
   $("#inputBillingFirstName").css("border-color", "red");
   $(".btnSubmitBillingAddress").attr("disabled", true);
   return false;
}

if (inputBillingLastName == "") {
   $(".billingHelp-block").css('color', 'red');
   $(".billingHelp-block").show();
   $(".billingHelp-block").text("* Enter the Last Name");
   $("#inputBillingLastName").css("border-color", "rgba(0,0,0,.12)");
   $(".btnSubmitBillingAddress").attr("disabled", true);
   return false;
}

if (inputBillingAddress == "") {
   $(".billingHelp-block").css('color', 'red');
   $(".billingHelp-block").show();
   $(".billingHelp-block").text("* Enter the Address");
   $("#inputBillingAddress").css("border-color", "red");
   $(".btnSubmitBillingAddress").attr("disabled", true);
   return false;
}

if (inputBillingCounty == "") {
   $(".billingHelp-block").css('color', 'red');
   $(".billingHelp-block").show();
   $(".billingHelp-block").text("* Select the County");
   $("#select2-inputCounty-container").css("border", "1px solid red");
   $(".btnSubmitBillingAddress").attr("disabled", true);
   return false;
}

if (inputBillingCity == "") {
   $(".billingHelp-block").css('color', 'red');
   $(".billingHelp-block").show();
   $(".billingHelp-block").text("* Select the City");
   $("#select2-inputBillingCity-container").css("border", "1px solid red");
   $(".btnSubmitBillingAddress").attr("disabled", true);
   return false;
}

if (inputBillingPostalCode == "") {
   $(".billingHelp-block").css('color', 'red');
   $(".billingHelp-block").show();
   $(".billingHelp-block").text("* Enter the Postal Code");
   $("#inputBillingPostalCode").css("border-color", "red");
   $(".btnSubmitBillingAddress").attr("disabled", true);
   return false;
} else {
   if (isBillingAddress == true) {
       isBillingAddress = 1;
   } else {
       isBillingAddress = 0;
   }
   var dataForm = '{"IsBillingAddress":"' + isBillingAddress + '","BillingTitle":"' + inputBillingTitle + '","BillingFirstName":"' + inputBillingFirstName + '","BillingLastName":"' + inputBillingLastName + '","BillingAddress":"' + inputBillingAddress + '","BillingCity":"' + inputBillingCity + '","BillingCounty":"' + inputBillingCounty + '","BillingPostalCode":"' + inputBillingPostalCode + '"}';
   var sendURL = domainAddress + 'UpdateAdminBillingAddress/' + adminUserID;
   console.log(dataForm);
   console.log(sendURL);
   $.ajax({
       type: "POST",
       url: sendURL,
       data: dataForm,
       success: function(dataCheck) {
           console.log(dataCheck);
           if (dataCheck.status == "success") {
               getUserProfile(adminUserID, true);
               $("#getLoadingModalContent").removeClass('md-show');
               UIkit.modal.alert(dataCheck.message_text);
           } else {
               UIkit.modal.alert(dataCheck.message_text);
               return false;
           }
       }
   });
}

});