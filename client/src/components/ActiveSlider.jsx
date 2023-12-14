import { motion } from 'framer-motion'
import { useState } from 'react'
import IMAGES from '../assets/images/images'
import DetailsModal from './DetailsModal'
import PowerUpModal from './PowerUpModal'


const ActiveSlider = ({ game, imageSrc }) => {
    const [positionIndexes, setPositionIndexes] = useState([0, 1, 2])
    const [detailsModal, setDetailsModal] = useState(false);
    const [powerUpModal, setPowerUpModal] = useState(false);

    const handleNext = () => {
        setPositionIndexes((prevIndexes) => {
            const updatedIndexes = prevIndexes.map((prevIndex) => (prevIndex + 1) % 3)
            return updatedIndexes
        })
    }


    const handleClick = () => {
        console.log('clicked!')
    }

    const images = [
        IMAGES.connect4,
        IMAGES.ttt,
        IMAGES.ultttt
    ]
    images.map((image, index) => {
        console.log(index, image)
    })

    const positions = [
        'center',
        'left',
        'right'
    ]

    const imageVariants = {
        center: { x: '0%', scale: 1, zIndex: 5 },
        left: { x: '-50%', scale: 0.6, zIndex: 1 },
        right: { x: '50%', scale: 1, zIndex: 2 }
    }


    return (
        <div className='flex items-center flex-col justify-center bg-black h-full'>
            <div className='h-4/5 w-5/6 bg-white rounded-lg grid grid-rows-[2fr_0.5fr] bg-gradient-to-r from-gray-500 to-blue-50'>
                <div className='py-3 px-10 text-6xl flex items-end'>
                    {game}
                </div>
                <div className='grid grid-cols-2'>
                    <div className='py-3 px-10 flex flex-row gap-2 items-center'>
                        <DetailsModal
                            modal={detailsModal}
                            setModal={setDetailsModal}
                            game={game}
                            imageSrc={imageSrc}
                        />
                        <button
                            onClick={() => { setDetailsModal(true) }}
                            className="cursor-pointer bg-headings rounded-md h-max w-max text-white p-3"
                        >
                            Check Details
                        </button>
                        <button
                            onClick={() => { setPowerUpModal(true) }}
                            className="cursor-pointer bg-headings rounded-md h-max w-max text-white p-3"
                        >
                            Daily PowerUp
                        </button>
                    </div>
                    <div className='flex justify-end items-center py-3 px-10'>
                        <PowerUpModal
                            modal={powerUpModal}
                            setModal={setPowerUpModal}
                            game={game}
                        />
                        <button
                            onClick={handleClick}
                            className="cursor-pointer bg-headings rounded-md h-max 2-max text-white text-6xl p-6 mb-10"
                        >
                            Play!
                        </button>
                    </div>
                </div>
            </div>
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
        </div>
    )
}

export default ActiveSlider