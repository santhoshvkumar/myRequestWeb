function getPropertyInfo(editPropertyID){

$(document).ready(function() {
    $(".getTenantsInfo").text("- Current Occupant");
        var Occupantplusminus = $(".getTenantsInfo").text();
        if(Occupantplusminus == "- Current Occupant"){
            $(".getTenantList").show();
    }

    $(".PropertyDetailsinfo").text("- Property Details");
        var PropertyDetailsinfo = $(".PropertyDetailsinfo").text();
        if(PropertyDetailsinfo == "- Property Details"){
            $(".PropertyDetails").show();
    }

    $(".getUtilityInfo").text("- Utility Management Details");
        var getUtilityinfo = $(".getUtilityInfo").text();
        if(getUtilityinfo == "- Utility Management Details"){
            $(".utilityInfo").show();
    }

    $(".getPropMandatoryInfo").text("- Property Mandatory Details");
        var getPropertyinfo = $(".getPropMandatoryInfo").text();
        if(getPropertyinfo == "- Property Mandatory Details"){
            $(".propMandatoryContent").show();
    }

    $(".landLordTitle").text("- Landlord Details");
        var getlandlordInfo = $(".landLordTitle").text();
        if(getlandlordInfo == "- Landlord Details"){
            $(".landlordInfo").show();
        }

    $(".getUtilityHistory").text("- Utility History");
        var getUtilityHistory = $(".getUtilityHistory").text();
        if(getUtilityHistory == "- Utility History"){
            $(".divUtilityHistory").show();
        }
    
    $(".divtenantHistory").show();
    $(".tenantHistory").text("- Tenant History");
        var getTenantHistory = $(".tenantHistory").text();
        if(getTenantHistory == "- Tenant History"){
            $(".gettenantHistory").show();
        }
});

              $(".getTenantList").html('');
              count = 0;
              $(".utilityIcon").show();
              $(".utilityIconLabel").show();
              finalTenantCount = 0;
              $("#hiddenPropertyID").val(editPropertyID);
              isEdit=true;
              getAddTenantArr = new Array();
              $.get(domainAddress + "GetPropertyRegister/" + editPropertyID, {}, function(resultGetProperty) {
                  console.log(domainAddress + "GetPropertyRegister/" + editPropertyID);
                  for (var property in resultGetProperty.records) {
                      isAppInstalled = resultGetProperty.records[property].IsAppInstalled;
                      if (isAppInstalled == 1) {
                          $('.appYes > div').addClass('checked');
                          $('.appNo > div').removeClass('checked');
                      } else {
                          $('.appYes > div').removeClass('checked');
                          $('.appNo > div').addClass('checked');
                      }

                      occupancy = resultGetProperty.records[property].Occupancy;
                      if (occupancy == "Single") {
                          $('.occupancySingle > div').addClass('checked');
                          $('.occupancyMultiple > div').removeClass('checked');
                      } else {
                          $('.occupancySingle > div').removeClass('checked');
                          $('.occupancyMultiple > div').addClass('checked');
                      }

                      hmoOccupanyType = resultGetProperty.records[property].HmoOccupanyType;
                      if (hmoOccupanyType == "Single") {
                          $("#singleHmo").iCheck('check');
                          $("#multipleHmo").iCheck('uncheck');
                          $(".hmoInputTenent").hide();
                          $(".hmoLicenseNumber").hide();
                          $("#inputHMONoOfTenent").val(resultGetProperty.records[property].NoOfTenants);
                      } else {
                          $("#singleHmo").iCheck('uncheck');
                          $("#multipleHmo").iCheck('check');
                          $(".hmoLicenseNumber").show();
                          $(".hmoInputTenent").show();
                          $("#inputHMONoOfTenent").val(resultGetProperty.records[property].NoOfTenants);
                      }

                      homeInsurance = resultGetProperty.records[property].HomeInsurance;
                      if (homeInsurance == 1) {
                          $('#landBuildInsurYes').iCheck('check');
                          $('#landBuildInsurNo').iCheck('uncheck');
                      } else {
                          $('#landBuildInsurYes').iCheck('uncheck');
                          $('#landBuildInsurNo').iCheck('check');
                      }

                      getPropertyManaged = resultGetProperty.records[property].PropManaged;
                      if (getPropertyManaged == "Full") {
                        $('#propertyManageFull').iCheck('check');
                        $('#propertyManageSemi').iCheck('uncheck');
                        $('#propertyManageLet').iCheck('uncheck');
                      }
                      else if (getPropertyManaged == "Semi") {
                        $('#propertyManageFull').iCheck('uncheck');
                        $('#propertyManageSemi').iCheck('check');
                        $('#propertyManageLet').iCheck('uncheck');
                      } else {
                        $('#propertyManageFull').iCheck('uncheck');
                        $('#propertyManageSemi').iCheck('uncheck');
                        $('#propertyManageLet').iCheck('check');
                      }


                      var isLeadTenant = resultGetProperty.records[property].IsLeadTenant;
                      $("#isLeadTenant").val(resultGetProperty.records[property].IsLeadTenant);
                      if (isLeadTenant = 1) {
                          $('.leadTenant > span').css('box-shadow', 'rgba(255, 179, 0, 0.498039) 0px 0px 0px 7px inset').css('border-color', 'rgba(255, 179, 0, 0.498039)').css('transition', 'border 0.4s').css('box-shadow', '0.4s').css('background-color', '1.2s').css('background-color', 'rgba(255, 179, 0, 0.498039)');
                          $('.electricity > span > small').css('left', '18px').css('transition', 'background-color 0.4s, left 0.2s').css('background-color', 'rgb(255, 179, 0)');
                          $("#getTenant").prop("checked", true);
                      } else {
                          $('.leadTenant > span').css('box-shadow', 'rgba(0, 0, 0, 0.258824) 0px 0px 0px 0px inset').css('border-color', 'rgba(0, 0, 0, 0.258824)').css('transition', 'border 0.4s, box-shadow 0.4s').css('background-color', 'rgba(0, 0, 0, 0.258824)');
                          $('.leadTenant > span > small').css('left', '0px').css('transition', 'background-color 0.4s, left 0.2s').css('background-color', 'rgb(250, 250, 250)');
                          $("#getTenant").prop("checked", false);
                      }

                      isVoid = resultGetProperty.records[property].IsVoid;
                      if (isVoid == "Agency") {
                          $("#voidPartYes").iCheck('check');
                          $("#voidPartNo").iCheck('uncheck');
                      } else {
                          $("#voidPartYes").iCheck('uncheck');
                          $("#voidPartNo").iCheck('check');
                      }

                      var LLAddress = resultGetProperty.records[property].IsLLAddress;
                      if(LLAddress == "1"){
                        //   alert("One===>"+LLAddress);
                        $("#isLLAddressYes").iCheck('check');
                        $("#isLLAddressNo").iCheck('uncheck');
                      } else {
                        //   alert("Zero===>"+LLAddress);
                        $("#isLLAddressYes").iCheck('uncheck');
                        $("#isLLAddressNo").iCheck('check');
                      }

                      $("#inputLandlordTitle").val(resultGetProperty.records[property].Title);
                      $("#select2-inputLandlordTitle-container").html(resultGetProperty.records[property].Title);
                      $("#getName").val(resultGetProperty.records[property].PropOwnerName);
                      $("#getLastName").val(resultGetProperty.records[property].PropOwnerLastName);
                      
                        var ElectricMPAN = resultGetProperty.records[property].ElectricMPAN;

                        if(ElectricMPAN == null){
                            $("#inputElectricMPAN").val("-");
                        } else {
                            var ElectricMPAN = (resultGetProperty.records[property].ElectricMPAN).replace("S" ,"");
                            $("#inputElectricMPAN").val(ElectricMPAN);
                        }
                    
                        var GasMPRN = resultGetProperty.records[property].GasMPRN;
                        
                        if(GasMPRN == null){
                            $("#inputGasMPRN").val("-");
                            $(".electricMPAN-prefix").hide();
                        } else {
                            $(".electricMPAN-prefix").show();
                            $("#inputGasMPRN").val(resultGetProperty.records[property].GasMPRN);
                        }
                      

                      if(resultGetProperty.records[property].PropOwnerPhone == null){
                        $("#inputMobileNumber").val('');
                      } else {
                        isFourExistNo = resultGetProperty.records[property].PropOwnerPhone.slice(0, 3);
                        isOneExistNo = resultGetProperty.records[property].PropOwnerPhone.slice(0, 2);
                        if (isFourExistNo == "+44" || isFourExistNo == "+91") {
                            $("#inputMobileNumber").val(resultGetProperty.records[property].PropOwnerPhone.slice(3));
                        } else {
                            $("#inputMobileNumber").val(resultGetProperty.records[property].PropOwnerPhone);
                        }

                        if (isOneExistNo == "+1") {
                            $("#inputMobileNumber").val(resultGetProperty.records[property].PropOwnerPhone.slice(2));
                        }
                      }

                      

                      var hiddenIsEconomy7 = $("#hiddenIsEconomy7").val();
                      //getPropertyList(hiddenIsEconomy7);

                      var isEconomy7 = resultGetProperty.records[property].Economy7;
                      $("#hiddenIsEconomy7").val(resultGetProperty.records[property].Economy7);
                      if (isEconomy7 == "on") {
                          $('.economy7 > span').css('box-shadow', 'rgba(255, 179, 0, 0.498039) 0px 0px 0px 7px inset').css('border-color', 'rgba(255, 179, 0, 0.498039)').css('transition', 'border 0.4s').css('box-shadow', '0.4s').css('background-color', '1.2s').css('background-color', 'rgba(255, 179, 0, 0.498039)');
                          $('.economy7 > span > small').css('left', '18px').css('transition', 'background-color 0.4s, left 0.2s').css('background-color', 'rgb(255, 179, 0)');
                          $("#inputEconomy7").prop("checked", true);
                          $("#inputRead2").show();
                          $(".electMeter").show();
                      } else {
                          $('.economy7 > span').css('box-shadow', 'rgba(0, 0, 0, 0.258824) 0px 0px 0px 0px inset').css('border-color', 'rgba(0, 0, 0, 0.258824)').css('transition', 'border 0.4s, box-shadow 0.4s').css('background-color', 'rgba(0, 0, 0, 0.258824)');
                          $('.economy7 > span > small').css('left', '0px').css('transition', 'background-color 0.4s, left 0.2s').css('background-color', 'rgb(250, 250, 250)');
                          $("#inputEconomy7").prop("checked", false);
                      }

                      var hiddenIsWaterMeter = $("#hiddenIsWaterMeter").val();
                      // getPropertyList(hiddenIsWaterMeter);


                      var isWaterMeter = resultGetProperty.records[property].WaterMeter;
                      $("#hiddenIsWaterMeter").val(resultGetProperty.records[property].WaterMeter);
                      if (isWaterMeter == "on") {
                          $('.waterMeter > span').css('box-shadow', 'rgba(255, 179, 0, 0.498039) 0px 0px 0px 7px inset').css('border-color', 'rgba(255, 179, 0, 0.498039)').css('transition', 'border 0.4s').css('box-shadow', '0.4s').css('background-color', '1.2s').css('background-color', 'rgba(255, 179, 0, 0.498039)');
                          $('.waterMeter > span > small').css('left', '18px').css('transition', 'background-color 0.4s, left 0.2s').css('background-color', 'rgb(255, 179, 0)');
                          $("#inputWaterMeter").prop("checked", true);
                          $(".waterMet").show();
                          $("#inputWater").show();
                          $(".waterAuthority").show();
                          $("#inputWaterAuthority").show();
                      } else {
                          $('.waterMeter > span').css('box-shadow', 'rgba(0, 0, 0, 0.258824) 0px 0px 0px 0px inset').css('border-color', 'rgba(0, 0, 0, 0.258824)').css('transition', 'border 0.4s, box-shadow 0.4s').css('background-color', 'rgba(0, 0, 0, 0.258824)');
                          $('.waterMeter > span > small').css('left', '0px').css('transition', 'background-color 0.4s, left 0.2s').css('background-color', 'rgb(250, 250, 250)');
                          $("#inputWaterMeter").prop("checked", false);
                      }

                      $("#select2-inputFuel-container").html(resultGetProperty.records[property].FuelType);
                      $("#select2-inputSupplierElectric-container").html(resultGetProperty.records[property].SupplierElectric);
                      $("#select2-inputSupplierGas-container").html(resultGetProperty.records[property].SupplierGas);

                      $("#hiddenselect").val(resultGetProperty.records[property].SupplierGas);

                      $("#inputRead1").val(resultGetProperty.records[property].ElectricSupplier1);
                      $("#inputRead2").val(resultGetProperty.records[property].ElectricSupplier2);
                      $("#inputGas").val(resultGetProperty.records[property].GasMeterRead);

                      $("#hiddeninputGas").val(resultGetProperty.records[property].GasMeterRead);

                      $("#inputWater").val(resultGetProperty.records[property].WaterMeterRead);

                      $("#inputSerial1").val(resultGetProperty.records[property].ElectricSerial1);
                      $("#inputSerial2").val(resultGetProperty.records[property].ElectricSerial2);
                      $("#inputGasSerialNo").val(resultGetProperty.records[property].WaterSerialNo);

                      $("#hiddeninputGasSerialNo").val(resultGetProperty.records[property].WaterSerialNo);

                      $("#inputWaterSerialNo").val(resultGetProperty.records[property].GasSerialNo);
                      
                      // $("#inputWaterAuthority").val(resultGetProperty.records[property].WaterAuthority);
                      $("#inputWaterAuthority").select2();
                      $("#select2-inputWaterAuthority-container").html(resultGetProperty.records[property].WaterAuthority);
                      // $("#inputTaxAuthority").val(resultGetProperty.records[property].TaxAuthority);
                      $("#inputTaxAuthority").select2();
                      $("#select2-inputTaxAuthority-container").html(resultGetProperty.records[property].TaxAuthority);


                      $("#inputEmailID").val(resultGetProperty.records[property].PropOwnerEmail);
                      $("#inputState").val(resultGetProperty.records[property].PropState);
                      $("#select2-inputState-container").html(resultGetProperty.records[property].PropState);

                      $("#inputCity").append("<option value='" + resultGetProperty.records[property].PropCity + "'>" + resultGetProperty.records[property].PropCity + "</option>");


                      $("#inputCity").select2();

                      $("#select2-inputCity-container").html(resultGetProperty.records[property].PropCity);


                      $("#inputState1").val(resultGetProperty.records[property].LandlordState);
                      $("#select2-inputState1-container").html(resultGetProperty.records[property].LandlordState);


                      $("#inputCity1").append("<option value='" + resultGetProperty.records[property].LandlordCity + "'>" + resultGetProperty.records[property].LandlordCity + "</option>");


                      $("#inputCity1").select2();

                      $("#select2-inputCity1-container").html(resultGetProperty.records[property].LandlordCity);




                      $("#inpuZip1").val(resultGetProperty.records[property].LandlordPostCode);
                      $("#inputAddress1").val(resultGetProperty.records[property].LandlordAddress);


                      $("#select2-inputProperty-container").html(resultGetProperty.records[property].PropertyType);
                      $("#select2-inputBedrooms-container").html(resultGetProperty.records[property].Bedrooms);
                      $("#select2-inputPropertyStatus-container").html(resultGetProperty.records[property].PropertyStatus);
                      $("#inpuZip").val(resultGetProperty.records[property].PropPostalCode);
                      $("#inputAddress").val(resultGetProperty.records[property].PropAddress);
                      $("#inputLocation").val(resultGetProperty.records[property].PropLocation);
                      $("#inpuCountry").val(resultGetProperty.records[property].PropCountry);

                      $("#hiddenIsLandlordInsurance").val(resultGetProperty.records[property].IsLandLordInsurance);
                      if (resultGetProperty.records[property].IsLandLordInsurance == 1) {
                          $('.isLandLordInsurance > span').css('box-shadow', 'rgba(255, 179, 0, 0.498039) 0px 0px 0px 7px inset').css('border-color', 'rgba(255, 179, 0, 0.498039)').css('transition', 'border 0.4s').css('box-shadow', '0.4s').css('background-color', '1.2s').css('background-color', 'rgba(255, 179, 0, 0.498039)');
                          $('.isLandLordInsurance > span > small').css('left', '18px').css('transition', 'background-color 0.4s, left 0.2s').css('background-color', 'rgb(255, 179, 0)');
                          $("#getAvail").prop("checked", true);
                          $(".getIsVoid").css('display', 'block');
                      } else {
                          $('.isLandLordInsurance > span').css('box-shadow', 'rgba(0, 0, 0, 0.258824) 0px 0px 0px 0px inset').css('border-color', 'rgba(0, 0, 0, 0.258824)').css('transition', 'border 0.4s, box-shadow 0.4s').css('background-color', 'rgba(0, 0, 0, 0.258824)');
                          $('.isLandLordInsurance > span > small').css('left', '0px').css('transition', 'background-color 0.4s, left 0.2s').css('background-color', 'rgb(250, 250, 250)');
                          $("#getAvail").prop("checked", false);
                          $(".getIsVoid").css('display', 'none');
                      }

                      $("#hiddenIsRentProtectionInsurance").val(resultGetProperty.records[property].IsLegalRentProtection);
                      if (resultGetProperty.records[property].IsLegalRentProtection == 1) {
                          $('.isRentProtectionInsurance > span').css('box-shadow', 'rgba(255, 179, 0, 0.498039) 0px 0px 0px 7px inset').css('border-color', 'rgba(255, 179, 0, 0.498039)').css('transition', 'border 0.4s').css('box-shadow', '0.4s').css('background-color', '1.2s').css('background-color', 'rgba(255, 179, 0, 0.498039)');
                          $('.isRentProtectionInsurance > span > small').css('left', '18px').css('transition', 'background-color 0.4s, left 0.2s').css('background-color', 'rgb(255, 179, 0)');
                          $("#getAvail").prop("checked", true);
                          $(".getIsVoid").css('display', 'block');
                      } else {
                          $('.isRentProtectionInsurance > span').css('box-shadow', 'rgba(0, 0, 0, 0.258824) 0px 0px 0px 0px inset').css('border-color', 'rgba(0, 0, 0, 0.258824)').css('transition', 'border 0.4s, box-shadow 0.4s').css('background-color', 'rgba(0, 0, 0, 0.258824)');
                          $('.isRentProtectionInsurance > span > small').css('left', '0px').css('transition', 'background-color 0.4s, left 0.2s').css('background-color', 'rgb(250, 250, 250)');
                          $("#getAvail").prop("checked", false);
                          $(".getIsVoid").css('display', 'none');
                      }

                      $(".bno-prefix").show();
                      $(".mno-prefix").show();
                      $("#inputMobileNumber").css("padding", "10px 25px 12px 32px");
                      $("#inputMobile-1").css("padding", "10px 25px 12px 32px");

                      $("#inputHmoLicenseNumber").val(resultGetProperty.records[property].HmoLicenseNumb);
                      
                      var getEneryPerformanceValidFrom = resultGetProperty.records[property].EpcValidFrom;
                     
                      if(getEneryPerformanceValidFrom == null){
                        $("#validFrom").val('');
                      } else {
                        var formatEneryPerformanceValidFrom = getEneryPerformanceValidFrom.split("-");
                        var getFinalEneryPerformanceValidFrom = formatEneryPerformanceValidFrom[2] + "." + formatEneryPerformanceValidFrom[1] + "." + formatEneryPerformanceValidFrom[0];
                        $("#validFrom").val(getFinalEneryPerformanceValidFrom);
                      }
                      

                      var getEneryPerformanceValidTo = resultGetProperty.records[property].EpcValidTill;
                      if(getEneryPerformanceValidTo == null){
                        $("#validTo").val('');
                      } else {
                        var formatEneryPerformanceValidTo = getEneryPerformanceValidTo.split("-");
                        var getFinalEneryPerformanceValidTo = formatEneryPerformanceValidTo[2] + "." + formatEneryPerformanceValidTo[1] + "." + formatEneryPerformanceValidTo[0];
                        $("#validTo").val(getFinalEneryPerformanceValidTo);
                      }
                     

                      var getElectricityCertificateValidFrom = resultGetProperty.records[property].ElectricCertValidFrom;
                      if(getElectricityCertificateValidFrom == null){
                        $("#electricityValidFrom").val('');
                      } else {
                        var formatElectricityCertificateValidFrom = getElectricityCertificateValidFrom.split("-");
                        var getFinalElectricityCertificateValidFrom = formatElectricityCertificateValidFrom[2] + "." + formatElectricityCertificateValidFrom[1] + "." + formatElectricityCertificateValidFrom[0];
                        $("#electricityValidFrom").val(getFinalElectricityCertificateValidFrom);
                      }

                      var getElectricityCertificateValidTo = resultGetProperty.records[property].ElectricCertValidTill;
                      if(getElectricityCertificateValidTo == null){
                        $("#electricityValidTo").val('');
                      } else {
                        var formatElectricityCertificateValidTo = getElectricityCertificateValidTo.split("-");
                        var getFinalElectricityCertificateValidTo = formatElectricityCertificateValidTo[2] + "." + formatElectricityCertificateValidTo[1] + "." + formatElectricityCertificateValidTo[0];
                        $("#electricityValidTo").val(getFinalElectricityCertificateValidTo);
                      }
                      

                      var getGasCertificateValidFrom = resultGetProperty.records[property].GasCertValidFrom;
                      if(getGasCertificateValidFrom == null){
                        $("#gasValidFrom").val('');
                      } else {
                        var formatGasCertificateValidFrom = getGasCertificateValidFrom.split("-");
                        var getFinalGasCertificateValidFrom = formatGasCertificateValidFrom[2] + "." + formatGasCertificateValidFrom[1] + "." + formatGasCertificateValidFrom[0];
                        $("#gasValidFrom").val(getFinalGasCertificateValidFrom);
                      }
                      
                      var getGasCertificateValidTo = resultGetProperty.records[property].GasCertValidTill;
                      if(getGasCertificateValidTo == null){
                        $("#gasValidTo").val('');
                      } else {
                        var formatGasCertificateValidTo = getGasCertificateValidTo.split("-");
                        var getFinalGasCertificateValidTo = formatGasCertificateValidTo[2] + "." + formatGasCertificateValidTo[1] + "." + formatGasCertificateValidTo[0];
                        $("#gasValidTo").val(getFinalGasCertificateValidTo);
                      }

                      var getLegCertificateValidFrom = resultGetProperty.records[property].LegCertValidFrom;
                      if(getLegCertificateValidFrom == null){
                        $("#legValidFrom").val('');
                      } else{
                        var formatLegCertificateValidFrom = getLegCertificateValidFrom.split("-");
                        var getFinalLegCertificateValidFrom = formatLegCertificateValidFrom[2] + "." + formatLegCertificateValidFrom[1] + "." + formatLegCertificateValidFrom[0];
                        $("#legValidFrom").val(getFinalLegCertificateValidFrom);
                      }

                      var getLegCertificateValidTo = resultGetProperty.records[property].LegCertValidTill;
                      if(getLegCertificateValidTo == null){
                         $("#legValidTo").val('');
                      } else {
                        var formatLegCertificateValidTo = getLegCertificateValidTo.split("-");
                        var getFinalLegCertificateValidTo = formatLegCertificateValidTo[2] + "." + formatLegCertificateValidTo[1] + "." + formatLegCertificateValidTo[0];
                        $("#legValidTo").val(getFinalLegCertificateValidTo);
                      }



                      imageUrl1 = resultGetProperty.records[property].EpcCertificate;
                      imageUrl2 = resultGetProperty.records[property].ElectricCetificate;
                      imageUrl3 = resultGetProperty.records[property].GasCertificate;
                      imageUrl4 = resultGetProperty.records[property].HmoUploadPic;
                      imageUrl5 = resultGetProperty.records[property].LegCertificate;
                      if (imageUrl1 == null || imageUrl1 == "") {
                          $("#imgEnergyPerformanceCertificate").attr("src", "assets/img/noImage.gif");
                      } else {
                          $("#imgEnergyPerformanceCertificate").attr("src", domainAddress + imageUrl1);
                      }
                      if (imageUrl2 == null || imageUrl2 == "") {
                          $("#imgElectricityCertificate").attr("src", "assets/img/noImage.gif");
                      } else {
                          $("#imgElectricityCertificate").attr("src", domainAddress + imageUrl2);
                      }
                      if (imageUrl3 == null || imageUrl3 == "") {
                          $("#imgGasCertificate").attr("src", "assets/img/noImage.gif");
                      } else {
                          $("#imgGasCertificate").attr("src", domainAddress + imageUrl3);
                      }

                     

                      if (imageUrl4 == null || imageUrl4 == "") {
                          $("#imgHmoUploadPic").attr("src", "assets/img/noImage.gif");
                      } else {
                           var getLogoImagePath = imageUrl4.slice(0,4);
                          if(getLogoImagePath=="api/"){
                              getLogoImagePath = imageUrl4.slice(4);
                              $("#imgHmoUploadPic").attr("src", domainAddress + getLogoImagePath).show();
                          }
                          else{
                              $("#imgHmoUploadPic").attr("src", domainAddress + imageUrl4).show();
                          }
                      }

                      if (imageUrl5 == null || imageUrl5 == "") {
                          $("#imgLegCertificate").attr("src", "assets/img/noImage.gif");
                      } else {
                          $("#imgLegCertificate").attr("src", domainAddress + imageUrl5);
                      }

                      isFourExistNo = 0;
                      isOneExistNo = 0;

                      if (resultGetProperty.records[property].UserReg == undefined || resultGetProperty.records[property].UserReg == "undefined") {
                          $(".btnSubmitPropertyMoveOut").hide();
                      } else {
                          $(".btnSubmitPropertyMoveOut").show();
                      }

                    //****** Tenant History Starts ******//
                    for (var moveOutTenant in resultGetProperty.records[property].UserRegMoveOutCount) {
                        var Moveoutcount = resultGetProperty.records[property].UserRegMoveOutCount[moveOutTenant].Moveoutcount;
                            if (Moveoutcount== 0) 
                            {
                                $(".getMoveoutTenantDetails").html('');
                                $(".getMoveoutTenantDetails").append("<tr> <td>No records found</td> <td></td> <td></td> <td></td> <td></td> </tr>");
                            } 
                            else 
                            {
                                $(".getMoveoutTenantDetails").html('');
                                for (var outProperty in resultGetProperty.records[property].UserRegOut) 
                                {
                                    $(".getMoveoutTenantDetails").append("<tr> <td>"+resultGetProperty.records[property].UserRegOut[outProperty].UserID+"</td> <td>"+resultGetProperty.records[property].UserRegOut[outProperty].FullName+"</td> <td>"+resultGetProperty.records[property].UserRegOut[outProperty].EmailID+"</td> <td>"+resultGetProperty.records[property].UserRegOut[outProperty].PhoneNumber+"</td> <td style='font-weight:bold;'>"+resultGetProperty.records[property].UserRegOut[outProperty].TenantMoveOutDate+"</td> </tr>");
                                    var MoveOutUserID = resultGetProperty.records[property].UserRegOut[outProperty].UserID;
                                    var MoveOutStatus = resultGetProperty.records[property].UserRegOut[outProperty].TenantStatus;
                                    var AddPropertyID = resultGetProperty.records[property].UserRegOut[outProperty].AddPropertyID;                             
                                }
                                $("#hiddenmoveoutproperty").val(MoveOutStatus);
                                $("#hiddenmoveoutpropertyID").val(AddPropertyID);
                                $("#hiddenmoveoutuserid").val(MoveOutUserID);
                            }
                    }
                    //****** Tenant History Ends ******//
                    
                    for (var moveInTenant in resultGetProperty.records[property].UserRegMoveInCount) {
                        var Moveincount = resultGetProperty.records[property].UserRegMoveInCount[moveInTenant].Moveincount;
                        $("#hiddenmoveincount").val(Moveincount);
                        if(Moveincount == 0){
                            getAddTenant(count);
                        }
                    }

                      for (var addProperty in resultGetProperty.records[property].UserReg) {
                          count++;
                          $(".newAdd").remove();
                          getAddTenant(count);
                          var newItem = {
                              'Count': parseInt(count),
                              'AddPropertyID': resultGetProperty.records[property].UserReg[addProperty].AddPropertyID,
                              'UserRegID': resultGetProperty.records[property].UserReg[addProperty].UserID,
                              'TitleName':resultGetProperty.records[property].UserReg[addProperty].TitleName,
                              'Name': resultGetProperty.records[property].UserReg[addProperty].Name,
                              'LastName':resultGetProperty.records[property].UserReg[addProperty].LastName,
                              'Email': resultGetProperty.records[property].UserReg[addProperty].EmailID,
                              'Mobile': resultGetProperty.records[property].UserReg[addProperty].PhoneNumber,
                              'LettingAgencyCode': undefined,
                              'TenancyStart':resultGetProperty.records[property].UserReg[addProperty].TenancyStart,
                              'TenancyEnd':resultGetProperty.records[property].UserReg[addProperty].TenancyEnd,
                              'IsElectricity': $('#hiddenIsElectricity-'+count).val(),
                              'IsGas': $('#hiddenIsGas-'+count).val(),
                              'IsWater': $('#hiddenIsWater-'+count).val(),
                              'IsCouncil': $('#hiddenIsCouncil-'+count).val(),
                              'IsAvailTenantInsurance': $('#hiddenAvailTenantInsurance-'+count).val(),
                              'IsNewTenantUtility': $('#hiddenIsNewTenantUpdate-'+count).val(),
                              'IsLeadTenant': resultGetProperty.records[property].UserReg[addProperty].IsLeadTenant
                          };
                          getAddTenantArr.push(newItem);
                          
                          var MoveInStatus = resultGetProperty.records[property].UserReg[addProperty].TenantStatus;
                        //   alert("MoveInStatus from Get Property Page===>"+MoveInStatus);
                          $("#hiddenmoveinproperty").val(MoveInStatus);

                          
                          if(count!=1)
                          $("#closeCard-"+count).show();
                          $("#hiddenNewPropertyTenant-" + count).val(true);
                          $("#btnAddUserTenant-" + count).hide();
                          $("#btnRemoveUserTenant-" + count).show();
                          $("#hiddenUserRegID-" + count).val(resultGetProperty.records[property].UserReg[addProperty].UserID);
                          $("#hiddenAddPropertyID-" + count).val(resultGetProperty.records[property].UserReg[addProperty].AddPropertyID);
                          $("#inputName-" + count).val(resultGetProperty.records[property].UserReg[addProperty].Name);

                          $("#inputLastName-" + count).val(resultGetProperty.records[property].UserReg[addProperty].LastName);


                          $("#select2-inputTitle-" + count + "-container").html(resultGetProperty.records[property].UserReg[addProperty].TitleName);

                          $("#inputEmail-" + count).val(resultGetProperty.records[property].UserReg[addProperty].EmailID);

                          if (resultGetProperty.records[property].UserReg[addProperty].TenancyStart != "" && resultGetProperty.records[property].UserReg[addProperty].TenancyStart != null) {
                              var selectStartDate = resultGetProperty.records[property].UserReg[addProperty].TenancyStart.split("-");
                              var tenancyStart = selectStartDate[2] + "." + selectStartDate[1] + "." + selectStartDate[0];

                              $("#inputStartDate-" + count).val(tenancyStart);

                          }


                          if (resultGetProperty.records[property].UserReg[addProperty].TenancyEnd != "" && resultGetProperty.records[property].UserReg[addProperty].TenancyEnd != null) {
                              var selectEndDate = resultGetProperty.records[property].UserReg[addProperty].TenancyEnd.split("-");
                              var tenancyEnd = selectEndDate[2] + "." + selectEndDate[1] + "." + selectEndDate[0];

                              $("#inputEndDate-" + count).val(tenancyEnd);

                          }
                          
                          if(resultGetProperty.records[property].UserReg[addProperty].PhoneNumber == null){
                            $("#inputMobile-" + count).val('');
                          } else {
                              isFourExistNo = resultGetProperty.records[property].UserReg[addProperty].PhoneNumber.slice(0, 3);
                              isOneExistNo = resultGetProperty.records[property].UserReg[addProperty].PhoneNumber.slice(0, 2);
                              if (isFourExistNo == "+44" || isFourExistNo == "+91") {
                                  $("#inputMobile-" + count).val(resultGetProperty.records[property].UserReg[addProperty].PhoneNumber.slice(3));
                              } else {
                                  $("#inputMobile-" + count).val(resultGetProperty.records[property].UserReg[addProperty].PhoneNumber);
                              }
                              if (isOneExistNo == "+1") {
                                  $("#inputMobile-" + count).val(resultGetProperty.records[property].UserReg[addProperty].PhoneNumber.slice(2));
                              }
                          }

                          

                          $("#inputMobile-" + count).css("padding", "10px 25px 12px 33px");
                          $(".promno-prefix").show();
                          if (resultGetProperty.records[property].UserReg[addProperty].AppInstalled == 1) {
                              $("#getIsAppInstallCheck-" + count).css("border", "1px solid greenyellow");
                          } else {
                              $("#getIsAppInstallCheck-" + count).css("border", "1px solid red");
                          }

                          if (resultGetProperty.records[property].UserReg[addProperty].IsLeadTenant == 1) {
                              $("#isLeadTenant-" + count).prop("checked", true);
                          } else {
                              $("#isLeadTenant-" + count).prop("checked", false);
                          }



                      }

                      var utilityCount = 0;
                      for (var getUtility in resultGetProperty.records[property].Utility) {
                          utilityCount++;
                          $("#hiddenAddress-" + utilityCount).val(resultGetProperty.records[property].Utility[getUtility].Address);
                          $("#hiddenElectricSupplier1-" + utilityCount).val(resultGetProperty.records[property].Utility[getUtility].ElectricSupplier1);
                          $("#hiddenElectricSupplier2-" + utilityCount).val(resultGetProperty.records[property].Utility[getUtility].ElectricSupplier2);
                          $("#hiddenFuelType-" + utilityCount).val(resultGetProperty.records[property].Utility[getUtility].FuelType);
                          $("#hiddenGasMeterRead-" + utilityCount).val(resultGetProperty.records[property].Utility[getUtility].GasMeterRead);
                          $("#hiddenSupplierElectric-" + utilityCount).val(resultGetProperty.records[property].Utility[getUtility].SupplierElectric);
                          $("#hiddenSupplierGas-" + utilityCount).val(resultGetProperty.records[property].Utility[getUtility].SupplierGas);
                          $("#hiddenTenancyStart-" + utilityCount).val(resultGetProperty.records[property].Utility[getUtility].TenancyStart);
                          $("#hiddenTenancyEnd-" + utilityCount).val(resultGetProperty.records[property].Utility[getUtility].TenancyEnd);
                          $("#hiddenWaterMeterRead-" + utilityCount).val(resultGetProperty.records[property].Utility[getUtility].WaterMeterRead);

                          if ($("#hiddenIsGas-" + utilityCount).val() == 1) {
                              $("#isElectricityImg-" + utilityCount).attr("src", "assets/img/PropertyImg/electricity.png");
                              $("#isWaterImg-" + utilityCount).attr("src", "assets/img/PropertyImg/water.png");
                              $("#isCouncilImg-" + utilityCount).attr("src", "assets/img/PropertyImg/council.png");

                          }

                          if ($("#hiddenIsWater-" + utilityCount).val() == 1) {
                              $("#isElectricityImg-" + utilityCount).attr("src", "assets/img/PropertyImg/electricity.png");
                              $("#isGasImg-" + utilityCount).attr("src", "assets/img/PropertyImg/gas.png");
                              $("#isCouncilImg-" + utilityCount).attr("src", "assets/img/PropertyImg/council.png");

                          }


                          
                          if ($("#hiddenIsElectricity-" + utilityCount).val() == 1) {
                              $("#isWaterImg-" + utilityCount).attr("src", "assets/img/PropertyImg/water.png");
                              $("#isGasImg-" + utilityCount).attr("src", "assets/img/PropertyImg/gas.png");
                              $("#isCouncilImg-" + utilityCount).attr("src", "assets/img/PropertyImg/council.png");

                          }



                          if ($("#hiddenIsCouncil-" + utilityCount).val() == 1) {
                              $("#isWaterImg-" + utilityCount).attr("src", "assets/img/PropertyImg/water.png");
                              $("#isGasImg-" + utilityCount).attr("src", "assets/img/PropertyImg/gas.png");
                              $("#isElectricityImg-" + utilityCount).attr("src", "assets/img/PropertyImg/electricity.png");

                          }

                          $("#hiddenIsGas-" + utilityCount).val(resultGetProperty.records[property].Utility[getUtility].IsGas);
                          $("#hiddenIsElectricity-" + utilityCount).val(resultGetProperty.records[property].Utility[getUtility].IsElectricity);
                          $("#hiddenIsWater-" + utilityCount).val(resultGetProperty.records[property].Utility[getUtility].IsWater);
                          $("#hiddenIsCouncil-" + utilityCount).val(resultGetProperty.records[property].Utility[getUtility].IsCouncil);
                          $("#hiddenAvailTenantInsurance-" + utilityCount).val(resultGetProperty.records[property].Utility[getUtility].IsTenantInsurance);

                          for(getLocalTenantData in getAddTenantArr){
                            if(utilityCount == getAddTenantArr[getLocalTenantData].Count){
                              getAddTenantArr[getLocalTenantData].IsElectricity = resultGetProperty.records[property].Utility[getUtility].IsElectricity;
                              getAddTenantArr[getLocalTenantData].IsGas = resultGetProperty.records[property].Utility[getUtility].IsGas;
                              getAddTenantArr[getLocalTenantData].IsWater = resultGetProperty.records[property].Utility[getUtility].IsWater;
                              getAddTenantArr[getLocalTenantData].IsCouncil = resultGetProperty.records[property].Utility[getUtility].IsCouncil;
                              getAddTenantArr[getLocalTenantData].IsAvailTenantInsurance = resultGetProperty.records[property].Utility[getUtility].IsTenantInsurance;

                              if (resultGetProperty.records[property].Utility[getUtility].IsGas=="1" && resultGetProperty.records[property].Utility[getUtility].UtilityRegType=="move-in") {
                                  $("#isGasImg-" + utilityCount).attr("src", "assets/img/PropertyImg/gas_select.png");
                              }
                              if (resultGetProperty.records[property].Utility[getUtility].IsElectricity=="1" && resultGetProperty.records[property].Utility[getUtility].UtilityRegType=="move-in")
                                  $("#isElectricityImg-" + utilityCount).attr("src", "assets/img/PropertyImg/electricity_select.png");
                              if (resultGetProperty.records[property].Utility[getUtility].IsWater=="1" && resultGetProperty.records[property].Utility[getUtility].UtilityRegType=="move-in")
                                  $("#isWaterImg-" + utilityCount).attr("src", "assets/img/PropertyImg/water_select.png");
                              if (resultGetProperty.records[property].Utility[getUtility].IsCouncil=="1" && resultGetProperty.records[property].Utility[getUtility].UtilityRegType=="move-in")
                                  $("#isCouncilImg-" + utilityCount).attr("src", "assets/img/PropertyImg/council_select.png");
                            }
                          }

                          
                      } 
                      getAddRemove(count);
                      localStorage.setItem('MyRequestTenantsData', JSON.stringify(getAddTenantArr));
                  }

                  $(".propertyContent").show();
                  $(".utilityInfo").show();
                  $(".landlordInfo").show();
                  $(".propMandatoryContent").show();
                  $(".btnSubmitProperty").html("Update Property");
                  $(".md-input-wrapper").addClass("md-input-filled");
                  $("#getLoadingModalContent").removeClass('md-show');


                  $.get(domainAddress + "GetUserUtilityListByProperty/" + editPropertyID, {}, function(result) {
                      $(".getPropertyUtility").show();
                      if (result.record_count == 0) {
                          $(".propertyUtility").html('');
                          $(".propertyUtility").append("<tr> <td>No records found</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>");
                      } else {
                          $(".propertyUtility").html('');
                          var isElectricity = "";
                          var isGas = "";
                          var isWater = "";
                          var isCouncil = "";
                          var electricity = "";
                          var water = "";
                          var gas = "";
                          var council = "";
                          var cElectricity = "";
                          var cGas = "";
                          var cWater = "";
                          var cCouncil = "";
                          var getUtilityIcon = "";
                          var utilityStatusCheck = "";
                          getUtilityIcon = new Array();
                          for (var propertyUtility in result.records) {
                              if (result.records[propertyUtility].IsElectricity == 0 && result.records[propertyUtility].IsGas == 0 && result.records[propertyUtility].IsWater == 0 && result.records[propertyUtility].IsCouncil == 0) {
                                  utilityStatusCheck = "Not Applicable";
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
                                var UtilityRegType = "";
                                if(result.records[propertyUtility].UtilityRegType == "move-in"){
                                    UtilityRegType = "MoveIn";
                                    $(".propertyUtility").prepend("<tr> <td style='font-weight:bold; color: green;'>" + UtilityRegType + "</td> <td>" + result.records[propertyUtility].Name + "</td> <td>" + result.records[propertyUtility].EmailID + "</td> <td>" + result.records[propertyUtility].MobileNumber + "</td> <td style='font-weight:bold;'>" + moment(result.records[propertyUtility].Date).format('Do MMM YYYY,  h:mm a') + "</td>  <td style='color:" + cElectricity + ";'>" + isElectricity + "</td> <td style='color:" + cGas + ";'>" + isGas + "</td> <td style='color:" + cWater + ";'>" + isWater + "</td> <td style='color:" + cCouncil + ";'>" + isCouncil + "</td> <td>" + utilityStatusCheck + "</td> </tr>");
                                } else {
                                    UtilityRegType = "MoveOut";
                                    $(".propertyUtility").prepend("<tr> <td style='font-weight:bold; color: red;'>" + UtilityRegType + "</td> <td>" + result.records[propertyUtility].Name + "</td> <td>" + result.records[propertyUtility].EmailID + "</td> <td>" + result.records[propertyUtility].MobileNumber + "</td> <td style='font-weight:bold;'>" + moment(result.records[propertyUtility].Date).format('Do MMM YYYY,  h:mm a') + "</td>  <td style='color:" + cElectricity + ";'>" + isElectricity + "</td> <td style='color:" + cGas + ";'>" + isGas + "</td> <td style='color:" + cWater + ";'>" + isWater + "</td> <td style='color:" + cCouncil + ";'>" + isCouncil + "</td> <td>" + utilityStatusCheck + "</td> </tr>");
                                }
                               
                              
                          }
                      }
                  }); // GetUserUtilityListByProperty/

              }); // GetPropertyRegister/
  } // getPropertyInfo