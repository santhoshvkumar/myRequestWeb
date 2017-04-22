 var adminType = localStorage.getItem("MyRequest_AdminType");
 var getPhoneCode = "";
 if(adminType == "SuperAdmin"){
    getPhoneCode = "+44";
}
else{
    getPhoneCode = localStorage.getItem("MyRequest_PhoneCode-prefix");
    
}

$(".btnSubmitAdmin").click(function() {
   var hiddenAdminID = $("#hiddenAdminID").val();
   var title = $("#inputSubTitle").val();
   var firstName = $("#firstName").val();
   var lastName = $("#lastName").val();
   var phoneNumber = getPhoneCode + $("#phoneNumber").val();
   var emailID = $("#emailID").val();
   var password = $("#hiddenPassword").val();
   $("#getLoadingModalContent").addClass('md-show');

   if (title == "") {
       $(".errorInfo").show();
       $(".errorInfo").text("* Select the title");
       $("#select2-inputSubTitle-container").css("border", "1px solid red");
       $("#getLoadingModalContent").removeClass('md-show');
       $("#btnSubmitAdmin").attr("disabled", true);
       return false;
   }

   if (firstName == "") {
       $(".errorInfo").show();
       $(".errorInfo").text("* Enter the First Name");
       $("#firstName").css("border-color", "red");
       $("#getLoadingModalContent").removeClass('md-show');
       $("#btnSubmitAdmin").attr("disabled", true);
       return false;
   }

   if (lastName == "") {
       $(".errorInfo").show();
       $(".errorInfo").text("* Enter the Last Name");
       $("#lastName").css("border-color", "red");
       $("#getLoadingModalContent").removeClass('md-show');
       $("#btnSubmitAdmin").attr("disabled", true);
       return false;
   }

   if (emailID == "") {
       $(".errorInfo").show();
       $(".errorInfo").text("* Enter the E-mail");
       $("#emailID").css("border-color", "red");
       $("#getLoadingModalContent").removeClass('md-show');
       $("#btnSubmitAdmin").attr("disabled", true);
       return false;
   }

   if (!isValidEmailAddress(emailID)) {
       $(".errorInfo").css("border-color", "red");
       $(".errorInfo").show();
       $(".errorInfo").text("* Please Enter the Proper Email ID.");
       $("#emailID").css("border-color", "red");
       $("#getLoadingModalContent").removeClass('md-show');
       $("#btnSubmitAdmin").attr("disabled", true);
       return false;
   }



   if (phoneNumber == "+44" || phoneNumber == "+91" || phoneNumber == "+1") {
       $(".errorInfo").show();
       $(".errorInfo").text("* Enter the Phone Number");
       $("#phoneNumber").css("border-color", "red");
       $("#getLoadingModalContent").removeClass('md-show');
       $("#btnSubmitAdmin").attr("disabled", true);
       return false;
   }

     /* if (filePath == "") {
          $(".errorInfo").show();
          $(".errorInfo").text("* Upload the Logo");
          $("#imgAdminLogo").css("border", "1px solid red");
          $("#btnSubmitAdmin").attr("disabled", true);
          return false;
      }*/
      else {
       var dataForm = '{"Admin_ID":"' + adminUserID + '","Title":"' + title + '","FirstName":"' + firstName + '","LastName":"' + lastName + '","PhoneNumber":"' + phoneNumber + '","EmailID":"' + emailID + '","Password":"' + password + '","Logo":"' + filePath + '"}';
       console.log(dataForm);
       if (hiddenAdminID == 0) {
           var sendURL = domainAddress + 'CreateSubAdmin';
           console.log(sendURL);
           $.ajax({
               type: "POST",
               url: sendURL,
               data: dataForm,
               success: function(dataCheck) {
                   console.log(dataCheck);
                   if (dataCheck.Success == 1) {
                       getAllSubAdminList(adminUserID);
                       $("#inputSubTitle").val(0);
                       $("#select2-inputSubTitle-container").html("Select Title");
                       $("#firstName").val('');
                       $("#lastName").val('');

                       $("#phoneNumber").val('');
                       $("#emailID").val('');

                       $("#phoneNumber").removeAttr("style");
                       $(".subAdminPhno-prefix").hide();
                       $("#imgAdminLogo").attr("src", "assets/img/noImage.gif");
                       filePath = "";
                       $(".adminContent").hide();
                       $("#progressbox1").hide();
                       $(".md-fab-wrapper").hide();
                       UIkit.modal.alert(dataCheck.message_text);
                   } else {
                    $("#getLoadingModalContent").removeClass('md-show');
                    UIkit.modal.alert(dataCheck.message_text);
                    return false;
                }
                $(".cphno-prefix").hide();
                $("#getLoadingModalContent").removeClass('md-show');
            }
        });
} else {
   var sendURL = domainAddress + 'updateSubAdminDetails/' + hiddenAdminID;
   console.log(sendURL);
   $.ajax({
       type: "POST",
       url: sendURL,
       data: dataForm,
       success: function(dataCheck) {
           console.log(dataCheck);
           if (dataCheck.Success == 1) {
               $("#hiddenAdminID").val(0);
               $("#inputSubTitle").val('');
               $("#firstName").val('');
               $("#lastName").val('');

               $("#emailID").val('');
               $("#phoneNumber").val('');
               $("#phoneNumber").removeAttr("style");
               $(".subAdminPhno-prefix").hide();
               $(".adminContent").hide();
               $("#imgAdminLogo").attr("src", "assets/img/noImage.gif");
               filePath = "";
               $("#progressbox1").hide();
               $(".md-fab-wrapper").hide();
               $(".btnSubmitAdmin").text("Add Sub Admin");
               getAllSubAdminList(adminUserID);
               UIkit.modal.alert(dataCheck.message_text);
           } else {
               UIkit.modal.alert(dataCheck.message_text);
               return false;
           }
           $("#getLoadingModalContent").removeClass('md-show');
       }
   });

}
}
});


 function getAllSubAdminList(adminUserID) {
   $.get(domainAddress + "GetAllSubAdminValues/" + adminUserID, {}, function(result) {
         //console.log(result);
         adminUserID = localStorage.getItem("MyRequest_AdminID");
         $(".allSubAdminList").html('');
         if (result.record_count == 0) {
           $(".allSubAdminList").append("<tr> <td id='adminName-0'>No records Found </td> <td id='businessName-0'> </td> <td id='emailID-0'> </td>  <td class='editAdmin' id='editAdmin-0'> </td> <td class='deleteAdmin' id='deleteAdmin-0'> </td> </tr>");
       } else {
           for (subAdminInfo in result.records) {
               $(".allSubAdminList").append("<tr> <td id='adminName-" + result.records[subAdminInfo].SubAdminID + "'>" + result.records[subAdminInfo].FirstName + " " + result.records[subAdminInfo].LastName + "</td> <td id='phoneNumber-" + result.records[subAdminInfo].SubAdminID + "'>" + result.records[subAdminInfo].PhoneNumber + "</td> <td id='emailID-" + result.records[subAdminInfo].SubAdminID + "'>" + result.records[subAdminInfo].EmailID + "</td> <td ><a class='editAdmin' id='editAdminID-" + result.records[subAdminInfo].SubAdminID + "' style='cursor:pointer;'><i class='fa fa-pencil'></i></a></td><td ><a class='deleteAdmin' id='deleteAdmin-" + result.records[subAdminInfo].SubAdminID + "' style='cursor:pointer;' data-toggle='modal' class='config'><i class='fa fa-trash trash fa-1x'></i></a></td> </tr>");
           }

           $("#getLoadingModalContent").removeClass('md-show');




           $(".editAdmin").on('click', function(e) {
               $("body").animate({
                   scrollTop: 0
               }, 'slow');
               var editAdminID = this.id.replace('editAdminID-', '');
               $("#hiddenAdminID").val(editAdminID);
               $("#getLoadingModalContent").addClass('md-show');
               $.get(domainAddress + "getSubAdminDetails/" + editAdminID, {}, function(result) {
                   console.log(result);
                   var isFourExistNo = 0;
                   var isEmerFourExistNo = 0;
                   var getCountry = localStorage.getItem('MyRequest_countryCode');
                   for (var getAdmin in result.records) {
                       $("#inputSubTitle").val(result.records[getAdmin].Title);
                       $("#select2-inputSubTitle-container").html(result.records[getAdmin].Title);
                       $("#firstName").val(result.records[getAdmin].FirstName);
                       $("#lastName").val(result.records[getAdmin].LastName);

                       $("#emailID").val(result.records[getAdmin].EmailID);
                       $("#hiddenPassword").val(result.records[getAdmin].Password);
                       
                       if(getCountry == "India" || getCountry == "UK"){
                         isFourExistNo = result.records[getAdmin].PhoneNumber.slice(0, 3);
                         if (isFourExistNo == "+44" || isFourExistNo == "+91") {
                             $("#phoneNumber").val(result.records[getAdmin].PhoneNumber.slice(3));
                             $(".subAdminPhno-prefix").show();
                             $("#phoneNumber").css("padding", "10px 10px 12px 31px");
                         } else {
                             $("#phoneNumber").val(result.records[getAdmin].PhoneNumber);
                             $(".subAdminPhno-prefix").hide();
                             $("#phoneNumber").removeAttr("style");
                         }
                       } else {
                         isFourExistNo = result.records[getAdmin].PhoneNumber.slice(0, 2);
                         if (isFourExistNo == "+1" || isFourExistNo == "+1") {
                             $("#phoneNumber").val(result.records[getAdmin].PhoneNumber.slice(2));
                             $(".subAdminPhno-prefix").show();
                             $("#phoneNumber").css("padding", "10px 10px 12px 31px");
                         } else {
                             $("#phoneNumber").val(result.records[getAdmin].PhoneNumber);
                             $(".subAdminPhno-prefix").hide();
                             $("#phoneNumber").removeAttr("style");
                         }
                       }
                       

                       if (result.records[getAdmin].Logo == "" || result.records[getAdmin].Logo == null) {
                           $("#imgAdminLogo").attr("src", "assets/img/noImage.gif");
                       } else {
                           $("#imgAdminLogo").attr("src", domainAddress + result.records[getAdmin].Logo);
                       }
                       filePath = result.records[getAdmin].Logo;
                       $(".md-input-wrapper").addClass("md-input-filled");
                       $(".adminContent").show();
                       $(".md-fab-wrapper").hide();
                       $("#getLoadingModalContent").removeClass('md-show');
                       $(".btnSubmitAdmin").text("Update Sub Admin");
                   }
               });

});

 $(".deleteAdmin").on('click', function(e) {
   var getAdminID = this.id.replace('deleteAdmin-', '');

   UIkit.modal.confirm('Are you sure?', function() {
       $("#getLoadingModalContent").addClass('md-show');
       $.post(domainAddress + 'DeleteSubAdminDetails/' + getAdminID, function(e) {
           console.log(e);
           $("#rowID-" + getAdminID).remove();
           getAllSubAdminList(adminUserID);
           $("#getLoadingModalContent").removeClass('md-show');
           UIkit.modal.alert('Sub Admin Deleted Successfully');
       });
   });

             }); // deleteSpeciality        
}
});
}


$("#adminLogoImageUrl1").off('click').on('change', function() {
   $("#getLoadingModalContent").addClass('md-show');
   console.log("image 1 upload click");
   var progressbox = $('#progressbox1');
   var progressbar = $('#progressbar1');
   var statustxt = $('#statustxt1');

   $("#preview1").html('');

   $("#FileURLUploadImage1").ajaxForm({
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
             $('#progressbox1').css("margin", "-40px 10px 10px 270px");
             $('#progressbox1').show();
             $('#progressbar1').show();

             if (percentComplete > 50) {
               console.log("if : " + percentComplete);
               statustxt.css('color', '#fff');
                 statustxt.html(percentComplete + '%'); //change status text to white after 50%
                 $('#progressbar1').css("width", percentComplete + "%");
                 $('#progressbox1').css("margin", "-40px 10px 10px 270px");
                 $('#progressbox1').show();
                 $('#progressbar1').show();
             }
             $("#btnSubmitAdmin").attr("disabled", true);
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
               $('#progressbox1').css("margin", "-40px 10px 10px 270px");
               $('#progressbox1').show();
               $('#progressbar1').show();
               console.log('z ' + result);
               filePath = result;

               $("#imgAdminLogo").attr('src', domainAddress + filePath);
               $("#imgAdminLogo").css("height", "80px").css("width", "100px").css("border", "");
               $(".fileupload-preview1").text(domainAddress + filePath);
               $(".errorInfo").hide();
               $(".errorInfo").text("");
               $("#getLoadingModalContent").removeClass('md-show');
               $("#btnSubmitAdmin").attr("disabled", false);
           }

       },
       error: function() {
           console.log('d');


       }
   }).submit();
});


 $("#inputSubTitle").on('change', function() {
   var inputSubTitle = $("#inputSubTitle").val();
   if (inputSubTitle == "") {
       $(".errorInfo").show();
       $(".errorInfo").text("* Select the Title");
       $("#select2-inputSubTitle-container").css("border", "1px solid red");
       $(".btnSubmitAdmin").attr("disabled", true);
       return false;
   } else {
       $(".errorInfo").hide();
       $(".errorInfo").text("");
       $("#select2-inputSubTitle-container").css("border", "1px solid transparent");
       $(".btnSubmitAdmin").attr("disabled", false);
   }
});


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


           }
       }


   });
});