import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
 const videoRef = useRef();
 
 const isMobile = useMediaQuery({ maxWidth: 767 });
 
 useGSAP(() => {
	const heroSplit = new SplitText(".title", {
	 type: "chars, words",
	});
	
	const paragraphSplit = new SplitText(".subtitle", {
	 type: "lines",
	});
	
	// Apply text-gradient class once before animating
	heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));
	
	gsap.from(heroSplit.chars, {
	 yPercent: 100,
	 duration: 1.8,
	 ease: "expo.out",
	 stagger: 0.06,
	});
	
	gsap.from(paragraphSplit.lines, {
	 opacity: 0,
	 yPercent: 100,
	 duration: 1.8,
	 ease: "expo.out",
	 stagger: 0.06,
	 delay: 1,
	});
	
	gsap
	.timeline({
	 scrollTrigger: {
		trigger: "#hero",
		start: "top top",
		end: "bottom top",
		scrub: true,
	 },
	});
	
	const startValue = isMobile ? "top 50%" : "center 60%";
	const endValue = isMobile ? "120% top" : "bottom top";
	
	let tl = gsap.timeline({
	 scrollTrigger: {
		trigger: "video",
		start: startValue,
		end: endValue,
		scrub: true,
		pin: true,
	 },
	});
	
	videoRef.current.onloadedmetadata = () => {
	 tl.to(videoRef.current, {
		currentTime: videoRef.current.duration,
	 });
	};
 }, []);
 
 return (
	<>
	 <section id="hero" className="noisy">
		<h1 className="title">MOJITO</h1>
		
		<div className="body">
		 
		 <div className="content">
			<div className="space-y-5 hidden md:block">
			 <p>With lime. Sweet mimosa. Piña colada. </p>
			 <p className="subtitle">
				I'm drunk in you <br /> I'm drunk in you
			 </p>
			</div>
			
			<div className="view-cocktails">
			 <p className="subtitle">
				너는 정말 특별해, 전혀 독하지 않은데 <br /> 낮에 별이 뜨게 해, 한 모금 마셨는데
			 </p>
			 <a href="#cocktails">Yeah!</a>
			</div>
		 </div>
		</div>
	 </section>
	 
	 <div className="video absolute inset-0">
		<video
		 ref={videoRef}
		 muted
		 playsInline
		 preload="auto"
		 src="/videos/output.mp4"
		/>
	 </div>
	</>
 );
};

export default Hero;