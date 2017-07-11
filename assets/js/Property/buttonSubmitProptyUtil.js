var buttonSubmitProptyUtil = function() {
    var getPhoneCode = localStorage.getItem("MyRequest_PhoneCode-prefix");
    var hiddenIsLandlordInsurance = $("#hiddenIsLandlordInsurance").val();
    var hiddenIsRentProtectionInsurance = $("#hiddenIsRentProtectionInsurance").val();
    var isLeadTenant = $("#hiddenIsLeadTenant").val();
    getAddTenantArr = new Array();
    var hiddenPropertyID = $("#hiddenPropertyID").val();
    var landlordTitle = $("#inputLandlordTitle").val();
    var name = $("#getName").val().replace(/["']/g, "`");
    var lastName = $("#getLastName").val().replace(/["']/g, "`");
    var emailID = $("#inputEmailID").val();
    var mobileNumber = getPhoneCode+$("#inputMobileNumber").val();

    var getAppYes = $('.appYes > div').hasClass('checked');
    var getAppNo = $('.appNo > div').hasClass('checked');
    if (getAppYes == true) {
        isAppInstalled = 1;
    }
    if (getAppNo == true) {
        isAppInstalled = 0;
    }

    var getAgency = $('.agency > div').hasClass('checked');
    var getLandlord = $('.landlord > div').hasClass('checked');
    if (getAgency == true) {
        isVoid = "Agency";
    }
    if (getLandlord == true) {
        isVoid = "Landlord";
    }


    var getYes = $('.yes > div').hasClass('checked');
    var getNo = $('.no > div').hasClass('checked');
    if (getYes == true) {
        isLLAddress = "1";
    }
    if (getNo == true) {
        isLLAddress = "0";
    }

    var getHMOSingle = $('.propSingle > div').hasClass('checked');
    var getHMOMultiple = $('.propMultiple > div').hasClass('checked');
    if (getHMOSingle == true) {
        hmoOccupancy = "Single";
        $(".hmoInputTenent").hide();
        $(".hmoLicenseNumber").hide();
    }
    if (getHMOMultiple == true) {
        hmoOccupancy = "Multiple";
        $(".hmoInputTenent").show();
        $(".hmoLicenseNumber").show();
    }



    var address = $("#inputAddress").val().replace(/["']/g, "`");
    var location = $("#inputLocation").val();


    var feul = $("#select2-inputFuel-container").html().replace(/["']/g, "`");
    var supplierElectric = $("#select2-inputSupplierElectric-container").html();
    var supplierGas = $("#select2-inputSupplierGas-container").html();
    var read1 = $("#inputRead1").val();
    var read2 = $("#inputRead2").val();
    var serial1 = $("#inputSerial1").val();
    var serial2 = $("#inputSerial2").val();    
    var economy7 = $("#inputEconomy7").val();
    var waterMeter = $("#inputWaterMeter").val();
    var gas = $("#inputGas").val();
    var gasSerialNo = $("#inputGasSerialNo").val();
    var waterSerialNo = $("#inputWaterSerialNo").val();
    var water = $("#inputWater").val();
    var waterAuthority = $("#select2-inputWaterAuthority-container").html();

    var taxAuthority = $("#select2-inputTaxAuthority-container").html();


    var state = $("#select2-inputState-container").html();
    var property = $("#select2-inputProperty-container").html();
    var bedrooms = $("#select2-inputBedrooms-container").html();
    var propertyStatus = $("#select2-inputPropertyStatus-container").html();
    var city = $("#select2-inputCity-container").html();
    var zip = $("#inpuZip").val().replace(/["']/g, "`");
    var country = $("#inputCountry").val();
    getApiAddress = address + ", " + location + "," + state + "," + city + " - " + zip + ", " + country;
    
    // $.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + getApiAddress + "'&key=AIzaSyBtzg2WqpDihcMDNnD0OAGTfYWZBxonJUU", {}, function(result) {
    //     for (getLatLong in result.results) {
    //         getLatitude = result.results[getLatLong].geometry.location.lat;
    //         getLongitude = result.results[getLatLong].geometry.location.lng;
    //     }
    // });

    var landlordState = $("#select2-inputState1-container").html();
    var landlordCity = $("#select2-inputCity1-container").html();
    var landlordZip = $("#inpuZip1").val();
    var landlordAddress = $("#inputAddress1").val().replace(/["']/g, "`");
    var landlordPostCode = $("#inpuZip1").val().replace(/["']/g, "`");


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
    var propManageLet = $(".propManageSemi > div").hasClass("checked");
    if (propManageFull == true) {
        getPropertyManaged = "Full";
    }
    if (propManageSemi == true) {
        getPropertyManaged = "Semi";
    }

    if (propManageLet == true) {
        getPropertyManaged = "Let";
    }


    var finalValidFromDate = "";
    var validFrom = $("#validFrom").val();
    if(validFrom == ""){
        finalValidFromDate = "";
    } else {
        var getFormatValidFromDate = validFrom.split(".");
        finalValidFromDate = getFormatValidFromDate[2] + "-" + getFormatValidFromDate[1] + "-" + getFormatValidFromDate[0];
    }
    
    
    var finalValidToDate = "";
    var validTo = $("#validTo").val();
    if(validTo == ""){
        finalValidToDate = "";
    } else {
        var getFormatValidToDate = validTo.split(".");
        finalValidToDate = getFormatValidToDate[2] + "-" + getFormatValidToDate[1] + "-" + getFormatValidToDate[0];
    } 

    var finalElecFromDate = "";
    var electricityValidFrom = $("#electricityValidFrom").val();
    if(electricityValidFrom == ""){
        finalElecFromDate = "";
    } else{
        var getFormatElecValidFromDate = electricityValidFrom.split(".");
        finalElecFromDate = getFormatElecValidFromDate[2] + "-" + getFormatElecValidFromDate[1] + "-" + getFormatElecValidFromDate[0];
    }
    
    var finalElecToDate = "";
    var electricityValidTo = $("#electricityValidTo").val();
    if(electricityValidTo == ""){
        finalElecToDate = "";
    } else{
        var getFormatElecValidToDate = electricityValidTo.split(".");
        finalElecToDate = getFormatElecValidToDate[2] + "-" + getFormatElecValidToDate[1] + "-" + getFormatElecValidToDate[0];
    }
    

    var finalGasFromDate = "";
    var gasValidFrom = $("#gasValidFrom").val();
    if(gasValidFrom == ""){
        finalGasFromDate = "";
    } else{
        var getFormatGasValidFromDate = gasValidFrom.split(".");
        finalGasFromDate = getFormatGasValidFromDate[2] + "-" + getFormatGasValidFromDate[1] + "-" + getFormatGasValidFromDate[0];
    }
    
    var finalGasToDate = "";
    var gasValidTo = $("#gasValidTo").val();
    if(gasValidTo == ""){
        finalGasToDate = "";
    } else{
        var getFormatGasValidToDate = gasValidTo.split(".");
        finalGasToDate = getFormatGasValidToDate[2] + "-" + getFormatGasValidToDate[1] + "-" + getFormatGasValidToDate[0];
    }
    
    var finalLegFromDate = "";
    var legValidFrom = $("#legValidFrom").val();
    if(legValidFrom == ""){
        finalLegFromDate = "";
    } else{
        var getFormatLegValidFromDate = legValidFrom.split(".");
        finalLegFromDate = getFormatLegValidFromDate[2] + "-" + getFormatLegValidFromDate[1] + "-" + getFormatLegValidFromDate[0];
    }
    
    var finalLegToDate = "";
    var legValidTo = $("#legValidTo").val();
    if(legValidTo == ""){
        finalLegToDate = "";
    } else {
        var getFormatLegValidToDate = legValidTo.split(".");
        finalLegToDate = getFormatLegValidToDate[2] + "-" + getFormatLegValidToDate[1] + "-" + getFormatLegValidToDate[0];
    }
     
    adminUserID = localStorage.getItem("MyRequest_AdminID");
    var inputUserRegID = "";
    var inputName = "";
    var inputEmail = "";
    var inputMobile = "";
    var inputStartDate = "";
    var inputEndDate = "";
    var isLeadTenant = "";
    var radioYes = "";
    var radioNo = "";
    var getIsAppInstalled = "";
    var hmoInputTenent = $("#inputHMONoOfTenent").val();
    var lettingAgencyCode = localStorage.getItem("MyRequest_LettingAgencyCode");



    var localTenantData = localStorage.getItem('MyRequestTenantsData');
    if (localTenantData != null) {
        var getLocalTenantData = JSON.parse(localStorage.getItem('MyRequestTenantsData'));
        $(".isElectricity").show();
        $(".isGas").show();
        $(".isWater").show();
        $(".isCouncil").show();
        var isHide=0;
        for (getData in getLocalTenantData) {
            var inputUserRegID = getLocalTenantData[getData].UserRegID;
            var inputName = getLocalTenantData[getData].Name;
            var inputLastName = getLocalTenantData[getData].LastName;
            var inputTitle = getLocalTenantData[getData].TitleName;
            var inputEmail = getLocalTenantData[getData].Email;
            var inputMobile = getLocalTenantData[getData].Mobile;
            var inputStartDate = getLocalTenantData[getData].TenancyStart;
            var inputEndDate = getLocalTenantData[getData].TenancyEnd;
            var isLeadTenant = getLocalTenantData[getData].IsLeadTenant;
            var finalTStartDate = getLocalTenantData[getData].TenancyStart;
            var finalTEndDate = getLocalTenantData[getData].TenancyEnd;
            var inputGas = getLocalTenantData[getData].IsGas;
            var inputElectricity = getLocalTenantData[getData].IsElectricity;
            var inputWater = getLocalTenantData[getData].IsWater;
            var inputCouncil = getLocalTenantData[getData].IsCouncil;
            var status = "Awaiting Info";
            if (inputGas == 0 && inputElectricity == 0 && inputWater == 0 && inputCouncil == 0)
                status = "Not Applicable";
            else if (inputGas == 1 && inputElectricity == 1 && inputWater == 1 && inputCouncil == 1)
                status = "Updated";
            var hiddenAvailTenantInsurance = getLocalTenantData[getData].IsAvailTenantInsurance;
            var hiddenIsNewTenantUpdate = getLocalTenantData[getData].IsNewTenantUtility;

            var newTenantsDataForm = "{'UserRegID':'" + inputUserRegID + "','Name':'" + inputName + "','LastName':'" + inputLastName + "','TitleName':'" + inputTitle + "','Email':'" + inputEmail + "','Mobile':'" + inputMobile + "','LettingAgencyCode':'" + lettingAgencyCode + "','TenancyStart':'" + finalTStartDate + "','TenancyEnd':'" + finalTEndDate + "','IsLeadTenant':'" + isLeadTenant + "','IsGas':'" + inputGas + "','IsElectricity':'" + inputElectricity + "','IsWater':'" + inputWater + "','IsCouncil':'" + inputCouncil + "','IsAvailTenantInsurance':'" + hiddenAvailTenantInsurance + "','IsNewTenantUtility':'" + hiddenIsNewTenantUpdate + "', 'Status':'" + status + "','PropertyStatus':'" + propertyStatus + "'}";
            getAddTenantArr.push(newTenantsDataForm);
        } // getLocalTenantData
    } //localTenantData
    var lettingAgentName = localStorage.getItem('MyRequest_UserName');

    var dataForm = '{"Title":"' + landlordTitle + '","PropOwnerName":"' + name + '","PropOwnerLastName":"' + lastName + '","PropOwnerEmail":"' + emailID + '","PropOwnerPhone":"' + mobileNumber + '","Occupancy":"Single","IsAppInstalled":"' + isAppInstalled + '","PropAddress":"' + address + '","PropLocation":"' + location + '","PropState":"' + state + '","PropCity":"' + city + '","PropPostalCode":"' + zip + '","PropCountry":"UK","HMOLicenseNumb":"' + hmoLicenseNumber + '","HMOUploadPic":"' + imageUrl4 + '","PropManaged":"' + getPropertyManaged + '","HomeInsurance":"' + homeInsurance + '","EPCValidFrom":"' + finalValidFromDate + '","EPCValidTill":"' + finalValidToDate + '","EPCCertificate":"' + imageUrl1 + '","ElectricCertValidFrom":"' + finalElecFromDate + '","ElectricCertValidTill":"' + finalElecToDate + '","ElectricCetificate":"' + imageUrl2 + '","GasCertValidFrom":"' + finalGasFromDate + '","GasCertValidTill":"' + finalGasFromDate + '","GasCertificate":"' + imageUrl3 + '","LegCertValidFrom":"' + finalLegFromDate + '","LegCertValidTill":"' + finalLegToDate + '","LegCertificate":"' + imageUrl5 + '","Latitude":"' + getLatitude + '","Longitude":"' + getLongitude + '","AdminID":"' + adminUserID + '","NoOfTenants":"' + hmoInputTenent + '","HmoOccupancy":"' + hmoOccupancy + '","PropertyType":"' + property + '","Bedrooms":"' + bedrooms + '","FuelType":"' + feul + '","SupplierElectric":"' + supplierElectric + '","SupplierGas":"' + supplierGas + '","ElectricSupplier1":"' + read1 + '","ElectricSupplier2":"' + read2 + '","ElectricSerial1":"' + serial1 + '","ElectricSerial2":"' + serial2 + '","Economy7":"' + economy7 + '","WaterMeter":"' + waterMeter + '","GasMeterRead":"' + gas + '", "GasSerialNo":"'+ gasSerialNo +'" ,"WaterMeterRead":"' + water + '","WaterSerialNo":"' + waterSerialNo + '","WaterAuthority":"' + waterAuthority + '","TaxAuthority":"' + taxAuthority + '","IsLandlordInsurance":"' + hiddenIsLandlordInsurance + '","IsRentProtectionInsurance":"' + hiddenIsRentProtectionInsurance + '","TenantsArr":"' + getAddTenantArr + '","LandlordCity":"' + landlordCity + '","LandlordState":"' + landlordState + '","LandlordAddress":"' + landlordAddress + '","LandlordPostCode":"' + landlordPostCode + '","IsVoid":"' + isVoid + '","PropertyStatus":"' + propertyStatus + '","LettingAgentName":"'+lettingAgentName+'","IsLLAddress":"'+isLLAddress+'"}';
    console.log(dataForm);
    $("#getLoadingModalContent").addClass('md-show');
    if (hiddenPropertyID == 0) {
        var sendURL = domainAddress + 'CreatePropertyRegister';
        console.log(sendURL);
        $.ajax({
            type: "POST",
            url: sendURL,
            data: dataForm,
            success: function(dataCheck) {
                console.log(dataCheck);
                getAddTenantArr = new Array();
                $("#select2-inputLandlordTitle-container").html("Select Title");
                $("#getName").val('');
                $("#getLastName").val('');
                $("#inputMobileNumber").val('');
                $("#inputEmailID").val('');
                $("#inputAddress1").val('');
                $("#inpuZip1").val('');
                $("#inputState1").val(0);
                $("#inputCity1").val(0);
                $("#inputCountry").val('UK');
                $("#select2-inputCity1-container").html("Select City");
                $("#select2-inputState1-container").html("Select County");
                $("#startDate").val('');
                $("#endDate").val('');
                $("#inputAddress").val('');
                $("#inputLocation").val('');
                $("#getTenant").val('');
                $("#inputState").val(0);
                $("#inputCity").val(0);
                $("#select2-inputCity-container").html("Select City");
                $("#select2-inputState-container").html("Select County");
                $("#inpuZip").val('');
                $("#inputHmoLicenseNumber").val('');
                $("#validFrom").val('');
                $("#validTo").val('');
                $("#electricityValidFrom").val('');
                $("#electricityValidTo").val('');
                $("#gasValidFrom").val('');
                $("#gasValidTo").val('');
                $("#legValidFrom").val('');
                $("#legValidTo").val('');
                $('#landBuildInsurYes').iCheck('uncheck');
                $('#landBuildInsurNo').iCheck('check');
                $('#propertyManageFull').iCheck('uncheck');
                $('#propertyManageSemi').iCheck('uncheck');
                $('#propertyManageLet').iCheck('uncheck');
                $("#singleHmo").iCheck('check');
                $("#imgHmoUploadPic").attr("src", "assets/img/noImage.gif");
                $("#imgEnergyPerformanceCertificate").attr("src", "assets/img/noImage.gif");
                $("#imgElectricityCertificate").attr("src", "assets/img/noImage.gif");
                $("#imgGasCertificate").attr("src", "assets/img/noImage.gif");
                $("#imgLegCertificate").attr("src", "assets/img/noImage.gif");
                $("#progressbox1").hide();
                $("#progressbox2").hide();
                $("#progressbox3").hide();
                $("#progressbox4").hide();
                $("#progressbox5").hide();
                $(".mno-prefix").hide();
                $("#select2-inputProperty-container").html("Select PropertyType");
                $("#inputProperty").val(0);
                $("#select2-inputBedrooms-container").html("Select Bedrooms");
                $("#inputBedrooms").val(0);
                $("#select2-inputPropertyStatus-container-container").html("Select Property Status");
                $("#inputPropertyStatus").val(0);
                $("#select2-inputFuel-container").html("Select Fuel Type");
                $("#inputFuel").val(0);
                $("#select2-inputSupplierElectric-container").html("Select Supplier Electric");
                $("#inputSupplierElectric").val(0);
                $("#select2-inputSupplierGas-container").html("Select Supplier Gas");
                $("#inputSupplierGas").val(0);
                $("#select2-inputTaxAuthority-container").html("Select Council");
                $("#inputTaxAuthority").val(0);
                //$("#select2-inputEconomy7-container").html("Economy 7");
                $("#inputEconomy7").val("");
                // $("#select2-inputWaterMeter-container").html("Water Meter");
                $("#inputWaterMeter").val("");
                isAppInstalled = "";
                occupancy = "";
                homeInsurance = "";
                getPropertyManaged = "";
                isVoid = "";
                getLatitude = 0;
                getLongitude = 0;
                imageUrl1 = "";
                imageUrl2 = "";
                imageUrl3 = "";
                imageUrl4 = "";
                imageUrl5 = "";
                $(".getTenantList").html('');
                count = 0;
                finalTenantCount = 0;
                getAddRemove(count);
                getPropertyList(getValue);
                $("#hiddenIsElectricity").val(0);
                $("#hiddenIsGas").val(0);
                $("#hiddenIsWater").val(0);
                $("#hiddenIsCouncil").val(0);
                $("#hiddenIsLandlordInsurance").val(0);
                $("#hiddenIsRentProtectionInsurance").val(0);
                $("#getLoadingModalContent").removeClass('md-show');
                localStorage.removeItem('MyRequestTenantsData');
                UIkit.modal.alert('Property Added Successfully');
                
            }
        });
    } else {
        var sendURL = domainAddress + 'updatePropertyRegister/' + hiddenPropertyID;
        console.log(sendURL);
        $.ajax({
            type: "POST",
            url: sendURL,
            data: dataForm,
            success: function(dataCheck) {
                console.log(dataCheck);
                getAddTenantArr = new Array();
                $("#select2-inputLandlordTitle-container").html("Select Title");
                $("#getName").val('');
                $("#getLastName").val('');
                $("#inputMobileNumber").val('');
                $("#inputEmailID").val('');
                $("#inputAddress1").val('');
                $("#inpuZip1").val('');
                $("#inputState1").val(0);
                $("#inputCity1").val(0);
                $("#select2-inputCity1-container").html("Select City");
                $("#select2-inputState1-container").html("Select County");
                $("#startDate").val('');
                $("#endDate").val('');
                $("#getTenant").val('');
                $("#inputAddress").val('');
                $("#inputLocation").val('');
                $("#inputState").val(0);
                $("#inputCity").val(0);
                $("#select2-inputCity-container").html("Select City");
                $("#select2-inputState-container").html("Select County");
                $("#inpuZip").val('');
                $("#inputHmoLicenseNumber").val('');
                $("#validFrom").val('');
                $("#validTo").val('');
                $("#electricityValidFrom").val('');
                $("#electricityValidTo").val('');
                $("#gasValidFrom").val('');
                $("#gasValidTo").val('');
                $("#legValidFrom").val('');
                $("#legValidTo").val('');
                $('#landBuildInsurYes').iCheck('uncheck');
                $('#landBuildInsurNo').iCheck('check');
                $('#propertyManageFull').iCheck('uncheck');
                $('#propertyManageSemi').iCheck('uncheck');
                $('#propertyManageLet').iCheck('uncheck');
                $("#singleHmo").iCheck('check');
                $("#imgHmoUploadPic").attr("src", "assets/img/noImage.gif");
                $("#imgEnergyPerformanceCertificate").attr("src", "assets/img/noImage.gif");
                $("#imgElectricityCertificate").attr("src", "assets/img/noImage.gif");
                $("#imgGasCertificate").attr("src", "assets/img/noImage.gif");
                $("#progressbox1").hide();
                $("#progressbox2").hide();
                $("#progressbox3").hide();
                $("#progressbox4").hide();
                $("#progressbox5").hide();
                $(".mno-prefix").hide();
                $("#select2-inputProperty-container").html("Select PropertyType");
                $("#inputProperty").val(0);
                $("#select2-inputBedrooms-container").html("Select Bedrooms");
                $("#inputBedrooms").val(0);
                $("#select2-inputPropertyStatus-container-container").html("Select Property Status");
                $("#inputPropertyStatus").val(0);
                $("#select2-inputFuel-container").html("Select Fuel Type");
                $("#inputFuel").val(0);
                $("#select2-inputSupplierElectric-container").html("Select Supplier Electric");
                $("#inputSupplierElectric").val(0);
                $("#select2-inputSupplierGas-container").html("Select Supplier Gas");
                $("#inputSupplierGas").val(0);
                $("#select2-inputTaxAuthority-container").html("Select Council");
                $("#inputTaxAuthority").val(0);
                //   $("#select2-inputEconomy7-container").html("Economy 7");
                $("#inputEconomy7").val('');
                //  $("#select2-inputWaterMeter-container").html("Water Meter");
                $("#inputWaterMeter").val('');
                isAppInstalled = "";
                occupancy = "";
                homeInsurance = "";
                getPropertyManaged = "";
                isVoid = "";
                getLatitude = 0;
                getLongitude = 0;
                imageUrl1 = "";
                imageUrl2 = "";
                imageUrl3 = "";
                imageUrl4 = "";
                imageUrl5 = "";
                $(".getTenantList").html('');
                count = 0;
                finalTenantCount = 0;
                getAddRemove(count);
                getPropertyList(getValue);
                $("#hiddenIsElectricity").val(0);
                $("#hiddenIsGas").val(0);
                $("#hiddenIsWater").val(0);
                $("#hiddenIsCouncil").val(0);
                $("#hiddenIsLandlordInsurance").val(0);
                $("#hiddenIsRentProtectionInsurance").val(0);
                $("#hiddenPropertyID").val(0);
                $(".btnSubmitProperty").text("Add Property & Update Utility");
                $("#getLoadingModalContent").removeClass('md-show');
                localStorage.removeItem('MyRequestTenantsData');
                UIkit.modal.alert('Property Updated Successfully');
            }
        });
    } // sec if
    isEdit=false;
    $(".md-input-wrapper").removeClass("md-input-filled");
    $(".propertyContent").hide();
    $(".landlordInfo").hide();
    $(".propMandatoryContent").hide();  

    var modalUtilityList = UIkit.modal("#modalUtilityList");
    modalUtilityList.hide();
}