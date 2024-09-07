function showHome() {
    window.location.href = 'dbmshomepage.html';
}

function showSM() {
    window.location.href = 'dbmssendmoney.html';
}

function showTH() {
    window.location.href = 'dbmstransactionhistory.html';
}

function showBD() {
    window.location.href = 'dbmsbankdetails.html';
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("d2").classList.add("fade-in-active");
    document.getElementById("d3").classList.add("fade-in-active");

    setTimeout(function() {
        document.getElementById("d2").classList.add("slide-up-active");
        document.getElementById("d3").classList.add("slide-up-active");
    }, 500);
});
