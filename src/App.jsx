import React, { useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'

function App() {
  let [show, setShow] = useState(false);

  useGSAP(() => {
    const t1 = gsap.timeline();
    t1.to(".vi-mask-group", {
      rotate: 10,
      ease: "power4.easeInOut",
      duration: 2,
      transformOrigin: "center"
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin: "center",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          const svgElement = document.querySelector(".svg");
          if (svgElement) {
            svgElement.style.display = "none";
            setShow(true);
            this.kill();
          }
        }
      }
    })
  })

  useGSAP(() => {
    if (!show) return;
    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      opacity:1,
      duration: 3,
      delay: -1.2,
      ease: "Expo.easeInOut",
    })
    gsap.to(".bg", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: -1,
      ease: "Expo.easeInOut",
    })
    gsap.to(".sky", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: -.8,
      ease: "Expo.easeInOut",
    })
    gsap.to(".character", {
      scale: .8,
      rotate: 0,
      left: "25%",
      bottom: "-70%",
      duration: 2,
      delay: -.7,
   
      ease: "Expo.easeInOut",
    })
    gsap.to(".imagesdivText", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: -.9,
      ease: "Expo.easeInOut",
    })


    const main = document.querySelector(".main");
    main?.addEventListener("mousemove", function (e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      gsap.to(".imagesdivText", {
        x: `${xMove * .4}%`,
      })
      gsap.to(".sky", {
        x: `${xMove * .08}%`,
      })
      gsap.to(".bg", {
        x: `${xMove * .04}%`,
      })
    })

  }, [show])
  return (
    <>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="/bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>

      {
        show && (
          <div className='main w-full relative rotate-[-30deg] scale-[1.7] bg-black opacity-0'>
            <div className='navbar absolute top-0 left-0 z-[100] w-full h-[10%] px-10 py-6'>
              <div className="logo flex gap-4 items-center ">
                <div className='lines flex flex-col gap-[5px] mt-2 '>
                  <div className='line1 w-10 h-[4px] bg-white'></div>
                  <div className='line1 w-8 h-[3px] bg-white'></div>
                  <div className='line1 w-4 h-[3px] bg-white'></div>
                </div>
                <h3 className='text-3xl font-bold text-white'>Rockstar</h3>
              </div>
            </div>
            {/* Landing */}
            <div className='landing overflow-hidden relative w-full h-screen z-[10]'>
              <div className='iamgesdiv overflow-hidden relative w-full h-full'>
                <img className='absolute sky  scale-[1.7] rotate-[-40deg] top-0 left-0 w-full h-full object-cover' src="/sky.png" alt="background" />
                <img className='absolute bg  scale-[1.7] rotate-[-40deg] top-0 left-0 w-full h-full object-cover' src="/bg.png" alt="background" />
                <div className='imagesdivText absolute w-full top-0 left-[50%] translate-x-[-10%]  flex flex-col leading-[8rem] text-white scale-[1.7] rotate-[-30deg]'>
                  <h1 className='text-[6rem] font-bold -ml-30'>Grand</h1>
                  <h1 className='text-[6rem] font-bold ml-0'>Theft</h1>
                  <h1 className='text-[6rem] font-bold -ml-26'>Auto</h1>
                </div>
                {/* Girl */}
                <img className='absolute character  scale-[2] rotate-[-30deg] -bottom-[200%] left-[50%] translate-x-[-50%] ' src="/girlbg.png" alt="background" />
              </div>
            <div className='bottombar absolute bottom-0 left-0 z-[200] w-full h-[10%] px-10 py-6 bg-gradient-to-t from-black to-transparent'>
              <div className='flex flex-row items-center'>
                <i className="ri-arrow-down-line text-white text-2xl font-bold mr-2"></i>
                <h3 className="text-white font-bold">Scroll Down</h3>
              </div>
              <img src="/ps5.png" alt="" className='w-[200px] absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]' />
            </div>
            </div>
            {/* Bottom Bar */}

            {/* Content */}
            <div className='w-full h-screen items-center flex overflow-hidden bg-black'>
              <div className='limage w-1/2 flex items-center justify-center '>
                <img src="/imag.png" alt="" className='w-3/4' />
              </div>
              <div className='rightContent w-1/2 relative overflow-hidden'>
                <div className="content text-white w-3/4 relative z-10">
                  <div className="title-container relative">
                    <h1 className='text-[5rem] font-black tracking-normal text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-300 leading-none'>GRAND THEFT</h1>
                    <h1 className='text-[6.5rem] font-black tracking-normal text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-300 leading-none mb-6 -mt-4'>AUTO VI</h1>
                    <div className="absolute -top-2 -left-2 w-full h-full blur-sm opacity-50 z-[-1]">
                      <h1 className='text-[5rem] font-black tracking-normal text-pink-600 leading-none'>GRAND THEFT</h1>
                      <h1 className='text-[6.5rem] font-black tracking-normal text-pink-600 leading-none -mt-4'>AUTO VI</h1>
                    </div>
                  </div>

                  <p className='font-sans text-lg text-gray-300 max-w-xl leading-tight mb-3'>Welcome to Vice City, where power, crime, and opportunity collide in the most immersive open world ever created by Rockstar Games.</p>
                  <p className='font-sans text-lg text-gray-300 max-w-xl mb-4'>Experience a new era of criminal enterprise across the sun-soaked streets and neon-lit nights.</p>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="flex items-center gap-1">
                      <i className="ri-star-fill text-yellow-400"></i>
                      <i className="ri-star-fill text-yellow-400"></i>
                      <i className="ri-star-fill text-yellow-400"></i>
                      <i className="ri-star-fill text-yellow-400"></i>
                      <i className="ri-star-fill text-yellow-400"></i>
                    </div>
                    <p className="text-yellow-400 font-bold">RATED 5/5</p>
                  </div>
                  <p className='font-mono text-orange-400 font-bold tracking-wider mb-6'>WORLDWIDE RELEASE: FALL 2026</p>
                  <div className="flex gap-4">
                    <button className='px-8 py-3 bg-gradient-to-r from-orange-500 to-pink-600 text-white font-bold rounded hover:from-pink-600 hover:to-orange-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-orange-900/30'>PRE-ORDER NOW</button>
                    <button className='px-8 py-3 bg-transparent border-2 border-orange-500 text-orange-400 font-bold rounded hover:bg-orange-500/10 transition-all duration-300 transform hover:scale-105'>WATCH TRAILER</button>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-black/80 via-black/40 to-transparent z-0"></div>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}

export default App