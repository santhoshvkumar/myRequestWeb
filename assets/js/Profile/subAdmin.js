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
  var adminUserID = 0;

  $(document).ready(function() {
      /*        console.log("ready call");
      */
      adminUserID = localStorage.getItem("MyRequest_AdminID");
      var adminUserName = localStorage.getItem("MyRequest_UserName");
      var adminType = localStorage.getItem("MyRequest_AdminType");
      var businessName = localStorage.getItem("MyRequest_BusinessName");
      var logo = localStorage.getItem("MyRequest_Logo");

      if (adminUserID == "" || adminUserID == null) {
        window.location.href = "index.html";
      } else {
        $(".getUserName").text(adminUserName);
        $(".getLettingAgencyBusinessName").text("Sub Admin - " + businessName );
        $(".myRequestAdminLogo").attr("src", domainAddress + logo).show();
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
                  $(".select2").css("width", "230px");
                });
            });



      $("#inputCountry").val("UK");

      getAllSubAdminList();
      $("#inputTitle").select2();

      $(".forSuperAdmin").show();

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


  $("#inputPhoneNumber").keypress(function(e) {

    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {


      return false;
    }
  });



  $(".getAdmin").click(function() {
    $(".adminContent").toggle();
    $("#hiddenAdminID").val(0);
    $("#inputFirstName").val('');
    $("#inputLastName").val('');
    $("#inputLocality").val('');
    $("#inputPhoneNumber").val('');
    $("#inputEmail").val('');
    $("#hiddenPassword").val('Password#1');
    $("#inputPhoneNumber").removeAttr("style");
    $(".subAdminPhno-prefix").hide();
    $("#imgAdminLogo").attr("src", "assets/img/noImage.gif");
    filePath = "";
    $(".btnSubmitAdmin").text("Add Sub Admin");
  });


  $("#adminLogoImageUrl1").off('click').on('change', function() {
      // console.log("image 1 upload click");
      var progressbox = $('#progressbox1');
      var progressbar = $('#progressbar1');
      var statustxt = $('#statustxt1');

      $("#preview1").html('');

      $("#FileURLUploadImage1").ajaxForm({
        target: '#preview1',
        beforeSubmit: function() {
              //                    console.log('v');

            },
            uploadProgress: function(event, position, total, percentComplete) {
              /*                    console.log("on  progress");
              */
              progressbar.width(percentComplete + '%') //update progressbar percent complete
                  /*                    console.log(percentComplete);
                  */
              statustxt.html(percentComplete + '%'); //update status text
              $('#progressbar1').css("width", percentComplete + "%");
              $('#progressbox1').css("margin", "-40px 10px 10px 270px");
              $('#progressbox1').show();
              $('#progressbar1').show();

              if (percentComplete > 50) {
                  /*                         console.log("if : "+percentComplete);
                  */
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
                  /*                    console.log('z ' + result);
                  */
                  filePath = result.slice(4);

                  $("#imgAdminLogo").attr('src', domainAddress + filePath);
                  $("#imgAdminLogo").css("height", "80px").css("width", "100px").css("border", "");
                  $(".fileupload-preview1").text(domainAddress + filePath);
                  $(".errorInfo").hide();
                  $(".errorInfo").text("");
                  $("#btnSubmitAdmin").attr("disabled", false);
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
      $(".errorInfo").show();
      $("#inputFirstName").css("border-color", "red");
      $(".errorInfo").text("* Enter the First Name");
      $(".btnSubmitAdmin").attr("disabled", true);
      return false;
    } else {
      $(".errorInfo").hide();
      $(".errorInfo").text("");
      $("#inputFirstName").css("border-color", "rgba(0,0,0,.12)");
      $(".btnSubmitAdmin").attr("disabled", false);
    }
  });


  $("#inputLastName").keyup(function() {
    var inputLastName = $("#inputLastName").val();
    if (inputLastName == "") {
      $(".errorInfo").show();
      $("#inputLastName").css("border-color", "red");
      $(".errorInfo").text("* Enter the Last Name");
      $(".btnSubmitAdmin").attr("disabled", true);
      return false;
    } else {
      $(".errorInfo").hide();
      $(".errorInfo").text("");
      $("#inputLastName").css("border-color", "rgba(0,0,0,.12)");
      $(".btnSubmitAdmin").attr("disabled", false);
    }
  });




  $("#inputEmail").keyup(function() {
    var inputEmail = $("#inputEmail").val();
    if (inputEmail == "") {
      $(".errorInfo").show();
      $("#inputEmail").css("border-color", "red");
      $(".errorInfo").text("* Enter the EmailID");
      $(".btnSubmitAdmin").attr("disabled", true);
      return false;
    } else {
      $(".errorInfo").hide();
      $(".errorInfo").text("");
      $("#inputEmail").css("border-color", "rgba(0,0,0,.12)");
      $(".btnSubmitAdmin").attr("disabled", false);
    }
  });

  $("#inputPhoneNumber").keyup(function() {
    var inputPhoneNumber = $("#inputPhoneNumber").val();
    if (inputPhoneNumber == "") {
      $(".subAdminPhno-prefix").hide();
      $("#inputPhoneNumber").removeAttr('style');
      $(".errorInfo").show();
      $("#inputPhoneNumber").css("border-color", "red");
      $(".errorInfo").text("* Enter the Phone Number");
      $(".btnSubmitAdmin").attr("disabled", true);
      return false;
    } else {
      $(".subAdminPhno-prefix").show();
      $("#inputPhoneNumber").css("padding", "10px 10px 12px 31px");
      $(".errorInfo").hide();
      $(".errorInfo").text("");
      $("#inputPhoneNumber").css("border-color", "rgba(0,0,0,.12)");
      $(".btnSubmitAdmin").attr("disabled", false);
    }
  });




  $(".btnSubmitAdmin").click(function() {
    var hiddenAdminID = $("#hiddenAdminID").val();
    var title = $("#inputTitle").val();
    var firstName = $("#inputFirstName").val();
    var lastName = $("#inputLastName").val();
    var getLocality = $("#inputLocality").val();
    var phoneNumber = "+44" + $("#inputPhoneNumber").val();
    var emailID = $("#inputEmail").val();
    $("#getLoadingModalContent").addClass('md-show');
    var password = $("#hiddenPassword").val();




    if (title == "") {
      $(".errorInfo").show();
      $(".errorInfo").text("* Enter the Title");
      $("#inputTitle").css("border-color", "red");
      $("#getLoadingModalContent").removeClass('md-show');
      $("#btnSubmitAdmin").attr("disabled", true);
      return false;
    }


    if (firstName == "") {
      $(".errorInfo").show();
      $(".errorInfo").text("* Enter the First Name");
      $("#inputFirstName").css("border-color", "red");
      $("#getLoadingModalContent").removeClass('md-show');
      $("#btnSubmitAdmin").attr("disabled", true);
      return false;
    }

    if (lastName == "") {
      $(".errorInfo").show();
      $(".errorInfo").text("* Enter the Last Name");
      $("#inputLastName").css("border-color", "red");
      $("#getLoadingModalContent").removeClass('md-show');
      $("#btnSubmitAdmin").attr("disabled", true);
      return false;
    }

    if (emailID == "") {
      $(".errorInfo").show();
      $(".errorInfo").text("* Enter the E-mail");
      $("#inputEmail").css("border-color", "red");
      $("#getLoadingModalContent").removeClass('md-show');
      $("#btnSubmitAdmin").attr("disabled", true);
      return false;
    }

    if (!isValidEmailAddress(emailID)) {
      $(".errorInfo").css("border-color", "red");
      $(".errorInfo").show();
      $(".errorInfo").text("* Please Enter the Proper Email ID.");
      $("#inputEmail").css("border-color", "red");
      $("#getLoadingModalContent").removeClass('md-show');
      $("#btnSubmitAdmin").attr("disabled", true);
      return false;
    }



    if (phoneNumber == "+44") {
      $(".errorInfo").show();
      $(".errorInfo").text("* Enter the Phone Number");
      $("#inputPhoneNumber").css("border-color", "red");
      $("#getLoadingModalContent").removeClass('md-show');
      $("#btnSubmitAdmin").attr("disabled", true);
      return false;
    }

    else {
      var dataForm = '{"Title":"' + title + '","Admin_ID":"' + adminUserID + '","FirstName":"' + firstName + '","LastName":"' + lastName + '","PhoneNumber":"' + phoneNumber + '","EmailID":"' + emailID + '","Password":"' + password + '","Logo":"' + filePath + '"}';
          /*            console.log(dataForm);
          */
          if (hiddenAdminID == 0) {
            var sendURL = domainAddress + 'CreateSubAdmin';
              /*                console.log(sendURL);
              */
              $.ajax({
                type: "POST",
                url: sendURL,
                data: dataForm,
                success: function(dataCheck) {
                      /*                        console.log(dataCheck); 
                      */
                      if (dataCheck.Success == 1) {
                        getAllSubAdminList();
                        $("#inputTitle").val('');
                        $("#select2-inputTitle-container").html("Select Title");
                        $("#inputFirstName").val('');
                        $("#inputLastName").val('');

                        $("#inputPhoneNumber").val('');
                        $("#inputEmail").val('');

                        $("#inputPhoneNumber").removeAttr("style");
                        $(".subAdminPhno-prefix").hide();
                        $("#imgAdminLogo").attr("src", "assets/img/noImage.gif");
                        filePath = "";
                        $(".adminContent").hide();
                        $("#progressbox1").hide();
                        UIkit.modal.alert(dataCheck.message_text);
                      } else {
                        UIkit.modal.alert(dataCheck.message_text);
                        return false;
                      }
                      $(".cphno-prefix").hide();

                    }
                  });
} else {
  var sendURL = domainAddress + 'updateSubAdminDetails/' + hiddenAdminID;
              /*                console.log(sendURL);
              */
              $.ajax({
                type: "POST",
                url: sendURL,
                data: dataForm,
                success: function(dataCheck) {
                      /*                        console.log(dataCheck);
                      */
                      if (dataCheck.Success == 1) {
                        getAllSubAdminList();
                        $("#hiddenAdminID").val(0);
                        $("#inputTitle").val('');
                        $("#select2-inputTitle-container").html("Select Title");
                        $("#inputFirstName").val('');
                        $("#inputLastName").val('');

                        $("#inputEmail").val('');
                        $("#inputPhoneNumber").val('');
                        $("#inputPhoneNumber").removeAttr("style");
                        $(".subAdminPhno-prefix").hide();
                        $(".adminContent").hide();
                        $("#imgAdminLogo").attr("src", "assets/img/noImage.gif");
                        filePath = "";
                        $("#progressbox1").hide();
                        $(".btnSubmitAdmin").text("Add Sub Admin");
                        UIkit.modal.alert(dataCheck.message_text);
                      } else {
                        UIkit.modal.alert(dataCheck.message_text);
                        return false;
                      }
                    }
                  });

}
}
});



  function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  }



  function getAllSubAdminList(adminUserID) {
      /*        console.log("getAllSubAdminList called");
      */
      adminUserID = localStorage.getItem("MyRequest_AdminID");
      $.get(domainAddress + "GetAllSubAdminValues/" + adminUserID, {}, function(result) {
          //console.log(result);
          $(".allSubAdminList").html('');
          if (result.record_count == 0) {
            $(".allSubAdminList").append("<tr> <td id='autoGenerate-0'>No records Found</td> <td id='adminName-0'> </td> <td id='businessName-0'> </td> <td id='emailID-0'> </td> <td id='isApproved-0'> </td> <td class='editAdmin' id='editAdmin-0'> </td> <td class='deleteAdmin' id='deleteAdmin-0'> </td> </tr>");
          } else {
            for (var subAdminInfo in result.records) {
              var dueColor;
                  //debugger;
                  if (result.records[subAdminInfo].DateDiff < -5) {
                    dueColor = "green";
                  } else if (result.records[subAdminInfo].DateDiff < 0) {
                    dueColor = "Orange";
                  } else if (result.records[subAdminInfo].DateDiff > 0 && result.records[subAdminInfo].DateDiff < 7) {
                    dueColor = "Red";
                  } else if (result.records[subAdminInfo].DateDiff > 7) {
                    dueColor = "blue";
                  }
                  $(".allSubAdminList").append("<tr> <td id='adminName-" + result.records[subAdminInfo].SubAdminID + "'>" + result.records[subAdminInfo].FirstName + " " + result.records[subAdminInfo].LastName + "</td> <td id='phoneNumber-" + result.records[subAdminInfo].SubAdminID + "'>" + result.records[subAdminInfo].PhoneNumber + "</td> <td id='emailID-" + result.records[subAdminInfo].SubAdminID + "'>" + result.records[subAdminInfo].EmailID + "</td> <td ><a class='editAdmin' id='editAdminID-" + result.records[subAdminInfo].SubAdminID + "' style='cursor:pointer;'><i class='fa fa-pencil'></i></a></td> <td ><a class='deleteAdmin' id='deleteAdmin-" + result.records[subAdminInfo].SubAdminID + "' style='cursor:pointer;' data-toggle='modal' class='config' href='Contractor.html#CreateContractorModal'><i class='fa fa-trash trash fa-1x'></i></a></td> </tr>");


                }


                $('#subAdminList').DataTable({
                  createdRow: function(row) {
                    $('td', row).attr('tabindex', 0);
                  }
                });
                $(".dataTables_paginate").hide();
                $(".dataTables_length").hide();
                $(".dataTables_info").hide();
                $("#subAdminList_filter").show();




                $(".editAdmin").on('click', function(e) {
                  $("body").animate({
                    scrollTop: 0
                  }, 'slow');
                  var editAdminID = this.id.replace('editAdminID-', '');
                  $("#hiddenAdminID").val(editAdminID);

                  $.get(domainAddress + "getSubAdminDetails/" + editAdminID, {}, function(result) {
                      /*                        console.log(result);
                      */
                      var isFourExistNo = 0;
                      var isEmerFourExistNo = 0;
                      for (var getAdmin in result.records) {
                        $("#inputTitle").val(result.records[getAdmin].Title);
                        $("#select2-inputTitle-container").html(result.records[getAdmin].Title);
                        $("#inputFirstName").val(result.records[getAdmin].FirstName);
                        $("#inputLastName").val(result.records[getAdmin].LastName);

                        $("#inputEmail").val(result.records[getAdmin].EmailID);
                        $("#hiddenPassword").val(result.records[getAdmin].Password);
                        isFourExistNo = result.records[getAdmin].PhoneNumber.slice(0, 3);
                          //console.log(isFourExistNo+" === "+result.records[getAdmin].PhoneNumber.slice(3));
                          if (isFourExistNo == "+44") {
                            $("#inputPhoneNumber").val(result.records[getAdmin].PhoneNumber.slice(3));
                            $(".subAdminPhno-prefix").show();
                            $("#inputPhoneNumber").css("padding", "10px 10px 12px 31px");
                          } else {
                            $("#inputPhoneNumber").val(result.records[getAdmin].PhoneNumber);
                            $(".subAdminPhno-prefix").hide();
                            $("#inputPhoneNumber").removeAttr("style");
                          }

                          if (result.records[getAdmin].Logo == "" || result.records[getAdmin].Logo == null) {
                            $("#imgAdminLogo").attr("src", "assets/img/noImage.gif");
                          } else {
                            $("#imgAdminLogo").attr("src", domainAddress + result.records[getAdmin].Logo);
                          }
                          filePath = result.records[getAdmin].Logo;
                          $(".md-input-wrapper").addClass("md-input-filled");
                          $(".adminContent").show();
                          $(".btnSubmitAdmin").text("Update Sub Admin");
                        }
                      });

});

  $(".deleteAdmin").on('click', function(e) {
    var getAdminID = this.id.replace('deleteAdmin-', '');

    UIkit.modal.confirm('Are you sure?', function() {
      $.post(domainAddress + 'DeleteSubAdminDetails/' + getAdminID, function(e) {
                          /*                            console.log(e);
                          */
                          $("#rowID-" + getAdminID).remove();
                          getAllSubAdminList();
                          UIkit.modal.alert('Sub Admin Deleted Successfully');
                        });
    });

              }); // deleteSpeciality

}
});
}