var getValueOfTenant = function() {
    console.log("btnSubmitTenantInsurance click");
    var getBtnCount = $(".btnSubmitTenantInsurance").attr("value");
    var getPhoneCode = localStorage.getItem("MyRequest_PhoneCode-prefix");
    var getElect = $("#getElect").prop("checked");
    if (getElect == true) {
        $("#hiddenIsElectricity-" + getBtnCount).val(1);
        $("#isElectricityImg-" + getBtnCount).attr("src", "assets/img/PropertyImg/electricity_select.png");
    }


    var getGas = $("#getGas").prop("checked");
    if (getGas == true) {
        $("#hiddenIsGas-" + getBtnCount).val(1);
        $("#isGasImg-" + getBtnCount).attr("src", "assets/img/PropertyImg/gas_select.png");


    }
    var getWater = $("#getWater").prop("checked");
    if (getWater == true) {
        $("#hiddenIsWater-" + getBtnCount).val(1);
        $("#isWaterImg-" + getBtnCount).attr("src", "assets/img/PropertyImg/water_select.png");
    }
    var getCouncil = $("#getCouncil").prop("checked");
    if (getCouncil == true) {
        $("#hiddenIsCouncil-" + getBtnCount).val(1);
        $("#isCouncilImg-" + getBtnCount).attr("src", "assets/img/PropertyImg/council_select.png");
    }


    var getAvailTenantInsurance = $("getAvailTenantInsurance").prop("checked");
    if (getAvailTenantInsurance == true) {
        $("#hiddenAvailTenantInsurance-" + getBtnCount).val(1);
    }

    console.log("Click Process Count : " + getBtnCount);
    var lettingAgencyCode = localStorage.getItem("MyRequest_LettingAgencyCode");

    var inputUserRegID = $("#hiddenUserRegID-" + getBtnCount).val();
    var inputName = $("#inputName-" + getBtnCount).val();
    var inputEmail = $("#inputEmail-" + getBtnCount).val();
    var inputMobile = getPhoneCode+$("#inputMobile-" + getBtnCount).val();
    var hiddenIsElectricity = $("#hiddenIsElectricity-" + getBtnCount).val();
    var hiddenIsGas = $("#hiddenIsGas-" + getBtnCount).val();
    var hiddenIsWater = $("#hiddenIsWater-" + getBtnCount).val();
    var hiddenIsCouncil = $("#hiddenIsCouncil-" + getBtnCount).val();
    var hiddenAvailTenantInsurance = $("#hiddenAvailTenantInsurance-" + getBtnCount).val();
    var hiddenIsNewTenantUpdate = $("#hiddenIsNewTenantUpdate-" + getBtnCount).val();

    var newTenantsDataForm = "{'UserRegID':'" + inputUserRegID + "','Name':'" + inputName + "','Email':'" + inputEmail + "','Mobile':'" + inputMobile + "','LettingAgencyCode':'" + lettingAgencyCode + "','IsElectricity':'" + hiddenIsElectricity + "','IsGas':'" + hiddenIsGas + "','IsWater':'" + hiddenIsWater + "','IsCouncil':'" + hiddenIsCouncil + "','IsAvailTenantInsurance':'" + hiddenAvailTenantInsurance + "','IsNewTenantUtility':'" + hiddenIsNewTenantUpdate + "'}";

    getAddTenantArr.push(newTenantsDataForm);

    console.log(getAddTenantArr);
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