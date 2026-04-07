import gsap from 'gsap';

export const fadeIn = (element: string | HTMLElement, delay: number = 0) => {
  return gsap.from(element, {
    opacity: 0,
    y: 20,
    duration: 1,
    delay,
    ease: 'power3.out',
  });
};