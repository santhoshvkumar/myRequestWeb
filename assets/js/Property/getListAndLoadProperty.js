  function getPropertyList(getValue) {
       
      var dataForm = "";
      var sendURL = "";
      if (getValue == "" || getValue == undefined) {
          dataForm = '{"Limit":"' + parseInt(userPropertyCountLimit) + '","AdminID":"' + adminUserID + '"}';
          sendURL = domainAddress + "UserPropertyByCount";
      } else {
          dataForm = '{"Limit":"' + parseInt(userPropertyCountLimit) + '","SearchValue":"' + getValue + '","AdminID":"' + adminUserID + '"}';
          sendURL = domainAddress + "SearchPropertyByCount";
      }

     var  getcountryCode = localStorage.getItem("MyRequest_countryCode");
      console.log(dataForm);  
      console.log(sendURL);
      console.log(getcountryCode);
      console.log(getcountryCode)
      if(getcountryCode == "India"){
        $("#stateLabel").text('County');
          countryID = '+91';
          console.log(countryID)
        $.get("CityState/getState.php?countryID=" + countryID, function(result) {
          $("#inputState").html('');
          $("#inputState1").html('');
          $("#inputState").html("<option value='0'>Choose State</option>");
          $("#inputState1").html("<option value='0'>Choose State</option>");
          var getResult = JSON.parse(result);
          console.log(getResult);
          for (inputState in getResult.records) {
            $("#inputState").append("<option value='" + getResult.records[inputState].StateName + "'>" + getResult.records[inputState].StateName + "</option>");
            $("#inputState1").append("<option value='" + getResult.records[inputState].StateName + "'>" + getResult.records[inputState].StateName + "</option>");

          }
          $("#inputState").select2();
          $("#inputState1").select2();

        });
      } else if(getcountryCode == "Canada"){
        $("#stateLabel").text('County');
        
          countryID = 'Canada';
          console.log(countryID)
        $.get("CityState/getState.php?countryID=" + countryID, function(result) {
          $("#inputState").html('');
          $("#inputState1").html('');
          $("#inputState").html("<option value='0'>Choose State</option>");
          $("#inputState1").html("<option value='0'>Choose State</option>");
          var getResult = JSON.parse(result);
          console.log(getResult);
          for (inputState in getResult.records) {
            $("#inputState").append("<option value='" + getResult.records[inputState].StateName + "'>" + getResult.records[inputState].StateName + "</option>");
            $("#inputState1").append("<option value='" + getResult.records[inputState].StateName + "'>" + getResult.records[inputState].StateName + "</option>");

          }
          $("#inputState").select2();
          $("#inputState1").select2();

        });
      } else if(getcountryCode == "UK"){
        $("#stateLabel").text('County');
          countryID = '+44';
          console.log(countryID)
        $.get("CityState/getState.php?countryID=" + countryID, function(result) {
          $("#inputState").html('');
          $("#inputState1").html('');
          $("#inputState").html("<option value='0'>Choose State</option>");
          $("#inputState1").html("<option value='0'>Choose State</option>");
          var getResult = JSON.parse(result);
          console.log(getResult);
          for (inputState in getResult.records) {
            $("#inputState").append("<option value='" + getResult.records[inputState].StateName + "'>" + getResult.records[inputState].StateName + "</option>");
            $("#inputState1").append("<option value='" + getResult.records[inputState].StateName + "'>" + getResult.records[inputState].StateName + "</option>");

          }
          $("#inputState").select2();
          $("#inputState1").select2();

        });
      } else if(getcountryCode == "US"){
        $("#stateLabel").text('County');
          countryID = '+1';
          console.log(countryID)
        $.get("CityState/getState.php?countryID=" + countryID, function(result) {
          $("#inputState").html('');
          $("#inputState1").html('');
          $("#inputState").html("<option value='0'>Choose State</option>");
          $("#inputState1").html("<option value='0'>Choose State</option>");
          var getResult = JSON.parse(result);
          console.log(getResult);
          for (inputState in getResult.records) {
            $("#inputState").append("<option value='" + getResult.records[inputState].StateName + "'>" + getResult.records[inputState].StateName + "</option>");
            $("#inputState1").append("<option value='" + getResult.records[inputState].StateName + "'>" + getResult.records[inputState].StateName + "</option>");

          }
          $("#inputState").select2();
          $("#inputState1").select2();

        });
      }
      $.ajax({
          type: "POST",
          url: sendURL,
          data: dataForm,
          success: function(result) {
                  console.log(result);

                  if (result.record_count == 0 && result.All_Records_Count == 0) {
                      $(".listAllAdminProperty").html('');
                      $(".listAllAdminProperty").append("<tr id='rowID-0'><td style='text-align:center; vertical-align: middle;' id='propOwnerName-0'>No Records Found</td><td style='text-align:center;vertical-align: middle;' id='propAddress-0'></td> <td style='text-align:center;vertical-align: middle;' id='propOwnerPhone-0'> </td><td style='text-align:center;vertical-align: middle;' id='propOwnerEmail-0'></td>  <td></td> <td></td> </tr>");
                  } else {
                      loadUserPropertyList(result);
                  }

                  $("#getLoadingModalContent").removeClass('md-show');
              } // ajax success
      }); // ajax POSTS
  }

  function loadUserPropertyList(result) {

      if (result.record_count == 0) {
          $("#nextPage").attr("disabled", true);
          var enterPageNO = $("#enterPageNO").val();
          enterPageNO--;
          $("#enterPageNO").val(enterPageNO);
          $("#enterPageNO").attr("disabled", true);
      } else {
          $("#enterPageNO").attr("disabled", false);
          $(".listAllAdminProperty").html('');
          if (result.record_count == result.All_Records_Count) {
              console.log("equal to 9");
              $(".pageCount").show();
              $("#nextPage").attr("disabled", "disabled");
          } else if (result.record_count < 9 && result.record_count != 0) {
              console.log("less than 9");
              $(".pageCount").show();
              $("#nextPage").attr("disabled", "disabled");
          } else if (result.record_count >= 9) {
              console.log("great than 9");
              $("#nextPage").removeAttr("disabled");
              $(".pageCount").show();
          }
          totalRecordCount = result.All_Records_Count;
          lastPage = parseInt(result.All_Records_Count / 9) + 1;
          console.log(lastPage);
          for (Property in result.records) {
              if (result.records[Property].PropOwnerName == "" || result.records[Property].PropOwnerName == null) {
                  result.records[Property].PropOwnerName = "";
              }
              $(".listAllAdminProperty").append("<tr id='rowID-" + result.records[Property].PropertyRegister + "'><td style='text-align:center;vertical-align: middle;' id='propAddress-" + result.records[Property].PropertyRegister + "'>" + result.records[Property].PropAddress + "</td><td style='text-align:center;vertical-align: middle;' id='propPostalCode-" + result.records[Property].PropertyRegister + "'>" + result.records[Property].PropPostalCode + "</td><td style='text-align:center;vertical-align: middle;' id='propOwnerEmail-" + result.records[Property].PropertyRegister + "'><a href='mailto:" + result.records[Property].PropOwnerEmail + "' target='_top'>" + result.records[Property].PropOwnerEmail + "</a> </td>  <td><a class='editProperty' id='editPropertyID-" + result.records[Property].PropertyRegister + "' > <i style='vertical-align: middle;'class='fa fa-pencil pencil fa-1x'></i> </a></td><td><a class='deleteProperty' id='deletePropertyID-" + result.records[Property].PropertyRegister + "'> <i class='fa fa-trash trash fa-1x'></i> </a></td></tr> ");

          }


          $("#getLoadingModalContent").removeClass('md-show');

          $('#propertyList').DataTable({
              createdRow: function(row) {
                  $('td', row).attr('tabindex', 0);
              }
          });

          $(".dataTables_paginate").hide();
          $(".dataTables_length").hide();
          $(".dataTables_info").hide();
          $("#propertyList_filter").hide();


          var isFourExistNo = 0;

          $(".editProperty").on('click', function(e) {


              var editPropertyID = this.id.replace('editPropertyID-', '');
              getPropertyInfo(editPropertyID);
 

          }); // editProperty


          $(".deleteProperty").on('click', function(e) {
              var deletePropertyID = this.id.replace('deletePropertyID-', '');

              UIkit.modal.confirm('Are you sure?', function() {
                  $.post(domainAddress + 'DeletePropertyRegister/' + deletePropertyID, function(e) {
                      console.log(e);
                      $("#rowID-" + deletePropertyID).remove();
                      getPropertyList(getValue);
                      UIkit.modal.alert('Property Deleted Successfully');
                  });
              });

          }); // deleteProperty

      }

  }