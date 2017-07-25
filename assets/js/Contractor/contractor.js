 var lastPage = 0;
 var getcountryCode = "";
 var getPhoneCode = "";
 $(function() {
   getcountryCode = localStorage.getItem("MyRequest_countryCode");
   getPhoneCode = localStorage.getItem("MyRequest_PhoneCode-prefix");
   console.log(getcountryCode);
   switch(getcountryCode){
    case "UK":
    
    $("#avgPound-prefix").removeClass();
    $("#avgPound-prefix").addClass("fa fa-gbp");
    $("#visitPound-prefix").removeClass();
    $("#visitPound-prefix").addClass("fa fa-gbp");
    $("#hrPound-prefixx").removeClass();
    $("#hrPound-prefix").addClass("fa fa-gbp");
    break;
    case "US":
    
    $("#avgPound-prefix").removeClass();
    $("#avgPound-prefix").addClass("fa fa-usd");
    $("#visitPound-prefix").removeClass();
    $("#visitPound-prefix").addClass("fa fa-usd");
    $("#hrPound-prefix").removeClass();
    $("#hrPound-prefix").addClass("fa fa-usd");
    break;
    case "India":
    console.log("myCountry"+getcountryCode);
    $("#avgPound-prefix").removeClass();
    $("#avgPound-prefix").addClass("fa fa-inr");
    $("#visitPound-prefix").removeClass();
    $("#visitPound-prefix").addClass("fa fa-inr");
    $("#hrPound-prefix").removeClass();
    $("#hrPound-prefix").addClass("fa fa-inr");
    break;
    case "Canada":
    
    $("#avgPound-prefix").removeClass();
    $("#avgPound-prefix").addClass("fa fa-usd");
    $("#visitPound-prefix").removeClass();
    $("#visitPound-prefix").addClass("fa fa-usd");
    $("#hrPound-prefix").removeClass();
    $("#hrPound-prefix").addClass("fa fa-usd");
    break;
  }
  
  
  
  $(".landlord-prefix").text(getPhoneCode);
  



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


  $('input[name="radio_demo_inline1"]:radio').on('ifChecked', function(event) {
    $(".ownsSmartPhone").css("color", "#444");
    $(".help-block").hide();
    $(".help-block").text("");
    $(".btnSubmitContractor").attr("disabled", false);
  });



  $('input[name="radio_demo_inline4"]:radio').on('ifChecked', function(event) {

    $(".emergencyLabel").css("color", "#444");
    $(".help-block").hide();
    $(".help-block").text("");
    $(".btnSubmitContractor").attr("disabled", false);
  });


  $('input[name="radio_demo_inline2"]:radio').on('ifChecked', function(event) {

    $(".agencyLabel").css("color", "#444");
    $(".help-block").hide();
    $(".help-block").text("");
    $(".btnSubmitContractor").attr("disabled", false);
  });



  $('input[name="radio_demo_inline5"]:radio').on('ifChecked', function(event) {

    $(".liabilityInsuranceLabel").css("color", "#444");
    $(".help-block").hide();
    $(".help-block").text("");
    $(".btnSubmitContractor").attr("disabled", false);
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
            (!$(e.target).closest($switcher).length) || (e.keyCode == 27)
            ) {
            $switcher.removeClass('switcher_active');
        }
      }
    });

      if (localStorage.getItem("altair_theme") !== null) {
        $theme_switcher.children('li[data-app-theme=' + localStorage.getItem("altair_theme") + ']').click();
      }
    });

 var endRecordCount = 0;
 var adminUserID = 0;
 var isSmartPhone = "";
 var isAgency = "";
 var isAppInstalled = 0;
 var isEmergencyAvailable = "";
 var isLiabilityInsurance = "";
 var imageUrl1 = "";
 var imageUrl2 = "";
 var imageUrl3 = "";
 var contractorsCountLimit = 0;
 var maxProp = 0;
 var getValue = "";

 $("#addSpl").on("click", function() {
  var specialityName = $("#SpecialityName").val();
  var specialityDescription = $("#specialityDescription").val();
  adminUserID = localStorage.getItem("MyRequest_AdminID");
  var userID = localStorage.getItem("ReportUserID");
  var dataForm = '{"SpecialityName":"' + specialityName + '","SpecialityDescription":"' + specialityDescription + '","UserID":"' + userID + '","AdminID":"' + adminUserID + '"}';
  console.log(dataForm);

  if (specialityName != "" && specialityDescription != "") {

    var sendURL = domainAddress + 'CreateSpeciality';
    console.log(sendURL);


    $.get(domainAddress + "push/newSplPush.php?adminID=" + adminUserID + "&StatusMessage=" + specialityDescription, {}, function(result) {
      console.log(result);
    });

    $.ajax({
      type: "POST",
      url: sendURL,
      data: dataForm,
      success: function(dataCheck) {
        console.log(dataCheck);
        $.get(domainAddress + "GetAllSpecialityList/" + adminUserID, function(result) {
                      //console.log(result);
                      $("#inputSpeciality").html('');
                      $("#inputSpeciality").html("<option value='0'>Select Speciality</option>");
                      $("#inputSpeciality").append("<option value='newSpl'>Add Speciality</option>");
                      if (result.record_count == 0) {
                        $("#inputSpeciality").append("<option value='0'>No Speciality</option>");
                      } else {
                        for (speciality in result.records) {
                          $("#inputSpeciality").append("<option value='" + result.records[speciality].SpecialityID + "'>" + result.records[speciality].SpecialityName + "</option>");
                        }

                      }

                      $("#inputSpeciality").select2();
                      $("#SpecialityName").val('');
                      $("#specialityDescription").val('');
                      var modal = UIkit.modal("#specialityModal");
                      modal.hide();
                      UIkit.modal.alert('Speciality Created Successfully');
                    });

      }
    });

  }
});

 $(window).load(function () {
  $("#getLoadingModalContent").removeClass('md-show');
});

 $(document).ready(function() {
  console.log("ready call");

  if(getPhoneCode == '+44'){
      $(".postcodebasedcountry").html("Post Code<span class='req'>*</span>");
    }
    else {
      $(".postcodebasedcountry").html("Zip Code<span class='req'>*</span>");
  }

  adminUserID = localStorage.getItem("MyRequest_AdminID");
  var adminUserName = localStorage.getItem("MyRequest_UserName");
  var adminType = localStorage.getItem("MyRequest_AdminType");
  var businessName = localStorage.getItem("MyRequest_BusinessName");
  var logo = localStorage.getItem("MyRequest_Logo");


  var isFilled = localStorage.getItem("MyRequest_profileFill");
  if (isFilled == "true") {

    window.location.href = domainAgentAddress+'MyProfile.html';
  }


  $(".editContractorStatus").hide();
  localStorage.setItem("MyRequest_RepairStatus", "");
  if (adminUserID == "" || adminUserID == null) {
    window.location.href = "index.html";
  } else {
    $(".getUserName").text(adminUserName);
    $("#FileURLUploadImage1").attr("action",domainAddress+"uploadUserImage.php");
    $("#FileURLUploadImage2").attr("action",domainAddress+"ajaximage.php");
    $("#FileURLUploadImage3").attr("action",domainAddress+"ajaximage.php");
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

  $("#previousPage").attr("disabled", true);
  $(".md-overlay").css("background", "rgba(0,0,0,0.5)");
  $("#getLoadingModalContent").addClass('md-show');
  $.get(domainAddress + "GetAllSpecialityList/" + adminUserID, function(result) {
          //console.log(result);
          $("#inputSpeciality").html('');
          $("#inputSpeciality").html("<option value='0'>Select Speciality</option>");
          $("#inputSpeciality").append("<option value='newSpl'>Add Speciality</option>");
          if (result.record_count == 0) {
            $("#inputSpeciality").append("<option value='0'>No Speciality</option>");
          } else {
            for (speciality in result.records) {
              $("#inputSpeciality").append("<option value='" + result.records[speciality].SpecialityID + "'>" + result.records[speciality].SpecialityName + "</option>");
            }

          }
          $("#inputSpeciality").select2();


        });

  $("#inputCountry").val(getcountryCode);
  maxProp++;
  $("#enterPageNO").val(maxProp);

  $(".getLettingAgencyBusinessName").text("Contractor - " + businessName);
  getContractorsList(getValue);


  // $("#inputState").select2().on("change", function(e) {

  //   var stateID = $("#inputState").val();
  //   $.get("CityState/getCity.php?stateID=" + stateID, function(result) {
  //     $("#inputCity").html('');
  //     $("#inputCity").html("<option value='0'>Choose City</option>");
  //     var getResult = JSON.parse(result);
  //     for (inputCity in getResult.records) {
  //       $("#inputCity").append("<option value='" + getResult.records[inputCity].CityName + "'>" + getResult.records[inputCity].CityName + "</option>");

  //     }
  //     $("#inputCity").select2();
  //   });
  // });
 $("#inputState").select2().on("change", function(e) {
   var stateID = $("#inputState").val();
      console.log(stateID)
      $.get("CityState/getCity.php?stateID=" + stateID, function(result) {
        $("#inputCity").html('');
        $("#inputCity").html("<option value='0'>Choose City</option>");
        var getResult = JSON.parse(result);
        for (inputCity in getResult.records) {
          $("#inputCity").append("<option value='" + getResult.records[inputCity].CityName + "'>" + getResult.records[inputCity].CityName + "</option>");

        }
        $("#inputCity").select2();

      });
    });

     


      var countryID = $("#inputCountry").val();

      

      if(countryID == "India"){
        $("#stateLabel").text('County');
          countryID = '+91';
          console.log(countryID)
        $.get("CityState/getState.php?countryID=" + countryID, function(result) {
          $("#inputState").html('');
          $("#inputState").html("<option value='0'>Choose State</option>");
          var getResult = JSON.parse(result);
          console.log(getResult);
          for (inputState in getResult.records) {
            $("#inputState").append("<option value='" + getResult.records[inputState].StateName + "'>" + getResult.records[inputState].StateName + "</option>");

          }
          $("#inputState").select2();

        });
      } else if(countryID == "Canada"){
        $("#stateLabel").text('County');
          countryID = 'Canada';
          console.log(countryID)
        $.get("CityState/getState.php?countryID=" + countryID, function(result) {
          $("#inputState").html('');
          $("#inputState").html("<option value='0'>Choose State</option>");
          var getResult = JSON.parse(result);
          console.log(getResult);
          for (inputState in getResult.records) {
            $("#inputState").append("<option value='" + getResult.records[inputState].StateName + "'>" + getResult.records[inputState].StateName + "</option>");

          }
          $("#inputState").select2();

        });
      } else if(countryID == "UK"){
        $("#stateLabel").text('County');
          countryID = '+44';
          console.log(countryID)
        $.get("CityState/getState.php?countryID=" + countryID, function(result) {
          $("#inputState").html('');
          $("#inputState").html("<option value='0'>Choose State</option>");
          var getResult = JSON.parse(result);
          console.log(getResult);
          for (inputState in getResult.records) {
            $("#inputState").append("<option value='" + getResult.records[inputState].StateName + "'>" + getResult.records[inputState].StateName + "</option>");

          }
          $("#inputState").select2();

        });
      } else if(countryID == "US"){
        $("#stateLabel").text('County');
          countryID = '+1';
          console.log(countryID)
        $.get("CityState/getState.php?countryID=" + countryID, function(result) {
          $("#inputState").html('');
          $("#inputState").html("<option value='0'>Choose State</option>");
          var getResult = JSON.parse(result);
          console.log(getResult);
          for (inputState in getResult.records) {
            $("#inputState").append("<option value='" + getResult.records[inputState].StateName + "'>" + getResult.records[inputState].StateName + "</option>");

          }
          $("#inputState").select2();

        });
      }

      




  $("#inputPhoneNo1").keypress(function(e) {

    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {


      return false;
    }
  });


  $("#inputAlternateNo").keypress(function(e) {

    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {


      return false;
    }
  });

  $('#inputAverageCharges').keypress(function(event) {
    if (event.which < 46 || event.which >= 58 || event.which == 47) {
      event.preventDefault();
    }

    if (event.which == 46 && $(this).val().indexOf('.') != -1) {
      this.value = '';
    }
  });

  $('#inputVisitCharges').keypress(function(event) {
    if (event.which < 46 || event.which >= 58 || event.which == 47) {
      event.preventDefault();
    }

    if (event.which == 46 && $(this).val().indexOf('.') != -1) {
      this.value = '';
    }
  });

  $('#inputHourlyRate').keypress(function(event) {
    if (event.which < 46 || event.which >= 58 || event.which == 47) {
      event.preventDefault();
    }

    if (event.which == 46 && $(this).val().indexOf('.') != -1) {
      this.value = '';
    }
  });


  $('#inputTradeCertificateNo').keypress(function(event) {
    if (event.which < 46 || event.which >= 58 || event.which == 47) {
      event.preventDefault();
    }

    if (event.which == 46 && $(this).val().indexOf('.') != -1) {
      this.value = '';
    }
  });


  isAppInstalled = 0;
  $('#inputTitle').select2();




  }); // ready

 $("#inputPhoneNo1").on('blur', function(e) {
  var getCountValue = this.id.replace("inputPhoneNo1", "");
  var getMobileNumber = $("#inputPhoneNo1").val();
  $.get(domainAddress + "GetUserContractorValue/" + getMobileNumber, function(result) {
          //console.log(result);

          if (result.record_count == 0) {} else {
            for (var contractor in result.records) {
              $("#inputTitle").val(result.records[contractor].Title);
              $("#select2-inputTitle-container").html(result.records[contractor].Title);
              $("#inputSpeciality").val(result.records[contractor].specialityID);
              $("#select2-inputSpeciality-container").html(result.records[contractor].SpecialityName);
              $("#inputFirstName").val(result.records[contractor].ContractorName);
              $("#inputLastName").val(result.records[contractor].LastName);
              $("#inputContractorEmailID").val(result.records[contractor].EmailID);
              $("#inputAlternateNo").val(result.records[contractor].AlternateNo);
              $("#inputAddressLine1").val(result.records[contractor].AddressLine1);
              $("#inputState").val(result.records[contractor].State);
              $("#select2-inputState-container").html(result.records[contractor].State);
              if (result.records[contractor].City == "undefined" || result.records[contractor].City == null) {
                $("#inputCity").html("<option value=''>No City Found</option>");
                $("#inputCity").val('');
              } else {
                $("#inputCity").html("<option value='" + result.records[contractor].City + "'>" + result.records[contractor].City + "</option>");
                $("#inputCity").val(result.records[contractor].City);
              }

              $("#inputCity").select2();
              $("#inputCountry").val(result.records[contractor].Country);
              $("#inputZip").val(result.records[contractor].Zip);
              $("#inputStartTime").val(result.records[contractor].StartTime);
              $("#inputEndTime").val(result.records[contractor].EndTime);
              $("#inputAverageCharges").val(result.records[contractor].AverageCharges);
              $("#inputVisitCharges").val(result.records[contractor].VisitCharges);
              $("#inputHourlyRate").val(result.records[contractor].HourlyRate);
              $("#inputHasSmartPhone").val(result.records[contractor].isSmartPhone);
              isSmartPhone = result.records[contractor].isSmartPhone;

              if (isSmartPhone == 1) {
                $('.smartYes > div').addClass('checked');
                $('.smartNo > div').removeClass('checked');
              } else {
                $('.smartYes > div').removeClass('checked');
                $('.smartNo > div').addClass('checked');
              }

              isEmergencyAvailable = result.records[contractor].isEmergencyAvailability;
              if (isEmergencyAvailable == 1) {
                $('.emergencyAvailable > div').addClass('checked');
                $('.emergencyNotAvailable > div').removeClass('checked');
              } else {
                $('.emergencyAvailable > div').removeClass('checked');
                $('.emergencyNotAvailable > div').addClass('checked');
              }

              isAgency = result.records[contractor].isAgency;
              if (isAgency == 1) {
                $('.agency > div').addClass('checked');
                $('.independent > div').removeClass('checked');
              } else {
                $('.agency > div').removeClass('checked');
                $('.independent > div').addClass('checked');
              }

              isLiabilityInsurance = result.records[contractor].isLiabilityInsurance;
              if (isLiabilityInsurance == 1) {
                $('.liabilityInsurance > div').addClass('checked');
                $('.liabilityNotInsurance > div').removeClass('checked');
              } else {
                $('.liabilityInsurance > div').removeClass('checked');
                $('.liabilityNotInsurance > div').addClass('checked');
              }

              isAppInstalled = result.records[contractor].isAppInstalled;
              
              if (isAppInstalled == 1) {
                $("#getBorderColor").css("border", "1px solid greenyellow");
                $('.appYes > div').addClass('checked');
                $('.appNo > div').removeClass('checked');
              } else {
                $("#getBorderColor").css("border", "1px solid red");
                $('.appYes > div').removeClass('checked');
                $('.appNo > div').addClass('checked');
              }
              
              $("#inputContractValidTill").val(result.records[contractor].ContractValidTill);
              $("#inputTradeCertificateNo").val(result.records[contractor].TradeCertificateNo);
              
              
              if (result.records[contractor].ContractValidTill != "" && result.records[contractor].ContractValidTill != null) {
                var selectDate = result.records[contractor].ContractValidTill.split("-");
                var contractValidTill = selectDate[2] + "." + selectDate[1] + "." + selectDate[0];
                $("#inputContractValidTill").val(contractValidTill);


              }
              if (result.records[contractor].image1 == "" || result.records[contractor].image1 == null) {
                $("#imgContractor").attr("src", "assets/img/sign-in.jpg");
                imageUrl1 = "";
              } else {
                imageUrl1 = result.records[contractor].image1;
                $("#imgContractor").attr("src", domainAddress + imageUrl1);
                $("#imgContractor").css("height", "80px").css("width", "100px");
              }

              if (result.records[contractor].image2 == "" || result.records[contractor].image2 == null) {
                $("#imgContract").attr("src", "assets/img/noImage.gif");
                imageUrl2 = "";
              } else {
                imageUrl2 = result.records[contractor].image2;
                $("#imgContract").attr('src', domainAddress + imageUrl2);
                $("#imgContract").css("height", "80px").css("width", "100px").css("border", "");
              }

              if (result.records[contractor].tradeCertificateImage == "" || result.records[contractor].tradeCertificateImage == null) {
                $("#imgTradeCertificate").attr("src", "assets/img/noImage.gif");
                imageUrl3 = "";
              } else {
                imageUrl3 = result.records[contractor].tradeCertificateImage;
                $("#imgTradeCertificate").attr('src', domainAddress + imageUrl3);
                $("#imgTradeCertificate").css("height", "80px").css("width", "100px").css("border", "");
              }


            }
          }


        });
});




 $("#contractorImageUrl1").off('click').on('change', function() {
  $("#getLoadingModalContent").addClass('md-show');
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
              $('#progressbox1').css("margin", "0px 10px 10px 140px");
              $('#progressbox1').show();
              $('#progressbar1').show();

              if (percentComplete > 50) {
                console.log("if : " + percentComplete);
                statustxt.css('color', '#fff');
                  statustxt.html(percentComplete + '%'); //change status text to white after 50%
                  $('#progressbar1').css("width", percentComplete + "%");
                  $('#progressbox1').css("margin", "0px 10px 10px 140px");
                  $('#progressbox1').show();
                  $('#progressbar1').show();
                }
                $(".btnSubmitContractor").attr("disabled", true);
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
                  $('#progressbox1').css("margin", "0px 10px 10px 140px");
                  $('#progressbox1').show();
                  $('#progressbar1').show();
                  console.log('z ' + result);
                  imageUrl1 = result;
                  $(".help-block").hide();
                  $(".help-block").text("");
                  $(".btnSubmitContractor").attr("disabled", false);
                  $("#imgContractor").attr('src', domainAddress + imageUrl1);
                  $("#imgContractor").css("height", "80px").css("width", "100px").css("border", "");
                  $(".fileupload-preview1").text(domainAddress + imageUrl1);
                  $(".btnSubmitContractor").attr("disabled", false);
                  $("#getLoadingModalContent").removeClass('md-show');
                  $("#progressbox1").hide();
                }

              },
              error: function() {
                console.log('d');


              }
            }).submit();
});


 $("#contractImageUrl").off('click').on('change', function() {
  $("#getLoadingModalContent").addClass('md-show');
  var progressbox = $('#progressbox2');
  var progressbar = $('#progressbar2');
  var statustxt = $('#statustxt2');

  $("#preview2").html('');

  $("#FileURLUploadImage2").ajaxForm({
    target: '#preview2',
    beforeSubmit: function() {
      console.log('v');

    },
    uploadProgress: function(event, position, total, percentComplete) {
      console.log("on  progress");
              progressbar.width(percentComplete + '%') //update progressbar percent complete
              console.log(percentComplete);
              statustxt.html(percentComplete + '%'); //update status text
              $('#progressbar2').css("width", percentComplete + "%");
              $('#progressbox2').css("margin", "-40px 10px 10px 125px");
              $('#progressbox2').show();
              $('#progressbar2').show();

              if (percentComplete > 50) {
                console.log("if : " + percentComplete);
                statustxt.css('color', '#fff');
                  statustxt.html(percentComplete + '%'); //change status text to white after 50%
                  $('#progressbar2').css("width", percentComplete + "%");
                  $('#progressbox2').css("margin", "-40px 10px 10px 125px");
                  $('#progressbox2').show();
                  $('#progressbar2').show();
                }
                $(".btnSubmitContractor").attr("disabled", true);
              },
              success: function(result, percentComplete) {
                if (result == "Please select image..!") {
                  $("#progressbox2").hide();
                  alert("Please select image..!");
                  return false;
                } else if (result == "Invalid file format..") {
                  $("#progressbox2").hide();
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

                  $('#progressbar2').css("width", percentComplete + "%");
                  $('#progressbox2').css("margin", "-40px 10px 10px 125px");
                  $('#progressbox2').show();
                  $('#progressbar2').show();
                  console.log('z ' + result);
                  imageUrl2 = result;
                  $(".help-block").hide();
                  $(".help-block").text("");
                  $(".btnSubmitContractor").attr("disabled", false);
                  $("#imgContract").attr('src', domainAddress + imageUrl2);
                  $("#imgContract").css("height", "80px").css("width", "100px").css("border", "");
                  $(".fileupload-preview2").text(domainAddress + imageUrl2);
                  $(".btnSubmitContractor").attr("disabled", false);
                  $("#getLoadingModalContent").removeClass('md-show');
                  $("#progressbox2").hide();
                }
              },
              error: function() {
                console.log('d');


              }
            }).submit();
});


 $("#tradeCertificateImage").off('click').on('change', function() {
  $("#getLoadingModalContent").addClass('md-show');
  var progressbox = $('#progressbox3');
  var progressbar = $('#progressbar3');
  var statustxt = $('#statustxt3');

  $("#preview3").html('');

  $("#FileURLUploadImage3").ajaxForm({
    target: '#preview3',
    beforeSubmit: function() {
      console.log('v');

    },
    uploadProgress: function(event, position, total, percentComplete) {
      console.log("on  progress");
              progressbar.width(percentComplete + '%') //update progressbar percent complete
              console.log(percentComplete);
              statustxt.html(percentComplete + '%'); //update status text
              $('#progressbar3').css("width", percentComplete + "%");
              $('#progressbox3').css("margin", "0px 10px 10px 125px");
              $('#progressbox3').show();
              $('#progressbar3').show();

              if (percentComplete > 50) {
                console.log("if : " + percentComplete);
                statustxt.css('color', '#fff');
                  statustxt.html(percentComplete + '%'); //change status text to white after 50%
                  $('#progressbar3').css("width", percentComplete + "%");
                  $('#progressbox3').css("margin", "0px 10px 10px 125px");
                  $('#progressbox3').show();
                  $('#progressbar3').show();
                }
                $(".btnSubmitContractor").attr("disabled", true);
              },
              success: function(result, percentComplete) {
                if (result == "Please select image..!") {
                  $("#progressbox3").hide();
                  alert("Please select image..!");
                  return false;
                } else if (result == "Invalid file format..") {
                  $("#progressbox3").hide();
                  alert("Upload only JPG or PNG file format");
                  return false;
                } else if (result == "Image file size max 1 MB") {
                  $("#progressbox3").hide();
                  alert("Upload Image file sixe less then 1 MB");
                  return false;
                } else {
                  if (percentComplete == "success") {
                    percentComplete = 100;
                    statustxt.html(percentComplete + ' %');
                  }

                  $('#progressbar3').css("width", percentComplete + "%");
                  $('#progressbox3').css("margin", "0px 10px 10px 125px");
                  $('#progressbox3').show();
                  $('#progressbar3').show();
                  console.log('z ' + result);
                  imageUrl3 = result;
                  $(".help-block").hide();
                  $(".help-block").text("");
                  $("#imgTradeCertificate").attr('src', domainAddress + imageUrl3);
                  $("#imgTradeCertificate").css("height", "80px").css("width", "100px").css("border", "");
                  $(".fileupload-preview3").text(domainAddress + imageUrl3);
                  $(".btnSubmitContractor").attr("disabled", false);
                  $("#getLoadingModalContent").removeClass('md-show');
                  $("#progressbox3").hide();
                }
              },
              error: function() {
                console.log('d');


              }
            }).submit();
});



 $(".getContractor").click(function() {
  $(".editContractorStatus").toggle();
  $(".contractorContent").show();
  $("#inputTitle").val('');
  $("#inputFirstName").val('');
  $("#inputLastName").val('');
  $("#inputContractorEmailID").val('');
  $("#inputAddressLine1").val('');
  $("#inputAddressLine2").val('');
  $("#inputLocality").val('');
  $("#inputState").val(0);
  $("#inputCity").val(0);
  $("#select2-inputTitle-container").html("Select Title");
  $("#select2-inputState-container").html("Select County");
  $("#select2-inputCity-container").html("Select City");
  $("#inputZip").val('');
  $("#inputCountry").val(getcountryCode);
  $("#inputPhoneNo1").val('');
  $("#inputAlternateNo").val('');
  $("#inputStartTime").val('');
  $("#inputEndTime").val('');
  $("#inputAverageCharges").val('');
  $("#inputVisitCharges").val('');
  $("#inputHourlyRate").val('');
  $("#inputSpeciality").val(0);
  $("#select2-inputSpeciality-container").html("Select Speciality");
  $(".mno-prefix").hide();
  $(".ano-prefix").hide();
  $('#ownSmartPhoneYes').iCheck('uncheck');
  $('#ownSmartPhoneNo').iCheck('uncheck');
  $('#emergencyYes').iCheck('uncheck');
  $('#emergencyNo').iCheck('uncheck');
  $('#agencyCheck').iCheck('uncheck');
  $('#independentCheck').iCheck('uncheck');
  $('#liabilityYes').iCheck('uncheck');
  $('#liabilityNo').iCheck('uncheck');
  $("#inputTradeCertificateNo").val('');
  $("#inputValidTill").val('');
  $("#inputContractValidTill").val('');
  $("#imgTradeCertificate").attr("src", "assets/img/noImage.gif");
  $("#imgContractor").attr("src", "assets/img/sign-in.jpg");
  $("#imgContract").attr("src", "assets/img/noImage.gif");
  $("#progressbox1").hide();
  $("#progressbox2").hide();
  $("#progressbox3").hide();
  $(".name").text('');
  $(".emailID").text('');
  $("#hiddenContractorID").val(0);
  isSmartPhone = "";
  isAgency = "";
  isAppInstalled = 0;
  isEmergencyAvailable = "";
  isLiabilityInsurance = "";
  imageUrl1 = "";
  imageUrl2 = "";
  imageUrl3 = "";
  $("#user_edit_form").css("border", "");
  $(".md-input-wrapper").addClass("md-input-filled");

});



 $("#inputAverageCharges").blur(function() {
  $(".md-input-wrapper").addClass("md-input-filled");
});

 $("#inputVisitCharges").blur(function() {
  $(".md-input-wrapper").addClass("md-input-filled");
});

 $("#inputHourlyRate").blur(function() {
  $(".md-input-wrapper").addClass("md-input-filled");
});

 $(".logOut").click(function() {
  logOutClearCatch();
});

 $("#inputFirstName").keyup(function() {
  var name = $("#inputFirstName").val();
  if (name == "") {
    $(".help-block").css("border-color", "red");
    $(".help-block").show();
    $(".help-block").text("* Enter the Name");
    $(".btnSubmitContractor").attr("disabled", true);
    return false;
  } else {
    $(".help-block").hide();
    $(".help-block").text("");
    $("#inputFirstName").css("border-color", "rgba(0,0,0,.12)");
    $(".btnSubmitContractor").attr("disabled", false);
    return false;
  }
});


 $("#inputLastName").keyup(function() {
  var lastName = $("#inputLastName").val();
  if (lastName == "") {
    $(".help-block").css("border-color", "red");
    $(".help-block").show();
    $(".help-block").text("* Enter the Last Name");
    $(".btnSubmitContractor").attr("disabled", true);
    return false;
  } else {
    $(".help-block").hide();
    $(".help-block").text("");
    $("#inputLastName").css("border-color", "rgba(0,0,0,.12)");
    $(".btnSubmitContractor").attr("disabled", false);
    return false;
  }
});



 $("#inputContractorEmailID").keyup(function() {
  var inputContractorEmailID = $("#inputContractorEmailID").val();
  if (inputContractorEmailID == "") {
    $(".help-block").css("border-color", "red");
    $(".help-block").show();
    $(".help-block").text("* Enter the Email");
    $(".btnSubmitContractor").attr("disabled", true);
    return false;
  } else {
    $(".help-block").hide();
    $(".help-block").text("");
    $("#inputContractorEmailID").css("border-color", "rgba(0,0,0,.12)");
    $(".btnSubmitContractor").attr("disabled", false);
    return false;
  }
});




 $("#inputAddressLine1").keyup(function() {
  var inputAddressLine1 = $("#inputAddressLine1").val();
  if (inputAddressLine1 == "") {
    $(".help-block").css("border-color", "red");
    $(".help-block").show();
    $(".help-block").text("* Enter the Address 1");
    $(".btnSubmitContractor").attr("disabled", true);
    return false;
  } else {
    $(".help-block").hide();
    $(".help-block").text("");
    $("#inputAddressLine1").css("border-color", "rgba(0,0,0,.12)");
    $(".btnSubmitContractor").attr("disabled", false);
    return false;
  }
});


 $("#inputAddressLine2").keyup(function() {
  var inputAddressLine2 = $("#inputAddressLine2").val();
  if (inputAddressLine2 == "") {
    $(".help-block").css("border-color", "red");
    $(".help-block").show();
    $(".help-block").text("* Enter the Address 2");
    $(".btnSubmitContractor").attr("disabled", true);
    return false;
  } else {
    $(".help-block").hide();
    $(".help-block").text("");
    $("#inputAddressLine2").css("border-color", "rgba(0,0,0,.12)");
    $(".btnSubmitContractor").attr("disabled", false);
    return false;
  }
});



 $("#inputLocality").keyup(function() {
  var inputLocality = $("#inputLocality").val();
  if (inputLocality == "") {
    $(".help-block").css("border-color", "red");
    $(".help-block").show();
    $(".help-block").text("* Enter the Locality");
    $(".btnSubmitContractor").attr("disabled", true);
    return false;
  } else {
    $(".help-block").hide();
    $(".help-block").text("");
    $("#inputLocality").css("border-color", "rgba(0,0,0,.12)");
    $(".btnSubmitContractor").attr("disabled", false);
    return false;
  }
});


 $("#inputState").on('change', function() {
  var inputState = $("#inputState").val();
  if (inputState == 0) {
    $(".help-block").css("border-color", "red");
    $(".help-block").show();
    $(".help-block").text("* Select the County");
    $("#select2-inputState-container").css("border", "1px solid red");
    $(".btnSubmitContractor").attr("disabled", true);
    return false;
  } else {
    $(".help-block").hide();
    $(".help-block").text("");
    $("#select2-inputState-container").css("border", "");
    $(".btnSubmitContractor").attr("disabled", false);
    return false;
  }
});



 $("#inputSpeciality").on('change', function() {
  var inputSpeciality = $("#inputSpeciality").val();
  if (inputSpeciality == "newSpl") {
    var modal = UIkit.modal("#specialityModal");
    modal.show();
  }
  if (inputSpeciality == 0) {
    $("#select2-inputSpeciality-container").css("border", "1px solid red");
    $(".help-block").show();
    $(".help-block").text("* Select the Speciality");
    $(".btnSubmitContractor").attr("disabled", true);
    return false;
  } else {
    $(".help-block").hide();
    $(".help-block").text("");
    $("#select2-inputSpeciality-container").css("border", "");
    $(".btnSubmitContractor").attr("disabled", false);
    return false;
  }

});


 $("#inputCity").on('change', function() {
  var inputCity = $("#inputCity").val();
  if (inputCity == 0) {
    $(".help-block").css("border-color", "red");
    $(".help-block").show();
    $(".help-block").text("* Select the City");
    $("#select2-inputCity-container").css("border", "1px solid red");
    $(".btnSubmitContractor").attr("disabled", true);
    return false;
  } else {
    $(".help-block").hide();
    $(".help-block").text("");
    $("#select2-inputCity-container").css("border", "");
    $(".btnSubmitContractor").attr("disabled", false);
    return false;
  }
});



 $("#inputZip").keyup(function() {
  var inputZip = $("#inputZip").val();
  if (inputZip == "") {
    $(".help-block").css("border-color", "red");
    $(".help-block").show();
    if(getPhoneCode == '+44'){
      $(".help-block").text("* Enter the Post Code");
    } else {
      $(".help-block").text("* Enter the Zip Code");
    }
    // $(".help-block").text("* Enter the Zip");
    $(".btnSubmitContractor").attr("disabled", true);
    return false;
  } else {
    $(".help-block").hide();
    $(".help-block").text("");
    $("#inputZip").css("border-color", "rgba(0,0,0,.12)");
    $(".btnSubmitContractor").attr("disabled", false);
    return false;
  }
});




 $("#inputPhoneNo1").keyup(function() {
  var inputPhoneNo1 = $("#inputPhoneNo1").val();
  if (inputPhoneNo1 == "") {
    $(".mno-prefix").hide();
    $("#inputPhoneNo1").removeAttr('style');
    $("#inputPhoneNo1").css("border-color", "red");
    $(".help-block").show();
    $(".help-block").text("* Enter the Mobile Number");
    $(".btnSubmitContractor").attr("disabled", true);
    return false;
  } else {
    $(".mno-prefix").show();
    $("#inputPhoneNo1").css("padding", "10px 25px 12px 32px");
    $(".help-block").hide();
    $(".help-block").text("");
    $("#inputPhoneNo1").css("border-color", "rgba(0,0,0,.12)");
    $(".btnSubmitContractor").attr("disabled", false);
    return false;
  }
});


 $("#inputAlternateNo").keyup(function() {
  var inputAlternateNo = $("#inputAlternateNo").val();
  if (inputAlternateNo == "") {
    $(".ano-prefix").hide();
    $("#inputAlternateNo").removeAttr('style');
    $("#inputAlternateNo").css("border-color", "red");
    $(".help-block").show();
    $(".help-block").text("* Enter the Alternate Number");
    $(".btnSubmitContractor").attr("disabled", true);
    return false;
  } else {
    $(".ano-prefix").show();
    $("#inputAlternateNo").css("padding", "10px 25px 12px 32px");
    $(".help-block").hide();
    $(".help-block").text("");
    $("#inputAlternateNo").css("border-color", "rgba(0,0,0,.12)");
    $(".btnSubmitContractor").attr("disabled", false);
    return false;
  }
});




 $("#inputTiming").keyup(function() {
  var inputTiming = $("#inputTiming").val();
  if (inputTiming == "") {
    $("#inputTiming").css("border-color", "red");
    $(".help-block").show();
    $(".help-block").text("* Enter the Timing");
    $(".btnSubmitContractor").attr("disabled", true);
    return false;
  } else {
    $(".help-block").hide();
    $(".help-block").text("");
    $("#inputTiming").css("border-color", "rgba(0,0,0,.12)");
    $(".btnSubmitContractor").attr("disabled", false);
    return false;
  }
});


 $("#inputAverageCharges").keyup(function() {
  var inputAverageCharges = $("#inputAverageCharges").val();
  if (inputAverageCharges == "") {
    $("#inputAverageCharges").css("border-color", "red");
    $(".help-block").show();
    $(".help-block").text("* Enter the Average Charges");
    $(".btnSubmitContractor").attr("disabled", true);
    return false;
  } else {
    $(".help-block").hide();
    $(".help-block").text("");
    $("#inputAverageCharges").css("border-color", "rgba(0,0,0,.12)");
    $(".btnSubmitContractor").attr("disabled", false);
    return false;
  }
});


 $("#inputVisitCharges").keyup(function() {
  var inputVisitCharges = $("#inputVisitCharges").val();
  if (inputVisitCharges == "") {
    $("#inputVisitCharges").css("border-color", "red");
    $(".help-block").show();
    $(".help-block").text("* Enter the Visit Charges");
    $(".btnSubmitContractor").attr("disabled", true);
    return false;
  } else {
    $(".help-block").hide();
    $(".help-block").text("");
    $("#inputVisitCharges").css("border-color", "rgba(0,0,0,.12)");
    $(".btnSubmitContractor").attr("disabled", false);
    return false;
  }
});


 $("#inputHourlyRate").keyup(function() {
  var inputHourlyRate = $("#inputHourlyRate").val();
  if (inputHourlyRate == "") {
    $("#inputHourlyRate").css("border-color", "red");
    $(".help-block").show();
    $(".help-block").text("* Enter the Hourly Rate");
    $(".btnSubmitContractor").attr("disabled", true);
    return false;
  } else {
    $(".help-block").hide();
    $(".help-block").text("");
    $("#inputHourlyRate").css("border-color", "rgba(0,0,0,.12)");
    $(".btnSubmitContractor").attr("disabled", false);
    return false;
  }
});


//  $("#inputContractValidTill").keyup(function() {
//   var inputContractValidTill = $("#inputContractValidTill").val();
//   if (inputContractValidTill == "") {
//     $("#inputContractValidTill").css("border-color", "red");
//     $(".help-block").show();
//     $(".help-block").text("* Enter the Contract Valid Till");
//     $(".btnSubmitContractor").attr("disabled", true);
//     return false;
//   } else {
//     $(".help-block").hide();
//     $(".help-block").text("");
//     $("#inputContractValidTill").css("border-color", "rgba(0,0,0,.12)");
//     $(".btnSubmitContractor").attr("disabled", false);
//     return false;
//   }
// });

//  $("#inputTradeCertificateNo").keyup(function() {
//   var inputTradeCertificateNo = $("#inputTradeCertificateNo").val();
//   if (inputTradeCertificateNo == "") {
//     $("#inputTradeCertificateNo").css("border-color", "red");
//     $(".help-block").show();
//     $(".help-block").text("* Enter the Trade Certificate Number");
//     $(".btnSubmitContractor").attr("disabled", true);
//     return false;
//   } else {
//     $(".help-block").hide();
//     $(".help-block").text("");
//     $("#inputTradeCertificateNo").css("border-color", "rgba(0,0,0,.12)");
//     $(".btnSubmitContractor").attr("disabled", false);
//     return false;
//   }
// });


 $("#inputTitle").on('change', function() {
  var inputTitle = $("#inputTitle").val();
  if (inputTitle == "") {
    $(".help-block").css("border-color", "red");
    $(".help-block").show();
    $(".help-block").text("* Select the Title");
    $("#select2-inputTitle-container").css("border", "1px solid red");
    $(".btnSubmitContractor").attr("disabled", true);
    return false;
  } else {
    $(".help-block").hide();
    $(".help-block").text("");
    $("#select2-inputTitle-container").css("border", "1px solid transparent");
    $(".btnSubmitContractor").attr("disabled", false);
    return false;
  }
});

 $("#inputStartTime").on('change', function() {
  var inputStartTime = $("#inputStartTime").val();
  if (inputStartTime == "") {
    $(".help-block").css("border-color", "red");
    $(".help-block").show();
    $(".help-block").text("* Select the Start Time");
    $("#select2-inputStartTime-container").css("border", "1px solid red");
    $(".btnSubmitContractor").attr("disabled", true);
    return false;
  } else {
    $(".help-block").hide();
    $(".help-block").text("");
    $("#select2-inputStartTime-container").css("border", "");
    $(".btnSubmitContractor").attr("disabled", false);
    return false;
  }
});

 $("#inputEndTime").on('change', function() {
  var inputEndTime = $("#inputEndTime").val();
  if (inputEndTime == "") {
    $(".help-block").css("border-color", "red");
    $(".help-block").show();
    $(".help-block").text("* Select the End Time");
    $("#select2-inputEndTime-container").css("border", "1px solid red");
    $(".btnSubmitContractor").attr("disabled", true);
    return false;
  } else {
    $(".help-block").hide();
    $(".help-block").text("");
    $("#select2-inputEndTime-container").css("border", "");
    $(".btnSubmitContractor").attr("disabled", false);
    return false;
  }
});


 $(".btnSubmitContractor").click(function() {

  var contractorID = $("#hiddenContractorID").val();
  var title = $("#select2-inputTitle-container").html();
  var name = $("#inputFirstName").val();
  var lastName = $("#inputLastName").val();
  var email = $("#inputContractorEmailID").val();

  var addressLine1 = $("#inputAddressLine1").val().replace(/["']/g, "`");
  var addressLin2 = $("#inputAddressLine2").val();
  var locality = $("#inputLocality").val();
  var state = $("#select2-inputState-container").html();
  var city = $("#select2-inputCity-container").html();
  var zip = $("#inputZip").val();var country = $("#inputCountry").val();
  var phoneNo1 = getPhoneCode+$("#inputPhoneNo1").val();
  var alternateNo = getPhoneCode+$("#inputAlternateNo").val();
  var startTime = $("#inputStartTime").val();
  var endTime = $("#inputEndTime").val();
  var averageCharge = $("#inputAverageCharges").val();
  var visitCharge = $("#inputVisitCharges").val();
  var hourlyRate = $("#inputHourlyRate").val();
  var specialityID = $("#inputSpeciality").val();
  var getSmartYes = $('.smartYes > div').hasClass('checked');
  var getSmartNo = $('.smartNo > div').hasClass('checked');
  if (getSmartYes == true) {
    isSmartPhone = 1;
  }
  if (getSmartNo == true) {
    isSmartPhone = 0;
  }
  var getAgency = $('.agency > div').hasClass('checked');
  var getIndependant = $('.independent > div').hasClass('checked');
  if (getAgency == true) {
    isAgency = 1;
  }
  if (getIndependant == true) {
    isAgency = 0;
  }  
  
  var emergencyAvailable = $('.emergencyAvailable > div').hasClass('checked');
  var emergencyNotAvailable = $('.emergencyNotAvailable > div').hasClass('checked');
  if (emergencyAvailable == true) {
    isEmergencyAvailable = 1;
  }
  if (emergencyNotAvailable == true) {
    isEmergencyAvailable = 0;
  }
  
  var liabilityInsurance = $('.liabilityInsurance > div').hasClass('checked');
  var liabilityNotInsurance = $('.liabilityNotInsurance > div').hasClass('checked');
  if (liabilityInsurance == true) {
    isLiabilityInsurance = 1;
  }
  if (liabilityNotInsurance == true) {
    isLiabilityInsurance = 0;
  }

  var inputTradeCertificateNo = $("#inputTradeCertificateNo").val();
      // var inputValidTill = $("#inputValidTill").val();
      var contractValidTill = $("#inputContractValidTill").val();
      adminUserID = localStorage.getItem("MyRequest_AdminID");
      var finalContractValidDate = '';
      if(contractValidTill==''){
        finalContractValidDate = '';
      } else {
        var selectDate = contractValidTill.split(".");
        finalContractValidDate = selectDate[2] + "-" + selectDate[1] + "-" + selectDate[0];
      }
      


      if (title == "Select Title") {
        $(".help-block").css("border-color", "red");
        $(".help-block").show();
        $(".help-block").text("* Select the Title");
        $("#select2-inputTitle-container").css("border", "1px solid red");
        $(".btnSubmitContractor").attr("disabled", true);
        return false;
      }

      if (name == "") {
        $(".help-block").css("border-color", "red");
        $(".help-block").show();
        $(".help-block").text("* Enter the Name");
        $("#inputFirstName").css("border-color", "red");
        $(".btnSubmitContractor").attr("disabled", true);
        return false;
      }

      if (lastName == "") {
        $(".help-block").css("border-color", "red");
        $(".help-block").show();
        $(".help-block").text("* Enter the Last Name");
        $("#inputLastName").css("border-color", "red");
        $(".btnSubmitContractor").attr("disabled", true);
        return false;
      }

      if (email == "") {
        $(".help-block").css("border-color", "red");
        $(".help-block").show();
        $(".help-block").text("* Enter the Email");
        $("#inputContractorEmailID").css("border-color", "red");
        $(".btnSubmitContractor").attr("disabled", true);
        return false;
      }

      if (!isValidEmailAddress(email)) {
        $(".help-block").css("border-color", "red");
        $(".help-block").show();
        $(".help-block").text("* Please Enter the Proper Email ID.");
        $("#inputContractorEmailID").css("border-color", "red");
        $(".btnSubmitContractor").attr("disabled", true);
        return false;
      }



      if (phoneNo1 == "+44" || phoneNo1 == "+91" || phoneNo1 == "+1") {
        $(".help-block").css("border-color", "red");
        $(".help-block").show();
        $(".help-block").text("* Enter the Mobile Number");
        $("#inputPhoneNo1").css("border-color", "red");
        $(".btnSubmitContractor").attr("disabled", true);
        return false;
      }

      // if (alternateNo == "+44" || alternateNo == "+91" || alternateNo == "+1") {
      //   $(".help-block").css("border-color", "red");
      //   $(".help-block").show();
      //   $(".help-block").text("* Enter the Alternate Number");
      //   $("#inputAlternateNo").css("border-color", "red");
      //   $(".btnSubmitContractor").attr("disabled", true);
      //   return false;
      // }


      if (addressLine1 == "") {
        $(".help-block").css("border-color", "red");
        $(".help-block").show();
        $(".help-block").text("* Enter the AddressLine1");
        $("#inputAddressLine1").css("border-color", "red");
        $(".btnSubmitContractor").attr("disabled", true);
        return false;
      }



      if (state == "Select County") {
        $(".help-block").css("border-color", "red");
        $(".help-block").show();
        $(".help-block").text("* Select the County");
        $("#select2-inputState-container").css("border", "1px solid red");
        $(".btnSubmitContractor").attr("disabled", true);
        return false;
      }

      if (city == "Choose City" || city == undefined) {
        $(".help-block").css("border-color", "red");
        $(".help-block").show();
        $(".help-block").text("* Select the City");
        $("#select2-inputCity-container").css("border", "1px solid red");
        $(".btnSubmitContractor").attr("disabled", true);
        return false;
      }

      if (zip == "") {
        $(".help-block").css("border-color", "red");
        $(".help-block").show();
        if(getPhoneCode == '+44'){
          $(".help-block").text("* Enter the Post Code");
        } else {
          $(".help-block").text("* Enter the Zip Code");
        }
        $("#inputZip").css("border-color", "red");
        $(".btnSubmitContractor").attr("disabled", true);
        return false;
      }

      if (specialityID == 0) {
        $(".help-block").css("border-color", "red");
        $(".help-block").show();
        $(".help-block").text("* Select the Speciality");
        $("#select2-inputSpeciality-container").css("border", "1px solid red");
        $(".btnSubmitContractor").attr("disabled", true);
        return false;
      }

      if (startTime == "Select Start Time") {
        $(".help-block").css("border-color", "red");
        $(".help-block").show();
        $(".help-block").text("* Select the Start Time");
        $("#select2-inputStartTime-container").css("border", "1px solid red");
        $(".btnSubmitContractor").attr("disabled", true);
        return false;
      }


      if (startTime == "Select End Time") {
        $(".help-block").css("border-color", "red");
        $(".help-block").show();
        $(".help-block").text("* Select the End Time");
        $("#select2-inputEndTime-container").css("border", "1px solid red");
        $(".btnSubmitContractor").attr("disabled", true);
        return false;
      }

      if (averageCharge == "") {
        $(".help-block").css("border-color", "red");
        $(".help-block").show();
        $(".help-block").text("* Enter the Average Charge");
        $("#inputAverageCharges").css("border-color", "red");
        $(".btnSubmitContractor").attr("disabled", true);
        return false;
      }



      if (visitCharge == "") {
        $(".help-block").css("border-color", "red");
        $(".help-block").show();
        $(".help-block").text("* Enter the Visit Charge");
        $("#inputVisitCharges").css("border-color", "red");
        $(".btnSubmitContractor").attr("disabled", true);
        return false;
      }


      if (hourlyRate == "") {
        $(".help-block").css("border-color", "red");
        $(".help-block").show();
        $(".help-block").text("* Enter the Houry Rate");
        $("#inputHourlyRate").css("border-color", "red");
        $(".btnSubmitContractor").attr("disabled", true);
        return false;
      }



      if (getSmartYes == "" && getSmartNo == "") {
        $(".help-block").show();
        $(".help-block").text("* Owns Smart Phone ?");
        $(".ownsSmartPhone").css("color", "red");
        $(".btnSubmitContractor").attr("disabled", true);
        return false;
      }



      if (emergencyAvailable == "" && emergencyNotAvailable == "") {
        $(".help-block").show();
        $(".help-block").text("* Emergency Available ?");
        $(".emergencyLabel").css("color", "red");
        $(".btnSubmitContractor").attr("disabled", true);
        return false;
      }


      if (getAgency == "" && getIndependant == "") {
        $(".help-block").show();
        $(".help-block").text("* Agency / Independent ?");
        $(".agencyLabel").css("color", "red");
        $(".btnSubmitContractor").attr("disabled", true);
        return false;
      }


      if (liabilityInsurance == "" && liabilityNotInsurance == "") {
        $(".help-block").show();
        $(".help-block").text("* Liability Insurance ?");
        $(".liabilityInsuranceLabel").css("color", "red");
        $(".btnSubmitContractor").attr("disabled", true);
        return false;
      }

      // if (contractValidTill == "") {
      //   $(".help-block").css("border-color", "red");
      //   $(".help-block").show();
      //   $(".help-block").text("* Enter the Contract Valid Till");
      //   $("#inputContractValidTill").css("border-color", "red");
      //   $(".btnSubmitContractor").attr("disabled", true);
      //   return false;
      // }


      // if (imageUrl2 == "") {
      //   $(".help-block").css("border-color", "red");
      //   $(".help-block").show();
      //   $(".help-block").text("* Upload the Contract Image");
      //   $("#imgContract").css("border", "1px solid red");
      //   $(".btnSubmitContractor").attr("disabled", true);
      //   return false;
      // }

      // if (inputTradeCertificateNo == "") {
      //   $(".help-block").css("border-color", "red");
      //   $(".help-block").show();
      //   $(".help-block").text("* Enter the Trade Certificate No");
      //   $("#inputTradeCertificateNo").css("border-color", "red");
      //   $(".btnSubmitContractor").attr("disabled", true);
      //   return false;
      // }

      // if (imageUrl3 == "") {
      //   $(".help-block").css("border-color", "red");
      //   $(".help-block").show();
      //   $(".help-block").text("* Upload Trade Certificate");
      //   $("#imgTradeCertificate").css("border", "1px solid red");
      //   $(".btnSubmitContractor").attr("disabled", true);
      //   return false;
      // } 
      
      else {
        $("#getLoadingModalContent").addClass('md-show');
        var dataForm = '{"Title":"' + title + '","Name":"' + name + '","LastName":"' + lastName + '","EmailID":"' + email + '","AddressLine1":"' + addressLine1 + '","AddressLine2":"' + addressLin2 + '","Locality":"' + locality + '","State":"' + state + '","City":"' + city + '","Zip":"' + zip + '","Country":"' + country + '","PhoneNo1":"' + phoneNo1 + '","AlternateNo":"' + alternateNo + '","StartTime":"' + startTime + '","EndTime":"' + endTime + '","AverageCharge":"' + averageCharge + '","VisitCharge":"' + visitCharge + '","HourlyRate":"' + hourlyRate + '","SpecialityID":"' + specialityID + '", "IsSmartPhone":"' + isSmartPhone + '","IsAgency":"' + isAgency + '","IsAppInstalled":"' + isAppInstalled + '","IsEmergencyAvailable":"' + isEmergencyAvailable + '","TradeCertificateNo":"' + inputTradeCertificateNo + '","ContractValidTill":"' + finalContractValidDate + '","IsLiabilityInsurance":"' + isLiabilityInsurance + '","Image1":"' + imageUrl1 + '","Image2":"' + imageUrl2 + '","TradeCertificateImage":"' + imageUrl3 + '","AdminID":"' + adminUserID + '","Os":"IOS","LettingAgencyCode":"0"}';
        console.log(dataForm);

        if (contractorID == 0) {
          var sendURL = domainAddress + 'CreateContractor';
          console.log(sendURL);
          $.ajax({
            type: "POST",
            url: sendURL,
            data: dataForm,
            success: function(dataCheck) {

              console.log(dataCheck);
              UIkit.modal.alert('Contractor Added Successfully');
              $("#getLoadingModalContent").removeClass('md-show');
              getContractorsList(getValue);
              $("#select2-inputTitle-container").html("Select Title");
              $("#inputFirstName").val('');
              $("#inputLastName").val('');
              $("#inputContractorEmailID").val('');
              $("#inputAddressLine1").val('');
              $("#inputAddressLine2").val('');
              $("#inputLocality").val('');
              $("#inputState").val(0);
              $("#inputCity").val(0);
              $("#select2-inputCity-container").html("Select City");
              $("#select2-inputState-container").html("Select County");
              $("#inputZip").val('');
              $("#inputCountry").val('UK');
              $("#inputPhoneNo1").val('');
              $("#inputAlternateNo").val('');
              $("#inputStartTime").val('');
              $("#inputEndTime").val('');
              $("#inputAverageCharges").val('');
              $("#inputVisitCharges").val('');
              $("#inputHourlyRate").val('');
              $("#inputSpeciality").val(0);
              $("#select2-inputSpeciality-container").html("Select Speciality");
              $('#ownSmartPhoneYes').iCheck('uncheck');
              $('#ownSmartPhoneNo').iCheck('uncheck');
              $('#emergencyYes').iCheck('uncheck');
              $('#emergencyNo').iCheck('uncheck');
              $('#agencyCheck').iCheck('uncheck');
              $('#independentCheck').iCheck('uncheck');
              $('#liabilityYes').iCheck('uncheck');
              $('#liabilityNo').iCheck('uncheck');
              $("#inputTradeCertificateNo").val('');
              $("#inputValidTill").val('');
              $("#inputContractValidTill").val('');
              $("#imgTradeCertificate").attr("src", "assets/img/noImage.gif");
              $("#imgContractor").attr("src", "assets/img/sign-in.jpg");
              $("#imgContract").attr("src", "assets/img/noImage.gif");
              $("#progressbox1").hide();
              $("#progressbox2").hide();
              $("#progressbox3").hide();
              $(".contractorContent").hide();
              $("#user_edit_form").css("border", "");
              isSmartPhone = "";
              isAgency = "";
              isAppInstalled = 0;
              isEmergencyAvailable = "";
              isLiabilityInsurance = "";
              imageUrl1 = "";
              imageUrl2 = "";
              imageUrl3 = "";
              $(".md-input-wrapper").removeClass("md-input-filled");
              $("#getBorderColor").css("border", "");
              $(".editContractorStatus").hide();
            }
          });
        } else {
          var sendURL = domainAddress + 'updateContractor/' + contractorID;
          console.log(sendURL);
          $.ajax({
            type: "POST",
            url: sendURL,
            data: dataForm,
            success: function(dataCheck) {
              console.log(dataCheck);
              UIkit.modal.alert('Contractor Updated Successfully');
              $("#getLoadingModalContent").removeClass('md-show');
              getContractorsList(getValue);
              $("#select2-inputTitle-container").html("Select Title");
              $("#inputFirstName").val('');
              $("#inputLastName").val('');
              $("#inputContractorEmailID").val('');
              $("#inputAddressLine1").val('');
              $("#inputAddressLine2").val('');
              $("#inputLocality").val('');
              $("#inputState").val(0);
              $("#inputCity").val(0);
              $("#select2-inputCity-container").html("Select City");
              $("#select2-inputState-container").html("Select County");
              $("#inputZip").val('');
              $("#inputCountry").val('UK');
              $("#inputPhoneNo1").val('');
              $("#inputAlternateNo").val('');
              $("#inputStartTime").val('');
              $("#inputEndTime").val('');
              $("#inputAverageCharges").val('');
              $("#inputVisitCharges").val('');
              $("#inputHourlyRate").val('');
              $("#inputSpeciality").val(0);
              $("#select2-inputSpeciality-container").html("Select Speciality");
              $('#ownSmartPhoneYes').iCheck('uncheck');
              $('#ownSmartPhoneNo').iCheck('uncheck');
              $('#emergencyYes').iCheck('uncheck');
              $('#emergencyNo').iCheck('uncheck');
              $('#agencyCheck').iCheck('uncheck');
              $('#independentCheck').iCheck('uncheck');
              $('#liabilityYes').iCheck('uncheck');
              $('#liabilityNo').iCheck('uncheck');
              $("#inputTradeCertificateNo").val('');
              $("#inputValidTill").val('');
              $("#inputContractValidTill").val('');
              $("#imgTradeCertificate").attr("src", "assets/img/noImage.gif");
              $("#imgContractor").attr("src", "assets/img/sign-in.jpg");
              $("#imgContract").attr("src", "assets/img/noImage.gif");
              $("#progressbox1").hide();
              $("#progressbox2").hide();
              $("#progressbox3").hide();
              $("#hiddenContractorID").val(0);
              $(".contractorContent").hide();
              $("#user_edit_form").css("border", "");
              isSmartPhone = "";
              isAgency = "";
              isAppInstalled = 0;
              isEmergencyAvailable = "";
              isLiabilityInsurance = "";
              imageUrl1 = "";
              imageUrl2 = "";
              imageUrl3 = "";
              $(".md-input-wrapper").removeClass("md-input-filled");
              $("#getBorderColor").css("border", "");
              $(".editContractorStatus").hide();
            }
          });
          } // sec if contractorID
        }
  }); // #createContractor


 $("#leftArrow").click(function() {
  $("#previousPage").removeAttr("disabled");
  contractorsCountLimit = 0;
  maxProp = 1;
  $("#enterPageNO").val(1);
  getContractorsList(getValue);
});

 $("#rightArrow").click(function() {
  $("#previousPage").removeAttr("disabled");
  contractorsCountLimit = (9 * lastPage) - 9;
  maxProp = lastPage;
  $("#enterPageNO").val(lastPage);
  getContractorsList(getValue);
});

 $("#previousPage").click(function() {
      //console.log("inital count : "+contractorsCountLimit);
      if (contractorsCountLimit == 0) {
        contractorsCountLimit = 0;
        $("#previousPage").attr("disabled", "disabled");
      } else {
        contractorsCountLimit -= 9;
        $("#previousPage").removeAttr("disabled");
      }
      //console.log("prev count : "+contractorsCountLimit);
      if (contractorsCountLimit == 0) {
        $("#previousPage").attr("disabled", "disabled");
      }
      maxProp--;
      if (maxProp == 0) {
        $("#enterPageNO").val('');
      } else {
        $("#enterPageNO").val(maxProp);
      }

      getContractorsList(getValue);
    });


 $("#nextPage").click(function() {
      //console.log("next inital count : "+contractorsCountLimit);
      $("#previousPage").removeAttr("disabled");
      contractorsCountLimit += 9;
      //console.log("next count : "+contractorsCountLimit);
      maxProp++;
      $("#enterPageNO").val(maxProp);
      getContractorsList(getValue);
    });



 $("#enterPageNO").on("change", function(e) {
  if ($("#enterPageNO").val() > maxProp) {
    maxProp++;
    $("#enterPageNO").val(maxProp);
  }

      //console.log("next inital count : " + contractorsCountLimit + " page # : " + maxProp);
      contractorsCountLimit = 9 * $("#enterPageNO").val();
      //console.log("next count : " + contractorsCountLimit);
      if (contractorsCountLimit == 0) {
        $("#previousPage").attr("disabled", "disabled");
      } else {
        $("#previousPage").removeAttr("disabled");
      }
      getContractorsList(getValue);
    });

 $("#enterPageNO").keyup(function() {
      //console.log("THis is called" + $("#enterPageNO").val());
      if ($("#enterPageNO").val() > maxProp) {
        maxProp++;
        $("#enterPageNO").val(maxProp);
      }

      //console.log("next inital count : " + contractorsCountLimit + " page # : " + maxProp);
      contractorsCountLimit = 9 * $("#enterPageNO").val();
      //console.log("next count : " + contractorsCountLimit);
      if (contractorsCountLimit == 0) {
        $("#previousPage").attr("disabled", "disabled");
      } else {
        $("#previousPage").removeAttr("disabled");
      }
      getContractorsList(getValue);
    });


 $("#inputContractValidTill").click(function() {
  $("#inputContractValidTill").css("border-color", "rgba(0,0,0,.12)");
  $(".help-block").hide();
  $(".help-block").text("");
  $(".btnSubmitContractor").attr("disabled", false);
});


 $("#imgContract").click(function() {
  $("#imgContract").css("border-color", "rgba(0,0,0,.12)");
  $(".help-block").hide();
  $(".help-block").text("");
  $("#imgContract").css("border-color", "red");
  $(".btnSubmitContractor").attr("disabled", false);
});

 $(".btnSearch").click(function() {
  getValue = $("#inputSearch").val();
  getContractorsList(getValue);


  }); // SearchContractor

 function getContractorsList(getValue) {
  var dataForm = "";
  var sendURL = "";
  if (getValue == "" || getValue == undefined) {
    dataForm = '{"Limit":"' + parseInt(contractorsCountLimit) + '","AdminID":"' + adminUserID + '"}';
    sendURL = domainAddress + "ContractorsListByCount";
  } else {
    dataForm = '{"Limit":"' + parseInt(contractorsCountLimit) + '","SearchValue":"' + getValue + '","AdminID":"' + adminUserID + '"}';
    sendURL = domainAddress + "SearchContractorList";
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
        $(".allContractorList").html('');
        $(".allContractorList").append('<div class="md-card md-card-hover"><div class="md-card-head"> <div class="uk-text-center"><img class="md-card-head-avatar" src="assets/img/no_image_found.png" alt="" class="contractorImage"/></div><h3 class="md-card-head-text uk-text-center"><span class="uk-text-truncate"></span></h3></div><div class="md-card-content"><ul class="md-list"><li><div class="md-list-content"><span class="md-list-heading">Speciality</span><span class="uk-text-small uk-text-muted">No Speciality Found</span></div></li><li><div class="md-list-content"><span class="md-list-heading">Validity</span><span class="uk-text-small uk-text-muted uk-text-truncate">No Validity Found</span></div></li><li><div class="md-list-content"><span class="md-list-heading">Phone</span><span class="uk-text-small uk-text-muted">No Phone Number Found</span></div></li></ul></div></div>');
        $("#getLoadingModalContent").removeClass('md-show');
        $(".getPagination").hide();
      } else {
        loadContractorsList(result);
        $(".getPagination").show();
      }


              } // ajax success
      }); // ajax POSTS
}


function loadContractorsList(resultAllContractor) {
  var contractorValidity = "";
  if (resultAllContractor.record_count == 0) {
    $("#nextPage").attr("disabled", true);
    $(".allContractorList").append('<div class="md-card md-card-hover"><div class="md-card-head"><div class="md-card-head-menu" data-uk-dropdown="{pos:bottom-right}"><i class="md-icon material-icons">&#xE5D4;</i></div><div class="uk-text-center"><img class="md-card-head-avatar" src="assets/img/noImage.gif" alt="" class="contractorImage"/></div><h3 class="md-card-head-text uk-text-center"><span class="uk-text-truncate"></span></h3></div><div class="md-card-content"><ul class="md-list"><li><div class="md-list-content"><span class="md-list-heading">Speciality</span><span class="uk-text-small uk-text-muted">No Speciality Found</span></div></li><li><div class="md-list-content"><span class="md-list-heading">Validity</span><span class="uk-text-small uk-text-muted uk-text-truncate">No Validity Found</span></div></li><li><div class="md-list-content"><span class="md-list-heading">Phone</span><span class="uk-text-small uk-text-muted">No Phone Number Found</span></div></li></ul></div></div>');

  } else {
    $(".allContractorList").html('');
    if (resultAllContractor.record_count == resultAllContractor.All_Records_Count) {
      console.log("equal to 9");
      $("#nextPage").attr("disabled", "disabled");
    } else if (resultAllContractor.record_count < 9 && resultAllContractor.record_count != 0) {
      console.log("less than 9");
      $("#nextPage").attr("disabled", "disabled");
    } else if (resultAllContractor.record_count >= 9) {
      console.log("great than 9");
      $("#nextPage").removeAttr("disabled");
              //$("#nextLastPage").show();
            }
            var contractorUserImage = "";
            lastPage = parseInt(resultAllContractor.All_Records_Count / 9) + 1;
            for (Contractor in resultAllContractor.records) {
              if (resultAllContractor.records[Contractor].ContractValidTill == null) {
                contractorValidity = "No Validity Found";
              } else {
                contractorValidity = resultAllContractor.records[Contractor].ContractValidTill;
                var selectDate = resultAllContractor.records[Contractor].ContractValidTill.split("-");
                $("#hiddenContractorValidTill").val(selectDate[0] + "-" + selectDate[1] + "-" + selectDate[2]);
                contractorValidity = selectDate[2] + "." + selectDate[1] + "." + selectDate[0];
              }

              var contractorCount = 0;
              for (contractorCount in resultAllContractor.records[Contractor].Count) {
                contractorCount = resultAllContractor.records[Contractor].Count[contractorCount].CountContractor;
              }


              if (resultAllContractor.records[Contractor].Image1 == "" || resultAllContractor.records[Contractor].Image1 == null) {
                contractorUserImage = "assets/img/sign-in.jpg";
              } else {
                contractorUserImage = domainAddress + resultAllContractor.records[Contractor].Image1;
              }

              $(".allContractorList").append('<div class="getAllContractor" id="getAllContractor-' + resultAllContractor.records[Contractor].ContractorID + '"><div class="md-card md-card-hover"><div class="md-card-head"><div class="md-card-head-menu" data-uk-dropdown="{pos:bottom-right}"><i class="md-icon material-icons">&#xE5D4;</i><div class="uk-dropdown uk-dropdown-small"><ul class="uk-nav"><li class="editContractor" id="editContractorID-' + resultAllContractor.records[Contractor].ContractorID + '"><a href="#"><i class="material-icons uk-margin-small-right">&#xE150;</i> Edit</a></li><li class="deleteContractor" id="deleteContractorID-' + resultAllContractor.records[Contractor].ContractorID + '"> <a href="#"><i class="material-icons uk-margin-small-right">&#xE872;</i> Remove</a></li><li class="approve" id="approve-' + resultAllContractor.records[Contractor].ContractorID + '"> <a href="#"><i class="fa fa-archive approve" style="color:grey;"></i> Approve / Reject</a></li>   </ul></div></div><div class="uk-text-center"><img class="md-card-head-avatar" style="width: 93px;height: 89px;" src="' + contractorUserImage + '" alt="" class="contractorImage"/></div><h3 class="md-card-head-text uk-text-center"><span class="uk-text-truncate" style="font-weight: bold;font-size: 15px;">' + resultAllContractor.records[Contractor].ContractorName + '</span></h3></div><div class="md-card-content"><ul class="md-list"><li><div class="md-list-content"><span class="md-list-heading">Speciality</span><span class="uk-text-small uk-text-muted">' + resultAllContractor.records[Contractor].SpecialityName + '</span></div></li><li><div class="md-list-content"><span class="md-list-heading">Validity</span><span class="uk-text-small uk-text-muted uk-text-truncate">' + contractorValidity + '</span></div></li><li><div class="md-list-content"><span class="md-list-heading">Phone</span><span class="uk-text-small uk-text-muted">' + resultAllContractor.records[Contractor].phoneNo1 + '</span></div></li></ul></div></div> </div>');

              if (resultAllContractor.records[Contractor].IsApprove == 1) {
                $("#approve-" + resultAllContractor.records[Contractor].ContractorID).css('color', 'green');
                $("#reject-" + resultAllContractor.records[Contractor].ContractorID).css('color', '');
              } else {
                $("#approve-" + resultAllContractor.records[Contractor].ContractorID).css('color', '');
                $("#reject-" + resultAllContractor.records[Contractor].ContractorID).css('color', 'red');
              }
          } // main for loop
          
          $("#getLoadingModalContent").removeClass('md-show');
          
          // $('#contractorList').DataTable({
          //     createdRow: function(row) {
          //         $('td', row).attr('tabindex', 0);
          //     }
          // });
          // $(".dataTables_paginate").hide();
          // $(".dataTables_length").hide();
          // $(".dataTables_info").hide();
          // $("#contractorList_filter").hide();




          $(".approve").on('click', function() {
            var getContractID = this.id.replace('approve-', '');
            var emaiID = $("#hiddenEmailID-" + getContractID).val();
            var password = $("#hiddenPassword-" + getContractID).val();
            var phoneNumber = $("#PhoneNo-" + getContractID).text();

            UIkit.modal.confirm('Are you sure want to Approve?', function(e) {
              $("#getLoadingModalContent").addClass('md-show');
              var isApproveStatus = 1;
              var dataForm = '{"IsApprove":"' + isApproveStatus + '","Password":"' + password + '","EmailID":"' + emaiID + '","PhoneNumber":"' + phoneNumber + '"}';
              var sendURL = domainAddress + 'UpdateContractIsApprove/' + getContractID;
              console.log(sendURL);
              $.ajax({
                type: "POST",
                url: sendURL,
                data: dataForm,
                success: function(dataCheck) {
                  console.log(dataCheck);
                  getContractorsList();
                  $("#getLoadingModalContent").removeClass('md-show');
                  UIkit.modal.alert('Contractor Approved Successfully');

                }
              });

            });

          });


          $(".reject").on('click', function() {
            var getContractID = this.id.replace('reject-', '');
            var emaiID = $("#hiddenEmailID-" + getContractID).val();
            var password = $("#hiddenPassword-" + getContractID).val();
            var phoneNumber = $("#PhoneNo-" + getContractID).text();

            UIkit.modal.confirm('Are you sure want to Reject?', function() {
              $("#getLoadingModalContent").addClass('md-show');
              var isApproveStatus = 0;
              var dataForm = '{"IsApprove":"' + isApproveStatus + '"}';
              var sendURL = domainAddress + 'UpdateContractIsApprove/' + getContractID;
              console.log(sendURL);
              $.ajax({
                type: "POST",
                url: sendURL,
                data: dataForm,
                success: function(dataCheck) {
                  console.log(dataCheck);
                  getContractorsList();
                  $("#getLoadingModalContent").removeClass('md-show');
                  UIkit.modal.alert('Contractor Rejected Successfully');

                }
              });

            });

          });



          var isFourExistNo = 0;
          var isFourExistAtNo = 0;
          var isOneExistNo = 0;
          var isOneExistAtNo = 0;
          $(".editContractor").on('click', function(e) {
            $(".md-input-wrapper").addClass("md-input-filled");
            $(".contractorContent").show();
            $(".editContractorStatus").show();
            editContractorID = this.id.replace('editContractorID-', '');
            $("#hiddenContractorID").val(editContractorID);
            $("#getLoadingModalContent").addClass('md-show');
            $.get(domainAddress + "GetContractor/" + editContractorID, {}, function(result) {
              console.log(result);
              $("#getLoadingModalContent").removeClass('md-show');
              for (var contractor in result.records) {
                if (result.records[contractor].Title == null || result.records[contractor].Title == "") {
                  $("#select2-inputTitle-container").html("Select Title");
                } else {
                  $("#select2-inputTitle-container").html(result.records[contractor].Title);
                  $("#inputTitle").val(result.records[contractor].Title);
                }

                $("#inputFirstName").val(result.records[contractor].ContractorName);
                $("#inputLastName").val(result.records[contractor].LastName);
                $("#inputContractorEmailID").val(result.records[contractor].emailID);
                $("#inputAddressLine1").val(result.records[contractor].addressLine1);
                $("#inputAddressLine2").val(result.records[contractor].addressLine2);
                $("#inputSpeciality").val(result.records[contractor].specialityID);
                $("#select2-inputSpeciality-container").html(result.records[contractor].SpecialityName);
                $("#inputLocality").val(result.records[contractor].locality);
                $("#inputState").val(result.records[contractor].State);
                $("#select2-inputState-container").html(result.records[contractor].State);
                $("#inputCity").html('');
                $("#inputCity").select2();
                $("#inputCity").append("<option value='0'>Select City</option><option value='" + result.records[contractor].City + "'>" + result.records[contractor].City + "</option>");
                $("#inputCity").val(result.records[contractor].City);

                $("#select2-inputCity-container").html(result.records[contractor].City);


                $("#inputZip").val(result.records[contractor].Zip);

                isFourExistNo = result.records[contractor].phoneNo1.slice(0, 3);
                isOneExistNo = result.records[contractor].phoneNo1.slice(0, 2);
                if (isFourExistNo == "+44" || isFourExistNo == "+91") {
                  $("#inputPhoneNo1").val(result.records[contractor].phoneNo1.slice(3));
                } else {
                  $("#inputPhoneNo1").val(result.records[contractor].phoneNo1);
                }

                if (isOneExistNo == "+1") {
                  $("#inputPhoneNo1").val(result.records[contractor].phoneNo1.slice(2));
                }

                if (result.records[contractor].alternateNo != null) {

                  isFourExistAtNo = result.records[contractor].alternateNo.slice(0, 3);
                  isOneExistAtNo = result.records[contractor].alternateNo.slice(0, 2);
                  if (isFourExistAtNo == "+44" || isFourExistAtNo == "+91") {
                    $("#inputAlternateNo").val(result.records[contractor].alternateNo.slice(3));
                  } else {
                    $("#inputAlternateNo").val(result.records[contractor].alternateNo);
                  }
                  if (isOneExistAtNo == "+1") {
                    $("#inputAlternateNo").val(result.records[contractor].alternateNo.slice(2));
                  }
                }


                $("#inputHasSmartPhone").val(result.records[contractor].isSmartPhone);
                $("#inputVisitCharges").val(result.records[contractor].visitCharges);
                $("#inputAverageCharges").val(result.records[contractor].averageCharges);
                $("#inputHourlyRate").val(result.records[contractor].hourlyRate);
                $("#inputStartTime").val(result.records[contractor].StartTime);
                $("#inputEndTime").val(result.records[contractor].EndTime);
                $("#inputTradeCertificateNo").val(result.records[contractor].tradeCertificateNo);
                $("#imgContractor").val(result.records[contractor].imageurl1);
                $("#imgContract").val(result.records[contractor].imageurl2);
                $("#imgTradeCertificate").val(result.records[contractor].imageUrl3);

                $(".mno-prefix").show();
                $("#inputPhoneNo1").css("padding", "10px 25px 12px 32px");

                $(".ano-prefix").show();
                $("#inputAlternateNo").css("padding", "10px 25px 12px 32px");

                isSmartPhone = result.records[contractor].isSmartPhone;

                if (result.records[contractor].specialityID == null) {
                  $("#inputSpeciality").val(0);
                }
                if (result.records[contractor].State == null) {
                  $("#inputState").val(0);

                }
                if (result.records[contractor].City == null) {
                  $("#inputCity").val(0);
                }


                if (isSmartPhone == 1) {
                  $('#ownSmartPhoneYes').iCheck('check');
                } else {
                  $('#ownSmartPhoneNo').iCheck('check');
                }

                isAgency = result.records[contractor].isAgency;
                if (isAgency == 1) {
                  $('#agencyCheck').iCheck('check');
                } else {
                  $('#independentCheck').iCheck('check');
                }

                isEmergencyAvailable = result.records[contractor].isEmergencyAvailability;
                if (isEmergencyAvailable == 1) {
                  $('#emergencyYes').iCheck('check');
                } else {
                  $('#emergencyNo').iCheck('check');
                }
                isLiabilityInsurance = result.records[contractor].isLiabilityInsurance;
                if (isLiabilityInsurance == 1) {
                  $('#liabilityYes').iCheck('check');                    
                } else {
                  $('#liabilityNo').iCheck('check');
                }

                isAppInstalled = result.records[contractor].isAppInstalled;
                if (isAppInstalled == 1) {
                  $("#user_edit_form").css("border", "2px solid greenyellow");
                } else {
                  $("#user_edit_form").css("border", "2px solid red");
                }


                if (result.records[contractor].ContractValidTill != "" && result.records[contractor].ContractValidTill != null) {
                  var selectDate = result.records[contractor].ContractValidTill.split("-");
                  var contractValidTill = selectDate[2] + "." + selectDate[1] + "." + selectDate[0];
                  $("#inputContractValidTill").val(contractValidTill);


                }
                if (result.records[contractor].image1 == "" || result.records[contractor].image1 == null) {
                  $("#imgContractor").attr("src", "assets/img/sign-in.jpg");
                  imageUrl1 = "";
                } else {
                  imageUrl1 = result.records[contractor].image1;
                  $("#imgContractor").attr("src", domainAddress + imageUrl1);
                  $("#imgContractor").css("height", "80px").css("width", "100px");
                }

                if (result.records[contractor].image2 == "" || result.records[contractor].image2 == null) {
                  $("#imgContract").attr("src", "assets/img/noImage.gif");
                  imageUrl2 = "";
                } else {
                  var getContractImagePath = result.records[contractor].image2.slice(0,4);
                  if(getContractImagePath=="api/"){
                    getContractImagePath = result.records[contractor].image2.slice(4);
                    imageUrl2 = getContractImagePath;
                    $("#imgContract").attr('src', domainAddress + imageUrl2);

                  }
                  else{
                    imageUrl2 = result.records[contractor].image2;
                    $("#imgContract").attr('src', domainAddress + imageUrl2);
                  }

                  $("#imgContract").css("height", "80px").css("width", "100px").css("border", "");
                }

                if (result.records[contractor].tradeCertificateImage == "" || result.records[contractor].tradeCertificateImage == null) {
                  $("#imgTradeCertificate").attr("src", "assets/img/noImage.gif");
                  imageUrl3 = "";
                } else {
                  var getTradeImagePath = result.records[contractor].tradeCertificateImage.slice(0,4);
                  if(getTradeImagePath=="api/"){
                    getTradeImagePath = result.records[contractor].tradeCertificateImage.slice(4);
                    imageUrl3 = getTradeImagePath;
                    $("#imgTradeCertificate").attr('src', domainAddress + imageUrl3);
                  }
                  else{
                    imageUrl3 = result.records[contractor].tradeCertificateImage;
                    $("#imgTradeCertificate").attr('src', domainAddress + imageUrl3);
                  }

                  $("#imgTradeCertificate").css("height", "80px").css("width", "100px").css("border", "");
                }

              }
              var contractorName = result.records[contractor].ContractorName;
              var lastName = result.records[contractor].LastName;
              if (lastName == null || lastName == "") {
                lastName = "";
              }

              $(".name").text(contractorName + " " + lastName);

              var emailID = result.records[contractor].emailID;
              $(".emailID").text(emailID);

              }); //GetContractor

          }); // editContractor

 $(".deleteContractor").on('click', function(e) {
  getContractorID = this.id.replace('deleteContractorID-', '');
  UIkit.modal.confirm('Are you sure?', function() {
    $("#getLoadingModalContent").addClass('md-show');
    $.post(domainAddress + 'DeleteContractor/' + getContractorID, function(e) {
      console.log(e);
      $("#rowID-" + getContractorID).remove();
      getContractorsList(getValue);
      $("#getLoadingModalContent").removeClass('md-show');
      UIkit.modal.alert('Contractor Deleted Successfully');

    });
  });

          }); // deleteContractor

}
  } //loadContractorsList