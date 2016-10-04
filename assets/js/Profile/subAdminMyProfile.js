 $(function() {
     var $switcher = $('#style_switcher'),
         $switcher_toggle = $('#style_switcher_toggle'),
         $theme_switcher = $('#theme_switcher'),
         $mini_sidebar_toggle = $('#style_sidebar_mini');

     $switcher_toggle.click(function(e) {
         e.preventDefault();
         $switcher.toggleClass('switcher_active');
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
         /*            console.log(event.type + ' callback isVoid');
          */
         $("#hiddenIsVoid").val(1);
     });

     $('input[name="radio_demo_inline2"]:checkBox').on('ifChecked', function(event) {
         /*            console.log(event.type + ' callback isAgreeUtility');
          */
         $(".getIsVoid").show();
         var modal = UIkit.modal("#modalAgreeSkip");
         modal.show();
     });



     $(".isAgreeReset").click(function() {
         //console.log("reset avail");
         $('.avail > div').removeClass('checked');
         $("#getAvail").prop("checked", false);
         $("#hiddenIsAgree").val(0);
     });

     $(".btnSubmitIsAgree").click(function() {
         //$('.avail > div').removeClass('checked');
         //$("#getAvail").prop("checked",false);
         $("#hiddenIsAgree").val(1);
         var isAgreeSet = $("#hiddenIsAgree").val();
         var modal = UIkit.modal("#modalAgreeSkip");
         var dataForm = '{"IsAgreeUtility":"' + isAgreeSet + '"}';
         var sendURL = domainAddress + 'UpdateAdminIsAgree/' + adminUserID;
         /*            console.log(dataForm);  
          */
         /*            console.log(sendURL);
          */
         $.ajax({
             type: "POST",
             url: sendURL,
             data: dataForm,
             success: function(dataCheck) {
                 /*                        console.log(dataCheck);
                  */
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
         window.location.href = 'CreateAdmin.html';
 });


 $("#menuCreateAdmin").click(function(e) {
     var isFilled = localStorage.getItem("MyRequest_profileFill");
     if (isFilled == "true")
         UIkit.notify("Please Make Sure that all values filled");
     else
         window.location.href = 'Contractor.html';
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



 $(document).ready(function() {
     /*        console.log("ready call");
      */
     var isFilled = localStorage.getItem("MyRequest_profileFill");
     //debugger;
     if (isFilled == "true")
         UIkit.notify("Please Make Sure that all values filled");
     adminUserID = localStorage.getItem("MyRequest_AdminID");
     var adminUserName = localStorage.getItem("MyRequest_UserName");
     var adminType = localStorage.getItem("MyRequest_AdminType");

     var businessName = localStorage.getItem("MyRequest_BusinessName");
     var lettingAgencyCode = localStorage.getItem("MyRequest_LettingAgencyCode");
     var logo = localStorage.getItem("MyRequest_Logo");
     localStorage.setItem("MyRequest_RepairStatus", "");

     //Not to allow Page

     $.get(domainAddress + "GetDateDiff/" + adminUserID, {}, function(result) {

         var getDiffDate = parseInt(result.records[0].DiffDate);


         var diffDate = 30 - getDiffDate;

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


             UIkit.modal.alert("You have Due by " + modulus + " days Please Pay to proceed Further", {
                 center: true
             }).on('hide.uk.modal', function() {
                 // custome js code
             });



         }

     }); // End's here
     if (adminUserID == "" || adminUserID == null) {
         window.location.href = "index.html";
     } else {
         $(".getUserName").text(adminUserName);
     }


     if (adminType == "SuperAdmin") {
         $(".forAdmin").hide();
         $(".forSuperAdmin").show();
     } else {
         $(".forAdmin").show();
         $(".forSuperAdmin").hide();
         $(".myRequestAdminLogo").attr("src", domainAddressImage + logo).show();
     }


     $("#inputState").select2()
         .on("change", function(e) {
             /*                console.log("change val=" + $("#inputState").val());
              */
             var stateID = $("#inputState").val();
             $.get("CityState/getCity.php?stateID=" + stateID, function(result) {
                 //debugger;
                 $("#inputCity").html('');
                 $("#inputCity").html("<option value='0'>Choose City</option>");
                 var getResult = JSON.parse(result);
                 for (inputCity in getResult.records) {
                     $("#inputCity").append("<option value='" + getResult.records[inputCity].CityName + "'>" + getResult.records[inputCity].CityName + "</option>");

                 }
                 $("#inputCity").select2();
             });
         });
     getSubAdminProfile(adminUserID, false);

     $("#phoneNumber").on('blur', function(e) {
         var getMobileNumber = $("#" + this.id).val();
         console.log("this is blur event");
         $.get(domainAddress + "GetUserSubAdminValue/" + getMobileNumber, function(result) {
             console.log(result);
             if (result.record_count == 0) {} else {
                 for (var getSubAdminDetails in result.records) {

                     $("#firstName").val(result.records[getSubAdminDetails].FirstName);
                     $("#lastName").val(result.records[getSubAdminDetails].LastName);
                     $("#inputSubTitle").val(result.records[getSubAdminDetails].Title);
                     $("#select2-inputSubTitle-container").html(result.records[getSubAdminDetails].Title);
                     $("#emailID").val(result.records[getSubAdminDetails].EmailID);
                     $("#imgAdminLogo").val(result.records[getSubAdminDetails].Logo);


                 }
             }


         });
     });

 }); // ready

 var filePath = "";
 var imageUrl1 = "";


 $("#adminLogo").off('click').on('change', function() {
     /*            console.log("image 1 upload click");
      */
     var progressbox = $('#progressbox1');
     var progressbar = $('#progressbar1');
     var statustxt = $('#statustxt1');

     $("#preview1").html('');

     $("#FileURLUploadImage2").ajaxForm({
         target: '#preview1',
         beforeSubmit: function() {
             // console.log('v');

         },
         uploadProgress: function(event, position, total, percentComplete) {
             /*                    console.log("on  progress");
              */
             progressbar.width(percentComplete + '%') //update progressbar percent complete
                 /*                    console.log(percentComplete);
                  */
             statustxt.html(percentComplete + '%'); //update status text
             $('#progressbar1').css("width", percentComplete + "%");
             $('#progressbox1').css("margin", "-40px 10px 10px 255px");
             $('#progressbox1').show();
             $('#progressbar1').show();

             if (percentComplete > 50) {
                 /*                         console.log("if : "+percentComplete);
                  */
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
                 /*                    console.log('z ' + getUrl);
                  */
                 imageUrl1 = result;
                 /*                    console.log(imageUrl1);
                  */
                 $(".help-block").hide();
                 $(".help-block").text("");
                 $(".btnUpdate").attr("disabled", false);
                 $("#adminLogoImage").attr('src', domainAddressImage + imageUrl1);
                 $("#adminLogoImage").css("height", "80px").css("width", "110px");
                 $(".fileupload-preview1").text(domainAddressImage + imageUrl1);
             }

         },
         error: function() {
             /*                    console.log('d');
              */

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
         $("#inputPhoneNumber").css("padding", "10px 10px 10px 30px");
         $(".help-block").hide();
         $(".help-block").text("");
         $(".btnUpdate").attr("disabled", false);
     }
 });




 function getSubAdminProfile(adminUserID, IsUpdate) {
     $.get(domainAddress + "getSubAdminDetails/" + adminUserID, function(result) {
         /*        console.log(result);
          */
         if (result.record_count == 0) {

         } else {
             //debugger;
             if (result.records[0].AdminFirstName != "" && result.records[0].AdminLastName != "" && result.records[0].BusinessName != "" && result.records[0].Locality != "" && result.records[0].City != "" && result.records[0].State != "" && result.records[0].PhoneNumber != "" && result.records[0].EmergencyNumber != "" && result.records[0].EmergencyElectricityNumber != "" && result.records[0].UrlForRent != "" && result.records[0].BusinessEmail != "") {
                 var isFilled = localStorage.setItem("MyRequest_profileFill", "false");
             } else {
                 var isFilled = localStorage.setItem("MyRequest_profileFill", "true");
             }
             for (var getUserInfo in result.records) {
                 $("#inputFirstName").val(result.records[getUserInfo].FirstName);
                 $("#inputLastName").val(result.records[getUserInfo].LastName);
                 $("#inputLocality").val(result.records[getUserInfo].Locality);


                 if (result.records[getUserInfo].PhoneNumber == null) {
                     $("#inputPhoneNumber").val('');
                 } else {
                     $("#inputPhoneNumber").val(result.records[getUserInfo].PhoneNumber.slice(3));
                 }




                 $("#inputEmail").val(result.records[getUserInfo].EmailID);
                 $(".inputPhoneNumber").css("padding", "10px 10px 10px 30px");
                 $(".phno-prefix").show();

                 if (result.records[getUserInfo].Logo == null || result.records[getUserInfo].Logo == "") {
                     $("#adminLogoImage").show();
                 } else {
                     $("#adminLogoImage").attr('src', domainAddressImage + result.records[getUserInfo].Logo);

                     $("#adminLogoImage").css("height", "80px").css("width", "110px");

                     imageUrl1 = result.records[getUserInfo].Logo;
                 }




             }
         }
         $(".md-input-wrapper").addClass("md-input-filled");

         if (IsUpdate) {
             window.location.href = 'http://myrequest.co.uk/myRequestAdmin/Dashboard.html';
         }
     });
 }

 /*        
 $("#getAvail").click(function() {
     console.log("click");

      var getAppYes = $('.avail > div').hasClass('checked');
            if(getAppYes==true){
             isUtility=1;
     }


 }); */

 $(".logOut").click(function() {
     localStorage.setItem("MyRequest_AdminID", "");
     localStorage.setItem("MyRequest_UserName", "");
     localStorage.setItem("MyRequest_AdminType", "");
     localStorage.setItem("MyRequest_BusinessName");
     localStorage.setItem("MyRequest_LettingAgencyCode", "");
     localStorage.setItem("MyRequest_Logo", "");
     localStorage.setItem("MyRequest_profileFill", "");
 });


 $(".btnUpdate").click(function() {
     var adminID = "";
     var userProfileID = localStorage.getItem("MyRequestAdmin_UserID");
     var firstName = $("#inputFirstName").val().replace(/["']/g, "`");
     var lastName = $("#inputLastName").val().replace(/["']/g, "`");
     var phoneNumber = $("#inputPhoneNumber").val();
     var emailID = $("#inputEmailID").val();
     var password = $("#inputPassword").val();
     var getLocality = $("#inputLocality").val();


     if (firstName == "") {
         $(".help-block").css('color', 'red');
         $(".help-block").show();
         $(".help-block").text("* Enter the First Name");
         $(".btnUpdate").attr("disabled", true);
         return false;
     }

     if (lastName == "") {
         $(".help-block").css('color', 'red');
         $(".help-block").show();
         $(".help-block").text("* Enter the Last Name");
         $(".btnUpdate").attr("disabled", true);
         return false;
     }

     if (phoneNumber == "") {
         $(".help-block").css('color', 'red');
         $(".help-block").show();
         $(".help-block").text("* Enter the Phone Number");
         $(".btnUpdate").attr("disabled", true);
         return false;
     }

     if (emailID == "") {
         $(".help-block").css('color', 'red');
         $(".help-block").show();
         $(".help-block").text("* Enter the EmailID");
         $(".btnUpdate").attr("disabled", true);
         return false;
     }

     if (password == "") {
         $(".help-block").css('color', 'red');
         $(".help-block").show();
         $(".help-block").text("* Enter the Password");
         $(".btnUpdate").attr("disabled", true);
         return false;
     }

     if (filePath == "") {
         $(".errorInfo").show();
         $(".errorInfo").text("* Upload the Logo");
         $("#btnSubmitAdmin").attr("disabled", true);
         return false;
     }


     if (getLocality == "") {
         $(".help-block").css('color', 'red');
         $(".help-block").show();
         $(".help-block").text("* Enter the Locality");
         $(".btnUpdate").attr("disabled", true);
         return false;
     } else {

         var state = $("#select2-inputState-container").html();
         var city = $("#select2-inputCity-container").html();
         var dataForm = '{"Admin_ID":"' + adminID + '","FirstName":"' + firstName + '","LastName":"' + lastName + '","Locality":"' + getLocality + '","PhoneNumber":"' + phoneNumber + '","EmailID":"' + emailID + '","Password":"' + password + '","Logo":"' + filePath + '"}';
         var sendURL = domainAddress + 'updateSubAdminDetails/' + adminUserID;
         /*        console.log(dataForm);      
          */
         /*        console.log(sendURL); 
          */
         $.ajax({
             type: "POST",
             url: sendURL,
             data: dataForm,
             success: function(dataCheck) {
                 /*                    console.log(dataCheck);
                  */
                 if (dataCheck.Success == 1) {
                     localStorage.setItem("MyRequest_Logo", imageUrl1);
                     getSubAdminProfile(adminUserID, true);
                     filePath = "";
                     $("#progressbox1").hide();
                     UIkit.modal.alert("Profile Updated Successfully");
                 } else {
                     $("#progressbox1").hide();
                     UIkit.modal.alert(dataCheck.message_text);
                     return false;
                 }

             }
         });
     }
 }); // #btnUpdateProfile