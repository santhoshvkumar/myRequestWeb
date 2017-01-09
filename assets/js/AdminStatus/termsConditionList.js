$(".btnSubmitTermsAndCondition").click(function() {
 var termsAndConditionID = $("#hiddenTermsAndConditionID").val();
 var adminUserID = localStorage.getItem("MyRequest_AdminID");
 var termsAndCondition = encodeURI(tinyMCE.activeEditor.getContent());
 userID = localStorage.getItem("ReportUserID");
 if (termsAndCondition == "") {
     $(".errorInfo").show();
     $(".errorInfo").text("* Enter the Terms And Condition");
     $(".btnSubmitTermsAndCondition").attr("disabled", true);
     return false;
 } 
 else {
     var dataForm = '{"TermsAndCondition":"' + termsAndCondition.replace(/["']/g, "`") + '","AdminID":"' + adminUserID + '"}';
     console.log(dataForm);
     $("#getLoadingModalContent").addClass('md-show');
     if (termsAndCondition != "") {
         if (termsAndConditionID == 0) {
             var sendURL = domainAddress + 'CreateTermsAndCondition';
             console.log(sendURL);
             $.ajax({
                 type: "POST",
                 url: sendURL,
                 data: dataForm,
                 success: function(dataCheck) {
                     console.log(dataCheck);
                     UIkit.modal.alert('TermsAndCondition Created Successfully');
                     $("#getLoadingModalContent").removeClass('md-show');
                     $(".inputTinymce").hide();
                     tinyMCE.get("inputTermsAndCondition").setContent("");
                     getExistTermsAndCondition();
                 }
             });
         } else {
             var sendURL = domainAddress + 'updateTermsAndCondition/' + termsAndConditionID;
             console.log(sendURL);
             $.ajax({
                 type: "POST",
                 url: sendURL,
                 data: dataForm,
                 success: function(dataCheck) {
                     console.log(dataCheck);
                     UIkit.modal.alert('TermsAndCondition Updated Successfully');
                     $("#getLoadingModalContent").removeClass('md-show');
                     $(".inputTinymce").hide();
                     tinyMCE.get("inputTermsAndCondition").setContent("");
                     getExistTermsAndCondition();
                     $(".md-fab-wrapper").hide();
                 }
             });
         } // sec if TermsAndConditionID
     } // first if
 }
}); // #createTermsAndConditon