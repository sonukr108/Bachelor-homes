import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Slide1 = 'https://bhbsgnvafbmrtwrgslek.supabase.co/storage/v1/object/public/static-images/sliders/slide1.svg'
const Slide2 = 'https://bhbsgnvafbmrtwrgslek.supabase.co/storage/v1/object/public/static-images/sliders/slide2.svg'
const Slide3 = 'https://bhbsgnvafbmrtwrgslek.supabase.co/storage/v1/object/public/static-images/sliders/slide3.svg'
const Slide4 = 'https://bhbsgnvafbmrtwrgslek.supabase.co/storage/v1/object/public/static-images/sliders/slide4.svg'
const Slide5 = 'https://bhbsgnvafbmrtwrgslek.supabase.co/storage/v1/object/public/static-images/sliders/slide5.svg'

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
