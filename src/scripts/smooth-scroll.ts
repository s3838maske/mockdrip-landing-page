// Inertial smooth scrolling. Lenis drives the native scroll position, so sticky
// positioning, IntersectionObserver and the rAF choreography keep working unchanged.
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { prefersReducedMotion } from './motion';

export function initSmoothScroll() {
  if (prefersReducedMotion()) return;
  const lenis = new Lenis({
    lerp: 0.1,
    // In-page nav links glide too; the offset clears the floating nav bar.
    anchors: { offset: -80 },
  });
  const raf = (t: number) => {
    lenis.raf(t);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
}
