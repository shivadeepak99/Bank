function inclogin() {
    // Retrieve values from the form inputs
    const customerId = document.querySelector('#customerId').value;
    const loginName = document.querySelector('#loginName').value;
    const phoneNumber = document.querySelector('#phoneNumberLogin').value;

    // Check if the values match the required credentials
    if (
        customerId === "369" &&
        loginName === "silly" &&
        phoneNumber === "963"
    ) {
        // Call the logining function with a boolean value
        var bool = 1;
        logining(bool);
        // Redirect to the home page after successful login
        window.location.href = 'dbmshomepage.html';
    } else {
        // Alert if login details are incorrect
        alert("Incorrect login details");
    }
}

function logining(bool) {
    // Your logining logic here
}

function duck() {
    alert("Duck You!!");
}

function showHome() {
    window.location.href = 'dbmshomepage.html';
}

function showSM() {
    window.location.href = 'dbmssendmoney.html';
}

function showTH() {
    window.location.href = 'dbmstransactionhistory.html';
}
function showBD(){

    window,location.href='dbmsbankdetails.html'
}
