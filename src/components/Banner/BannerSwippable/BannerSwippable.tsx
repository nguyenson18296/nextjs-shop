import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

export const BannerSwippable: React.FC = () => {
  return (
    <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
      <SwiperSlide>
        <Image
          src="https://gstatic.gvn360.com/2021/02/3020944.jpg"
          alt="image"
          width={1200}
          height={350}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="https://i0.wp.com/9to5mac.com/wp-content/uploads/sites/6/2023/09/iphone-15-pro-wallpaper-2.webp?w=1500&quality=82&strip=all&ssl=1"
          alt="image"
          width={1200}
          height={350}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="https://cms.dmpcdn.com/news/2023/09/22/f65f3540-5904-11ee-b9d0-4b6fe49ba027_original.jpg"
          alt="image"
          width={1200}
          height={350}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="https://gstatic.gvn360.com/2021/02/3020944.jpg"
          alt="image"
          width={1200}
          height={350}
        />
      </SwiperSlide>
    </Swiper>
  );
};
