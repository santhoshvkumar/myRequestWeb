var  getcountryCode = localStorage.getItem("MyRequest_countryCode");
var clearAllValues = function() {
    localStorage.removeItem('MyRequestTenantsData');
    $("#getName").val('');
    $("#inputMobileNumber").val('');
    $("#inputEmailID").val('');
    $("#startDate").val('');
    $("#endDate").val('');
    $("#inputAddress").val('');
    $("#inputLocation").val('');
    $("#inputState").val(0);
    $("#inputCity").val(0);
    $("#select2-inputCity-container").html("Select City");
    if(getcountryCode == "US" || getcountryCode == "India" || getcountryCode == "Canada"){
        $("#select2-inputState-container").html("Select State");
    } else {
        $("#select2-inputState-container").html("Select County");
    }
    $("#inpuZip").val('');
    $("#inpuCountry").val('');
    $(".bno-prefix").hide();
    $("#inputHmoLicenseNumber").val('');
    $("#validFrom").val('');
    $("#validTo").val('');
    $("#electricityValidFrom").val('');
    $("#electricityValidTo").val('');
    $("#gasValidFrom").val('');
    $("#gasValidTo").val('');
    $("#legValidFrom").val('');
    $("#legValidTo").val('');
    $("#voidPartYes").iCheck('check');
    $("#voidPartNo").iCheck('uncheck');
    $('#landBuildInsurYes').iCheck('uncheck');
    $('#landBuildInsurNo').iCheck('check');
    $('#propertyManageFull').iCheck('uncheck');
    $('#propertyManageSemi').iCheck('uncheck');
    $('#propertyManageLet').iCheck('uncheck');
    $("#singleHmo").iCheck('check');
    $(".hmoInputTenent").hide();
    $("#imgHmoUploadPic").attr("src", "assets/img/noImage.gif");
    $("#imgEnergyPerformanceCertificate").attr("src", "assets/img/noImage.gif");
    $("#imgElectricityCertificate").attr("src", "assets/img/noImage.gif");
    $("#imgGasCertificate").attr("src", "assets/img/noImage.gif");
    $("#imgLegCertificate").attr("src", "assets/img/noImage.gif");
    $(".getTenantList").html('');
    $("#progressbox1").hide();
    $("#progressbox2").hide();
    $("#progressbox3").hide();
    $("#progressbox4").hide();
    $("#select2-inputProperty-container").html("Select PropertyType");
    $("#inputProperty").val(0);
    $("#select2-inputBedrooms-container").html("Select Bedrooms");
    $("#inputBedrooms").val(0);
    $("#select2-inputFuel-container").html("Select Fuel Type");
    $("#inputFuel").val(0);
    $("#select2-inputSupplierElectric-container").html("Select Supplier Electric");
    $("#inputSupplierElectric").val(0);
    $("#select2-inputSupplierGas-container").html("Select Supplier Gas");
    $("#inputSupplierGas").val(0);
    $("#select2-inputEconomy7-container").html("Economy 7");
    $("#inputEconomy7").val(0);
    $("#select2-inputWaterMeter-container").html("Water Meter");
    $("#inputWaterMeter").val(0);
    isAppInstalled = 0;
    occupancy = "";
    homeInsurance = "";
    getPropertyManaged = "";
    imageUrl1 = "";
    imageUrl2 = "";
    imageUrl3 = "";
    imageUrl4 = "";
    imageUrl5 = "";
    $("#hiddenPropertyID").val(0);
    $(".md-input-wrapper").addClass("md-input-filled");
    $(".propertyContent").toggle();
    $(".landlordInfo").hide();
    $(".landLordTitle").text('+ Landlord Details');
    $(".getUtilityInfo").text('+ Utility Management Details');
    $(".getPropMandatoryInfo").text('+ Property Mandatory Details');
    $(".propMandatoryContent").hide();
    count = 1;
    finalTenantCount = 0;
    getAddTenantArr = new Array();
    $("#hiddenIsElectricity").val(0);
    $("#hiddenIsGas").val(0);
    $("#hiddenIsWater").val(0);
    $("#hiddenIsCouncil").val(0);
    $(".isElectricity > div").removeClass("checked");
    $(".isGas > div").removeClass("checked");
    $(".isWater > div").removeClass("checked");
    $(".isCouncil > div").removeClass("checked");
    $("#hiddenPropertyID").val(0);
    $(".getPropertyUtility").hide();
    $(".propertyUtility").html('');
    $("#inputRead1").val('');
    $("#inputRead2").val('');
    $("#inputGas").val('');
    $("#inputWater").val('');
    $("#getLastName").val('');
    $("#inputAddress1").val('');
    $("#inpuZip1").val('');
    $("#select2-inputLandlordTitle-container").html("Select Title");
    $("#inputLandlordTitle").val('');
    if(getcountryCode == "US" || getcountryCode == "India" || getcountryCode == "Canada"){
        $("#select2-inputState1-container").html("Select State");
    } else {
        $("#select2-inputState1-container").html("Select County");
    }
    $("#inputState1").val(0);
    $("#select2-inputCity1-container").html("Choose City");
    $("#inputCity1").val(0);
    $("#select2-inputWaterAuthority-container").html("Select Water Authority");
    $("#inputWaterAuthority ").val(0);
    $(".mno-prefix").hide();
    $("#inputMobileNumber").removeAttr('style');
    $("#inputHMONoOfTenent").val(1);
    $("#select2-inputTaxAuthority-container").html("Select Council Tax Authoriy");
    $(".utilityInfo").hide();
    $(".btnSubmitProperty").text("Add Property & Update Utility");
    $(".btnSubmitPropertyMoveOut").hide();
    $(".getTenantList").html('');
    getAddTenant(count);
    getAddRemove(count);
    $("#getIsAppInstallCheck-"+count).css("height", "610px");
    $(".divUtilityHistory").hide();
    $(".divtenantHistory").hide();
    $(".gettenantHistory").hide();
}