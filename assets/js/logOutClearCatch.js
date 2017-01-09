/* exported logOutClearCatch */
var logOutClearCatch = function() {
	localStorage.removeItem( "MyRequest_AdminID" );
	localStorage.removeItem( "MyRequest_UserName" );
	localStorage.removeItem( "MyRequest_AdminType" );
	localStorage.removeItem( "MyRequest_BusinessName" );
	localStorage.removeItem( "MyRequest_LettingAgencyCode" );
	localStorage.removeItem( "MyRequest_Logo" );
	localStorage.removeItem( "MyRequest_profileFill" );
	localStorage.removeItem( "MyRequestContractorID" );
	localStorage.removeItem( "MyRequestStatus" );
	localStorage.removeItem( "MyRequestUserRegisterID" );
	localStorage.removeItem( "MyRequest_ContractorName" );
	localStorage.removeItem( "MyRequest_RepairStatus" );
};
