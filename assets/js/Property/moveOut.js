var moveOut = function() {
    getAddTenantArr = new Array();
    var hiddenPropertyID = $("#hiddenPropertyID").val();
    var inputAddress = $("#inputAddress").val();
    var lettingAgencyCode = localStorage.getItem("MyRequest_LettingAgencyCode");
    
    var localTenantData = localStorage.getItem('MyRequestTenantsData');

    if (localTenantData != null) {
        var getLocalTenantData = JSON.parse(localStorage.getItem('MyRequestTenantsData'));
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

            var newTenantsDataForm = "{'UserRegID':'" + inputUserRegID + "','Name':'" + inputName + "','LastName':'" + inputLastName + "','TitleName':'" + inputTitle + "','Email':'" + inputEmail + "','Mobile':'" + inputMobile + "','LettingAgencyCode':'" + lettingAgencyCode + "','TenancyStart':'" + finalTStartDate + "','TenancyEnd':'" + finalTEndDate + "','IsLeadTenant':'" + isLeadTenant + "','IsGas':'" + inputGas + "','IsElectricity':'" + inputElectricity + "','IsWater':'" + inputWater + "','IsCouncil':'" + inputCouncil + "','IsAvailTenantInsurance':'" + hiddenAvailTenantInsurance + "','IsNewTenantUtility':'" + hiddenIsNewTenantUpdate + "', 'Status':'" + status + "'}";
            getAddTenantArr.push(newTenantsDataForm);
        } // getLocalTenantData
    } //localTenantData
 
    UIkit.modal.confirm('Are you sure to move-out ?', function() {
        var dataForm = '{"TenantsArr":"' + getAddTenantArr + '","PropAddress":"' + inputAddress + '","AdminID":"' + adminUserID + '"}';
        var sendURL = domainAddress + 'SendPropertyUtilityMoveOut/' + hiddenPropertyID;
        console.log(dataForm);
        console.log(sendURL);
        $.ajax({
            type: "POST",
            url: sendURL,
            data: dataForm,
            success: function(dataCheck) {
                console.log(dataCheck);
                getPropertyList(getValue);
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
                $('.appYes > div').removeClass('checked');
                $('.appNo > div').removeClass('checked');
                $('.occupancySingle > div').removeClass('checked');
                $('.occupancyMultiple > div').removeClass('checked');
                $('.propSingle > div').removeClass('checked');
                $('.propMultiple > div').removeClass('checked');
                $('.homeInsurYes > div').removeClass('checked');
                $('.homeInsurNo > div').removeClass('checked');
                $('.propManageFull > div').removeClass('checked');
                $('.propManageSemi > div').removeClass('checked');
                $('.propManageLet > div').removeClass('checked');
                $("#imgHmoUploadPic").attr("src", "assets/img/noImage.gif");
                $("#imgEnergyPerformanceCertificate").attr("src", "assets/img/noImage.gif");
                $("#imgElectricityCertificate").attr("src", "assets/img/noImage.gif");
                $("#imgGasCertificate").attr("src", "assets/img/noImage.gif");
                $("#progressbox1").hide();
                $("#progressbox2").hide();
                $("#progressbox3").hide();
                $("#progressbox4").hide();
                $("#progressbox5").hide();
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
                isAppInstalled = "";
                occupancy = "";
                homeInsurance = "";
                getPropertyManaged = "";
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
                $("#hiddenIsElectricity").val(0);
                $("#hiddenIsGas").val(0);
                $("#hiddenIsWater").val(0);
                $("#hiddenIsCouncil").val(0);
                $("#hiddenIsLandlordInsurance").val(0);
                $("#hiddenIsRentProtectionInsurance").val(0);
                
                $("#hiddenPropertyID").val(0);
                $(".btnSubmitProperty").text("Add Property & Update Utility");
                $(".btnSubmitPropertyMoveOut").hide();
                var modalUtilityList = UIkit.modal("#modalUtilityList");
                modalUtilityList.hide();
                UIkit.modal.alert('All Tenants Moved-out & Property Utility Updated Successfully');
            }
        });
    }); // confirm
}