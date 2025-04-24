document.addEventListener("DOMContentLoaded", function () {
    // Smooth scrolling for navbar links
    document.querySelectorAll(".nav-link").forEach(anchor => {
        anchor.addEventListener("click", function (event) {
            event.preventDefault();
            const section = document.querySelector(this.getAttribute("href"));
            if (section) {
                section.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

    // Sticky Navbar on scroll
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            navbar.classList.add("shadow-sm", "bg-light");
        } else {
            navbar.classList.remove("shadow-sm", "bg-light");
        }
    });

    // Dark Mode Toggle with Local Storage
    const toggleDarkMode = document.getElementById("dark-mode-toggle");
    if (toggleDarkMode) {
        toggleDarkMode.addEventListener("click", function () {
            document.body.classList.toggle("bg-dark");
            document.body.classList.toggle("text-white");
            navbar.classList.toggle("navbar-dark");
            navbar.classList.toggle("bg-dark");
            
            let darkMode = document.body.classList.contains("bg-dark");
            localStorage.setItem("darkMode", darkMode);
        });

        // Load saved dark mode preference
        if (localStorage.getItem("darkMode") === "true") {
            document.body.classList.add("bg-dark", "text-white");
            navbar.classList.add("navbar-dark", "bg-dark");
        }
    }

    // Animate elements on scroll
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate__animated", "animate__fadeIn");
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll(".fade-in").forEach(element => {
        observer.observe(element);
    });

    // Skill Bars Animation
    const skillBars = document.querySelectorAll(".progress-bar");
    skillBars.forEach(bar => {
        observer.observe(bar);
        bar.dataset.observed = "false";
    });

    observer.observe({
        isIntersecting: function (entry) {
            const bar = entry.target;
            if (entry.isIntersecting && bar.dataset.observed === "false") {
                bar.style.width = bar.getAttribute("data-skill") + "%";
                bar.dataset.observed = "true";
            }
        }
    });

    // Form Validation
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            if (name === "" || email === "" || message === "") {
                alert("Please fill in all fields.");
            } else {
                alert("Message sent successfully!");
                contactForm.reset();
            }
        });
    }
});