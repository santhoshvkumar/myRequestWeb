function utilityLogSubmit() {
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
            var dataForm = '{"UtilityID":"' + hiddenUtilityID + '","PropertyID":"' + hiddenPropertyID + '","UserRegID":"' + hiddenUserRegID + '","Notes":"' + inputNotes + '","ActionTaken":"' + actionTaken + '","UtilityType":"' + getSelectedType + '"}';
            console.log(dataForm);
            $("#getLoadingModalContent").addClass('md-show');
            var sendURL = domainAddress + 'CreateUtilityAgentLog';
            console.log(sendURL);

            $.ajax({
                type: "POST",
                url: sendURL,
                data: dataForm,
                success: function(dataCheck) {
                    console.log(dataCheck);
                    $("#inputGasInfo").val(0);
                    $("#select2-inputGasInfo-container").html("Action");
                    $("#inputGasNotes").val('');
                    $("#inputElectricityInfo").val(0);
                    $("#select2-inputElectricityInfo-container").html("Action");
                    $("#inputElectricityNotes").val('');
                    $("#inputCouncilInfo").val(0);
                    $("#select2-inputCouncilInfo-container").html("Action");
                    $("#inputCouncilNotes").val('');
                    $("#inputWaterActionInfo").val(0);
                    $("#select2-inputWaterActionInfo-container").html("Action");
                    $("#inputWaterNotes").val('');
                    $("#inputBroadbandInfo").val(0);
                    $("#select2-inputBroadbandInfo-container").html("Action");
                    $("#inputBroadbandNotes").val('');
                    $("#inputMediaInfo").val(0);
                    $("#select2-inputMediaInfo-container").html("Action");
                    $("#inputMediaNotes").val('');
                    getUtilityList();
                    getListPropertyUtilityLogs(hiddenPropertyID);
                    UIkit.modal.alert('Utility Log Created Successfully');
                    
                    //window.location = '';
                    $("#getLoadingModalContent").removeClass('md-show');
                    //setTimeout( function ( ) { alert( "moo" ); }, 10000 );
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
            var getUtilityType = "";
            for (var utilityLog in result.records) {
                if(result.records[utilityLog].UtilityType==null || result.records[utilityLog].UtilityType=="null"){
                    getUtilityType = "";
                }
                else{
                    getUtilityType = ' For '+ result.records[utilityLog].UtilityType;
                }
                $(".timeline").append('<div class="timeline_item" id="notesID-"' + result.records[utilityLog].UtilityLogID + '"> <div class="timeline_icon timeline_icon_primary"><i class="material-icons">&#xE0B9;</i></div>  <div class="timeline_date"> ' + moment(result.records[utilityLog].CreateDateTime).format('Do') + ' <span>' + moment(result.records[utilityLog].CreateDateTime).format('MMM') + '</span>  </div>  <div class="timeline_content"> ' + result.records[utilityLog].RequirementStatus + getUtilityType+' <div class="timeline_content_addon">  <blockquote>  ' + result.records[utilityLog].Content + ' </blockquote>  </div>  </div>    </div>');
            }
        }

    });
} //getUtilityLogs



function getListPropertyUtilityLogs(editPropertyID){
     var getUtilityType = "";
     $(".timeline").html('');
     $.get(domainAddress + "GetUserUtilityID/" + editPropertyID, {}, function(result) {

            // Getting Gas content and status
            var gascontent = '';
            var gasrequirementstatus = '';
            var gascount = 0;
            
            // Getting Electricity content and status
            var electricitycontent = '';
            var electricityrequirementstatus = '';
            var electricitycount = 0;

            // Getting Council content and status
            var councilcontent = '';
            var councilrequirementstatus = '';
            var councilcount = 0;

            // Getting Water content and status
            var watercontent = '';
            var waterrequirementstatus = '';
            var watercount = 0;

            // Getting Broadband content and status
            var broadbandcontent = '';
            var broadbandrequirementstatus = '';
            var broadbandcount = 0;

            // Getting Media content and status
            var mediacontent = '';
            var mediarequirementstatus = '';
            var mediacount = 0;

       for (var getUtility in result.records) {
         
           
        if (result.records[getUtility].Utility == undefined) {
            $(".timeline").append('<div class="timeline_item" id="notesID-0"> <div class="timeline_icon timeline_icon_primary"><i class="material-icons">&#xE0B9;</i></div>  <div class="timeline_date">  <span>  </span>  </div>  <div class="timeline_content">No Logs found<div class="timeline_content_addon">  <blockquote> No Logs found </blockquote>  </div>  </div>    </div>');
        } else {
             for (var utilityLog in result.records[getUtility].Utility) {

                 var allutilityTypes = result.records[getUtility].Utility[utilityLog].UtilityType;
                 var allcontent = result.records[getUtility].Utility[utilityLog].Content;
                 var allrequirementStatus = result.records[getUtility].Utility[utilityLog].RequirementStatus;
                 
                 if((allutilityTypes == 'Gas') && (gascount == 0)) {
                     gascontent = allcontent;
                     gasrequirementstatus = allrequirementStatus;
                     gascount++;
                 }
                 if((allutilityTypes == 'Electricity') && (electricitycount == 0)) {
                     electricitycontent = allcontent;
                     electricityrequirementstatus = allrequirementStatus;
                     electricitycount++;
                 }
                 if((allutilityTypes == 'Council') && (councilcount == 0)){
                     councilcontent = allcontent;
                     councilrequirementstatus = allrequirementStatus;
                     councilcount++;
                 }
                 if((allutilityTypes == 'Water') && (councilcount == 0)){
                     watercontent = allcontent;
                     waterrequirementstatus = allrequirementStatus;
                     watercount++;
                 }
                 if((allutilityTypes == 'Broadband') && (councilcount == 0)){
                     broadbandcontent = allcontent;
                     broadbandrequirementstatus = allrequirementStatus;
                     broadbandcount++;
                 }
                 if((allutilityTypes == 'Media') && (councilcount == 0)){
                     mediacontent = allcontent;
                     mediarequirementstatus = allrequirementStatus;
                     mediacount++;
                 }
                  if(result.records[getUtility].Utility[utilityLog].UtilityType==null || result.records[getUtility].Utility[utilityLog].UtilityType=="null"){
                      getUtilityType = "";
                      //alert(getUtilityType);
                  }
                  else{
                      getUtilityType = ' For '+ result.records[getUtility].Utility[utilityLog].UtilityType;
                      //getUtilityType1 = result.records[getUtility].Utility[utilityLog].UtilityType;
                  }
                  $(".timeline").append('<div class="timeline_item" id="notesID-"' + result.records[getUtility].Utility[utilityLog].UtilityLogID + '"> <div class="timeline_icon timeline_icon_primary"><i class="material-icons">&#xE0B9;</i></div>  <div class="timeline_date"> ' + moment(result.records[getUtility].Utility[utilityLog].CreateDateTime).format('Do') + ' <span>' + moment(result.records[getUtility].Utility[utilityLog].CreateDateTime).format('MMM') + '</span>  </div>  <div class="timeline_content"> ' + result.records[getUtility].Utility[utilityLog].RequirementStatus + getUtilityType+' <div class="timeline_content_addon">  <blockquote>  ' + result.records[getUtility].Utility[utilityLog].Content + '</blockquote>  </div>  </div>    </div>'); 
            }
          }
            //Gas Details

            $("#select2-inputGasInfo-container").attr('title', gasrequirementstatus);
            $("#select2-inputGasInfo-container").html(gasrequirementstatus);
            $("#inputGasNotes").val(gascontent);

            //Electricity Details

            $("#select2-inputElectricityInfo-container").attr('title', electricityrequirementstatus);
            $("#select2-inputElectricityInfo-container").html(electricityrequirementstatus);
            $("#inputElectricityNotes").val(electricitycontent);

            //Council Details
            
            $("#select2-inputCouncilInfo-container").attr('title', councilrequirementstatus);
            $("#select2-inputCouncilInfo-container").html(councilrequirementstatus);
            $("#inputCouncilNotes").val(councilcontent);

            //Water & Sewerage Details
            
            $("#select2-inputWaterActionInfo-container").attr('title', waterrequirementstatus);
            $("#select2-inputWaterActionInfo-container").html(waterrequirementstatus);
            $("#inputWaterNotes").val(watercontent);

            //Broadband Details
            
            $("#select2-inputBroadbandInfo-container").attr('title', broadbandrequirementstatus);
            $("#select2-inputBroadbandInfo-container").html(broadbandrequirementstatus);
            $("#inputBroadbandNotes").val(broadbandcontent);

            //Media Details
            
            $("#select2-inputMediaInfo-container").attr('title', mediarequirementstatus);
            $("#select2-inputMediaInfo-container").html(mediarequirementstatus);
            $("#inputMediaNotes").val(mediacontent);
        } 
     });
   }