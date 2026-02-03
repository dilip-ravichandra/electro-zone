// ============================
// AUTHENTICATION MODULE
// ============================
const Auth = {
    API_BASE_URL: "http://localhost:5000/api/auth",

    // View Switching
    switchToSignup() {
        const loginForm = document.getElementById("loginForm");
        const signupForm = document.getElementById("signupForm");
        if (loginForm) loginForm.classList.add("hidden");
        if (signupForm) signupForm.classList.remove("hidden");
        document.title = "Sign Up - ElectroZone";
        this.hideAllMessages();
    },

    switchToLogin() {
        const signupForm = document.getElementById("signupForm");
        const loginForm = document.getElementById("loginForm");
        if (signupForm) signupForm.classList.add("hidden");
        if (loginForm) loginForm.classList.remove("hidden");
        document.title = "Login - ElectroZone";
        this.hideAllMessages();
    },

    // Password Visibility
    togglePassword(inputId) {
        const input = document.getElementById(inputId);
        if (!input) return;
        const button = input.nextElementSibling;
        
        if (input.type === "password") {
            input.type = "text";
            if (button) button.textContent = "🙈";
        } else {
            input.type = "password";
            if (button) button.textContent = "👁️";
        }
    },

    // Message Handling
    showMessage(messageId) {
        const msg = document.getElementById(messageId);
        if (msg) {
            msg.classList.add("show");
            setTimeout(() => {
                msg.classList.remove("show");
            }, 5000);
        }
    },

    hideAllMessages() {
        document.querySelectorAll(".form-message").forEach(msg => {
            msg.classList.remove("show");
        });
    },

    // Login Handler
    async handleLogin(event) {
        event.preventDefault();
        this.hideAllMessages();

        const email = document.getElementById("loginEmail")?.value.trim();
        const password = document.getElementById("loginPassword")?.value;

        if (!email || !password) {
            document.getElementById("loginError").textContent = "Email and password required";
            this.showMessage("loginError");
            return;
        }

        try {
            const response = await fetch(`${this.API_BASE_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                document.getElementById("loginError").textContent = data.message || "Login failed";
                this.showMessage("loginError");
                return;
            }

            // Save token and username
            localStorage.setItem("authToken", data.token);
            
            // Try to get user details
            try {
                const userResponse = await fetch(`${this.API_BASE_URL}/me`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${data.token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (userResponse.ok) {
                    const userData = await userResponse.json();
                    localStorage.setItem("username", userData.name);
                }
            } catch (e) {
                console.warn("Could not fetch user details, using email as fallback");
                localStorage.setItem("username", email.split('@')[0]);
            }

            // Redirect to home
            window.location.href = "home.html";

        } catch (error) {
            console.error("Login error:", error);
            document.getElementById("loginError").textContent = "Unable to connect to server";
            this.showMessage("loginError");
        }
    },

    // Signup Handler
    async handleSignup(event) {
        event.preventDefault();
        this.hideAllMessages();

        const name = document.getElementById("signupName")?.value.trim();
        const email = document.getElementById("signupEmail")?.value.trim();
        const password = document.getElementById("signupPassword")?.value;
        const confirmPassword = document.getElementById("signupConfirmPassword")?.value;

        if (!name || !email || !password || !confirmPassword) {
            document.getElementById("signupError").textContent = "All fields required";
            this.showMessage("signupError");
            return;
        }

        if (password !== confirmPassword) {
            document.getElementById("signupError").textContent = "Passwords do not match";
            this.showMessage("signupError");
            return;
        }

        if (password.length < 8) {
            document.getElementById("signupError").textContent = "Password must be at least 8 characters";
            this.showMessage("signupError");
            return;
        }

        try {
            const response = await fetch(`${this.API_BASE_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                document.getElementById("signupError").textContent = data.message || "Signup failed";
                this.showMessage("signupError");
                return;
            }

            document.getElementById("signupSuccess").textContent = "Account created! Redirecting to login...";
            this.showMessage("signupSuccess");

            setTimeout(() => {
                this.switchToLogin();
                // Clear form
                document.getElementById("signupForm").reset();
            }, 2000);

        } catch (error) {
            console.error("Signup error:", error);
            document.getElementById("signupError").textContent = "Unable to connect to server";
            this.showMessage("signupError");
        }
    }
};

// ============================
// INITIALIZATION
// ============================
document.addEventListener("DOMContentLoaded", () => {
    const emailInput = document.getElementById("loginEmail");
    if (emailInput) emailInput.focus();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        window.location.href = "auth.html";
    }
});
