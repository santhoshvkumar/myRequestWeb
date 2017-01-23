var buttonSubmitProptyUtil = function() {
    var getPhoneCode = localStorage.getItem("MyRequest_PhoneCode-prefix");
    var hiddenIsLandlordInsurance = $("#hiddenIsLandlordInsurance").val();
    var hiddenIsRentProtectionInsurance = $("#hiddenIsRentProtectionInsurance").val();
    var isLeadTenant = $("#hiddenIsLeadTenant").val();
    getAddTenantArr = new Array();
    var hiddenPropertyID = $("#hiddenPropertyID").val();

    var landlordTitle = $("#inputLandlordTitle").val();
    console.log(landlordTitle);
    var name = $("#getName").val().replace(/["']/g, "`");
    var lastName = $("#getLastName").val().replace(/["']/g, "`");
    var emailID = $("#inputEmailID").val();
    var mobileNumber = $("#inputMobileNumber").val();

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
    var economy7 = $("#inputEconomy7").val();
    var waterMeter = $("#inputWaterMeter").val();
    var gas = $("#inputGas").val();
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
    console.log(getApiAddress);

    $.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + getApiAddress + "'&key=AIzaSyBtzg2WqpDihcMDNnD0OAGTfYWZBxonJUU", {}, function(result) {
        console.log(result);
        for (getLatLong in result.results) {
            console.log("Latitude : " + result.results[getLatLong].geometry.location.lat);
            console.log("Longitude : " + result.results[getLatLong].geometry.location.lng);
            getLatitude = result.results[getLatLong].geometry.location.lat;
            getLongitude = result.results[getLatLong].geometry.location.lng;
        }
    });

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

    console.log("Click Process Count : " + finalTenantCount);
    var lettingAgencyCode = localStorage.getItem("MyRequest_LettingAgencyCode");

    for (var getCount = 1; getCount <= finalTenantCount; getCount++) {
        inputUserRegID = $("#hiddenUserRegID-" + getCount).val();
        inputName = $("#inputName-" + getCount).val();
        inputLastName = $("#inputLastName-" + getCount).val();
        inputTitle = $("#inputTitle-" + getCount).val();
        inputEmail = $("#inputEmail-" + getCount).val();
        inputMobile = $("#inputMobile-" + getCount).val();
        inputStartDate = $("#inputStartDate-" + getCount).val();
        inputEndDate = $("#inputEndDate-" + getCount).val();
        isLeadTenant = $("#isLeadTenant-" + getCount).prop("checked");


        var selectStartDate = inputStartDate.split(".");
        var finalTStartDate = selectStartDate[2] + "-" + selectStartDate[1] + "-" + selectStartDate[0];

        var selectEndDate = inputEndDate.split(".");
        var finalTEndDate = selectEndDate[2] + "-" + selectEndDate[1] + "-" + selectEndDate[0];


        if (isLeadTenant == true) {
            isLeadTenant = 1;
        } else {
            isLeadTenant = 0;
        }
        var propertyCreated = "";
        var propertyUpdated = "";
        var inputGas = $("#hiddenIsGas-" + getCount).val();
        var inputElectricity = $("#hiddenIsElectricity-" + getCount).val();
        var inputWater = $("#hiddenIsWater-" + getCount).val();
        var inputCouncil = $("#hiddenIsCouncil-" + getCount).val();
        var status = "Awaiting Info";
        //debugger;
        if (inputGas == 0 && inputElectricity == 0 && inputWater == 0 && inputCouncil == 0)
            status = "Not Applicable";
        else if (inputGas == 1 && inputElectricity == 1 && inputWater == 1 && inputCouncil == 1)
            status = "Updated";
        var hiddenAvailTenantInsurance = $("#hiddenAvailTenantInsurance-" + getCount).val();
        var hiddenIsNewTenantUpdate = $("#hiddenIsNewTenantUpdate-" + getCount).val();
        if(inputName!="" && inputLastName!="" && inputTitle!="" && inputEmail!="" && inputMobile!="" && inputStartDate!="" && inputEndDate!=""){
            var newTenantsDataForm = "{'UserRegID':'" + inputUserRegID + "','Name':'" + inputName + "','LastName':'" + inputLastName + "','TitleName':'" + inputTitle + "','Email':'" + inputEmail + "','Mobile':'" +getPhoneCode+ '' + inputMobile + "','LettingAgencyCode':'" + lettingAgencyCode + "','TenancyStart':'" + finalTStartDate + "','TenancyEnd':'" + finalTEndDate + "','IsLeadTenant':'" + isLeadTenant + "','IsGas':'" + inputGas + "','IsElectricity':'" + inputElectricity + "','IsWater':'" + inputWater + "','IsCouncil':'" + inputCouncil + "','IsAvailTenantInsurance':'" + hiddenAvailTenantInsurance + "','IsNewTenantUtility':'" + hiddenIsNewTenantUpdate + "', 'Status':'" + status + "'}";

            getAddTenantArr.push(newTenantsDataForm);
        }
    } // for count

    console.log(getAddTenantArr);

    var dataForm = '{"Title":"' + landlordTitle + '","PropOwnerName":"' + name + '","PropOwnerLastName":"' + lastName + '","PropOwnerEmail":"' + emailID + '","PropOwnerPhone":"' +getPhoneCode+ '' + mobileNumber + '","Occupancy":"Single","IsAppInstalled":"' + isAppInstalled + '","PropAddress":"' + address + '","PropLocation":"' + location + '","PropState":"' + state + '","PropCity":"' + city + '","PropPostalCode":"' + zip + '","PropCountry":"UK","HMOLicenseNumb":"' + hmoLicenseNumber + '","HMOUploadPic":"' + imageUrl4 + '","PropManaged":"' + getPropertyManaged + '","HomeInsurance":"' + homeInsurance + '","EPCValidFrom":"' + finalValidFromDate + '","EPCValidTill":"' + finalValidToDate + '","EPCCertificate":"' + imageUrl1 + '","ElectricCertValidFrom":"' + finalElecFromDate + '","ElectricCertValidTill":"' + finalElecToDate + '","ElectricCetificate":"' + imageUrl2 + '","GasCertValidFrom":"' + finalGasFromDate + '","GasCertValidTill":"' + finalGasFromDate + '","GasCertificate":"' + imageUrl3 + '","LegCertValidFrom":"' + finalLegFromDate + '","LegCertValidTill":"' + finalLegToDate + '","LegCertificate":"' + imageUrl5 + '","Latitude":"' + getLatitude + '","Longitude":"' + getLongitude + '","AdminID":"' + adminUserID + '","NoOfTenants":"' + hmoInputTenent + '","HmoOccupancy":"' + hmoOccupancy + '","PropertyType":"' + property + '","Bedrooms":"' + bedrooms + '","FuelType":"' + feul + '","SupplierElectric":"' + supplierElectric + '","SupplierGas":"' + supplierGas + '","ElectricSupplier1":"' + read1 + '","ElectricSupplier2":"' + read2 + '","Economy7":"' + economy7 + '","WaterMeter":"' + waterMeter + '","GasMeterRead":"' + gas + '","WaterMeterRead":"' + water + '","WaterAuthority":"' + waterAuthority + '","TaxAuthority":"' + taxAuthority + '","IsLandlordInsurance":"' + hiddenIsLandlordInsurance + '","IsRentProtectionInsurance":"' + hiddenIsRentProtectionInsurance + '","TenantsArr":"' + getAddTenantArr + '","LandlordCity":"' + landlordCity + '","LandlordState":"' + landlordState + '","LandlordAddress":"' + landlordAddress + '","LandlordPostCode":"' + landlordPostCode + '","IsVoid":"' + isVoid + '","PropertyStatus":"' + propertyStatus + '"}';
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