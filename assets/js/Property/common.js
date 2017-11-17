         $(".getLandlordInfo").on('click', function() {
             if ($(".landlordInfo").is(":hidden")) {
                 $(".landlordInfo").show("slow");
                 $(".landLordTitle").text('- Landlord Details');
             } else {
                 $(".landlordInfo").hide("slow");
                 $(".landLordTitle").text('+ Landlord Details');
             }
         }); // .getLandlordInfo

         $(".getUtilityInfo").on('click', function() {
             if ($(".utilityInfo").is(":hidden")) {
                 $(".utilityInfo").show("slow");
                 $(".getUtilityInfo").text('- Utility Management Details');
             } else {
                 $(".utilityInfo").hide("slow");
                 $(".getUtilityInfo").text('+ Utility Management Details');
             }
         }); // .getUtilityInfo 

         $(".getPropMandatoryInfo").on('click', function() {
             if ($(".propMandatoryContent").is(":hidden")) {
                 $(".propMandatoryContent").show("slow");
                 $(".getPropMandatoryInfo").text('- Property Mandatory Details');
             } else {
                 $(".propMandatoryContent").hide("slow");
                 $(".getPropMandatoryInfo").text('+ Property Mandatory Details');
             }
         }); // .getPropMandatoryInfo

         $(".getTenantsInfo").on('click', function() {
             if ($(".getTenantList").is(":hidden")) {
                 $(".getTenantList").show("slow");
                 $(".getTenantsInfo").text('- Current Occupant');
             } else {
                 $(".getTenantList").hide("slow");
                 $(".getTenantsInfo").text('+ Current Occupant');
             }
         }); // .getTenantInfo

         $(".PropertyDetailsinfo").on('click', function() {
             if ($(".PropertyDetails").is(":hidden")) {
                 $(".PropertyDetails").show("slow");
                 $(".PropertyDetailsinfo").text('- Property Details');
             } else {
                 $(".PropertyDetails").hide("slow");
                 $(".PropertyDetailsinfo").text('+ Property Details');
             }
         }); // .PropertyDetailsinfo

         $(".getUtilityHistory").on('click', function() {
             if ($(".getPropertyUtility").is(":hidden")) {
                 $(".getPropertyUtility").show("slow");
                 $(".getUtilityHistory").text('- Utility History');
             } else {
                 $(".getPropertyUtility").hide("slow");
                 $(".getUtilityHistory").text('+ Utility History');
             }
         }); // .PropertyDetailsinfo

         $(".tenantHistory").on('click', function() {
             if ($(".gettenantHistory").is(":hidden")) {
                 $(".gettenantHistory").show("slow");
                 $(".tenantHistory").text('- Tenant History');
             } else {
                 $(".gettenantHistory").hide("slow");
                 $(".tenantHistory").text('+ Tenant History');
             }
         }); // .PropertyDetailsinfo

         $(".getPropertyInfo").click(function() {
             $(".propertyInfo").toggle();
         });

         $("#inputMobileNumber").keypress(function(e) {
             if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                 return false;
             }
         });

         $(".btnSearch").click(function () {
            getValue = $("#inputSearch").val();
            getPropertyList(getValue);
            $('html, body').animate({
               scrollTop: $(".lblPropertyList").offset().top -25
            }, 800);
         });  // SearchSpeciality

        $("#inputHMONoOfTenent").keyup(function(e) {
            count = $("#inputHMONoOfTenent").val();
            if(count==""){

            } else {
                if (count == 1) {
                    $(".hmoInputTenent").hide();
                } else {
                    $(".hmoInputTenent").show('slow');
                }

                $(".getTenantList").html('');

                if(count == 0){
                    $(".noOfTenanterrorInfo").show();
                    $(".noOfTenanterrorInfo").text("* Enter atleast 1 Tenant");
                    $(".errorInfo").show();
                    $(".errorInfo").text("* Enter atleast 1 Tenant");
                    $("#inputHMONoOfTenent").css("border-color", "red");
                    $(".btnSubmitProperty").attr("disabled", true);
                    return false;
                } else if(count > 10){
                    $(".noOfTenanterrorInfo").show();
                    $(".noOfTenanterrorInfo").text("* Enter Only 10 Tenants");
                    $(".errorInfo").show();
                    $(".errorInfo").text("* Enter Only 10 Tenants");
                    $("#inputHMONoOfTenent").css("border-color", "red");
                    $(".btnSubmitProperty").attr("disabled", true);
                } else {
                    $(".getTenantList").html('');
                    $(".noOfTenanterrorInfo").hide();
                    $(".noOfTenanterrorInfo").html("");
                    $(".errorInfo").hide();
                    $(".errorInfo").html("");
                    $("#inputHMONoOfTenent").css("border-color", "#444");
                    $(".btnSubmitProperty").attr("disabled", false);
                    for(var i=1;i<=count;i++){
                        getAddTenant(i);
                        $("#getIsAppInstallCheck-"+i).css("height", "610px");
                        if(i!=1){
                            $("#closeCard-" + i).show();
                        }
                    }
                    getAddRemove(count);
                }

                var localTenantData = localStorage.getItem('MyRequestTenantsData');
                if (localTenantData != null) {
                    var getLocalTenantData = JSON.parse(localStorage.getItem('MyRequestTenantsData'));
                    var getLocalCount = 0;
                    for (getData in getLocalTenantData) {
                        getLocalCount++;
                        var selectStartDate = getLocalTenantData[getData].TenancyStart.split("-");
                        var tenancyStart = selectStartDate[2] + "." + selectStartDate[1] + "." + selectStartDate[0];

                        var selectEndDate = getLocalTenantData[getData].TenancyEnd.split("-");
                        var tenancyEnd = selectEndDate[2] + "." + selectEndDate[1] + "." + selectEndDate[0];


                        var isFourExistNo = getLocalTenantData[getData].Mobile.slice(0, 3);
                        var isOneExistNo = getLocalTenantData[getData].Mobile.slice(0, 2);
                        if (isFourExistNo == "+44" || isFourExistNo == "+91") {
                          $("#inputMobile-" + getLocalCount).val(getLocalTenantData[getData].Mobile.slice(3));
                        } else {
                          $("#inputMobile-" + getLocalCount).val(getLocalTenantData[getData].Mobile);
                        }
                        if (isOneExistNo == "+1") {
                          $("#inputMobile-" + getLocalCount).val(getLocalTenantData[getData].Mobile.slice(2));
                        }

                        $("#inputMobile-" + getLocalCount).css("padding", "10px 25px 12px 33px");
                        $(".promno-prefix").show();

                        $("#inputName-"+getLocalCount).val(getLocalTenantData[getData].Name);
                        $("#inputLastName-"+getLocalCount).val(getLocalTenantData[getData].LastName);
                        $("#inputEmail-"+getLocalCount).val(getLocalTenantData[getData].Email);
                        $("#inputStartDate-"+getLocalCount).val(tenancyStart);
                        $("#inputEndDate-"+getLocalCount).val(tenancyEnd);
                        $("#select2-inputTitle-" + getLocalCount + "-container").html(getLocalTenantData[getData].TitleName);

                        if (getLocalTenantData[getData].IsLeadTenant == 1) {
                            $("#isLeadTenant-" + getLocalCount).prop("checked", true);
                        } else {
                            $("#isLeadTenant-" + getLocalCount).prop("checked", false);
                        }

                        $("#hiddenIsGas-" + getLocalCount).val(getLocalTenantData[getData].IsGas);
                        $("#hiddenIsElectricity-" + getLocalCount).val(getLocalTenantData[getData].IsElectricity);
                        $("#hiddenIsWater-" + getLocalCount).val(getLocalTenantData[getData].IsWater);
                        $("#hiddenIsCouncil-" + getLocalCount).val(getLocalTenantData[getData].IsCouncil);
                        $("#hiddenAvailTenantInsurance-" + getLocalCount).val(getLocalTenantData[getData].IsAvailTenantInsurance);
                         

                        if ($("#hiddenIsGas-" + getLocalCount).val() == "1") {
                          $("#isGasImg-" + getLocalCount).attr("src", "assets/img/PropertyImg/gas_select.png");
                        } else {
                          $("#isGasImg-" + getLocalCount).attr("src", "assets/img/PropertyImg/gas.png");
                        }

                          if ($("#hiddenIsWater-" + getLocalCount).val() == "1") {
                              $("#isWaterImg-" + getLocalCount).attr("src", "assets/img/PropertyImg/water_select.png");
                          } else {
                              $("#isWaterImg-" + getLocalCount).attr("src", "assets/img/PropertyImg/water.png");
                          }


                          
                          if ($("#hiddenIsElectricity-" + getLocalCount).val() == "1") {
                              $("#isElectricityImg-" + getLocalCount).attr("src", "assets/img/PropertyImg/electricity_select.png");
                          } else {
                              $("#isElectricityImg-" + getLocalCount).attr("src", "assets/img/PropertyImg/electricity.png");
                          }



                          if ($("#hiddenIsCouncil-" + getLocalCount).val() == "1") {
                             $("#isCouncilImg-" + getLocalCount).attr("src", "assets/img/PropertyImg/council_select.png");
                          } else {
                              $("#isCouncilImg-" + getLocalCount).attr("src", "assets/img/PropertyImg/council.png");
                          }



                    } // getLocalTenantData
                    $(".md-input-wrapper").addClass("md-input-filled");
                } //localTenantData
            } // else count check
            
        });

         $("#inputHMONoOfTenent").on('change',function(){
            count = $("#inputHMONoOfTenent").val();
            if (count == 1) {
                $(".hmoInputTenent").hide();
            } else {
                $(".hmoInputTenent").show('slow');
            }

            $(".getTenantList").html('');
            
            if(count == 0){
                $(".noOfTenanterrorInfo").show();
                $(".noOfTenanterrorInfo").text("* Enter atleast 1 Tenant");
                $(".errorInfo").show();
                $(".errorInfo").text("* Enter atleast 1 Tenant");
                $("#inputHMONoOfTenent").css("border-color", "red");
                $(".btnSubmitProperty").attr("disabled", true);
                return false;
            } else if(count > 10){
                $(".noOfTenanterrorInfo").show();
                $(".noOfTenanterrorInfo").text("* Enter Only 10 Tenants");
                $(".errorInfo").show();
                $(".errorInfo").text("* Enter Only 10 Tenants");
                $("#inputHMONoOfTenent").css("border-color", "red");
                $(".btnSubmitProperty").attr("disabled", true);
            } else {
                $(".getTenantList").html('');
                $(".noOfTenanterrorInfo").hide();
                $(".noOfTenanterrorInfo").html("");
                $(".errorInfo").hide();
                $(".errorInfo").html("");
                $("#inputHMONoOfTenent").css("border-color", "#444");
                $(".btnSubmitProperty").attr("disabled", false);
                for(var i=1;i<=count;i++){
                    getAddTenant(i);
                    $("#getIsAppInstallCheck-"+i).css("height", "610px");
                    if(i!=1){
                        $("#closeCard-" + i).show();
                    }
                }
                getAddRemove(count);
            }
            var localTenantData = localStorage.getItem('MyRequestTenantsData');
                if (localTenantData != null) {
                    var getLocalTenantData = JSON.parse(localStorage.getItem('MyRequestTenantsData'));
                    var getLocalCount = 0;
                    for (getData in getLocalTenantData) {
                        getLocalCount++;
                        var selectStartDate = getLocalTenantData[getData].TenancyStart.split("-");
                        var tenancyStart = selectStartDate[2] + "." + selectStartDate[1] + "." + selectStartDate[0];

                        var selectEndDate = getLocalTenantData[getData].TenancyEnd.split("-");
                        var tenancyEnd = selectEndDate[2] + "." + selectEndDate[1] + "." + selectEndDate[0];


                        var isFourExistNo = getLocalTenantData[getData].Mobile.slice(0, 3);
                        var isOneExistNo = getLocalTenantData[getData].Mobile.slice(0, 2);
                        if (isFourExistNo == "+44" || isFourExistNo == "+91") {
                          $("#inputMobile-" + getLocalCount).val(getLocalTenantData[getData].Mobile.slice(3));
                        } else {
                          $("#inputMobile-" + getLocalCount).val(getLocalTenantData[getData].Mobile);
                        }
                        if (isOneExistNo == "+1") {
                          $("#inputMobile-" + getLocalCount).val(getLocalTenantData[getData].Mobile.slice(2));
                        }

                        $("#inputMobile-" + getLocalCount).css("padding", "10px 25px 12px 33px");
                        $(".promno-prefix").show();

                        $("#inputName-"+getLocalCount).val(getLocalTenantData[getData].Name);
                        $("#inputLastName-"+getLocalCount).val(getLocalTenantData[getData].LastName);
                        $("#inputEmail-"+getLocalCount).val(getLocalTenantData[getData].Email);
                        $("#inputStartDate-"+getLocalCount).val(tenancyStart);
                        $("#inputEndDate-"+getLocalCount).val(tenancyEnd);
                        $("#select2-inputTitle-" + getLocalCount + "-container").html(getLocalTenantData[getData].TitleName);

                        if (getLocalTenantData[getData].IsLeadTenant == 1) {
                            $("#isLeadTenant-" + getLocalCount).prop("checked", true);
                        } else {
                            $("#isLeadTenant-" + getLocalCount).prop("checked", false);
                        }

                        $("#hiddenIsGas-" + getLocalCount).val(getLocalTenantData[getData].IsGas);
                        $("#hiddenIsElectricity-" + getLocalCount).val(getLocalTenantData[getData].IsElectricity);
                        $("#hiddenIsWater-" + getLocalCount).val(getLocalTenantData[getData].IsWater);
                        $("#hiddenIsCouncil-" + getLocalCount).val(getLocalTenantData[getData].IsCouncil);
                        $("#hiddenAvailTenantInsurance-" + getLocalCount).val(getLocalTenantData[getData].IsAvailTenantInsurance);
                         

                        if ($("#hiddenIsGas-" + getLocalCount).val() == "1") {
                          $("#isGasImg-" + getLocalCount).attr("src", "assets/img/PropertyImg/gas_select.png");
                        } else {
                          $("#isGasImg-" + getLocalCount).attr("src", "assets/img/PropertyImg/gas.png");
                        }

                          if ($("#hiddenIsWater-" + getLocalCount).val() == "1") {
                              $("#isWaterImg-" + getLocalCount).attr("src", "assets/img/PropertyImg/water_select.png");
                          } else {
                              $("#isWaterImg-" + getLocalCount).attr("src", "assets/img/PropertyImg/water.png");
                          }


                          
                          if ($("#hiddenIsElectricity-" + getLocalCount).val() == "1") {
                              $("#isElectricityImg-" + getLocalCount).attr("src", "assets/img/PropertyImg/electricity_select.png");
                          } else {
                              $("#isElectricityImg-" + getLocalCount).attr("src", "assets/img/PropertyImg/electricity.png");
                          }



                          if ($("#hiddenIsCouncil-" + getLocalCount).val() == "1") {
                             $("#isCouncilImg-" + getLocalCount).attr("src", "assets/img/PropertyImg/council_select.png");
                          } else {
                              $("#isCouncilImg-" + getLocalCount).attr("src", "assets/img/PropertyImg/council.png");
                          }



                    } // getLocalTenantData
                    $(".md-input-wrapper").addClass("md-input-filled");
                } //localTenantData
         }); // inputHMONoOfTenant on change

         $("#inputHMONoOfTenent").keydown(function(e) {
             // Allow: backspace, delete, tab, escape, enter and .
             if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                 // Allow: Ctrl+A
                 (e.keyCode == 65 && e.ctrlKey === true) ||
                 // Allow: Ctrl+C
                 (e.keyCode == 67 && e.ctrlKey === true) ||
                 // Allow: Ctrl+X
                 (e.keyCode == 88 && e.ctrlKey === true) ||
                 // Allow: home, end, left, right
                 (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
             }
             // Ensure that it is a number and stop the keypress
             if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                 e.preventDefault();
             }
         });