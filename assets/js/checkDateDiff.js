/* global   $, domainAddress, UIkit*/
/* exported getDateDiff */
var getDateDiff = function( adminUserID ) {
    var isFilled = localStorage.getItem( "MyRequest_profileFill" );
    if ( isFilled === "true" ) {
        window.location.href = domainAgentAddress+'MyProfile.html';
    }
    $.get( domainAddress + "GetDateDiff/" + adminUserID, {}, function( result ) {
        var getDiffDate = parseInt( result.records[ 0 ].DiffDate ), diffDate = 30 - getDiffDate, modulus = Math.abs( diffDate );
        if ( diffDate < -6 ) {
            $( "#mainBody" ).css( "opacity", "0.1" );
            $( "#mainBody" ).css( "pointer-events", "none" );
            $( "#mainBody" ).css( "outline", "none" );
            UIkit.modal.alert = function( content, options ) {
                var modal = UIkit.modal.dialog( ( [
                    '<div class="uk-margin uk-modal-content">' + String( content ) + '<br > for immediate assitance Pls contact' +
                    '<a href="mailto:enquiry@myrequest.co.uk"> Drop Us Mail </a></div>',
                    '<div class="uk-modal-footer uk-text-right">  <button class="md-btn md-btn-primary  uk-btn-CenterAlign" style="margin-top:15px;">' +
                    '<a href="https://dashboard.gocardless.com/api/paylinks/113KHDBWH0" style="color:#fcdb34" target="_blank">Pay Now</a></button></div>'
                ] ).join( "" ), UIkit.$.extend( {
                    bgclose: false,
                    keyboard: false
                }, options ) ).show();
                return modal;
            };
            UIkit.modal.alert(messagePaymentDue.format(modulus), {
                center: true
            } ).on( 'hide.uk.modal', function() {
                // custome js code
            } );
        }
    } ); // End's here
};
