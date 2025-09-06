import BentoGrid from '@/components/Bento';
import PixelBlast from '@/components/Hero-Pixel';
import Navbar from '@/sm-components/Navbar';
import React from 'react'

function page() {
  return (
<>
<div className='w-full h-screen relative'>
<PixelBlast
    variant="square"
    pixelSize={3}
    color="#08c4c4"
    patternScale={3}
    patternDensity={1.2}
    pixelSizeJitter={0.5}
    enableRipples
    rippleSpeed={0.4}
    rippleThickness={0.12}
    rippleIntensityScale={1.5}
    liquidStrength={0.12}
    liquidRadius={1.2}
    liquidWobbleSpeed={5}
    speed={0.6}
    edgeFade={0.25}
    transparent
  />
  <Navbar/>
</div>
<BentoGrid />
</>
  )
}

export default page