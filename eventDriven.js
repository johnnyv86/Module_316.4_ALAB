/* =============== DOM HELPERS ===============
    Grab references to the: 
        registration form,
        login form,
        error display 
            container from the HTML code*/

const registrationForm = document.getElementById("registration");
const loginForm = document.getElementById("login");
const errorDisplay = document.getElementById("errorDisplay");
/* ============================================*/


/* ===== errorDisplay - Style Modified =============

-------------------- showError ----------------------
sets text of #errorDisplay & shows it (display:block)*/ 

function showError(message, inputToFocus) {
    errorDisplay.textContent = message;
    errorDisplay.style.display = "block";
    if (inputToFocus && typeof inputToFocus.focus === "function") {
        inputToFocus.focus();
    }
}

/*------------------- clearError -------------------
Clears both text and hides the error box*/

function clearError() {
    errorDisplay.textContent = "";
    errorDisplay.style.display = "none";
}

/*------------------- showSuccess ------------------
Uses the same box to show success messages, with greenish styling.*/

function showSuccess(message) {
    errorDisplay.textContent = message;
    errorDisplay.style.display = "block";
    errorDisplay.style.background = "#cfc";
    errorDisplay.style.color = "green";
}

/*---------------- resetErrorBoxStyle --------------
Returns the box to default red error styling for the next error.*/

function resetErrorBoxStyle() {
    errorDisplay.style.background = "#fcc";
    errorDisplay.style.color = "red";
}
/*============================================*/


/* =============== LocalStorage HELPERS ===============
   Store multiple users
    maintain an object keyed by username*/

{
    "bruce": { "username": "bruce", "email": "bruce@example.org", "password": "..."}
    "karan": { "username": "karan", "email": "karan@example.org", "password": "...."}
}
/*============================================*/

/*------------------- loadUsers -------------------*/
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
    /* Reads (users) from localStorage
    if empty: returns {}
    if JSON parse fails
        logs a warning and 
        returns {} to avoid crashing*/
}
/*----------------------------------------------------*/


/*------------------- saveUsers -------------------*/
function saveUsers(usersObj) {
    localStorage.setItem("users", JSON.stringify(usersObj));
    /* Serializes user object back into localStorage
    all usernames are stored in lowercase,
        per the requirement, therefore normalizing when storing */
}


/*----------------------------------------------------*/


/* =============== Registration Validation Helpers ===============

============================================*/

/*---------------- Username Validation --------------*/
function validateUsername(usernameRaw, users) {
    const username = usernameRaw.trim();

    if(!username) {
        return "The username cannot be blank.";
    
    /* (!username):If undefined,null, or an empty string: False  
    (username.trim() ===''): True if only whitespace
        Removes leading/trailing whitespaces
            ('   '.trim()): Returns ' '
            (' hello '.trim()): Returns 'hello' */
    }

    if(username.length < 4) {
        /* (length): property counts characters - simple numeric comparison */

        return "The username must be at least four characters long";
    }

    const uniqueChars = new Set(username.split(""));
    /* (new Set(username.split(""))): builds a set of distinct characters */

    if (uniqueChars.size) < 2 {
        return "Username must contain at least two unique characters.";
    }

    const usernameRegex = /^[A-ZA-Z0-9]+$/;
    /* Regex (/^[A-Za-z0-9]+$/): rejects anything other than basic letters and digits. */

    if (!usernameRegex.test(username)) {
        return "Username cannot contain special characters or whitespace.";
    }

    const usernameLower = username.toLowerCase();
    /* Checks (users[usernameLower]) in localStorage, enforcing uniqueness ignoring case. */

    if (user[usernameLower]) {
        return "That username is already taken.";
    }

    return null;
}
/*----------------------------------------------------*/


/*---------------- Email Validation --------------*/
function validateEmail(emailRaw) {
    const email = emailRaw.trim();

    if (!email) {
        return "Email cannot be blank.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    /* Simple & reasonable email regex checks for (something@something.something). */

    if (!emailRegex.test(email)) {
        return "Email must be a valid email address.";
    }

    const domain = email.split ("@").toLowerCase();
    /* Splitting at ("@") and checking domain blocks ("@example.com") regardless of case. */

    if (domain === "example.com") {
        return 'Email must not be from the domain "example.com".';
    }
    
    return null;
}
/*----------------------------------------------------*/


/*---------------- Password Validation --------------*/
function validatePasswords(passwordRaw, passwordCheckRaw, usernameRaw) {
    const password = passwordRaw;
    const passwordCheck = passwordCheckRaw;
    const username = usernameRaw.trim().toLowerCase();

    /* Regex Test to enforce character classes
    (password.toLowerCase().includes("password")): 
        catches any capitalization variant
        compare against lowercased (username)
    Return an appropriate error string if anything fails */

    if (!password) {
        return "Password cannot be blank.";
    }

    if(password.length < 12) {
        return "Password must have at least one uppercase and one lowercase letter.";
        /*  ≥ 12 characters & At least one uppercase and one lowercase */
    }

    if (!/[0-9]/.test(password)) {
        return "Password must contain at least one special character.";
        /* At least one number & At least one special character */
    }

    if (password.toLowerCase().includes("password")) {
        return 'Password cannot contain the word "password".';
        /* Must not contain ("password") (any case). */
    }

    if (username && password.toLowerCase().includes(username)) {
        return "Password cannot contain the username.";
        /* Must not contain the username (case‑insensitive) */
    }

    if (password !== passwordCheck) {
        return "Both passwords must match.";
        /* Both password fields must match. */
    }

    return null;
}
/*----------------------------------------------------*/


/*---------------- Terms Validation --------------*/
function validateTerms(termsChecked) {
    if (!termsChecked) {
        return "You must accept the terms and conditions.";
        /* Checkbox Check */
    }
    return null;
}
/*----------------------------------------------------*/



