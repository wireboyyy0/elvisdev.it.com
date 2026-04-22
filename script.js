
let slides = document.querySelectorAll('.slide');
let current = 0;

function changeSlide() {
    if (slides.length > 0) {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }
}

// Run slider every 3 seconds
setInterval(changeSlide, 3000);

async function signup() {
    let fullName = document.getElementById("fullName")?.value;
    let email = document.getElementById("email")?.value;
    let username = document.getElementById("username")?.value;
    let password = document.getElementById("password")?.value;

    if (!fullName || !email || !username || !password) {
        document.getElementById("message").innerText = "Please fill all fields";
        return;
    }

    try {
        const userCredential = await window.createUserWithEmailAndPassword(window.auth, email, password);
        const user = userCredential.user;

        // Save additional user data to Firestore
        await window.setDoc(window.doc(window.db, "users", user.uid), {
            fullName: fullName,
            username: username,
            email: email
        });

        document.getElementById("message").innerText = "Account created successfully!";
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);
    } catch (error) {
        document.getElementById("message").innerText = error.message;
    }
}

async function login() {
    let email = document.getElementById("email")?.value;
    let password = document.getElementById("password")?.value;

    if (!email || !password) {
        document.getElementById("message").innerText = "Please enter email and password";
        return;
    }

    try {
        const userCredential = await window.signInWithEmailAndPassword(window.auth, email, password);
        document.getElementById("message").innerText = "Login successful!";
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500);
    } catch (error) {
        document.getElementById("message").innerText = error.message;
    }
}


async function resetPassword() {
    let email = document.getElementById("email")?.value;

    if (!email) {
        document.getElementById("message").innerText = "Please enter your email";
        return;
    }

    try {
        await window.sendPasswordResetEmail(window.auth, email);
        document.getElementById("message").innerText = "Reset link sent to your email!";
    } catch (error) {
        document.getElementById("message").innerText = error.message;
    }
}


let form = document.querySelector('.contact-form');

if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert("Message sent successfully!");
    });
}


let elements = document.querySelectorAll('.fade-in');

function showOnScroll() {
    elements.forEach(el => {
        let position = el.getBoundingClientRect().top;
        let screenHeight = window.innerHeight;

        if (position < screenHeight - 100) {
            el.classList.add('show');
        }
    });
}

window.addEventListener('scroll', showOnScroll);



async function logout() {
    try {
        await window.signOut(window.auth);
        window.location.href = "login.html";
    } catch (error) {
        console.error("Logout error:", error);
    }
}

function checkLogin() {
    window.onAuthStateChanged(window.auth, (user) => {
        const navbar = document.querySelector('.navbar');
        const loginLink = document.querySelector('.navbar a[href="login.html"]');
        const existingUserInfo = document.querySelector('.user-info');

        if (existingUserInfo) existingUserInfo.remove();

        if (user) {
            // Hide login link
            if (loginLink) loginLink.style.display = 'none';
            // Create user info section
            const userDiv = document.createElement('div');
            userDiv.className = 'user-info';
            userDiv.innerHTML = `<span>Welcome, ${user.email}</span> <a href="#" onclick="logout()">Sign Out</a>`;
            navbar.appendChild(userDiv);
        } else {
            // Show login link
            if (loginLink) loginLink.style.display = 'inline-block';
        }
    });
}

window.addEventListener('DOMContentLoaded', checkLogin);