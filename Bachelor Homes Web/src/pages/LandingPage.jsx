import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CarouselComponent from '../components/CarouselComponent'
import BoyImg from '../assets/boy.svg'
import GirlImg from '../assets/girl.svg'
import ColivingImg from '../assets/coliving.svg'
import SearchBox from '../components/SearchBox'
import { BedDouble, Building, Building2 } from 'lucide-react'
import PGOptionCard from '../components/PGOptionCard'
import InfoCard from '../components/InfoCard'
import FirstImg from '../assets/landingpage/1.svg'
import SecondImg from '../assets/landingpage/2.svg'
import ThirdImg from '../assets/landingpage/3.svg'
import FourthImg from '../assets/landingpage/4.svg'
import FifthImg from '../assets/landingpage/5.svg'
import SixthImg from '../assets/landingpage/6.svg'
import SeventhImg from '../assets/landingpage/7.svg'
import EighthImg from '../assets/landingpage/8.svg'
import NinethImg from '../assets/landingpage/9.svg'
import TenthImg from '../assets/landingpage/10.svg'
import Slide1 from '../assets/landingpage/slide1.jpg'
import Slide2 from '../assets/landingpage/slide2.jpg'
import Slide3 from '../assets/landingpage/slide3.jpg'
import Slide4 from '../assets/landingpage/slide4.jpg'
import Slide5 from '../assets/landingpage/slide5.jpg'
import Slide6 from '../assets/landingpage/slide6.jpg'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const LandingPage = () => {

    return (
        <div>
            <Navbar />
            <div className='min-h-[calc(100vh-200px)] px-[5%] py-10'>
                <div className='grid gap-5 md:gap-0 md:grid-cols-[6.5fr_3fr] xl:grid-cols-[6.7fr_3fr] grid-cols-1 mt-20 mb-10'>
                    <div className='left-part'>
                        <CarouselComponent />
                    </div>
                    <div className='md:hidden'>
                        <SearchBox />
                    </div>
                    <div className='right-part flex flex-col gap-5 md:gap-3 justify-between'>
                        <PGOptionCard Img={BoyImg} title={'PG for men'} />
                        <PGOptionCard Img={GirlImg} title={'PG for women'} />
                        <PGOptionCard Img={ColivingImg} title={'PG for coliving'} />
                    </div>
                </div>
                <div className='hidden md:flex md:absolute top-90 lg:top-110 xl:top-150 z-20'>
                    <SearchBox />
                </div>
                <div className='w-full px-5 md:px-10 md:py-15 flex flex-col gap-5 md:flex-row justify-between'>
                    <InfoCard Img={Building2} data={15} title={'Cities'} />
                    <InfoCard Img={Building} data={45} title={'Residences'} />
                    <InfoCard Img={BedDouble} data={501} title={'Beds'} />
                </div>

                <div className="text-center py-10">
                    <h2 className="text-2xl md:text-4xl font-extrabold">
                        <span className="text-[#520075]">Not just</span>{' '} four walls and a roof
                    </h2>
                    <p className="mt-2 text-sm md:text-lg">
                        Come over and experience how a place to stay can be so much more
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-3 md:gap-5 items-center md:px-10 py-10" data-aos="fade-up">
                    <div className="grid grid-cols-2 gap-4">
                        <img
                            src={FirstImg}
                            alt="Building"
                            className="rounded-xl w-full h-full object-cover"
                        />
                        <div className="flex flex-col gap-4">
                            <img
                                src={SecondImg}
                                alt="Lounge"
                                className="rounded-xl w-full h-full object-cover"
                            />
                            <img
                                src={ThirdImg}
                                alt="Corridor"
                                className="rounded-xl w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className='md:px-5 lg:px-10 flex flex-col gap-2 md:gap-5'>
                        <p className="text-2xl lg:text-3xl font-extrabold text-center md:text-start">
                            Start living your best life from <br /> <span className="text-[#520075]">day one</span>
                        </p>
                        <p className="text-sm lg:text-lg text-center md:text-start leading-relaxed">
                            Bring a box full of hopes, dreams, ambitions... and of course, your
                            personal belongings. Everything else – furniture, appliances, food –
                            has already been taken care of.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col-reverse md:flex-row items-center gap-6 md:gap-20 px-4 md:px-10 py-10" data-aos="fade-up">
                    <div className="flex-1 flex flex-col gap-6">
                        <p className="text-2xl lg:text-3xl font-extrabold text-center md:text-start">
                            Step into a room that has <br /> <span className="text-[#520075]">room for everything</span>
                        </p>
                        <p className="text-sm md:text-base lg:text-lg text-center md:text-start leading-relaxed">
                            Your clothes and bag will not be fighting for space on the same chair. At Bachelor Homes,
                            there's ample room for all your possessions. Even a framed photo of your family, for the
                            rare occasions you miss home.
                        </p>
                    </div>

                    <div className="flex-1 w-full relative flex items-center justify-end">
                        <img
                            src={FourthImg}
                            alt="Base Room"
                            className="absolute -left-0 lg:left-10 h-30 md:h-32.5 lg:h-40 xl:h-55 rounded-2xl object-cover z-10"
                        />
                        <img
                            src={FifthImg}
                            alt="Top Room"
                            className="rounded-xl h-60 md:h-65 lg:h-80 xl:h-110 object-cover"
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 items-center gap-3 md:gap-20 px-4 md:px-10 py-10" data-aos="fade-up">
                    <div className="w-full relative flex items-center justify-start mx-auto">
                        <img
                            src={SeventhImg}
                            alt="Top Room"
                            className="rounded-xl h-60 md:h-65 lg:h-80 xl:h-110 object-cover"
                        />
                        <img
                            src={SixthImg}
                            alt="Base Room"
                            className="absolute -right-0 lg:right-10 h-30 md:h-32.5 lg:h-40 xl:h-55 rounded-2xl object-cover z-10"
                        />
                    </div>

                    <div className="flex flex-col gap-6">
                        <p className="text-2xl lg:text-3xl font-extrabold text-center md:text-start">
                            Take your daily list of chores. <br /><span className="text-[#520075]">And tear it up</span>
                        </p>
                        <p className="text-sm md:text-base lg:text-lg text-center md:text-start leading-relaxed">
                            You have better things to do than wash your clothes, clean up your room and cook your meals. So our team of pros will do them all for you.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-3 md:gap-5 items-center md:px-10 py-10" data-aos="fade-up">
                    <div className="grid grid-cols-2 gap-4">
                        <img
                            src={EighthImg}
                            alt="Building"
                            className="rounded-xl w-full h-full object-cover"
                        />
                        <div className="flex flex-col gap-4">
                            <img
                                src={NinethImg}
                                alt="Lounge"
                                className="rounded-xl w-full h-full object-cover"
                            />
                            <img
                                src={TenthImg}
                                alt="Corridor"
                                className="rounded-xl w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className='md:px-5 lg:px-10 flex flex-col gap-2 md:gap-5'>
                        <p className="text-2xl lg:text-3xl font-extrabold text-center md:text-start">
                            Don't come expecting <br /><span className="text-[#520075]">"hostel-PG food"</span>
                        </p>
                        <p className="text-sm lg:text-lg text-center md:text-start leading-relaxed">
                            Instead, bring along a big appetite for healthy, yummy meals. With flavours that have a local touch. And that, at the same time, take your taste buds on a journey back home.
                        </p>
                    </div>
                </div>

                <div className="text-center py-10">
                    <h2 className="text-2xl md:text-4xl font-extrabold">
                        <span className="text-[#520075]">Never</span>{' '} a dull moment
                    </h2>
                    <p className="mt-2 text-sm md:text-lg">
                        In your story, your stay with us will be the most memorable chapter
                    </p>
                </div>

                <div className="w-full ">
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={30}
                        slidesPerView={3}
                        loop={true}
                        autoplay={{ delay: 1000 }}
                    >
                        {[Slide1, Slide2, Slide3,Slide4,Slide5,Slide6].map((slide, index) => (
                            <SwiperSlide key={index} className="flex justify-center">
                                <img
                                    src={slide}
                                    alt={`Slide ${index + 1}`}
                                    className="w-115 lg:w-155 xl:w-220 object-contain rounded-md md:rounded-lg"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default LandingPage
