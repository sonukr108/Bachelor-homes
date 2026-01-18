import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Slide1 from '../assets/sliders/slide1.svg'
import Slide2 from '../assets/sliders/slide2.svg'
import Slide3 from '../assets/sliders/slide3.svg'
import Slide4 from '../assets/sliders/slide4.svg'
import Slide5 from '../assets/sliders/slide5.svg'

const CarouselComponent = () => {
  return (
    <div className="w-full h-full md:w-115 lg:w-155 xl:w-220 max-w-[880px]">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 2500 }}
      >
        {[Slide1, Slide2, Slide3, Slide4, Slide5].map((slide, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            <img
              src={slide}
              alt={`Slide ${index + 1}`}
              className="w-full md:w-115 lg:w-155 xl:w-220 max-w-[880px] h-auto object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarouselComponent;
