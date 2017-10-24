function addUpdatePropertyValidation() {
    // debugger;
    var getPhoneCode = localStorage.getItem("MyRequest_PhoneCode-prefix");
//    getAddTenantArr = new Array();
    var hiddenPropertyID = $("#hiddenPropertyID").val();
    var landlordTitle = $("#select2-inputLandlordTitle-container").html();
    var name = $("#getName").val().replace(/["']/g, "`");
    var lastName = $("#getLastName").val().replace(/["']/g, "`");
    var emailID = $("#inputEmailID").val();
    var mobileNumber = $("#inputMobileNumber").val();

    var getAppYes = $('.appYes > div').hasClass('checked');
    var getAppNo = $('.appNo > div').hasClass('checked');
   
    if (getAppYes === true) {
        isAppInstalled = 1;
    }
   
    if (getAppNo === true) {
        isAppInstalled = 0;
    }

    var propertyCreated = "";
    var propertyUpdated = "";
    var getHMOSingle = $('.propSingle > div').hasClass('checked');
    var getHMOMultiple = $('.propMultiple > div').hasClass('checked');
    
    if (getHMOSingle === true) {
        hmoOccupancy = "No";
        $(".hmoInputTenent").hide();
        $(".hmoLicenseNumber").hide();
    }

    if (getHMOMultiple === true) {
        hmoOccupancy = "Yes";
        $(".hmoInputTenent").show();
        $(".hmoLicenseNumber").show();

    }
   

    var getAgency = $('.agency > div').hasClass('checked');
         var getLandlord = $('.landlord > div').hasClass('checked');
         if(getAgency===true){
            isVoid="Yes";
         }
         if(getLandlord===true){
            isVoid="No";
         }


    
    var address = $("#inputAddress").val();
    var location = $("#inputLocation").val();
    var fuel = $("#select2-inputFuel-container").html();
    var supplierElectric = $("#select2-inputSupplierElectric-container").html();
    var supplierGas = $("#select2-inputSupplierGas-container").html();
    var read1 = $("#inputRead1").val();
    var read2 = $("#inputRead2").val();
    var economy7 = $("#hiddenIsEconomy7").val();
    var waterMeter = $("#hiddenIsWaterMeter").val();
    var gas = $("#inputGas").val();
    var water = $("#inputWater").val();
    var waterAuthority = $("#select2-inputWaterAuthority-container").html();
    var taxAuthority = $("#select2-inputTaxAuthority-container").html();
    var state = $("#select2-inputState-container").html();
    var property = $("#select2-inputProperty-container").html();
    var bedrooms = $("#select2-inputBedrooms-container").html();
    var propertyStatus = $("#select2-inputPropertyStatus-container").html();
    var city = $("#select2-inputCity-container").html();
    var zip = $("#inpuZip").val();
    var country = $("#inputCountry").val();
   
    var hmoLicenseNumber = $("#inputHmoLicenseNumber").val();
    var homeInsurYes = $(".homeInsurYes > div").hasClass("checked");
    var homeInsurNo = $(".homeInsurNo > div").hasClass("checked");
    if (homeInsurYes == true) {
        homeInsurance = 1;
    }
    if (homeInsurNo == true) {
        homeInsurance = 0;
    }
    var propManageFull = $(".propManageFull > div").hasClass("checked");
    var propManageSemi = $(".propManageSemi > div").hasClass("checked");
    var propManageLet = $(".propManageLet > div").hasClass("checked");
    if (propManageFull == true) {
        getPropertyManaged = "Full";
    }
    if (propManageSemi == true) {
        getPropertyManaged = "Semi";
    }

    if (propManageLet == true) {
        getPropertyManaged = "Let";
    }
   

    var landlordState = $("#select2-inputState1-container").html();
    var landlordCity = $("#select2-inputCity1-container").html();
    var landlordZip = $("#inpuZip1").val();
    var landlordAddress = $("#inputAddress1").val();


    var validFrom = $("#validFrom").val();
    var getFormatValidFromDate = validFrom.split(".");
    var finalValidFromDate = getFormatValidFromDate[2] + "-" + getFormatValidFromDate[1] + "-" + getFormatValidFromDate[0];
    var validTo = $("#validTo").val();
    var getFormatValidToDate = validTo.split(".");
    var finalValidToDate = getFormatValidToDate[2] + "-" + getFormatValidToDate[1] + "-" + getFormatValidToDate[0];
  

    var electricityValidFrom = $("#electricityValidFrom").val();
    var getFormatElecValidFromDate = electricityValidFrom.split(".");
    var finalElecFromDate = getFormatElecValidFromDate[2] + "-" + getFormatElecValidFromDate[1] + "-" + getFormatElecValidFromDate[0];
    var electricityValidTo = $("#electricityValidTo").val();
    var getFormatElecValidToDate = electricityValidTo.split(".");
    var finalElecToDate = getFormatElecValidToDate[2] + "-" + getFormatElecValidToDate[1] + "-" + getFormatElecValidToDate[0];
   

    var gasValidFrom = $("#gasValidFrom").val();
    var getFormatGasValidFromDate = gasValidFrom.split(".");
    var finalGasFromDate = getFormatGasValidFromDate[2] + "-" + getFormatGasValidFromDate[1] + "-" + getFormatGasValidFromDate[0];
    var gasValidTo = $("#gasValidTo").val();
    var getFormatGasValidToDate = gasValidTo.split(".");
    var finalGasToDate = getFormatGasValidToDate[2] + "-" + getFormatGasValidToDate[1] + "-" + getFormatGasValidToDate[0];

    var legValidFrom = $("#legValidFrom").val();
    var getFormatLegValidFromDate = legValidFrom.split(".");
    var finalLegFromDate = getFormatLegValidFromDate[2] + "-" + getFormatLegValidFromDate[1] + "-" + getFormatLegValidFromDate[0];


    var legValidTo = $("#legValidTo").val();
    var getFormatLegValidToDate = legValidTo.split(".");
    var finalLegToDate = getFormatLegValidToDate[2] + "-" + getFormatLegValidToDate[1] + "-" + getFormatLegValidToDate[0];
   
    var inputUserRegID = "";
    var isLeadTenant = "";
    var radioYes = "";
    var radioNo = "";
    var getIsAppInstalled = "";
    adminUserID = localStorage.getItem("MyRequest_AdminID");

    

    // if (fuel == "Select Fuel Type") {
    //     $(".errorInfo").show();
    //     $(".errorInfo").text("* Select the Fuel Type");
    //     $("#select2-inputFuel-container").css("border", "1px solid red");
    //     $(".utilityInfo").show();
    //     $(".btnSubmitProperty").attr("disabled", true);
    //     return false;
    // }
     

    // if (supplierGas == "Select Supplier Gas") {
    //     $(".errorInfo").show();
    //     $(".errorInfo").text("* Select the Supplier Gas");
    //     $("#select2-inputSupplierGas-container").css("border", "1px solid red");
    //     $(".utilityInfo").show();
    //     $(".btnSubmitProperty").attr("disabled", true);
    //     return false;
    // }

    // if (fuel == "Duel" && gas == "") {
    //     $(".errorInfo").show();
    //     $(".errorInfo").text("* Enter the Gas Meter Reading");
    //     $("#inputGas").css("border-color", "red");
    //     $(".btnSubmitProperty").attr("disabled", true);
    //     return false;
    // }

    // if (supplierElectric == "Select Supplier Electric") {
    //     $(".errorInfo").show();
    //     $(".errorInfo").text("* Select the Supplier Electric");
    //     $("#select2-inputSupplierElectric-container").css("border", "1px solid red");
    //     $(".utilityInfo").show();
    //     $(".btnSubmitProperty").attr("disabled", true);
    //     return false;
    // }


    // if (read1 == "") {
    //     $(".errorInfo").show();
    //     $(".errorInfo").text("* Enter the Electricity Meter Reading 1");
    //     $("#inputRead1").css("border-color", "red");
    //     $(".btnSubmitProperty").attr("disabled", true);
    //     return false;
    // }

    // if (economy7 == "1" && read2 == "") {
    //     $(".errorInfo").show();
    //     $(".errorInfo").text("* Enter the Electricity Meter Reading 2");
    //     $("#inputRead2").css("border-color", "red");
    //     $(".btnSubmitProperty").attr("disabled", true);
    //     return false;
    // }

    // if (taxAuthority == "Select Council") {
    //     $(".errorInfo").show();
    //     $(".errorInfo").text("* Select the Council Authority");
    //     $("#select2-inputTaxAuthority-container").css("border", "1px solid red");
    //     $(".utilityInfo").show();
    //     $(".btnSubmitProperty").attr("disabled", true);
    //     return false;
    // }

    // if ( waterMeter== "1" && water == "") {
    //     $(".errorInfo").show();
    //     $(".errorInfo").text("* Enter Water Meter Reading");
    //     $("#inputWater").css("border-color", "red");
    //     $(".utilityInfo").show();
    //     $(".btnSubmitProperty").attr("disabled", true);
    //     return false;
    // }
    
    // if (waterMeter== "1" && waterAuthority == "Select Water Authority") {
    //     $(".errorInfo").show();
    //     $(".errorInfo").text("* Select the Water Authority");
    //     $("#select2-inputWaterAuthority-container").css("border", "1px solid red");
    //     $(".utilityInfo").show();
    //     $(".btnSubmitProperty").attr("disabled", true);
    //     return false;
    // }

    //  var inputMobilezero = $("#inputMobile-0").val();
    //  var inputTitlezero = $("#inputTitle-0").val();
    //  var inputNamezero = $("#inputName-0").val();
    //  var inputLastNamezero = $("#inputLastName-0").val();
    //  var inputEmailzero = $("#inputEmail-0").val();
    //  var inputStartDatezero = $("#inputStartDate-0").val();
    //  var inputEndDatezero = $("#inputEndDate-0").val();

    // if (inputMobilezero == "") {
    //     $(".errorInfo").show();
    //     $(".errorInfo").text("* Please Entert the Tenants Mobile number");
    //     $("#inputMobile-0").css("border-color", "red");
    //     // $(".utilityInfo").show();
    //     $(".btnSubmitProperty").attr("disabled", true);
    //     return false;
    // }

    var mobileID = "";
    var inputMobile = "";
    var titleID = "";
    var inputTitle = "";
    var nameID = "";
    var inputName = "";
    var lastNameID = "";
    var inputLastName = "";
    var tenantEmailID = "";
    var inputEmail = "";
    var startDateID = "";
    var inputStartDate = "";
    var endDateID = "";
    var inputEndDate = "";

    $('.inputMobile').each(function () {
        mobileID = this.id;
        inputMobile = $("#"+mobileID).val();
        if(inputMobile == ""){
            $(".errorInfo").show();
            $(".errorInfo").text("* Enter Tenant's Mobile Number");
            $("#"+mobileID).css("border-color", "red");
            $(".btnSubmitProperty").attr("disabled", true);
            return false;
        } else {
            $(".errorInfo").hide();
            $(".errorInfo").html("");
            $("#"+mobileID).css("border-color", "rgba(0, 0, 0, 0.12)");
            $(".btnSubmitProperty").attr("disabled", false);
        }
    });

    

    $('.inputTitle').each(function () {
        titleID = this.id;
        inputTitle = $("#select2-"+titleID+"-container").html();
        if(inputTitle == "Select Title"){
            $(".errorInfo").show();
            $(".errorInfo").text("* Select Title");
            $("#select2-"+titleID+"-container").css("border", "1px solid red");
            $(".btnSubmitProperty").attr("disabled", true);
            return false;
        } else {
            $(".errorInfo").hide();
            $(".errorInfo").html("");
            $("#select2-"+titleID+"-container").css("border", "rgba(0, 0, 0, 0.12)");
            $(".btnSubmitProperty").attr("disabled", false);
        }
    });

    $('.inputName').each(function () {
        nameID = this.id;
        inputName = $("#"+nameID).val();
        if(inputName == ""){
            $(".errorInfo").show();
            $(".errorInfo").text("* Enter Tenant's First Name");
            $("#"+nameID).css("border-color", "red");
            $(".btnSubmitProperty").attr("disabled", true);
            return false;
        } else {
            $(".errorInfo").hide();
            $(".errorInfo").html("");
            $("#"+nameID).css("border-color", "rgba(0, 0, 0, 0.12)");
            $(".btnSubmitProperty").attr("disabled", false);
        }
    });

    $('.inputLastName').each(function () {
        lastNameID = this.id;
        inputLastName = $("#"+lastNameID).val();
        if(inputLastName == ""){
            $(".errorInfo").show();
            $(".errorInfo").text("* Enter Tenant's Last Name");
            $("#"+lastNameID).css("border-color", "red");
            $(".btnSubmitProperty").attr("disabled", true);
            return false;
        } else {
            $(".errorInfo").hide();
            $(".errorInfo").html("");
            $("#"+lastNameID).css("border-color", "rgba(0, 0, 0, 0.12)");
            $(".btnSubmitProperty").attr("disabled", false);
        }
    });

    $('.inputEmail').each(function () {
        tenantEmailID = this.id;
        inputEmail = $("#"+tenantEmailID).val();
        if(inputEmail == ""){
            $(".errorInfo").show();
            $(".errorInfo").text("* Enter Tenant's EmailID");
            $("#"+tenantEmailID).css("border-color", "red");
            $(".btnSubmitProperty").attr("disabled", true);
            return false;
        } else {
            $(".errorInfo").hide();
            $(".errorInfo").html("");
            $("#"+tenantEmailID).css("border-color", "rgba(0, 0, 0, 0.12)");
            $(".btnSubmitProperty").attr("disabled", false);
        }
    });

    
    $('.inputStartDate').each(function () {
        startDateID = this.id;
        inputStartDate = $("#"+startDateID).val();
        if(inputStartDate == ""){
            $(".errorInfo").show();
            $(".errorInfo").text("* Select Start Date");
            $("#"+startDateID).css("border-color", "red");
            $(".btnSubmitProperty").attr("disabled", true);
            return false;
        }
    });

    $("#"+startDateID).on('change', function() {
        inputStartDate = $("#"+startDateID).val();
        if(inputStartDate == ""){
            $(".errorInfo").show();
            $(".errorInfo").text("* Select Start Date");
            $("#"+startDateID).css("border-color", "red");
            $(".btnSubmitProperty").attr("disabled", true);
            return false;
        } else {
            $(".errorInfo").hide();
            $(".errorInfo").html("");
            $("#"+startDateID).css("border-color", "rgba(0, 0, 0, 0.12)");
            $(".btnSubmitProperty").attr("disabled", false);
        }
    });

    
    $('.inputEndDate').each(function () {
        endDateID = this.id;
        inputEndDate = $("#"+endDateID).val();
        if(inputEndDate == ""){
            $(".errorInfo").show();
            $(".errorInfo").text("* Select End Date");
            $("#"+endDateID).css("border-color", "red");
            $(".btnSubmitProperty").attr("disabled", true);
            return false;
        }
    });

    $("#"+endDateID).on('change', function() {
        inputEndDate = $("#"+endDateID).val();
        if(inputEndDate == ""){
            $(".errorInfo").show();
            $(".errorInfo").text("* Select End Date");
            $("#"+endDateID).css("border-color", "red");
            $(".btnSubmitProperty").attr("disabled", true);
            return false;
        } else {
            $(".errorInfo").hide();
            $(".errorInfo").html("");
            $("#"+endDateID).css("border-color", "rgba(0, 0, 0, 0.12)");
            $(".btnSubmitProperty").attr("disabled", false);
        }
    });
    
    if (address == "") {
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter the Address");
        $("#inputAddress").css("border-color", "red");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    }

    if (state == "Select County") {
        $(".errorInfo").show();
        $(".errorInfo").text("* Select the County");
        $("#select2-inputState-container").css("border", "1px solid red");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    }

    if (city == "Choose City" || city == undefined) {
        $(".errorInfo").show();
        $(".errorInfo").text("* Select the City");
        $("#select2-inputCity-container").css("border", "1px solid red");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    }

    if (zip == "") {
        $(".errorInfo").show();
        if(getPhoneCode == +44){
            $(".errorInfo").text("* Enter the Post Code");
          } else {
              $(".errorInfo").text("* Enter the Zip Code");
          }
        $("#inpuZip").css("border-color", "red");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    }

    if (getAgency == "" && getLandlord == "") {
        $(".errorInfo").show();
        $(".errorInfo").text("* Select Is Void");
        $(".isVoid").css("color", "red");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    }

    if (propManageFull == "" && propManageSemi == "" && propManageLet == "") {
        $(".errorInfo").show();
        $(".errorInfo").text("* Select Property Managed");
        $(".propertyMan").css("color", "red");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    }

    if (property == "Select Property Type") {
        $(".errorInfo").show();
        $(".errorInfo").text("* Select the Property Type");
        $("#select2-inputProperty-container").css("border", "1px solid red");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    }

    if (bedrooms == "Select Bedrooms") {
        $(".errorInfo").show();
        $(".errorInfo").text("* Select The Number Of Bedrooms");
        $("#select2-inputBedrooms-container").css("border", "1px solid red");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    }
    
    if (propertyStatus == "Select Property Status") {
        $(".errorInfo").show();
        $(".errorInfo").text("* Select The Property Status");
        $("#select2-inputPropertyStatus-container").css("border", "1px solid red");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    }
 
    if (homeInsurYes == "" && homeInsurNo == "") {
        $(".errorInfo").show();
        $(".errorInfo").text("* Select Landlord Insurance");
        $(".homeIns").css("color", "red");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    }

   if (hmoLicenseNumber == "" && getHMOMultiple == true) {
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter The License Number");
        $("#inputHmoLicenseNumber").css("border-color", "red");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    }

   if (imageUrl4 == "" && getHMOMultiple == true) {
        $(".errorInfo").show();
        $(".errorInfo").text("* Upload the HMO Image");
        $("#imgHmoUploadPic").css("border", "1px solid red");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    }
    
   if (landlordTitle == "Select Title") {
        $(".landlordInfo").show();
        $(".errorInfo").show();
        $(".errorInfo").text("* Select the Landlord Title");
        $("#select2-inputLandlordTitle-container").css("border", "1px solid red");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    }

    if (name == "") {
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter the Landlord First Name");
        $("#getName").css("border-color", "red");
        $(".landlordInfo").show();
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    }

     if (lastName == "") {
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter the Landlord Last Name");
        $("#getLastName").css("border-color", "red");
        $(".landlordInfo").show();
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    }

    // debugger;
     if (emailID == "") {
         $(".errorInfo").show();
         $(".errorInfo").text("* Enter the Landlord EmailID");
         $("#inputEmailID").css("border-color", "red");
         $(".landlordInfo").show();
         $(".btnSubmitProperty").attr("disabled", true);
        return false;
     }

    if (!isValidEmailAddress(emailID)) {
        $(".errorInfo").show();
        $(".errorInfo").text("* Please Enter the Proper Landlord Email ID.");
        $("#inputEmailID").css("border-color", "red");
        $(".landlordInfo").show();
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    }

    if (mobileNumber == "") {
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter the Landlord Mobile Number");
        $("#inputMobileNumber").css("border-color", "red");
        $(".landlordInfo").show();
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    }

    if (landlordAddress == "") {
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter the Landlord Address");
        $("#inputAddress1").css("border-color", "red");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    }

     if (landlordState == "Select County") {
        $(".errorInfo").show();
        $(".errorInfo").text("* Select the Landlord County");
        $("#select2-inputState1-container").css("border", "1px solid red");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    }


     if (landlordCity == "Choose City" || landlordCity == undefined) {
        $(".errorInfo").show();
        $(".errorInfo").text("* Select the Landlord City");
        $("#select2-inputCity1-container").css("border", "1px solid red");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    }

    if (landlordZip == "") {
        $(".errorInfo").show();
        if(getPhoneCode == +44){
            $(".errorInfo").text("* Enter the Landlord Post Code");
          } else {
              $(".errorInfo").text("* Enter the Landlord Zip Code");
          }
        // $(".errorInfo").text("* Enter the Landlord Post Code");
        $("#inpuZip1").css("border-color", "red");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    }

    if(inputMobile == ""){
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter Tenant's Mobile Number");
        $("#"+mobileID).css("border-color", "red");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    }  if(inputTitle == "Select Title"){
        $(".errorInfo").show();
        $(".errorInfo").text("* Select Title");
        $("#select2-"+titleID+"-container").css("border", "1px solid red");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    }  if(inputName == ""){
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter Tenant's First Name");
        $("#"+nameID).css("border-color", "red");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    }  if(inputLastName == ""){
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter Tenant's Last Name");
        $("#"+lastNameID).css("border-color", "red");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    }  if(inputEmail == ""){
        $(".errorInfo").show();
        $(".errorInfo").text("* Enter Tenant's EmailID");
        $("#"+tenantEmailID).css("border-color", "red");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    }  if(inputStartDate == ""){
        $(".errorInfo").show();
        $(".errorInfo").text("* Select Start Date");
        $("#"+startDateID).css("border-color", "red");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    }  if(inputEndDate == ""){
        $(".errorInfo").show();
        $(".errorInfo").text("* Select End Date");
        $("#"+endDateID).css("border-color", "red");
        $(".btnSubmitProperty").attr("disabled", true);
        return false;
    } 
    // else {
        callUtilityAgreeCheckModal();
    // }    
}


function callUtilityAgreeCheckModal(){
    var isAgreeUtility = localStorage.getItem("MyRequest_IsAgreeUtility");
    if (isAgreeUtility == 1) {
        var modal = UIkit.modal("#modalUtilityList");
        modal.show();
        var hiddenIsTenantInsurance = $("#hiddenIsTenantInsurance").val();
        var hiddenIsRentProtectionInsurance = $("#hiddenIsRentProtectionInsurance").val();


        if (hiddenPropertyID == 0) {
            $(".btnSubmitUtility").text("ADD INSURANCE");
        } else {
            $(".btnSubmitUtility").text("UPDATE INSURANCE");
        }

    } else {
        var modal = UIkit.modal("#modalAgreeSkip");
        modal.show();
    } 
}