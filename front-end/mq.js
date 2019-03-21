//binding event handler and 'click' event for 'submitBtn'
document.getElementById("submitBtn").addEventListener("click", validateFormWithButtonClickEventAndUpdateForm);


//event handling function
function validateFormWithButtonClickEventAndUpdateForm() {
    //reading values from the form
    var urlText = document.getElementById("brokerURL").value;
    var portNum = document.getElementById("brokerPort").value;
    if (urlText == "" || urlText == null || portNum == "" || portNum == null) {
        //alert("Submit button clicked - both fields must be filled");
        document.getElementById("userMsg").innerHTML = "both fields must be filled";
        return false;
    } else {
        //writing back to the form
        //update the text of the element whose id is 'userMsg' with a connect message
        document.getElementById("userMsg").innerHTML = "Connecting to " + urlText;
    }


}
