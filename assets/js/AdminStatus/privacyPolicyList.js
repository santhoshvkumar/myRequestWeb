$("#inputTitle").on('change',function(){
    var inputTitle = $("#inputTitle").val();
    if(inputTitle==""){
        $(".help-block").css('color','red');
        $(".help-block").show();
        $(".help-block").text("* Select the Title");
        $(".btnUpdate").attr("disabled",true);
        return false;
    }
    else{
        $(".help-block").hide();
        $(".help-block").text("");
        $(".btnUpdate").attr("disabled",false);
    }
});

$(".btnSubmitPrivacyPolicy").click(function() {
     var privacyPolicyID = $("#hiddenPrivacyPolicyID").val();
     var adminUserID = localStorage.getItem("MyRequest_AdminID");
     var privacyPolicy = encodeURI(tinyMCE.activeEditor.getContent());
     userID = localStorage.getItem("ReportUserID");
     if (privacyPolicy == "") {
         $(".errorInfo").show();
         $(".errorInfo").text("* Enter the Privacy Policy");
         $(".btnSubmitPrivacyPolicy").attr("disabled", true);
         return false;
     } 
     else {
         var dataForm = '{"PrivacyPolicy":"' + privacyPolicy.replace(/["']/g, "`") + '","AdminID":"' + adminUserID + '"}';
         console.log(dataForm);
         $("#getLoadingModalContent").addClass('md-show');
         if (privacyPolicy != "") {
             if (privacyPolicyID == 0) {
                 var sendURL = domainAddress + 'CreatePrivacyPolicy';
                 console.log(sendURL);
                 $.ajax({
                     type: "POST",
                     url: sendURL,
                     data: dataForm,
                     success: function(dataCheck) {
                         console.log(dataCheck);
                         $("#getLoadingModalContent").removeClass('md-show');
                         UIkit.modal.alert('Privacy Policy Created Successfully');
                         $(".inputTinymce").hide();
                         tinyMCE.get("inputPrivacyPolicy").setContent("");
                         getExistPrivacypolicy();
                     }
                 });
             } else {
                      
                 var sendURL = domainAddress + 'UpdatePrivacyPolicy/' + privacyPolicyID;
                 console.log(sendURL);
                 $.ajax({
                     type: "POST",
                     url: sendURL,
                     data: dataForm,
                     success: function(dataCheck) {
                        console.log(dataCheck);
                        $("#getLoadingModalContent").removeClass('md-show');
                        UIkit.modal.alert('Privacy Policy Updated Successfully');
                        $(".inputTinymce").hide();
                        tinyMCE.get("inputPrivacyPolicy").setContent("");
                        getExistPrivacypolicy();
                        $(".md-fab-wrapper").hide();
                     }
                 });
             } // sec if PrivacyPolicyID

                    

         } // first if

     }

 }); // #createPrivacyPolicy