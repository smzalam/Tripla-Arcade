import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import GuideTitle from '../../components/Guide/GuideTitle';
import { useEffect, useRef, useState } from 'react';
import GuideCards from '../../components/Guide/Cards/GuideCards';
import GuideSearchBar from '../../components/Guide/GuideSearchBar';
import HorizontalScrollCarousel from '../../components/Guide/Carousel/HorizontalScrollCarousel';
import { getGames } from '../../lib/api/axios';

const GuidePlayGame = () => {

  const [games, setGames] = useState([]);
  const [searchResults, setSearchResults] = useState([])


  useEffect(() => {
    getGames().then(json => {
      setGames(json)
      return json
    }).then(json => {
      setSearchResults(json)
    })
  }, [])

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
      {/* <div className='text-white'>
          scrollYProgress.current: {scrollYProgress.current}<br />
          scrollYProgress.hookedYPostion: {hookedYPostion}<br />
        </div> */}
      {/* <motion.div
          className='fixed bg-accent h-2.5 top-0'
          style={{ scaleX }}
        /> */}
      {/* <motion.div
        className='sticky top-0'
      >
        <GuideTitle />
      </motion.div>
      <div className="bg-accent rounded-2xl ml-4 w-[80%] place-self-center overflow-hidden my-2">
      </div> */}
      <motion.div
        className='flex flex-col w-[80vw] h-full justify-center place-items-center gap-8'
      >
        <GuideSearchBar games={games} setSearchResults={setSearchResults} />
        <HorizontalScrollCarousel searchResults={searchResults} />
      </motion.div>

    </>
  )
}

export default GuidePlayGame