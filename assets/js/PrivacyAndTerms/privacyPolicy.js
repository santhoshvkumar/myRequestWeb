   $(function() {

       $('#full_screen_toggle').on('click', function(e) {
           e.preventDefault();
           screenfull.toggle();
           $window.resize();
       })

       var $switcher = $('#style_switcher'),
           $switcher_toggle = $('#style_switcher_toggle'),
           $theme_switcher = $('#theme_switcher'),
           $mini_sidebar_toggle = $('#style_sidebar_mini');

       $switcher_toggle.click(function(e) {
           e.preventDefault();
           $switcher.toggleClass('switcher_active');
       });

       $theme_switcher.children('li').click(function(e) {
           e.preventDefault();
           var $this = $(this),
               this_theme = $this.attr('data-app-theme');

           $theme_switcher.children('li').removeClass('active_theme');
           $(this).addClass('active_theme');
           $('body')
               .removeClass('app_theme_a app_theme_b app_theme_c app_theme_d app_theme_e app_theme_f app_theme_g')
               .addClass(this_theme);

           if (this_theme == '') {
               localStorage.removeItem('altair_theme');
           } else {
               localStorage.setItem("altair_theme", this_theme);
           }

       });

       // change input's state to checked if mini sidebar is active
       if ((localStorage.getItem("altair_sidebar_mini") !== null && localStorage.getItem("altair_sidebar_mini") == '1') || $('body').hasClass('sidebar_mini')) {
           $mini_sidebar_toggle.iCheck('check');
       }

       // toggle mini sidebar
       $mini_sidebar_toggle
           .on('ifChecked', function(event) {
               $switcher.removeClass('switcher_active');
               localStorage.setItem("altair_sidebar_mini", '1');
               location.reload(true);
           })
           .on('ifUnchecked', function(event) {
               $switcher.removeClass('switcher_active');
               localStorage.removeItem('altair_sidebar_mini');
               location.reload(true);
           });

       // hide style switcher
       $document.on('click keyup', function(e) {
           if ($switcher.hasClass('switcher_active')) {
               if (
                   (!$(e.target).closest($switcher).length) ||
                   (e.keyCode == 27)
               ) {
                   $switcher.removeClass('switcher_active');
               }
           }
       });

       if (localStorage.getItem("altair_theme") !== null) {
           $theme_switcher.children('li[data-app-theme=' + localStorage.getItem("altair_theme") + ']').click();
       }
   });

   var adminUserID = 0;

   $(window).load(function () {
      $("#getLoadingModalContent").removeClass('md-show');
   });

   $(document).ready(function() {
       console.log("ready call");
       adminUserID = localStorage.getItem("MyRequest_AdminID");
       var adminUserName = localStorage.getItem("MyRequest_UserName");
       var adminType = localStorage.getItem("MyRequest_AdminType");

       var businessName = localStorage.getItem("MyRequest_BusinessName");
       var lettingAgencyCode = localStorage.getItem("MyRequest_LettingAgencyCode");
       var logo = localStorage.getItem("MyRequest_Logo");
       localStorage.setItem("MyRequest_RepairStatus", "");

       var isFilled = localStorage.getItem("MyRequest_profileFill");
       if (isFilled == "true") {

           window.location.href = 'http://myrequest.co.uk/myRequestAdmin/MyProfile.html';
       }

       $(".md-overlay").css("background", "rgba(0,0,0,0.5)");
       
       if (adminUserID == "" || adminUserID == null) {
           window.location.href = "index.html";
       } else {
           $(".getUserName").text(adminUserName);
       }

       if (adminType == "SuperAdmin") {
        $(".myRequestAdminLogo").addClass("requestAdminLogo");
        $(".requestAdminLogo").removeClass("myRequestAdminLogo");
       } else {
          $("#getLoadingModalContent").addClass('md-show');
          $.get(domainAddress + "GetDateDiff/" + adminUserID, {}, function(result) {
             var getDiffDate = parseInt(result.records[0].DiffDate);
             var diffDate = 30 - getDiffDate;

             if (diffDate < -6) {
                 $("#mainBody").css("opacity", "0.1");
                 $("#mainBody").css("pointer-events", "none");
                 $("#mainBody").css("outline", "none");


                 var modulus = Math.abs(diffDate);
                 UIkit.modal.alert = function(content, options) {
                     var modal = UIkit.modal.dialog(([
                         '<div class="uk-margin uk-modal-content">' + String(content) + '<br > for immediate assitance Pls contact  <a href="mailto:enquiry@myrequest.co.uk"> Drop Us Mail </a></div>',
                         '<div class="uk-modal-footer uk-text-right">  <button class="md-btn md-btn-primary  uk-btn-CenterAlign" style="margin-top:15px;"><a href="https://dashboard.gocardless.com/api/paylinks/113KHDBWH0" style="color:#fcdb34" target="_blank">Pay Now</a></button></div>'
                     ]).join(""), UIkit.$.extend({
                         bgclose: false,
                         keyboard: false
                     }, options)).show();
                     return modal;
                 };


                 UIkit.modal.alert("You have Due by " + modulus + " days Please Pay to proceed Further", {
                     center: true
                 }).on('hide.uk.modal', function() {
                     // custome js code
                 });
                 $("#getLoadingModalContent").removeClass('md-show');
             }

            }); // End's here
           $(".myRequestAdminLogo").attr("src", domainAddressImage + logo).show();
       }

       getExistPrivacypolicy()
       $(".getLettingAgencyBusinessName").text("Privacy Policy - " + businessName + " - " + lettingAgencyCode);
   }); //ready


   function getExistPrivacypolicy() {
       $.get(domainAddress + "GetPrivacyPolicy/" + adminUserID, {}, function(result) {
           console.log(result);
           //$("#getLoadingModalContent").addClass('md-show');
           if (result.record_count == 0) {
               $("#hiddenPrivacyPolicyID").val(0);

               $(".btnSubmitPrivacyPolicy").show();
           } else {
               for (var getPrivacyPolicy in result.records) {


                   $("#hiddenPrivacyPolicyID").val(result.records[getPrivacyPolicy].PrivacyID);

               }
               // $("#getLoadingModalContent").removeClass('md-show');
               $(".btnSubmitPrivacyPolicy").hide();

           }
       });
   }
 

   $("#getAddedit").click(function() {
       // $("#getLoadingModalContent").addClass('md-show');
       $(".inputTinymce").toggle();
       tinymce.init({
           selector: "textarea",
           plugins: [
               "advlist autolink lists link image charmap print preview anchor",
               "searchreplace visualblocks code fullscreen",
               "insertdatetime media table contextmenu paste"
           ],
           toolbar: "styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",

           relative_urls: false,

           convert_urls: false,

           remove_script_host: false,

           menubar: false,
           toolbar_items_size: 'small',

           style_formats: [{
               title: 'Bold text',
               inline: 'b'
           }, {
               title: 'Red text',
               inline: 'span',
               styles: {
                   color: '#ff0000'
               }
           }, {
               title: 'Red header',
               block: 'h1',
               styles: {
                   color: '#ff0000'
               }
           }, {
               title: 'Example 1',
               inline: 'span',
               classes: 'example1'
           }, {
               title: 'Example 2',
               inline: 'span',
               classes: 'example2'
           }, {
               title: 'Table styles'
           }, {
               title: 'Table row 1',
               selector: 'tr',
               classes: 'tablerow1'
           }],



           file_browser_callback: function(field_name, url, type, win) {
               if (type == 'image') $('#my_form input').click();
           },

           onpageload: function() {
               console.log("onpageload");

           }

       }); // tinymce   

       $.get(domainAddress + "GetPrivacyPolicy/" + adminUserID, {}, function(result) {
           console.log(result);
           if (result.record_count == 0) {
               $("#hiddenPrivacyPolicyID").val(0);
           } else {
               for (var getPrivacyPolicy in result.records) {
                   console.log(result.records[getPrivacyPolicy].PrivacyPolicy);
                   content = result.records[getPrivacyPolicy].PrivacyPolicy;



                   tinyMCE.activeEditor.setContent(decodeURIComponent(result.records[getPrivacyPolicy].PrivacyPolicy), {
                       format: 'raw'
                   });

                   $("#hiddenPrivacyPolicyID").val(result.records[getPrivacyPolicy].PrivacyID);
               }
               $(".btnSubmitPrivacyPolicy").text("Update Privacy Policy");
               // $("#getLoadingModalContent").removeClass('md-show');
               $(".btnSubmitPrivacyPolicy").show();


           }
       });

   });




   $(".btnSubmitPrivacyPolicy").click(function() {
       // $("#getLoadingModalContent").addClass('md-show');
       var privacyPolicyID = $("#hiddenPrivacyPolicyID").val();
       var adminUserID = localStorage.getItem("MyRequest_AdminID");
       var privacyPolicy = encodeURI(tinyMCE.activeEditor.getContent());
       userID = localStorage.getItem("ReportUserID");
       if (privacyPolicy == "") {
           $(".errorInfo").show();
           $(".errorInfo").text("* Enter the Privacy Policy");
           $(".btnSubmitPrivacyPolicy").attr("disabled", true);
           return false;
       } else {
           var dataForm = '{"PrivacyPolicy":"' + privacyPolicy.replace(/["']/g, "`") + '","AdminID":"' + adminUserID + '"}';
           console.log(dataForm);

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

                           UIkit.modal.alert('Privacy Policy Created Successfully');
                           $(".inputTinymce").hide();
                           //  $("#getLoadingModalContent").removeClass('md-show');
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

                           UIkit.modal.alert('Privacy Policy Updated Successfully');
                           $(".inputTinymce").hide();
                           // $("#getLoadingModalContent").removeClass('md-show');
                           tinyMCE.get("inputPrivacyPolicy").setContent("");
                           getExistPrivacypolicy();
                       }
                   });
               } // sec if PrivacyPolicyID



           } // first if

       }

   }); // #createPrivacyPolicy