document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
     1. CUSTOM CURSOR
     ========================================= */
  const cursor = document.querySelector(".cursor");
  const follower = document.querySelector(".cursor-follower");
  const hoverTargets = document.querySelectorAll(".hover-target");

  if (window.innerWidth > 900 && cursor && follower) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
      setTimeout(() => {
        follower.style.left = e.clientX + "px";
        follower.style.top = e.clientY + "px";
      }, 50);
    });

    hoverTargets.forEach((target) => {
      target.addEventListener("mouseenter", () => {
        follower.classList.add("active");
        cursor.style.opacity = "0";
      });
      target.addEventListener("mouseleave", () => {
        follower.classList.remove("active");
        cursor.style.opacity = "1";
      });
    });
  }

  /* =========================================
     2. PARALLAX EFFECT
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
     3. SCROLL REVEAL ANIMATION
     ========================================= */
  const reveals = document.querySelectorAll(".reveal");
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;
    reveals.forEach((reveal) => {
      const elementTop = reveal.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add("active");
      }
    });
  };
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  /* =========================================
     4. SLIDER PROJECT BUTTONS
     ========================================= */
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
     5. MOBILE MENU (SIDEBAR)
     ========================================= */
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("nav-active");
      const spans = hamburger.querySelectorAll("span");

      // Animasi Ikon Hamburger X
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
        const spans = hamburger.querySelectorAll("span");
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      });
    });
  }

  /* =========================================
     6. BACK TO TOP BUTTON
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
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* =========================================
     7. JAM DIGITAL (Opsional)
     ========================================= */
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

  /* =========================================
     8. FITUR INPUT DATASHEET (Fix Terbaru)
     ========================================= */
  const btnKirim = document.getElementById("btnKirim");
  const tableBody = document.querySelector(".content-table tbody");
  const inputNama = document.getElementById("nama");
  const inputPesan = document.getElementById("pesan");

  if (btnKirim && tableBody) {
    btnKirim.addEventListener("click", (e) => {
      e.preventDefault(); // Mencegah halaman refresh!

      // Validasi
      if (inputNama.value.trim() === "" || inputPesan.value.trim() === "") {
        alert("Harap isi Nama dan Pesan terlebih dahulu!");
        return;
      }

      // Persiapan Data
      const noUrut = tableBody.rows.length + 1;
      const dateObj = new Date();
      const options = { day: "2-digit", month: "short", year: "numeric" };
      const tanggalSekarang = dateObj.toLocaleDateString("id-ID", options);

      // Buat Elemen Baris
      const newRow = document.createElement("tr");

      // Isi Konten HTML Baris (Status otomatis 'Aktif' hijau)
      newRow.innerHTML = `
        <td>${noUrut}</td>
        <td>${inputNama.value}</td>
        <td>${inputPesan.value}</td> 
        <td style="color: #27c93f; font-weight: bold;">Aktif</td>
        <td>${tanggalSekarang}</td>
      `;

      // Masukkan ke Tabel dengan Animasi
      newRow.style.opacity = "0";
      tableBody.appendChild(newRow);

      setTimeout(() => {
        newRow.style.opacity = "1";
        newRow.style.transition = "opacity 0.5s";
      }, 50);

      // Reset Form
      inputNama.value = "";
      if (document.getElementById("email"))
        document.getElementById("email").value = "";
      inputPesan.value = "";

      // Feedback
      alert("Data berhasil disimpan! Status: Aktif");
      document
        .querySelector(".datasheet-container")
        .scrollIntoView({ behavior: "smooth" });
    });
  }
  /* =========================================
     10. MINI GAME (SNAKE)
     ========================================= */
  const canvas = document.getElementById("gameCanvas");

  // Cek apakah elemen game ada di halaman
  if (canvas) {
    const ctx = canvas.getContext("2d");
    const scoreElement = document.getElementById("score");
    const startBtn = document.getElementById("startBtn");

    // Setting Game
    const gridSize = 15; // Ukuran kotak
    const tileCount = 20; // Jumlah kotak (300px / 15 = 20)
    let score = 0;

    // Posisi Ular & Makanan
    let snake = [{ x: 10, y: 10 }]; // Ekor awal
    let food = { x: 15, y: 15 };
    let dx = 0;
    let dy = 0;
    let gameInterval;
    let isGameRunning = false;

    // 1. Fungsi Utama Game Loop
    function gameLoop() {
      if (!isGameRunning) return;

      update();
      draw();
    }

    // 2. Update Logika (Gerakan & Tabrakan)
    function update() {
      // Gerakkan kepala ular
      const head = { x: snake[0].x + dx, y: snake[0].y + dy };

      // Cek Tabrakan Tembok (Tembus tembok muncul di seberang)
      if (head.x < 0) head.x = tileCount - 1;
      if (head.x >= tileCount) head.x = 0;
      if (head.y < 0) head.y = tileCount - 1;
      if (head.y >= tileCount) head.y = 0;

      // Cek Tabrakan Diri Sendiri
      for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
          resetGame();
          return;
        }
      }

      snake.unshift(head); // Tambah kepala baru di depan

      // Cek Makan Apel
      if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.innerText = score;
        spawnFood(); // Buat makanan baru
      } else {
        snake.pop(); // Hapus ekor (agar ular bergerak, bukan memanjang terus)
      }
    }

    // 3. Menggambar ke Canvas
    function draw() {
      // Bersihkan layar
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Gambar Ular (Warna Hijau Tech)
      ctx.fillStyle = "#27c93f";
      snake.forEach((part) => {
        ctx.fillRect(
          part.x * gridSize,
          part.y * gridSize,
          gridSize - 2,
          gridSize - 2
        );
      });

      // Gambar Makanan (Warna Merah)
      ctx.fillStyle = "#ff5f56";
      ctx.fillRect(
        food.x * gridSize,
        food.y * gridSize,
        gridSize - 2,
        gridSize - 2
      );
    }

    // 4. Buat Makanan Random
    function spawnFood() {
      food.x = Math.floor(Math.random() * tileCount);
      food.y = Math.floor(Math.random() * tileCount);
      // Pastikan makanan tidak muncul di badan ular
      snake.forEach((part) => {
        if (part.x === food.x && part.y === food.y) spawnFood();
      });
    }

    // 5. Reset Game
    function resetGame() {
      isGameRunning = false;
      clearInterval(gameInterval);
      alert("GAME OVER! Score: " + score);
      startBtn.innerText = "RESTART GAME";
      startBtn.style.display = "block";
      snake = [{ x: 10, y: 10 }];
      dx = 0;
      dy = 0;
      score = 0;
      scoreElement.innerText = "0";
      draw(); // Gambar posisi awal
    }

    // 6. Kontrol Keyboard (Desktop)
    document.addEventListener("keydown", (e) => {
      if (!isGameRunning) return;
      // Mencegah scroll saat main game dengan panah
      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1
      ) {
        e.preventDefault();
      }
      changeDirection(e.key);
    });

    // 7. Kontrol Tombol Layar (Mobile)
    document
      .getElementById("upBtn")
      .addEventListener("click", () => changeDirection("ArrowUp"));
    document
      .getElementById("downBtn")
      .addEventListener("click", () => changeDirection("ArrowDown"));
    document
      .getElementById("leftBtn")
      .addEventListener("click", () => changeDirection("ArrowLeft"));
    document
      .getElementById("rightBtn")
      .addEventListener("click", () => changeDirection("ArrowRight"));

    function changeDirection(key) {
      // Mencegah ular balik arah langsung (contoh: lagi ke atas, gak boleh langsung ke bawah)
      if (key === "ArrowUp" && dy !== 1) {
        dx = 0;
        dy = -1;
      }
      if (key === "ArrowDown" && dy !== -1) {
        dx = 0;
        dy = 1;
      }
      if (key === "ArrowLeft" && dx !== 1) {
        dx = -1;
        dy = 0;
      }
      if (key === "ArrowRight" && dx !== -1) {
        dx = 1;
        dy = 0;
      }
    }

    // 8. Mulai Game
    startBtn.addEventListener("click", () => {
      if (isGameRunning) return;
      isGameRunning = true;
      startBtn.style.display = "none";
      spawnFood();
      gameInterval = setInterval(gameLoop, 100); // Kecepatan game (makin kecil makin cepat)
    });

    // Gambar awal sebelum main
    draw();
  }
});
