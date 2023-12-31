import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import NavigationCards from '../components/Guide/Cards/NavigationCards';
import { useState } from 'react';
import GuidePlayGame from './Guides/GuidePlayGame';
import GuideCreateGame from './Guides/GuideCreateGame';

const Guide = () => {
  const [mode, setMode] = useState('');
  // const ref = useRef(null);
  // const { scrollYProgress } = useScroll({
  //   target: ref,
  //   offset: ["start end", "end end"],
  // });
  // const scaleX = useSpring(scrollYProgress, {
  //   stiffness: 100,
  //   damping: 30,
  //   restDelta: 0.001
  // })

  // const [hookedYPostion, setHookedYPosition] = useState(0);

  // useMotionValueEvent(scrollYProgress, "change", (latest) => {
  //   setHookedYPosition(latest)
  // })

  // console.log(scrollYProgress);
  // console.log(hookedYPostion);

  return (
    <>
      {/* <motion.div
        initial={{ y: "100vh" }}
        animate={{ y: 0 }}
        exit={{ y: '-100vh' }}
        transition={{ duration: 0.2, ease: 'easeOut', type: 'spring', stiffness: 45 }}
        className='flex flex-col overflow-auto justify-center place-items-center gap-4 py-4 text-text h-full w-full rounded-md'
      > */}
        <AnimatePresence mode={'wait'}>
          {mode === '' &&
            <>
              <motion.div
                key={mode}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{duration: 2, type: 'spring', stiffness: 70}}
                className='flex flex-row lg:gap-40 xl:gap-56 w-full h-full justify-center'
              >
                <NavigationCards title={'Create Games!'} clickHandler={() => {
                  console.log('CLICKED')
                  setMode('create')
                }} />
                <NavigationCards title={'Play Games!'} clickHandler={() => {
                  console.log('CLICKED')
                  setMode('play')
                }} />
              </motion.div>
            </>
          }
          {mode === 'play' &&
            <GuidePlayGame key={mode} />
          }
          {mode === 'create' &&
            <GuideCreateGame key={mode} />
          }
        </AnimatePresence>
      {/* </motion.div> */}
    </>
  )
}

export default Guide