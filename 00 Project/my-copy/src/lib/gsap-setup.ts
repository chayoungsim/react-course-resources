import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 필요한 플러그인 등록
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default gsap;
export { ScrollTrigger };