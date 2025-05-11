import React, { useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

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
          <div className='main w-full  flex items-center justify-center bg-black'>
            <div className='navbar absolute top-0 left-0 z-[100] w-full h-[10%] px-10 py-10r-400'>
              <div className="logo flex gap-4 items-center ">
                <div className='lines flex flex-col gap-1'>
                  <div className='line1 w-8 h-[2px] bg-white'></div>
                  <div className='line1 w-6 h-[2px] bg-white'></div>
                  <div className='line1 w-4 h-[2px] bg-white'></div>
                </div>
                <h3 className='text-3xl font-bold text-white'>Rockstar</h3>
              </div>
            </div>
            <div className='landing w-full h-screen '>
              <div className='iamgesdiv overflow-hidden relative w-full h-full'>
                <img className='absolute top-0 left-0 w-full h-full object-cover' src="/sky.png" alt="background" />
                <img className='absolute top-0 left-0 w-full h-full object-cover' src="/bg.png" alt="background" />
                <img className='absolute -bottom-[70%] left-[50%] translate-x-[-50%] ' src="/girlbg.png" alt="background" />
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}

export default App