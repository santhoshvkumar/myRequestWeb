var pushMessageTenantAdminApproved = "Approved by Admin for Request # {0}";
var pushMessageContractorAdminApproved = "Contractor {0} has been assigned for Request # {1}";

var pushMessageAdminNotes = "Message added by admin for Request # {0} : {1}";

var pushMessageContractorAssigned = "Contractor {0} has been assigned for Request # {1}";
var pushMessageSpecialityUpdate = "Speciality {0} has been updated for Request # {1}";

var pushMessageWorkStart = "Request # {0}, Work has been started at {1}";
var pushMessageWorkEnd = "Request # {0}, Work successfully completed at {1}";

String.prototype.format = function() {
    var formatted = this;
    for( var arg in arguments ) {
        formatted = formatted.replace("{" + arg + "}", arguments[arg]);
    }
    return formatted;
};