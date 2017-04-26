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


var maxProp = 1;
var utilityListCountLimit = 0;
var getStatus = "Awaiting Info";
var utilityUserID = 0;
var getValue = "";
$(window).load(function() {
    $("#getLoadingModalContent").removeClass('md-show');
});
$(document).ready(function() {
    console.log("ready call");
    $(".getUserUtilityListContact").hide('slow');
    $(".getUtility").show();
    utilityUserID = localStorage.getItem("UtilityUserID");
    var utilityAdminUserName = localStorage.getItem("UtilityUserName");
    if (utilityUserID == "" || utilityUserID == undefined) {
        window.location.href = 'utilityIndex.html';
    } else {
        $(".getUserName").text(utilityAdminUserName);
        $(".getLettingAgencyBusinessName").text("Notification");
    }
    $("#AdOfferType").select2();
    $(".md-overlay").css("background", "rgba(0,0,0,0.5)");
    $("#getLoadingModalContent").addClass('md-show');
    $("#UtilityRegType").select2();
    $("#inputGasInfo").select2();
    $("#inputElectricityInfo").select2();
    $("#inputCouncilInfo").select2();
    $("#inputWaterActionInfo").select2();
    $("#inputBroadbandInfo").select2();
    $("#inputMediaInfo").select2();

    $(".myRequestAdminLogo").attr("src", "").show();
    $("#previousPage").attr("disabled", true);
    $("#enterPageNO").val(maxProp);
    getUtilityList(getValue);
    $("#inputFuel").select2();
    $(".select2").css("margin-top", "15px");
    //$(".select2").css("width","230px");
    $("#inputSupplierElectric").select2();
    $(".select2").css("margin-top", "15px");
    //$(".select2").css("width","230px");
    $("#inputSupplierGas").select2();
    $(".select2").css("margin-top", "15px");
    //$(".select2").css("width","230px");
    $("#inputEconomy7").select2();
    $("#inputInfo").select2();
    $(".select2").css("margin-top", "15px");
    //$(".select2").css("width","230px");
    $(".getLettingAgencyBusinessName").text("Utility Management Notification");
    $("#UtilityRegType").select2();
    $(".utilityInfo").hide();
    $(".btnSubmitUtility").show();

    notificationUtilityLogSubmit();

    $("#inputFuelGasEdit").select2();
    $("#inputSupplierGasEdit").select2();
    $(".gasEdit").hide();

    $("#inputElectricityGasEdit").select2();
    $("#inputEconomy7Edit").select2();
    $(".electricityEdit").hide();

    $("#inputTaxAuthorityEdit").select2();
    $(".councilEdit").hide();

    $("#inputWaterAuthorityEdit").select2();
    $("#inputSewerageAuthorityEdit").select2();
    $(".waterEdit").hide();

    $("#inputBroadbandEdit").select2();
    $(".broadbandEdit").hide();

    $("#inputMediaEdit").select2();
    $(".mediaEdit").hide();
    getCityCouncilList();




}); // ready

$(".btnSearch").click(function() {
    getValue = $("#inputSearch").val();
    utilityListCountLimit = 0;
    getUtilityList(getValue);
});

function getCityCouncilList(cityName) {
    $.get("CityState/getCouncil.php?cityName=" + cityName, function(result) {
        //console.log(result);
        $("#inputTaxAuthorityEdit").html('');
        $("#inputTaxAuthorityEdit").html("<option value='0'>Choose Council</option>");
        var getResult = JSON.parse(result);
        for (inputTaxAuthority in getResult.records) {
            $("#inputTaxAuthorityEdit").append("<option value='" + getResult.records[inputTaxAuthority].CouncilName + "'>" + getResult.records[inputTaxAuthority].CouncilName + "</option>");
        }
        $("#getLoadingModalContent").removeClass('md-show');
        $("#inputTaxAuthorityEdit").select2();
    });
} // getCityCouncilList() 

$(".getUtilityInfo").on('click', function() {
    if ($(".utilityInfo").is(":hidden")) {
        $(".utilityInfo").show("slow");
        $(".getUtilityInfo").text('- Utility Management Details');
    } else {
        $(".utilityInfo").hide("slow");
        $(".getUtilityInfo").text('+ Utility Management Details');
    }
}); // .getUtilityInfo  


$("#inputMobileNumber").keypress(function(e) {
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        return false;
    }
});



$("#inputMobileNumber").keyup(function() {
    var inputMobileNumber = $("#inputMobileNumber").val();
    if (inputMobileNumber == "") {
        $(".tenantcno-prefix").hide();
        $("#inputMobileNumber").removeAttr('style');
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter the Mobile Number");
        $(".btnSubmitUtility").attr("disabled", true);
        return false;
    } else {
        $(".tenantcno-prefix").show();
        $("#inputMobileNumber").css("padding", "10px 25px 12px 32px");
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        $(".btnSubmitUtility").attr("disabled", false);
    }
});


$("#getName").keyup(function() {
    var landlordName = $("#getName").val();
    if (landlordName == "") {
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter the Name");
        $(".btnSubmitUtility").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        $(".btnSubmitUtility").attr("disabled", false);
    }
});



// $("#inputEmailID").keyup(function() {
//     var landlordEmailID = $("#inputEmailID").val();
//     if (landlordEmailID == "") {
//         $(".errorInfo").show();
//         $(".errorInfo").text("* Enter the Email ID");
//         $(".btnSubmitUtility").attr("disabled", true);
//         return false;
//     } else {
//         $(".errorInfo").hide();
//         $(".errorInfo").text("");
//         $(".btnSubmitUtility").attr("disabled", false);
//     }
// });


$("#Date").keyup(function() {
    var date = $("#Date").val();
    if (date == "") {
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter the Address");
        $(".btnSubmitUtility").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        $(".btnSubmitUtility").attr("disabled", false);
    }
});


$("#Date").keyup(function() {
    var date = $("#Date").val();
    if (date == "") {
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter the Date");
        $(".btnSubmitUtility").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        $(".btnSubmitUtility").attr("disabled", false);
    }
});

$("#startDate").keyup(function() {
    var startDate = $("#startDate").val();
    if (startDate == "") {
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter the Start Date");
        $(".btnSubmitUtility").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        $(".btnSubmitUtility").attr("disabled", false);
    }
});


$("#endDate").keyup(function() {
    var endDate = $("#endDate").val();
    if (endDate == "") {
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter the End Date");
        $(".btnSubmitUtility").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        $(".btnSubmitUtility").attr("disabled", false);
    }
});


$("#UtilityRegType").keyup(function() {
    var utilityRegType = $("#UtilityRegType").val();
    if (utilityRegType == "") {
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter the UtilityRegType");
        $(".btnSubmitUtility").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        $(".btnSubmitUtility").attr("disabled", false);
    }
});


$("#getElect").on('change', function() {
    console.log("Checked" + this.checked);
    if (this.checked) {
        $("#hiddenIsElectricity").val(1);
    } else {
        $("#hiddenIsElectricity").val(0);
    }
});

$("#getGas").on('change', function() {
    console.log("Checked" + this.checked);
    if (this.checked) {
        $("#hiddenIsGas").val(1);
    } else {
        $("#hiddenIsGas").val(0);
    }
});

$("#getWater").on('change', function() {
    console.log("Checked" + this.checked);
    if (this.checked) {
        $("#hiddenIsWater").val(1);
    } else {
        $("#hiddenIsWater").val(0);
    }
});

$("#getCouncil").on('change', function() {
    console.log("Checked" + this.checked);
    if (this.checked) {
        $("#hiddenIsCouncil").val(1);
    } else {
        $("#hiddenIsCouncil").val(0);
    }
});


$("#inputNotes").keyup(function() {
    var inputNotes = $("#inputNotes").val();
    if (inputNotes == "") {
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter the Notes");
        $(".btnSubmitAddNotes").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        $(".btnSubmitAddNotes").attr("disabled", false);
    }
});


$("#inputInfo").on('change', function() {
    var inputRequirement = $("#inputInfo").val();
    if (inputRequirement == 0) {
        $(".errorInfo").show();
        $(".errorInfo").text("* Select the Requirement");
        $(".btnSubmitAddNotes").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        $(".btnSubmitAddNotes").attr("disabled", false);
    }
});


$(".btnSubmitAddNotes").click(function() {
    var inputNotes = $("#inputNotes").val().replace(/(\r\n|\n|\r)/gm, " ");
    var inputRequirement = $("#select2-inputInfo-container").html();
    var hiddenUtilityID = $("#hiddenUtilityID").val();
    var hiddenPropertyID = $("#hiddenPropertyID").val();
    var hiddenUserRegID = $("#hiddenUserRegID").val();

    var inputGasStatus = $("#inputGasInfo").val();
    var inputGasNotes = $("#inputGasNotes").val();
    var inputElectricityStatus = $("#inputElectricityInfo").val();
    var inputElectricityNotes = $("#inputElectricityNotes").val();
    var inputCouncilStatus = $("#inputCouncilInfo").val();
    var inputCouncilNotes = $("#inputCouncilNotes").val();
    var inputWaterSewerageStatus = $("#inputWaterActionInfo").val();
    var inputWaterSewerageNotes = $("#inputWaterNotes").val();
    var inputBroadBandStatus = $("#inputBroadbandInfo").val();
    var inputMediaStatus = $("#inputMediaInfo").val();
    var inputMediaNotes = $("#inputMediaNotes").val();

    if (inputNotes == "" || inputNotes == " ") {
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter the Notes");
        $(".btnSubmitAddNotes").attr("disabled", true);
        return false;
    }

    if (inputRequirement == "Select Requirement") {
        $(".errorInfo").show();
        $(".errorInfo").text("* Select the Requirement");
        $(".btnSubmitAddNotes").attr("disabled", true);
        return false;
    } else {
        var dataForm = '{"UtilityID":"' + hiddenUtilityID + '","PropertyID":"' + hiddenPropertyID + '","UserRegID":"' + hiddenUserRegID + '","Notes":"' + inputNotes + '","RequirementType":"' + inputRequirement + '","GasStatus":"' + inputGasStatus + '","GasNotes":"' + inputGasNotes + '","ElectricityStatus":"' + inputElectricityStatus + '","ElectricityNotes":"' + inputElectricityNotes + '","CouncilStatus":"' + inputCouncilStatus + '","CouncilNotes":"' + inputCouncilNotes + '","WaterSewerageStatus":"' + inputWaterSewerageStatus + '","WaterSewerageNotes":"' + inputWaterSewerageNotes + '","BroadBandStatus":"' + inputBroadBandStatus + '","BroadBandNotes":"' + inputBroadBandNotes + '","MediaStatus":"' + inputMediaStatus + '","MediaNotes":"' + inputMediaNotes + '"}';
        console.log(dataForm);

        var sendURL = domainAddress + 'CreateUtilityLog';
        console.log(sendURL);

        $.ajax({
            type: "POST",
            url: sendURL,
            data: dataForm,
            success: function(dataCheck) {
                console.log(dataCheck);
                getUtilityList(getValue);
                $(".utilityContent").hide();
                $("#getName").val('');
                $("#inputMobileNumber").val('');
                $("#UtilityRegType").val('');
                $("#Date").val('');
                $("#endDate").val('');
                $("#getElect").val('');
                $("#getGas").val('');
                $("#getCouncil").val('');
                $("#getWater").val('');
                $("#select2-inputFuel-container").html("Select Fuel Type");
                $("#inputFuel").val(0);
                $("#select2-inputSupplierElectric-container").html("Select Supplier Electric");
                $("#inputSupplierElectric").val(0);
                $("#select2-inputSupplierGas-container").html("Select Supplier Gas");
                $("#inputSupplierGas").val(0);
                $("#inputRead1").val('');
                $("#inputRead2").val('');
                $("#inputGas").val('');
                $("#inputWater").val('');
                $("#inputNotes").val('');
                $("#select2-inputInfo-container").html("Select Requirement");
                UIkit.modal.alert('Utility Notes Created Successfully');
            }
        });
    }

});



$(".btnSubmitUtility").click(function() {
    var name = $("#getName").val();
    var utilityID = $("#hiddenUtilityID").val();
    var propertyID = $("#hiddenPropertyID").val();
    var userID = $("#hiddenUserRegID").val();
    var emailID = $("#inputEmailID").val();
    var address = $("#inputAddress").val();
    var mobileNumber = $("#inputMobileNumber").val();
    var utilityRegType = $("#UtilityRegType").val();
    var date = $("#Date").val();
    var isElectricity = 0;
    var isGas = 0;
    var isWater = 0;
    var isCouncil = 0;
    var feul = $("#select2-inputFuel-container").html();
    var supplierElectric = $("#select2-inputSupplierElectric-container").html();
    var supplierGas = $("#select2-inputSupplierGas-container").html();
    var read1 = $("#inputRead1").val();
    var read2 = $("#inputRead2").val();
    var economy7 = $("#select2-inputEconomy7-container").html();
    var gas = $("#inputGas").val();
    var water = $("#inputWater").val();


    var getElectricity = $('.electricity > div').hasClass('checked');
    if (getElectricity == true) {
        isElectricity = 1;
    }

    var getGass = $('.gas > div').hasClass('checked');
    if (getGass == true) {
        isGas = 1;
    }


    var getWaterr = $('.water > div').hasClass('checked');
    if (getWaterr == true) {
        isWater = 1;
    }

    var getCouncill = $('.council > div').hasClass('checked');
    if (getCouncill == true) {
        isCouncil = 1;
    }

    if (name == "") {
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter the Landlord Name");
        $(".btnSubmitUtility").attr("disabled", true);
        return false;
    }

    if (emailID == "") {
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter the Landlord EmailID");
        $(".btnSubmitUtility").attr("disabled", true);
        return false;
    }

    if (address == "") {
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter the Address");
        $(".btnSubmitUtility").attr("disabled", true);
        return false;
    }


    if (date == "") {
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter the Date");
        $(".btnSubmitUtility").attr("disabled", true);
        return false;
    }

    if (startDate == "") {
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter the Start Date");
        $(".btnSubmitUtility").attr("disabled", true);
        return false;
    }

    if (endDate == "") {
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter the End Date");
        $(".btnSubmitUtility").attr("disabled", true);
        return false;
    }


    if (mobileNumber == "") {
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter the Mobile Number");
        $(".btnSubmitUtility").attr("disabled", true);
        return false;
    }


    if (utilityRegType == "") {
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter the Utility Type");
        $(".btnSubmitUtility").attr("disabled", true);
        return false;
    } else {

        var dataForm = '{"Name":"' + name + '","EmailID":"' + emailID + '","MobileNumber":"' + mobileNumber + '","Address":"' + address + '","UtilityRegType":"' + utilityRegType + '","Date":"' + date + '","TenancyStart":"' + finalStartDate + '","TenancyEnd":"' + finalEndDate + '","FuelType":"' + feul + '","SupplierElectric":"' + supplierElectric + '","SupplierGas":"' + supplierGas + '","ElectricSupplier1":"' + read1 + '","ElectricSupplier2":"' + read2 + '","GasMeterRead":"' + gas + '","WaterMeterRead":"' + water + '","IsElectricity":"' + isElectricity + '","IsGas":"' + isGas + '","IsWater":"' + isWater + '","IsCouncil":"' + isCouncil + '","PropertyID":"' + propertyID + '","UserID":"' + userID + '"}';
        console.log(dataForm);


        if (utilityID == 0) {
            var sendURL = domainAddress + 'CreateUserUtility';
            console.log(sendURL);

            $.ajax({
                type: "POST",
                url: sendURL,
                data: dataForm,
                success: function(dataCheck) {
                    console.log(dataCheck);
                    getUtilityList(getValue);
                    $("#getName").val('');
                    $("#inputEmailID").val('');
                    $("#inputAddress").val('');
                    $("#inputMobileNumber").val('');
                    $("#UtilityRegType").val('');
                    $("#Date").val('');
                    $("#startDate").val('');
                    $("#endDate").val('');
                    $("#getElect").val('');
                    $("#getGas").val('');
                    $("#getCouncil").val('');
                    $("#getWater").val('');
                    $("#select2-inputFuel-container").html("Select Fuel Type");
                    $("#inputFuel").val(0);
                    $("#select2-inputSupplierElectric-container").html("Select Supplier Electric");
                    $("#inputSupplierElectric").val(0);
                    $("#select2-inputSupplierGas-container").html("Select Supplier Gas");
                    $("#inputSupplierGas").val(0);
                    $("#inputRead1").val('');
                    $("#inputRead2").val('');
                    $("#inputGas").val('');
                    $("#inputWater").val('');
                    UIkit.modal.alert('Utility Created Successfully');
                }
            });
        } else {
            var sendURL = domainAddress + 'UpdateUtilityDetails/' + utilityID;
            console.log(sendURL);
            $.ajax({
                type: "POST",
                url: sendURL,
                data: dataForm,
                success: function(dataCheck) {
                    console.log(dataCheck);
                    getUtilityList(getValue);
                    $("#getName").val('');
                    $("#inputEmailID").val('');
                    $("#inputAddress").val('');
                    $("#startDate").val('');
                    $("#endDate").val('');
                    $("#inputMobileNumber").val('');
                    $("#UtilityRegType").val('');
                    $("#Date").val('');
                    $("#getElect").val('');
                    $("#getGas").val('');
                    $("#getCouncil").val('');
                    $("#getWater").val('');
                    $("#select2-inputFuel-container").html("Select Fuel Type");
                    $("#inputFuel").val(0);
                    $("#select2-inputSupplierElectric-container").html("Select Supplier Electric");
                    $("#inputSupplierElectric").val(0);
                    $("#select2-inputSupplierGas-container").html("Select Supplier Gas");
                    $("#inputSupplierGas").val(0);
                    $("#inputRead1").val('');
                    $("#inputRead2").val('');
                    $("#inputGas").val('');
                    $("#inputWater").val('');
                    $(".btnSubmitUtility").text("Add Utility");
                    UIkit.modal.alert('Utility Updated Successfully');
                }
            });
        } // sec if SpecialityID                    

        $(".md-input-wrapper").removeClass("md-input-filled");
        $(".utilityContent").hide();



    }

}); // #createUtility


$("#leftArrow").click(function() {
    $("#previousPage").removeAttr("disabled");
    utilityListCountLimit = 0;
    console.log("next count : " + utilityListCountLimit);
    maxProp = 1;
    $("#enterPageNO").val(1);
    $("#getLoadingModalContent").addClass('md-show');
    getUtilityList(getValue);
    if (maxProp < lastPage) {
        $("#nextPage").attr("disabled", false);
    }
});

$("#rightArrow").click(function() {
    $("#previousPage").removeAttr("disabled");
    utilityListCountLimit = (9 * lastPage) - 9;
    console.log("next count : " + utilityListCountLimit);
    maxProp = lastPage;
    $("#enterPageNO").val(lastPage);
    $("#getLoadingModalContent").addClass('md-show');
    getUtilityList(getValue);
});

$("#previousPage").click(function() {
    console.log("inital count : " + utilityListCountLimit);
    if (utilityListCountLimit == 0) {
        utilityListCountLimit = 0;
        $("#previousPage").attr("disabled", "disabled");
    } else {
        utilityListCountLimit -= 9;
        $("#previousPage").removeAttr("disabled");
    }
    console.log("prev count : " + utilityListCountLimit);
    if (utilityListCountLimit == 0) {
        $("#previousPage").attr("disabled", "disabled");
    }
    maxProp--;
    if (maxProp == 0) {
        $("#enterPageNO").val('');
    } else {
        $("#enterPageNO").val(maxProp);
    }
    $("#getLoadingModalContent").addClass('md-show');
    getUtilityList(getValue);
});


$("#nextPage").click(function() {
    console.log("next inital count : " + utilityListCountLimit);
    $("#previousPage").removeAttr("disabled");
    utilityListCountLimit += 9;
    console.log("next count : " + utilityListCountLimit);
    if (maxProp == lastPage) {
        $("#nextPage").attr("disabled", true);
    } else {
        $("#nextPage").attr("disabled", false);
        maxProp++;
        $("#enterPageNO").val(maxProp);
        if (maxProp <= lastPage) {
            $("#getLoadingModalContent").addClass('md-show');
            getUtilityList(getValue);
        }
    }
});



$("#enterPageNO").on("change", function(e) {
    console.log("THis is called" + $("#enterPageNO").val());
    if ($("#enterPageNO").val() < lastPage) {
        maxProp++;
        $("#enterPageNO").val(maxProp);
    }
    console.log("next inital count : " + utilityListCountLimit + " page # : " + maxProp);
    utilityListCountLimit = 9 * ($("#enterPageNO").val() - 1);
    $("#getLoadingModalContent").addClass('md-show');
    getUtilityList(getValue);
});


$("#enterPageNO").keyup(function() {
    console.log("THis is called " + $("#enterPageNO").val());
    if ($("#enterPageNO").val() < lastPage) {
        maxProp++;
        $("#enterPageNO").val(maxProp);
    }

    console.log("next inital count : " + utilityListCountLimit + " page # : " + maxProp);
    utilityListCountLimit = 9 * ($("#enterPageNO").val() - 1);
    $("#getLoadingModalContent").addClass('md-show');
    getUtilityList(getValue);
});


$(".isArchived").click(function() {
    $("#previousPage").removeAttr("disabled");
    utilityListCountLimit = 1;
    //console.log("next count : "+utilityListCountLimit);
    maxProp = 1;
    $("#enterPageNO").val(1);
    getStatus = "Updated";
    getUtilityList(getValue);
});


function getUtilityList(getValue) {

    if (getValue == "" || getValue == undefined) {
        dataForm = '{"Limit":"' + parseInt(utilityListCountLimit) + '","Status":"' + getStatus + '"}';
        sendURL = domainAddress + "AllUtilityListByCount";
    } else {
        dataForm = '{"Limit":"' + parseInt(utilityListCountLimit) + '","Status":"' + getStatus + '","SearchValue":"' + getValue + '"}';
        sendURL = domainAddress + "SearchUtilityStatusList";
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
                    loadUtilityList(result);
                }


            } // ajax success
    }); // ajax POSTS
}

function loadUtilityList(result) {

    if (result.record_count == 0) {
        $("#nextPage").attr("disabled", true);
    } else {
        $(".allUtilityList").html('');
        if (result.record_count == result.All_Records_Count) {
            console.log("equal to 9");
            $(".pageCount").show();
            $("#nextPage").attr("disabled", "disabled");
        } else if (result.record_count < 9 && result.record_count != 0) {
            console.log("less than 9");
            $(".pageCount").show();
            $("#nextPage").attr("disabled", "disabled");
        } else if (result.record_count >= 9) {
            console.log("great than 9");
            $("#nextPage").removeAttr("disabled");
            $(".pageCount").show();
        }

        lastPage = parseInt(result.All_Records_Count / 9) + 1;
        console.log(lastPage);
        var mobileNumber = "";
        var utilityType = "";
        for (utility in result.records) {

            if (result.records[utility].MobileNumber == null) {
                mobileNumber = "Not found";
            } else {
                mobileNumber = result.records[utility].MobileNumber;
            }

            if (result.records[utility].UtilityRegType == "move-in") {
                utilityType = "Move-in";
            } else {
                utilityType = "Move-out";
            }



            $(".allUtilityList").append("<tr id='rowID-" + result.records[utility].UtilityID + "'><td id='getUtilityType-" + result.records[utility].UtilityID + "'>" + utilityType + "</td>   <td id='address-" + result.records[utility].UtilityID + "'>" + result.records[utility].Address + "</td>  <td id='name-" + result.records[utility].UtilityID + "'>" + result.records[utility].Name + "</td> <td id='getDate-" + result.records[utility].UtilityID + "'>" + moment(result.records[utility].Date).format('Do MMM YYYY,  h:mm a') + "</td> <td id='status-" + result.records[utility].UtilityID + "'>" + result.records[utility].Status + "</td> <td><a class='editUtility' id='editUtilityID-" + result.records[utility].UtilityID + "' > <i class='fa fa fa-pencil pencil fa-1x'></i> </a> <input type='hidden' id='hidddenGetPropertyID-" + result.records[utility].UtilityID + "' value='" + result.records[utility].PropertyID + "' /></td>  </tr> ");




            if (result.records[utility].Status == "Updated") {
                $("#rowID-" + result.records[utility].UtilityID).hide();
                $("#editUtilityID-" + result.records[utility].UtilityID).hide();
                $("#deleteUtilityID-" + result.records[utility].UtilityID).hide();
            }

            if (result.records[utility].Status == "Not Applicable") {
                $("#rowID-" + result.records[utility].UtilityID).hide();
            }

        }


        $("#getLoadingModalContent").removeClass('md-show');


        $(".editUtility").on('click', function(e) {
            $("#getLoadingModalContent").addClass('md-show');
            var editUtilityID = this.id.replace('editUtilityID-', '');
            var editHiddenPropertyID = $("#hidddenGetPropertyID-" + editUtilityID).val();
            $("#hiddenUtilityID").val(editUtilityID);

            $.get(domainAddress + "GetUserUtilityID/" + editHiddenPropertyID, {}, function(result) {
                console.log(result);
                $(".getUserUtilityListContact").show('slow');
                for (var getUtility in result.records) {

                    $("#getName").val(result.records[getUtility].Name);
                    $("#inputEmailID").text(result.records[getUtility].EmailID);
                    $("#inputAddress").text(result.records[getUtility].Address);
                    $("#inputCity").text(result.records[getUtility].PropCity + ", " + result.records[getUtility].PropState + ", " + result.records[getUtility].PropAddress + " - " + result.records[getUtility].PropPostalCode);
                    $("#hiddenPropertyID").val(result.records[getUtility].PropertyID);
                    $("#hiddenUserRegID").val(result.records[getUtility].UserID);
                    $("#tenancyStartDate").text(moment(result.records[getUtility].TenancyStart).format('Do MMM YYYY'));
                    $("#tenancyEndDate").text(moment(result.records[getUtility].TenancyEnd).format('Do MMM YYYY'));
                    $("#gasFuelType").text(result.records[getUtility].FuelType);
                    $("#electricitySupplier").text(result.records[getUtility].SupplierElectric);
                    $("#gasSuppliers").text(result.records[getUtility].SupplierGas);
                    $("#electricityMeterReading1").text(result.records[getUtility].ElectricSupplier1);
                    $("#electricityMeterReading2").text(result.records[getUtility].ElectricSupplier2);
                    $("#electricityEconomy").text(result.records[getUtility].Economy7);
                    $("#gasMeterReading").text(result.records[getUtility].GasMeterRead);
                    $("#waterMeterRead").text(result.records[getUtility].WaterMeterRead);
                    $("#waterAuthority").text(result.records[getUtility].WaterAuthority);
                    $("#getBroadBandProvider").text(result.records[getUtility].BroadbandProvider);
                    $("#getMediaProvider").text(result.records[getUtility].MediaProvider);
                    
                    if (result.records[getUtility].PropGasStatus == "" || result.records[getUtility].PropGasStatus == null) {
                        $("#select2-inputGasInfo-container").html("Action Taken");
                    } else {
                        $("#inputGasInfo").val(result.records[getUtility].PropGasStatus);
                        $("#select2-inputGasInfo-container").html(result.records[getUtility].PropGasStatus);
                    }

                    $("#inputGasNotes").val(result.records[getUtility].PropGasNotes);

                    if (result.records[getUtility].PropElectricityStatus == "" || result.records[getUtility].PropElectricityStatus == null) {
                        $("#select2-inputElectricityInfo-container").html("Action Taken");
                    } else {
                        $("#inputElectricityInfo").val(result.records[getUtility].PropElectricityStatus);
                        $("#select2-inputElectricityInfo-container").html(result.records[getUtility].PropElectricityStatus);
                    }
                    $("#inputElectricityNotes").val(result.records[getUtility].PropElectricityNotes);

                    if (result.records[getUtility].PropCouncilStatus == "" || result.records[getUtility].PropCouncilStatus == null) {
                        $("#select2-inputCouncilInfo-container").html("Action Taken");
                    } else {
                        $("#inputCouncilInfo").val(result.records[getUtility].PropCouncilStatus);
                        $("#select2-inputCouncilInfo-container").html(result.records[getUtility].PropCouncilStatus);
                    }
                    $("#inputCouncilNotes").val(result.records[getUtility].PropCouncilNotes);

                    if (result.records[getUtility].PropWaterSewerageStatus == "" || result.records[getUtility].PropWaterSewerageStatus == null) {
                        $("#select2-inputWaterActionInfo-container").html("Action Taken");
                    } else {
                        $("#inputWaterActionInfo").val(result.records[getUtility].PropWaterSewerageStatus);
                        $("#select2-inputWaterActionInfo-container").html(result.records[getUtility].PropWaterSewerageStatus);
                    }
                    $("#inputWaterNotes").val(result.records[getUtility].PropWaterSewerageNotes);

                    if (result.records[getUtility].PropBroadBandStatus == "" || result.records[getUtility].PropBroadBandStatus == null) {
                        $("#select2-inputBroadbandInfo-container").html("Action Taken");
                    } else {
                        $("#inputBroadbandInfo").val(result.records[getUtility].PropBroadBandStatus);
                        $("#select2-inputBroadbandInfo-container").html(result.records[getUtility].PropBroadBandStatus);
                    }
                    $("#inputBroadbandNotes").val(result.records[getUtility].PropBroadBandNotes);


                    if (result.records[getUtility].PropMediaStatus == "" || result.records[getUtility].PropMediaStatus == null) {
                        $("#select2-inputMediaInfo-container").html("Action Taken");
                    } else {
                        $("#inputMediaInfo").val(result.records[getUtility].PropMediaStatus);
                        $("#select2-inputMediaInfo-container").html(result.records[getUtility].PropMediaStatus);
                    }
                    $("#inputMediaNotes").val(result.records[getUtility].PropMediaNotes);

                    if (result.records[getUtility].CouncilAuthority == "Choose Council") {
                        result.records[getUtility].CouncilAuthority = "--";
                    }

                    $("#inputMediaNotes").val(result.records[getUtility].PropMediaNotes);
                    $("#councilAuthority").text(result.records[getUtility].CouncilAuthority);
                    $("#inputCountry").val(result.records[getUtility].PropCountry);
                    $("#landLordInsurance").text(result.records[getUtility].HomeInsurance = 1 ? "True" : "False");
                    $("#propMgnt").text(result.records[getUtility].PropManaged);
                    $("#propType").text(result.records[getUtility].PropertyType);
                    
                    if(result.records[getUtility].IsVoidBy==""){
                        $("#isVoidProg").text('No');
                    }
                    else{
                        $("#isVoidProg").text(result.records[getUtility].IsVoidBy);
                    }
                    
                    $("#landLordName").text(result.records[getUtility].LandLordName);
                    $("#landLordEmail").text(result.records[getUtility].LandLordEmailID);
                    $("#landLordMobile").text(result.records[getUtility].LandLordMobileNumber);

                    if (result.records[getUtility].UtilityRegType == "move-in") {
                        $("#select2-UtilityRegType-container").html("Move-in");
                        $("#UtilityRegType").val(result.records[getUtility].UtilityRegType);
                    } else {
                        $("#select2-UtilityRegType-container").html("Move-out");
                        $("#UtilityRegType").val(result.records[getUtility].UtilityRegType);
                    }

                    $("#Date").val(result.records[getUtility].Date);


                    var isElectricity = result.records[getUtility].IsElectricity;
                    $("#hiddenIsElectricity").val(result.records[getUtility].IsElectricity);
                    if (isElectricity == 1) {
                        $('.electricity > span').css('box-shadow', 'rgba(255, 179, 0, 0.498039) 0px 0px 0px 7px inset').css('border-color', 'rgba(255, 179, 0, 0.498039)').css('transition', 'border 0.4s').css('box-shadow', '0.4s').css('background-color', '1.2s').css('background-color', 'rgba(255, 179, 0, 0.498039)');
                        $('.electricity > span > small').css('left', '18px').css('transition', 'background-color 0.4s, left 0.2s').css('background-color', 'rgb(255, 179, 0)');
                        $("#getElect").prop("checked", true);
                    } else {
                        $('.electricity > span').css('box-shadow', 'rgba(0, 0, 0, 0.258824) 0px 0px 0px 0px inset').css('border-color', 'rgba(0, 0, 0, 0.258824)').css('transition', 'border 0.4s, box-shadow 0.4s').css('background-color', 'rgba(0, 0, 0, 0.258824)');
                        $('.electricity > span > small').css('left', '0px').css('transition', 'background-color 0.4s, left 0.2s').css('background-color', 'rgb(250, 250, 250)');
                        $("#getElect").prop("checked", false);
                    }

                    var isGas = result.records[getUtility].IsGas;
                    $("#hiddenIsGas").val(result.records[getUtility].IsGas);
                    if (isGas == 1) {
                        $('.gas > span').css('box-shadow', 'rgba(255, 179, 0, 0.498039) 0px 0px 0px 7px inset').css('border-color', 'rgba(255, 179, 0, 0.498039)').css('transition', 'border 0.4s').css('box-shadow', '0.4s').css('background-color', '1.2s').css('background-color', 'rgba(255, 179, 0, 0.498039)');
                        $('.gas > span > small').css('left', '18px').css('transition', 'background-color 0.4s, left 0.2s').css('background-color', 'rgb(255, 179, 0)');
                        $("#getGas").prop("checked", true);
                    } else {
                        $('.gas > span').css('box-shadow', 'rgba(0, 0, 0, 0.258824) 0px 0px 0px 0px inset').css('border-color', 'rgba(0, 0, 0, 0.258824)').css('transition', 'border 0.4s, box-shadow 0.4s').css('background-color', 'rgba(0, 0, 0, 0.258824)');
                        $('.gas > span > small').css('left', '0px').css('transition', 'background-color 0.4s, left 0.2s').css('background-color', 'rgb(250, 250, 250)');
                        $("#getGas").prop("checked", false);
                    }

                    var isWater = result.records[getUtility].IsWater;
                    $("#hiddenIsWater").val(result.records[getUtility].IsWater);
                    if (isWater == 1) {
                        $('.water > span').css('box-shadow', 'rgba(255, 179, 0, 0.498039) 0px 0px 0px 7px inset').css('border-color', 'rgba(255, 179, 0, 0.498039)').css('transition', 'border 0.4s').css('box-shadow', '0.4s').css('background-color', '1.2s').css('background-color', 'rgba(255, 179, 0, 0.498039)');
                        $('.water > span > small').css('left', '18px').css('transition', 'background-color 0.4s, left 0.2s').css('background-color', 'rgb(255, 179, 0)');
                        $("#getWater").prop("checked", true);
                    } else {
                        $('.water > span').css('box-shadow', 'rgba(0, 0, 0, 0.258824) 0px 0px 0px 0px inset').css('border-color', 'rgba(0, 0, 0, 0.258824)').css('transition', 'border 0.4s, box-shadow 0.4s').css('background-color', 'rgba(0, 0, 0, 0.258824)');
                        $('.water > span > small').css('left', '0px').css('transition', 'background-color 0.4s, left 0.2s').css('background-color', 'rgb(250, 250, 250)');
                        $("#getWater").prop("checked", false);
                    }

                    var isCouncil = result.records[getUtility].IsCouncil;
                    $("#hiddenIsCouncil").val(result.records[getUtility].IsCouncil);
                    if (isCouncil == 1) {
                        $('.council > span').css('box-shadow', 'rgba(255, 179, 0, 0.498039) 0px 0px 0px 7px inset').css('border-color', 'rgba(255, 179, 0, 0.498039)').css('transition', 'border 0.4s').css('box-shadow', '0.4s').css('background-color', '1.2s').css('background-color', 'rgba(255, 179, 0, 0.498039)');
                        $('.council > span > small').css('left', '18px').css('transition', 'background-color 0.4s, left 0.2s').css('background-color', 'rgb(255, 179, 0)');
                        $("#getCouncil").prop("checked", true);
                    } else {
                        $('.council > span').css('box-shadow', 'rgba(0, 0, 0, 0.258824) 0px 0px 0px 0px inset').css('border-color', 'rgba(0, 0, 0, 0.258824)').css('transition', 'border 0.4s, box-shadow 0.4s').css('background-color', 'rgba(0, 0, 0, 0.258824)');
                        $('.council > span > small').css('left', '0px').css('transition', 'background-color 0.4s, left 0.2s').css('background-color', 'rgb(250, 250, 250)');
                        $("#getCouncil").prop("checked", true);
                    }
                    var getPropertyID = result.records[getUtility].PropertyID;
                    $.get(domainAddress + "GetUserUtilityListByProperty/" + getPropertyID, {}, function(result) {
                        console.log(result);
                        $(".getPropertyUtility").show();
                        if (result.record_count == 0) {
                            $(".propertyUtility").html('');
                            $(".propertyUtility").append("<tr> <td>No records found</td> <td></td> <td></td> <td></td> <td></td>  <td></td>  <td></td>  <td></td>  <td></td>  <td></td> </tr>");
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
                            var utilityStatusCheck = "";

                            for (var propertyUtility in result.records) {

                                if (result.records[propertyUtility].IsElectricity == 0 && result.records[propertyUtility].IsGas == 0 && result.records[propertyUtility].IsWater == 0 && result.records[propertyUtility].IsCouncil == 0) {

                                    utilityStatusCheck = "Not Applicable";
                                } else if (result.records[propertyUtility].IsElectricity == 1 && result.records[propertyUtility].IsGas == 1 && result.records[propertyUtility].IsWater == 1 && result.records[propertyUtility].IsCouncil == 1) {
                                    utilityStatusCheck = "Updated";

                                } else {
                                    utilityStatusCheck = result.records[propertyUtility].Status;
                                }

                                if (result.records[propertyUtility].IsElectricity == 1) {
                                    isElectricity = '<i class="fa fa-check"></i>';
                                    cElectricity = "Green";
                                } else {
                                    isElectricity = '<i class="fa fa-times"></i>';
                                    cElectricity = "Red";
                                }

                                if (result.records[propertyUtility].IsGas == 1) {
                                    isGas = '<i class="fa fa-check"></i>';
                                    cGas = "Green";
                                } else {
                                    isGas = '<i class="fa fa-times"></i>';
                                    cGas = "Red";
                                }

                                if (result.records[propertyUtility].IsWater == 1) {
                                    isWater = '<i class="fa fa-check"></i>';
                                    cWater = "Green";
                                } else {
                                    isWater = '<i class="fa fa-times"></i>';
                                    cWater = "Red";
                                }

                                if (result.records[propertyUtility].IsCouncil == 1) {
                                    isCouncil = '<i class="fa fa-check"></i>';
                                    cCouncil = "Green";
                                } else {
                                    isCouncil = '<i class="fa fa-times"></i>';
                                    cCouncil = "Red";
                                }

                                $(".propertyUtility").append("<tr> <td>" + result.records[propertyUtility].UtilityRegType + "</td> <td>" + result.records[propertyUtility].Name + "</td> <td>" + result.records[propertyUtility].EmailID + "</td> <td>" + result.records[propertyUtility].MobileNumber + "</td> <td>" + moment(result.records[propertyUtility].Date).format('Do MMM YYYY,  h:mm a') + "</td>  <td style='color:" + cElectricity + ";'>" + isElectricity + "</td> <td style='color:" + cGas + ";'>" + isGas + "</td> <td style='color:" + cWater + ";'>" + isWater + "</td> <td style='color:" + cCouncil + ";'>" + isCouncil + "</td> <td>" + utilityStatusCheck + "</td> </tr>");
                            }
                        }

                    });


                    if (result.records[getUtility].Status == "Updated") {
                        $(".btnSubmitUtility").hide();
                    } else {
                        $(".btnSubmitUtility").show();
                        $(".btnSubmitUtility").html("Update Utility");
                    }

                }

                $("#getLoadingModalContent").removeClass('md-show');
            });


            $(".utilityContent").show();
            $(".utilityInfo").show();

            $(".md-input-wrapper").addClass("md-input-filled");
            getUtilityLogs(editUtilityID);

        }); // editUtility

        $(".deleteUtility").on('click', function(e) {
            var deleteUtilityID = this.id.replace('deleteUtilityID-', '');

            UIkit.modal.confirm('Are you sure?', function() {
                $.post(domainAddress + 'DeleteUtility/' + deleteUtilityID + "/", function(e) {
                    console.log(e);
                    $("#rowID-" + deleteUtilityID).remove();
                    getUtilityList(getValue);
                    UIkit.modal.alert('Utility Deleted Successfully');
                });
            });

        }); // deleteUtilityID             

    }

} // loadUserTenantsList


$(".utilityLogOut").click(function() {
    localStorage.setItem("UtilityUserID", "");
    localStorage.setItem("UtilityUserName", "");
    localStorage.setItem("UtilityEmailID", "");
});