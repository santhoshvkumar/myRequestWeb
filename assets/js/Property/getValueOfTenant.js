var getValueOfTenant = function() {
    var getBtnCount = $(".btnSubmitTenantInsurance").attr("value");
    var getPhoneCode = localStorage.getItem("MyRequest_PhoneCode-prefix");
 
    var getElect = $("#getElect").prop("checked");
    if (getElect == true) {
        $("#hiddenIsElectricity-" + getBtnCount).val(1);
        $("#isElectricityImg-" + getBtnCount).attr("src", "assets/img/PropertyImg/electricity_select.png");
    } else {
        $("#hiddenIsElectricity-" + getBtnCount).val(0);
    }


    var getGas = $("#getGas").prop("checked");
    if (getGas == true) {
        $("#hiddenIsGas-" + getBtnCount).val(1);
        $("#isGasImg-" + getBtnCount).attr("src", "assets/img/PropertyImg/gas_select.png");
    } else {
        $("#hiddenIsGas-" + getBtnCount).val(0);
    }

    var getWater = $("#getWater").prop("checked");
    if (getWater == true) {
        $("#hiddenIsWater-" + getBtnCount).val(1);
        $("#isWaterImg-" + getBtnCount).attr("src", "assets/img/PropertyImg/water_select.png");
    } else {
        $("#hiddenIsWater-" + getBtnCount).val(0);
    }

    var getCouncil = $("#getCouncil").prop("checked");
    if (getCouncil == true) {
        $("#hiddenIsCouncil-" + getBtnCount).val(1);
        $("#isCouncilImg-" + getBtnCount).attr("src", "assets/img/PropertyImg/council_select.png");
    } else {
        $("#hiddenIsCouncil-" + getBtnCount).val(0);
    }


    var getAvailTenantInsurance = $("#getAvailTenantInsurance").prop("checked");
    if (getAvailTenantInsurance == true) {
        $("#hiddenAvailTenantInsurance-" + getBtnCount).val(1);
    } else {
        $("#hiddenAvailTenantInsurance-" + getBtnCount).val(0);
    }

    var lettingAgencyCode = localStorage.getItem("MyRequest_LettingAgencyCode");
    var inputUserRegID = $("#hiddenUserRegID-" + getBtnCount).val();
    var inputTitle = $("#inputTitle-" + getBtnCount).val();
    var inputName = $("#inputName-" + getBtnCount).val();
    var inputLastName = $("#inputLastName-" + getBtnCount).val();
    var inputEmail = $("#inputEmail-" + getBtnCount).val();
    var inputMobile = getPhoneCode+$("#inputMobile-" + getBtnCount).val();
    var hiddenIsElectricity = $("#hiddenIsElectricity-" + getBtnCount).val();
    var hiddenIsGas = $("#hiddenIsGas-" + getBtnCount).val();
    var hiddenIsWater = $("#hiddenIsWater-" + getBtnCount).val();
    var hiddenIsCouncil = $("#hiddenIsCouncil-" + getBtnCount).val();
    var hiddenAvailTenantInsurance = $("#hiddenAvailTenantInsurance-" + getBtnCount).val();
    var hiddenIsNewTenantUpdate = $("#hiddenIsNewTenantUpdate-" + getBtnCount).val();
    var inputStartDate = $("#inputStartDate-" + getBtnCount).val();
    var inputEndDate = $("#inputEndDate-" + getBtnCount).val();
    var inputLeadTenant = $("#isLeadTenant-" + getBtnCount).prop('checked');
    var tenancyStart = "";
    var tenancyEnd = "";
    var isLeadTenant = 0;
    if(inputLeadTenant == true){
        isLeadTenant = 1;
    } else {
        isLeadTenant = 0;
    }
    if (inputStartDate != "") {
          var selectStartDate = inputStartDate.split(".");
          tenancyStart = selectStartDate[2] + "-" + selectStartDate[1] + "-" + selectStartDate[0];
    }
    if (inputEndDate != "") {
          var selectEndDate = inputEndDate.split(".");
          tenancyEnd = selectEndDate[2] + "-" + selectEndDate[1] + "-" + selectEndDate[0];
    }

    var IsAlreadyExist = 0;
    for (getItems in getAddTenantArr) {

        if (getAddTenantArr[getItems].IsWater == hiddenIsWater) {
            $(".isElectricity").hide();
        } else {
            $(".isElectricity").show();
        }

        if (getAddTenantArr[getItems].IsGas == hiddenIsGas) {
            $(".isGas").hide();
        } else {
            $(".isGas").show();
        }

        if (getAddTenantArr[getItems].IsWater == hiddenIsWater) {
            $(".isWater").hide();
        } else {
            $(".isWater").show();
        }

        if (getAddTenantArr[getItems].IsCouncil == hiddenIsCouncil) {
            $(".isCouncil").hide();
        } else {
            $(".isCouncil").show();
        }

    }

    addOrUpdateTenantTemp(getAddTenantArr, getBtnCount, inputUserRegID, inputTitle, inputName, inputLastName, inputEmail, inputMobile, lettingAgencyCode, tenancyStart, tenancyEnd, hiddenIsElectricity, hiddenIsGas, hiddenIsWater, hiddenIsCouncil, hiddenAvailTenantInsurance, hiddenIsNewTenantUpdate, isLeadTenant);

    if (hiddenIsGas == 1) {
        $("#isGasImg-" + getBtnCount).attr("src", "assets/img/PropertyImg/gas_select.png");
    } else {
        $("#isGasImg-" + getBtnCount).attr("src", "assets/img/PropertyImg/gas.png");
    }

    if (hiddenIsWater == 1) {
        $("#isWaterImg-" + getBtnCount).attr("src", "assets/img/PropertyImg/water_select.png");
    } else {
        $("#isWaterImg-" + getBtnCount).attr("src", "assets/img/PropertyImg/water.png");
    }

    if (hiddenIsElectricity == 1) {
        $("#isElectricityImg-" + getBtnCount).attr("src", "assets/img/PropertyImg/electricity_select.png");

    } else {
        $("#isElectricityImg-" + getBtnCount).attr("src", "assets/img/PropertyImg/electricity.png");
    }

    if (hiddenIsCouncil == 1) {
        $("#isCouncilImg-" + getBtnCount).attr("src", "assets/img/PropertyImg/council_select.png");
    } else {
         $("#isCouncilImg-" + getBtnCount).attr("src", "assets/img/PropertyImg/council.png");
    }

    var modal = UIkit.modal("#modalTenantInsurance");
    modal.hide();
    var specialElect = document.querySelector('#getElect')
    specialElect.checked = false;
    var specialGas = document.querySelector('#getGas')
    specialGas.checked = false;
    var specialWater = document.querySelector('#getWater')
    specialWater.checked = false;
    var specialCouncil = document.querySelector('#getCouncil')
    specialCouncil.checked = false;
    var availTenantInsurance = document.querySelector('#getAvailTenantInsurance')
    availTenantInsurance.checked = false;
    var event = document.createEvent('HTMLEvents');
    event.initEvent('change', true, true);
    specialElect.dispatchEvent(event);
    specialGas.dispatchEvent(event);
    specialWater.dispatchEvent(event);
    specialCouncil.dispatchEvent(event);
    availTenantInsurance.dispatchEvent(event);
}

function addOrUpdateTenantTemp( getAddTenantArr, getBtnCount, inputUserRegID, inputTitle, inputName, inputLastName, inputEmail, inputMobile, lettingAgencyCode, tenancyStart, tenancyEnd,  hiddenIsElectricity, hiddenIsGas, hiddenIsWater, hiddenIsCouncil, hiddenAvailTenantInsurance, hiddenIsNewTenantUpdate, isLeadTenant) {
    var IsAlreadyExist = 0;
    for (getItems in getAddTenantArr) {
        if (getAddTenantArr[getItems].Count == getBtnCount) {
            getAddTenantArr[getItems].UserRegID = inputUserRegID;
            getAddTenantArr[getItems].TitleName = inputTitle;
            getAddTenantArr[getItems].Name = inputName;
            getAddTenantArr[getItems].LastName = inputLastName;
            getAddTenantArr[getItems].Email = inputEmail;
            getAddTenantArr[getItems].Mobile = inputMobile;
            getAddTenantArr[getItems].LettingAgencyCode = lettingAgencyCode;
            getAddTenantArr[getItems].TenancyStart = tenancyStart;
            getAddTenantArr[getItems].TenancyEnd = tenancyEnd;
            getAddTenantArr[getItems].IsElectricity = hiddenIsElectricity;
            getAddTenantArr[getItems].IsGas = hiddenIsGas;
            getAddTenantArr[getItems].IsWater = hiddenIsWater;
            getAddTenantArr[getItems].IsCouncil = hiddenIsCouncil;
            getAddTenantArr[getItems].IsAvailTenantInsurance = hiddenAvailTenantInsurance;
            getAddTenantArr[getItems].IsNewTenantUtility = hiddenIsNewTenantUpdate;
            getAddTenantArr[getItems].IsLeadTenant = isLeadTenant;
            IsAlreadyExist = 1;
        }
    }

    if (IsAlreadyExist != 1) {
         var newItem = {
            'Count': parseInt(getBtnCount),
            'UserRegID': parseInt(inputUserRegID),
            'TitleName': inputTitle,
            'Name': inputName,
            'LastName': inputLastName,
            'Email': inputEmail,
            'Mobile': inputMobile,
            'LettingAgencyCode': lettingAgencyCode,
            'TenancyStart': tenancyStart,   
            'TenancyEnd': tenancyEnd,
            'IsElectricity':hiddenIsElectricity,
            'IsGas': hiddenIsGas,
            'IsWater': hiddenIsWater,
            'IsCouncil': hiddenIsCouncil,
            'IsAvailTenantInsurance': hiddenAvailTenantInsurance,
            'IsNewTenantUtility': hiddenIsNewTenantUpdate,
            'IsLeadTenant': isLeadTenant
        };
        getAddTenantArr.push(newItem);
    }
    localStorage.setItem('MyRequestTenantsData', JSON.stringify(getAddTenantArr));
}