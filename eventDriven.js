/* ========================================================================================================
    DOM HELPERS 
======================================================================================================== */
   
    /* Grab references to the: 
       registration form,
       login form,
       error display 
           container from the HTML code */

const registrationForm = document.getElementById("registration");
const loginForm = document.getElementById("login");
const errorDisplay = document.getElementById("errorDisplay");

/* ========================================================================================================
    errorDisplay - Style Modified
======================================================================================================== */

/* showError ---------------------------------------------------------
    1. Sets the text of the error box.
    2. Makes the box visible (display: block).
    3. Puts the cursor (focus) into the input field that caused the error. */

function showError(message, inputToFocus) {
    errorDisplay.textContent = message;
    errorDisplay.style.display = "block";
    if (inputToFocus && typeof inputToFocus.focus === "function") {
        inputToFocus.focus();
    }
}

/* clearError -------------------------------------------------------
    Clears both text and hides the error box */

function clearError() {
    errorDisplay.textContent = "";
    errorDisplay.style.display = "none";
}

/* showSuccess -------------------------------------------------------
    Use the same box error box to show success messages, 
        changes to greenish styling to indicate success. */

function showSuccess(message) {
    errorDisplay.textContent = message;
    errorDisplay.style.display = "block";
    errorDisplay.style.background = "#cfc";
    errorDisplay.style.color = "green";
}

/* resetErrorBoxStyle ------------------------------------------------
    Returns the box to default red error styling for the next error. */

function resetErrorBoxStyle() {
    errorDisplay.style.background = "#fcc";
    errorDisplay.style.color = "red";
}
/* ======================================================================================================================
    LocalStorage HELPERS 
========================================================================================================= */
   
/* Data Structure to Achieve ------------------------------------------
    {
        "bruce": { "username": "bruce", "email": "bruce@example.org", "password": "..."}
        "karan": { "username": "karan", "email": "karan@example.org", "password": "...."}
    }
/* ---------------------------------------------------------------------

// loadUsers ----------------------------------------------------------
function loadUsers() {                  
    // 1. Get string from browser localStroage
    const raw = localStorage.getItem("users");                                  
    // 2. If nothing exisit yet, return {}: an empty object
    if (!raw) return {};                                                        
    // 3. Try to parse the JSON string back into the JS Object
    try {                                                                       
        const parsed = JSON.parse(raw);
        return parsed && typeof parsed === "object" ? parsed : {};
    }   catch (e) {
    // 4. If data is corrupted, log warning and return empty object to prevent crash
        console.warn("Could not parse users from localStorage, resetting.");
        return {};
    }



// saveUsers ---------------------------------------------------------
function saveUsers(usersObj) {
    localStorage.setItem("users", JSON.stringify(usersObj));
    /* Serializes user object back into localStorage
    all usernames are stored in lowercase,
        per the requirement, therefore normalizing when storing */
}



/* ====================================================================================================================================================================================
    REGISTRATION VALIDATION HELPERS 
================================================================================================================================================================================================================================ */

// Username Validation -----------------------------------------------
function validateUsername(usernameRaw, users) {
    // Remove whitespace from ends
    const username = usernameRaw.trim();        

    if(!username) {
        return "The username cannot be blank.";
    /* (!username):If undefined,null, or an empty string: False  
    (username.trim() ===''): True if only whitespace
        Removes leading/trailing whitespaces
            ('   '.trim()): Returns ' '
            (' hello '.trim()): Returns 'hello' */
    }

    // (length): property counts characters - simple numeric comparison 
    if(username.length < 4) {               
        return "The username must be at least four characters long";
    }

    // (new Set(username.split(""))): builds a set of distinct characters
    const uniqueChars = new Set(username.split(""));
    if (uniqueChars.size) < 2 {
        return "Username must contain at least two unique characters.";
    /*  Creates a Set (collection of unique values) from the string characters
            If "hello" is passed, Set becomes {"h", "e", "l", "o"} (size 4)
            If "aaaa" is passed, Set becomes {"a"} (size 1) */
    }

 // Regex (/^[A-Za-z0-9]+$/): rejects anything other than basic letters and digits.
    const usernameRegex = /^[A-ZA-Z0-9]+$/;
    if (!usernameRegex.test(username)) {
        return "Username cannot contain special characters or whitespace.";
    /*  Regex Explanation:
            ^ = Start of string
            [A-Za-z0-9] = Allow only Letters (upper/lower) and Numbers
            + = One or more times
            $ = End of string */
    }

    // Checks (users[usernameLower]) in localStorage, enforcing uniqueness ignoring case. 
    const usernameLower = username.toLowerCase();
    if (user[usernameLower]) {
        return "That username is already taken.";
    }
    return null; // NO ERRORS
}


// Email Validation --------------------------------------------------
function validateEmail(emailRaw) {
    const email = emailRaw.trim();
    if (!email) {
        return "Email cannot be blank.";
    }

    // Simple & reasonable email regex checks for (something@something.something).
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return "Email must be a valid email address.";
    }

    // Splitting at ("@") and checking domain blocks ("@example.com") regardless of case. */
    const domain = email.split ("@").toLowerCase();
    if (domain === "example.com") { // Blocks "example.com" specifically
        return 'Email must not be from the domain "example.com".';
    }
    return null;
}


// Password Validation -----------------------------------------------
function validatePasswords(passwordRaw, passwordCheckRaw, usernameRaw) {
    const password = passwordRaw;
    const passwordCheck = passwordCheckRaw;
    const username = usernameRaw.trim().toLowerCase();

    /* Regex Test to enforce character classes
    (password.toLowerCase().includes("password")): 
        catches any capitalization variant
        compare against lowercased (username)
    Return an appropriate error string if anything fails */

    // ≥ 0 characters: field cant be empty
    if (!password) {
        return "Password cannot be blank.";
    }

    // ≥ 12 characters & At least one uppercase and one lowercase
    if(password.length < 12) {
        return "Password must have at least one uppercase and one lowercase letter.";
    }
    
    // At least one number & At least one special character
    if (!/[0-9]/.test(password)) {
        return "Password must contain at least one special character.";
    }

    if (password.toLowerCase().includes("password")) {
        return 'Password cannot contain the word "password".';
    }

    // Must not contain ("password") (any case).
    // Must not contain the username (case‑insensitive)
    if (username && password.toLowerCase().includes(username)) {
        return "Password cannot contain the username.";
    }

    // Both password fields must match.
    if (password !== passwordCheck) {
        return "Both passwords must match.";
    }

    return null;
}



/* Terms Validation --------------------------------------------------
function validateTerms(termsChecked) {
    // Checks if Checkbox Check
    if (!termsChecked) {
        return "You must accept the terms and conditions.";
    }
    return null;
}

/* =======================================================================================================================
    REGISTRATION FORM HANDLER
======================================================================================================================= */

if (registrationForm) {
    registrationForm.addEventListener("submit", function (event) {
        // 1. Prevent browser from refreshing the page
        event.preventDefault();
        // 2. Clears any previous error styles
        resetErrorBoxStyle();
        clearError();
        /* 3. Grab all form inputs
            (form.elements[name]): Get each input that matches the `name` attributes in the HTML */
        const form = event.target;
        const usernameInput = form.elements["username"];
        const emailInput = form.elements["email"];
        const passwordInput = form.elements["password"];
        const passwordCheckInput = form.elements ["passwordCheck"];
        const termsInput = form.elements["terms"];
        
        // 4. Load current user database from localStorage
        const users = loadUsers();
        

    
        /* 5. Run Validations Step-by-Step ---------------------------
                For each error:    
                    (showError): to display the message and set focus
                    (return): to stop further execution (form does not submit), as required */

        const usernameError = validateUsername(usernameInput.value, users);
        if (usernameError) {
            showError(usernameError, usernameInput);
            return;
        }

        const emailError = validateEmail(emailInput.value);
        if (emailError) {
            showError(emailError, emailInput);
            return;
        }

        const passwordError = validatePasswords(
            passwordInput.value,
            passwordCheckInput.value,
            usernameInput.value
        );
        if (passwordError) {
            showError(passwordError, passwordInput);
            return;
        }

        const termsError = validateTerms(termsInput.checked);
        if (termsError) {
            showError(termsError, termsInput);
            return;
        }

    /* SUCCESS: ------------------------------------------------------
            If code reaches this point - ALL validations PASSED    
                Check Pass - Store the user */
        
        // Normalize username and email to lowercase before storage
        const usernameLower = usernameInput.value.trim().toLowerCase();
        const emailLower = emailInput.value.trim().toLowerCase();

        // Store (password) as entered (in a real app would hash)
        users[usernameLower] = {
            username: usernameLower,
            email: emailLower,
            password: passwordInput.value,
        };

        // Save updated list to localStorage
        saveUsers(users);

         // Clear the form and show a success message */
        form.reset();

        showSuccess("Registration successful! You may now log in.");

        // After a moment, Reset the error box style back to error colors after success for future errors
        setTimeout(() => {
            resetErrorBoxStyle();
        }, 3000); // 3 SECONDS DELAY (to make it smoother)
    });
}



/* =========================================================================================================
    LOGIN VALIDATION HELPER 
========================================================================================================= */

/* Login Username Validation  ----------------------------------------
    Cannot be blank
    Must exist in localStorage
    Case-insensitive */

function validateLoginUsername(usernameRaw, users) {
    const username = usernameRaw.trim();

    if (!username) {
        return "Username cannot be blank.";
    }

    const usernameLower = username.toLowerCase();
    // Check if the key exists in the object
    if (!users[usernameLower]) {
        return "That usernamedoes not exist.";
    }

    return null;
}

/* Login Password Validation -----------------------------------------
    Cannot be blank
    Must match stored password in localStorage */

function validateLoginPassword(passwordRaw, usernameRaw, users) {
    const password = passwordRaw;
    const usernameLower = usernameRaw.trim().toLowerCase();
    // Use the same lowercase username key as registration

    // Compare the plain password strings
    if (!password) {
        return "Password cannot be blank.";
    }

    // Retrieve user object
    const user = users[usernameLower];
    // Safety check: ensure user exists before checking password
    if (!user) {
        return "That username does not exist.";
    }

    // Check if entered password matches stored password
    if (password !== user.password) {
        return "Incorrect password.";
    }
    return null;
}


/* =============================================================================================================
    LOGIN FROM HANDLER
============================================================================================================== */

/* Prevent Default Submisssion ---------------------------------------
    Grabs the:
        Username
        Password
        "Keep me logged in" checkbox */

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        resetErrorBoxStyle();
        clearError();

        const form = event.target;
        const usernameInput = form.elements["username"];
        const passwordInput = form.elements["password"];
        const persistInput = form.elements["persist"];

        const users = loadUsers();

/* Validate Submisssion ----------------------------------------------
    If anything fails:
        Show error
        Focus input
        Stop */

        const usernameError = validateLoginUsername(usernameInput.value, users);
        if (usernameError) {
            showError(usernameError, usernameInput);
            return;
        }

        const passwordError = validateLoginPassword(
            passwordInput.value,
            usernameInput.value,
            users
        );

        if (passwordError) {
            showError(passwordError, passwordInput);
            return;
        }


/* Submisssion Success ---------------------------------------------------------------------------------------
    Clear the form
    Show a success message when suffix checked:
        "Keep me logged in" */

        form.reset();

        let successMessage = "Login successful!";
        if (persistInput.checked) {
            successMessage += "(You will be kept logged in.)";
        }

        showSuccess(successMessage)

        setTimeout (() => {
            resetErrorBoxStyle();
        }, 0);
    });
}

