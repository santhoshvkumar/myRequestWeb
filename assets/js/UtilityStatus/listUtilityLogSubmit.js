function listUtilityLogSubmit() {
     
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
        var hiddenUserRegID = localStorage.getItem("UtilityUserID");
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
                    if (getSelectedType == "Gas") {
                        $("#inputGasInfo").val(0);
                        $("#select2-inputGasInfo-container").html("Action");
                        $("#inputGasNotes").val('');
                    }

                    if (getSelectedType == "Electricity") {
                        $("#inputElectricityInfo").val(0);
                        $("#select2-inputElectricityInfo-container").html("Action");
                        $("#inputElectricityNotes").val('');
                    }

                    if (getSelectedType == "Council") {
                        $("#inputCouncilInfo").val(0);
                        $("#select2-inputCouncilInfo-container").html("Action");
                        $("#inputCouncilNotes").val('');
                    }

                    if (getSelectedType == "Water") {
                        $("#inputWaterActionInfo").val(0);
                        $("#select2-inputWaterActionInfo-container").html("Action");
                        $("#inputWaterNotes").val('');
                    }

                    if (getSelectedType == "BroadBand") {
                        $("#inputBroadbandInfo").val(0);
                        $("#select2-inputBroadbandInfo-container").html("Action");
                        $("#inputBroadbandNotes").val('');
                    }

                    if (getSelectedType == "Media") {
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


    $("#inputSupplierGasEdit").on('change', function() {
        var inputSupplierGasEdit = $("#inputSupplierGasEdit").val();
        if (inputSupplierGasEdit == 0) {
            $(".errorGasInfo").show();
            $(".errorGasInfo").text('* Select the Service Provider');
            $(".btnUpdateUtilityServiceType").attr("disabled", true);
            return false;
        } else {
            $(".errorGasInfo").hide();
            $(".errorGasInfo").text('');
            $(".btnUpdateUtilityServiceType").attr("disabled", false);

        }
    });

    $("#inputSupplierElectricityEdit").on('change', function() {
        var inputSupplierElectricityEdit = $("#inputSupplierElectricityEdit").val();
        if (inputSupplierElectricityEdit == 0) {
            $(".errorElectricityInfo").show();
            $(".errorElectricityInfo").text('* Select the Service Provider');
            $(".btnUpdateUtilityServiceType").attr("disabled", true);
            return false;
        } else {
            $(".errorElectricityInfo").hide();
            $(".errorElectricityInfo").text('');
            $(".btnUpdateUtilityServiceType").attr("disabled", false);

        }
    });

    $("#inputTaxAuthorityEdit").on('change', function() {
        var inputTaxAuthorityEdit = $("#inputTaxAuthorityEdit").val();
        if (inputTaxAuthorityEdit == 0) {
            $(".errorCouncilInfo").show();
            $(".errorCouncilInfo").text('* Select the Service Provider');
            $(".btnUpdateUtilityServiceType").attr("disabled", true);
            return false;
        } else {
            $(".errorCouncilInfo").hide();
            $(".errorCouncilInfo").text('');
            $(".btnUpdateUtilityServiceType").attr("disabled", false);

        }
    });


    $("#inputWaterAuthorityEdit").on('change', function() {
        var inputWaterAuthorityEdit = $("#inputWaterAuthorityEdit").val();
        if (inputWaterAuthorityEdit == 0) {
            $(".errorWaterInfo").show();
            $(".errorWaterInfo").text('* Select the Service Provider');
            $(".btnUpdateUtilityServiceType").attr("disabled", true);
            return false;
        } else {
            $(".errorWaterInfo").hide();
            $(".errorWaterInfo").text('');
            $(".btnUpdateUtilityServiceType").attr("disabled", false);

        }
    });

    $("#inputBroadbandEdit").on('change', function() {
        var inputBroadbandEdit = $("#inputBroadbandEdit").val();
        if (inputBroadbandEdit == 0) {
            $(".errorBroadbandInfo").show();
            $(".errorBroadbandInfo").text('* Select the Service Provider');
            $(".btnUpdateUtilityServiceType").attr("disabled", true);
            return false;
        } else {
            $(".errorBroadbandInfo").hide();
            $(".errorBroadbandInfo").text('');
            $(".btnUpdateUtilityServiceType").attr("disabled", false);

        }
    });

    $("#inputMediaEdit").on('change', function() {
        var inputMediaEdit = $("#inputMediaEdit").val();
        if (inputMediaEdit == 0) {
            $(".errorMediaInfo").show();
            $(".errorMediaInfo").text('* Select the Service Provider');
            $(".btnUpdateUtilityServiceType").attr("disabled", true);
            return false;
        } else {
            $(".errorMediaInfo").hide();
            $(".errorMediaInfo").text('');
            $(".btnUpdateUtilityServiceType").attr("disabled", false);

        }
    });



    $(".btnUpdateUtilityServiceType").on('click', function() {
        var hiddenUtilityID = $("#hiddenUtilityID").val();
        var hiddenPropertyID = $("#hiddenPropertyID").val();
        var hiddenUserRegID = localStorage.getItem("UtilityUserID");
        var successCondition = false;
        var dataUpdateUtilityServiceTypeForm = "";
        if (serviceType == "Gas") {
            var inputSupplierGasEdit = $("#select2-inputSupplierGasEdit-container").html();
            dataUpdateUtilityServiceTypeForm = '{"ServiceType":"' + serviceType + '","Supplier":"' + inputSupplierGasEdit + '","UtilityID":"' + hiddenUtilityID + '","PropertyID":"' + hiddenPropertyID + '","UserRegID":"' + hiddenUserRegID + '"}';
            $("#gasSuppliers").text(inputSupplierGasEdit);
            if (inputSupplierGasEdit == "Select Provider") {
                $(".errorGasInfo").show();
                $(".errorGasInfo").text('* Select the Service Provider');
                $(".btnUpdateUtilityServiceType").attr("disabled", true);
                return false;
            } else {
                successCondition = true;
            }

        } else if (serviceType == "Electricity") {
            var inputSupplierElectricityEdit = $("#select2-inputSupplierElectricityEdit-container").html();
            dataUpdateUtilityServiceTypeForm = '{"ServiceType":"' + serviceType + '","Supplier":"' + inputSupplierElectricityEdit + '","UtilityID":"' + hiddenUtilityID + '","PropertyID":"' + hiddenPropertyID + '","UserRegID":"' + hiddenUserRegID + '"}';
            $("#electricitySupplier").text(inputSupplierElectricityEdit);
            if (inputSupplierElectricityEdit == "Select Provider") {
                $(".errorElectricityInfo").show();
                $(".errorElectricityInfo").text('* Select the Service Provider');
                $(".btnUpdateUtilityServiceType").attr("disabled", true);
                return false;
            } else {
                successCondition = true;
            }
        } else if (serviceType == "Council") {
            var inputTaxAuthorityEdit = $("#select2-inputTaxAuthorityEdit-container").html();
            dataUpdateUtilityServiceTypeForm = '{"ServiceType":"' + serviceType + '","Supplier":"' + inputTaxAuthorityEdit + '","UtilityID":"' + hiddenUtilityID + '","PropertyID":"' + hiddenPropertyID + '","UserRegID":"' + hiddenUserRegID + '"}';
            $("#councilAuthority").text(inputTaxAuthorityEdit);
            if (inputTaxAuthorityEdit == "Choose Council") {
                $(".errorCouncilInfo").show();
                $(".errorCouncilInfo").text('* Select the Service Provider');
                $(".btnUpdateUtilityServiceType").attr("disabled", true);
                return false;
            } else {
                successCondition = true;
            }
        } else if (serviceType == "Water") {
            var inputWaterAuthorityEdit = $("#select2-inputWaterAuthorityEdit-container").html();
            dataUpdateUtilityServiceTypeForm = '{"ServiceType":"' + serviceType + '","Supplier":"' + inputWaterAuthorityEdit + '","UtilityID":"' + hiddenUtilityID + '","PropertyID":"' + hiddenPropertyID + '","UserRegID":"' + hiddenUserRegID + '"}';

            $("#waterAuthority").text(inputWaterAuthorityEdit);
            if (inputWaterAuthorityEdit == "Select Provider") {
                $(".errorWaterInfo").show();
                $(".errorWaterInfo").text('* Select the Service Provider');
                $(".btnUpdateUtilityServiceType").attr("disabled", true);
                return false;
            } else {
                successCondition = true;
            }

        } else if (serviceType == "BroadBand") {
            var inputBroadbandEdit = $("#select2-inputBroadbandEdit-container").html();
            dataUpdateUtilityServiceTypeForm = '{"ServiceType":"' + serviceType + '","Supplier":"' + inputBroadbandEdit + '","UtilityID":"' + hiddenUtilityID + '","PropertyID":"' + hiddenPropertyID + '","UserRegID":"' + hiddenUserRegID + '"}';
            $("#getBroadBandProvider").text(inputBroadbandEdit);
            if (inputBroadbandEdit == "Select Provider") {
                $(".errorBroadbandInfo").show();
                $(".errorBroadbandInfo").text('* Select the Service Provider');
                $(".btnUpdateUtilityServiceType").attr("disabled", true);
                return false;
            } else {
                successCondition = true;
            }
        } else if (serviceType == "Media") {
            var inputMediaEdit = $("#select2-inputMediaEdit-container").html();
            dataUpdateUtilityServiceTypeForm = '{"ServiceType":"' + serviceType + '","Supplier":"' + inputMediaEdit + '","UtilityID":"' + hiddenUtilityID + '","PropertyID":"' + hiddenPropertyID + '","UserRegID":"' + hiddenUserRegID + '"}';
            $("#getMediaProvider").text(inputMediaEdit);
            if (inputMediaEdit == "Select Provider") {
                $(".errorMediaInfo").show();
                $(".errorMediaInfo").text('* Select the Service Provider');
                $(".btnUpdateUtilityServiceType").attr("disabled", true);
                return false;
            } else {
                successCondition = true;
            }

        }

        if(successCondition){
            var sendURL = domainAddress + 'UpdateUtilityServiceTypeValues/' + hiddenPropertyID;
            console.log(dataUpdateUtilityServiceTypeForm);
            console.log(sendURL);
            $("#getLoadingModalContent").addClass('md-show');
            $.ajax({
                type: "POST",
                url: sendURL,
                data: dataUpdateUtilityServiceTypeForm,
                success: function(dataCheck) {
                    console.log(dataCheck);
                    if (serviceType == "Gas") {
                        $("#inputSupplierGasEdit").val(0);
                        $("#select2-inputSupplierGasEdit-container").html("Select Provider");
                    }
                    
                    if (serviceType == "Electricity") {
                        $("#inputSupplierElectricityEdit").val(0);
                        $("#select2-inputSupplierElectricityEdit-container").html("Select Provider");
                    }

                    if (serviceType == "Council") {
                        $("#inputTaxAuthorityEdit").val(0);
                        $("#select2-inputTaxAuthorityEdit-container").html("Choose Council");
                    }
                    
                    if (serviceType == "Council") {
                        $("#inputWaterAuthorityEdit").val(0);
                        $("#select2-inputWaterAuthorityEdit-container").html("Select Provider");
                    }

                    if (serviceType == "Media") {
                        $("#inputMediaEdit").val(0);
                        $("#select2-inputMediaEdit-container").html("Select Provider");
                    }

                    if (serviceType == "BroadBand") {
                        $("#inputBroadbandEdit").val(0);
                        $("#select2-inputBroadbandEdit-container").html("Select Provider");
                    }
                    getUtilityLogs(hiddenUtilityID);
                    $("#getLoadingModalContent").removeClass('md-show');
                    UIkit.modal.alert('Utility Service Type updated Successfully');
                }
            });
        }
    });
}


function getUtilityLogs(editUtilityID) {
    $("#getLoadingModalContent").addClass('md-show');
    $.get(domainAddress + "GetUtilityLogs/" + editUtilityID, {}, function(result) {
        //console.log(result);
        $(".timeline").html('');
        if (result.record_count == 0) {
            $("#getLoadingModalContent").removeClass('md-show');
            $(".timeline").append('<div class="timeline_item" id="notesID-0"> <div class="timeline_icon timeline_icon_primary"><i class="material-icons">&#xE0B9;</i></div>  <div class="timeline_date">  <span>  </span>  </div>  <div class="timeline_content">No Logs found<div class="timeline_content_addon">  <blockquote> No Logs found </blockquote>  </div>  </div>    </div>');
        } else {
            var getUtilityType = "";
            for (var utilityLog in result.records) {
                if(result.records[utilityLog].UtilityType==null || result.records[utilityLog].UtilityType=="null"){
                    getUtilityType = "";
                }
                else{
                    getUtilityType = ' For '+ result.records[utilityLog].UtilityType;
                }
                $(".timeline").append('<div class="timeline_item" id="notesID-"' + result.records[utilityLog].UtilityLogID + '"> <div class="timeline_icon timeline_icon_primary"><i class="material-icons">&#xE0B9;</i></div>  <div class="timeline_date"> ' + moment(result.records[utilityLog].CreateDateTime).format('Do') + ' <span>' + moment(result.records[utilityLog].CreateDateTime).format('MMM') + '</span>  </div>  <div class="timeline_content"> ' + result.records[utilityLog].RequirementStatus + getUtilityType+' <div class="timeline_content_addon">  <blockquote>  ' + result.records[utilityLog].Content + '</blockquote>  </div>  </div>    </div>');
            }


            $("#getLoadingModalContent").removeClass('md-show');

        }

    });
} //getUtilityLogs