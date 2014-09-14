function sendFormByEmail() {
    var emailSubject  = "Google Docs Form Submission: ";  
  
  // Set with your email address or a comma-separated list of email addresses.
  var yourEmail     = "ntuamcisa@gmail.com";
  
  // Set with your form key, found in the URL when viewing your spreadsheet.
  var docKey        = "1Gwf8Tp1YtzajTH97XlgCtjEjKZKKT93xpTIfaxGeYVM";
  
    var formdata = FormApp.openById(docKey).getResponses();

    var latest   = formdata[formdata.length-1].getItemResponses();
    
  var message = "";
    for (var j = 0; j < latest.length; j++) {
      message+=latest[j].getItem().getTitle()+" : "+latest[j].getResponse()+"\n";
    }
  
  MailApp.sendEmail(yourEmail, emailSubject, message); 
}