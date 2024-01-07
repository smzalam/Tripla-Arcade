
const GuideCards = ({game, category, type}) => {
    return (
        <div className='shrink-0 place-self-center group w-[30%] h-[90%] rounded-[20px] relative overflow-hidden'>
            <div className='absolute inset-0 grid place-content-center rounded-[10px] bg-secondary'>
                <h1 className='lg:text-[1.5rem] xl:text-[2rem] font-bold bg-gradient-to-r from-primary to-background bg-clip-text text-transparent'>
                    {game}
                </h1>
            </div>
            <div className='group-hover:right-0 transition-all flex flex-col justify-center place-items-center w-full h-full top-0 -right-[100%] absolute bg-background opacity-95 backdrop-blur-sm rounded-[15px] text-white p-[30px]'>
                <h1 className='uppercase lg:text-[1.5em] xl:text-[2em] font-bold mb-5'>{game}</h1>
                <section className='m-2 bg-yellow-500 w-max py-1 px-4 rounded-lg capitalize text-[14px] font-semibold text-primary'>{category}</section>
                <section className='m-2 bg-purple-500 w-max py-1 px-4 rounded-lg font-semibold text-[14px] text-text'>{type}</section>
 
                <button className='w-full mt-5 text-text bg-primary py-2.5 px-5 rounded-md captialize border-none outline-none font-[500] cursor-pointer '>Look at Guide!</button>
            </div>
        </div>
    )
}

export default GuideCards