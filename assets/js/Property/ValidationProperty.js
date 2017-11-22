var getPhoneCode = localStorage.getItem("MyRequest_PhoneCode-prefix");

$("#inputAddress").keyup(function() {
    var inputAddress = $.trim($("#inputAddress").val());
    if (inputAddress == "") {
        $("#inputAddress").css("border-color", "red");
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter the Address");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        $("#inputAddress").css("border-color", "rgba(0,0,0,.12)");
        $(".btnSubmitProperty").attr("disabled", false);
    }
});

$("#inputState").on('change', function() {
    var inputState = $("#inputState").val();
    if (inputState == 0) {
        $(".errorInfo").css("border-color", "red");
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter the State");
        $("#select2-inputState-container").css("border", "1px solid red");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        $("#select2-inputState-container").css("border", "");
        $(".btnSubmitProperty").attr("disabled", false);
    }
});

$("#inputCity").on('change', function() {
    var inputCity = $("#inputCity").val();
    if (inputCity == 0) {
        $(".errorInfo").css("border-color", "red");
        $(".errorInfo").show();
        $(".errorInfo").text("* Select the City");
        $("#select2-inputCity-container").css("border", "1px solid red");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        $("#select2-inputCity-container").css("border", "");
        $(".btnSubmitProperty").attr("disabled", false);
    }
});

$('#inpuZip').keypress(function (e) {
    //   var regex = new RegExp("/[^a-zA-Z0-9@]-+/");
    var regex = new RegExp("^[A-Za-z0-9? ,_-]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }
    e.preventDefault();
    return false;
});

$("#inpuZip").keyup(function() {
    var inpuZip = $.trim($("#inpuZip").val());
    if (inpuZip == "") {
        $("#inpuZip").css("border-color", "red");
        $(".errorInfo").show();
        if(getPhoneCode == +44){
            $(".errorInfo").text("* Enter the Post Code");
        } else {
            $(".errorInfo").text("* Enter the Zip Code");
        }
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        $("#inpuZip").css("border-color", "rgba(0,0,0,.12)");
        $(".btnSubmitProperty").attr("disabled", false);
    }
});


$("#inputProperty").on('change', function() {
    var inputProperty = $("#inputProperty").val();
    if (inputProperty == 0) {
        $(".errorInfo").css("border-color", "red");
        $(".errorInfo").show();
        $(".errorInfo").text("* Select the Property");
        $("#select2-inputProperty-container").css("border", "1px solid red");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        $("#select2-inputProperty-container").css("border", "1px solid transparent");
        $(".btnSubmitProperty").attr("disabled", false);
    }
});

$("#inputBedrooms").on('change', function() {
    var inputBedrooms = $("#inputBedrooms").val();
    if (inputBedrooms == 0) {
        $(".errorInfo").css("border-color", "red");
        $(".errorInfo").show();
        $(".errorInfo").text("* Select The Number Of Bedrooms");
        $("#select2-inputBedrooms-container").css("border", "1px solid red");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        $("#select2-inputBedrooms-container").css("border", "1px solid transparent");
        $(".btnSubmitProperty").attr("disabled", false);
    }
});

$("#inputPropertyStatus").on('change', function() {
    var inputPropertyStatus = $("#inputPropertyStatus").val();
    if (inputPropertyStatus == 0) {
        $(".errorInfo").css("border-color", "red");
        $(".errorInfo").show();
        $(".errorInfo").text("* Select the Property Status");
        $("#select2-inputPropertyStatus-container").css("border", "1px solid red");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        $("#select2-inputPropertyStatus-container").css("border", "");
        $(".btnSubmitProperty").attr("disabled", false);
    }
});

//   $("#startDate").keyup(function() {
//       var inputStartDate = $("#startDate").val();
//       if (inputStartDate == "") {
//           $("#startDate").css("border-color", "red");
//           $(".errorInfo").show();
//           $(".errorInfo").text("* Enter the Tenancy Start Date");
//           $(".btnSubmitProperty").attr("disabled", true);
//           return false;
//       } else {
//           $(".errorInfo").hide();
//           $(".errorInfo").text("");
//           $("#startDate").css("border-color", "rgba(0,0,0,.12)");
//           $(".btnSubmitProperty").attr("disabled", false);
//           return false;
//       }
//   });




//   $("#endDate").keyup(function() {
//       var inputEndDate = $("#endDate").val();
//       if (inputEndDate == "") {
//           $("#startDate").css("border-color", "red");
//           $(".errorInfo").show();
//           $(".errorInfo").text("* Enter the Tenancy End Date");
//           $(".btnSubmitProperty").attr("disabled", true);
//           return false;
//       } else {
//           $(".errorInfo").hide();
//           $(".errorInfo").text("");
//           $("#startDate").css("border-color", "rgba(0,0,0,.12)");
//           $(".btnSubmitProperty").attr("disabled", false);
//           return false;
//       }
//   });


//   $("#startDate").on('change', function() {
//       var startDate = $("#startDate").val();
//       if (startDate == "") {
//           $(".errorInfo").show();
//           $(".errorInfo").text("* Select Tenancy Start Date");
//           $(".btnSubmitProperty").attr("disabled", true);
//           return false;
//       } else {
//           $(".errorInfo").hide();
//           $(".errorInfo").text("");
//           $(".btnSubmitProperty").attr("disabled", false);
//       }
//   });

//   $("#endDate").on('change', function() {
//       var endDate = $("#endDate").val();
//       if (endDate == "") {
//           $(".errorInfo").show();
//           $(".errorInfo").text("* Select Tenancy End Date");
//           $(".btnSubmitProperty").attr("disabled", true);
//           return false;
//       } else {
//           $(".errorInfo").hide();
//           $(".errorInfo").text("");
//           $(".btnSubmitProperty").attr("disabled", false);
//       }
//   });


$("#inputHmoLicenseNumber").keyup(function() {
    var inputHmoLicenseNumber = $("#inputHmoLicenseNumber").val();
    if (inputHmoLicenseNumber == "") {
        $("#inputHmoLicenseNumber").css("border-color", "red");
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter the HMO License Number");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else if(inputHmoLicenseNumber == 0){
        $("#inputHmoLicenseNumber").css("border-color", "red");
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter the Valid HMO License Number");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        $("#inputHmoLicenseNumber").css("border-color", "rgba(0,0,0,.12)");
        $(".btnSubmitProperty").attr("disabled", false);
    }
});

$("#inputLandlordTitle").on('change', function() {
    var inputLandlordTitle = $("#inputLandlordTitle").val();
    if (inputLandlordTitle == 0) {
        $(".errorInfo").css("border-color", "red");
        $(".errorInfo").show();
        $(".errorInfo").text("* Select the Landlord Title");
        $("#select2-inputLandlordTitle-container").css("border", "1px solid red");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        $("#select2-inputLandlordTitle-container").css("border", "1px solid transparent");
        $(".btnSubmitProperty").attr("disabled", false);
    }
});

$('#getName').keypress(function (e) {
    var regex = new RegExp("^[A-Za-z0-9? ,_-]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }
    e.preventDefault();
    return false;
});

$('#getName').keypress(function (e) {
    var regex = new RegExp("^[A-Za-z0-9? ,_-]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }
    e.preventDefault();
    return false;
});
 
$("#getName").keyup(function() {
    var getName = $.trim($("#getName").val());
    if (getName == "") {
        $("#getName").css("border-color", "red");
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter the Landlord First Name");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        $("#getName").css("border-color", "rgba(0,0,0,.12)");
        $(".btnSubmitProperty").attr("disabled", false);
    }
});

$('#getLastName').keypress(function (e) {
    var regex = new RegExp("^[A-Za-z0-9? ,_-]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }
    e.preventDefault();
    return false;
});

$("#getLastName").keyup(function() {
    var getLastName = $.trim($("#getLastName").val());
    if (getLastName == "") {
        $("#getLastName").css("border-color", "red");
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter the Landlord Last Name");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        $("#getLastName").css("border-color", "rgba(0,0,0,.12)");
        $(".btnSubmitProperty").attr("disabled", false);
    }
});

$("#inputEmailID").keyup(function() {
    var getEmail = $("#inputEmailID").val();
    if (getEmail == "") {
        $(".landlorderrorInfo").show();
        $(".landlorderrorInfo").text("* Please Enter the Landlord Email ID.");
        $("#inputEmailID").css("border-color", "red");
        $(".errorInfo").show();
        $(".errorInfo").text("* Please Enter the Landlord Email ID");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else if (!isValidEmailAddress(getEmail)) {
        $(".landlorderrorInfo").show();
        $(".landlorderrorInfo").text("* Please Enter the Proper Landlord Email ID.");
        $(".errorInfo").show();
        $(".errorInfo").text("* Please Enter the Proper Landlord Email ID.");
        $("#inputEmailID").css("border-color", "red");
        $(".landlordInfo").show();
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".landlorderrorInfo").hide();
        $(".landlorderrorInfo").html("");
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        $("#inputEmailID").css("border-color", "rgba(0,0,0,.12)");
        $(".btnSubmitProperty").attr("disabled", false);
    }
});


$("#inputMobileNumber").keyup(function() {
    var inputMobileNumber = $("#inputMobileNumber").val();
    if (inputMobileNumber == "") {
        $(".mno-prefix").hide();
        $("#inputMobileNumber").removeAttr('style');
        $(".errorInfo").show();
        $("#inputMobileNumber").css("border-color", "red");
        $(".errorInfo").text("* Enter the Mobile Number");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".mno-prefix").show();
        $("#inputMobileNumber").css("padding", "10px 25px 10px 35px");
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        $("#inputMobileNumber").css("border-color", "rgba(0,0,0,.12)");
        $(".btnSubmitProperty").attr("disabled", false);
    }
});

$("#inputAddress1").keyup(function() {
    var inputAddress1 = $.trim($("#inputAddress1").val());
    if (inputAddress1 == "") {
        $("#inputAddress1").css("border-color", "red");
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter the Landlord Address");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        $("#inputAddress1").css("border-color", "rgba(0,0,0,.12)");
        $(".btnSubmitProperty").attr("disabled", false);
    }
});

$("#inputState1").on('change', function() {
    var inputState1 = $("#inputState1").val();
    if (inputState1 == 0) {
        $(".errorInfo").css("border-color", "red");
        $(".errorInfo").show();
        $(".errorInfo").text("* Select the Landlord State");
        $("#select2-inputState1-container").css("border", "1px solid red");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        $("#select2-inputState1-container").css("border", "");
        $(".btnSubmitProperty").attr("disabled", false);
    }
});

$("#inputCity1").on('change', function() {
    var inputCity1 = $("#inputCity1").val();
    if (inputCity1 == 0) {
        $(".errorInfo").css("border-color", "red");
        $(".errorInfo").show();
        $(".errorInfo").text("* Select the Landlord City");
        $("#select2-inputCity1-container").css("border", "1px solid red");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        $("#select2-inputCity1-container").css("border", "");
        $(".btnSubmitProperty").attr("disabled", false);
    }
});

$('#inpuZip1').keypress(function (e) {
    var regex = new RegExp("^[A-Za-z0-9? ,_-]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }
    e.preventDefault();
    return false;
});


$("#inpuZip1").keyup(function() {
    var inpuZip1 = $.trim($("#inpuZip1").val());
    if (inpuZip1 == "") {
        $(".errorInfo").css("border-color", "red");
        $(".errorInfo").show();
        if(getPhoneCode == +44){
        $(".errorInfo").text("* Enter the Landlord Post Code");
        } else {
            $(".errorInfo").text("* Enter the Landlord Zip Code");
        }
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        $("#inpuZip1").css("border-color", "rgba(0,0,0,.12)");
        $(".btnSubmitProperty").attr("disabled", false);
    }
});

$("#inputFuel").on('change', function() {
    var inputfeul = $("#inputFuel").val();
    if (inputfeul == 0) {
        $(".errorInfo").css("border-color", "red");
        $(".errorInfo").show();
        $(".errorInfo").text("* Select the Fuel Type");
        $("#select2-inputFuel-container").css("border", "1px solid red");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        $("#select2-inputFuel-container").css("border", "");
        $(".btnSubmitProperty").attr("disabled", false);
        return false;
    }
});



$("#inputSupplierElectric").on('change', function() {
    var inputsupplierElectric = $("#inputFuel").val();
    if (inputsupplierElectric == 0) {
        $(".errorInfo").css("border-color", "red");
        $(".errorInfo").show();
        $(".errorInfo").text("* Select the Supplier Electric");
        $("#select2-inputSupplierElectric-container").css("border", "1px solid red");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        $("#select2-inputSupplierElectric-container").css("border", "");
        $(".btnSubmitProperty").attr("disabled", false);
        return false;
    }
});

$("#inputWaterAuthority").on('change', function() {
    var inputWaterAuthority = $("#inputFuel").val();
    if (inputWaterAuthority == "Select Water Authority") {
        $(".errorInfo").css("border-color", "red");
        $(".errorInfo").show();
        $(".errorInfo").text("* Select the Water Authority");
        $("#select2-inputWaterAuthority-container").css("border", "1px solid red");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        $("#select2-inputWaterAuthority-container").css("border", "");
        $(".btnSubmitProperty").attr("disabled", false);
        return false;
    }
});

$("#inputSupplierGas").on('change', function() {
    var inputSupplierGas = $("#inputSupplierGas").val();
    if (inputSupplierGas == 0) {
        $(".errorInfo").css("border-color", "red");
        $(".errorInfo").show();
        $(".errorInfo").text("* Select the Supplier Gas");
        $("#select2-inputSupplierGas-container").css("border", "1px solid red");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        $("#select2-inputSupplierGas-container").css("border", "");
        $(".btnSubmitProperty").attr("disabled", false);
        return false;
    }
});



$("#inputEconomy7").on('change', function() {
    var inputEconomy7 = $("#inputEconomy7").val();
    if (inputEconomy7 == 0) {
        $(".errorInfo").css("border-color", "red");
        $(".errorInfo").show();
        $(".errorInfo").text("* Select the Economy");
        $("#select2-inputEconomy7-container").css("border", "1px solid red");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        $("#select2-inputEconomy7-container").css("border", "");
        $(".btnSubmitProperty").attr("disabled", false);
        return false;
    }
});

$("#inputWaterMeter").on('change', function() {
    var inputWaterMeter = $("#inputWaterMeter").val();
    if (inputWaterMeter == 0) {
        $(".errorInfo").css("border-color", "red");
        $(".errorInfo").show();
        $(".errorInfo").text("* Select the Water Meter");
        $("#select2-inputWaterMeter-container").css("border", "1px solid red");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        $("#select2-inputWaterMeter-container").css("border", "");
        $(".btnSubmitProperty").attr("disabled", false);
        return false;
    }
});


$("#inputRead1").keyup(function() {
    var getRead1 = $("#inputRead1").val();
    if (getRead1 == "") {
        $("#inputRead1").css("border-color", "red");
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter Electric Reading 1");
        //$("#inputName-1").val(getName);
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        //$("#inputName-1").val(getName);
        $("#inputRead1").css("border-color", "rgba(0,0,0,.12)");
        $(".btnSubmitProperty").attr("disabled", false);
    }
});



$("#inputRead2").keyup(function() {
    var getRead2 = $("#inputRead2").val();
    if (getRead2 == "") {
        $("#inputRead2").css("border-color", "red");
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter Electric Reading 2");
        //$("#inputName-1").val(getName);
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        //$("#inputName-1").val(getName);
        $("#inputRead2").css("border-color", "rgba(0,0,0,.12)");
        $(".btnSubmitProperty").attr("disabled", false);
    }
});



$("#inputGas").keyup(function() {
    var getGas = $("#inputGas").val();
    if (getGas == "") {
        $("#inputGas").css("border-color", "red");
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter Electric Reading 2");
        //$("#inputName-1").val(getName);
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        //$("#inputName-1").val(getName);
        $("#inputGas").css("border-color", "rgba(0,0,0,.12)");
        $(".btnSubmitProperty").attr("disabled", false);
    }
});


$("#inputWater").keyup(function() {
    var getWater = $("#inputWater").val();
    if (getWater == "") {
        $("#inputWater").css("border-color", "red");
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter Water Reading");
        //$("#inputName-1").val(getName);
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        //$("#inputName-1").val(getName);
        $("#inputWater").css("border-color", "rgba(0,0,0,.12)");
        $(".btnSubmitProperty").attr("disabled", false);
    }
});


$("#inputWaterAuthority").keyup(function() {
    var getWaterAuthority = $("#inputWaterAuthority").val();
    if (getWaterAuthority != "") {
        var getTaxAuthority = $("#inputTaxAuthority").val();
        $("#select2-inputTaxAuthority-container").val(getTaxAuthority);
    }
});





$("#validFrom").keyup(function() {
    var getValidFrom = $("#validFrom").val();
    if (getValidFrom == "") {
        $("#validFrom").css("border-color", "red");
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter Valid From");
        //$("#inputName-1").val(getName);
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        //$("#inputName-1").val(getName);
        $("#validFrom").css("border-color", "rgba(0,0,0,.12)");
        $(".btnSubmitProperty").attr("disabled", false);
    }
});




$("#validTo").keyup(function() {
    var getValidTo = $("#validTo").val();
    if (getValidTo == "") {
        $("#validTo").css("border-color", "red");
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter Valid To");
        //$("#inputName-1").val(getName);
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        //$("#inputName-1").val(getName);
        $("#validTo").css("border-color", "rgba(0,0,0,.12)");
        $(".btnSubmitProperty").attr("disabled", false);
    }
});

$("#imgEnergyPerformanceCertificate").keyup(function() {
    var getImageEnergy = $("#imgEnergyPerformanceCertificate").val();
    if (getImageEnergy == "") {
        $("#validTo").css("border-color", "red");
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter Image Energy Certificate");
        //$("#inputName-1").val(getName);
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        //$("#inputName-1").val(getName);
        $("#imgEnergyPerformanceCertificate").css("border-color", "rgba(0,0,0,.12)");
        $(".btnSubmitProperty").attr("disabled", false);
    }
});


$("#electricityValidFrom").keyup(function() {
    var getElectricityValidFrom = $("#electricityValidFrom").val();
    if (getElectricityValidFrom == "") {
        $("#electricityValidFrom").css("border-color", "red");
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter Electricity Valid From");
        //$("#inputName-1").val(getName);
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        //$("#inputName-1").val(getName);
        $("#electricityValidFrom").css("border-color", "rgba(0,0,0,.12)");
        $(".btnSubmitProperty").attr("disabled", false);
    }
});


$("#electricityValidTo").keyup(function() {
    var getElectricityValidTo = $("#electricityValidTo").val();
    if (getElectricityValidTo == "") {
        $("#electricityValidTo").css("border-color", "red");
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter Electricity Valid From");
        //$("#inputName-1").val(getName);
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        //$("#inputName-1").val(getName);
        $("#electricityValidTo").css("border-color", "rgba(0,0,0,.12)");
        $(".btnSubmitProperty").attr("disabled", false);
    }
});



$("#imgElectricityCertificate").keyup(function() {
    var getImageElectricity = $("#imgEnergyPerformanceCertificate").val();
    if (getImageElectricity == "") {
        $("#imgElectricityCertificate").css("border-color", "red");
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter Image Electricity Certificate");
        //$("#inputName-1").val(getName);
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        //$("#inputName-1").val(getName);
        $("#imgElectricityCertificate").css("border-color", "rgba(0,0,0,.12)");
        $(".btnSubmitProperty").attr("disabled", false);
    }
});




$("#gasValidFrom").keyup(function() {
    var getGasValidFrom = $("#gasValidFrom").val();
    if (getGasValidFrom == "") {
        $("#gasValidFrom").css("border-color", "red");
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter Gas Valid From");
        //$("#inputName-1").val(getName);
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        //$("#inputName-1").val(getName);
        $("#gasValidFrom").css("border-color", "rgba(0,0,0,.12)");
        $(".btnSubmitProperty").attr("disabled", false);
    }
});

$("#gasValidTo").keyup(function() {
    var getGasValidTo = $("#gasValidTo").val();
    if (getGasValidTo == "") {
        $("#gasValidFrom").css("border-color", "red");
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter Gas Valid From");
        //$("#inputName-1").val(getName);
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        //$("#inputName-1").val(getName);
        $("#gasValidTo").css("border-color", "rgba(0,0,0,.12)");
        $(".btnSubmitProperty").attr("disabled", false);
    }
});

$("#imgGasCertificate").keyup(function() {
    var getImageGas = $("#imgGasCertificate").val();
    if (getImageGas == "") {
        $("#imgGasCertificate").css("border-color", "red");
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter Image Gas Certificate");
        //$("#inputName-1").val(getName);
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        //$("#inputName-1").val(getName);
        $("#imgGasCertificate").css("border-color", "rgba(0,0,0,.12)");
        $(".btnSubmitProperty").attr("disabled", false);
    }
});


$("#gasLegionellaTest").keyup(function() {
    var gasLegionellaTest = $("#gasLegionellaTest").val();
    if (gasLegionellaTest == "") {
        $("#gasLegionellaTest").css("border-color", "red");
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter Legionella Test");
        //$("#inputName-1").val(getName);
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        //$("#inputName-1").val(getName);
        $("#gasLegionellaTest").css("border-color", "rgba(0,0,0,.12)");
        $(".btnSubmitProperty").attr("disabled", false);
    }
});


$("#inputMobile-1").keyup(function() {
    var getMobile1 = $("#inputMobile").val();
    if (getMobile1 == "") {
        $("#gasValidFrom").css("border-color", "red");
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter Mobile");
        //$("#inputName-1").val(getName);
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        //$("#inputName-1").val(getName);
        $("#inputMobile-1").css("border-color", "rgba(0,0,0,.12)");
        $(".btnSubmitProperty").attr("disabled", false);
    }
});

$("#inputEmail-1").keyup(function() {
    var getEmail1 = $("#inputEmail").val();
    if (getEmail1 == "") {
        $("#inputEmail-1").css("border-color", "red");
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter Email");
        //$("#inputName-1").val(getName);
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        //$("#inputName-1").val(getName);
        $("#inputEmail-1").css("border-color", "rgba(0,0,0,.12)");
        $(".btnSubmitProperty").attr("disabled", false);
    }
});


$("#inputName-1").keyup(function() {
    var getName1 = $("#inputName-1").val();
    if (getName1 == "") {
        $("#inputName-1").css("border-color", "red");
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter Name");
        //$("#inputName-1").val(getName);
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        //$("#inputName-1").val(getName);;
        $("#inputName-1").css("border-color", "rgba(0,0,0,.12)");
        $(".btnSubmitProperty").attr("disabled", false);
    }
});

$("#inputLastName-1").keyup(function() {
    var getLastName1 = $("#inputLastName-1").val();
    if (getLastName1 == "") {
        $("#inputLastName-1").css("border-color", "red");
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter Last Name");
        //$("#inputLastName-1").val(getLastName);
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        //$("#inputLastName-1").val(getLastName);;
        $("#inputLastName-1").css("border-color", "rgba(0,0,0,.12)");
        $(".btnSubmitProperty").attr("disabled", false);
    }
});

$("#inputTitle-1").keyup(function() {
    var getTitle1 = $("#inputTitle-1").val();
    if (getTitle1 == "") {
        $("#select2-inputTitle-1-container").css("border-color", "red");
        $(".errorInfo").show();
        $(".errorInfo").text("* Select Title");
        //$("#select2-inputTitle-1-container").val(getTitle);
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        //$("#select2-inputTitle-1-container").val(getTitle);
        $("#select2-inputTitle-1-container").css("border-color", "rgba(0,0,0,.12)");
        $(".btnSubmitProperty").attr("disabled", false);
    }
});

$("#inputLandlordName").keyup(function() {
    var inputLandlordName = $("#inputLandlordName").val();
    if (inputLandlordName == "") {
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter the Landlord Name");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        $(".btnSubmitProperty").attr("disabled", false);
    }
});

$("#inputLandlordEmail").keyup(function() {
    var inputLandlordEmail = $("#inputLandlordEmail").val();
    if (inputLandlordEmail == "") {
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter the Landlord Email");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        $(".btnSubmitProperty").attr("disabled", false);
    }
});


$("#inputLandlordContactNumber").keyup(function() {
    var inputLandlordContactNumber = $("#inputLandlordContactNumber").val();
    if (inputLandlordContactNumber == "") {
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter the Landlord Mobile Number");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        $(".btnSubmitProperty").attr("disabled", false);
    }
});

$("#inputTaxAuthority").on('change', function() {
    var inputTaxAuthority = $("#inputTaxAuthority").val();
    if (inputTaxAuthority == 0) {
        $(".errorInfo").css("border-color", "red");
        $(".errorInfo").show();
        $(".errorInfo").text("* Select the Council Authority");
        $("#select2-inputTaxAuthority-container").css("border", "1px solid red");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } else {
        $(".errorInfo").hide();
        $(".errorInfo").text("");
        $("#select2-inputTaxAuthority-container").css("border", "");
        $(".btnSubmitProperty").attr("disabled", false);
    }
});



$("#startDate").click(function() {
    $("#startDate").css("border-color", "rgba(0,0,0,.12)");
    $(".help-block").hide();
    $(".help-block").text("");
    $(".btnSubmitProperty").attr("disabled", false);
});

$("#endDate").click(function() {
    $("#endDate").css("border-color", "rgba(0,0,0,.12)");
    $(".help-block").hide();
    $(".help-block").text("");
    $(".btnSubmitProperty").attr("disabled", false);
});

$("#validFrom").click(function() {
    $("#validFrom").css("border-color", "rgba(0,0,0,.12)");
    $(".help-block").hide();
    $(".help-block").text("");
    $(".btnSubmitProperty").attr("disabled", false);
});

$("#validTo").click(function() {
    $("#validTo").css("border-color", "rgba(0,0,0,.12)");
    $(".errorInfo").hide();
    $(".errorInfo").text("");
    $(".btnSubmitProperty").attr("disabled", false);
});

$("#electricityValidFrom").click(function() {
    $("#electricityValidFrom").css("border-color", "rgba(0,0,0,.12)");
    $(".errorInfo").hide();
    $(".errorInfo").text("");
    $(".btnSubmitProperty").attr("disabled", false);
});

$("#electricityValidTo").click(function() {
    $("#electricityValidTo").css("border-color", "rgba(0,0,0,.12)");
    $(".errorInfo").hide();
    $(".errorInfo").text("");
    $(".btnSubmitProperty").attr("disabled", false);
});


$("#gasValidFrom").click(function() {
    $("#gasValidFrom").css("border-color", "rgba(0,0,0,.12)");
    $(".errorInfo").hide();
    $(".errorInfo").text("");
    $(".btnSubmitProperty").attr("disabled", false);
});


$("#gasValidTo").click(function() {
    $("#gasValidTo").css("border-color", "rgba(0,0,0,.12)");
    $(".errorInfo").hide();
    $(".errorInfo").text("");
    $(".btnSubmitProperty").attr("disabled", false);
});


$("#legValidFrom").click(function() {
    $("#legValidFrom").css("border-color", "rgba(0,0,0,.12)");
    $(".errorInfo").hide();
    $(".errorInfo").text("");
    $(".btnSubmitProperty").attr("disabled", false);
});


$("#legValidTo").click(function() {
    $("#legValidTo").css("border-color", "rgba(0,0,0,.12)");
    $(".errorInfo").hide();
    $(".errorInfo").text("");
    $(".btnSubmitProperty").attr("disabled", false);
});

  $('input[name="radio_demo_inline3"]:radio').on('ifChecked', function(event) {
      $(".homeIns").css("color", "#444");
      $(".errorInfo").hide();
      $(".errorInfo").text("");
      $(".btnSubmitProperty").attr("disabled", false);
  });



  $('input[name="propManaged"]:radio').on('ifChecked', function(event) {
      $(".propertyMan").css("color", "#444");
      $(".errorInfo").hide();
      $(".errorInfo").text("");
      $(".btnSubmitProperty").attr("disabled", false);
  });

   $('input[name="voidPart"]:radio').on('ifChecked', function(event) {
      $(".isVoid").css("color", "#444");
      $(".errorInfo").hide();
      $(".errorInfo").text("");
      $(".btnSubmitProperty").attr("disabled", false);
  });


   $('input[name="landlordIns"]:radio').on('ifChecked', function(event) {
      $(".homeIns").css("color", "#444");
      $(".errorInfo").hide();
      $(".errorInfo").text("");
      $(".btnSubmitProperty").attr("disabled", false);
  });



$('input[name="economy7"]:checkbox').on('ifChecked', function(event) {
      $(".errorInfo").hide();
      $(".errorInfo").text("");
      $(".btnSubmitProperty").attr("disabled", false);
  });

  $('input[name="hmoSelect"]:radio').on('ifChecked', function(event) {
      $(".propSingle").css("border-color", "red");
      $(".propMultiple").css("border-color", "red");
      $(".errorInfo").hide();
      $(".errorInfo").text("");
      $(".btnSubmitProperty").attr("disabled", false);
  });