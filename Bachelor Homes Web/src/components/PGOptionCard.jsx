import { Link } from "react-router-dom"

const PGOptionCard = ({ Img, title }) => {

    return (
        <div className='w-full h-[120px] md:h-[100px] lg:h-[130px] xl:h-[160px] bg-[#F4E2FC] p-4 rounded-lg flex gap-3'>
            <img src={Img} className='h-full border-1 border-gray-500 rounded-md lg:rounded-2xl' />
            <div className='flex flex-col gap-3 md:gap-1 lg:gap-4 xl:gap-6 items-center justify-center w-full'>
                <p className='font-bold text-lg md:text-sm text-center lg:text-lg xl:text-2xl leading-4'>{title}</p>
                <Link to="/showpg/delhi" className='bg-[#520075] text-white px-4 py-2 rounded-sm text-sm md:text-xs lg:text-sm xl:text-xl text-center leading-4 xl:leading-8'>Explore Rooms</Link>
            </div>
        </div>
    )
}
export default PGOptionCard