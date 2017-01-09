function getUtilityRoleList(){
  var dataForm = '{"Limit":"'+parseInt(utilityRoleCountLimit)+'"}';
  console.log(dataForm);
  var sendURL = domainAddress+"UtilityRoleListByCount";
  console.log(sendURL);
    
  $.ajax({
      type: "POST",
      url: sendURL,
      data: dataForm,
      success: function (result) {
         console.log(result); 
          
         if(result.record_count==0  && result.All_Records_Count == 0){
           $(".allRoleList").html('');
             $(".allRoleList").append("<tr id='rowID-0'> <td class='getSpecialityID' id='inputUtilityRoleName-0'>No Records found</td> <td> </td> <td> </td></tr>  ");
         }
         else{
              loadUtilityRoleList(result);
              
         }
         
          
      } // ajax success
  }); // ajax POSTS
} // getContractorsList


function loadUtilityRoleList(resultAllUtilityRole){

  if(resultAllUtilityRole.record_count == 0){
      $("#nextPage").attr("disabled",true);
      var enterPageNO = $("#enterPageNO").val();
      enterPageNO--;
      $("#enterPageNO").val(enterPageNO);
      $("#enterPageNO").attr("disabled",true);
  }
  else{
      $("#enterPageNO").attr("disabled",false);
      $(".allRoleList").html('');
      if(resultAllUtilityRole.record_count == resultAllUtilityRole.All_Records_Count ){ 
          console.log("equal to 9");
          $("#nextPage").attr("disabled","disabled");
      }
      else if(resultAllUtilityRole.record_count < 9 && resultAllUtilityRole.record_count != 0 ){ 
          console.log("less than 9");
          $("#nextPage").attr("disabled","disabled");
      }
      else if(resultAllUtilityRole.record_count >= 9){  
          console.log("great than 9");
          $("#nextLastPage").removeAttr("disabled");
          
      } 
      lastPage = parseInt(resultAllUtilityRole.All_Records_Count/ 9) + 1;
      console.log(lastPage);

      for(role in resultAllUtilityRole.records){
          $(".allRoleList").append("<tr id='rowID-"+resultAllUtilityRole.records[role].UtilityRoleID+"'> <td class='getSpecialityID' id='inputUtilityRoleName-"+resultAllUtilityRole.records[role].UtilityRoleID+"'>"+resultAllUtilityRole.records[role].UtilityRole+"</td> <td><a class='editUtilityRole' id='editUtilityRoleID-"+resultAllUtilityRole.records[role].UtilityRoleID+"'> <i class='fa fa-pencil pencil fa-1x' ></i> </a></td><td><a class='deleteUtilityRole' id='deleteUtilityRoleID-"+resultAllUtilityRole.records[role].UtilityRoleID+"'  > <i class='fa fa-trash trash fa-1x'></i> </a></td></tr>  ");
      }

       $(".editUtilityRole").on('click',function(e){
                $(".md-input-wrapper").addClass("md-input-filled");
                  
                editUtilityRoleID = this.id.replace('editUtilityRoleID-','');
                $("#hiddenUtilityRoleID").val(editUtilityRoleID);
                var utilityRoleName = $("#inputUtilityRoleName-"+editUtilityRoleID).text();
               
                $("#inputRoleName").val(utilityRoleName);
                 
                $(".btnSubmitRole").text("Update Role");
          }); 

          $(".deleteUtilityRole").on('click',function(e){
            var getUtilityRoleID = this.id.replace('deleteUtilityRoleID-','');

            UIkit.modal.confirm('Do you want to delete the Role?', function(){ 
              $.post(domainAddress+'DeleteUtilityRole/'+getUtilityRoleID,function(e){
                  console.log(e);
                  $("#rowID-"+getUtilityRoleID).remove();
                  getUtilityRoleList();
                  UIkit.modal.alert('Role Deleted Successfully');
              }); 
            });

          });  // deleteUtilityRole

      }

  }

  
   $("#inputRoleName").keyup(function(){
      var inputRoleName = $("#inputRoleName").val();
      if(inputRoleName == ""){
          $(".errorInfo").show();
          $("#inputRoleName").css("border-color","red");
          $(".errorInfo").text("* Enter the  Role Name");
          $(".btnSubmitRole").attr("disabled",true);
          return false;
      }
      else{
          $(".errorInfo").hide();
          $(".errorInfo").text("");
          $("#inputRoleName").css("border-color","rgba(0,0,0,.12)");
          $(".btnSubmitRole").attr("disabled",false);
      }
  });



  $(".btnSubmitRole").click(function(){
      var hiddenUtilityRoleID = $("#hiddenUtilityRoleID").val();
      var inputRoleName = $("#inputRoleName").val();

      if (inputRoleName == "") {
          $(".errorInfo").show();
          $(".errorInfo").text("* Enter the Role Name");
          $("#inputRoleName").css("border-color","red");
          $(".btnSubmitRole").attr("disabled", true);
          return false;
       }

       else {

           var dataForm = '{"UtilityRoleName":"' + inputRoleName + '"}';
           console.log(dataForm);

           if (inputRoleName != "") {
               if (hiddenUtilityRoleID == 0) {
                   var sendURL = domainAddress + 'CreateUtilityRole';
                   console.log(sendURL);
                   $.ajax({
                       type: "POST",
                       url: sendURL,
                       data: dataForm,
                       success: function(dataCheck) {
                           console.log(dataCheck);
                           $("#inputRoleName").val('');
                           getUtilityRoleList();
                           UIkit.modal.alert('Role Created Successfully');
                       }
                   });
               } else {
                   var sendURL = domainAddress + 'UpdateUtilityRole/' + hiddenUtilityRoleID;
                   console.log(sendURL);
                   $.ajax({
                       type: "POST",
                       url: sendURL,  
                       data: dataForm,
                       success: function(dataCheck) {
                          console.log(dataCheck);
                           $("#inputRoleName").val('');
                           $(".btnSubmitRole").text("Add Role");
                           getUtilityRoleList();
                           UIkit.modal.alert('Role Updated Successfully');
                       }
                   });
               } // sec if specialityID

               $(".md-input-wrapper").removeClass("md-input-filled");
               

           } // first if

       }

  });


$("#leftArrow").click(function(){
    utilityRoleCountLimit = 0;
    maxProp=1;
    $("#enterPageNO").val(1);
    getUtilityRoleList();
    if(maxProp<lastPage){
        $("#nextPage").attr("disabled",false);
    }
});

 $("#rightArrow").click(function(){
    $("#previousPage").removeAttr("disabled");
    utilityRoleCountLimit = (9*lastPage)-9;
    maxProp = lastPage;
    $("#enterPageNO").val(lastPage);
    getUtilityRoleList();
 });

$("#previousPage").click(function(){
    //console.log("inital count : "+utilityRoleCountLimit);
    if(utilityRoleCountLimit == 0)
    {
      utilityRoleCountLimit = 0;
       $("#previousPage").attr("disabled","disabled");
    }
    else
    {
      utilityRoleCountLimit -= 9;
      $("#previousPage").removeAttr("disabled");
    }
    
    if(utilityRoleCountLimit == 0)
    {
      $("#previousPage").attr("disabled","disabled");
    }
    maxProp--;
    if(maxProp==0){
        $("#enterPageNO").val('');
    }
    else{   
        $("#enterPageNO").val(maxProp);
    }
    
    getUtilityRoleList();
 });

   
 $("#nextPage").click(function(){
    //console.log("next inital count : "+utilityRoleCountLimit);
    $("#previousPage").removeAttr("disabled");
    utilityRoleCountLimit += 9;
    //console.log("next count : "+utilityRoleCountLimit);
    
    if(maxProp==lastPage){
        $("#nextPage").attr("disabled",true);
    }
    else{
        $("#nextPage").attr("disabled",false);
        maxProp++;
        $("#enterPageNO").val(maxProp);
        if(maxProp<=lastPage){
            getUtilityRoleList();
        }
    }

 });



 $("#enterPageNO").on("change",function(e){
     console.log("THis is called"+$("#enterPageNO").val());
     if( $("#enterPageNO").val() < lastPage){
        maxProp++;
        $("#enterPageNO").val(maxProp);
     }
     
    console.log("next inital count : " + utilityRoleCountLimit+ " page # : "+maxProp);
    utilityRoleCountLimit = 9*($("#enterPageNO").val()-1);
    console.log("change count : " + utilityRoleCountLimit);
    
    getUtilityRoleList();
 });

 $("#enterPageNO").keyup(function(){
     console.log("THis is called "+$("#enterPageNO").val());
     if( $("#enterPageNO").val() < lastPage){
        maxProp++;
        $("#enterPageNO").val(maxProp);
     }
     
    console.log("next inital count : " + utilityRoleCountLimit+ " page # : "+maxProp);
    utilityRoleCountLimit = 9*($("#enterPageNO").val()-1);
    console.log("change count : " + utilityRoleCountLimit);
    
    getUtilityRoleList();
 });

