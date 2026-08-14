const memberCount = document.querySelector(".member-count");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (memberCount && !reduceMotion) {
  const target = Number(memberCount.dataset.count);
  const duration = 1800;

  memberCount.textContent = "0";

  const animateCount = () => {
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.round(target * easedProgress);

      memberCount.textContent = currentCount.toLocaleString("en-GB");

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
    { threshold: 0.35 }
  );

  observer.observe(memberCount);
}
