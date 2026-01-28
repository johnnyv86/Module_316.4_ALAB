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

/* =============== LocalStorage HELPERS ===============
   Store multiple users
    maintain an object keyed by username
============================================*/
{
    "bruce": { "username": "bruce", "email": "bruce@example.org", "password": "..."}
    "karan": { "username": "karan", "email": "karan@example.org", "password": "...."}
}

function loadUsers() {
    const raw = localStorage.getItem("users");
    if (!raw) return {}:
    try {
        const parsed = JSON.parse(raw);
        return parsed && typeof parsed === "object" ? parsed : {};
    }   catch (e) {
        console.warn("Could not parse users from localStorage, resetting.");
        return {};
    }
}
/*------------------- loadUsers -------------------
Reads (users) from localStorage
    if empty: returns {}
    if JSON parse fails
        logs a warning and 
        returns {} to avoid crashing
----------------------------------------------------*/

function saveUsers(usersObj) {
    localStorage.setItem("users", JSON.stringify(usersObj));
}
/*------------------- saveUsers -------------------
Serializes user object back into localStorage
all usernames are stored in lowercase,
    per the requirement, therefore normalizing when storing
----------------------------------------------------*/

/* =============== Registration Validation Helpers ===============

============================================*/

/*---------------- Username Validation --------------

----------------------------------------------------*/


/*---------------- Email Validation --------------

----------------------------------------------------*/


/*---------------- Password Validation --------------

----------------------------------------------------*/

/*---------------- Terms Validation --------------

----------------------------------------------------*/



/* =============== Registration Form Handler ===============

============================================*/



/* =============== Login Validation Helper ===============

============================================*/

/*---------------- Login Username Validation  --------------

----------------------------------------------------*/


/*---------------- Login Password Validation  --------------

----------------------------------------------------*/



/* =============== Login From Handler  ===============

============================================*/

/*---------------- Prevent Default Submisssion --------------

----------------------------------------------------*/

/*---------------- Validate Submisssion --------------

----------------------------------------------------*/

/*---------------- Submisssion Success --------------

----------------------------------------------------*/