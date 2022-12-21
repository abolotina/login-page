const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const registerButton = document.getElementById("login-form-register");
const loginErrorMsg = document.getElementById("login-error-msg");

function hash(password, salt) {
    var p = password.concat(salt).split("");
    var h = 0n;
    for (let c of p) {
        h = h * 1000 + c.charCodeAt(0);
    }
    return h + 3;
}

// When the login button is clicked, the following code is executed
loginButton.addEventListener("click", (e) => {
    // Prevent the default submission of the form
    e.preventDefault();

    var hashm = {};
    const f = require('fs');
    const readline = require('readline');
    var user_file = './data.txt';
    var r = readline.createInterface({
        input : f.createReadStream(user_file)
    });
    r.on('line', function (text) {
        let data = text.split(" ");
        var salt = data[1];
        hashm[data[0]] = data[2];
    });

    // Get the values input by the user in the form fields
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (hash(password, salt) === hashm[username]) {
        // If the credentials are valid, show an alert box and reload the page
        alert("You have successfully logged in.");
        location.reload();
    } else {
        // Otherwise, make the login error message show (change its oppacity)
        //loginErrorMsg.style.opacity = 1;
        alert("Invalid username and/or password.");
    }
})

registerButton.addEventListener("click", (e) => {
    // Prevent the default submission of the form
    e.preventDefault();

    var hashm = {};
    const f = require('fs');
    const readline = require('readline');
    var user_file = './data.txt';
    var r = readline.createInterface({
        input : f.createReadStream(user_file)
    });
    r.on('line', function (text) {
        let data = text.split(" ");
        var salt = data[1];
        hashm[data[0]] = data[2];
    });

    const username = loginForm.username.value;
    const password = loginForm.password.value;

    // Inadequate Encryption/Encoding Strength (CWE-261/326)
    // Predictable Randomness (CWE-329/330/340)
    // Salts & Reversible One-Way Hash (CWE-328/759/760/916)
    var salt1 = "";
    var salt2 = username;
    // Inadequate Seed Use in PRNGs (CWE-335/336/337)
    Srand.seed(10);
    var salt3 = Srand.random().toString();
    // Inadequate Seed Use in PRNGs (CWE-335/336/337)
    Srand.seed(hash(username, ""));
    var salt4 = Srand.random().toString();

    var w = f.createWriteStream(user_file);

    if (hashm.has(username)) {
        alert("Username already exists!");
    } else {
        w.write("${username} ${hash(password, salt1)}");
    }
})