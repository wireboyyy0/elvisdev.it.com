let slides = document.querySelectorAll('.slide');
let current = 0;

function changeSlide() {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
}

setInterval(changeSlide, 3000);
document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert("Message sent successfully!");
});
function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // demo credentials
    let correctUser = "admin";
    let correctPass = "1234";

    if (username === correctUser && password === correctPass) {
        document.getElementById("message").innerText = "Login successful!";
        window.location.href = "index.html";
    } else {
        document.getElementById("message").innerText = "Invalid username or password";
    }
}
.login-container {
    width: 300px;
    margin: 100px auto;
    text-align: center;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.login-container input {
    width: 90%;
    padding: 10px;
}

.login-container button {
    padding: 10px 20px;
    background: #333;
    color: white;
    border: none;
    cursor: pointer;
}

.login-container button:hover {
    background: #555;
}