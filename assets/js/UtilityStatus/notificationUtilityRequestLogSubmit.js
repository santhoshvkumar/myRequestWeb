function notificationUtilityRequestLogSubmit() {
    $("#inputGasInfo").on('change', function() {
        var inputGasInfo = $("#inputGasInfo").val();
        if (inputGasInfo == 0) {
            $(".errorGasInfo").show();
            $(".errorGasInfo").text('* Select the Action');
            $(".btnSubmitGas").attr("disabled", true);
            return false;
        } else {
            $(".errorGasInfo").hide();
            $(".errorGasInfo").text('');
            $(".btnSubmitGas").attr("disabled", false);

        }
    });

    $("#inputElectricityInfo").on('change', function() {
        var inputElectricityInfo = $("#inputElectricityInfo").val();
        if (inputElectricityInfo == 0) {
            $(".errorElectricityInfo").show();
            $(".errorElectricityInfo").text('* Select the Action');
            $(".btnSubmitElectricity").attr("disabled", true);
            return false;
        } else {
            $(".errorElectricityInfo").hide();
            $(".errorElectricityInfo").text('');
            $(".btnSubmitElectricity").attr("disabled", false);

        }
    });

    $("#inputCouncilInfo").on('change', function() {
        var inputCouncilInfo = $("#inputCouncilInfo").val();
        if (inputCouncilInfo == 0) {
            $(".errorCouncilInfo").show();
            $(".errorCouncilInfo").text('* Select the Action');
            $(".btnSubmitCouncil").attr("disabled", true);
            return false;
        } else {
            $(".errorCouncilInfo").hide();
            $(".errorCouncilInfo").text('');
            $(".btnSubmitCouncil").attr("disabled", false);

        }
    });


    $("#inputWaterActionInfo").on('change', function() {
        var inputWaterActionInfo = $("#inputWaterActionInfo").val();
        if (inputWaterActionInfo == 0) {
            $(".errorWaterInfo").show();
            $(".errorWaterInfo").text('* Select the Action');
            $(".btnSubmitWaterAuthority").attr("disabled", true);
            return false;
        } else {
            $(".errorWaterInfo").hide();
            $(".errorWaterInfo").text('');
            $(".btnSubmitWaterAuthority").attr("disabled", false);

        }
    });

    $("#inputBroadbandInfo").on('change', function() {
        var inputBroadbandInfo = $("#inputBroadbandInfo").val();
        if (inputBroadbandInfo == 0) {
            $(".errorBroadbandInfo").show();
            $(".errorBroadbandInfo").text('* Select the Action');
            $(".btnSubmitBroadband").attr("disabled", true);
            return false;
        } else {
            $(".errorBroadbandInfo").hide();
            $(".errorBroadbandInfo").text('');
            $(".btnSubmitBroadband").attr("disabled", false);

        }
    });

    $("#inputMediaInfo").on('change', function() {
        var inputMediaInfo = $("#inputMediaInfo").val();
        if (inputMediaInfo == 0) {
            $(".errorMediaInfo").show();
            $(".errorMediaInfo").text('* Select the Action');
            $(".btnSubmitMedia").attr("disabled", true);
            return false;
        } else {
            $(".errorMediaInfo").hide();
            $(".errorMediaInfo").text('');
            $(".btnSubmitMedia").attr("disabled", false);

        }
    });




    $("#inputGasNotes").keyup(function() {
        var inputGasNotes = $("#inputGasNotes").val().replace(/(\r\n|\n|\r)/gm, " ");
        if (inputGasNotes == "") {
            $(".errorGasInfo").show();
            $(".errorGasInfo").text('* Enter the Notes');
            $(".btnSubmitGas").attr("disabled", true);
            return false;
        } else {
            $(".errorGasInfo").hide();
            $(".errorGasInfo").text('');
            $(".btnSubmitGas").attr("disabled", false);

        }
    });


    $("#inputElectricityNotes").keyup(function() {
        var inputElectricityNotes = $("#inputElectricityNotes").val().replace(/(\r\n|\n|\r)/gm, " ");
        if (inputElectricityNotes == "") {
            $(".errorElectricityInfo").show();
            $(".errorElectricityInfo").text('* Enter the Notes');
            $(".btnSubmitElectricity").attr("disabled", true);
            return false;
        } else {
            $(".errorElectricityInfo").hide();
            $(".errorElectricityInfo").text('');
            $(".btnSubmitElectricity").attr("disabled", false);

        }
    });


    $("#inputCouncilNotes").keyup(function() {
        var inputCouncilNotes = $("#inputCouncilNotes").val().replace(/(\r\n|\n|\r)/gm, " ");
        if (inputCouncilNotes == "") {
            $(".errorCouncilInfo").show();
            $(".errorCouncilInfo").text('* Enter the Notes');
            $(".btnSubmitCouncil").attr("disabled", true);
            return false;
        } else {
            $(".errorCouncilInfo").hide();
            $(".errorCouncilInfo").text('');
            $(".btnSubmitCouncil").attr("disabled", false);

        }
    });


    $("#inputWaterNotes").keyup(function() {
        var inputWaterNotes = $("#inputWaterNotes").val().replace(/(\r\n|\n|\r)/gm, " ");
        if (inputWaterNotes == "") {
            $(".errorWaterInfo").show();
            $(".errorWaterInfo").text('* Enter the Notes');
            $(".btnSubmitWaterAuthority").attr("disabled", true);
            return false;
        } else {
            $(".errorWaterInfo").hide();
            $(".errorWaterInfo").text('');
            $(".btnSubmitWaterAuthority").attr("disabled", false);

        }
    });


    $("#inputBroadbandNotes").keyup(function() {
        var inputBroadbandNotes = $("#inputBroadbandNotes").val().replace(/(\r\n|\n|\r)/gm, " ");
        if (inputBroadbandNotes == "") {
            $(".errorBroadbandInfo").show();
            $(".errorBroadbandInfo").text('* Enter the Notes');
            $(".btnSubmitBroadband").attr("disabled", true);
            return false;
        } else {
            $(".errorBroadbandInfo").hide();
            $(".errorBroadbandInfo").text('');
            $(".btnSubmitBroadband").attr("disabled", false);

        }
    });


    $("#inputMediaNotes").keyup(function() {
        var inputMediaNotes = $("#inputMediaNotes").val().replace(/(\r\n|\n|\r)/gm, " ");
        if (inputMediaNotes == "") {
            $(".errorMediaInfo").show();
            $(".errorMediaInfo").text('* Enter the Notes');
            $(".btnSubmitMedia").attr("disabled", true);
            return false;
        } else {
            $(".errorMediaInfo").hide();
            $(".errorMediaInfo").text('');
            $(".btnSubmitMedia").attr("disabled", false);

        }
    });




    $(".btnSubmitGas").click(function() {

        var hiddenUtilityID = $("#hiddenUtilityID").val();
        var hiddenPropertyID = $("#hiddenPropertyID").val();
        var hiddenUserRegID = $("#hiddenUserRegID").val();
        var getSelectedType = $(this).attr("value");

        var successCondition = false;

        if (getSelectedType == "Gas") {
            var actionTaken = $("#inputGasInfo").val();
            var inputNotes = $("#inputGasNotes").val().replace(/(\r\n|\n|\r)/gm, " ");
            if (actionTaken == 0) {
                $(".errorGasInfo").show();
                $(".errorGasInfo").text('* Select the Action');
                $(".btnSubmitGas").attr("disabled", true);
                return false;
            }

            if (inputNotes == "") {
                $(".errorGasInfo").show();
                $(".errorGasInfo").text('* Enter the Notes');
                $(".btnSubmitGas").attr("disabled", true);
                return false;
            } else {
                successCondition = true;
            }
        } else if (getSelectedType == "Electricity") {
            var actionTaken = $("#inputElectricityInfo").val();
            var inputNotes = $("#inputElectricityNotes").val().replace(/(\r\n|\n|\r)/gm, " ");
            if (actionTaken == 0) {
                $(".errorElectricityInfo").show();
                $(".errorElectricityInfo").text('* Select the Action');
                $(".btnSubmitElectricity").attr("disabled", true);
                return false;
            }

            if (inputNotes == "") {
                $(".errorElectricityInfo").show();
                $(".errorElectricityInfo").text('* Enter the Notes');
                $(".btnSubmitElectricity").attr("disabled", true);
                return false;
            } else {
                successCondition = true;
            }
        } else if (getSelectedType == "Council") {
            var actionTaken = $("#inputCouncilInfo").val();
            var inputNotes = $("#inputCouncilNotes").val().replace(/(\r\n|\n|\r)/gm, " ");
            if (actionTaken == 0) {
                $(".errorCouncilInfo").show();
                $(".errorCouncilInfo").text('* Select the Action');
                $(".btnSubmitCouncil").attr("disabled", true);
                return false;
            }

            if (inputNotes == "") {
                $(".errorCouncilInfo").show();
                $(".errorCouncilInfo").text('* Enter the Notes');
                $(".btnSubmitCouncil").attr("disabled", true);
                return false;
            } else {
                successCondition = true;
            }
        } else if (getSelectedType == "Water") {
            var actionTaken = $("#inputWaterActionInfo").val();
            var inputNotes = $("#inputWaterNotes").val().replace(/(\r\n|\n|\r)/gm, " ");
            if (actionTaken == 0) {
                $(".errorWaterInfo").show();
                $(".errorWaterInfo").text('* Select the Action');
                $(".btnSubmitWaterAuthority").attr("disabled", true);
                return false;
            }

            if (inputNotes == "") {
                $(".errorWaterInfo").show();
                $(".errorWaterInfo").text('* Enter the Notes');
                $(".btnSubmitWaterAuthority").attr("disabled", true);
                return false;
            } else {
                successCondition = true;
            }

        } else if (getSelectedType == "BroadBand") {
            var actionTaken = $("#inputBroadbandInfo").val();
            var inputNotes = $("#inputBroadbandNotes").val().replace(/(\r\n|\n|\r)/gm, " ");
            if (actionTaken == 0) {
                $(".errorBroadbandInfo").show();
                $(".errorBroadbandInfo").text('* Select the Action');
                $(".btnSubmitBroadband").attr("disabled", true);
                return false;
            }

            if (inputNotes == "") {
                $(".errorBroadbandInfo").show();
                $(".errorBroadbandInfo").text('* Enter the Notes');
                $(".btnSubmitBroadband").attr("disabled", true);
                return false;
            } else {
                successCondition = true;
            }

        } else if (getSelectedType == "Media") {
            var actionTaken = $("#inputMediaInfo").val();
            var inputNotes = $("#inputMediaNotes").val().replace(/(\r\n|\n|\r)/gm, " ");
            if (actionTaken == 0) {
                $(".errorMediaInfo").show();
                $(".errorMediaInfo").text('* Select the Action');
                $(".btnSubmitMedia").attr("disabled", true);
                return false;
            }

            if (inputNotes == "") {
                $(".errorMediaInfo").show();
                $(".errorMediaInfo").text('* Enter the Notes');
                $(".btnSubmitMedia").attr("disabled", true);
                return false;
            } else {
                successCondition = true;
            }

        }


        if (successCondition) {
            $("#getLoadingModalContent").addClass('md-show');
            var dataForm = '{"UtilityID":"' + hiddenUtilityID + '","PropertyID":"' + hiddenPropertyID + '","UserRegID":"' + hiddenUserRegID + '","Notes":"' + inputNotes + '","ActionTaken":"' + actionTaken + '","UtilityType":"' + getSelectedType + '"}';
            console.log(dataForm);

            var sendURL = domainAddress + 'CreateUtilityLog';
            console.log(sendURL);

            $.ajax({
                type: "POST",
                url: sendURL,
                data: dataForm,
                success: function(dataCheck) {
                    console.log(dataCheck);
                    if(getSelectedType=="Gas"){
                       $("#inputGasInfo").val(0);
                       $("#select2-inputGasInfo-container").html("Action");
                       $("#inputGasNotes").val('');
                    }
                    
                    if(getSelectedType=="Electricity"){
                       $("#inputElectricityInfo").val(0);
                       $("#select2-inputElectricityInfo-container").html("Action");
                       $("#inputElectricityNotes").val('');
                    }
                    
                    if(getSelectedType=="Council"){
                       $("#inputCouncilInfo").val(0);
                       $("#select2-inputCouncilInfo-container").html("Action");
                       $("#inputCouncilNotes").val('');
                    }

                    if(getSelectedType=="Water"){
                       $("#inputWaterActionInfo").val(0);
                       $("#select2-inputWaterActionInfo-container").html("Action");
                       $("#inputWaterNotes").val('');
                    }

                    if(getSelectedType=="BroadBand"){
                       $("#inputBroadbandInfo").val(0);
                       $("#select2-inputBroadbandInfo-container").html("Action");
                       $("#inputBroadbandNotes").val('');
                    }
                    
                    if(getSelectedType=="Media"){
                        $("#inputMediaInfo").val(0);
                       $("#select2-inputMediaInfo-container").html("Action");
                       $("#inputMediaNotes").val('');
                    }
                     
                    getUtilityLogs(hiddenUtilityID);
                    $("#getLoadingModalContent").removeClass('md-show');
                    UIkit.modal.alert('Utility Log Created Successfully');
                }
            });
        }

    });
    $("#inputGasStatus").on('change', function() {
        var inputGasStatus = $("#inputGasStatus").val();
        if (inputGasStatus == 0) {
            $(".errorGasInfo").show();
            $(".errorGasInfo").text('* Select the Service Provider');
            $(".btnSubmitUpdateGasAd").attr("disabled", true);
            return false;
        } else {
            $(".errorGasInfo").hide();
            $(".errorGasInfo").text('');
            $(".btnSubmitUpdateGasAd").attr("disabled", false);

        }
    });

    $("#inputBroadStatus").on('change', function() {
        var inputBroadStatus = $("#inputBroadStatus").val();
        if (inputBroadStatus == 0) {
            $(".errorBroadbandInfo").show();
            $(".errorBroadbandInfo").text('* Select the Status');
            $(".btnSubmitUpdateBroadbandAd").attr("disabled", true);
            return false;
        } else {
            $(".errorBroadbandInfo").hide();
            $(".errorBroadbandInfo").text('');
            $(".btnSubmitUpdateBroadbandAd").attr("disabled", false);

        }
    });

    $("#inputMediaStatus").on('change', function() {
        var inputMediaStatus = $("#inputMediaStatus").val();
        if (inputMediaStatus == 0) {
            $(".errorMediaInfo").show();
            $(".errorMediaInfo").text('* Select the Status');
            $(".btnSubmitUpdateMediaAd").attr("disabled", true);
            return false;
        } else {
            $(".errorMediaInfo").hide();
            $(".errorMediaInfo").text('');
            $(".btnSubmitUpdateMediaAd").attr("disabled", false);

        }
    });




    $(".btnSubmitUpdateElectricityAd").click(function() {
        console.log("btnSubmitUpdateElectricityAd");
        var hiddenUtilityID = $("#hiddenUtilityID").val();
        var hiddenPropertyID = $("#hiddenPropertyID").val();
        var hiddenElectricityUserRegID = $("#hiddenElectricityUserRegID").val();
        var hiddenElectricityUtilityAdID = $("#hiddenElectricityUtilityAdID").val();
        var supplier = $("#hiddenElectricityProvider").val();
        var supplierType = "Energy";
        var inputElectricityStatus = $("#select2-inputElectricityStatus-container").html();
        
        if (inputElectricityStatus == "Select Status") {
            
            $(".btnSubmitUpdateElectricityAd").attr("disabled", true);
            return false;
        } else {
            successCondition = true;
            $("#getLoadingModalContent").addClass('md-show');
        }

        if(successCondition){
            var dataForm = '{"Supplier":"' + supplier + '","SupplierType":"' + supplierType + '","Status":"' + inputElectricityStatus + '","UserRegID":"' + hiddenElectricityUserRegID + '","UtilityID":"'+hiddenUtilityID+'","UtilityAdID":"'+hiddenElectricityUtilityAdID+'"}';
            console.log(dataForm);
            var sendURL = domainAddress + 'updatePropertyRequestType/' + hiddenPropertyID;
            console.log(sendURL);

            $.ajax({
                type: "POST",
                url: sendURL,
                data: dataForm,
                success: function(dataCheck) {
                    console.log(dataCheck);
                    $("#select2-inputElectricityStatus-container").html("Select Status");
                    $("#inputElectricityStatus").val(0);
                    $(".getUserUtilityListContact").hide();
                    getUtilityList();
                    $("#getLoadingModalContent").removeClass('md-show');
                    UIkit.modal.alert('Utility Request Type updated Successfully');
                }
            });
        }
    });


    $(".btnSubmitUpdateBroadbandAd").click(function() {
        console.log("btnSubmitUpdateBroadbandAd");
        var hiddenUtilityID = $("#hiddenUtilityID").val();
        var hiddenPropertyID = $("#hiddenPropertyID").val();
        var hiddenBroadBandUserRegID = $("#hiddenBroadBandUserRegID").val();
        var hiddenBroadBandUtilityAdID = $("#hiddenBroadBandUtilityAdID").val();
        var successCondition = false;
        var supplier = $("#hiddenBroadBandProvider").val();
        var supplierType = "BroadBand";
        var inputBroadStatus = $("#select2-inputBroadStatus-container").html();
        if (inputBroadStatus == "Select Status") {
            $(".errorBroadbandInfo").show();
            $(".errorBroadbandInfo").text('* Select the Status');
            $(".btnSubmitUpdateBroadbandAd").attr("disabled", true);
            return false;
        } else {
            successCondition = true;
            $("#getLoadingModalContent").addClass('md-show');
        }

        if(successCondition){
            var dataForm = '{"Supplier":"' + supplier + '","SupplierType":"' + supplierType + '","Status":"' + inputBroadStatus + '","UserRegID":"' + hiddenBroadBandUserRegID + '","UtilityID":"'+hiddenUtilityID+'","UtilityAdID":"'+hiddenBroadBandUtilityAdID+'"}';
            console.log(dataForm);
            var sendURL = domainAddress + 'updatePropertyRequestType/' + hiddenPropertyID;
            console.log(sendURL);

            $.ajax({
                type: "POST",
                url: sendURL,
                data: dataForm,
                success: function(dataCheck) {
                    console.log(dataCheck);
                    $("#select2-inputBroadStatus-container").html("Select Status");
                    $("#inputBroadStatus").val('');
                    $(".getUserUtilityListContact").hide();
                    getUtilityList();
                    $("#getLoadingModalContent").removeClass('md-show');
                    UIkit.modal.alert('Utility Request Type Updated Successfully');
                }
            });  
        }
        
    });


    $(".btnSubmitUpdateMediaAd").click(function() {
        console.log("btnSubmitUpdateMediaAd");
        var hiddenUtilityID = $("#hiddenUtilityID").val();
        var hiddenPropertyID = $("#hiddenPropertyID").val();
        var hiddenMediaUserRegID = $("#hiddenMediaUserRegID").val();
        var hiddenMediaUtilityAdID = $("#hiddenMediaUtilityAdID").val();
        var successCondition = false;
        var supplier = $("#hiddenMediaProvider").val();
        var supplierType = "Media";
        var inputMediaStatus = $("#select2-inputMediaStatus-container").html();
        if (inputMediaStatus == "Select Status") {
            $(".errorMediaInfo").show();
            $(".errorMediaInfo").text('* Select the Status');
            $(".btnSubmitUpdateMediaAd").attr("disabled", true);
            return false;
        } else {
            successCondition = true;
            $("#getLoadingModalContent").addClass('md-show');
        }

        if(successCondition){
            var dataForm = '{"Supplier":"' + supplier + '","SupplierType":"' + supplierType + '","Status":"' + inputMediaStatus + '","UserRegID":"' + hiddenMediaUserRegID + '","UtilityID":"'+hiddenUtilityID+'","UtilityAdID":"'+hiddenMediaUtilityAdID+'"}';
            console.log(dataForm);
            var sendURL = domainAddress + 'updatePropertyRequestType/' + hiddenPropertyID;
            console.log(sendURL);

            $.ajax({
                type: "POST",
                url: sendURL,
                data: dataForm,
                success: function(dataCheck) {
                    console.log(dataCheck);
                    $("#select2-inputMediaStatus-container").html("Select Status");
                    $("#inputMediaStatus").val(0);
                    $(".getUserUtilityListContact").hide();
                    getUtilityList();
                    $("#getLoadingModalContent").removeClass('md-show');
                    UIkit.modal.alert('Utility Request Type updated Successfully');
                }
            });
        }
        
    });

    $("#getBroadBandProvider").on('change', function() {
        var getBroadBandProvider = $("#getBroadBandProvider").val();
        if (getBroadBandProvider == 0) {
            $(".errorMediaInfo").show();
            $(".errorMediaInfo").text('* Select the BroadBand Provider');
            $(".btnUpdateServiceType").attr("disabled", true);
            return false;
        } else {
            $(".errorMediaInfo").hide();
            $(".errorMediaInfo").text('');
            $(".btnUpdateServiceType").attr("disabled", false);

        }
    });

    $("#inputTaxAuthority").on('change', function() {
        var inputTaxAuthority = $("#inputTaxAuthority").val();
        if (inputTaxAuthority == 0) {
            $(".errorCouncilInfo").show();
            $(".errorCouncilInfo").text('* Select the Council Tax Authority');
            $(".btnUpdateServiceType").attr("disabled", true);
            return false;
        } else {
            $(".errorCouncilInfo").hide();
            $(".errorCouncilInfo").text('');
            $(".btnUpdateServiceType").attr("disabled", false);

        }
    });

    $("#getMediaProvider").on('change', function() {
        var getMediaProvider = $("#getMediaProvider").val();
        if (getMediaProvider == 0) {
            $(".errorMediaInfo").show();
            $(".errorMediaInfo").text('* Select the Media Provider');
            $(".btnUpdateServiceType").attr("disabled", true);
            return false;
        } else {
            $(".errorMediaInfo").hide();
            $(".errorMediaInfo").text('');
            $(".btnUpdateServiceType").attr("disabled", false);

        }
    });




    $(".btnSubmitUpdateGasAd").click(function() {
        console.log("btnSubmitUpdateGasAd");
        var hiddenUtilityID = $("#hiddenUtilityID").val();
        var hiddenPropertyID = $("#hiddenPropertyID").val();
        var hiddenGasUserRegID = $("#hiddenGasUserRegID").val();
        var hiddenGasUtilityAdID = $("#hiddenGasUtilityAdID").val();
        var successCondition = false;
        var supplier = $("#hiddenGasProvider").val();
        var supplierType = "Gas";
        var inputGasStatus = $("#select2-inputGasStatus-container").html();
        if (inputGasStatus == "Select Status") {
            $(".errorGasInfo").show();
            $(".errorGasInfo").text('* Select the Status');
            $(".btnSubmitUpdateGasAd").attr("disabled", true);
            return false;
        } else {
            successCondition = true;
            $("#getLoadingModalContent").addClass('md-show');
        }

        if(successCondition){
            var dataForm = '{"Supplier":"' + supplier + '","SupplierType":"' + supplierType + '","Status":"' + inputGasStatus + '","UserRegID":"' + hiddenGasUserRegID + '","UtilityID":"'+hiddenUtilityID+'","UtilityAdID":"'+hiddenGasUtilityAdID+'"}';
            console.log(dataForm);
            var sendURL = domainAddress + 'updatePropertyRequestType/' + hiddenPropertyID;
            console.log(sendURL);

            $.ajax({
                type: "POST",
                url: sendURL,
                data: dataForm,
                success: function(dataCheck) {
                    console.log(dataCheck);
                    $("#select2-inputGasStatus-container").html("Select Status");
                    $("#inputGasStatus").val(SelectStatus);
                    $(".getUserUtilityListContact").hide();
                    getUtilityList();
                    $("#getLoadingModalContent").removeClass('md-show');
                    UIkit.modal.alert('Utility Request Type updated Successfully');
                }
            });
        }
        
    });




    $(".btnUpdateServiceType").on('click', function() {
        var hiddenUtilityID = $("#hiddenUtilityID").val();
        var hiddenPropertyID = $("#hiddenPropertyID").val();
        var hiddenUserRegID = $("#hiddenUserRegID").val();
        var successCondition = false;
        serviceType = $("#" + this.id).attr("ref");
        console.log(serviceType + " || " + hiddenPropertyID);


        if (serviceType == "BroadBand") {
            var getBroadBandProvider = $("#select2-getBroadBandProvider-container").html();
            var dataForm = '{"ServiceType":"' + serviceType + '","Supplier":"' + getBroadBandProvider + '","UtilityID":"' + hiddenUtilityID + '","PropertyID":"' + hiddenPropertyID + '","UserRegID":"' + hiddenUserRegID + '"}';

            if (getBroadBandProvider == "Select Broadband") {
                $(".errorBroadbandInfo").show();
                $(".errorBroadbandInfo").text('* Select the BroadBand Provider');
                $(".btnUpdateServiceType").attr("disabled", true);
                return false;
            } else {
                successCondition = true;
            }
        } else if (serviceType == "Council") {
            var inputTaxAuthority = $("#select2-inputTaxAuthority-container").html();
            var dataForm = '{"ServiceType":"' + serviceType + '","Supplier":"' + inputTaxAuthority + '","UtilityID":"' + hiddenUtilityID + '","PropertyID":"' + hiddenPropertyID + '","UserRegID":"' + hiddenUserRegID + '"}';

            if (inputTaxAuthority == "Choose Council") {
                $(".errorCouncilInfo").show();
                $(".errorCouncilInfo").text('* Select the Council Tax Authority');
                $(".btnUpdateServiceType").attr("disabled", true);
                return false;
            } else {
                successCondition = true;
            }
        } else if (serviceType == "Media") {
            var getMediaProvider = $("#select2-getMediaProvider-container").html();
            var dataForm = '{"ServiceType":"' + serviceType + '","Supplier":"' + getMediaProvider + '","UtilityID":"' + hiddenUtilityID + '","PropertyID":"' + hiddenPropertyID + '","UserRegID":"' + hiddenUserRegID + '"}';

            if (getMediaProvider == "Select Media") {
                $(".errorMediaInfo").show();
                $(".errorMediaInfo").text('* Select the Media Provider');
                $(".btnUpdateServiceType").attr("disabled", true);
                return false;
            } else {
                successCondition = true;
            }
        }
        if (successCondition) {
            $("#getLoadingModalContent").addClass('md-show');
            var sendURL = domainAddress + 'UpdateUtilityServiceTypeValues/' + hiddenPropertyID;
            console.log(sendURL);
            
            $.ajax({
                type: "POST",
                url: sendURL,
                data: dataForm,
                success: function(dataCheck) {
                    console.log(dataCheck);
                    $("#getLoadingModalContent").removeClass('md-show');
                    UIkit.modal.alert('Utility Service Type updated Successfully');
                }
            });
        }



    });



}

function getUtilityLogs(editUtilityID) {
    $.get(domainAddress + "GetUtilityLogs/" + editUtilityID, {}, function(result) {
        console.log(result);
        $(".timeline").html('');
        if (result.record_count == 0) {
            $(".timeline").append('<div class="timeline_item" id="notesID-0"> <div class="timeline_icon timeline_icon_primary"><i class="material-icons">&#xE0B9;</i></div>  <div class="timeline_date">  <span>  </span>  </div>  <div class="timeline_content">No Logs found<div class="timeline_content_addon">  <blockquote> No Logs found </blockquote>  </div>  </div>    </div>');
        } else {

            for (var utilityLog in result.records) {

                $(".timeline").append('<div class="timeline_item" id="notesID-"' + result.records[utilityLog].UtilityLogID + '"> <div class="timeline_icon timeline_icon_primary"><i class="material-icons">&#xE0B9;</i></div>  <div class="timeline_date"> ' + moment(result.records[utilityLog].CreateDateTime).format('Do') + ' <span>' + moment(result.records[utilityLog].CreateDateTime).format('MMM') + '</span>  </div>  <div class="timeline_content"> ' + result.records[utilityLog].RequirementStatus + ' <div class="timeline_content_addon">  <blockquote>  ' + result.records[utilityLog].Content + ' </blockquote>  </div>  </div>    </div>');
            }
        }

    });
} //getUtilityLogs