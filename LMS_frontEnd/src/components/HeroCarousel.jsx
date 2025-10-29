import "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import Img1 from "../assets/ImageCarousel/Bg-1.jpg";
import Img2 from "../assets/ImageCarousel/Bg-2.jpg";
import Img3 from "../assets/ImageCarousel/Bg-3.jpg";
import Img4 from "../assets/ImageCarousel/Bg-4.jpg";
import Img5 from "../assets/ImageCarousel/Bg-5.jpg";
import BuddyLogo from "../assets/SchoolLogos/School_logo.png";

const HeroCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    cssEase: "ease-in-out",
    arrows: false,
  };

  const images = [Img1, Img2, Img3, Img4, Img5];

  return (
    <div className="relative bg-blue-50 mt-16 overflow-hidden">
      {/* Image Carousel */}
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <div className="relative h-[360px] sm:h-[480px] md:h-[560px] lg:h-[620px]">
              <div
                className="h-full bg-cover bg-center transition-all duration-700"
                style={{ backgroundImage: `url(${image})` }}
              ></div>

              {/* Overlay xanh nhạt */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-200/60 via-sky-200/40 to-blue-50/60"></div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Nội dung giữa */}
      <div className="absolute inset-0 flex flex-col justify-center items-center z-10 text-center px-6">
        <motion.img
          src={BuddyLogo}
          alt="Buddy Study Logo"
          className="h-20 sm:h-28 md:h-36 lg:h-40 mb-6 drop-shadow-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        />

        <motion.h1
          className="text-blue-800 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide leading-snug"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Buddy Study
        </motion.h1>

        <motion.p
          className="text-blue-700 mt-4 text-lg sm:text-xl max-w-2xl leading-relaxed font-medium"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          Nơi bạn tìm thấy bạn học – cùng chia sẻ, cùng tiến bộ và cùng đạt mục tiêu học tập.
        </motion.p>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <span className="text-blue-700 text-sm mb-2">Cuộn xuống</span>
        <div className="w-4 h-8 border-2 border-blue-500 rounded-full">
          <motion.div
            className="w-2 h-2 bg-blue-500 rounded-full mt-1"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          ></motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroCarousel;
