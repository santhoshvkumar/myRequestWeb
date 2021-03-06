/* global   $, isAppInstalled, occupancy, homeInsurance, getPropertyManaged, finalTenantCount, getAddRemove, count */
/* exported clearAllValues, imageUrl1, imageUrl2, imageUrl3, imageUrl4, imageUrl5 */
var clearAllValues = function() {
    $( "#getName" ).val( '' );
    $( "#inputMobileNumber" ).val( '' );
    $( "#inputEmailID" ).val( '' );
    $( "#startDate" ).val( '' );
    $( "#endDate" ).val( '' );
    $( "#inputAddress" ).val( '' );
    $( "#inputLocation" ).val( '' );
    $( "#inputState" ).val( 0 );
    $( "#inputCity" ).val( 0 );
    $( "#select2-inputCity-container" ).html( "Select City" );
    $( "#select2-inputState-container" ).html( "Select County" );
    $( "#inpuZip" ).val( '' );
    $( "#inpuCountry" ).val( '' );
    $( ".bno-prefix" ).hide();
    $( "#inputHmoLicenseNumber" ).val( '' );
    $( "#validFrom" ).val( '' );
    $( "#validTo" ).val( '' );
    $( "#electricityValidFrom" ).val( '' );
    $( "#electricityValidTo" ).val( '' );
    $( "#gasValidFrom" ).val( '' );
    $( "#gasValidTo" ).val( '' );
    $( "#legValidFrom" ).val( '' );
    $( "#legValidTo" ).val( '' );
    $( '.appYes > div' ).removeClass( 'checked' );
    $( '.appNo > div' ).removeClass( 'checked' );
    $( '.occupancySingle > div' ).removeClass( 'checked' );
    $( '.occupancyMultiple > div' ).removeClass( 'checked' );
    $( '.homeInsurYes > div' ).removeClass( 'checked' );
    $( '.homeInsurNo > div' ).removeClass( 'checked' );
    $( '.propManageFull > div' ).removeClass( 'checked' );
    $( '.propManageSemi > div' ).removeClass( 'checked' );
    $( '.propManageLet > div' ).removeClass( 'checked' );
    $( '.propSingle > div' ).removeClass( 'checked' );
    $( '.propMultiple > div' ).removeClass( 'checked' );
    $( ".hmoInputTenent" ).hide();
    $( "#inputHMONoOfTenent" ).val( '' );
    $( "#imgHmoUploadPic" ).attr( "src", "assets/img/noImage.gif" );
    $( "#imgEnergyPerformanceCertificate" ).attr( "src", "assets/img/noImage.gif" );
    $( "#imgElectricityCertificate" ).attr( "src", "assets/img/noImage.gif" );
    $( "#imgGasCertificate" ).attr( "src", "assets/img/noImage.gif" );
    $( "#imgLegCertificate" ).attr( "src", "assets/img/noImage.gif" );
    $( ".getTenantList" ).html( '' );
    $( "#progressbox1" ).hide();
    $( "#progressbox2" ).hide();
    $( "#progressbox3" ).hide();
    $( "#progressbox4" ).hide();
    $( "#select2-inputProperty-container" ).html( "Select PropertyType" );
    $( "#inputProperty" ).val( 0 );
    $( "#select2-inputBedrooms-container" ).html( "Select Bedrooms" );
    $( "#inputBedrooms" ).val( 0 );
    $( "#select2-inputFuel-container" ).html( "Select Fuel Type" );
    $( "#inputFuel" ).val( 0 );
    $( "#select2-inputSupplierElectric-container" ).html( "Select Supplier Electric" );
    $( "#inputSupplierElectric" ).val( 0 );
    $( "#select2-inputSupplierGas-container" ).html( "Select Supplier Gas" );
    $( "#inputSupplierGas" ).val( 0 );
    $( "#select2-inputEconomy7-container" ).html( "Economy 7" );
    $( "#inputEconomy7" ).val( 0 );
    isAppInstalled = 0;
    occupancy = "";
    homeInsurance = "";
    getPropertyManaged = "";
    imageUrl1 = "";
    imageUrl2 = "";
    imageUrl3 = "";
    imageUrl4 = "";
    imageUrl5 = "";
    $( "#hiddenPropertyID" ).val( 0 );
    $( ".md-input-wrapper" ).removeClass( "md-input-filled" );
    $( ".btnSubmitProperty" ).text( "Add Property & Update Utility" );
    $( ".propertyContent" ).toggle();
    $( ".landlordInfo" ).hide();
    $( ".propMandatoryContent" ).hide();
    count = 0;
    finalTenantCount = 0;
    getAddTenantArr = new Array();
    //getAddTenant(count);
    getAddRemove( count );
    $( "#hiddenIsElectricity" ).val( 0 );
    $( "#hiddenIsGas" ).val( 0 );
    $( "#hiddenIsWater" ).val( 0 );
    $( "#hiddenIsCouncil" ).val( 0 );
    $( ".isElectricity > div" ).removeClass( "checked" );
    $( ".isGas > div" ).removeClass( "checked" );
    $( ".isWater > div" ).removeClass( "checked" );
    $( ".isCouncil > div" ).removeClass( "checked" );
    $( "#hiddenPropertyID" ).val( 0 );
    $( ".getPropertyUtility" ).hide();
    $( ".propertyUtility" ).html( '' );
    $( "#inputRead1" ).val( '' );
    $( "#inputRead2" ).val( '' );
    $( "#inputGas" ).val( '' );
    $( "#inputWater" ).val( '' );
    $( "#inputWaterAuthority" ).val( '' );
    $( "#inputSewerageAuthority" ).val( '' );
    $( "#inputTaxAuthority" ).val( '' );
    $( ".utilityInfo" ).hide();
    $( ".btnSubmitProperty" ).text( "Add Property & Update Utility" );
    $( ".btnSubmitPropertyMoveOut" ).hide();
};
