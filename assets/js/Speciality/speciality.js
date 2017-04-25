 $(function() {
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
 var lastPage = 0;
 var adminUserID = 0;
 var specialityCountLimit = 0;
 var maxProp = 0;
 var getValue = "";
 /*$(window).load(function() {
     $("#getLoadingModalContent").removeClass('md-show');
 });
*/
 $(document).ready(function() {
     console.log("ready call");
     adminUserID = localStorage.getItem("MyRequest_AdminID");
     var adminUserName = localStorage.getItem("MyRequest_UserName");
     var adminType = localStorage.getItem("MyRequest_AdminType");

     var businessName = localStorage.getItem("MyRequest_BusinessName");
     var logo = localStorage.getItem("MyRequest_Logo");
     var isFilled = localStorage.getItem("MyRequest_profileFill");
     if (isFilled == "true") {

         window.location.href = domainAgentAddress+'MyProfile.html';
     }

     $(".md-overlay").css("background", "rgba(0,0,0,0.5)");
     $("#getLoadingModalContent").addClass('md-show');
     
     localStorage.setItem("MyRequest_RepairStatus", "");
     if (adminUserID == "" || adminUserID == null) {
         window.location.href = "index.html";
     } else {
         $(".getUserName").text(adminUserName);
     }

     if (adminType == "SuperAdmin") {

     } else {
        getDateDiff(adminUserID);
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



     $(".getLettingAgencyBusinessName").text("Speciality - " + businessName);

     getSpecialityList(getValue);
     maxProp++;
     $("#enterPageNO").val(maxProp);
 });




 $(".getSpeciality").click(function() {
     $(".specialityContent").toggle();
     $(".md-input-wrapper").removeClass("md-input-filled");
     $("#inputSpecialityName").val('');
     $("#inputSpecialityDescription").val('');
     $("#hiddenSpecialityID").val(0);
     $(".btnSubmitSpeciality").text("Add Speciality");
 });



 $(".btnSearch").click(function() {
     getValue = $("#inputSearch").val();
     getSpecialityList(getValue);
 });


 $(".logOut").click(function() {
     logOutClearCatch();
 });


 $("#leftArrow").click(function() {
     specialityCountLimit = 0;
     maxProp = 1;
     $("#enterPageNO").val(1);
     $("#getLoadingModalContent").addClass('md-show');
     getSpecialityList(getValue);
     if (maxProp < lastPage) {
         $("#nextPage").attr("disabled", false);
     }
 });

 $("#rightArrow").click(function() {
     $("#previousPage").removeAttr("disabled");
     specialityCountLimit = (9 * lastPage) - 9;
     maxProp = lastPage;
     $("#enterPageNO").val(lastPage);
     $("#getLoadingModalContent").addClass('md-show');
     getSpecialityList(getValue);
 });

 $("#previousPage").click(function() {
     //console.log("inital count : "+specialityCountLimit);
     if (specialityCountLimit == 0) {
         specialityCountLimit = 0;
         $("#previousPage").attr("disabled", "disabled");
     } else {
         specialityCountLimit -= 9;
         $("#previousPage").removeAttr("disabled");
     }
     //console.log("prev count : "+specialityCountLimit);
     if (specialityCountLimit == 0) {
         $("#previousPage").attr("disabled", "disabled");
     }
     maxProp--;
     if (maxProp == 0) {
         $("#enterPageNO").val('');
     } else {
         $("#enterPageNO").val(maxProp);
     }
     $("#getLoadingModalContent").addClass('md-show');
     getSpecialityList(getValue);
 });


 $("#nextPage").click(function() {
     //console.log("next inital count : "+specialityCountLimit);
     $("#previousPage").removeAttr("disabled");
     specialityCountLimit += 9;
     //console.log("next count : "+specialityCountLimit);

     if (maxProp == lastPage) {
         $("#nextPage").attr("disabled", true);
     } else {
         $("#nextPage").attr("disabled", false);
         maxProp++;
         $("#enterPageNO").val(maxProp);
         if (maxProp <= lastPage) {
             $("#getLoadingModalContent").addClass('md-show');
             getSpecialityList(getValue);
         }
     }

 });



 $("#enterPageNO").on("change", function(e) {
     console.log("THis is called" + $("#enterPageNO").val());
     if ($("#enterPageNO").val() < lastPage) {
         maxProp++;
         $("#enterPageNO").val(maxProp);
     }

     console.log("next inital count : " + specialityCountLimit + " page # : " + maxProp);
     specialityCountLimit = 9 * ($("#enterPageNO").val() - 1);
     console.log("change count : " + specialityCountLimit);
     $("#getLoadingModalContent").addClass('md-show');
     getSpecialityList(getValue);
 });

 $("#enterPageNO").keyup(function() {
     console.log("THis is called " + $("#enterPageNO").val());
     if ($("#enterPageNO").val() < lastPage) {
         maxProp++;
         $("#enterPageNO").val(maxProp);
     }

     console.log("next inital count : " + specialityCountLimit + " page # : " + maxProp);
     specialityCountLimit = 9 * ($("#enterPageNO").val() - 1);
     console.log("change count : " + specialityCountLimit);
     $("#getLoadingModalContent").addClass('md-show');
     getSpecialityList(getValue);
 });


 function getSpecialityList(getValue) {

     if (getValue == "" || getValue == undefined) {
         dataForm = '{"Limit":"' + parseInt(specialityCountLimit) + '","AdminID":"' + adminUserID + '"}';
         sendURL = domainAddress + "AdminSpecialityListByCount";
     } else {
         dataForm = '{"Limit":"' + parseInt(specialityCountLimit) + '","SearchValue":"' + getValue + '","AdminID":"' + adminUserID + '"}';
         sendURL = domainAddress + "SearchSpecialityList";
     }
     console.log(dataForm);
     console.log(sendURL);

     $.ajax({
         type: "POST",
         url: sendURL,
         data: dataForm,
         success: function(result) {
                 console.log(result);

                 if (result.record_count == 0 && result.All_Records_Count == 0) {
                     $(".allSpecialityList").html('');
                     $(".allSpecialityList").append("<tr id='rowID-0'> <td class='getSpecialityID' id='inputSpecialityName-0'>No Records Found</td> <td> </td> <td> </td>  </tr>");
                     $("#getLoadingModalContent").removeClass('md-show');
                 } else {
                     loadSpecialityList(result);

                 }


             } // ajax success
     }); // ajax POSTS
 } // getContractorsList

 function loadSpecialityList(resultAllSpeciality) {

     if (resultAllSpeciality.record_count == 0) {
         $("#nextPage").attr("disabled", true);
         var enterPageNO = $("#enterPageNO").val();
         enterPageNO--;
         $("#enterPageNO").val(enterPageNO);
         $("#enterPageNO").attr("disabled", true);
     } else {
         $("#enterPageNO").attr("disabled", false);
         $(".allSpecialityList").html('');
         if (resultAllSpeciality.record_count == resultAllSpeciality.All_Records_Count) {
             console.log("equal to 9");
             $("#nextPage").attr("disabled", "disabled");
         } else if (resultAllSpeciality.record_count < 9 && resultAllSpeciality.record_count != 0) {
             console.log("less than 9");
             $("#nextPage").attr("disabled", "disabled");
         } else if (resultAllSpeciality.record_count >= 9) {
             console.log("great than 9");
             $("#nextLastPage").removeAttr("disabled");
             //$("#nextLastPage").show();
         }
         lastPage = parseInt(resultAllSpeciality.All_Records_Count / 9) + 1;
         console.log(lastPage);

         for (Speciality in resultAllSpeciality.records) {
             $(".allSpecialityList").append("<tr id='rowID-" + resultAllSpeciality.records[Speciality].SpecialityID + "'> <td class='getSpecialityID' id='inputSpecialityName-" + resultAllSpeciality.records[Speciality].SpecialityID + "'>" + resultAllSpeciality.records[Speciality].SpecialityName + "</td> <td><a class='editSpeciality' id='editSpecialityID-" + resultAllSpeciality.records[Speciality].SpecialityID + "'> <i class='fa fa-pencil pencil fa-1x' ></i> </a></td><td><a class='deleteSpeciality' id='deleteSpecialityID-" + resultAllSpeciality.records[Speciality].SpecialityID + "' data-toggle='modal' class='config' href='Speciality.html#CreateSpecialityModal'> <i class='fa fa-trash trash fa-1x'></i> </a></td><input type='hidden' id='hiddenSpecialityDescription-" + resultAllSpeciality.records[Speciality].SpecialityID + "' value='" + resultAllSpeciality.records[Speciality].SpecialityDescription + "' /></tr> ");
         }


         $("#getLoadingModalContent").removeClass('md-show');

         $(".editSpeciality").on('click', function(e) {

             $(".md-input-wrapper").addClass("md-input-filled");
             $(".specialityContent").show();
             $("body").animate({
                 scrollTop: 0
             }, 'slow');
             editSpecialityID = this.id.replace('editSpecialityID-', '');
             $("#hiddenSpecialityID").val(editSpecialityID);

             $("#getLoadingModalContent").addClass('md-show');
             var SpecialityName = $("#inputSpecialityName-" + editSpecialityID).text();
             var SpecialityDescription = $("#hiddenSpecialityDescription-" + editSpecialityID).val();
             $("#inputSpecialityName").val(SpecialityName);
             $("#inputSpecialityDescription").val(SpecialityDescription);
             $("#getLoadingModalContent").removeClass('md-show');
             $(".btnSubmitSpeciality").text("Update Speciality");

         });

         $(".deleteSpeciality").on('click', function(e) {
             var getSpecialityID = this.id.replace('deleteSpecialityID-', '');

             UIkit.modal.confirm('Do you want to delete the speciality?', function() {
                 $("#getLoadingModalContent").addClass('md-show');
                 $.post(domainAddress + 'DeleteSpeciality/' + getSpecialityID, function(e) {
                     console.log(e);
                     $("#rowID-" + getSpecialityID).remove();
                     getSpecialityList(getValue);
                     $("#getLoadingModalContent").removeClass('md-show');
                     UIkit.modal.alert('Speciality Deleted Successfully');

                 });
             });

         }); // deleteSpeciality

     }

 }




 $("#inputSpecialityName").keyup(function() {
     var inputSpecialityName = $("#inputSpecialityName").val();
     if (inputSpecialityName == "") {
         $(".errorInfo").show();
         $("#inputSpecialityName").css("border-color", "red");
         $(".errorInfo").text("* Enter the Speciality");
        $(".btnSubmitSpeciality").attr("disabled", true);
         return false;
     } else {
         $(".errorInfo").hide();
         $(".errorInfo").text("");
         $("#inputSpecialityName").css("border-color", "rgba(0,0,0,.12)");
         $(".btnSubmitSpeciality").attr("disabled", false);
     }
 });



 $("#inputSpecialityDescription").keyup(function() {
     var inputSpecialityDescription = $("#inputSpecialityDescription").val();
     if (inputSpecialityDescription == "") {
         $(".errorInfo").show();
         $("#inputSpecialityDescription").css("border-color", "red");
         $(".errorInfo").text("* Enter the Description");
         $(".btnSubmitSpeciality").attr("disabled", true);
         return false;
     } else {
         $(".errorInfo").hide();
         $(".errorInfo").text("");
         $("#inputSpecialityDescription").css("border-color", "rgba(0,0,0,.12)");
         $(".btnSubmitSpeciality").attr("disabled", false);
    }
 });


 $(".btnSubmitSpeciality").click(function() {
     var specialityID = $("#hiddenSpecialityID").val();
     var specialityName = $("#inputSpecialityName").val().replace(/'/g, "′");
     var adminUserID = localStorage.getItem("MyRequest_AdminID");
     var specialityDescription = $("#inputSpecialityDescription").val().replace(/'/g, "′");
     userID = localStorage.getItem("ReportUserID");


     if (specialityName == "") {
         $(".errorInfo").show();
         $(".errorInfo").text("* Enter the Speciality Name");
         $("#inputSpecialityName").css("border-color", "red");
         $(".btnSubmitSpeciality").attr("disabled", true);
         return false;
     }

     if (specialityDescription == "") {
         $(".errorInfo").show();
         $(".errorInfo").text("* Enter the Speciality Description");
         $("#inputSpecialityDescription").css("border-color", "red");
         $(".btnSubmitSpeciality").attr("disabled", true);
         return false;
     } else {
        $("#getLoadingModalContent").addClass('md-show');
         var dataForm = '{"SpecialityName":"' + specialityName + '","SpecialityDescription":"' + specialityDescription + '","UserID":"' + userID + '","AdminID":"' + adminUserID + '"}';
         console.log(dataForm);

         if (specialityName != "" && specialityDescription != "") {
             if (specialityID == 0) {
                 var sendURL = domainAddress + 'CreateSpeciality';
                 console.log(sendURL);


                 $.get(domainAddress + "push/newSplPush.php?adminID=" + adminUserID + "&StatusMessage=" + newSpecialityAddedMsg.format(specialityDescription), {}, function(result) {
                     console.log(result);
                 });

                 $.ajax({
                     type: "POST",
                     url: sendURL,
                     data: dataForm,
                     success: function(dataCheck) {

                         console.log(dataCheck);
                         getSpecialityList(getValue);
                         $("#getLoadingModalContent").removeClass('md-show');
                         $("#inputSpecialityName").val('');
                         $("#inputSpecialityDescription").val('');
                         UIkit.modal.alert('Speciality Created Successfully');
                         
                     }
                 });
             } else {
                 var sendURL = domainAddress + 'updateSpeciality/' + specialityID;
                 console.log(sendURL);
                 $.ajax({
                     type: "POST",
                     url: sendURL,
                     data: dataForm,
                     success: function(dataCheck) {
                         console.log(dataCheck);
                         getSpecialityList(getValue);
                         $("#getLoadingModalContent").removeClass('md-show');
                         $("#inputSpecialityName").val('');
                         $("#inputSpecialityDescription").val('');
                         $("#hiddenSpecialityID").val(0);
                         $(".btnSubmitSpeciality").text("Add Speciality");
                         UIkit.modal.alert('Speciality Updated Successfully');
                         
                     }
                 });
             } // sec if specialityID

             $(".md-input-wrapper").removeClass("md-input-filled");
             $(".specialityContent").hide();

         } // first if

     }

 }); // #createSpeciality