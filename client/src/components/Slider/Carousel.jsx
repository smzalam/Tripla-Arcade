import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import { motion } from 'framer-motion';
import CarouselButton from './Buttons/CarouselButton';
``

const Carousel = ({ children }) => {

    const [active, setActive] = useState(1);
    const count = React.Children.count(children);
    const MAX_VISIBILITY = 2;
    return (
        <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='carousel'
        >
            {React.Children.map(children, (child, i) => (
                <div className='card-container' style={{
                    '--active': i === active ? 1 : 0,
                    '--offset': (active - i) / 3,
                    '--direction': Math.sign(active - i),
                    '--abs-offset': Math.abs(active - i) / 2,
                    pointerEvents: active === i ? 'auto' : 'none',
                    'opacity': Math.abs(active - i) >= MAX_VISIBILITY ? '0' : '1',
                    'display': Math.abs(active - i) > MAX_VISIBILITY ? 'none' : 'block',
                }}>
                    {child}
                </div>
            ))}
            <div className='left-[19%] absolute flex flex-row place-content-center gap-96 xl:gap-[48rem] bottom-10'>

                {active > 0 &&
                    <CarouselButton handler={() => setActive(i => i - 1)} Icon={ChevronDoubleLeftIcon} />
                }
                {active < count - 1 &&
                    <CarouselButton handler={() => setActive(i => i + 1)} Icon={ChevronDoubleRightIcon} />
                }
            </div>
            {/* <SliderItem /> */}
            {/* {images.map((image, index) => (
                <>
                    <p className='text-white'>HI</p>
                    <motion.img
                        key={index}
                        src={image}
                        alt={image}
                        className="rounded-[12px]"
                        initial="center"
                        animate={positions[positionIndexes[index]]}
                        variants={imageVariants}
                        transition={{ duration: 0.5 }}
                        style={{ width: '40%', position: 'absolute' }}
                        onClick={() => {console.log(index, ' clicked!')}}
                    />
                </>
            ))}

            <button
                onClick={handleNext}
                className='text-white mt-[400px] bg-indigo-400 rounded-md py-2 px-4'
            >
                Next
            </button> */}
        </motion.div>

    )
}

export default Carousel