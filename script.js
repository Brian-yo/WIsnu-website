document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
     1. PRELOADER
     ========================================= */
  const preloader = document.querySelector(".preloader");

  window.addEventListener("load", () => {
    // Hilangkan preloader saat halaman selesai dimuat
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  });

  /* =========================================
     2. CUSTOM CURSOR
     ========================================= */
  const cursor = document.querySelector(".cursor");
  const follower = document.querySelector(".cursor-follower");
  const hoverTargets = document.querySelectorAll(".hover-target");

  // Hanya jalankan custom cursor di layar besar (Desktop)
  if (window.innerWidth > 900) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";

      // Follower ada sedikit delay (transition di CSS)
      setTimeout(() => {
        follower.style.left = e.clientX + "px";
        follower.style.top = e.clientY + "px";
      }, 50);
    });

    hoverTargets.forEach((target) => {
      target.addEventListener("mouseenter", () => {
        follower.classList.add("active");
        cursor.style.opacity = "0"; // Sembunyikan titik tengah saat hover
      });

      target.addEventListener("mouseleave", () => {
        follower.classList.remove("active");
        cursor.style.opacity = "1";
      });
    });
  }

  /* =========================================
     3. PARALLAX EFFECT (HERO & ABOUT)
     ========================================= */
  const parallaxItems = document.querySelectorAll(".parallax");

  if (window.innerWidth > 900) {
    document.addEventListener("mousemove", (e) => {
      parallaxItems.forEach((item) => {
        const speed = item.getAttribute("data-speed");
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;

        item.style.transform = `translateX(${x}px) translateY(${y}px)`;
      });
    });
  }

  /* =========================================
     4. SCROLL REVEAL ANIMATION
     ========================================= */
  const reveals = document.querySelectorAll(".reveal");

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 150; // Jarak buffer

    reveals.forEach((reveal) => {
      const elementTop = reveal.getBoundingClientRect().top;

      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Panggil sekali saat load

  // 5. MOBILE BUTTONS (SLIDER PROJECTS)
  const slideBack = document.getElementById("slideBack");
  const slideNext = document.getElementById("slideNext");
  const scrollContainer = document.querySelector(
    ".horizontal-scroll-container"
  );

  if (slideBack && slideNext && scrollContainer) {
    slideNext.addEventListener("click", () => {
      scrollContainer.scrollBy({ left: 300, behavior: "smooth" });
    });

    slideBack.addEventListener("click", () => {
      scrollContainer.scrollBy({ left: -300, behavior: "smooth" });
    });
  }
  /* =========================================
     6. MOBILE MENU (HAMBURGER)
     ========================================= */
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("nav-active");

      // Animasi garis hamburger
      const spans = hamburger.querySelectorAll("span");
      if (navLinks.classList.contains("nav-active")) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
      } else {
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      }
    });

    // Tutup menu saat link diklik
    document.querySelectorAll(".nav-links li a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("nav-active");
        // Reset hamburger
        const spans = hamburger.querySelectorAll("span");
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      });
    });
  }

  /* =========================================
     7. BACK TO TOP BUTTON
     ========================================= */
  const scrollTopBtn = document.getElementById("scrollToTop");

  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add("active");
      } else {
        scrollTopBtn.classList.remove("active");
      }
    });

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  /* =========================================
     8. REAL-TIME CLOCK (TECH WINDOW)
     ========================================= */
  // Pastikan di HTML kamu ada elemen: <span id="localTime"></span>
  // Jika belum ada, kamu bisa menambahkannya di section Contact
  const timeElement = document.getElementById("localTime");

  if (timeElement) {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      timeElement.textContent = `${hours}:${minutes}`;
    };
    setInterval(updateTime, 1000);
    updateTime();
  }
});
