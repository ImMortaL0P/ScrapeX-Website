import { useEffect } from "react";

/**
 * Fades sections in as they arrive.
 * Anything already on (or near) the screen is shown immediately, so a deep link to
 * #install never lands on blank boxes, and a safety timer reveals the rest if the
 * observer never fires. Motion-reduced visitors get everything at once.
 */
export function useReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const showAll = () => nodes.forEach((n) => n.classList.add("is-in"));

    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      showAll();
      return;
    }

    // whatever is already within a screen and a half of the viewport
    const near = () => {
      const limit = window.innerHeight * 1.5;
      for (const n of nodes) {
        const top = n.getBoundingClientRect().top;
        if (top < limit) n.classList.add("is-in");
      }
    };
    near();

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );
    nodes.forEach((n) => io.observe(n));

    // if anything is still hidden well after load, it was never going to animate
    const failsafe = window.setTimeout(showAll, 6000);
    window.addEventListener("hashchange", near);
    return () => {
      io.disconnect();
      clearTimeout(failsafe);
      window.removeEventListener("hashchange", near);
    };
  }, []);
}
