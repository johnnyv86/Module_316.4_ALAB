/* =============== DOM HELPERS ===============
    Grab references to the: 
        registration form,
        login form,
        error display 
            container from the HTML code
============================================*/
const registrationForm = document.getElementById("registration");
const loginForm = document.getElementById("login");
const errorDisplay = document.getElementById("errorDisplay");


/* ===== errorDisplay - Style Modified ======
============================================*/

/*-------------------- showError --------------------
sets text of #errorDisplay & shows it (display:block) 
----------------------------------------------------*/
function showError(message, inputToFocus) {
    errorDisplay.textContent = message;
    errorDisplay.style.display = "block";
    if (inputToFocus && typeof inputToFocus.focus === "function") {
        inputToFocus.focus();
    }
}

/*------------------- clearError -------------------
Clears both text and hides the error box
----------------------------------------------------*/
function clearError() {
    errorDisplay.textContent = "";
    errorDisplay.style.display = "none";
}

/*------------------- showSuccess ------------------
Uses the same box to show success messages, with greenish styling.
----------------------------------------------------*/
function showSuccess(message) {
    errorDisplay.textContent = message;
    errorDisplay.style.display = "block";
    errorDisplay.style.background = "#cfc";
    errorDisplay.style.color = "green";
}

/*---------------- resetErrorBoxStyle --------------
Returns the box to default red error styling for the next error.
----------------------------------------------------*/
function resetErrorBoxStyle() {
    errorDisplay.style.background = "#fcc";
    errorDisplay.style.color = "red";
}


//--------------- clearError ---------------//

/* ===== errorDisplay, style MODIFIED =====