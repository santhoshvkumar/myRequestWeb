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


  var adminUserName = "";
  var logo = "";
  var getLatitude = "";
  var getLongitude = "";
  var adminUserID = 0;
  var getProblemDetailsAsObject = new Array();
  var getAdminNotesDetailsAsObject = new Array();
  var getClientUserID = 0;
  var userRegisterID = 0;
  var problemStatus2 = "";
  var getTokenID = "";
  var getSpecialityID = 0;
  var FixedImage = "";
  var contractorID = 0;
  var getContractorName = "";
  var subAdminID = 0;
  var loadProblems = "";
  var localProblemStatus = "";
  var getAllContractorArr = new Array();
  var getAllSpecialityArr = new Array();
  var datetime = "";
  var specialityID = 0;
  userRegisterID = localStorage.getItem("MyRequestUserRegisterID");
  contractorID = localStorage.getItem("MyRequestContractorID");

  $(".btnback").click(function() {
      window.location.href = "ListAllCase.html";
  });
  $('.clockpickerStartTime').clockpicker();
  $('.clockpickerEndTime').clockpicker();
  $(document).ready(function() {
      var currentdate = new Date();
      datetime = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate() + " " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
      adminUserID = localStorage.getItem("MyRequest_AdminID");
      adminUserName = localStorage.getItem("MyRequest_UserName");
      var adminType = localStorage.getItem("MyRequest_AdminType");
      var businessName = localStorage.getItem("MyRequest_BusinessName");
      logo = localStorage.getItem("MyRequest_Logo");
      var isFilled = localStorage.getItem("MyRequest_profileFill");
      var currentdate = new Date();
      datetime = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate() + " " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
      adminUserID = localStorage.getItem("MyRequest_AdminID");
      adminUserName = localStorage.getItem("MyRequest_UserName");
      var adminType = localStorage.getItem("MyRequest_AdminType");
      var businessName = localStorage.getItem("MyRequest_BusinessName");
      var lettingAgencyCode = localStorage.getItem("MyRequest_LettingAgencyCode");
      logo = localStorage.getItem("MyRequest_Logo");
      var isFilled = localStorage.getItem("MyRequest_profileFill");



      if (isFilled == "true") {
          window.location.href = 'http://myrequest.co.uk/myRequestAdmin/MyProfile.html';
      }
      if (adminUserID == "" || adminUserID == null) {
          window.location.href = "index.html";
      } else {
          $.get(domainAddress + "getAdminDetails/" + adminUserID, function(result) {
                if (result.record_count == 0) {

                } else {
                    for (var getUserInfo in result.records) {
                        $(".getUserName").text(result.records[getUserInfo].AdminFirstName+" "+result.records[getUserInfo].AdminLastName);
                    }
                }
            });
        //   $(".getUserName").text(adminUserName);
      }
      if (adminType == "SuperAdmin") {
          $(".superAdmin").show();
      } else {
          $(".superAdmin").hide();
          if (logo == undefined || logo == null || logo == "undefined" || logo == "Fail upload folder with read access.") {
              $(".myRequestAdminLogo").attr("src", "assets/img/myRequestLogo.png").show();
          } else {
              $(".myRequestAdminLogo").attr("src", domainAddress + logo).show();
              var getLogoImagePath = logo.slice(0, 4);
              if (getLogoImagePath == "api/") {
                  getLogoImagePath = logo.slice(4);
                  $(".myRequestAdminLogo").attr("src", domainAddress + getLogoImagePath).show();
              } else {
                  $(".myRequestAdminLogo").attr("src", domainAddress + logo).show();
              }
          }
      }

      $(".md-overlay").css("background", "rgba(0,0,0,0.5)");
      $("#getLoadingModalContent").addClass('md-show');
      /********************  To Get Speciality List ****************/
      $.get(domainAddress + "GetAllSpecialityList/" + adminUserID, {}, function(resultSpecialityList) {
          $("#specialityValue").html('');
          $("#specialityValue").html("<option value='0'>Select Speciality</option>");
          if (resultSpecialityList.record_count == 0) {
              $("#specialityValue").html("<option value='0'>Select Speciality</option><option value='0'>No Speciality Found</option>");
          } else {
              for (Speciality in resultSpecialityList.records) {
                  $("#specialityValue").append("<option value='" + resultSpecialityList.records[Speciality].SpecialityID + "'>" + resultSpecialityList.records[Speciality].SpecialityName + "</option>");
                  var specialityDataForm = {
                      'SpecialityID': resultSpecialityList.records[Speciality].SpecialityID,
                      'SpecialityName': resultSpecialityList.records[Speciality].SpecialityName
                  };
                  getAllSpecialityArr.push(specialityDataForm);
              }

              $("#getLoadingModalContent").removeClass('md-show');

              $("#specialityValue").select2();
              $(".select2").css("width", "200px");
              $(".select2").css("margin-left", "-23px");
          }
          $("#specialityValue").on('change', function() {
              var specialityName = $("#specialityValue option:selected").text();
              var workID = $("#hiddenWorkID-" + this.value).val();
              if (specialityName == "Select Speciality") {
                  $(".specialityName").text('SpecialityName');
                  alert("Please Select Speciality Name");
                  return false;
              } else {
                  $(".specialityName").text(specialityName);
              } // else speciality
          }); // #specialityValue
      }); // GetAllSpecialityList
      /********************  End - To Get Speciality List ****************/
      /**********************  To Get Contractor List *******************/
      $.get(domainAddress + "GetAllContractorList", {}, function(resultContractorList) {
          $("#contractorValue").html('');
          $("#contractorValue").html("<option value='0'>Select Contractor</option>");
          if (resultContractorList.record_count == 0) {
              $("#contractorValue").html("<option value='0'>Select Contractor</option><option value='0'>No Contractor Found</option>");
          } else {
              for (Contractor in resultContractorList.records) {
                  var contractorDataForm = {
                      'ContractorID': resultContractorList.records[Contractor].ContractorID,
                      'ContractorName': resultContractorList.records[Contractor].ContractorName,
                      'SpecialityID': resultContractorList.records[Contractor].SpecialityID,
                      'ContractorImage': resultContractorList.records[Contractor].ContractorImage,
                      'ContractorRating': resultContractorList.records[Contractor].ContractorRating
                  };
                  getAllContractorArr.push(contractorDataForm);
              } // resultContractorList.records
          }
          $("#contractorValue").on('change', function() {
              contractorID = parseInt(this.value);
              var contractorName = $("#contractorValue option:selected").text();
              if (contractorName == "Select Contractor") {
                  alert("Please Select Contractor Name");
                  return false;
              } else {
                  getContractorChargeDetails(contractorID);
                  for (getContractorVal in getAllContractorArr) {
                      if (getAllContractorArr[getContractorVal].ContractorID == contractorID) {
                          $(".getContractorImg").show();
                          if (getAllContractorArr[getContractorVal].ContractorImage != null) {
                              $(".getContractorImage").attr("src", domainAddress + getAllContractorArr[getContractorVal].ContractorImage);
                          } else {
                              $(".getContractorImage").attr("src", "assets/img/sign-in.jpg");
                          }
                          $(".setContractorName").show();
                          $(".setContractorName").html("<h4>" + getAllContractorArr[getContractorVal].ContractorName + " <i class='fa fa-pencil-square-o contractorEdit'></i></h4> ");

                      }
                  }
                  $(".contractorEdit").on('click', function() {
                      $(".contractorHide").toggle('slow');
                      $(".changeContractor").toggle('slow');
                  });
              }
          }); // #contractorValue

          getParticularProblemInfo(getProblemID);

      }); // GetAllContractorUserList
      /********************** End - To Get Contractor List *******************/

      $(".getLettingAgencyBusinessName").text("Particular Problem - " + businessName);
  }); // ready




  function getContractorChargeDetails(contractorID) {
      $.get(domainAddress + "GetContractorChargeDetails/" + contractorID, {}, function(resultContractor) {

          $(".allContractorList").html("");
          if (resultContractor.record_count == 0) {
              $(".allContractorList").html("<tr> <td> No Records Found    </td> <td> </td> <td> </td> <td> </td> <td> </td>  </tr>");
          } else {
              for (var getContractor in resultContractor.records) {
                  if (resultContractor.records[getContractor].AverageCharges == null && resultContractor.records[getContractor].VisitCharges == null && resultContractor.records[getContractor].HourlyRate == null && resultContractor.records[getContractor].StartTime == null && resultContractor.records[getContractor].EndTime == null) {
                      $(".allContractorList").html("<tr> <td> No Records Found </td>  <td> </td>  <td>  </td>  </tr>");
                  } else {
                      $(".allContractorList").append("<tr> <td><i class='fa fa-gbp'></i> " + resultContractor.records[getContractor].AverageCharges + "    </td> <td> <i class='fa fa-gbp'></i>  " + resultContractor.records[getContractor].VisitCharges + "  </td>   <td><i class='fa fa-gbp'></i> " + resultContractor.records[getContractor].HourlyRate + "</td>   <td>" + resultContractor.records[getContractor].StartTime + "</td>  <td>" + resultContractor.records[getContractor].EndTime + "</td>  </tr>");
                  }
              }

              $("#getLoadingModalContent").removeClass('md-show');

          }
      });
  } // getContractorChargeDetails




  var getImgValue = "";
  var isAssignedContractor = 0;
  var localProblem = localStorage.getItem("MyRequestDetails");
  var localProblemAdminNotes = localStorage.getItem("MyRequestAdminNotes");

  function getParticularProblemInfo(getProblemID) {
      /************* To get Problem Image - Start ***********/
      $.get(domainAddress + "GetParticularProblemImage/" + getProblemID, {}, function(resultProblem) {
          $(".problemImage").attr("src", "");
          $(".problemRefImage").prop("href", "");
          $(".problemImage").attr("data-zoom-image", "");
          for (Problem in resultProblem.ProblemImageRecord) {
              problemID = resultProblem.ProblemImageRecord[Problem].ProblemID;
              var ProblemImage = resultProblem.ProblemImageRecord[Problem].ProblemImage;
              if (ProblemImage == null || ProblemImage == "" || ProblemImage == "[object TiUIImageView]") {
                  $(".problemImage").attr("src", "assets/img/no_image.jpg");
                  $(".problemRefImage").prop("href", "assets/img/no_image.jpg");
              } else {
                  $(".problemImage").attr("src", domainAddress + ProblemImage);
                  $(".problemRefImage").prop("href", domainAddress + ProblemImage);
                  $(".problemImage").attr("data-zoom-image", domainAddress + ProblemImage);
              }
          }
          $("#problemImageZoom").elevateZoom({
              cursor: 'pointer'
          });
          /********** To get Particular Problem Details - Start ********/
          getDbReportProblem(getProblemID);
          /********** To get Particular Problem Details - End ********/
      }); // GetParticularProblemImage
      /************* To get Problem Image - End ***********/
  } // getParticularProblemInfo