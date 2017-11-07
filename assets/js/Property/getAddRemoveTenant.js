function getAddTenant(count) {
    var fetchIsAppInstalled = 0;
    var getFirstName = "First Name";
    var getLastName = "Last Name";
    var getEmail = "Email";
    var getMobile = "Mobile";
    var getTitle = "Title";
    var isExistUserCheck = "";
    var getPhoneCode = localStorage.getItem("MyRequest_PhoneCode-prefix");
    var getcountryCode = localStorage.getItem("MyRequest_countryCode");
    finalTenantCount = count;
    $(".getTenantList").append('<div class="uk-width-medium-1-3 tenantList"  tenantID = "'+count+'" style="margin-top: 10px;"> <div class="md-card getTenantCardList" id="getIsAppInstallCheck-' + count + '"> <div class="md-card-content large-padding"> <span class="closeCard" id="closeCard-' + count + '" style="display:none;float:right;cursor:pointer;"><i class="fa fa-times"></i></span><div class="parsley-row"> <label for="inputMobile">' + getMobile + '<span class="req">*</span></label> <input type="text" id="inputMobile-' + count + '" name="inputMobile" required class="md-input inputMobile" maxlength="10"/> <span class="propermno-prefix" id="promno-prefix-'+count+'">'+localStorage.getItem("MyRequest_PhoneCode-prefix")+'</span> </div><p></p> <div class="parsley-row"  id="inputTitleContent-' + count + '"> <label for="inputTitle">' + getTitle + '</label>  <select id="inputTitle-' + count + '" name="inputTitle" required class="md-input inputTitle"><option value="0">Select Title</option><option value="Mr.">Mr.</option><option value="Mrs.">Mrs.</option><option value="Ms.">Ms.</option><option value="Miss.">Miss.</option> </select></div> <p></p> <div class="parsley-row"> <label for="inputName">' + getFirstName + '<span class="req">*</span></label> <input type="text" id="inputName-' + count + '" name="inputName" required class="md-input inputName" />  </div> <p></p><div class="parsley-row"> <label for="inputLastName">' + getLastName + '<span class="req">*</span></label> <input type="text" id="inputLastName-' + count + '" name="inputLastName" required class="md-input inputLastName" /> </div><p></p> <div class="parsley-row"  id="inputEmailContent-' + count + '"> <label for=  "inputEmail">' + getEmail + '<span class="req">*</span></label> <input type="text" id="inputEmail-' + count + '"  name="inputEmail" required class="md-input inputEmail" /></div>  <p></p> <div class="uk-grid">  <div class="uk-width-medium-1-2"> <div class="parsley-row"> <label for="inputStartDate">Tenancy Start<span class="req">*</span></label> <input type="text" id="inputStartDate-' + count + '" name="inputStartDate" required class="md-input inputStartDate" data-uk-datepicker="{format:"DD.MM.YYYY"}" />  </div> </div>  <br/>  <div class="uk-width-medium-1-2">  <div class="parsley-row"> <label for="inputEndDate">Tenancy End<span class="req">*</span></label> <input type="text" id="inputEndDate-' + count + '" name="inputEndDate" required class="md-input inputEndDate" data-uk-datepicker="{format:"DD.MM.YYYY"}" />  </div> </div> </div> <p></p> <div class="parsley-row"> <div class="uk-grid">  <div class="uk-width-medium-1-3"> <div class="tenantLead">  <span class="icheck-inline" style="margin-top:20px;">  <input type="checkbox" data-switchery data-switchery-color="#ffb300" class="isLeadTenant"  id="isLeadTenant-' + count + '" /> <label for="user_edit_active" class="inline-label" style="font-size:13px; padding-left:0px;">Lead Tenant</label> </span>  </div> </div>       <div class="uk-width-medium-2-3">        <div class="uk-grid" style="margin-top:20px;">        <div class="uk-width-medium-1-4">    <img  id="isElectricityImg-' + count + '" src="assets/img/PropertyImg/electricity.png" style="width:70%; height:100%">    </div>  <div class="uk-width-medium-1-4">    <img   id="isGasImg-' + count + '" src="assets/img/PropertyImg/gas.png" style="width:70%; height:100%">    </div>   <div class="uk-width-medium-1-4">    <img  id="isWaterImg-' + count + '" src="assets/img/PropertyImg/water.png" style="width:70%; height:100%"> </div><div class="uk-width-medium-1-4">  <img id="isCouncilImg-' + count + '" src="assets/img/PropertyImg/council.png" style="width:70%; height:100%"></div></div>       </div><div class="uk-grid"> <div class="uk-width-1-1">  <button type="submit" class="md-btn md-btn-primary btnAddUserTenant" id="btnAddUserTenant-' + count + '" style="float: right;font-size: 12px;margin: -5px 0px 0px 0px;display:none;">+ Tenant</button> <button type="submit" class="md-btn md-btn-danger btnRemoveUserTenant" id="btnRemoveUserTenant-' + count + '" style="float: right;font-size: 12px;margin: -5px 0px 0px 0px;display:none;">- Tenant</button>  <span id="getErrorMsg-' + count + '" style="color:red;"></span> </div>  </div> </div> </div></div> <input type="hidden" id="hiddenUserRegID-' + count + '" value="0" /> <input type="hidden" id="hiddenAddPropertyID-' + count + '" value="0" />   <input type="hidden" id="hiddenIsElectricity-' + count + '" value="0" /> <input type="hidden" id="hiddenIsGas-' + count + '" value="0" /> <input type="hidden" id="hiddenIsWater-' + count + '" value="0" /> <input type="hidden" id="hiddenIsCouncil-' + count + '" value="0" /> <input type="hidden" id="hiddenAvailTenantInsurance-' + count + '" value="0" /> <input type="hidden" id="hiddenAddress-' + count + '" value="0" />  <input type="hidden" id="hiddenElectricSupplier1-' + count + '" value="0" /> <input type="hidden" id="hiddenElectricSupplier2-' + count + '" value="0" /> <input type="hidden" id="hiddenFuelType-' + count + '" value="0" /> <input type="hidden" id="hiddenGasMeterRead-' + count + '" value="0" /> <input type="hidden" id="hiddenSupplierElectric-' + count + '" value="0" /> <input type="hidden" id="hiddenSupplierGas-' + count + '" value="0" /> <input type="hidden" id="hiddenTenancyStart-' + count + '" value="0" /> <input type="hidden" id="hiddenTenancyEnd-' + count + '" value="0" /> <input type="hidden" id="hiddenWaterMeterRead-' + count + '" value="0" /> <input type="hidden" id="hiddenIsNewTenantUpdate-' + count + '" value="0" /> <input type="hidden" id="hiddenNewPropertyTenant-' + count + '" value="false" />  <input type="hidden" id="hiddenIsMailSent-' + count + '" value="false" />');


    $("#inputMobile-" + count).keypress(function(e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });


    $("#inputTitle-" + count).select2();


    $(".isLeadTenant").off('click').on('click', function(event) {
        var getCountValue = this.id.replace("isLeadTenant-", "");
        var localTenantData = localStorage.getItem('MyRequestTenantsData');
        if (localTenantData != null) {
            var getLocalTenantData = JSON.parse(localStorage.getItem('MyRequestTenantsData'));
            var userID = $("#hiddenUserRegID-"+getCountValue).val();
            for (getData in getLocalTenantData) {
                if($("#isLeadTenant-"+getCountValue).prop('checked')){
                    if(getLocalTenantData[getData].UserRegID==userID){
                        getLocalTenantData[getData].IsLeadTenant = "1"; 
                    }
                } else{
                    if(getLocalTenantData[getData].UserRegID==userID){
                        getLocalTenantData[getData].IsLeadTenant = "0"; 
                    }
                }
            }
            localStorage.setItem('MyRequestTenantsData', JSON.stringify(getLocalTenantData));
        }
    });

    $(".closeCard").off('click').on('click', function(event) {
        console.log('call close');
        var getCountValue = this.id.replace("closeCard-", "");
        UIkit.modal.confirm('Are you sure to remove ?', function() {
            $("#getIsAppInstallCheck-" + getCountValue).remove();

            var localTenantData = localStorage.getItem('MyRequestTenantsData');
            if (localTenantData != null) {
                var getLocalTenantData = JSON.parse(localStorage.getItem('MyRequestTenantsData'));
                newArr = [];
                $.each(getLocalTenantData, function(index, value) {
                    if (value.Count != getCountValue) {
                        newArr.push(getLocalTenantData[index]);
                    }
                });
                localStorage.setItem('MyRequestTenantsData', JSON.stringify(newArr));
                getLocalTenantData = JSON.parse(localStorage.getItem('MyRequestTenantsData'));
            }
            count--;
            if(count==1){
                $("#inputHMONoOfTenent").val(count);
                $("#singleHmo").iCheck('check');
                $("#multipleHmo").iCheck('uncheck');
                $(".hmoInputTenent").hide('slow');
                $(".hmoLicenseNumber").hide();
                var hiddenPropertyID = $("#hiddenPropertyID").val();
                if (hiddenPropertyID == 0) {
                    $("#btnAddUserTenant-" + count).hide();
                } else {
                    $("#btnAddUserTenant-" + count).show();
                }
            }
            
        });

    });

    $(".inputMobile").focus(function() {
        var getCountValue = this.id.replace("inputMobile-", "");
        var getMobileNumber = $("#inputMobile-" + getCountValue).val();
        // if (getMobileNumber == "") {} else {
        //     $.get(domainAddress + "SearchUserIsAppInstalled/" + getMobileNumber, function(result) {
        //         if (result.record_count == 0) {
        //             fetchIsAppInstalled = 0;
        //              $("#getIsAppInstallCheck-" + getCountValue).css("border", "1px solid red");
        //         } else {
        //             for (var getTenant in result.records) {

        //                 fetchIsAppInstalled = result.records[getTenant].AppInstalled;
        //                 if (result.records[getTenant].AppInstalled == 1) {
        //                     $("#getIsAppInstallCheck-" + getCountValue).css("border", "1px solid greenyellow");
        //                 } else {
        //                     $("#getIsAppInstallCheck-" + getCountValue).css("border", "1px solid red");
        //                 }

        //             }
        //         }
        //     });

        // }
    });


    $(".inputEmail").focus(function() {
        var getCountValue = this.id.replace("inputEmail-", "");
        var getEmail = $("#inputEmail-" + getCountValue).val();
        if (getEmail == "") {
            $("#getErrorMsg-" + getCountValue).css('color', 'red');
            $("#getErrorMsg-" + getCountValue).show();
            $("#getErrorMsg-" + getCountValue).text("* Enter the Email ID.");
            $("#btnAddUserTenant-" + getCountValue).attr("disabled", true);
            return false;
        } else if (!isValidEmailAddress(getEmail)) {
            $("#getErrorMsg-" + getCountValue).css('color', 'red');
            $("#getErrorMsg-" + getCountValue).show();
            $("#getErrorMsg-" + getCountValue).text("* Please Enter the Proper Email ID.");
            $("#btnAddUserTenant-" + getCountValue).attr("disabled", true);
            return false;
        } else {
            $("#getErrorMsg-" + getCountValue).hide();
            $("#getErrorMsg-" + getCountValue).text("");
            $("#btnAddUserTenant-" + getCountValue).attr("disabled", false);
        }
    });

    $(".inputEmail").keyup(function() {
        var getCountValue = this.id.replace("inputEmail-", "");
        var getEmail = $("#inputEmail-" + getCountValue).val();
        if (getEmail == "") {
            $("#getErrorMsg-" + getCountValue).css('color', 'red');
            $("#getErrorMsg-" + getCountValue).show();
            $("#getErrorMsg-" + getCountValue).text("* Enter the Email ID.");
            $("#btnAddUserTenant-" + getCountValue).attr("disabled", true);
            return false;
        } else if (!isValidEmailAddress(getEmail)) {
            $("#getErrorMsg-" + getCountValue).css('color', 'red');
            $("#getErrorMsg-" + getCountValue).show();
            $("#getErrorMsg-" + getCountValue).text("* Please Enter the Proper Email ID.");
            $("#btnAddUserTenant-" + getCountValue).attr("disabled", true);
            return false;
        } else {
            $("#getErrorMsg-" + getCountValue).hide();
            $("#getErrorMsg-" + getCountValue).text("");
            $("#btnAddUserTenant-" + getCountValue).attr("disabled", false);
            $(".getTenantsInfo").css("color","#444");
            $(".btnSubmitProperty").attr("disabled",false);
            $(".errorInfo").hide();
            $(".errorInfo").text('');
        }
    });

    $(".inputEmail").on('blur', function(e) {
        var getCountValue = this.id.replace("inputEmail-", "");
        var getEmail = $("#inputEmail-" + getCountValue).val();
        if (getEmail == "") {
            $("#getErrorMsg-" + getCountValue).css('color', 'red');
            $("#getErrorMsg-" + getCountValue).show();
            $("#getErrorMsg-" + getCountValue).text("* Enter the Email ID.");
            $("#inputEmail-" + getCountValue).css("border-color", "red");
            $(".errorInfo").show();
            $(".errorInfo").text("* Enter Tenants EmailID");
            $("#btnAddUserTenant-" + getCountValue).attr("disabled", true);
            return false;
        } else if (!isValidEmailAddress(getEmail)) {
            $("#getErrorMsg-" + getCountValue).css('color', 'red');
            $("#getErrorMsg-" + getCountValue).show();
            $("#getErrorMsg-" + getCountValue).text("* Please Enter the Proper Email ID.");
            $("#btnAddUserTenant-" + getCountValue).attr("disabled", true);
            return false;
        } else {
            $("#inputEmail-" + getCountValue).css("border-color", "rgba(0, 0, 0, 0.12)");
            $(".errorInfo").hide();
            $(".errorInfo").text("");
            $("#btnAddUserTenant-" + getCountValue).attr("disabled", false);
            var getLocalTenantData = JSON.parse(localStorage.getItem('MyRequestTenantsData'));
            for (getData in getLocalTenantData) {
                if(getLocalTenantData[getData].Count == getCountValue){
                        getLocalTenantData[getData].Email = getEmail; 
                }
            }
            localStorage.setItem('MyRequestTenantsData', JSON.stringify(getLocalTenantData));
        }
    });
 

    $(".inputName").keyup(function() {
        var getCountValue = this.id.replace("inputName-", "");
        var inputName = $("#inputName-" + getCountValue).val();
        if (inputName == "") {
            $("#getErrorMsg-" + getCountValue).css('color', 'red');
            $("#getErrorMsg-" + getCountValue).show();
            $("#getErrorMsg-" + getCountValue).text("* Enter the Name.");
            $("#btnAddUserTenant-" + getCountValue).attr("disabled", true);
            return false;
        } else {
            $("#getErrorMsg-" + getCountValue).hide();
            $("#getErrorMsg-" + getCountValue).text("");
            $("#btnAddUserTenant-" + getCountValue).attr("disabled", false);
            $(".getTenantsInfo").css("color","#444");
            $(".btnSubmitProperty").attr("disabled",false);
            $(".errorInfo").hide();
            $(".errorInfo").text('');
        }
        fetchIsAppInstalled = 0;
        $("#getIsAppInstallCheck-" + getCountValue).css("border", "1px solid  #FFFFFF");
    });

    $(".inputName").on('blur', function(e) {
        var getCountValue = this.id.replace("inputName-", "");
        var inputName = $("#inputName-" + getCountValue).val();
        if (inputName == "") {
            $("#getErrorMsg-" + getCountValue).css('color', 'red');
            $("#getErrorMsg-" + getCountValue).show();
            $("#inputName-" + getCountValue).css("border-color", "red");
            $("#getErrorMsg-" + getCountValue).text("* Enter the Name.");
            $("#btnAddUserTenant-" + getCountValue).attr("disabled", true);
            return false;
        } else {
            $("#getErrorMsg-" + getCountValue).hide();
            $("#getErrorMsg-" + getCountValue).text("");
            $("#inputName-" + getCountValue).css("border-color", "rgba(0, 0, 0, 0.12)");
            $("#btnAddUserTenant-" + getCountValue).attr("disabled", false);
            var getLocalTenantData = JSON.parse(localStorage.getItem('MyRequestTenantsData'));
            for (getData in getLocalTenantData) {
                if(getLocalTenantData[getData].Count == getCountValue){
                        getLocalTenantData[getData].Name = inputName; 
                }
            }
            localStorage.setItem('MyRequestTenantsData', JSON.stringify(getLocalTenantData));
        }
    });

    $(".inputLastName").on('blur', function(e) {
        var getCountValue = this.id.replace("inputLastName-", "");
        var inputLastName = $("#inputLastName-" + getCountValue).val();
        if (inputLastName == "") {
            $("#getErrorMsg-" + getCountValue).css('color', 'red');
            $("#inputLastName-" + getCountValue).css("border-color", "red");
            $("#getErrorMsg-" + getCountValue).show();
            $("#getErrorMsg-" + getCountValue).text("* Enter the Last Name.");
            $("#btnAddUserTenant-" + getCountValue).attr("disabled", true);
            return false;
         } else {
            $("#getErrorMsg-" + getCountValue).hide();
            $("#getErrorMsg-" + getCountValue).text("");
            $(".errorInfo").hide();
            $(".errorInfo").text("");
            $("#inputLastName-" + getCountValue).css("border-color", "rgba(0, 0, 0, 0.12)");
            $("#btnAddUserTenant-" + getCountValue).attr("disabled", false);
            var getLocalTenantData = JSON.parse(localStorage.getItem('MyRequestTenantsData'));
            for (getData in getLocalTenantData) {
                if(getLocalTenantData[getData].Count == getCountValue){
                        getLocalTenantData[getData].LastName = inputLastName; 
                }
            }
            localStorage.setItem('MyRequestTenantsData', JSON.stringify(getLocalTenantData));
        }
    });
    
    $(".inputTitle").on('change', function() {
        var getCountValue = this.id.replace("inputTitle-", "");
        var inputTitle = $("#inputTitle-" + getCountValue).val();
        if (inputTitle == "Select Title") {
            $(".errorInfo").show();
            $(".errorInfo").text("* Select Title");
            $("#select2-inputTitle-"+getCountValue+"-container").css("border", "1px solid red");
            $(".btnSubmitProperty").attr("disabled", true);
            return false;
        } else {
            $(".errorInfo").hide();
            $(".errorInfo").text("");
            $("#select2-inputTitle-"+getCountValue+"-container").css("border", "none");
            $(".btnSubmitProperty").attr("disabled", false);
            var getLocalTenantData = JSON.parse(localStorage.getItem('MyRequestTenantsData'));
            for (getData in getLocalTenantData) {
                if(getLocalTenantData[getData].Count == getCountValue){
                        getLocalTenantData[getData].TitleName = inputTitle; 
                }
            }
            localStorage.setItem('MyRequestTenantsData', JSON.stringify(getLocalTenantData));
        }
    });

    $(".inputStartDate").on('change', function() {
        var getCountValue = this.id.replace("inputStartDate-", "");
        var inputStartDate = $("#inputStartDate-" + getCountValue).val();
        if(inputStartDate == ""){
            $("#getErrorMsg-" + getCountValue).css('color', 'red');
            $("#getErrorMsg-" + getCountValue).show();
            $("#getErrorMsg-" + getCountValue).text("* Select the Tenancy Start");
            $("#btnAddUserTenant-" + getCountValue).attr("disabled", true);
        } else {
            $("#getErrorMsg-" + getCountValue).hide();
            $("#getErrorMsg-" + getCountValue).text("");
            $("#btnAddUserTenant-" + getCountValue).attr("disabled", false);
        }
    });

    $(".inputEndDate").on('change', function() {
        var getCountValue = this.id.replace("inputEndDate-", "");
        var inputStartDate = $("#inputStartDate-" + getCountValue).val();
        var inputEndDate = $("#inputEndDate-" + getCountValue).val();
        var getBtnCount = $(".btnSubmitTenantInsurance").attr("value");
        var hiddenIsElectricity = $("#hiddenIsElectricity-" + getBtnCount).val();
        var hiddenIsGas = $("#hiddenIsGas-" + getBtnCount).val();
        var hiddenIsWater = $("#hiddenIsWater-" + getBtnCount).val();
        var hiddenIsCouncil = $("#hiddenIsCouncil-" + getBtnCount).val();
        if (inputStartDate == "") {
            $("#getErrorMsg-" + getCountValue).css('color', 'red');
            $("#getErrorMsg-" + getCountValue).show();
            $("#getErrorMsg-" + getCountValue).text("* Select the Tenancy Start");
            $("#btnAddUserTenant-" + getCountValue).attr("disabled", true);
            return false;
        } else {
            var getDate = inputStartDate.split(".");
            var setStartDate = getDate[2]+","+getDate[1]+","+getDate[0];
            var getEDate = inputEndDate.split(".");
            var setEndDate = getEDate[2]+","+getEDate[1]+","+getEDate[0];
            
            var firstDate = new Date(setEndDate);
            var secondDate = new Date(setStartDate);

            var checkEndDateValue = firstDate < secondDate;

            if(checkEndDateValue){
                UIkit.modal.alert("Tenancy End should not be less then Tenancy Start");
            }
            else{
                $(".isShowServices").show();
                $(".availServiceTitle").text('Do you want to avail these services?');
                $("#getErrorMsg-" + getCountValue).hide();
                $("#getErrorMsg-" + getCountValue).text("");
                $("#btnAddUserTenant-" + getCountValue).attr("disabled", false);
                $(".getTenantsInfo").css("color","#444");
                $(".btnSubmitProperty").attr("disabled",false);
                $(".errorInfo").hide();
                $(".errorInfo").text('');
                var userRegID = $("#hiddenUserRegID-" + getCountValue).val();
                var newPropertyTenant = $("#hiddenNewPropertyTenant-" + getCountValue).val();
                $(".btnSubmitTenantInsurance").attr("value", getCountValue);
                
                var modal = UIkit.modal("#modalTenantInsurance");
                modal.show();

                var specialElect = document.querySelector('#getElect')
                specialElect.checked = true;
                var specialGas = document.querySelector('#getGas')
                specialGas.checked = true;
                var specialWater = document.querySelector('#getWater')
                specialWater.checked = true;
                var specialCouncil = document.querySelector('#getCouncil')
                specialCouncil.checked = true;
                var availTenantInsurance = document.querySelector('#getAvailTenantInsurance')
                availTenantInsurance.checked = true;
                var event = document.createEvent('HTMLEvents');
                event.initEvent('change', true, true);
                specialElect.dispatchEvent(event);
                specialGas.dispatchEvent(event);
                specialWater.dispatchEvent(event);
                specialCouncil.dispatchEvent(event);
                availTenantInsurance.dispatchEvent(event);

                var localTenantData = localStorage.getItem('MyRequestTenantsData');
                if (localTenantData != null) {
                    var getLocalTenantData = JSON.parse(localStorage.getItem('MyRequestTenantsData'));
                    $(".isElectricity").show();
                    $(".isGas").show();
                    $(".isWater").show();
                    $(".isCouncil").show();
                    var isHide=0;
                    var isElectricity=0;
                    var isGas=0;
                    var isWater=0;
                    var isCouncil=0;
                    for (getData in getLocalTenantData) {
                        if(getLocalTenantData[getData].Count != getCountValue){
                            if(getLocalTenantData[getData].IsElectricity == 1){
                                $(".isElectricity").hide();
                                isElectricity=1;
                                $("#getElect").prop("checked",false);
                            }

                            if(getLocalTenantData[getData].IsGas == 1){
                                $(".isGas").hide();
                                isGas=1;
                                $("#getGas").prop("checked",false);
                            }

                            if(getLocalTenantData[getData].IsWater == 1){
                                $(".isWater").hide();
                                isWater=1;
                                $("#getWater").prop("checked",false);
                            }

                            if(getLocalTenantData[getData].IsCouncil == 1){
                                $(".isCouncil").hide();
                                isCouncil=1;
                                $("#getCouncil").prop("checked",false);
                            }
                        } 

                        if(isElectricity==1 && isGas==1 && isWater==1 && isCouncil==1){
                            $(".isShowServices").hide();
                            $(".availServiceTitle").text('Do you want to avail service?');
                        } 
                    } // getLocalTenantData
                } //localTenantData

            } // else checkEndDateValue
        } // else inputStartDate check
    }); // $(".inputEndDate")


    $(".inputMobile").keyup(function() {
        var getCountValue = this.id.replace("inputMobile-", "");
        var getMobileNumber = $("#inputMobile-" + getCountValue).val();
        if (getMobileNumber == "") {
            $("#promno-prefix-"+getCountValue).hide();
            $("#inputMobile-" + getCountValue).removeAttr('style');
            $("#getErrorMsg-" + getCountValue).css('color', 'red');
            $("#getErrorMsg-" + getCountValue).show();
            $("#getErrorMsg-" + getCountValue).text("* Enter the Mobile Number.");
            $("#btnAddUserTenant-" + getCountValue).attr("disabled", true);
            $("#inputEmailContent-" + getCountValue).css('margin-top', '0px');
            return false;
        } else {

            $("#promno-prefix-"+getCountValue).show();
            $("#inputMobile-" + getCountValue).css("padding", "10px 25px 12px 33px");
            $("#getErrorMsg-" + getCountValue).hide();
            $("#getErrorMsg-" + getCountValue).text("");
            $("#inputEmailContent-" + getCountValue).css('margin-top', '1px');
            $("#btnAddUserTenant-" + getCountValue).attr("disabled", false);
            $(".errorInfo").hide();
            $(".errorInfo").text('');
            $(".getTenantsInfo").css("color","#444");
            $(".btnSubmitProperty").attr("disabled",false);
        }
        fetchIsAppInstalled = 0;
        $("#getIsAppInstallCheck-" + getCountValue).css("border", "1px solid  #FFFFFF");
    });

    $(".inputMobile").on('blur', function(e) {
        var getMobileNumber = $("#" + this.id).val();
        var getCountValue = this.id.replace("inputMobile-", "");
        if (getMobileNumber == "") {
            $("#getErrorMsg-" + getCountValue).show();
            $("#getErrorMsg-" + getCountValue).css('color', 'red');
            $("#getErrorMsg-" + getCountValue).text("* Enter Tenant's Mobile Number");
            $("#inputMobile-" + getCountValue).css("border-color", "red");
            $(".btnSubmitProperty").attr("disabled", true);
            return false;
        } else {
            $("#getErrorMsg-" + getCountValue).hide();
            $("#getErrorMsg-" + getCountValue).text("");
            $("#inputMobile-" + getCountValue).css("border-color", "rgba(0, 0, 0, 0.12)");
            $(".btnSubmitProperty").attr("disabled", false);
            var inputMobile = $("#inputMobile-" + getCountValue).val();
            var blurName = $("#inputName-" + getCountValue).val();
            var blurLastName = $("#inputLastName-" + getCountValue).val();
            var blurTitle = $("#inputTitle-" + getCountValue).val();
            var blurEmail = $("#inputEmail-" + getCountValue).val();
            var blurStartDate = $("#inputStartDate-" + getCountValue).val();
            var blurEndDate = $("#inputEndDate-" + getCountValue).val();
            var hiddenPropertyID = $("#hiddenPropertyID").val();
            if(blurName=="" && blurLastName=="" && blurTitle==0 && blurEmail=="" && blurStartDate=="" && blurEndDate==""){
                if(getMobileNumber!="" && hiddenPropertyID!=0){
                    existTenantCheck(getMobileNumber,getcountryCode,getCountValue,hiddenPropertyID);
                }
            }
            var getLocalTenantData = JSON.parse(localStorage.getItem('MyRequestTenantsData'));
                for (getData in getLocalTenantData) {
                    if(getLocalTenantData[getData].Count == getCountValue){
                            getLocalTenantData[getData].Mobile = inputMobile; 
                    }
                }
            localStorage.setItem('MyRequestTenantsData', JSON.stringify(getLocalTenantData));
        }
    });


    function existTenantCheck(getMobileNumber,getcountryCode,getCountValue,hiddenPropertyID){
        // console.log(domainAddress + "GetExistTenantForProperty/" + getMobileNumber +"/"+hiddenPropertyID +"/"+getcountryCode);
        // console.log(domainAddress + "GetUserDetailsValue/" + getMobileNumber + "/"+getcountryCode);
        $.get(domainAddress + "GetExistTenantForProperty/" + getMobileNumber +"/"+hiddenPropertyID +"/"+getcountryCode, function(result) {
                if (result.record_count == 0) { 
                    $.get(domainAddress + "GetUserDetailsValue/" + getMobileNumber + "/"+getcountryCode, function(result) {
                        if (result.record_count == 0) {
                            // no tenants found
                        } else {
                            for (var getUserDetails in result.records) {
                                $("#promno-prefix-"+getCountValue).show();
                                $("#inputMobile-" + getCountValue).css("padding", "10px 25px 14px 33px");
                                $("#inputName-" + getCountValue).val(result.records[getUserDetails].Name);
                                $("#inputLastName-" + getCountValue).val(result.records[getUserDetails].LastName);
                                $("#inputTitle-" + getCountValue).val(result.records[getUserDetails].Title);
                                $("#select2-inputTitle-container-" + getCountValue).html(result.records[getUserDetails].Title);
                                $("#inputEmail-" + getCountValue).val(result.records[getUserDetails].EmailID);
                                $("#inputStartDate-" + getCountValue).val(result.records[getUserDetails].TenancyStart);
                                $("#inputEndDate-" + getCountValue).val(result.records[getUserDetails].TenancyEnd);
                            }
                        }
                    });
                } else {
                    // UIkit.modal.alert(result.message_text+" for Mobile Number: +44"+getMobileNumber);
                    UIkit.modal.alert(result.message_text);
                    $("#promno-prefix-"+getCountValue).hide();
                    $("#inputMobile-" + getCountValue).removeAttr('style');
                    $("#inputMobile-"+getCountValue).val('');
                    $("#inputName-" + getCountValue).val('');
                    $("#inputLastName-" + getCountValue).val('');
                    $("#inputTitle-" + getCountValue).val(0);
                    $("#select2-inputTitle-container-" + getCountValue).html('Select Title');
                    $("#inputEmail-" + getCountValue).val('');
                    $("#inputStartDate-" + getCountValue).val('');
                    $("#inputEndDate-" + getCountValue).val('');
                }
            }); // GetExistTenantForProperty
    } // existTenantCheck

    $(".btnAddUserTenant").on('click', function() {
        var hiddenPropertyID = $("#hiddenPropertyID").val();
        var inputPropertyAddress = $("#inputAddress").val().replace(/["']/g, "`");
        var getCountValue = this.id.replace("btnAddUserTenant-", "");
        var inputName = $("#inputName-" + getCountValue).val();
        var inputTitle = $("#inputTitle-" + getCountValue).val();
        var inputLastName = $("#inputLastName-" + getCountValue).val();
        var isLeadTenantval = $("#isLeadTenant-" + getCountValue).val();    
        // alert(isLeadTenantval);
        var isLeadTenant = "";
        if($("#isLeadTenant-" + getCountValue).is(":checked")){
            isLeadTenant = 1;
        } else {
            isLeadTenant = 0;
        }
        var inputEmail = $("#inputEmail-" + getCountValue).val();
        var inputMobile = getPhoneCode+ $("#inputMobile-" + getCountValue).val();
        var inputStartDate = $("#inputStartDate-"+getCountValue).val();
        var inputEndDate = $("#inputEndDate-"+getCountValue).val();
        var appInstalled = fetchIsAppInstalled;
        $("#hiddenIsNewTenantUpdate-" + getCountValue).val(1);
        adminUserID = localStorage.getItem("MyRequest_AdminID");
        fetchIsAppInstalled = 0;
        $("#getIsAppInstallCheck-" + getCountValue).css("border", "1px solid  #FFFFFF");
        if (hiddenPropertyID == 0) {
            UIkit.modal.confirm('Property is not added for this tenant. Are you sure ?', function() {
            });
        } else {
            if (inputMobile == "+44" || inputMobile == "+91" || inputMobile == "+1") {
                $("#getErrorMsg-" + getCountValue).show();
                $("#getErrorMsg-" + getCountValue).text("* Enter the Mobile Number");
                $("#btnAddUserTenant-" + getCountValue).attr("disabled", true);
                return false;
            }

            if (inputEmail == "") {
                $("#getErrorMsg-" + getCountValue).show();
                $("#getErrorMsg-" + getCountValue).text("* Enter the Email");
                $("#btnAddUserTenant-" + getCountValue).attr("disabled", true);
                return false;
            }

            if (inputName == "") {
                $("#getErrorMsg-" + getCountValue).show();
                $("#getErrorMsg-" + getCountValue).text("* Enter the Name");
                $("#btnAddUserTenant-" + getCountValue).attr("disabled", true);
                return false;
            } 

            if (inputStartDate == "") {
                $("#getErrorMsg-" + getCountValue).show();
                $("#getErrorMsg-" + getCountValue).text("* Select the Tenancy Start");
                $("#btnAddUserTenant-" + getCountValue).attr("disabled", true);
                return false;
            }

            if (inputEndDate == "") {
                $("#getErrorMsg-" + getCountValue).show();
                $("#getErrorMsg-" + getCountValue).text("* Select the Tenancy End");
                $("#btnAddUserTenant-" + getCountValue).attr("disabled", true);
                return false;
            }  
            else {
                var getStartDate = inputStartDate.split(".");
                var finalStartDate = getStartDate[2]+"-"+getStartDate[1]+"-"+getStartDate[0];

                var getEndDate = inputEndDate.split(".");
                var finalEndDate = getEndDate[2]+"-"+getEndDate[1]+"-"+getEndDate[0];
                var hiddenIsElectricity = $("#hiddenIsElectricity-"+getCountValue).val();
                var hiddenIsGas = $("#hiddenIsGas-"+getCountValue).val();
                var hiddenIsWater = $("#hiddenIsWater-"+getCountValue).val();
                var hiddenIsCouncil = $("#hiddenIsCouncil-"+getCountValue).val();
                var hiddenAvailTenantInsurance = $("#hiddenAvailTenantInsurance-"+getCountValue).val();

                var dataAddPropertyForm = "{'Property_RegisterID':'" + hiddenPropertyID + "','AdminID':'" + adminUserID + "','PropertyAddress':'"+inputPropertyAddress+"','IsElectricity':'"+hiddenIsElectricity+"','IsGas':'"+hiddenIsGas+"','IsWater':'"+hiddenIsWater+"','IsCouncil':'"+hiddenIsCouncil+"','IsAvailTenantInsurance':'"+hiddenAvailTenantInsurance+"'}";
                var dataForm = '{"Title":"' + inputTitle + '","Name":"' + inputName + '","LastName":"' + inputLastName + '","MobileNumber":"' + inputMobile + '","Email":"' + inputEmail + '","UserImage":"","IsAppInstalled":"' + appInstalled + '","AdminID":"' + adminUserID + '","LettingAgencyCode":"' + agencyCode + '","IsLeadTenant":"' + isLeadTenant + '","StartDate":"'+finalStartDate+'","EndDate":"'+finalEndDate+'", "Country":"'+ getcountryCode +'","AddProperty":"' + dataAddPropertyForm + '"}';
                console.log(dataForm);
                var sendURL = domainAddress + 'CreateUserTenant';
                console.log(sendURL);
                $("#getLoadingModalContent").addClass('md-show');
                $.ajax({
                    type: "POST",
                    url: sendURL,
                    data: dataForm,
                    success: function(dataCheck) {
                        console.log(dataCheck);
                        $("#getLoadingModalContent").removeClass('md-show');
                        $("#hiddenUserRegID-" + getCountValue).val(dataCheck.TenantID);
                        $("#hiddenAddPropertyID-" + getCountValue).val(dataCheck.AddPropertyID);
                        $("#getIsAppInstallCheck-" + getCountValue).css("border", "1px solid red");
                        $("#btnAddUserTenant-" + getCountValue).hide();
                        $("#btnRemoveUserTenant-" + getCountValue).show();
                        fetchIsAppInstalled = 0;
                        getPropertyInfo(hiddenPropertyID);
                        UIkit.modal.alert(dataCheck.message_text);

                    }
                });
            }
        }

    });

    $(".btnRemoveUserTenant").off('click').on('click', function(event) {
        var RemoveTenantCount = "1";
        $("#hiddenRemoveTenantCount").val(RemoveTenantCount);
        var getCountValue = this.id.replace("btnRemoveUserTenant-", "");
        var hiddenAddPropertyID = $("#hiddenAddPropertyID-" + getCountValue).val();
        var hiddenPropertyID = $("#hiddenPropertyID").val();
        var hiddenUserRegID = $("#hiddenUserRegID-" + getCountValue).val();
        var inputMobile = getPhoneCode+$("#inputMobile-" + getCountValue).val();
        var inputEmail = $("#inputEmail-" + getCountValue).val();
        var inputName = $("#inputName-" + getCountValue).val();
        var hiddenAddress = $("#hiddenAddress-" + getCountValue).val();
        var hiddenElectricSupplier1 = $("#hiddenElectricSupplier1-" + getCountValue).val();
        var hiddenElectricSupplier2 = $("#hiddenElectricSupplier2-" + getCountValue).val();
        var hiddenFuelType = $("#hiddenFuelType-" + getCountValue).val();
        var hiddenGasMeterRead = $("#hiddenGasMeterRead-" + getCountValue).val();
        var hiddenSupplierElectric = $("#hiddenSupplierElectric-" + getCountValue).val();
        var hiddenSupplierGas = $("#hiddenSupplierGas-" + getCountValue).val();
        var hiddenTenancyStart = $("#hiddenTenancyStart-" + getCountValue).val();
        var hiddenTenancyEnd = $("#hiddenTenancyEnd-" + getCountValue).val();
        var hiddenWaterMeterRead = $("#hiddenWaterMeterRead-" + getCountValue).val();
        var hiddenIsGas = $("#hiddenIsGas-" + getCountValue).val();
        var hiddenIsElectricity = $("#hiddenIsElectricity-" + getCountValue).val();
        var hiddenIsWater = $("#hiddenIsWater-" + getCountValue).val();
        var hiddenIsCouncil = $("#hiddenIsCouncil-" + getCountValue).val();
        var hiddenAvailTenantInsurance = $("#hiddenAvailTenantInsurance-" + getCountValue).val();
        $(".utilityIcon").hide();
        $(".utilityIconLabel").hide();
        var getDate = new Date();
        var currentdate = moment(getDate).format('YYYY-MM-DD HH:mm:ss');
        var adminUserID = localStorage.getItem("MyRequest_AdminID");
         
        UIkit.modal.confirm('Are you sure to remove and move-out Tenant ?', function() {
            var dataForm = '{"AddPropertyID":"' + hiddenAddPropertyID + '","PropertyID":"' + hiddenPropertyID + '","UserID":"' + hiddenUserRegID + '","MobileNumber":"' + inputMobile + '","EmailID":"' + inputEmail + '","Name":"' + inputName + '","Address":"' + hiddenAddress + '","ElectricSupplier1":"' + hiddenElectricSupplier1 + '","ElectricSupplier2":"' + hiddenElectricSupplier2 + '","FuelType":"' + hiddenFuelType + '","GasMeterRead":"' + hiddenGasMeterRead + '","SupplierElectric":"' + hiddenSupplierElectric + '","SupplierGas":"' + hiddenSupplierGas + '","TenancyStart":"' + hiddenTenancyStart + '","TenancyEnd":"' + hiddenTenancyEnd + '","WaterMeterRead":"' + hiddenWaterMeterRead + '","IsGas":"0","IsElectricity":"0","IsWater":"0","IsCouncil":"0","IsAvailTenantInsurance":"' + hiddenAvailTenantInsurance + '","UtilityRegType":"move-out","Status":"Updated","Date":"' + currentdate + '","AdminID":"' + adminUserID + '"}';
            console.log(dataForm);

            var sendURL = domainAddress + 'CreateUserUtilityMoveOut';
            console.log(sendURL);
            $("#getLoadingModalContent").addClass('md-show');
            $.ajax({
                type: "POST",
                url: sendURL,
                data: dataForm,
                success: function(dataCheck) {
                    console.log(dataCheck);
                    $("#getLoadingModalContent").removeClass('md-show');
                    UIkit.modal.alert('Tenant Move-Out Successfully from this property');
                    $("#getIsAppInstallCheck-" + getCountValue).remove();
                    var editPropertyID = $("#hiddenPropertyID").val();
                    getReloadUserTenants(editPropertyID);
                    var getNoOfTenantCount = $("#inputHMONoOfTenent").val();
                    var noOfTenants = getNoOfTenantCount - parseInt(1);
                    $("#inputHMONoOfTenent").val(noOfTenants);
                }
            });
        });

        

    }); // btnRemoveUserTenant
} // getAddTenant(count)


function getReloadUserTenants(editPropertyID){
    $(".getTenantList").html('');
    
    $.get(domainAddress + "GetPropertyRegister/" + editPropertyID, {}, function(resultGetProperty) {
        count = 0;
        for (var property in resultGetProperty.records) {

            for (var addProperty in resultGetProperty.records[property].UserReg) {
                count++;
                $(".newAdd").remove();
                getAddTenant(count);
                $("#hiddenNewPropertyTenant-" + count).val(true);
                $("#btnAddUserTenant-" + count).hide();
                $("#btnRemoveUserTenant-" + count).show();
                $("#hiddenUserRegID-" + count).val(resultGetProperty.records[property].UserReg[addProperty].UserID);
                $("#hiddenAddPropertyID-" + count).val(resultGetProperty.records[property].UserReg[addProperty].AddPropertyID);
                $("#inputName-" + count).val(resultGetProperty.records[property].UserReg[addProperty].Name);
                $("#inputLastName-" + count).val(resultGetProperty.records[property].UserReg[addProperty].LastName);
                $("#select2-inputTitle-" + count + "-container").html(resultGetProperty.records[property].UserReg[addProperty].TitleName);
                $("#inputEmail-" + count).val(resultGetProperty.records[property].UserReg[addProperty].EmailID);
                isFourExistNo = resultGetProperty.records[property].UserReg[addProperty].PhoneNumber.slice(0, 3);
                isOneExistNo = resultGetProperty.records[property].UserReg[addProperty].PhoneNumber.slice(0, 2);
                if (isFourExistNo == "+44" || isFourExistNo == "+91") {
                    $("#inputMobile-" + count).val(resultGetProperty.records[property].UserReg[addProperty].PhoneNumber.slice(3));
                }
                else if(isOneExistNo == "+1"){
                    $("#inputMobile-" + count).val(resultGetProperty.records[property].UserReg[addProperty].PhoneNumber.slice(2));
                } else {
                    $("#inputMobile-" + count).val(resultGetProperty.records[property].UserReg[addProperty].PhoneNumber);
                }
                $("#inputMobile-" + count).css("padding", "10px 25px 12px 33px");
                $("#promno-prefix-"+ count).show();
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
                  var MoveInStatus = resultGetProperty.records[property].UserReg[addProperty].TenantStatus;
                  $("#hiddenmoveinproperty").val(MoveInStatus);

                  if (resultGetProperty.records[property].UserReg[addProperty].IsLeadTenant == 1) {
                      $("#isLeadTenant-" + count).prop("checked", true);
                  } else {
                      $("#isLeadTenant-" + count).prop("checked", false);
                  }
            }

            for (var moveInTenant in resultGetProperty.records[property].UserRegMoveInCount) {
                var Moveincountval = resultGetProperty.records[property].UserRegMoveInCount[moveInTenant].Moveincount;
                $("#hiddenmoveincount").val(Moveincountval);
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
                                $("#hiddenmoveoutuserid").val(MoveOutUserID);
                                $("#hiddenmoveoutpropertyID").val(AddPropertyID);
                                $("#hiddenmoveoutproperty").val(MoveOutStatus);
                            }
                    }
                    //****** Tenant History Ends ******//

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

                $("#hiddenIsGas-" + utilityCount).val(resultGetProperty.records[property].Utility[getUtility].IsGas);
                $("#hiddenIsElectricity-" + utilityCount).val(resultGetProperty.records[property].Utility[getUtility].IsElectricity);
                $("#hiddenIsWater-" + utilityCount).val(resultGetProperty.records[property].Utility[getUtility].IsWater);
                $("#hiddenIsCouncil-" + utilityCount).val(resultGetProperty.records[property].Utility[getUtility].IsCouncil);
                $("#hiddenAvailTenantInsurance-" + utilityCount).val(resultGetProperty.records[property].Utility[getUtility].IsTenantInsurance);

                  if (utilityCount == 1 || $("#hiddenIsGas-" + utilityCount).val() == "true") {
                      $("#isElectricityImg-" + utilityCount).attr("src", "assets/img/PropertyImg/electricity.png");
                      $("#isWaterImg-" + utilityCount).attr("src", "assets/img/PropertyImg/water.png");
                      $("#isCouncilImg-" + utilityCount).attr("src", "assets/img/PropertyImg/council.png");

                  }

                  if (utilityCount == 1 || $("#hiddenIsWater-" + utilityCount).val() == "true") {
                      $("#isElectricityImg-" + utilityCount).attr("src", "assets/img/PropertyImg/electricity.png");
                      $("#isGasImg-" + utilityCount).attr("src", "assets/img/PropertyImg/gas.png");
                      $("#isCouncilImg-" + utilityCount).attr("src", "assets/img/PropertyImg/council.png");

                  }


                  
                  if (utilityCount == 1 || $("#hiddenIsElectricity-" + utilityCount).val() == "true") {
                      $("#isWaterImg-" + utilityCount).attr("src", "assets/img/PropertyImg/water.png");
                      $("#isGasImg-" + utilityCount).attr("src", "assets/img/PropertyImg/gas.png");
                      $("#isCouncilImg-" + utilityCount).attr("src", "assets/img/PropertyImg/council.png");

                  }



                  if (utilityCount == 1 || $("#hiddenIsCouncil-" + utilityCount).val() == "true") {
                      $("#isWaterImg-" + utilityCount).attr("src", "assets/img/PropertyImg/water.png");
                      $("#isGasImg-" + utilityCount).attr("src", "assets/img/PropertyImg/gas.png");
                      $("#isElectricityImg-" + utilityCount).attr("src", "assets/img/PropertyImg/electricity.png");

                  }

                if (resultGetProperty.records[property].Utility[getUtility].IsGas=="1" && resultGetProperty.records[property].Utility[getUtility].UtilityRegType=="move-in") {
                      $("#isGasImg-" + utilityCount).attr("src", "assets/img/PropertyImg/gas_select.png");
                }
                if (resultGetProperty.records[property].Utility[getUtility].IsElectricity=="1" && resultGetProperty.records[property].Utility[getUtility].UtilityRegType=="move-in"){
                      $("#isElectricityImg-" + utilityCount).attr("src", "assets/img/PropertyImg/electricity_select.png");
                }
                if (resultGetProperty.records[property].Utility[getUtility].IsWater=="1" && resultGetProperty.records[property].Utility[getUtility].UtilityRegType=="move-in"){
                      $("#isWaterImg-" + utilityCount).attr("src", "assets/img/PropertyImg/water_select.png");
                }
                if (resultGetProperty.records[property].Utility[getUtility].IsCouncil=="1" && resultGetProperty.records[property].Utility[getUtility].UtilityRegType=="move-in"){
                      $("#isCouncilImg-" + utilityCount).attr("src", "assets/img/PropertyImg/council_select.png");
                }
            }

            getAddRemove(count);
        }
    }); // GetPropertyRegister


    $.get(domainAddress + "GetUserUtilityListByProperty/" + editPropertyID, {}, function(result) {
          $(".getPropertyUtility").show();
          if (result.record_count == 0) {
              $(".propertyUtility").html('');
              $(".propertyUtility").append("<tr> <td>No records found</td> <td></td> <td></td> <td></td> <td></td> </tr>");
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


                  $(".propertyUtility").append("<tr> <td>" + result.records[propertyUtility].UtilityRegType + "</td> <td>" + result.records[propertyUtility].Name + "</td> <td>" + result.records[propertyUtility].EmailID + "</td> <td>" + result.records[propertyUtility].MobileNumber + "</td> <td>" + moment(result.records[propertyUtility].Date).format('Do MMM YYYY,  h:mm a') + "</td>  <td style='color:" + cElectricity + ";'>" + isElectricity + "</td> <td style='color:" + cGas + ";'>" + isGas + "</td> <td style='color:" + cWater + ";'>" + isWater + "</td> <td style='color:" + cCouncil + ";'>" + isCouncil + "</td> <td>" + utilityStatusCheck + "</td> </tr>");
              }
          }
      }); // GetUserUtilityListByProperty/
} //getReloadUserTenants


function getAddRemove(count) {
    $(".getTenantList").append('<div class="uk-width-medium-1-3 newAdd" style="margin-top: 10px;">  <div class="md-card btnAdd" style="cursor:pointer;">  <div class="md-card-content editPropertyHeight large-padding"><div class="parsley-row" style="height:150px;"> </div> <div class="parsley-row"><div class="uk-grid"> <div class="uk-width-medium-1-3"></div> <div class="uk-width-medium-1-3"> <span class="menu_icon" style="font-size: 2em;"><i class="fa fa-plus fa-2x"></i> ADD<p style="margin-left: -10px;">Tenant</p></span></div>  <div class="uk-width-medium-1-3"></div>  </div> </div> </div> </div></div>  ');
    var hiddenPropertyID = $("#hiddenPropertyID").val();
    if (hiddenPropertyID == 0) {
        $(".editPropertyHeight").css("height", "560px");
    } else {
        $(".editPropertyHeight").css("height", "585px");
    }
     
    $(".btnAdd").on('click', function() {
        var AddTenantCount = "1";
        $("#hiddenAddTenantCount").val(AddTenantCount);
        count++;
        $(".newAdd").remove();
        if(count>0){
            getAddTenant(count);
            getAddRemove(count);
        }
        $("#inputHMONoOfTenent").val(count);
        $("#singleHmo").iCheck('uncheck');
        $("#multipleHmo").iCheck('check');
        $(".hmoInputTenent").show('slow');
        $(".hmoLicenseNumber").show();
        var hiddenPropertyID = $("#hiddenPropertyID").val();
        if (hiddenPropertyID == 0) {
            $("#btnAddUserTenant-" + count).hide();
        } else {
            $("#btnAddUserTenant-" + count).show();
        }
        $("#closeCard-" + count).show();
        $(".help-block").hide();
        $(".help-block").text("");
        $(".btnSubmitProperty").attr("disabled", false);
        $(".utilityIcon").hide();
        $(".utilityIconLabel").hide();
        $("#hiddenIsNewTenantUpdate-"+count).val(1);


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

    }); // btnAdd

} // getAddRemove();