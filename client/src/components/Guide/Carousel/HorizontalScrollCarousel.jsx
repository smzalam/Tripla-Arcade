import GuideCards from "../Cards/GuideCards"
import { motion } from 'framer-motion';
// import { useRef } from "react";

const HorizontalScrollCarousel = ({ searchResults }) => {

    // const targetRef = useRef<HTMLDivElement | null>(null);
    // const scrollYProgress = useScroll({
    //     target: targetRef
    // })

    // const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"])

    const results = searchResults.map(searchResult => (
        <GuideCards key={searchResult.id} game={searchResult.game} category={searchResult.category} type={searchResult.type} />
    ))

    const content = results?.length ? results : <article><p>No matching games!</p></article>

    return (
        <section className="rounded-2xl w-[80%] h-[60%] relative">
            <article className="rounded-2xl px-4 h-full w-full flex overflow-x-scroll scrollbar-thin scrollbar-track-background scrollbar-thumb-secondary scrollbar-margin bg-transparent">
                <motion.div className="flex w-full gap-4">
                    {content}
                </motion.div>
            </article>
        </section>
    )
}

export default HorizontalScrollCarousel