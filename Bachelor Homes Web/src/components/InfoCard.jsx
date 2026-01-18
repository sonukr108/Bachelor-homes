const InfoCard = ({ Img, data, title }) => {
    return (
        <div className='flex gap-3 items-center'>
            <Img className='text-[#520075] h-8 w-8 md:h-12 md:w-12 lg:h-14 lg:w-14' />
            <p className='text-lg md:text-xl'>
                <span className='font-bold text-sm md:text-2xl text-[#520075]'>{data}+</span>
                &nbsp;{title}
            </p>
        </div>
    );
};

export default InfoCard