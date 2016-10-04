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

  var maxProp = 0;
  var newsLetterCountLimit = 0;
  var pollingLimitCount = 0;
  var adminUserID = 0;
  var checkRecordCount = 0;
  var advertisementListCountLimit = 0;
  var optionCount = 2;
  var CSS_COLOR_NAMES = ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "Darkorange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Yellow", "YellowGreen"];
  var getValue = "";

  $(window).load(function() {
      $("#getLoadingModalContent").removeClass('md-show');
  });

  $(document).ready(function() {
      console.log("ready call");
      adminUserID = localStorage.getItem("MyRequest_AdminID");
      var adminUserName = localStorage.getItem("MyRequest_UserName");
      var adminType = localStorage.getItem("MyRequest_AdminType");

      var businessName = localStorage.getItem("MyRequest_BusinessName");
      var lettingAgencyCode = localStorage.getItem("MyRequest_LettingAgencyCode");
      var logo = localStorage.getItem("MyRequest_Logo");
      localStorage.setItem("MyRequest_RepairStatus", "");
      $("#inputDropValue").select2();
      $("#inputDropValue").val("For Both Contractor & Tenant");
      $("#select2-inputDropValue-container").html("For Both Contractor & Tenant");

      var isFilled = localStorage.getItem("MyRequest_profileFill");
      if (isFilled == "true") {

          window.location.href = 'http://myrequest.co.uk/myRequestAdmin/MyProfile.html';
      }
      //Not to allow Page
      $(".md-overlay").css("background", "rgba(0,0,0,0.5)");
      $("#getLoadingModalContent").addClass('md-show');
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

      } else {
        var getLogoImagePath = logo.slice(0,4);
        if(getLogoImagePath=="api/"){
            getLogoImagePath = logo.slice(4);
            $(".myRequestAdminLogo").attr("src", domainAddressImage + getLogoImagePath).show();
        }
        else{
            $(".myRequestAdminLogo").attr("src", domainAddressImage + logo).show();
        }
      }


      $(".getLettingAgencyBusinessName").text("Notification - " + businessName + " - " + lettingAgencyCode);
      getAllNewsLetter();
      maxProp++;
      $("#enterPageNO").val(maxProp);

      $(".pollingContent").hide();
      $(".newsLetterContent").hide();

      tinymce.init({
          selector: "textarea",
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

  }); // ready

  $(".btnSearch").click(function() {
      getValue = $("#inputSearch").val();
      $("#getLoadingModalContent").addClass('md-show');
      pollingLimitCount = 0;
      getAllNewsLetter(getValue);
  });

  $(".getAdvertisement").click(function() {
      $(".btnSubmitAdvertisement").show();
      $(".advertisementContent").toggle();
      $("#hiddenAdvertisementID").val(0);
      $("#inputAdvertisementURL").val('');
      $("#imgAdvertisementImage").attr("src", "assets/img/noImage.gif");
      $(".md-input-wrapper").removeClass("md-input-filled");
  });


  $(".logOut").click(function() {
      logOutClearCatch();
  });

  $("#inputAdvertisementURL").keyup(function() {
      var advertisementImageURL = $("#inputAdvertisementURL").val().replace(/["']/g, "`");
      if (advertisementImageURL == "") {
          $(".help-block").show();
          $(".help-block").text("* Enter the Advertisement URL");
          $("#inputAdvertisementURL").css("border-color", "red");

          $(".btnSubmitAdvertisement").attr("disabled", true);
          return false;
      } else {

          $(".help-block").hide();
          $(".help-block").text("");
          $("#inputAdvertisementURL").css("border-color", "rgba(0,0,0,.12)");

          $(".btnSubmitAdvertisement").attr("disabled", false);
      }
  });




  $("#leftArrow").click(function() {
      pollingLimitCount = 0;
      maxProp = 1;
      $("#enterPageNO").val(1);
      $("#getLoadingModalContent").addClass('md-show');
      getAllNewsLetter(getValue);
      if (maxProp < lastPage) {
          $("#nextPage").attr("disabled", false);
      }
  });

  $("#rightArrow").click(function() {
      $("#previousPage").removeAttr("disabled");
      pollingLimitCount = (9 * lastPage) - 9;
      maxProp = lastPage;
      $("#enterPageNO").val(lastPage);
      $("#getLoadingModalContent").addClass('md-show');
      getAllNewsLetter(getValue);
  });

  $("#previousPage").click(function() {
      //console.log("inital count : "+pollingLimitCount);
      if (pollingLimitCount == 0) {
          pollingLimitCount = 0;
          $("#previousPage").attr("disabled", "disabled");
      } else {
          pollingLimitCount -= 9;
          $("#previousPage").removeAttr("disabled");
      }
      //console.log("prev count : "+pollingLimitCount);
      if (pollingLimitCount == 0) {
          $("#previousPage").attr("disabled", "disabled");
      }
      maxProp--;
      if (maxProp == 0) {
          $("#enterPageNO").val('');
      } else {
          $("#enterPageNO").val(maxProp);
      }
      $("#getLoadingModalContent").addClass('md-show');
      getAllNewsLetter(getValue);
  });


  $("#nextPage").click(function() {
      //console.log("next inital count : "+pollingLimitCount);
      $("#previousPage").removeAttr("disabled");
      pollingLimitCount += 9;
      //console.log("next count : "+pollingLimitCount);

      if (maxProp == lastPage) {
          $("#nextPage").attr("disabled", true);
      } else {
          $("#nextPage").attr("disabled", false);
          maxProp++;
          $("#enterPageNO").val(maxProp);
          if (maxProp <= lastPage) {
              $("#getLoadingModalContent").addClass('md-show');
              getAllNewsLetter(getValue);
          }
      }

  });



  $("#enterPageNO").on("change", function(e) {
      console.log("THis is called" + $("#enterPageNO").val());
      if ($("#enterPageNO").val() < lastPage) {
          maxProp++;
          $("#enterPageNO").val(maxProp);
      }

      console.log("next inital count : " + pollingLimitCount + " page # : " + maxProp);
      pollingLimitCount = 9 * ($("#enterPageNO").val() - 1);
      console.log("change count : " + pollingLimitCount);
      $("#getLoadingModalContent").addClass('md-show');
      getAllNewsLetter(getValue);
  });

  $("#enterPageNO").keyup(function() {
      console.log("THis is called " + $("#enterPageNO").val());
      if ($("#enterPageNO").val() < lastPage) {
          maxProp++;
          $("#enterPageNO").val(maxProp);
      }

      console.log("next inital count : " + pollingLimitCount + " page # : " + maxProp);
      pollingLimitCount = 9 * ($("#enterPageNO").val() - 1);
      console.log("change count : " + pollingLimitCount);
      $("#getLoadingModalContent").addClass('md-show');
      getAllNewsLetter(getValue);
  });




  function getAllNewsLetter(getValue) {

      if (getValue == "" || getValue == undefined) {
          dataForm = '{"Limit":"' + parseInt(pollingLimitCount) + '","AdminID":"' + adminUserID + '"}';
          sendURL = domainAddress + "notificationContent";
      } else {

          dataForm = '{"Limit":"' + parseInt(pollingLimitCount) + '","SearchValue":"' + getValue + '","AdminID":"' + adminUserID + '"}';
          sendURL = domainAddress + "SearchNotificationTenantList";
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
                      $(".allNewsLetterList").html('');
                      $(".allNewsLetterList").append("<tr class='odd gradeX' id='rowID-0'> <td id='titleName-0'>No Records Found</td> <td id='noOfViews-0'></td> <td class='editNewsLetter' id='editNewsLetter-0'> </td> </tr> ");
                      $("#getLoadingModalContent").removeClass('md-show');
                  } else {
                      loadNewsLetterList(result);

                  }


              } // ajax success
      }); // ajax POSTS
  } // getAllAdminList 




  function loadNewsLetterList(result) {

      if (result.record_count == 0) {
          $("#nextPage").attr("disabled", true);
          var enterPageNO = $("#enterPageNO").val();
          enterPageNO--;
          $("#enterPageNO").val(enterPageNO);
          $("#enterPageNO").attr("disabled", true);
      } else {
          $("#enterPageNO").attr("disabled", false);
          $(".allNewsLetterList").html('');
          if (result.record_count == result.All_Records_Count) {
              console.log("equal to 9");
              $("#nextPage").attr("disabled", "disabled");
          } else if (result.record_count < 9 && result.record_count != 0) {
              console.log("less than 9");
              $("#nextPage").attr("disabled", "disabled");
          } else if (result.record_count >= 9) {
              console.log("great than 9");
              $("#nextLastPage").removeAttr("disabled");
          }
          lastPage = parseInt(result.All_Records_Count / 9) + 1;
          console.log(lastPage);
          for (getNewsLetter in result.records) {

              $(".allNewsLetterList").append("<tr class='odd gradeX' id='rowID-" + result.records[getNewsLetter].NotificationContentID + "'><td id='iconChange-" + result.records[getNewsLetter].NotificationContentID + "'><i class='fa fa-newspaper-o fa-2x' style='cursor:pointer;' id='polling-" + result.records[getNewsLetter].NotificationContentID + "'></i> <i class='fa fa-pencil-square fa-2x'  id='news-" + result.records[getNewsLetter].NotificationContentID + "'></i></td><td id='newsLetterFor-" + result.records[getNewsLetter].NotificationContentID + "'> </td> <td class='editNotificationContent' id='editNotificationContent-" + result.records[getNewsLetter].NotificationContentID + "' refIsPolling='" + result.records[getNewsLetter].IsPolling + "' style='cursor:pointer;'><i class='fa fa fa-eye eye fa-1x'></i></td></tr>");
              getIsPolling = result.records[getNewsLetter].IsPolling


              for (getContentHead in result.records[getNewsLetter].Content) {
                  $("#newsLetterFor-" + result.records[getNewsLetter].NotificationContentID).text(result.records[getNewsLetter].Content[getContentHead].Title);
                  $("#newsLetterFor-" + result.records[getNewsLetter].NotificationContentID).attr('refId', result.records[getNewsLetter].Content[getContentHead].ID);
              }

              if (getIsPolling == "0") {
                  $("#polling-" + result.records[getNewsLetter].NotificationContentID).show()
                  $("#news-" + result.records[getNewsLetter].NotificationContentID).hide()

              } else {
                  $("#polling-" + result.records[getNewsLetter].NotificationContentID).hide()
                  $("#news-" + result.records[getNewsLetter].NotificationContentID).show()

              }
          }
          $("#getLoadingModalContent").removeClass('md-show');


          $(".editNotificationContent").on("click", function(e) {

              var getNotificationID = this.id.replace("editNotificationContent-", "");
              var getIsPolling = $("#editNotificationContent-" + getNotificationID).attr('refIsPolling');
              var getContentID = $("#newsLetterFor-" + getNotificationID).attr('refId');
              //console.log("NotificationID : "+getNotificationID+" || IsPolling : "+getIsPolling+" || ContentID : "+getContentID);
              var getUrl = "";
              if (getIsPolling == 1) {
                  getUrl = "GetParticularPolling/";
              } else {
                  getUrl = "GetNewsLetterDetails/";
              }

              var pollingOptionCount = "";
              var pieChartData = new Array();

              $(".md-input-wrapper").addClass("md-input-filled");

              $(".btnSubmitPolling").hide();
              $(".btnAddOption").hide();
              $("#getLoadingModalContent").addClass('md-show');
              $.get(domainAddress + getUrl + getContentID, {}, function(result) {
                  console.log(result);
                  if (result.record_count == 0) {
                      console.log("No Record found");
                  } else {

                      if (getIsPolling == 1) {
                          $(".pollingContent").show();
                          $(".newsLetterContent").hide();

                          $("#smallPieChartPollingResult").html("");
                          var myLine = new Chart(document.getElementById("smallPieChartPollingResult").getContext("2d")).Pie(pieChartData);
                          myLine.destroy();
                          for (var getPolling in result.records) {
                              if (getContentID == result.records[getPolling].PollingID) {

                                  $("#inputPollingTitle").val(result.records[getPolling].PollingTitle);
                                  $("#inputPollingTitle").attr("disabled", true)
                                  for (var i = 3; i <= optionCount; i++) {
                                      $(".newOption-" + i).remove();
                                      $("#inputPollingOption" + i).remove();
                                  }
                                  optionCount = 1;
                                  for (var getPollingOption in result.records[getPolling].Polling) {
                                      //console.log(result.records[getPolling].Polling);
                                      if (optionCount <= 2) {
                                          $("#inputPollingOption" + optionCount).val(result.records[getPolling].Polling[getPollingOption].PollingOptionName);

                                      } else {
                                          $(".addNewOptions").append('<div class="uk-grid newOption-' + optionCount + '"  data-uk-grid-margin>     <div class="uk-width-medium-1-1">  <div class="parsley-row"> <div class="md-input-wrapper">  <label for="inputPollingOption' + optionCount + '">Polling Options ' + optionCount + '<span class="req">*</span></label>     <input type="text" id="inputPollingOption' + optionCount + '" name="pollingOption" class="md-input" value="' + result.records[getPolling].Polling[getPollingOption].PollingOptionName + '" />       <span class="md-input-bar"></span>    </div> </div> </div> </div>')
                                      }
                                      $("#inputPollingOption" + optionCount).attr("disabled", true);
                                      optionCount++;


                                      pollingOptionCount = {
                                          value: result.records[getPolling].Polling[getPollingOption].PollingAns,
                                          color: CSS_COLOR_NAMES[Math.floor(Math.random() * CSS_COLOR_NAMES.length)],
                                          label: result.records[getPolling].Polling[getPollingOption].PollingOptionName,
                                          pollingOptionID: result.records[getPolling].Polling[getPollingOption].PollingOptionID
                                      };
                                      pieChartData.push(pollingOptionCount);
                                      //console.log(pieChartData);
                                  } // Polling for loop End

                              } // If Condition Ends Here

                          } // For Loop Outer Getting Closed
                          var myLine = new Chart(document.getElementById("smallPieChartPollingResult").getContext("2d")).Pie(pieChartData);

                          $("#smallPieChartPollingResult").click(
                              function(evt) {
                                  var activePoints = myLine.getSegmentsAtEvent(evt);
                              }
                          );


                      } else {

                          $(".pollingContent").hide();
                          $(".newsLetterContent").show();

                          for (var getNewsLetter in result.records) {
                              $("#select2-inputDropValue-container").html(result.records[getNewsLetter].NewsLetterFor);
                              $("#inputDropValue").val(result.records[getNewsLetter].NewsLetterFor);
                              $("#inputNewsLetterName").val(result.records[getNewsLetter].TitleName);

                              $("#select2-inputDropValue-container").html(result.records[getNewsLetter].NewsLetterFor);
                              $("#inputDropValue").val(result.records[getNewsLetter].NewsLetterFor);

                              tinyMCE.activeEditor.setContent(decodeURIComponent(result.records[getNewsLetter].TitleDescription), {
                                  format: 'raw'
                              });

                              $(".btnSubmitNewsLetter").text("Update NewsLetter");
                          }


                          if (getNotificationID == 0) {
                              $(".getAnsweredUsersList").show();
                              $(".listAnsweredUsers").html('');
                              $(".listAnsweredUsers").append("<tr> <td>No Records Found</td> <td> </td> <td> </td> </tr>");
                          } else {
                              $.get(domainAddress + "GetNewsLetterViewedUsersList/" + getNotificationID + "/" + adminUserID, {}, function(result) {
                                  console.log(result);
                                  $(".getAnsweredUsersList").show();
                                  $(".listAnsweredUsers").html('');
                                  if (result.record_count == 0) {
                                      $(".listAnsweredUsers").append("<tr> <td>No records found </td> <td> </td> <td> </td> </tr>");
                                  } else {
                                      for (var getAnsweredUsers in result.records) {

                                          $(".listAnsweredUsers").append("<tr> <td id='name-" + result.records[getAnsweredUsers].UserID + "'>" + result.records[getAnsweredUsers].Name + " </td> <td id='emailID-" + result.records[getAnsweredUsers].UserID + "'> <a href='mailto:" + result.records[getAnsweredUsers].EmailID + "' target='_top'>" + result.records[getAnsweredUsers].EmailID + " </a></td> <td id='mobileNumber-" + result.records[getAnsweredUsers].UserID + "'>" + result.records[getAnsweredUsers].MobileNumber + " </td> </tr>");
                                      }
                                  }
                              });
                          }


                      } // getIsPolling

                  } // result.record_count

                  $("#getLoadingModalContent").removeClass('md-show');

              }); // domainAddress+getUrl+getContentID

          }); // editNotificationContent

      } // table load result.record_count

  } // loadNewsLetterList(result)