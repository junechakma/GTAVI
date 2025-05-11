import React, { useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css';

function App() {
  let [show, setShow] = useState(false);
  // State to track loading status
  const [isLoading, setIsLoading] = useState(true);
  // State to control when to show the mask animation
  const [showMaskAnimation, setShowMaskAnimation] = useState(false);
  // Use useState to track mobile state
  const [isMobile, setIsMobile] = useState(false);

  // Set up mobile detection on component mount and window resize
  React.useEffect(() => {
    // Safe check for window object (prevents SSR issues)
    if (typeof window !== 'undefined') {
      const checkMobile = () => setIsMobile(window.innerWidth < 768);

      // Set initial value
      checkMobile();

      // Add resize listener
      window.addEventListener('resize', checkMobile);

      // Clean up
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  // Effect to simulate loading process
  useEffect(() => {
    // Simulate loading process (e.g., assets, data, etc.)
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      setShowMaskAnimation(true);
    }, 3000); 

    return () => clearTimeout(loadingTimer);
  }, []);

  // GSAP animation for the mask effect - only runs after loading is complete
  useGSAP(() => {
    if (!showMaskAnimation) return;

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
    });
  }, [showMaskAnimation])

  useGSAP(() => {
    if (!show) return;
    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      opacity: 1,
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
      scale: 1,
      rotate: 0,
      y: isMobile ? "20%" : "45%",
      x: 0,
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
      {/* Loading Screen */}
      {isLoading && (
        <div className="loading-screen fixed top-0 left-0 z-[200] w-full h-screen flex flex-col items-center justify-center bg-black">
          <div className="rockstar-logo relative w-full h-full flex items-center justify-center">
            <div className="svg flex items-center justify-center w-full h-screen overflow-hidden bg-[#000]">
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
              
              {/* Enhanced loading progress bar positioned at the bottom of the SVG */}
              <div className="absolute bottom-[10%] left-0 w-full flex flex-col items-center">
                <div className="loading-stats flex justify-between w-64 mb-2">
                  <span className="text-xs text-gray-400">ROCKSTAR GAMES</span>
                  <span className="text-xs text-gray-400">VICE CITY</span>
                </div>
                <div className="loading-bar w-64 h-3 bg-gray-800 rounded-sm overflow-hidden">
                  <div className="loading-progress" />
                </div>
                <div className="flex justify-between w-64 mt-1">
                  <div className="loading-segments flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-1 w-3 bg-gray-700" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">INITIALIZING</span>
                </div>
                <p className="loading-text text-white mt-4 text-lg font-bold">Loading Grand Theft Auto VI</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mask Animation - Only shown after loading is complete */}
      {showMaskAnimation && (
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
      )}

      {
        show && (
          <div className='main w-full relative md:rotate-[-30deg] md:scale-[1.7] bg-black opacity-0'>
            <div className='navbar absolute top-0 left-0 z-[100] w-full h-[10%] px-4 sm:px-6 md:px-10 py-4 md:py-6'>
              <div className="logo flex gap-2 md:gap-4 items-center">
                <div className='lines flex flex-col gap-[3px] md:gap-[5px] mt-1 md:mt-2'>
                  <div className='line1 w-6 md:w-10 h-[3px] md:h-[4px] bg-white'></div>
                  <div className='line1 w-5 md:w-8 h-[2px] md:h-[3px] bg-white'></div>
                  <div className='line1 w-3 md:w-4 h-[2px] md:h-[3px] bg-white'></div>
                </div>
                <h3 className='text-xl sm:text-2xl md:text-3xl font-bold text-white'>Rockstar</h3>
              </div>
            </div>
            {/* Landing */}
            <div className='landing overflow-hidden relative w-full h-screen z-[10]'>
              <div className='iamgesdiv overflow-hidden relative w-full h-full'>
                <img className='absolute sky scale-[1.2] md:scale-[1.7] rotate-[-20deg] md:rotate-[-40deg] top-0 left-0 w-full h-full object-cover' src="/sky.png" alt="background" />
                <img className='absolute bg scale-[1.2] md:scale-[1.7] rotate-[-20deg] md:rotate-[-40deg] top-0 left-0 w-full h-full object-cover' src="/bg.png" alt="background" />
                <div className='imagesdivText absolute w-full top-[5%] md:top-0 left-[50%] md:translate-x-[-10%] translate-x-[-50%] flex flex-col leading-[4rem] sm:leading-[5rem] md:leading-[8rem] text-white scale-[1] md:scale-[1.7] md:rotate-[-30deg]'>
                  <h1 className='text-[3rem] sm:text-[4rem] md:text-[6rem] font-bold md:-ml-30 text-center md:text-left'>Grand</h1>
                  <h1 className='text-[3rem] sm:text-[4rem] md:text-[6rem] font-bold md:ml-0 text-center md:text-left'>Theft</h1>
                  <h1 className='text-[3rem] sm:text-[4rem] md:text-[6rem] font-bold md:-ml-26 text-center md:text-left'>Auto</h1>
                </div>
                {/* Girl */}
                <div className='absolute w-full bottom-0 left-0 flex justify-center items-end overflow-visible' style={{ height: '0' }}>
                  <img
                    className='character transform -translate-y-[200%] sm:-translate-y-[30%] md:-translate-y-[50%] scale-[1.2] sm:scale-[1.8] md:scale-[2] rotate-[-15deg] md:rotate-[-30deg]'
                    src="/girlbg.png"
                    alt="background"
                  />
                </div>
              </div>
              <div className='bottombar absolute bottom-0 left-0 z-[200] w-full h-[10%] px-4 sm:px-6 md:px-10 py-4 md:py-6 bg-gradient-to-t from-black to-transparent'>
                <div className='flex flex-row items-center'>
                  <i className="ri-arrow-down-line text-white text-xl md:text-2xl font-bold mr-1 md:mr-2"></i>
                  <h3 className="text-white text-sm md:text-base font-bold">Scroll Down</h3>
                </div>
                <img src="/ps5.png" alt="" className='w-[100px] sm:w-[150px] md:w-[200px] absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]' />
              </div>
            </div>
            {/* Bottom Bar */}

            {/* Content */}
            <div className='w-full min-h-screen flex flex-col md:flex-row items-center overflow-hidden bg-black py-10 md:py-0'>
              <div className='limage w-full md:w-1/2 flex items-center justify-center mb-8 md:mb-0'>
                <img src="/imag.png" alt="" className='w-full md:w-3/4' />
              </div>
              <div className='rightContent w-full md:w-1/2 relative overflow-hidden px-4 sm:px-6 md:px-0'>
                <div className="content text-white w-full md:w-3/4 relative z-10">
                  <div className="title-container relative">
                    <h1 className='text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] font-black tracking-normal text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-300 leading-none'>GRAND THEFT</h1>
                    <h1 className='text-[3.5rem] sm:text-[4.5rem] md:text-[6.5rem] font-black tracking-normal text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-300 leading-none mb-4 md:mb-6 -mt-2 md:-mt-4'>AUTO VI</h1>
                    <div className="absolute -top-2 -left-2 w-full h-full blur-sm opacity-50 z-[-1]">
                      <h1 className='text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] font-black tracking-normal text-pink-600 leading-none'>GRAND THEFT</h1>
                      <h1 className='text-[3.5rem] sm:text-[4.5rem] md:text-[6.5rem] font-black tracking-normal text-pink-600 leading-none -mt-2 md:-mt-4'>AUTO VI</h1>
                    </div>
                  </div>

                  <p className='font-sans text-base md:text-lg text-gray-300 max-w-xl leading-tight mb-2 md:mb-3'>Welcome to Vice City, where power, crime, and opportunity collide in the most immersive open world ever created by Rockstar Games.</p>
                  <p className='font-sans text-base md:text-lg text-gray-300 max-w-xl mb-3 md:mb-4'>Experience a new era of criminal enterprise across the sun-soaked streets and neon-lit nights.</p>
                  <div className="flex items-center gap-2 md:gap-4 mb-2">
                    <div className="flex items-center gap-1">
                      <i className="ri-star-fill text-yellow-400"></i>
                      <i className="ri-star-fill text-yellow-400"></i>
                      <i className="ri-star-fill text-yellow-400"></i>
                      <i className="ri-star-fill text-yellow-400"></i>
                      <i className="ri-star-fill text-yellow-400"></i>
                    </div>
                    <p className="text-yellow-400 text-sm md:text-base font-bold">RATED 5/5</p>
                  </div>
                  <p className='font-mono text-orange-400 text-sm md:text-base font-bold tracking-wider mb-4 md:mb-6'>WORLDWIDE RELEASE: FALL 2026</p>
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                    <button className='px-4 sm:px-6 md:px-8 py-2 md:py-3 bg-gradient-to-r from-orange-500 to-pink-600 text-white text-sm md:text-base font-bold rounded hover:from-pink-600 hover:to-orange-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-orange-900/30'>PRE-ORDER NOW</button>
                    <button className='px-4 sm:px-6 md:px-8 py-2 md:py-3 bg-transparent border-2 border-orange-500 text-orange-400 text-sm md:text-base font-bold rounded hover:bg-orange-500/10 transition-all duration-300 transform hover:scale-105'>WATCH TRAILER</button>
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