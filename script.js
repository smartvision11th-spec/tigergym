// ===========================
// LOADER
// ===========================

window.addEventListener("load", () => {
  document.querySelector(".loader-wrapper").style.display = "none";
});

// ===========================
// MOBILE MENU
// ===========================

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// ===========================
// STICKY NAVBAR
// ===========================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// ===========================
// SCROLL REVEAL
// ===========================

const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.2,
  }
);

reveals.forEach((el) => {
  revealObserver.observe(el);
});

// ===========================
// LIGHTBOX
// ===========================

const galleryImages = document.querySelectorAll(".gallery-item img");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeLightbox = document.querySelector(".close-lightbox");

galleryImages.forEach((img) => {
  img.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
  });
});

closeLightbox.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// ===========================
// COUNTER
// ===========================

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.dataset.target;
        let count = 0;

        const updateCounter = () => {
          const increment = target / 100;

          if (count < target) {
            count += increment;
            counter.innerText = Math.ceil(count);
            requestAnimationFrame(updateCounter);
          } else {
            counter.innerText = target;
          }
        };

        updateCounter();
      }
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => {
  counterObserver.observe(counter);
});

// ===========================
// BMI CALCULATOR
// ===========================

const calculateBtn = document.getElementById("calculateBtn");

calculateBtn.addEventListener("click", () => {
  const height = document.getElementById("height").value / 100;
  const weight = document.getElementById("weight").value;
  const result = document.getElementById("bmiResult");

  if (!height || !weight) {
    result.innerHTML = "Please enter height and weight.";
    return;
  }

  const bmi = (weight / (height * height)).toFixed(1);

  let category = "";
  let suggestion = "";

  if (bmi < 18.5) {
    category = "Underweight";
    suggestion =
      "Join TIGER GYM muscle gain programs to build strength and size.";
  } else if (bmi < 25) {
    category = "Normal";
    suggestion =
      "Maintain your physique and achieve aesthetic body goals at TIGER GYM.";
  } else {
    category = "Overweight / Obese";
    suggestion =
      "Join TIGER GYM fat loss transformation programs for healthier fitness.";
  }

  result.innerHTML = `
    <h3>Your BMI: ${bmi}</h3>
    <p><strong>Category:</strong> ${category}</p>
    <p>${suggestion}</p>
  `;
});

// ===========================
// BACK TO TOP
// ===========================

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ===========================
// PRICING AUTO FILL
// ===========================

const chooseButtons = document.querySelectorAll(".choose-plan");
const planInput = document.getElementById("plan");

chooseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedPlan = button.dataset.plan;

    planInput.value = selectedPlan;

    document
      .getElementById("booking")
      .scrollIntoView({ behavior: "smooth" });
  });
});

// ===========================
// WHATSAPP FORM SUBMIT
// ===========================

const gymForm = document.getElementById("gymForm");

gymForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const mobile = document.getElementById("mobile").value;
  const gender = document.getElementById("gender").value;
  const goal = document.getElementById("goal").value;
  const plan = document.getElementById("plan").value;
  const joiningDate = document.getElementById("joiningDate").value;

  const services = Array.from(
    document.getElementById("servicesSelect").selectedOptions
  )
    .map((option) => option.value)
    .join(", ");

  const message = `
*TIGER GYM Booking*

Name: ${name}
Mobile: ${mobile}
Gender: ${gender}
Goal: ${goal}
Services: ${services}
Plan: ${plan}
Joining Date: ${joiningDate}
`;

  const whatsappURL = `https://wa.me/919648470944?text=${encodeURIComponent(
    message
  )}`;

  window.open(whatsappURL, "_blank");

  gymForm.reset();
});
