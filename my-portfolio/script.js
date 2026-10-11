
document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     LOGO CLICK
  ========================= */

  const logo = document.querySelector(".logo");

  if (logo) {
    logo.addEventListener("click", (event) => {
      event.preventDefault();
      alert("Welcome to my portfolio!");
    });
  }

  /* =========================
     WATER RIPPLE EFFECT
  ========================= */

  document.addEventListener("click", (event) => {
    for (let i = 0; i < 3; i++) {
      const ripple = document.createElement("span");

      ripple.classList.add("ripple");
      ripple.style.left = `${event.clientX}px`;
      ripple.style.top = `${event.clientY}px`;
      ripple.style.animationDelay = `${i * 120}ms`;

      document.body.appendChild(ripple);

      ripple.addEventListener("animationend", () => {
        ripple.remove();
      });
    }
  });

  /* =========================
     PIXELATED IMAGE EFFECT
  ========================= */

  document.querySelectorAll(".pixelated-image-card").forEach((card) => {
    const img = card.querySelector(".pixel-image");
    const canvas = card.querySelector(".pixelated-preview");
    const grid = card.querySelector(".pixelated-image-card__pixels");

    if (!img || !canvas || !grid) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const PIXEL_SIZE = 28;
    const MAX_FILL_DURATION = 650;

    let cells = [];
    let timers = [];
    let active = false;
    let isHovering = false;
    let resizeTimer;

    function clearTimers() {
      timers.forEach(clearTimeout);
      timers = [];
    }

    function prepare() {
      if (!img.complete || !img.naturalWidth) return;

      const width = card.clientWidth;
      const height = card.clientHeight;

      if (!width || !height) return;

      canvas.width = width;
      canvas.height = height;

      const cols = Math.ceil(width / PIXEL_SIZE);
      const rows = Math.ceil(height / PIXEL_SIZE);

      const small = document.createElement("canvas");
      small.width = cols;
      small.height = rows;

      const smallCtx = small.getContext("2d", {
        willReadFrequently: true
      });

      if (!smallCtx) return;

      // Match object-fit: cover cropping.
      const scale = Math.max(
        width / img.naturalWidth,
        height / img.naturalHeight
      );

      const sourceWidth = width / scale;
      const sourceHeight = height / scale;

      smallCtx.drawImage(
        img,
        (img.naturalWidth - sourceWidth) / 2,
        (img.naturalHeight - sourceHeight) / 2,
        sourceWidth,
        sourceHeight,
        0,
        0,
        cols,
        rows
      );

      // Draw the actual image as a low-resolution preview.
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(small, 0, 0, width, height);

      // Sample each pixel's real colour.
      const imageData = smallCtx.getImageData(
        0, 0, cols, rows
      );

      const data = imageData.data;
      const pixelColors = [];

      for (let i = 0; i < data.length; i += 4) {
        pixelColors.push(
          `rgb(${data[i]}, ${data[i + 1]}, ${data[i + 2]})`
        );
      }

      // Rebuild the coloured pixel grid.
      grid.innerHTML = "";
      cells = [];

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const pixel = document.createElement("div");

          pixel.className = "pixelated-image-card__pixel";

          pixel.style.backgroundColor =
            pixelColors[row * cols + col];

          pixel.style.left = `${(col / cols) * 100}%`;
          pixel.style.top = `${(row / rows) * 100}%`;
          pixel.style.width = `${100 / cols}%`;
          pixel.style.height = `${100 / rows}%`;

          grid.appendChild(pixel);
          cells.push(pixel);
        }
      }
    }

    function shuffle(array) {
      const result = [...array];

      for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [result[i], result[j]] = [result[j], result[i]];
      }

      return result;
    }

    function showPixelation() {
      if (active || !isHovering) return;

      prepare();

      if (!cells.length) return;

      clearTimers();

      card.classList.remove("is-active");
      card.classList.add("is-transitioning");

      const order = shuffle(cells);

      const stepDelay = Math.min(
        1,
        MAX_FILL_DURATION / order.length
      );

      order.forEach((pixel, index) => {
        const timer = setTimeout(() => {
          if (isHovering) {
            pixel.style.opacity = "1";
          }
        }, index * stepDelay);

        timers.push(timer);
      });

      const duration = Math.min(
        order.length * stepDelay + 30,
        MAX_FILL_DURATION
      );

      timers.push(
        setTimeout(() => {
          if (!isHovering) return;

          card.classList.add("is-active");
          card.classList.remove("is-transitioning");

          active = true;
        }, duration)
      );
    }

    function resetPixelation() {
      isHovering = false;
      active = false;

      clearTimers();

      card.classList.remove(
        "is-transitioning",
        "is-active"
      );

      cells.forEach((pixel) => {
        pixel.style.opacity = "0";
      });
    }

    card.addEventListener("mouseenter", () => {
      isHovering = true;
      showPixelation();
    });

    card.addEventListener("mouseleave", resetPixelation);

    // Prepare after the image loads.
    if (img.complete && img.naturalWidth) {
      prepare();
    } else {
      img.addEventListener("load", prepare, { once: true });
    }

    img.addEventListener("error", () => {
      console.error("Project image could not load:", img.src);
    });

    // Rebuild on resize without repeatedly firing.
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
        prepare();

        if (isHovering) {
          active = false;
          showPixelation();
        }
      }, 150);
    });
  });
});
