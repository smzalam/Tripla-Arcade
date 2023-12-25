
const CarouselButton = (handler, Icon) => {
    return (
        <button
            className='bg-secondary rounded-lg px-12 py-2'
            onClick={handler}
        >
            <Icon className='text-primary h-12 w-12' />
        </button>
    )
}

export default CarouselButton