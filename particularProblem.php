<!doctype html>
<html lang="en">
<?php
    $problemID = urldecode($_GET['ProblemID']);
?>

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="msapplication-tap-highlight" content="no" />
        <link href="assets/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
        <link rel="icon" type="image/png" href="assets/img/faviconMyRequest-16x16.png" sizes="16x16">
        <link rel="icon" type="image/png" href="assets/img/faviconMyRequest-32x32.png" sizes="32x32">
        <title>myRequest-Particular Request</title>
        <link rel="stylesheet" href="bower_components/uikit/css/uikit.almost-flat.min.css" media="all">
        <link rel="stylesheet" href="assets/icons/flags/flags.min.css" media="all">
        <link rel="stylesheet" href="assets/css/main.min.css" media="all">
        <link rel="stylesheet" href="assets/css/custom.css" media="all">
        <link href="assets/fullcalendar/fullcalendar/fullcalendar.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" type="text/css" href="bower_components/lightbox/dist/css/lightbox.css">
        <link rel="stylesheet" type="text/css" href="assets/css/select2.min.css">
        <link rel="stylesheet" type="text/css" href="assets/css/loaders.css" />
        <link rel="stylesheet" href="assets/css/modalEffects.css">
        <!-- Basic stylesheet -->
        <link rel="stylesheet" href="assets/owl-carousel/owl.carousel.css">
         <!-- Default Theme -->
        <link rel="stylesheet" href="assets/owl-carousel/owl.theme.css">


    </head>

    <body class="sidebar_main_swipe">
        <div class="md-modal md-effect-19" id="getLoadingModalContent">
            <div class="md-content commonGetLoading" style="width: 50%;">

                <div>
                    <div class="wrapper wrapper-content">

                        <br/>

                        <div class="row">
                            <div class="col-md-12">
                                <div class="center">
                                    <div class="loaders">
                                        <div class="loader">
                                            <div class="loader-inner pacman">
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <br/>

                        <div class="row">
                            <div class="col-md-12">
                                <div class="center">
                                    <h2 class="loading">Loading...</h2>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <!-- main header -->
        <header id="header_main">
            <div class="header_main_content">
                <nav class="uk-navbar">
                    <!-- main sidebar switch -->
                    <a href="#" id="sidebar_main_toggle" class="sSwitch sSwitch_left">
                        <span class="sSwitchIcon"></span>
                    </a>
                    <div id="menu_top_dropdown" class="uk-float-left uk-hidden-small">
                        <a href="" class="getLettingAgencyBusinessName"></a>
                    </div>
                    <div class="uk-navbar-flip">
                        <ul class="uk-navbar-nav user_actions">
                            <li><a href="#" id="full_screen_toggle" class="user_action_icon uk-visible-large"><i class="material-icons md-24 md-light"  style="color:#000;">&#xE5D0;</i></a></li>
                            <li data-uk-dropdown="{mode:'click',pos:'bottom-right'}">
                                <a href="#" class="user_action_image"><span class="getUserName"></span> <i class="fa fa-cog" style="color:black;"></i></a>
                                <div class="uk-dropdown uk-dropdown-small">
                                    <ul class="uk-nav js-uk-prevent">
                                        <li><a href="myProfilePage.html">myProfile</a></li>
                                        <li class="Logout"><a href="index.html">Logout</a></li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div class="header_main_search_form">
                <i class="md-icon header_main_search_close material-icons">&#xE5CD;</i>
                <form class="uk-form">
                    <input type="text" class="header_main_search_input" />
                    <button class="header_main_search_btn uk-button-link"><i class="md-icon material-icons">&#xE8B6;</i></button>
                </form>
            </div>
        </header>
        <!-- main header end -->
        <!-- main sidebar -->
        <aside id="sidebar_main">
            <div class="sidebar_main_header">
                <div class="sidebar_logo">
                    <a href="Dashboard.html" class="sSidebar_hide">
                        <img src="assets/img/logo.jpg" class="myRequestAdminLogo" alt="myRequestLogo" />
                    </a>
                    <a href="Dashboard.html" class="sSidebar_show"><img src="" alt="" height="32" width="32" /></a>
                </div>
            </div>
            <div class="menu_section">
                <ul>
                    <li title="Dashboard">
                        <a href="Dashboard.html">
                            <span class="menu_icon"><i class="fa fa-bar-chart fa-2x"></i></span>
                            <span class="menu_title">Dashboard</span>
                        </a>
                    </li>

                    <li title="ListProperty">
                        <a href="ListProperty.html">
                            <span class="menu_icon"><i class="fa fa-building fa-2x"></i></span>
                            <span class="menu_title">Add Property</span>
                        </a>
                    </li>
                    <li title="Speciality">
                        <a href="Speciality.html">
                            <span class="menu_icon"><i class="fa fa-anchor fa-2x"></i></span>
                            <span class="menu_title">Create Speciality</span>
                        </a>
                    </li>

                    <li title="Contractor">
                        <a href="Contractor.html">
                            <span class="menu_icon"><i class="fa fa-user fa-2x"></i></span>
                            <span class="menu_title">Add Contractor</span>
                        </a>
                    </li>
                    <li title="ListTenant">
                        <a href="ListTenants.html">
                            <span class="menu_icon"><i class="fa fa-group fa-2x"></i></span>
                            <span class="menu_title">Add Tenants</span>
                        </a>
                    </li>
                    <li title="ListAllCase" class="current_section">
                        <a href="ListAllCase.html">
                            <span class="menu_icon"><i class="fa fa-wrench fa-2x"></i></span>
                            <span class="menu_title">Repair Requests</span>
                        </a>
                    </li>

                    <li title="Utility">
                        <a href="UtilityStatus.html">
                            <span class="menu_icon"><i class="fa fa-briefcase fa-2x"></i></span>
                            <span class="menu_title">Utility Management</span>
                        </a>
                    </li>
                    <li title="Advertisement">
                        <a href="Advertisement.html">
                            <span class="menu_icon"><img src="assets/img/Advertisement.png" class="getAdvertisement" /></span>
                            <span class="menu_title">Advertisement</span>
                        </a>
                    </li>

                    <li title="NewsLetter">
                        <a href="NewsLetter.html">
                            <span class="menu_icon"><i class="fa fa-newspaper-o fa-2x"></i></span>
                            <span class="menu_title">News Letter</span>
                        </a>
                    </li>

                    <li title="Polling">
                        <a href="Polling.html">
                            <span class="menu_icon"><i class="fa fa-pie-chart fa-2x"></i></span>
                            <span class="menu_title">Polling</span>
                        </a>
                    </li>

                    <li title="Notification">
                        <a href="NotificationTenant.html">
                            <span class="menu_icon"><i class="fa fa-bell fa-2x"></i></span>
                            <span class="menu_title">Notification</span>
                        </a>
                    </li>



                </ul>
                <img src="assets/img/myRequestDark.png" class="myRequestLogo" />
            </div>
        </aside>

        <div id="page_content">
            <div id="page_conent_inner">
                 <div class="uk-grid topGrid" data-uk-grid-margin>
                    <div class="uk-width-medium-1-3">
                        <div class="parsley-row">
                            <button type='button' class='md-btn md-btn-primary btnback' id='btnBack'><i class="fa fa-arrow-left"></i> Back</button>
                            <button type="button" class="md-btn md-btn-primary btnPrintPartProblems" id="btnPrintPartProblems"><i class="fa fa-print"></i> Print PDF</button>
                            <button type="button" class="md-btn md-btn-primary btnGetExcel" id="btnGetExcel"><i class="fa fa-file-excel-o"></i> Export To Excel</button>
                        </div>
                    </div>
                    <div class="uk-width-medium-1-3">
                        <div class="parsley-row">
                            <div class="parsley-row caseRow">
                                <h3 class="heading_b uk-margin-bottom" id="getRequestID"></h3>
                            </div>
                        </div>
                    </div>
                    <div class="uk-width-medium-1-3">
                        <div class="parsley-row btnApproveClose">
                            <button type="button" class="md-btn md-btn-warning btnClosed" id="btnClosedd">Close</button>
                        </div>
                    </div>
                </div> <!-- first uk-grid -->


               
                <div class="md-card mdCaseCard">
                    <div class="md-card-content">
                        <div id="form_validation" class="uk-form-stacked">
                            <br />
                            <div class="uk-grid" data-uk-grid-margin>
                                <div class="uk-width-medium-1-3 borderRight">
                                    <div class="parsley-row">
                                        <div class="md-card md-card-hover widthCardGal">
                                            <div class="gallery_grid_item md-card-content">
                                                <a class="problemRefImage" data-uk-lightbox="{group:'gallery'}">
                                                    <img class="problemImage problemImageZoom" id="problemImageZoom" src="assets/img/no_image.jpg">
                                                </a>
                                                <div class="gallery_grid_image_caption">
                                                    <span class="gallery_image_title  addFontBlack specialityName"></span> <span class='specialityLists uk-text-muted uk-text-small'></span> <span class=" specialityText addFontBlack">Speciality Saved Successfully.</span>
                                                    <span class="gallery_image_title  addFontGray whenDuration pull-right"></span>
                                                    <div class='specialityHide'>
                                                        <div class='col-md-8'>
                                                            <select class='form-control' id='specialityValue'>
                                                        <option value='0'>Select Speciality</option>
                                                    </select>
                                                        </div>
                                                        <div class="col-md-4 changeSpeciality">
                                                        </div>
                                                    </div>
                                                    <br /><br />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="statusOfContractor addFontBlack">
                                            <span class="statusColor"> </span>
                                        </div>
                                    </div>
                                </div>

                                <div class="uk-width-medium-1-3 borderRight borderMiddle">
                                    <div class="parsley-row">
                                        <div class="uk-grid" data-uk-grid-margin>
                                            <div class="uk-width-medium-1-4">
                                                <div class="clientImage">
                                                    <img src="assets/img/sign-in.jpg" class="getUserImage" />
                                                </div>
                                            </div>
                                            <div class="uk-width-medium-1-2">
                                                <h4>  <b class="userRegisterName"></b></h4>
                                            </div>
                                        </div>
                                        <div class="uk-grid" data-uk-grid-margin>
                                            <div class="uk-width-medium-1-6">
                                                <b> <i class="fa fa-envelope fa-2x"></i> </b>
                                            </div>
                                            <div class="uk-width-medium-1-2">
                                                <div class="emailID caseInfo"></div>
                                            </div>
                                        </div>
                                        <div class="uk-grid" data-uk-grid-margin>
                                            <div class="uk-width-medium-1-6">
                                                <b> <i class="fa fa-phone fa-2x"></i> </b>
                                            </div>
                                            <div class="uk-width-medium-1-2">
                                                <div class="phoneNumber caseInfo"></div>
                                            </div>
                                        </div>
                                        <br/>
                                        <div class="uk-grid" data-uk-grid-margin>
                                            <div class="uk-width-medium-1-6">
                                                <b> <i class="fa fa-calendar fa-2x"></i> </b>
                                            </div>
                                            <div class="uk-width-medium-1-2">
                                                <div class="getWhen caseInfo"></div>
                                            </div>
                                        </div>
                                        <br/>
                                        <div class="uk-grid" data-uk-grid-margin>
                                            <div class="uk-width-medium-1-6">
                                                <b> <i class="fa fa-clock-o fa-2x"></i> </b>
                                            </div>
                                            <div class="uk-width-medium-1-2">
                                                <div class="getWhenNeeded caseInfo"></div>
                                            </div>
                                        </div>
                                        <div class="uk-grid" data-uk-grid-margin>
                                            <div class="uk-width-medium-1-6">
                                                <b> <i class="fa fa-map-marker fa-2x"></i> </b>
                                            </div>
                                            <div class="uk-width-medium-1-2">
                                                <div class="getAddress caseInfo"></div>
                                            </div>
                                        </div>
                                        <br/>
                                        <div class="uk-grid" data-uk-grid-margin>
                                            <div class="uk-width-medium-1-6">
                                                <b> <i class="fa fa-pencil-square-o fa-2x"></i> </b>
                                            </div>
                                            <div class="uk-width-medium-1-2 estimatedNotesArea">
                                                <div class="estimatedNotes caseInfo"></div>
                                            </div>
                                        </div> 
                                        <br/>
                                        <div class="uk-grid" data-uk-grid-margin>
                                            <div class="uk-width-medium-1-6">
                                               <b> <i class="fa fa-gbp fa-2x"></i> </b>
                                            </div> 
                                            <div class="uk-width-medium-1-2">
                                                <div class="estimatedCost caseInfo"></div>
                                            </div> 
                                          </div>
                                        <br/>
                                        <div class="uk-grid" data-uk-grid-margin>
                                            <div class="uk-width-medium-1-6">
                                               <b> <i class="fa fa-gbp fa-2x"></i> </b>
                                            </div> 
                                           <div class="uk-width-medium-1-2">
                                                <div class="caseInfo" id="btnFixedAmount"> </div>
                                            </div> 
                                          </div>
                                        <br/>
                                    </div>
                                </div>

                                <div class="uk-width-medium-1-3 borderLast">
                                    <div class="parsley-row">
                                        <div class="uk-grid" data-uk-grid-margin>
                                            <div class="uk-width-medium-1-4">
                                                <div class="parsley-row">
                                                    <div class="getContractorImg"> 
                                                        <img src="assets/img/sign-in.jpg" class="getContractorImage" /> 
                                                    </div>
                                                    <div class='setContractorName'></div>
                                                    
                                                </div>
                                            </div>
                                            
                                            <div class="uk-width-medium-1-5">
                                                <div class="parsley-row">
                                                    <div class="parsley-row">
                                                        <div class="md-input-wrapper md-input-filled">
                                                            <br/>
                                                            <b>Start</b>
                                                        </div>
                                                    </div>
                                                    <br/>
                                                    <div class="uk-width-medium-1-1">
                                                        <div class="parsley-row">
                                                            <div class="md-input-wrapper md-input-filled">
                                                                <br/>
                                                                <b>End</b>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="uk-width-medium-1-4">
                                                <div class="parsley-row">
                                                    <div class="md-input-wrapper md-input-filled">
                                                        <input class="md-input" type="text" id="inputStartDate" data-uk-datepicker="{format:'DD.MM.YYYY'}">
                                                    </div>
                                                    <span class="startDate-suffix"> <i class="uk-input-group-icon uk-icon-calendar-o startIcon"></i> </span>
                                                </div>
                                                <br/>
                                                <div class="uk-width-medium-1-1">
                                                    <div class="parsley-row">
                                                        <div class="md-input-wrapper md-input-filled">
                                                            <input class="md-input" type="text" id="inputEndDate" data-uk-datepicker="{format:'DD.MM.YYYY'}">
                                                        </div>
                                                        <span class="endDate-suffix"> <i class="uk-input-group-icon uk-icon-calendar-o endIcon"></i> </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="uk-width-medium-1-4">
                                                <div class="parsley-row">
                                                    <div class="md-input-wrapper md-input-filled">
                                                        <input class="md-input" type="text" id="inputStartTime" data-uk-timepicker>
                                                    </div>
                                                    <span class="startTime-suffix"> <i class="uk-input-group-icon uk-icon-clock-o"></i> </span>
                                                </div>
                                                 
                                                <div class="uk-width-medium-1-1">
                                                    <div class="parsley-row">
                                                        <div class="md-input-wrapper md-input-filled">
                                                            <input class="md-input" type="text" id="inputEndTime" data-uk-timepicker />
                                                        </div>
                                                        <span class="endTime-suffix">  <i class="uk-input-group-icon uk-icon-clock-o"></i> </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="uk-grid" data-uk-grid-margin>
                                            <div class="uk-width-medium-1-3">
                                                <div class="parsley-row">
                                                    <button type="button" class="md-btn md-btn-primary md-btn-success btnStartWork">Start Work</button>
                                                </div>
                                            </div>
                                            <div class="uk-width-medium-1-3">
                                                <div class="parsley-row">
                                                    <button type="button" class="md-btn md-btn-primary md-btn-success btnEndWork">End Work</button>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="uk-grid" data-uk-grid-margin>
                                            <div class="uk-width-medium-1-2">
                                                <div class="parsley-row showContractor">
                                                      <select id="contractorValue" name="contractorValue" required class="md-input" style="width:100%;">
                                                    <option  value="0">Select Contractor</option>
                                                </select>
                                                </div>
                                            </div>
                                            <div class="uk-width-medium-1-2">
                                                <div class="parsley-row">
                                                    <div id="hiddenContractorInfo"></div>
                                                    <span class="changeContractor"> </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="md-card md-card-hover contractorListData">
                                            <div class="uk-grid " data-uk-grid-margin>
                                                <div class="uk-width-medium-1-1">
                                                    <div class="md-card-content">
                                                        <div class="uk-overflow-container">
                                                            <table class="uk-table uk-table-striped" id="contractorListData">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Average Charges</th>
                                                                        <th>Visit Charges</th>
                                                                        <th>Hourly Rate</th>
                                                                        <th>Start Time</th>
                                                                        <th>End Time</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody class="allContractorList">
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="md-card md-card-hover contractorRating">
                                            <div class="uk-grid" data-uk-grid-margin>
                                                <div class="uk-width-medium-1-1">
                                                    <div class="md-card-content">
                                                        <div class="uk-overflow-container">
                                                            <table class="uk-table uk-table-striped">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Quality Rating</th>
                                                                        <th>Punctuality Rating</th>
                                                                        <th>StaffBehavior Rating</th>
                                                                        <th>Over All Rating</th>
                                                                        <th>Notes</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody class="getContractorRating">
                                                                    <tr>
                                                                        <td id="qualityRating"></td>
                                                                        <td id="punctualityRating"></td>
                                                                        <td id="staffBehaviorRating"></td>
                                                                        <td id="overAllRating"></td>
                                                                        <td id="notesRating"></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div> <!-- mdCard uk-grid -->
                            <br />
                        </div>

                        <hr class="contractorsApplied" />
                        <br/>
                        <div class="uk-grid contractorsApplied" data-uk-grid-margin>
                            <div class="uk-width-medium-1-1">
                                <div> 
                                    <h3>Contractors Applied</h3>
                                </div>
                                <div id="contractorsApprovedContent">
                                  
                                </div>
                            </div>
                        </div>
                        <br />
                    </div>

                    <div class="uk-grid requestLog" data-uk-grid-margin>
                            <div class="uk-width-medium-1-2">
                                <div class="parsley-row googleMapRow">
                                    <div class="googleMap">
                                    </div>
                                </div>
                            </div>
                            <div class="uk-width-medium-1-2">
                                <div class="uk-grid workLogTop" data-uk-grid-margin>
                                    <div class="uk-width-medium-1-1 workLogPadding">
                                            <div class="portlet requestPortlet">
                                                <div class="portlet-title">
                                                    <div class="caption">
                                                        <i class="fa fa-comments"></i>Work Logs
                                                    </div>
                                                    <div class="tools">
                                                        <a href="" class="collapse"></a>
                                                    </div>
                                                </div>
                                                <div class="portlet-body requestChats" id="chats">
                                                    <div class="scroller" data-always-visible="1" data-rail-visible1="1">
                                                        <ul class="chats NotesContent">
                                                        </ul>
                                                    </div>
                                                    <hr/>
                                                    <div class="uk-grid" data-uk-grid-margin>
                                                        <div class="uk-width-9-10">
                                                            <div class="parsley-row">
                                                                <textarea id='noteNewText' rows='3' placeholder='Enter Your Message Here'></textarea>
                                                            </div>
                                                        </div>
                                                        <div class="uk-width-1-10">
                                                            <div class="parsley-row">
                                                                <button type="button" class="md-btn md-btn-primary uk-modal-close btnAddNotes" id="addCase"><i class="fa fa-paper-plane fa-rotate-45 fa-3x"></i></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                         
                                    </div>
                                </div>
                            </div>
                        </div>
                            <!-- 2nd half -->
                    </div>

                </div> <!-- mdCaseCard -->
                
                <br/>

            </div> <!-- page_conent_inner -->
        </div> <!-- page_content -->

        <!-- BEGIN MODAL FORM-->
        <div class="uk-modal" id="fixedCaseModal">
            <div class="uk-modal-dialog">
                <div class="uk-modal-header">
                    <h3 class="uk-modal-title"></h3>
                </div>
                <p>
                    <div class="uk-grid" data-uk-grid-margin>
                        <div class="uk-width-medium-1-1">
                            <div class="parsley-row">
                                <div class="md-card md-card-hover">
                                    <div class="gallery_grid_item md-card-content">
                                        <a href="" id="linkFixedImage" data-lightbox="{group:'gallery'}">
                                            <img id="fixedImage" alt="fixedImage" />
                                        </a>
                                        <div class="gallery_grid_image_caption">
                                            <span class="gallery_image_title uk-text-truncate fixedNotes"></span>
                                            <span class="uk-text-muted uk-text-small fixedDate"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="uk-modal-footer uk-text-right">
                        <button type="button" class="md-btn md-btn-flat uk-modal-close reset">OK</button>
                    </div>
                </p>
            </div>
        </div> 

        
        <!-- google web fonts -->
        <script>
            WebFontConfig = {
                google: {
                    families: [
                        'Source+Code+Pro:400,700:latin',
                        'Roboto:400,300,500,700,400italic:latin'
                    ]
                }
            };
            (function() {
                var wf = document.createElement('script');
                wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
                    '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
                wf.type = 'text/javascript';
                wf.async = 'true';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(wf, s);
            })();
        </script>
        <!-- common functions -->
        <script src="assets/js/common.min.js"></script>
        <!-- uikit functions -->
        <script src="assets/js/uikit_custom.min.js"></script>
        <!-- altair common functions/helpers -->
        <script src="assets/js/altair_admin_common.min.js"></script>
        <!-- page specific plugins -->
        <!-- parsley (validation) -->
        <script>
            // load parsley config (altair_admin_common.js)
            altair_forms.parsley_validation_config();
        </script>
        <script src="bower_components/parsleyjs/dist/parsley.min.js"></script>
        <!--  forms validation functions -->
        <script src="assets/js/pages/forms_validation.min.js"></script>
        <script src="assets/js/const.js"></script>
        <script src="assets/js/appUrl.js"></script>
        <script src="assets/js/validationCheck.js" type="text/javascript"></script>
        <script src="assets/fullcalendar/fullcalendar/fullcalendar.min.js" type="text/javascript"></script>
        <script type="text/javascript" src="assets/js/bootstrap-formhelpers.js"></script>
        <script type="text/javascript" src="assets/js/bootstrap-clockpicker.min.js"></script>
        <script src="assets/js/jquery.elevatezoom.js"></script>
        <script src="assets/js/moment-timezone-with-data-2010-2020.js" type="text/javascript"></script>
        <script src="assets/js/jstz.min.js"></script>
        <script src="bower_components/lightbox/dist/js/lightbox.min.js"></script>
        <script src="assets/js/select2.min.js"></script>
        <script src="assets/js/screenfull.js"></script>
        <script src="assets/js/checkDateDiff.js"></script>
        <script src="assets/js/ParticularProblem/particularProblem.js"></script>
        <script src="assets/js/ParticularProblem/getDbReportProblem.js"></script>
        <script src="assets/js/ParticularProblem/getProblemSpeciality.js"></script>
        <script src="assets/js/ParticularProblem/getContractorDetails.js"></script>
        <script src="assets/js/ParticularProblem/getContractorsApplied.js"></script>
        <script src="assets/js/ParticularProblem/common.js"></script>
        <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDlAtgdLzrTc134GulXAr7tighF1o15bBM"></script>
        <!--<script type="text/javascript" src="assets/js/jquery.googlemap.js"></script> -->
        <script src="assets/js/logOutClearCatch.js"></script>
        <script type="text/javascript" src="assets/js/gmap.js"></script>
        <!-- Include js plugin -->
        <script src="assets/owl-carousel/owl.carousel.js"></script>
        <script>
            $(function() {
                // enable hires images
                altair_helpers.retina_images();
                // fastClick (touch devices)
                if (Modernizr.touch) {
                    FastClick.attach(document.body);
                }
            });
        </script>
        <script>
            var getProblemID = 0;
            var requestID = 0;
            getProblemID = "<?php echo $problemID;?>";
        </script>

        <div class="md-overlay"></div>
    </body>
    </body>

</html>