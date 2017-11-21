var getPhoneCode = "";
var getcountryCode = "";
$(function() {
   getPhoneCode = localStorage.getItem("MyRequest_PhoneCode-prefix");
   getcountryCode = localStorage.getItem("MyRequest_countryCode");
   
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

var adminUserID = 0;
var isAppInstalled = 0;
var occupancy = "";
var homeInsurance = "";
var getPropertyManaged = "";
var imageUrl1 = "";
var userTenantCountLimit = 0;
var maxProp = 1;
var propertyId = "";
var dataAddPropertyForm = "";
var dataAddPropertyFormArr = new Array();
var agencyCode = localStorage.getItem('MyRequest_LettingAgencyCode');
var getValue = "";
var propertyAddress = "";
var hiddenIsElectricity = "0";
var hiddenIsGas = "0";
var hiddenIsWater = "0";
var hiddenIsCouncil = "0";
var hiddenAvailTenantInsurance = "0";
var NoOfTenants = "0";

$(window).load(function() {
    $("#getLoadingModalContent").removeClass('md-show');
});

$(document).ready(function() {
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
        $.get(domainAddress + "getAdminDetails/" + adminUserID, function(result) {
            if (result.record_count == 0) {

            } else {
                for (var getUserInfo in result.records) {
                    $(".getUserName").text(result.records[getUserInfo].AdminFirstName+" "+result.records[getUserInfo].AdminLastName);
                }
            }
        });
        // $(".getUserName").text(adminUserName);
        $("#FileURLUploadImage1").attr("action",domainAddress+"uploadUserImage.php");
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

    $.get(domainAddress + "GetSpecialityList", function(result) {
        $("#inputSpeciality").html('');
        $("#inputSpeciality").html("<option value='0'>Select Speciality</option>");
        if (result.record_count == 0) {
            $("#inputSpeciality").append("<option value='0'>Select Speciality</option>");
        } else {
            for (speciality in result.records) {
                $("#inputSpeciality").append("<option value='" + result.records[speciality].SpecialityID + "'>" + result.records[speciality].SpecialityName + "</option>");
            }

        }
    });


    $("#enterPageNO").val(maxProp);
    getTenantsList(getValue);
    $(".getLettingAgencyBusinessName").text("My Tenants - " + businessName );


    adminUserID = localStorage.getItem("MyRequest_AdminID");
    $.get(domainAddress + "GetPropertyName/" + adminUserID, {}, function(result) {
        $("#caseProperty").html('');
        $("#caseProperty").append("<option value='0'>Select Property</option>");
        if(result.record_count==0){
            $("#caseProperty").append("<option value='0'>No Property Found</option>");
        }
        else{
         for (var Property in result.records) {
            $("#caseProperty").append("<option value='" + result.records[Property].PropertyRegister + "' ref='" + result.records[Property].PropAddress + "' propID='"+result.records[Property].PropertyRegister+"' name='"+result.records[Property].NoOfTenants+"'>" + result.records[Property].PropOwnerName + " - " + result.records[Property].PropOwnerEmail + " - " + result.records[Property].PropOwnerPhone + " - " + result.records[Property].PropAddress + "</option>");
        } 
    }

    $("#caseProperty").select2();


    }); // GetAllPropertyList

    $("#inputTitle").select2();



}); // ready

$("#inputMobileNumber").on('blur', function(e) {
    var getMobileNumber = $("#" + this.id).val();
    console.log(domainAddress + "GetUserDetailsValue/" + getMobileNumber + "/"+getcountryCode+"/"+adminUserID);
    $.get(domainAddress + "GetUserDetailsValue/" + getMobileNumber + "/"+getcountryCode+"/"+adminUserID, function(result) {
        if (result.record_count == 0) {} else {
            for (var getUserDetails in result.records) {
                $("#hiddenTenantID").val(result.records[getUserDetails].UserRegID);
                $("#getName").val(result.records[getUserDetails].Name);
                $("#getLastName").val(result.records[getUserDetails].LastName);
                $("#inputTitle").val(result.records[getUserDetails].Title);
                $("#select2-inputTitle-container").html(result.records[getUserDetails].Title);
                $("#inputEmailID").val(result.records[getUserDetails].EmailID);
                $(".md-input-wrapper").addClass("md-input-filled");

            }
        }


    });
});

$(".btnSearch").click(function() {
    getValue = $("#inputSearch").val();
    getTenantsList(getValue);
});

changesRadioProperty();

$("#inputMobileNumber").keypress(function(e) {

    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {


        return false;
    }
});


$("#getLeadTenant").on('change', function() {
    if (this.checked) {
        $("#hiddenIsLeadTenant").val(1);
    } else {
        $("#hiddenIsLeadTenant").val(0);
    }
});

$("#addTenant").click(function() {
    $("#inputTitle").val(0);
    $("#getName").val('');
    $("#getLastName").val('');
    $("#inputMobileNumber").val('');
    $("#inputEmailID").val('');
    $(".getPropertyUtility").hide();
    $("#hiddenIsLeadTenant").val(0);
    $('.leadTenant > span').css('box-shadow', 'rgba(0, 0, 0, 0.258824) 0px 0px 0px 0px inset').css('border-color', 'rgba(0, 0, 0, 0.258824)').css('transition', 'border 0.4s, box-shadow 0.4s').css('background-color', 'rgba(0, 0, 0, 0.258824)');
    $('.leadTenant > span > small').css('left', '0px').css('transition', 'background-color 0.4s, left 0.2s').css('background-color', 'rgb(250, 250, 250)');
    $("#getLeadTenant").prop("checked", false);
});


$(".btnSubmitTenantProperty").click(function() {
    var hiddenTenantID = $("#hiddenTenantID").val();
    propertyId = $("#caseProperty").val();
    var title = $("#inputTitle").val();
    var name = $.trim($("#getName").val());
    var lastName = $.trim($("#getLastName").val());
    var mobileNumber = $("#inputMobileNumber").val();
    var emailID = $("#inputEmailID").val();

    hiddenIsElectricity = $("#hiddenIsElectricity").val();
    hiddenIsGas = $("#hiddenIsGas").val();
    hiddenIsWater = $("#hiddenIsWater").val();
    hiddenIsCouncil = $("#hiddenIsCouncil").val();
    hiddenIsLeadTenant = $("#hiddenIsLeadTenant").val();

    if (title == "Select Title") {
        $(".help-block").css("border-color", "red");
        $(".help-block").show();
        $(".help-block").text("* Select the Title");
        $("#select2-inputTitle-container").css("border", "1px solid red");
        $(".btnSubmitTenantProperty").attr("disabled", true);
        return false;
    }

    if (name == "") {
        $(".help-block").css("border-color", "red");
        $(".help-block").show();
        $(".help-block").text("* Enter the First Name");
        $("#getName").css("border-color", "red");
        $(".btnSubmitTenantProperty").attr("disabled", true);
        return false;
    }

    if (lastName == "") {
        $(".help-block").css("border-color", "red");
        $(".help-block").show();
        $(".help-block").text("* Enter the Last Name");
        $("#getLastName").css("border-color", "red");
        $(".btnSubmitTenantProperty").attr("disabled", true);
        return false;
    }

    if (emailID == "") {
        $(".help-block").css("border-color", "red");
        $(".help-block").show();
        $(".help-block").text("* Enter the Email ID");
        $("#inputEmailID").css("border-color", "red");
        $(".btnSubmitTenantProperty").attr("disabled", true);
        return false;
    }

    if (!isValidEmailAddress(emailID)) {
        $(".help-block").css("border-color", "red");
        $(".help-block").show();
        $(".help-block").text("* Please Enter the Proper Email ID.");
        $("#inputEmailID").css("border-color", "red");
        $(".btnSubmitTenantProperty").attr("disabled", true);
        return false;
    }

    if (mobileNumber == "+44" || mobileNumber == "+91" || mobileNumber == "+1") {
        $(".help-block").css("border-color", "red");
        $(".help-block").show();
        $(".help-block").text("* Enter the Mobile Number");
        $("#inputMobileNumber").css("border-color", "red");
        $(".btnSubmitTenantProperty").attr("disabled", true);
        return false;
    }


    if (propertyId == 0 || propertyId == null) {
        $(".help-block").css("border-color", "red");
        $(".help-block").show();
        $(".help-block").text("* Select Atleast one Property");
        $("#select2-caseProperty-container").css("border", "1px solid red");
        $(".btnSubmitTenantProperty").attr("disabled", true);
        return false;
    } else {
        var modal = UIkit.modal("#modalTenantInsurance");
        modal.show();
    }
});


$(".btnSubmitTenantInsurance").click(function() {
    var hiddenTenantID = $("#hiddenTenantID").val();
    propertyId = $("#caseProperty").val();
    var title = $("#inputTitle").val();
    var name = $("#getName").val().replace(/["']/g, "`");
    var lastName = $("#getLastName").val().replace(/["']/g, "`");
    var mobileNumber = getPhoneCode+$("#inputMobileNumber").val();
    var emailID = $("#inputEmailID").val();

    hiddenIsElectricity = $("#hiddenIsElectricity").val();
    hiddenIsGas = $("#hiddenIsGas").val();
    hiddenIsWater = $("#hiddenIsWater").val();
    hiddenIsCouncil = $("#hiddenIsCouncil").val();
    var hiddenIsLeadTenant = $("#hiddenIsLeadTenant").val();
    hiddenAvailTenantInsurance = $("#hiddenAvailTenantInsurance").val();
    var hiddenPropertyAddress = $('#hiddenPropertyAddress').val();
    var currentdate = new Date();
    var getDateValue = currentdate.getDate() + "." + (currentdate.getMonth() + 1) + "." + currentdate.getFullYear();

    var dataForm = '{"PropertyID":"' + propertyId + '","AdminID":"' + adminUserID + '","UserRegID":"' + hiddenTenantID + '","Title":"' + title + '","Name":"' + name + '","LastName":"' + lastName + '","MobileNumber":"' + mobileNumber + '","Email":"' + emailID + '","IsElectricity":"' + hiddenIsElectricity + '","IsGas":"' + hiddenIsGas + '","IsWater":"' + hiddenIsWater + '","IsCouncil":"' + hiddenIsCouncil + '","IsAvailTenantInsurance":"' + hiddenAvailTenantInsurance + '","Date":"' + getDateValue + '","PropertyAddress":"' + hiddenPropertyAddress + '"}';
    console.log(dataForm);
    var modal = UIkit.modal("#modalTenantInsurance");
    modal.hide();
    var sendURL = domainAddress + 'CreateTenantUtilityForProperty';
    console.log(sendURL);
    $("#getLoadingModalContent").addClass('md-show');
    $.ajax({
        type: "POST",
        url: sendURL,
        data: dataForm,
        success: function(dataCheck) {
            console.log(dataCheck);
            $("#getLoadingModalContent").removeClass('md-show');
            if (dataCheck.status == "success") {
                getTenantPropertyList(hiddenTenantID);
                getUserTenantUtilityList(hiddenTenantID)
                userTenantCountLimit = 0;
                getTenantsList(getValue);
                $(".showProperty").show();
                $("#inputTitle").val(0);
                $("#select2-inputTitle-container").html("Select Title");
                $("#getName").val('');
                $("#getLastName").val('');
                $("#inputMobileNumber").val('');
                $("#inputEmailID").val('');
                $("#caseProperty").val(0);
                $("#hiddenIsLeadTenant").val(0);
                $('.leadTenant > span').css('box-shadow', 'rgba(0, 0, 0, 0.258824) 0px 0px 0px 0px inset').css('border-color', 'rgba(0, 0, 0, 0.258824)').css('transition', 'border 0.4s, box-shadow 0.4s').css('background-color', 'rgba(0, 0, 0, 0.258824)');
                $('.leadTenant > span > small').css('left', '0px').css('transition', 'background-color 0.4s, left 0.2s').css('background-color', 'rgb(250, 250, 250)');
                $("#getLeadTenant").prop("checked", false);
                $("#imgContract").attr("src", "assets/img/sign-in.jpg");
                $("#progressbox1").hide();
                $(".tenantcno-prefix").hide();
                $(".tenantContent").css("border", "1px solid white");
                $("#hiddenTenantID").val(0);
                $(".md-input-wrapper").removeClass("md-input-filled");
                $("#select2-caseProperty-container").html("Select Property");
                UIkit.modal.alert(dataCheck.message_text);
            } else {
                UIkit.modal.alert(dataCheck.message_text);
                return false;
            }

        }
    });
});

$("#caseProperty").on('change', function() {
    NoOfTenants = $(this).find('option:selected').attr("name");
    NoOfTenants = parseInt(NoOfTenants) + parseInt(1);
    propertyId = this.value;
    if (this.value == 0 || this.value == null) {
        $(".help-block").show();
        $(".help-block").css("border-color", "red");
        $(".help-block").text("* Select the Property");
        $("#select2-caseProperty-container").css("border", "1px solid red");
        $(".btnSubmitTenant").attr("disabled", true);
    } else {
        var element = $(this).find('option:selected');
        var getAddress = element.attr("ref");
        dataAddPropertyFormArr = new Array();
        $('#hiddenPropertyAddress').val(getAddress);
        $(".help-block").css("border-color", "#444");
        $(".help-block").hide();
        $(".help-block").text("");
        $("#select2-caseProperty-container").css("border", "");
        $(".btnSubmitTenant").attr("disabled", false);

        var data = {
            'Property_RegisterID':propertyId,
            'AdminID':adminUserID,
            'PropertyAddress':getAddress,
            'IsElectricity':hiddenIsElectricity,
            'IsGas':hiddenIsGas,
            'IsWater':hiddenIsWater,
            'IsCouncil':hiddenIsCouncil,
            'IsAvailTenantInsurance':hiddenAvailTenantInsurance
        }
        dataAddPropertyFormArr.push(data);
    }
});



$("#userImageUrl").off('click').on('change', function() {
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
            $('#progressbox1').css("margin", "-20px 10px 10px 0px");
            $('#progressbox1').show();
            $('#progressbar1').show();

            if (percentComplete > 50) {
                console.log("if : " + percentComplete);
                statustxt.css('color', '#fff');
                statustxt.html(percentComplete + '%'); //change status text to white after 50%
                $('#progressbar1').css("width", percentComplete + "%");
                $('#progressbox1').css("margin", "-20px 10px 10px 0px");
                $('#progressbox1').show();
                $('#progressbar1').show();
            }
            $(".btnSubmitTenant").attr("disabled", true);
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
                $('#progressbox1').css("margin", "-20px 10px 10px 0px");
                $('#progressbox1').show();
                $('#progressbar1').show();
                console.log('z ' + result);
                imageUrl1 = result;
                console.log(imageUrl1);
                $(".help-block").hide();
                $(".help-block").text("");
                $(".btnSubmitTenant").attr("disabled", false);
                $("#imgContract").attr('src', domainAddress + result);
                $("#imgContract").css("height", "80px").css("width", "110px").css("border", "");
                $(".fileupload-preview1").hide();
                $(".fileupload-preview1").text(domainAddress + result);
                $(".btnSubmitTenant").attr("disabled", false);
                $("#getLoadingModalContent").removeClass('md-show');

                $('#progressbox1').hide();
            }
        },
        error: function() {
            console.log('d');


        }
    }).submit();
});

$(".getTenant").click(function() {
    $("#inputTitle").val(0);
    $("#getName").val('');
    $("#getLastName").val('');
    $("#inputMobileNumber").val('');
    $("#inputEmailID").val('');
    $("#hiddenIsLeadTenant").val(0);
    $('.leadTenant > span').css('box-shadow', 'rgba(0, 0, 0, 0.258824) 0px 0px 0px 0px inset').css('border-color', 'rgba(0, 0, 0, 0.258824)').css('transition', 'border 0.4s, box-shadow 0.4s').css('background-color', 'rgba(0, 0, 0, 0.258824)');
    $('.leadTenant > span > small').css('left', '0px').css('transition', 'background-color 0.4s, left 0.2s').css('background-color', 'rgb(250, 250, 250)');
    $("#getLeadTenant").prop("checked", false);
    $("#imgContract").attr("src", "assets/img/sign-in.jpg");
    $(".showProperty").hide();
    $(".tenantcno-prefix").hide();
    $(".tenantContent").css("border", "1px solid white");
    isAppInstalled = 0;
    $("#hiddenTenantID").val(0);
    $(".md-input-wrapper").removeClass("md-input-filled");
    $(".btnSubmitTenant").text("Add Tenant");
    $(".tenantContent").toggle();
});

$(".logOut").click(function() {
    logOutClearCatch();
});

$("#leftArrow").click(function() {
    userTenantCountLimit = 0;
    maxProp = 1;
    $("#enterPageNO").val(1);
    $("#getLoadingModalContent").addClass('md-show');
    getTenantsList(getValue);
    if (maxProp < lastPage) {
        $("#nextPage").attr("disabled", false);
    }
});

$("#rightArrow").click(function() {
    $("#previousPage").removeAttr("disabled");
    userTenantCountLimit = (9 * lastPage) - 9;
    maxProp = lastPage;
    $("#enterPageNO").val(lastPage);
    $("#getLoadingModalContent").addClass('md-show');
    getTenantsList(getValue);
});

$("#previousPage").click(function() {
    $("#nextPage").attr("disabled", false);
    if (userTenantCountLimit == 0) {
        userTenantCountLimit = 0;
        $("#previousPage").attr("disabled", "disabled");
    } else {
        userTenantCountLimit -= 9;
        $("#previousPage").removeAttr("disabled");
    }
    if (userTenantCountLimit == 0) {
        $("#previousPage").attr("disabled", "disabled");
    }
    maxProp--;
    if (maxProp == 0) {
        $("#enterPageNO").val('');
    } else {
        $("#enterPageNO").val(maxProp);
    }
    $("#getLoadingModalContent").addClass('md-show');
    getTenantsList(getValue);
});


$("#nextPage").click(function() {
    $("#previousPage").removeAttr("disabled");
    userTenantCountLimit += 9;
    
    if (maxProp == lastPage) {
        $("#nextPage").attr("disabled", true);
    } else {
        $("#nextPage").attr("disabled", false);
        maxProp++;
        $("#enterPageNO").val(maxProp);
        if (maxProp <= lastPage) {
            $("#getLoadingModalContent").addClass('md-show');
            getTenantsList(getValue);
        }
    }
});



$("#enterPageNO").on("change", function(e) {
    if ($("#enterPageNO").val() < lastPage) {
        maxProp++;
        $("#enterPageNO").val(maxProp);
    }

    userTenantCountLimit = 9 * ($("#enterPageNO").val() - 1);
    $("#getLoadingModalContent").addClass('md-show');
    getTenantsList(getValue);
});



$("#enterPageNO").keyup(function() {
    if ($("#enterPageNO").val() < lastPage) {
        maxProp++;
        $("#enterPageNO").val(maxProp);
    }

    userTenantCountLimit = 9 * ($("#enterPageNO").val() - 1);
    $("#getLoadingModalContent").addClass('md-show');
    getTenantsList(getValue);
});


function getTenantsList(getValue) {
    if (getValue == "" || getValue == undefined) {
        dataForm = '{"Limit":"' + parseInt(userTenantCountLimit) + '","AdminID":"' + adminUserID + '"}';
        sendURL = domainAddress + "UserTenantsByCount";
    } else {
        dataForm = '{"Limit":"' + parseInt(userTenantCountLimit) + '","SearchValue":"' + getValue + '","AdminID":"' + adminUserID + '"}';
        sendURL = domainAddress + "SearchTenantList";
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
                $(".allTenantList").html('');
                $(".allTenantList").append("<tr id='rowID-0'><td id='name-0'>No Records Found</td> <td id='phoneNumber-0'>  </td><td id='emailID-0'> </td>  <td> </td> <td> </td></tr> ");
                $("#getLoadingModalContent").removeClass('md-show');
            } else {
                loadUserTenantsList(result);
            }
            } // ajax success
    }); // ajax POSTS
}

function loadUserTenantsList(result) {

    if (result.record_count == 0) {
        $("#nextPage").attr("disabled", true);
        var enterPageNO = $("#enterPageNO").val();
        enterPageNO--;
        $("#enterPageNO").val(enterPageNO);
        $("#enterPageNO").attr("disabled", true);
    } else {
        $("#enterPageNO").attr("disabled", false);
        $(".allTenantList").html('');


        if (result.record_count == result.All_Records_Count) {
            $(".pageCount").show();
            $("#nextPage").attr("disabled", "disabled");
        } else if (result.record_count < 9 && result.record_count != 0) {
            $(".pageCount").show();
            $("#nextPage").attr("disabled", "disabled");
        } else if (result.record_count >= 9) {
            $("#nextPage").removeAttr("disabled");
            $(".pageCount").show();
        }

        lastPage = parseInt(result.All_Records_Count / 9) + 1;
        for (Client in result.records) {
            $(".allTenantList").append("<tr id='rowID-" + result.records[Client].UserRegID + "'><td id='name-" + result.records[Client].UserRegID + "'>" + result.records[Client].Name + " " + result.records[Client].LastName + "</td> <td id='phoneNumber-" + result.records[Client].UserRegID + "'> <a href='tel:" + result.records[Client].PhoneNumber + "'>" + result.records[Client].PhoneNumber + "</a></td><td id='emailID-" + result.records[Client].UserRegID + "'><a href='mailto:" + result.records[Client].EmailID + "' target='_top'>" + result.records[Client].EmailID + "</a> </td>  <td><a class='editTenant' id='editTenantID-" + result.records[Client].UserRegID + "' > <i class='fa fa-pencil pencil fa-1x'></i> </a></td><td><a class='deleteTenant' id='deleteTenantID-" + result.records[Client].UserRegID + "'> <i class='fa fa-trash trash fa-1x'></i> </a></td></tr> ");
        }

        $("#getLoadingModalContent").removeClass('md-show');

        var isFourExistNo = 0;
        var isOneExistNo = 0;
        $(".editTenant").on('click', function(e) {
            $(window).scrollTop(0);
            var editTenantID = this.id.replace('editTenantID-', '');
            $("#hiddenTenantID").val(editTenantID);
            $("#getLoadingModalContent").addClass('md-show');
            $(".getTenantsdate").hide();
            $("#inputStartDate").val('');
            $("#inputEndDate").val('');
            $.get(domainAddress + "GetUserTenant/" + editTenantID, {}, function(resultGetTenant) {
                for (var getTenant in resultGetTenant.records) {
                    $(".getTenantsdate").show();
                    $("#inputTitle").val(resultGetTenant.records[getTenant].Title);
                    $("#select2-inputTitle-container").html(resultGetTenant.records[getTenant].Title);
                    $("#getName").val(resultGetTenant.records[getTenant].Name);
                    $("#getLastName").val(resultGetTenant.records[getTenant].LastName);
                    isFourExistNo = resultGetTenant.records[getTenant].PhoneNumber.slice(0, 3);
                    isOneExistNo = resultGetTenant.records[getTenant].PhoneNumber.slice(0, 2);
                    if (isFourExistNo == "+44" || isFourExistNo == "+91") {
                        $("#inputMobileNumber").val(resultGetTenant.records[getTenant].PhoneNumber.slice(3));
                    } else {
                        $("#inputMobileNumber").val(resultGetTenant.records[getTenant].PhoneNumber);
                    }

                    if (isOneExistNo == "+1") {
                        $("#inputMobileNumber").val(resultGetTenant.records[getTenant].PhoneNumber.slice(2));
                    } 

                    $("#inputEmailID").val(resultGetTenant.records[getTenant].EmailID);

                    if(resultGetTenant.records[getTenant].Property != undefined){
                        $("#caseProperty").val(resultGetTenant.records[getTenant].Property[0].PropertyID);
                        $("#select2-caseProperty-container").text(resultGetTenant.records[getTenant].PropertyInfo);
                    }
                    
                    isAppInstalled = resultGetTenant.records[getTenant].AppInstalled;
                    $(".tenantcno-prefix").show();
                    $("#inputMobileNumber").css("padding", "10px 25px 11px 35px !important");
                    if (isAppInstalled == 1) {
                        $(".tenantContent").css("border", "1px solid greenyellow");
                    } else {
                        $(".tenantContent").css("border", "1px solid red");
                    }

                    $("#imgContract").val(resultGetTenant.records[getTenant].imageurl1);
                    if (resultGetTenant.records[getTenant].UserImage == "" || resultGetTenant.records[getTenant].UserImage == null) {
                        $("#imgContract").attr("src", "assets/img/sign-in.jpg");
                        imageUrl1 = "";
                    } else {
                        imageUrl1 = resultGetTenant.records[getTenant].UserImage;
                        $("#imgContract").attr('src', domainAddress + imageUrl1);
                        $("#imgContract").css("height", "120px").css("width", "152px");
                    }

                    var getStartDate = resultGetTenant.records[getTenant].TenancyStart.split("-");
                    var finalStartDate = getStartDate[2] + "." + getStartDate[1] + "." + getStartDate[0];
                     
                    var getEndDate = resultGetTenant.records[getTenant].TenancyEnd.split("-");
                    var finalEndDate = getEndDate[2] + "." + getEndDate[1] + "." + getEndDate[0];
                    $("#inputStartDate").val(finalStartDate);
                    $("#inputEndDate").val(finalEndDate);
                }

                var hiddenTenantID = $("#hiddenTenantID").val();
                getTenantPropertyList(hiddenTenantID);
                var isLeadTenant = resultGetTenant.records[getTenant].IsLeadTenant;
                $("#hiddenIsLeadTenant").val(resultGetTenant.records[getTenant].IsLeadTenant);
                if (isLeadTenant == 1) {
                    $('.leadTenant > span').css('box-shadow', 'rgba(255, 179, 0, 0.498039) 0px 0px 0px 7px inset').css('border-color', 'rgba(255, 179, 0, 0.498039)').css('transition', 'border 0.4s').css('box-shadow', '0.4s').css('background-color', '1.2s').css('background-color', 'rgba(255, 179, 0, 0.498039)');
                    $('.leadTenant > span > small').css('left', '18px').css('transition', 'background-color 0.4s, left 0.2s').css('background-color', 'rgb(255, 179, 0)');
                    $("#getTenant").prop("checked", true);
                } else {
                    $('.leadTenant > span').css('box-shadow', 'rgba(0, 0, 0, 0.258824) 0px 0px 0px 0px inset').css('border-color', 'rgba(0, 0, 0, 0.258824)').css('transition', 'border 0.4s, box-shadow 0.4s').css('background-color', 'rgba(0, 0, 0, 0.258824)');
                    $('.leadTenant > span > small').css('left', '0px').css('transition', 'background-color 0.4s, left 0.2s').css('background-color', 'rgb(250, 250, 250)');
                    $("#getTenant").prop("checked", false);
                }
 
                $(".tenantContent").show();
                $(".showProperty").show();
                $("#getLoadingModalContent").removeClass('md-show');
                $(".btnSubmitTenant").html("Update Tenant");
                $(".md-input-wrapper").addClass("md-input-filled");
            });



        }); // editDepartment


$(".deleteTenant").on('click', function(e) {
    var deleteTenantID = this.id.replace('deleteTenantID-', '');

    UIkit.modal.confirm('Are you sure?', function() {
        $("#getLoadingModalContent").addClass('md-show');
        $.post(domainAddress + 'DeleteUserTenant/' + deleteTenantID + "/" + adminUserID, function(e) {
            $("#getLoadingModalContent").removeClass('md-show');
            $("#rowID-" + deleteTenantID).remove();
            getTenantsList(getValue);
            UIkit.modal.alert('Tenant Deleted Successfully');
        });
    });

        }); // deleteTenant

}

} // loadUserTenantsList



function getTenantPropertyList(hiddenTenantID) {
    $.get(domainAddress + "GetUserTenantPropertyList/" + hiddenTenantID, {}, function(resultProperty) {
        $(".allTenantPropertyList").html('');
        dataAddPropertyForm = "";
        dataAddPropertyFormArr = new Array();
        if (resultProperty.record_count == 0) {
            $(".allTenantPropertyList").append("<tr id='rowID-0'><td id='propName--0'>No records found</td> <td id='propEmail-0'>   </td> <td id='propMobile-0'>  </td>  <td id='propAddress-0'>  </td>  <td> </td> </tr> ");
        } else {
            for (property in resultProperty.records) {
                $(".allTenantPropertyList").append("<tr id='getPropertyRowID-" + resultProperty.records[property].PropAddPropertyID + "'><td id='propName-" + resultProperty.records[property].PropAddPropertyID + "'>" + resultProperty.records[property].PropOwnerName + "</td> <td id='propEmail-" + resultProperty.records[property].PropAddPropertyID + "'> <a href='mailto:" + resultProperty.records[property].PropOwnerEmail + "' target='_top'>" + resultProperty.records[property].PropOwnerEmail + "</a>  </td> <td id='propMobile-" + resultProperty.records[property].PropAddPropertyID + "'> <a href='tel:" + resultProperty.records[property].PropOwnerMobile + "'>" + resultProperty.records[property].PropOwnerMobile + "</a></td>  <td id='propAddress-" + resultProperty.records[property].PropAddPropertyID + "'>" + resultProperty.records[property].PropAddress + "," + resultProperty.records[property].PropCity + "," + resultProperty.records[property].PropPostalCode + "</td> <td> <button class='md-btn md-btn-danger btnDeleteProperty' id='btnDeleteProperty-" + resultProperty.records[property].PropAddPropertyID + "' ref='" + resultProperty.records[property].PropRegisterID + "'><i class='material-icons' style='color: white;'>delete</i></button></td> </tr> ");

                var data = {
                    'Property_RegisterID':resultProperty.records[property].PropRegisterID,
                    'AdminID':resultProperty.records[property].PropAdminID,
                    'PropertyAddress':resultProperty.records[property].PropAddress,
                    'IsElectricity':hiddenIsElectricity,
                    'IsGas':hiddenIsGas,
                    'IsWater':hiddenIsWater,
                    'IsCouncil':hiddenIsCouncil,
                    'IsAvailTenantInsurance':hiddenAvailTenantInsurance
                }
                dataAddPropertyFormArr.push(data);
            }



            $(".btnDeleteProperty").on('click', function() {
                var getAddPropertyID = this.id.replace('btnDeleteProperty-', '');
                var getPropertyRegID = $("#" + this.id).attr("ref");
                
                UIkit.modal.confirm('Do you want to remove the property?', function() {
                    $("#getLoadingModalContent").addClass('md-show');

                    $.post(domainAddress + 'DeleteAddProperty/' + getAddPropertyID, function(e) {
                        $("#getLoadingModalContent").removeClass('md-show');
                        getTenantPropertyList(hiddenTenantID);
                        getUserTenantUtilityList(hiddenTenantID)
                        UIkit.modal.alert('Property Deleted Successfully');
                    });

                });

            });
        }
        getUserTenantUtilityList(hiddenTenantID);
    });
}


function getUserTenantUtilityList(hiddenTenantID){
    $.get(domainAddress + "GetUserUtilityInfo/" + hiddenTenantID, {}, function(result) {
        $(".getPropertyUtility").show();
        if (result.record_count == 0) {
            $(".propertyUtility").html('');
            $(".propertyUtility").append("<tr> <td>No records found</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>");
        } else {
            $(".propertyUtility").html('');
            var isElectricity = "";
            var isGas = "";
            var isWater = "";
            var isCouncil = "";

            var cElectricity = "";
            var cGas = "";
            var cWater = "";
            var cCouncil = "";
            var UtilityType = "";
            for (var propertyUtility in result.records) {
                console.log(dataAddPropertyFormArr.length);
                if (result.records[propertyUtility].IsElectricity == 1) {
                    if(dataAddPropertyFormArr.length != 0)
                        dataAddPropertyFormArr[0].IsElectricity = "1";
                    isElectricity = '<i class="fa fa-check"></i>';
                    cElectricity = "Green";
                } else {
                    if(dataAddPropertyFormArr.length != 0)
                        dataAddPropertyFormArr[0].IsElectricity = "0";
                    isElectricity = '<i class="fa fa-times"></i>';
                    cElectricity = "Red";
                }

                if (result.records[propertyUtility].IsGas == 1) {
                    if(dataAddPropertyFormArr.length != 0)
                        dataAddPropertyFormArr[0].IsGas = "1";
                    isGas = '<i class="fa fa-check"></i>';
                    cGas = "Green";
                } else {
                    if(dataAddPropertyFormArr.length != 0)
                        dataAddPropertyFormArr[0].IsGas = "0";
                    isGas = '<i class="fa fa-times"></i>';
                    cGas = "Red";
                }

                if (result.records[propertyUtility].IsWater == 1) {
                    if(dataAddPropertyFormArr.length != 0)
                        dataAddPropertyFormArr[0].IsWater = "1";
                    isWater = '<i class="fa fa-check"></i>';
                    cWater = "Green";
                } else {
                    if(dataAddPropertyFormArr.length != 0)
                        dataAddPropertyFormArr[0].IsWater = "0";
                    isWater = '<i class="fa fa-times"></i>';
                    cWater = "Red";
                }

                if (result.records[propertyUtility].IsCouncil == 1) {
                    if(dataAddPropertyFormArr.length != 0)
                        dataAddPropertyFormArr[0].IsCouncil = "1";
                    isCouncil = '<i class="fa fa-check"></i>';
                    cCouncil = "Green";
                } else {
                    if(dataAddPropertyFormArr.length != 0)
                        dataAddPropertyFormArr[0].IsCouncil = "0";
                    isCouncil = '<i class="fa fa-times"></i>';
                    cCouncil = "Red";
                }
                if(result.records[propertyUtility].UtilityRegType == "move-in"){
                    UtilityType = "MOVE-IN";
                }

                if(result.records[propertyUtility].UtilityRegType == "move-out"){
                    UtilityType = "MOVE-OUT";
                }

                $(".propertyUtility").append("<tr> <td>" + UtilityType + "</td>  <td>" + moment(result.records[propertyUtility].Date).format('Do MMM YYYY,  h:mm a') + "</td> <td style='color:" + cElectricity + ";'>" + isElectricity + "</td> <td style='color:" + cGas + ";'>" + isGas + "</td> <td style='color:" + cWater + ";'>" + isWater + "</td> <td style='color:" + cCouncil + ";'>" + isCouncil + "</td> <td>" + result.records[propertyUtility].Status + "</td> </tr>");
            }
        }

    });
} // getUserTenantUtilityList

$("#getName").keyup(function() {
    var getName = $.trim($("#getName").val());
    if (getName == "") {
        $(".help-block").css("border-color", "red");
        $("#getName").css("border-color", "red");
        $(".help-block").show();
        $(".help-block").text("* Enter the First Name");
        $(".btnSubmitTenant").attr("disabled", true);
        return false;
    } else {
        $(".help-block").hide();
        $(".help-block").text("");
        $("#getName").css("border-color", "rgba(0,0,0,.12)");
        $(".btnSubmitTenant").attr("disabled", false);
        return false;
    }
});

$("#getLastName").keyup(function() {
    var getLastName = $.trim($("#getLastName").val());
    if (getLastName == "") {
        $(".help-block").css("border-color", "red");
        $("#getLastName").css("border-color", "red");
        $(".help-block").show();
        $(".help-block").text("* Enter the Last Name");
        $(".btnSubmitTenant").attr("disabled", true);
        return false;
    } else {
        $(".help-block").hide();
        $(".help-block").text("");
        $("#getLastName").css("border-color", "rgba(0,0,0,.12)");
        $(".btnSubmitTenant").attr("disabled", false);
        return false;
    }
});

$("#inputTitle").on('change', function() {
    var inputTitle = $("#inputTitle").val();
    if (inputTitle == "") {
        $(".help-block").css("border-color", "red");
        $(".help-block").show();
        $(".help-block").text("* Select the Title");
        $("#select2-inputTitle-container").css("border", "1px solid red");
        $(".btnSubmitTenant").attr("disabled", true);
        return false;
    } else {
        $(".help-block").hide();
        $(".help-block").text("");
        $("#select2-inputTitle-container").css("border", "1px solid transparent");
        $(".btnSubmitTenant").attr("disabled", false);
        return false;
    }
});

$("#inputEmailID").keyup(function() {
    var inputEmailID = $("#inputEmailID").val();
    if (inputEmailID == "") {
        $(".help-block").css("border-color", "red");
        $("#inputEmailID").css("border-color", "red");
        $(".help-block").show();
        $(".help-block").text("* Enter the Email");
        $(".btnSubmitTenant").attr("disabled", true);
        return false;
    } else {
        $(".help-block").hide();
        $(".help-block").text("");
        $("#inputEmailID").css("border-color", "rgba(0,0,0,.12)");
        $(".btnSubmitTenant").attr("disabled", false);
        return false;
    }
});

$("#inputMobileNumber").keyup(function() {
    var inputMobileNumber = $("#inputMobileNumber").val();
    if (inputMobileNumber == "") {
        $(".tenantcno-prefix").hide();
        $("#inputMobileNumber").removeAttr('style');
        $("#inputMobileNumber").css("border-color", "red");
        $(".help-block").show();
        $(".help-block").text("* Enter the Mobile Number");
        $(".btnSubmitTenant").attr("disabled", true);
        return false;
    } else {
        $(".tenantcno-prefix").show();
        $("#inputMobileNumber").css("padding", "10px 25px 11px 35px !important");
        $(".help-block").hide();
        $(".help-block").text("");
        $("#inputMobileNumber").css("border-color", "rgba(0,0,0,.12)");
        $(".btnSubmitTenant").attr("disabled", false);
        return false;
    }
});

$("#inputStartDate").on('change', function() {
    var inputStartDate = $("#inputStartDate").val();
    if (inputStartDate == "" || inputStartDate == 0) {
        $(".help-block").css("border-color", "red");
        $(".help-block").show();
        $(".help-block").text("* Select the Start Date");
        $("#inputStartDate").css("border", "1px solid red");
        $(".btnSubmitTenant").attr("disabled", true);
        return false;
    } else {
        $(".help-block").hide();
        $(".help-block").text("");
        $("#inputStartDate").css("border", "1px solid transparent");
        $(".btnSubmitTenant").attr("disabled", false);
        return false;
    }
});
$("#inputEndDate").on('change', function() {
    var inputEndDate = $("#inputEndDate").val();
    if (inputEndDate == "") {
        $(".help-block").css("border-color", "red");
        $(".help-block").show();
        $(".help-block").text("* Select the End Date");
        $("#inputEndDate").css("border", "1px solid red");
        $(".btnSubmitTenant").attr("disabled", true);
        return false;
    } else {
        $(".help-block").hide();
        $(".help-block").text("");
        $("#inputEndDate").css("border", "1px solid transparent");
        $(".btnSubmitTenant").attr("disabled", false);
        return false;
    }
});


$(".btnSubmitTenant").click(function() {

    var tenantID = $("#hiddenTenantID").val();
    var title = $("#select2-inputTitle-container").html();
    var name = $.trim($("#getName").val().replace(/["']/g, "`"));
    var lastName = $.trim($("#getLastName").val().replace(/["']/g, "`"));
    var mobileNumber = getPhoneCode+$("#inputMobileNumber").val();
    var emailID = $("#inputEmailID").val();
    var startDate = $("#inputStartDate").val();
    var endDate = $("#inputEndDate").val();
    var hiddenIsLeadTenant = $("#hiddenIsLeadTenant").val();
    var adminUserID = localStorage.getItem("MyRequest_AdminID");
    propertyId = $("#caseProperty").val();


    if(getcountryCode == "UK" || getcountryCode == "India"){
        if(mobileNumber.length != 13){
            $(".help-block").css("border-color", "red");
            $(".help-block").show();
            $(".help-block").text("* Enter the 10 digit Mobile Number");
            $("#inputMobileNumber").css("border-color", "red");
            $(".btnSubmitTenant").attr("disabled", true);
            return false;
        }  else {
            $(".help-block").css("border-color", "#444");
            $(".help-block").hide();
            $(".help-block").html("");
            $("#inputMobileNumber").css("border-color", "#444");
            $(".btnSubmitTenant").attr("disabled", false);
        } 
    } else {
        if(mobileNumber.length != 12){
            $(".help-block").css("border-color", "red");
            $(".help-block").show();
            $(".help-block").text("* Enter the 10 digit Mobile Number");
            $("#inputMobileNumber").css("border-color", "red");
            $(".btnSubmitTenant").attr("disabled", true);
            return false;
        }  else {
            $(".help-block").css("border-color", "#444");
            $(".help-block").hide();
            $(".help-block").html("");
            $("#inputMobileNumber").css("border-color", "#444");
            $(".btnSubmitTenant").attr("disabled", false);
        }
    }

    if (title == "Select Title") {
        $(".help-block").css("border-color", "red");
        $(".help-block").show();
        $(".help-block").text("* Select the Title");
        $("#select2-inputTitle-container").css("border", "1px solid red");
        $(".btnSubmitTenant").attr("disabled", true);
        return false;
    }

    else if (name == "") {
        $(".help-block").css("border-color", "red");
        $(".help-block").show();
        $(".help-block").text("* Enter the First Name");
        $("#getName").css("border-color", "red");
        $(".btnSubmitTenant").attr("disabled", true);
        return false;
    }

    else if (lastName == "") {
        $(".help-block").css("border-color", "red");
        $(".help-block").show();
        $(".help-block").text("* Enter the Last Name");
        $("#getLastName").css("border-color", "red");
        $(".btnSubmitTenant").attr("disabled", true);
        return false;
    }

    else if (emailID == "") {
        $(".help-block").css("border-color", "red");
        $(".help-block").show();
        $(".help-block").text("* Enter the Email ID");
        $("#inputEmailID").css("border-color", "red");
        $(".btnSubmitTenant").attr("disabled", true);
        return false;
    }

    else if (!isValidEmailAddress(emailID)) {
        $(".help-block").css("border-color", "red");
        $(".help-block").show();
        $(".help-block").text("* Please Enter the Proper Email ID.");
        $("#inputEmailID").css("border-color", "red");
        $(".btnSubmitTenant").attr("disabled", true);
        return false;
    }

    else if (mobileNumber == "+44" || mobileNumber == "+91" || mobileNumber == "+1") {
        $(".help-block").css("border-color", "red");
        $(".help-block").show();
        $(".help-block").text("* Enter the Mobile Number");
        $("#inputMobileNumber").css("border-color", "red");
        $(".btnSubmitTenant").attr("disabled", true);
        return false;
    }

    else if (propertyId == "" || propertyId == 0) {
        $(".help-block").css("border-color", "red");
        $(".help-block").show();
        $(".help-block").text("* Select Atleast one Property");
        $("#select2-caseProperty-container").css("border", "1px solid red");
        $(".btnSubmitTenant").attr("disabled", true);
        return false;
    }

    else if (startDate == "") {
        $(".help-block").css("border-color", "red");
        $(".help-block").show();
        $(".help-block").text("* Enter the Start Date");
        $("#inputStartDate").css("border-color", "red");
        $(".btnSubmitTenant").attr("disabled", true);
        return false;
    }

    else if (endDate == "") {
        $(".help-block").css("border-color", "red");
        $(".help-block").show();
        $(".help-block").text("* Enter the End Date");
        $("#inputEndDate").css("border-color", "red");
        $(".btnSubmitTenant").attr("disabled", true);
        return false;
    } 
    
    else {
        dataAddPropertyForm = "{'Property_RegisterID':'" + dataAddPropertyFormArr[0].Property_RegisterID + "','AdminID':'" + dataAddPropertyFormArr[0].AdminID + "','PropertyAddress':'"+dataAddPropertyFormArr[0].PropertyAddress+"','IsElectricity':'"+dataAddPropertyFormArr[0].IsElectricity+"','IsGas':'"+dataAddPropertyFormArr[0].IsGas+"','IsWater':'"+dataAddPropertyFormArr[0].IsWater+"','IsCouncil':'"+dataAddPropertyFormArr[0].IsCouncil+"','IsAvailTenantInsurance':'"+dataAddPropertyFormArr[0].IsAvailTenantInsurance+"'}";
        var finalDataAddProperty = new Array();
        finalDataAddProperty.push(dataAddPropertyForm);
        gotoDB(startDate,endDate,finalDataAddProperty);
    }
    


    function gotoDB(startDate,endDate,finalDataAddProperty) {

        var getFormatStartDate = startDate.split(".");
        var finalStartDate = getFormatStartDate[2] + "-" + getFormatStartDate[1] + "-" + getFormatStartDate[0];
        
        
        var getFormatEndDate = endDate.split(".");
        var finalEndDate = getFormatEndDate[2] + "-" + getFormatEndDate[1] + "-" + getFormatEndDate[0];
        var dataForm = '{"Title":"' + title + '","Name":"' + name + '","LastName":"' + lastName + '","MobileNumber":"' + mobileNumber + '","StartDate":"' + finalStartDate + '","EndDate":"' + finalEndDate + '","Email":"' + emailID + '","UserImage":"' + imageUrl1 + '","IsAppInstalled":"' + isAppInstalled + '","AdminID":"' + adminUserID + '","LettingAgencyCode":"0","IsLeadTenant":"' + hiddenIsLeadTenant + '", "Country":"'+ getcountryCode +'","PropertyID":"' + propertyId + '","NoOfTenants":"' + NoOfTenants + '","AddProperty":"' + finalDataAddProperty + '"}';

        var updateDataForm = '{"Title":"' + title + '","Name":"' + name + '","LastName":"' + lastName + '","MobileNumber":"' + mobileNumber + '","StartDate":"' + finalStartDate + '","EndDate":"' + finalEndDate + '","Email":"' + emailID + '","UserImage":"' + imageUrl1 + '","IsAppInstalled":"' + isAppInstalled + '","AdminID":"' + adminUserID + '","LettingAgencyCode":"0","IsLeadTenant":"' + hiddenIsLeadTenant + '", "Country":"'+ getcountryCode +'","PropertyID":"' + propertyId + '","AddProperty":"' + finalDataAddProperty + '"}';
        console.log(dataForm);
        if (tenantID == 0) {
            var sendURL = domainAddress + 'CreateUserTenant';
            console.log(sendURL);
            $("#getLoadingModalContent").addClass('md-show');
            $.ajax({
                type: "POST",
                url: sendURL,
                data: dataForm,
                success: function(dataCheck) {
                    console.log(dataCheck);
                    if (dataCheck.success == 0) {
                        $("#getLoadingModalContent").removeClass('md-show');
                        UIkit.modal.alert(dataCheck.message_text);
                        return false;
                    } else {
                        getTenantsList(getValue);
                        //$("#hiddenTenantID").val(dataCheck.TenantID);
                        $("#inputTitle").val(0);
                        $("#select2-inputTitle-container").html("Select Title");
                        $("#getName").val('');
                        $("#getLastName").val('');
                        $("#inputMobileNumber").val('');
                        $("#inputEmailID").val('');
                        $("#caseProperty").val(0);
                        $("#hiddenIsLeadTenant").val(0);
                        $('.leadTenant > span').css('box-shadow', 'rgba(0, 0, 0, 0.258824) 0px 0px 0px 0px inset').css('border-color', 'rgba(0, 0, 0, 0.258824)').css('transition', 'border 0.4s, box-shadow 0.4s').css('background-color', 'rgba(0, 0, 0, 0.258824)');
                        $('.leadTenant > span > small').css('left', '0px').css('transition', 'background-color 0.4s, left 0.2s').css('background-color', 'rgb(250, 250, 250)');
                        $("#getLeadTenant").prop("checked", false);
                        $("#imgContract").attr("src", "assets/img/sign-in.jpg");
                        $("#select2-caseProperty-container").html("Select Property");
                        $(".showProperty").hide();
                        isAppInstalled = 0;
                        dataAddPropertyForm = "";
                        dataAddPropertyFormArr = new Array();
                        $("#hiddenTenantID").val(0);
                        $(".btnSubmitTenant").text("Add Tenant");
                        $("#getLoadingModalContent").removeClass('md-show');
                        $(".md-input-wrapper").removeClass("md-input-filled");
                        $(".tenantContent").hide();
                        UIkit.modal.alert('Tenant Added Successfully');
                        // var modal = UIkit.modal("#modalTenantInsurance");
                        // modal.show();
                    }
                }
            });
        } else {
            $("#getLoadingModalContent").addClass('md-show');
            var sendURL = domainAddress + 'updateUserTenant/' + tenantID;
            console.log(sendURL);
            $.ajax({
                type: "POST",
                url: sendURL,
                data: updateDataForm,
                success: function(dataCheck) {
                    console.log(dataCheck);
                    if (dataCheck.success == 0) {
                        $("#getLoadingModalContent").removeClass('md-show');
                        UIkit.modal.alert(dataCheck.message_text);
                        return false;
                    } else {
                        getTenantsList(getValue);
                        // var modal = UIkit.modal("#modalTenantInsurance");
                        // modal.hide();
                        $("#inputTitle").val(0);
                        $("#select2-inputTitle-container").html("Select Title");
                        $("#getName").val('');
                        $("#getLastName").val('');
                        $("#inputMobileNumber").val('');
                        $("#inputEmailID").val('');
                        $("#caseProperty").val(0);
                        $("#hiddenIsLeadTenant").val(0);
                        $('.leadTenant > span').css('box-shadow', 'rgba(0, 0, 0, 0.258824) 0px 0px 0px 0px inset').css('border-color', 'rgba(0, 0, 0, 0.258824)').css('transition', 'border 0.4s, box-shadow 0.4s').css('background-color', 'rgba(0, 0, 0, 0.258824)');
                        $('.leadTenant > span > small').css('left', '0px').css('transition', 'background-color 0.4s, left 0.2s').css('background-color', 'rgb(250, 250, 250)');
                        $("#getLeadTenant").prop("checked", false);
                        $("#imgContract").attr("src", "assets/img/sign-in.jpg");
                        $("#select2-caseProperty-container").html("Select Property");
                        $(".showProperty").hide();
                        isAppInstalled = 0;
                        dataAddPropertyForm = "";
                        dataAddPropertyFormArr = new Array();
                        $("#hiddenTenantID").val(0);
                        $(".btnSubmitTenant").text("Add Tenant");
                        $("#getLoadingModalContent").removeClass('md-show');
                        $(".md-input-wrapper").removeClass("md-input-filled");
                        $(".tenantContent").hide();
                        UIkit.modal.alert('Tenant Updated Successfully');    
                    }

                }
            });
        } // sec if 
    } // gotoDB()
}); // .btnSubmitTenant