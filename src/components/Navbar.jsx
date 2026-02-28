import gsap from 'gsap';
import { useGSAP } from '@gsap/react'
import { useRef, useState } from 'react'
import { navLinks } from '../../constants/index.js'

const Navbar = () => {

	const audioRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);

 useGSAP(() => {
	const navTween = gsap.timeline({
	 scrollTrigger: {
		trigger: 'nav',
		start: 'bottom top'
	 }
	});
	
	navTween.fromTo('nav', { backgroundColor: 'transparent' }, {
	 backgroundColor: '#00000050',
	 backgroundFilter: 'blur(10px)',
	 duration: 1,
	 ease: 'power1.inOut'
	});
 })

 const toggleMusic = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }

    setIsPlaying(!isPlaying)
  }
 
 return (
	<nav>
	 <div>
		<a href="#home" className="flex items-center gap-2">
		 <img className="h-8 w-auto" src="/images/Twice_logo.png" alt="logo" />
		 <p>Twice</p>
		</a>
		
		<ul>
		 {navLinks.map((link) => (
			<li key={link.id}>
			 <a href={`#${link.id}`}>{link.title}</a>
			</li>
		 ))}
			<button
			onClick={toggleMusic}
			className="text-white text-sm opacity-80 hover:opacity-100 transition"
			>
			{isPlaying ? 'Music Playing' : 'Music Muted'}
			</button>
		</ul>
        <audio ref={audioRef} loop>
          <source src="/audio/twice_alcoholfree.mp3" type="audio/mpeg" />
        </audio>

	 </div>
	</nav>
 )
}
export default Navbar
