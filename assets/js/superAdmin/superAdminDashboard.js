  $(function() {
      var setCountryCode;
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

  var filePath = "";
  var getLastAdminID = 0;
  var autoCode = "";
  var lastPage = 0;
  var adminCountLimit = 0;
  var maxProp = 0;
  var adminUserID = 0;
  var getValue = "";

  $(document).ready(function() {
      console.log("ready call");
      var adminUserID = localStorage.getItem("MyRequest_AdminID");
      var adminUserName = localStorage.getItem("MyRequest_UserName");
      var adminType = localStorage.getItem("MyRequest_AdminType");

      if (adminType == "SuperAdmin") {

          $(".myRequestLogo").addClass("requestLogo");
      } else {
          $(".myRequestLogo").removeClass("requestLogo");
      }


      if (adminUserID == "" || adminUserID == null) {
          window.location.href = "index.html";
      } else {
          $(".getUserName").text(adminUserName);
          $(".getLettingAgencyBusinessName").text("Create Admin");
      }
      $(".md-overlay").css("background", "rgba(0,0,0,0.5)");
      $("#getLoadingModalContent").addClass('md-show');
      $("#inputTitle").select2();
      $("#inputState").select2()
          .on("change", function(e) {
              console.log("change val=" + $("#inputState").val());
              var stateID = $("#inputState").val();
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

          $("#inputCountry").select2()
          .on("change", function(e) {
              //console.log("change val=" + $("#inputState").val());
              var countryID = $("#inputCountry").val();
              // console.log(countryID)
              if(countryID == "+44"){
                
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
              
          });



      
      $("#inputCountry").select2()
        .on("change", function(e){
            setCountryCode = $("#inputCountry").val();
            $(".cphno-prefix").text(setCountryCode);
            $(".emerno-prefix").text(setCountryCode);
            $(".emerElectno-prefix").text(setCountryCode);
            
      });

      getAllAdminList(getValue);
      maxProp++;
      $("#enterPageNO").val(maxProp);

      $(".forSuperAdmin").show();

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

      $("#inputPhoneNumber").keypress(function(e) {
          if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
              return false;
          }
      });
       $("#FileURLUploadImage1").attr("action",domainAddress+"ajaximage.php");

  }); // ready

  $(".btnSearch").click(function() {
      getValue = $("#inputSearch").val();
      getAllAdminList(getValue);
  });



// $("#inputCountry").change(function(){
//     country = $("#inputCountry").val();
//     alert(country);
// });

  $(".getAdmin").click(function() {
      $(".adminContent").toggle();
      $("#hiddenAdminID").val(0);
      $("#inputTitle").val('');
      $("#select2-inputTitle-container").html("Select Title");
      $("#inputFirstName").val('');
      $("#inputLastName").val('');
      $("#inputBusinessName").val('');
      $("#inputLocality").val('');
      $("#select2-inputState-container").html("Select County");
      $("#select2-inputCity-container").html("Select City");
      $("#inputCountry").val("UK");
      $("#inputEmailID").val('');
      $("#inputPhoneNumber").val('');
      $("#inputEmergencyNumber").val('');
      $("#inputUrlRent").val('');
      $("#getVoid").val('');
      $("#getAvail").val('');
      $("#inputEmergencyElectricityNumber").val('');
      $(".cphno-prefix").hide();
      $(".emerElectno-prefix").hide();
      $("#inputPhoneNumber").removeAttr("style");
      $(".emerno-prefix").hide();
      $("#inputEmergencyNumber").removeAttr("style");
      $("#inputEmergencyElectricityNumber").removeAttr("style");
      $(".md-input-wrapper").addClass("md-input-filled");
      $("#imgAdminLogo").attr("src", "assets/img/noImage.gif");
      filePath = "";
      $(".btnSubmitAdmin").text("Add Admin");
  });

 
  $("#leftArrow").click(function() {
      adminCountLimit = 0;
      maxProp = 1;
      $("#enterPageNO").val(1);
      $("#getLoadingModalContent").addClass('md-show');
      getAllAdminList(getValue);
      if (maxProp < lastPage) {
          $("#nextPage").attr("disabled", false);
      }
  });

  $("#rightArrow").click(function() {
      $("#previousPage").removeAttr("disabled");
      adminCountLimit = (9 * lastPage) - 9;
      maxProp = lastPage;
      $("#enterPageNO").val(lastPage);
      $("#getLoadingModalContent").addClass('md-show');
      getAllAdminList(getValue);
  });

  $("#previousPage").click(function() {
      //console.log("inital count : "+adminCountLimit);
      if (adminCountLimit == 0) {
          adminCountLimit = 0;
          $("#previousPage").attr("disabled", "disabled");
      } else {
          adminCountLimit -= 9;
          $("#previousPage").removeAttr("disabled");
      }
      //console.log("prev count : "+adminCountLimit);
      if (adminCountLimit == 0) {
          $("#previousPage").attr("disabled", "disabled");
      }
      maxProp--;
      if (maxProp == 0) {
          $("#enterPageNO").val('');
      } else {
          $("#enterPageNO").val(maxProp);
      }
      $("#getLoadingModalContent").addClass('md-show');
      getAllAdminList(getValue);
  });


  $("#nextPage").click(function() {
      //console.log("next inital count : "+adminCountLimit);
      $("#previousPage").removeAttr("disabled");
      adminCountLimit += 9;
      //console.log("next count : "+adminCountLimit);

      if (maxProp == lastPage) {
          $("#nextPage").attr("disabled", true);
      } else {
          $("#nextPage").attr("disabled", false);
          maxProp++;
          $("#enterPageNO").val(maxProp);
          if (maxProp <= lastPage) {
              $("#getLoadingModalContent").addClass('md-show');
              getAllAdminList(getValue);
          }
      }

  });

  $("#enterPageNO").on("change", function(e) {
      //console.log("THis is called" + $("#enterPageNO").val());
      if ($("#enterPageNO").val() < lastPage) {
          maxProp++;
          $("#enterPageNO").val(maxProp);
      }

      //console.log("next inital count : " + adminCountLimit + " page # : " + maxProp);
      adminCountLimit = 9 * ($("#enterPageNO").val() - 1);
      //console.log("change count : " + adminCountLimit);
      $("#getLoadingModalContent").addClass('md-show');
      getAllAdminList(getValue);
  });

  $("#enterPageNO").keyup(function() {
      //console.log("THis is called " + $("#enterPageNO").val());
      if ($("#enterPageNO").val() < lastPage) {
          maxProp++;
          $("#enterPageNO").val(maxProp);
      }

      //console.log("next inital count : " + adminCountLimit + " page # : " + maxProp);
      adminCountLimit = 9 * ($("#enterPageNO").val() - 1);
      //console.log("change count : " + adminCountLimit);

      getAllAdminList(getValue);
  });




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
                  console.log(filePath);

                  $("#imgAdminLogo").attr('src', domainAddress + filePath);
                  $("#imgAdminLogo").css("height", "80px").css("width", "100px");
                  $(".fileupload-preview1").text(domainAddress + filePath);
                  $(".help-block").hide();
                  $(".help-block").text("");
                  $("#btnSubmitAdmin").attr("disabled", false);
                  $('#progressbox1').hide();
                  $("#getLoadingModalContent").removeClass('md-show');
              }

          },
          error: function() {
              console.log('d');


          }
      }).submit();
  });

  $("#inputTitle").on('change', function() {
      var inputTitle = $("#inputTitle").val();
      if (inputTitle == "") {
          $(".help-block").css("border-color", "red");
          $(".help-block").show();
          $(".help-block").text("* Select the Title");
          $("#select2-inputTitle-container").css("border", "1px solid red");
          $(".btnSubmitAdmin").attr("disabled", true);
          return false;
      } else {
          $(".help-block").hide();
          $(".help-block").text("");
          $("#select2-inputTitle-container").css("border", "1px solid transparent");
          $(".btnSubmitAdmin").attr("disabled", false);
          return false;
      }
  });

  $("#inputFirstName").keyup(function() {
      var inputFirstName = $("#inputFirstName").val();
      if (inputFirstName == "") {
          $(".help-block").css("border-color", "red");
          $(".help-block").show();
          $(".help-block").text("* Enter the First Name");
          $(".btnSubmitAdmin").attr("disabled", true);
          return false;
      } else {
          $(".help-block").hide();
          $(".help-block").text("");
          $("#inputFirstName").css("border-color", "rgba(0,0,0,.12)");
          $(".btnSubmitAdmin").attr("disabled", false);
          return false;
      }
  });

  $("#inputLastName").keyup(function() {
      var inputLastName = $("#inputLastName").val();
      if (inputLastName == "") {
          $(".help-block").css("border-color", "red");
          $(".help-block").show();
          $(".help-block").text("* Enter the Last Name");
          $(".btnSubmitAdmin").attr("disabled", true);
          return false;
      } else {
          $(".help-block").hide();
          $(".help-block").text("");
          $("#inputLastName").css("border-color", "rgba(0,0,0,.12)");
          $(".btnSubmitAdmin").attr("disabled", false);
          return false;
      }
  });

  $("#inputBusinessName").keyup(function() {
      var inputBusinessName = $("#inputBusinessName").val();
      if (inputBusinessName == "") {
          $(".help-block").css("border-color", "red");
          $(".help-block").show();
          $(".help-block").text("* Enter the Business Name");
          $(".btnSubmitAdmin").attr("disabled", true);
          return false;
      } else {
          $(".help-block").hide();
          $(".help-block").text("");
          $("#inputBusinessName").css("border-color", "rgba(0,0,0,.12)");
          $(".btnSubmitAdmin").attr("disabled", false);
          return false;
      }
  });


  $("#inputLocality").keyup(function() {
      var inputLocality = $("#inputLocality").val();
      if (inputLocality == "") {
          $(".help-block").css("border-color", "red");
          $(".help-block").show();
          $(".help-block").text("* Enter the Locality");
          $(".btnSubmitAdmin").attr("disabled", true);
          return false;
      } else {
          $(".help-block").hide();
          $(".help-block").text("");
          $("#inputLocality").css("border-color", "rgba(0,0,0,.12)");
          $(".btnSubmitAdmin").attr("disabled", false);
          return false;
      }
  });


  $("#inputState").on('change', function() {
      var inputState = $("#inputState").val();
      if (inputState == "") {
          $(".help-block").css("border-color", "red");
          $(".help-block").show();
          $(".help-block").text("* Select the County");
          $("#select2-inputState-container").css("border", "1px solid red");
          $(".btnSubmitAdmin").attr("disabled", true);
          return false;
      } else {
          $(".help-block").hide();
          $(".help-block").text("");
          $("#select2-inputState-container").css("border", "1px solid transparent");
          $(".btnSubmitAdmin").attr("disabled", false);
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
          $(".btnSubmitAdmin").attr("disabled", true);
          return false;
      } else {
          $(".help-block").hide();
          $(".help-block").text("");
          $("#select2-inputCity-container").css("border", "");
          $(".btnSubmitAdmin").attr("disabled", false);
          return false;
      }
  });


  $("#inputCountry").keyup(function() {
      var inputCountry = $("#inputCountry").val();
      if (inputCountry == "") {
          $(".help-block").css("border-color", "red");
          $(".help-block").show();
          $(".help-block").text("* Enter the Country");
          $(".btnSubmitAdmin").attr("disabled", true);
          return false;
      } else {
          $(".help-block").hide();
          $(".help-block").text("");
          $("#inputCountry").css("border-color", "rgba(0,0,0,.12)");
          $(".btnSubmitAdmin").attr("disabled", false);
          return false;
      }
  });

  $("#inputEmailID").keyup(function() {
      var inputEmailID = $("#inputEmailID").val();
      if (inputEmailID == "") {
          $(".help-block").css("border-color", "red");
          $(".help-block").show();
          $(".help-block").text("* Enter the EmailID");
          $(".btnSubmitAdmin").attr("disabled", true);
          return false;
      } else {
          $(".help-block").hide();
          $(".help-block").text("");
          $("#inputEmailID").css("border-color", "rgba(0,0,0,.12)");
          $(".btnSubmitAdmin").attr("disabled", false);
          return false;
      }
  });

  $("#inputUrlRent").keyup(function() {
      var inputUrlRent = $("#inputUrlRent").val();
      if (inputUrlRent == "") {
          $(".help-block").css("border-color", "red");
          $(".help-block").show();
          $(".help-block").text("* Enter the Url For How To Rent");
          $(".btnSubmitAdmin").attr("disabled", true);
          return false;
      } else {
          $(".help-block").hide();
          $(".help-block").text("");
          $("#inputUrlRent").css("border-color", "rgba(0,0,0,.12)");
          $(".btnSubmitAdmin").attr("disabled", false);
          return false;
      }
  });


  $("#inputPhoneNumber").keyup(function() {
      var inputPhoneNumber = $("#inputPhoneNumber").val();
      if (inputPhoneNumber == "") {
          $(".cphno-prefix").hide();
          $("#inputPhoneNumber").removeAttr('style');
          $("#inputPhoneNumber").css("border-color", "red");
          $(".help-block").show();
          $(".help-block").text("* Enter the Phone Number");
          $(".btnSubmitAdmin").attr("disabled", true);
          return false;
      } else {
          $(".cphno-prefix").show();
          $("#inputPhoneNumber").css("padding", "10px 25px 12px 32px");
          $(".help-block").hide();
          $(".help-block").text("");
          $("#inputPhoneNumber").css("border-color", "rgba(0,0,0,.12)");
          $(".btnSubmitAdmin").attr("disabled", false);
          return false;
      }
  });

  $("#inputEmergencyNumber").keyup(function() {
      var inputEmergencyNumber = $("#inputEmergencyNumber").val();
      if (inputEmergencyNumber == "") {
          $(".emerno-prefix").hide();
          $("#inputEmergencyNumber").removeAttr('style');
          $("#inputEmergencyNumber").css("border-color", "red");
          $(".help-block").show();
          $(".help-block").text("* Enter the Emergency Number");
          $(".btnSubmitAdmin").attr("disabled", true);
          return false;
      } else {
          $(".emerno-prefix").show();
          $("#inputEmergencyNumber").css("padding", "10px 25px 12px 32px");
          $(".help-block").hide();
          $(".help-block").text("");
          $("#inputEmergencyNumber").css("border-color", "rgba(0,0,0,.12)");
          $(".btnSubmitAdmin").attr("disabled", false);
          return false;
      }
  });

  $("#inputEmergencyElectricityNumber").keyup(function() {
      var inputEmergencyElectricityNumber = $("#inputEmergencyElectricityNumber").val();
      if (inputEmergencyElectricityNumber == "") {
          $(".emerElectno-prefix").hide();
          $("#inputEmergencyElectricityNumber").removeAttr('style');
          $("#inputEmergencyElectricityNumber").css("border-color", "red");
          $(".help-block").show();
          $(".help-block").text("* Enter the Emergency Number");
          $(".btnSubmitAdmin").attr("disabled", true);
          return false;
      } else {
          $(".emerElectno-prefix").show();
          $("#inputEmergencyElectricityNumber").css("padding", "10px 25px 12px 32px");
          $(".help-block").hide();
          $(".help-block").text("");
          $("#inputEmergencyElectricityNumber").css("border-color", "rgba(0,0,0,.12)");
          $(".btnSubmitAdmin").attr("disabled", false);
          return false;
      }
  });


  $(".btnSubmitAdmin").click(function() {
      var inputAvail = 0;
      var hiddenAdminID = $("#hiddenAdminID").val();
      var inputTitle = $("#select2-inputTitle-container").html();
      var adminFirstName = $("#inputFirstName").val();
      var adminLastName = $("#inputLastName").val();
      var businessName = $("#inputBusinessName").val();
      var getLocality = $("#inputLocality").val();
      var state = $("#select2-inputState-container").html();
      var city = $("#select2-inputCity-container").html();
      var getCountry = $("#select2-inputCountry-container").html();
      var getEmail = $("#inputEmailID").val();
      var getUrl = $("#inputUrlRent").val();
      var getPhoneNumber = setCountryCode + $("#inputPhoneNumber").val();
      var getEmergencyNumber = setCountryCode + $("#inputEmergencyNumber").val();
      var getEmergencyElectricityNumber = setCountryCode + $("#inputEmergencyElectricityNumber").val();
      var autoGenerate = $("#inputCountry").val();
      var getAvailIsVoid = $("#getAvail").prop("checked");
      if(getAvailIsVoid==true){
        inputAvail = 1;
      }
      else{
        inputAvail = 0;
      }
      
      var inputUtility = $("#getUtility").val();
      if(inputUtility==undefined){
        inputUtility=0;
      }
      var getPassword = "Password#1";
      $("#getLoadingModalContent").addClass('md-show');


      var getAgency = $('#getVoid > div').hasClass('checked');
      var getIndependant = $('.independent > div').hasClass('checked');
      if (getAgency == true) {
          isAgency = 1;
      }
      if (getIndependant == true) {
          isAgency = 0;
      }

      if (inputTitle == "Select Title") {
          $(".help-block").css('color', 'red');
          $(".help-block").show();
          $(".help-block").text("* Select the Title");
          $("#select2-inputTitle-container").css("border", "1px solid red");
          $(".btnSubmitAdmin").attr("disabled", true);
          $("#getLoadingModalContent").removeClass('md-show');
          return false;
      }

      if (adminFirstName == "") {
          $(".help-block").css('color', 'red');
          $(".help-block").show();
          $(".help-block").text("* Enter the First Name");
          $("#inputFirstName").css("border-color", "red");
          $(".btnSubmitAdmin").attr("disabled", true);
          $("#getLoadingModalContent").removeClass('md-show');
          return false;
      }

      if (adminLastName == "") {
          $(".help-block").css('color', 'red');
          $(".help-block").show();
          $(".help-block").text("* Enter the Last Name");
          $("#inputLastName").css("border-color", "red");
          $(".btnSubmitAdmin").attr("disabled", true);
          $("#getLoadingModalContent").removeClass('md-show');
          return false;
      }

      if (businessName == "") {
          $(".help-block").css('color', 'red');
          $(".help-block").show();
          $(".help-block").text("* Enter the Business Name");
          $("#inputBusinessName").css("border-color", "red");
          $(".btnSubmitAdmin").attr("disabled", true);
          $("#getLoadingModalContent").removeClass('md-show');
          return false;
      }

      if (getLocality == "") {
          $(".help-block").css('color', 'red');
          $(".help-block").show();
          $(".help-block").text("* Enter the Locality");
          $("#inputLocality").css("border-color", "red");
          $(".btnSubmitAdmin").attr("disabled", true);
          $("#getLoadingModalContent").removeClass('md-show');
          return false;
      }

      if (state == "Select County") {
          $(".help-block").css('color', 'red');
          $(".help-block").show();
          $(".help-block").text("* Select the County");
          $("#select2-inputState-container").css("border", "1px solid red");
          $(".btnSubmitAdmin").attr("disabled", true);
          $("#getLoadingModalContent").removeClass('md-show');
          return false;
      }


      if (city == "Choose City" || city == undefined) {
          $(".errorInfo").css("border-color", "red");
          $(".errorInfo").show();
          $(".errorInfo").text("* Select the City");
          $("#select2-inputCity-container").css("border", "1px solid red");
          $(".btnSubmitAdmin").attr("disabled", true);
          $("#getLoadingModalContent").removeClass('md-show');
          return false;
      }

      if (getEmail == "") {
          $(".help-block").css('color', 'red');
          $(".help-block").show();
          $(".help-block").text("* Enter the E-mail");
          $("#inputEmailID").css("border-color", "red");
          $(".btnSubmitAdmin").attr("disabled", true);
          $("#getLoadingModalContent").removeClass('md-show');
          return false;
      }

      if (!isValidEmailAddress(getEmail)) {
          $(".help-block").css("border-color", "red");
          $(".help-block").show();
          $(".help-block").text("* Please Enter the Proper Email ID.");
          $("#inputEmailID").css("border-color", "red");
          $(".btnSubmitAdmin").attr("disabled", true);
          $("#getLoadingModalContent").removeClass('md-show');
          return false;
      }

      if (getPhoneNumber == "+44" || getPhoneNumber === "+91" || getPhoneNumber === "+1") {
          $(".help-block").css('color', 'red');
          $(".help-block").show();
          $(".help-block").text("* Enter the Phone Number");
          $("#inputPhoneNumber").css("border-color", "red");
          $(".btnSubmitAdmin").attr("disabled", true);
          $("#getLoadingModalContent").removeClass('md-show');
          return false;
      }


      if (getUrl == "") {
          $(".help-block").css('color', 'red');
          $(".help-block").show();
          $(".help-block").text("* Enter the Url For How To Rent");
          $("#inputUrlRent").css("border-color", "red");
          $(".btnSubmitAdmin").attr("disabled", true);
          $("#getLoadingModalContent").removeClass('md-show');
          return false;
      }

      if (getEmergencyNumber === "+44" || getEmergencyNumber === "+91" || getEmergencyNumber === "+1") {
          $(".help-block").css('color', 'red');
          $(".help-block").show();
          $(".help-block").text("* Enter the Emergency Number");
          $("#inputEmergencyNumber").css("border-color", "red");
          $(".btnSubmitAdmin").attr("disabled", true);
          $("#getLoadingModalContent").removeClass('md-show');
          return false;
      }

      if (getEmergencyElectricityNumber === "+44" || getEmergencyElectricityNumber === "+91" || getEmergencyElectricityNumber === "+1") {
          $(".help-block").css('color', 'red');
          $(".help-block").show();
          $(".help-block").text("* Enter the Emergency Electricity Number");
          $("#inputEmergencyElectricityNumber").css("border-color", "red");
          $(".btnSubmitAdmin").attr("disabled", true);
          $("#getLoadingModalContent").removeClass('md-show');
          return false;
      }

      if (getUrl == "") {
          $(".help-block").css("border-color", "red");
          $(".help-block").show();
          $(".help-block").text("* Upload the Logo");
          $("#imgAdminLogo").css("border", "1px solid red");
          $(".btnSubmitContractor").attr("disabled", true);
           $("#getLoadingModalContent").removeClass('md-show');
          return false;
      } else {
          debugger;
          var dataForm = '{"AdminTitle":"' + inputTitle + '","AdminFirstName":"' + adminFirstName + '","AdminLastName":"' + adminLastName + '","BusinessName":"' + businessName + '", "Locality":"' + getLocality + '","State":"' + state + '","City":"' + city + '","Country":"' + getCountry + '","IsVoid":"' + getAgency + '","Avail":"' + inputAvail + '","BusinessEmail":"' + getEmail + '","UrlForRent":"' + getUrl + '","EmergencyElectricityNumber":"' + getEmergencyElectricityNumber + '","BusinessPassword":"' + getPassword + '","PhoneNumber":"' + getPhoneNumber + '","EmergencyNumber":"' + getEmergencyNumber + '","AutoGenerate":"' + autoGenerate + '","Logo":"' + filePath + '","IsUtility":"' + inputUtility + '"}';
          console.log(dataForm);
          if (hiddenAdminID == 0) {
              var sendURL = domainAddress + 'CreateAdmin';
              console.log(sendURL);
              $.ajax({
                  type: "POST",
                  url: sendURL,
                  data: dataForm,
                  success: function(dataCheck) {
                      console.log(dataCheck);
                      if (dataCheck.Success == 1) {
                          getAllAdminList(getValue);
                          $("#inputFirstName").val('');
                          $("#inputLastName").val('');
                          $("#inputBusinessName").val('');
                          $("#inputLocality").val('');
                          $("#select2-inputState-container").html("Select County");
                          $("#select2-inputCity-container").html("Select City");
                          $("#inputCountry").val('');
                          $("#inputEmailID").val('');
                          $("#inputUrlRent").val('');
                          $("#getVoid").val('');
                          $("#getAvail").val('');
                          
                          $("#inputPhoneNumber").val('');
                          $("#inputEmergencyNumber").val('');
                          $(".cphno-prefix").hide();
                          $("#inputEmergencyElectricityNumber").val('');

                          $("#inputPhoneNumber").removeAttr("style");
                          $(".emerno-prefix").hide();
                          $(".emerElectno-prefix").hide();
                          $("#inputEmergencyNumber").removeAttr("style");
                          $("#inputEmergencyElectricityNumber").removeAttr("style");
                          $("#imgAdminLogo").attr("src", "assets/img/noImage.gif");
                          filePath = "";
                          $(".adminContent").hide();
                          $("#progressbox1").hide();
                          UIkit.modal.alert(dataCheck.message_text);
                      } else {
                          UIkit.modal.alert(dataCheck.message_text);
                          return false;
                      }
                      $("#getLoadingModalContent").removeClass('md-show');

                  }
              });
          } else {
              var sendURL = domainAddress + 'updateAdminDetails/' + hiddenAdminID;
              console.log(sendURL);
              $.ajax({
                  type: "POST",
                  url: sendURL,
                  data: dataForm,
                  success: function(dataCheck) {
                      console.log(dataCheck);
                      if (dataCheck.Success == 1) {
                          getAllAdminList(getValue);
                          $("#hiddenAdminID").val(0);
                          $("#inputFirstName").val('');
                          $("#inputLastName").val('');
                          $("#inputBusinessName").val('');
                          $("#inputLocality").val('');
                          $("#select2-inputState-container").html("Select County");
                          $("#select2-inputCity-container").html("Select City");
                          $("#inputCountry").val('');
                          $("#inputEmailID").val('');
                          $("#getVoid").val('');
                          $("#getAvail").val('');
                          $("#inputUrlRent").val('');
                          
                          $("#inputPhoneNumber").val('');
                          $("#inputEmergencyNumber").val('');
                          $(".cphno-prefix").hide();
                          $("#inputEmergencyElectricityNumber").val('');
                          $(".cphno-prefix").hide();
                          $("#inputPhoneNumber").removeAttr("style");
                          $(".emerno-prefix").hide();
                          $(".emerElectno-prefix").hide();
                          $("#inputEmergencyNumber").removeAttr("style");
                          $("#inputEmergencyElectricityNumber").removeAttr("style");
                          $(".adminContent").hide();
                          $("#imgAdminLogo").attr("src", "assets/img/noImage.gif");
                          filePath = "";
                          $("#progressbox1").hide();
                          $(".btnSubmitAdmin").text("Add Admin");
                          UIkit.modal.alert('Admin Details Updated Successfully');
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



  function zeroPad(num, places) {
      var zero = places - num.toString().length + 1;
      return Array(+(zero > 0 && zero)).join("0") + num;
  }


  function getAllAdminList(getValue) {

      if (getValue == "" || getValue == undefined) {
          dataForm = '{"Limit":"' + parseInt(adminCountLimit) + '"}';
          sendURL = domainAddress + "AdminListByCount";
      } else {
          dataForm = '{"Limit":"' + parseInt(adminCountLimit) + '","SearchValue":"' + getValue + '"}';
          sendURL = domainAddress + "SearchAdminList";
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

                  } else {
                      loadAdminList(result);

                  }


              } // ajax success
      }); // ajax POSTS
  } // getAllAdminList 


  $.get(domainAddress + "GetLastAdminID", {}, function(result) {
      //console.log(result);
      if (result.record_count == 0) {

      } else {
          for (var adminInfo in result.records) {
              //console.log(result.records[adminInfo].LastAdminID);
              getLastAdminID = result.records[adminInfo].LastAdminID
          }
      }
  });

  function loadAdminList(result) {

      if (result.record_count == 0) {
          $("#nextPage").attr("disabled", true);
          var enterPageNO = $("#enterPageNO").val();
          enterPageNO--;
          $("#enterPageNO").val(enterPageNO);
          $("#enterPageNO").attr("disabled", true);
      } else {
          $("#enterPageNO").attr("disabled", false);
          $(".allAdminList").html('');
          if (result.record_count == result.All_Records_Count) {
              //console.log("equal to 9");
              $("#nextPage").attr("disabled", "disabled");
          } else if (result.record_count < 9 && result.record_count != 0) {
              //console.log("less than 9");
              $("#nextPage").attr("disabled", "disabled");
          } else if (result.record_count >= 9) {
              //console.log("great than 9");
              $("#nextLastPage").removeAttr("disabled");
              //$("#nextLastPage").show();
          }
          lastPage = parseInt(result.All_Records_Count / 9) + 1;
          console.log(lastPage);
          //console.log("getAllAdminList called");
          $(".allAdminList").html('');
          if (result.record_count == 0) {
              $(".allAdminList").append("<tr> <td id='autoGenerate-0'>No records Found</td> <td id='adminName-0'> </td> <td id='businessName-0'> </td> <td id='emailID-0'> </td> <td id='getDue-0'> </td> <td id='isApproved-0'> </td> <td id='availedUtility-0'> </td> <td class='editAdmin' id='editAdmin-0'> </td> <td class='deleteAdmin' id='deleteAdmin-0'> </td> </tr>");
          } else {
              for (var adminInfo in result.records) {
                  var dueColor;

                  //debugger;
                  if (result.records[adminInfo].DateDiff < -5) {
                      dueColor = "green";
                  } else if (result.records[adminInfo].DateDiff < 0) {
                      dueColor = "Orange";
                  } else if (result.records[adminInfo].DateDiff > 0 && result.records[adminInfo].DateDiff < 7) {
                      dueColor = "Red";
                  } else if (result.records[adminInfo].DateDiff > 7) {
                      dueColor = "blue";
                  }
                  if (result.records[adminInfo].DateDiff == null || result.records[adminInfo].DateDiff == "") {
                      result.records[adminInfo].DateDiff = "-";
                  } 
                  $(".allAdminList").append("<tr>   <td id='adminName-" + result.records[adminInfo].Admin_ID + "' style='color:" + dueColor + "'>" + result.records[adminInfo].AdminFirstName + " " + result.records[adminInfo].AdminLastName + "</td> <td id='businessName-" + result.records[adminInfo].Admin_ID + "' style='color:" + dueColor + "'>" + result.records[adminInfo].BusinessName + "</td> <td id='emailID-" + result.records[adminInfo].Admin_ID + "' style='color:" + dueColor + "'>" + result.records[adminInfo].BusinessEmail + "</td>  <td style='color:" + dueColor + "' id='datediff-'>" + result.records[adminInfo].DateDiff + " </td>    <td id='isApprovedCheck-" + result.records[adminInfo].Admin_ID + "'> <i class='fa fa-thumbs-up fa-2x approve' style='cursor:pointer;' id='approve-" + result.records[adminInfo].Admin_ID + "'></i> <i class='fa fa-thumbs-down fa-2x reject' style='cursor:pointer;'  id='reject-" + result.records[adminInfo].Admin_ID + "'></i> </td> <td id='isAvailedUtilityCheck-"+result.records[adminInfo].Admin_ID+"'> <span id='getAvailedUtility-" + result.records[adminInfo].Admin_ID + "'></span> </td> <td ><a class='editAdmin' id='editAdminID-" + result.records[adminInfo].Admin_ID + "' style='cursor:pointer;'><i class='fa fa-pencil'></i></a></td> <td ><a class='deleteAdmin' id='deleteAdmin-" + result.records[adminInfo].Admin_ID + "' style='cursor:pointer;'><i class='fa fa-trash trash fa-1x'></i></a></td> <td> <a id='collected-" + result.records[adminInfo].Admin_ID + "' class='moneyCollect' ><i class='uk-icon-money'></i>Collected</a> </td> </tr>");

                
                  if (result.records[adminInfo].IsApproved == 1) {
                      $("#approve-" + result.records[adminInfo].Admin_ID).css('color', 'green');
                      $("#reject-" + result.records[adminInfo].Admin_ID).css('color', '');
                  } else {
                      $("#approve-" + result.records[adminInfo].Admin_ID).css('color', '');
                      $("#reject-" + result.records[adminInfo].Admin_ID).css('color', 'red');
                  }

                  if (result.records[adminInfo].IsUtility == 1) {
                      $("#getAvailedUtility-" + result.records[adminInfo].Admin_ID).text("Yes").css("color","green");
                  } else {
                      $("#getAvailedUtility-" + result.records[adminInfo].Admin_ID).text("No").css("color","red");
                  }
              }

              $("#getLoadingModalContent").removeClass('md-show');


          }

          $(".moneyCollect").on('click', function() {
              var getAdminID = this.id.replace('collected-', '');


              var dataForm = '{"AdminID":"' + getAdminID + '"}';
              var sendURL = domainAddress + 'updateAdminDue/';

              $.ajax({
                  type: "POST",
                  url: sendURL,
                  data: dataForm,
                  success: function(dataCheck) {
                      console.log(dataCheck);
                      $("#getRow-" + getAdminID).remove();
                      getAllAdminList(getValue);
                      UIkit.modal.alert('Updated Dates');

                  }
              });
              //console.log(getAdminID);

          });

          $(".approve").on('click', function() {
              var getAdminID = this.id.replace('approve-', '');
              var isApproveStatus = "";
              var businessEmailID = $("#emailID-" + getAdminID).text();
              var lettingAgencyCode = $("#autoGenerate-" + getAdminID).text();
              var businessName = $("#businessName-" + getAdminID).text();
              lettingAgencyCode = businessName.trim().charAt(0).toLowerCase() + businessName.trim().substr(businessName.length - 1).toLowerCase() + zeroPad(getAdminID, 5);

              UIkit.modal.confirm('Are you sure want to Approve?', function(e) {
                  //console.log(e);
                  isApproveStatus = 1;
                  var dataForm = '{"IsApprove":"' + isApproveStatus + '","BusinessEmailID":"' + businessEmailID + '","LettingAgencyCode":"' + lettingAgencyCode + '","BusinessName":"' + businessName + '"}';
                  var sendURL = domainAddress + 'UpdateAdminIsApprove/' + getAdminID;
                  console.log(dataForm);
                  console.log(sendURL);
                  $.ajax({
                      type: "POST",
                      url: sendURL,
                      data: dataForm,
                      success: function(dataCheck) {
                          console.log(dataCheck);
                          $("#getRow-" + getAdminID).remove();
                          getAllAdminList(getValue);
                          UIkit.modal.alert('New Admin Approved Successfully');

                      }
                  });
              });

          });


          $(".reject").on('click', function() {
              var getAdminID = this.id.replace('reject-', '');
              var isApproveStatus = "";
              var businessEmailID = $("#emailID-" + getAdminID).text();
              var lettingAgencyCode = $("#autoGenerate-" + getAdminID).text();
              var businessName = $("#businessName-" + getAdminID).text();
              lettingAgencyCode = businessName.trim().charAt(0).toLowerCase() + businessName.trim().substr(businessName.length - 1).toLowerCase() + zeroPad(getAdminID, 5);

              UIkit.modal.confirm('Are you sure want to Reject?', function() {
                  isApproveStatus = 0;
                  var dataForm = '{"IsApprove":"' + isApproveStatus + '","BusinessEmailID":"' + businessEmailID + '","LettingAgencyCode":"' + lettingAgencyCode + '","BusinessName":"' + businessName + '"}';
                  var sendURL = domainAddress + 'UpdateAdminIsApprove/' + getAdminID;
                  console.log(dataForm);
                  console.log(sendURL);
                  $.ajax({
                      type: "POST",
                      url: sendURL,
                      data: dataForm,
                      success: function(dataCheck) {
                          console.log(dataCheck);
                          getAllAdminList(getValue);
                          UIkit.modal.alert('New Admin Rejected Successfully');
                          // $("#isApprove-"+getAdminID).bootstrapSwitch('setState', false);
                      }
                  });

              });

          });


          $(".editAdmin").on('click', function(e) {
              $("body").animate({
                  scrollTop: 0
              }, 'slow');
              var editAdminID = this.id.replace('editAdminID-', '');
              $("#hiddenAdminID").val(editAdminID);

              $.get(domainAddress + "getAdminDetails/" + editAdminID, {}, function(result) {
                  //console.log(result);
                  var isFourExistNo = 0;
                  var isEmerFourExistNo = 0;
                  for (var getAdmin in result.records) {
                      filePath = result.records[getAdmin].Logo;
                      setCountryCode = result.records[getAdmin].PhoneCode;
                      $("#inputFirstName").val(result.records[getAdmin].AdminFirstName);
                      $("#inputLastName").val(result.records[getAdmin].AdminLastName);
                      $("#inputBusinessName").val(result.records[getAdmin].BusinessName);
                      $("#inputLocality").val(result.records[getAdmin].Locality);
                      $("#inputTitle").val(result.records[getAdmin].AdminTitle);
                      $("#select2-inputTitle-container").html(result.records[getAdmin].AdminTitle);
                      if (result.records[getAdmin].State == null || result.records[getAdmin].State == "null" || result.records[getAdmin].State == "") {
                          $("#select2-inputState-container").html("Select County");
                      } else {
                          $("#select2-inputState-container").html(result.records[getAdmin].State);
                      }

                      if (result.records[getAdmin].AdminTitle == null || result.records[getAdmin].State == "null" || result.records[getAdmin].AdminTitle == "") {
                          $("#select2-inputTitle-container").html("Select Title");
                      } else {
                          $("#select2-inputTitle-container").html(result.records[getAdmin].AdminTitle);
                      }

                      if (result.records[getAdmin].City == null || result.records[getAdmin].City == "null" || result.records[getAdmin].City == "") {
                          $("#select2-inputCity-container").html("Select City");
                      } else {
                          $("#select2-inputCity-container").html(result.records[getAdmin].City);
                      }

                      $("#select2-inputCountry-container").html(result.records[getAdmin].Country);
                      $("#inputEmailID").val(result.records[getAdmin].BusinessEmail);
                      $("#inputUrlRent").val(result.records[getAdmin].UrlForRent);

                      isFourExistNo = result.records[getAdmin].PhoneNumber.slice(0, 3);
                      //console.log(isFourExistNo+" === "+result.records[getAdmin].PhoneNumber.slice(3));
                      if (isFourExistNo === "+44" || isFourExistNo === "+91" || isFourExistNo === "+1") {
                          $("#inputPhoneNumber").val(result.records[getAdmin].PhoneNumber.slice(3));
                          $(".cphno-prefix").show();
                          $("#inputPhoneNumber").css("padding", "10px 10px 12px 31px");
                      } else {
                          $("#inputPhoneNumber").val(result.records[getAdmin].PhoneNumber);
                          $(".cphno-prefix").hide();
                          $("#inputPhoneNumber").removeAttr("style");
                      }

                      isEmerFourExistNo = result.records[getAdmin].EmergencyNumber.slice(0, 3);
                      //console.log(isEmerFourExistNo+" === "+result.records[getAdmin].EmergencyNumber.slice(3));
                      if (isEmerFourExistNo === "+44" || isEmerFourExistNo === "+91" || isEmerFourExistNo === "+1") {
                          $("#inputEmergencyNumber").val(result.records[getAdmin].EmergencyNumber.slice(3));
                          $(".emerno-prefix").show();
                          $("#inputEmergencyNumber").css("padding", "10px 25px 12px 32px");
                      } else {
                          $("#inputEmergencyNumber").val(result.records[getAdmin].EmergencyNumber);
                          $(".emerno-prefix").hide();
                          $("#inputEmergencyNumber").removeAttr("style");
                      }


                      isEmerElecFourExistNo = result.records[getAdmin].EmergencyElectricityNumber.slice(0, 3);
                      //console.log(isEmerElecFourExistNo+" === "+result.records[getAdmin].EmergencyElectricityNumber.slice(3));
                      if (isEmerElecFourExistNo === "+44" || isEmerElecFourExistNo === "+91" || isEmerElecFourExistNo === "+1") {
                          $("#inputEmergencyElectricityNumber").val(result.records[getAdmin].EmergencyElectricityNumber.slice(3));
                          $(".emerElectno-prefix").show();
                          $("#inputEmergencyElectricityNumber").css("padding", "10px 10px 12px 31px");
                      } else {
                          $("#inputEmergencyElectricityNumber").val(result.records[getAdmin].EmergencyElectricityNumber);
                          $(".emerElectno-prefix").hide();
                          $("#inputEmergencyElectricityNumber").removeAttr("style");
                      }

                      if (result.records[getAdmin].Logo == "" || result.records[getAdmin].Logo == null) {
                          $("#imgAdminLogo").attr("src", "assets/img/noImage.gif");
                      } else {
                          $("#imgAdminLogo").attr("src", domainAddress + result.records[getAdmin].Logo);
                      }
                      filePath = result.records[getAdmin].Logo;
                      $(".md-input-wrapper").addClass("md-input-filled");
                      $(".adminContent").show();
                      $(".btnSubmitAdmin").text("Update Admin");
                  }
              });

          });

          $(".deleteAdmin").on('click', function(e) {
              var getAdminID = this.id.replace('deleteAdmin-', '');

              UIkit.modal.confirm('Are you sure?', function() {
                  $.post(domainAddress + 'DeleteAdminDetails/' + getAdminID, function(e) {
                      //console.log(e);
                      $("#rowID-" + getAdminID).remove();
                      getAllAdminList(getValue);
                      UIkit.modal.alert('Admin Deleted Successfully');
                  });
              });

          }); // deleteAdmin


      }
  }