$(function() {
        $('#full_screen_toggle').on('click',function(e) {
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

            if(this_theme == '') {
                localStorage.removeItem('altair_theme');
            } else {
                localStorage.setItem("altair_theme", this_theme);
            }

        });

        // change input's state to checked if mini sidebar is active
        if((localStorage.getItem("altair_sidebar_mini") !== null && localStorage.getItem("altair_sidebar_mini") == '1') || $('body').hasClass('sidebar_mini')) {
            $mini_sidebar_toggle.iCheck('check');
        }

        // toggle mini sidebar
        $mini_sidebar_toggle
            .on('ifChecked', function(event){
                $switcher.removeClass('switcher_active');
                localStorage.setItem("altair_sidebar_mini", '1');
                location.reload(true);
            })
            .on('ifUnchecked', function(event){
                $switcher.removeClass('switcher_active');
                localStorage.removeItem('altair_sidebar_mini');
                location.reload(true);
            });

        // hide style switcher
        $document.on('click keyup', function(e) {
            if( $switcher.hasClass('switcher_active') ) {
                if (
                    ( !$(e.target).closest($switcher).length )
                    || ( e.keyCode == 27 )
                ) {
                    $switcher.removeClass('switcher_active');
                }
            }
        });

        if(localStorage.getItem("altair_theme") !== null) {
            $theme_switcher.children('li[data-app-theme='+localStorage.getItem("altair_theme")+']').click();
        }
    });

    var enqiuryListCountLimit = 0;
    var getValue = "";
    var adminUserID = 0;

    $(document).ready(function(){
        console.log("ready call");
        var adminUserID = localStorage.getItem("MyRequest_AdminID");
        var adminUserName = localStorage.getItem("MyRequest_UserName");
        var adminType = localStorage.getItem("MyRequest_AdminType");

         if(adminUserID == "" || adminUserID == null){
            window.location.href="index.html";
        }
        else{
            $(".getUserName").text(adminUserName);
            $(".getLettingAgencyBusinessName").text("Enquiry");
        }
        
        getAllNewAdminList();
        getEnquiryList(getValue);
        $(".forSuperAdmin").show();


         if (adminType == "SuperAdmin") {

           
            $(".myRequestLogo").addClass("requestLogo");
         }
         else{
             $(".myRequestLogo").removeClass("requestLogo");
         }
           $(".md-overlay").css("background","rgba(0,0,0,0.5)");
           //  $("#getLoadingModalContent").addClass('md-show');
     }); // ready
    function zeroPad(num, places) {
      var zero = places - num.toString().length + 1;
      return Array(+(zero > 0 && zero)).join("0") + num;
    }

    $(".btnSearch").click(function () {
        getValue = $("#inputSearch").val();
        getEnquiryList(getValue);
    });

    function getEnquiryList(getValue){
        var dataForm = '{"Limit":"'+parseInt(enqiuryListCountLimit)+'","SearchValue":"'+getValue+'","AdminID":"'+adminUserID+'"}';
        console.log(dataForm);
        var sendURL = domainAddress+"SearchEnquiryList";
        console.log(sendURL);

        $.ajax({
            type: "POST",
            url: sendURL,
            data: dataForm,
            success: function (result) {
               console.log(result); 
            
               if(result.record_count==0  && result.All_Records_Count == 0){
                   
               }
               else{
                    getAllNewAdminList();
                    
               }
               
                
            } // ajax success
        }); // ajax POSTS
     } // getContractorsList


    function getAllNewAdminList(){
        console.log("getAllAdminList called");
        $.get(domainAddress+"GetAllNewAdminDetails",{},function(result){
            console.log(result);
            $(".allNewAdminList").html('');
            if(result.record_count==0){
                $(".allNewAdminList").append("<tr> <td id='adminName-0'>No Admin Name Found</td> <td id='businessName-0'>No Business Name Found</td> <td id='emailID-0'>No Email Found</td> <td class='editAdmin' id='editAdmin-0'>--</td> </tr>");
            }
            else{
                for(var adminInfo in result.records){
                    $(".allNewAdminList").append("<tr id='getRow-"+result.records[adminInfo].Admin_ID+"'> <td id='adminName-"+result.records[adminInfo].Admin_ID+"'>"+result.records[adminInfo].AdminFirstName+" "+result.records[adminInfo].AdminLastName+"</td> <td id='businessName-"+result.records[adminInfo].Admin_ID+"'>"+result.records[adminInfo].BusinessName+"</td> <td id='emailID-"+result.records[adminInfo].Admin_ID+"'>"+result.records[adminInfo].BusinessEmail+"</td> <td> <i class='fa fa-thumbs-up fa-2x approve' style='cursor:pointer;' id='approve-"+result.records[adminInfo].Admin_ID+"'></i> <i class='fa fa-thumbs-down fa-2x reject' style='cursor:pointer;'  id='reject-"+result.records[adminInfo].Admin_ID+"'></i> </td> </tr>");

                     if(result.records[adminInfo].IsApprove == 1){
                      $("#approve-"+result.records[adminInfo].Admin_ID).css('color','green');
                      $("#reject-"+result.records[adminInfo].Admin_ID).css('color','');
                    }
                    else{
                      $("#approve-"+result.records[adminInfo].Admin_ID).css('color','');
                      $("#reject-"+result.records[adminInfo].Admin_ID).css('color','red');
                    } 

                }
                  //$("#getLoadingModalContent").removeClass('md-show'); 

/*                 $('#enquiryList').DataTable({
                    createdRow: function ( row ) {
                        $('td', row).attr('tabindex', 0);
                    }
                });
              $(".dataTables_paginate").hide();
              $(".dataTables_length").hide();
              $(".dataTables_info").hide();
              //$("#enquiryList_filter").hide();*/

                $(".approve").on('click',function(){
                    var getAdminID = this.id.replace('approve-','');
                    var isApproveStatus = "";
                    var businessEmailID = $("#emailID-"+getAdminID).text();
                    var lettingAgencyCode = $("#autoGenerate-"+getAdminID).text();
                    var businessName = $("#businessName-"+getAdminID).text();
                    lettingAgencyCode = businessName.trim().charAt(0).toLowerCase()+businessName.trim().substr(businessName.length - 1).toLowerCase()+zeroPad(getAdminID, 5);

                    UIkit.modal.confirm('Are you sure want to Approve?', function(e){
                        console.log(e); 
                        isApproveStatus = 1;
                        var dataForm = '{"IsApprove":"'+isApproveStatus+'","BusinessEmailID":"'+businessEmailID+'","LettingAgencyCode":"'+lettingAgencyCode+'","BusinessName":"'+businessName+'"}';
                        var sendURL = domainAddress + 'UpdateAdminIsApprove/' + getAdminID;
                        console.log(dataForm);
                        console.log(sendURL);
                        $.ajax({
                            type: "POST",
                            url: sendURL,
                            data: dataForm,
                            success: function(dataCheck) {
                               console.log(dataCheck);
                               $("#getRow-"+getAdminID).remove();
                               getAllNewAdminList();
                               UIkit.modal.alert('New Admin Approved Successfully');
                              
                            }
                        });
                    });

                });


                $(".reject").on('click',function(){
                    var getAdminID = this.id.replace('reject-','');
                    var isApproveStatus = "";
                    var businessEmailID = $("#emailID-"+getAdminID).text();
                    var lettingAgencyCode = $("#autoGenerate-"+getAdminID).text();
                    var businessName = $("#businessName-"+getAdminID).text();
                    lettingAgencyCode = businessName.trim().charAt(0).toLowerCase()+businessName.trim().substr(businessName.length - 1).toLowerCase()+zeroPad(getAdminID, 5);

                    UIkit.modal.confirm('Are you sure want to Reject?', function(){ 
                        isApproveStatus = 0;
                        var dataForm = '{"IsApprove":"'+isApproveStatus+'","BusinessEmailID":"'+businessEmailID+'","LettingAgencyCode":"'+lettingAgencyCode+'","BusinessName":"'+businessName+'"}';
                        var sendURL = domainAddress + 'UpdateAdminIsApprove/' + getAdminID;
                        console.log(dataForm);
                        console.log(sendURL);
                        $.ajax({
                            type: "POST",
                            url: sendURL,
                            data: dataForm,
                            success: function(dataCheck) {
                               console.log(dataCheck);
                               getAllNewAdminList();
                               UIkit.modal.alert('New Admin Rejected Successfully');
                               $("#isApprove-"+getAdminID).bootstrapSwitch('setState', false);
                            }
                        });
                     
                    });

                });
            }
        });
    } 
