const memberCount = document.querySelector(".member-count");
const communityReach = document.querySelector(".community-reach");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (memberCount && communityReach && !reduceMotion) {
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
