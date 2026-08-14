const menuToggle = document.querySelector(".menu-toggle");
const siteMenu = document.querySelector("#site-menu");

if (menuToggle && siteMenu) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    siteMenu.classList.remove("is-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    siteMenu.classList.toggle("is-open", !isOpen);
  });

  siteMenu.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".nav")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      menuToggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 620) closeMenu();
  });
}

const copyButton = document.querySelector(".copy-button");
const copyStatus = document.querySelector(".copy-status");

if (copyButton && copyStatus) {
  copyButton.addEventListener("click", async () => {
    const value = copyButton.dataset.copy;

    try {
      await navigator.clipboard.writeText(value);
      copyButton.querySelector(".copy-button-label").textContent = "Copied";
      copyStatus.textContent = `${value} copied to your clipboard.`;

      window.setTimeout(() => {
        copyButton.querySelector(".copy-button-label").textContent = "Copy username";
        copyStatus.textContent = "";
      }, 3000);
    } catch {
      copyStatus.textContent = `Copy failed — my username is ${value}.`;
    }
  });
}

const memberCount = document.querySelector(".member-count");
const communityReach = document.querySelector(".community-reach");

if (memberCount && communityReach) {
  const target = Number(memberCount.dataset.count);
  const duration = 4000;
  const numberFormatter = new Intl.NumberFormat("en-GB");

  memberCount.textContent = "0";

  const animateCount = () => {
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      const currentCount = Math.round(target * easedProgress);

      memberCount.textContent = numberFormatter.format(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        animateCount();
        observer.disconnect();
      }
    },
    { threshold: 0.25 }
  );

  observer.observe(communityReach);
}
