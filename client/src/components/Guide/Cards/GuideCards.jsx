
const GuideCards = ({game, category, type}) => {
    return (
        <div className='shrink-0 place-self-center group w-[30%] h-[90%] rounded-[20px] relative overflow-hidden'>
            <div className='absolute inset-0 grid place-content-center rounded-[10px] bg-secondary'>
                <h1 className='text-[2rem] font-bold bg-gradient-to-r from-primary to-background bg-clip-text text-transparent'>
                    {game}
                </h1>
            </div>
            <div className='group-hover:right-0 transition-all flex flex-col justify-center w-full h-full top-0 -right-[100%] absolute bg-secondary opacity-95 backdrop-blur-sm rounded-[15px] text-white p-[30px]'>
                <h1 className='uppercase text-[2em] font-bold'>{game}</h1>
                <section className='bg-purple-500 w-max px-8 py-2 rounded-lg capitalize text-[14px] font-semibold'>{category}</section>
                <section className='bg-purple
                sorry
                
                -500 w-max px-8 py-2 rounded-lg font-semibold text-[16px]'>{type}</section>

                <button className='w-[120px] text-[#1f3d47] bg-[#8fabba] py-2.5 px-5 rounded-md captialize border-none outline-none font-[500] cursor-pointer '>Look at Guide!</button>
            </div>
        </div>
    )
}

export default GuideCards