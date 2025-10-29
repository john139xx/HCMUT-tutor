import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import image from "../assets/ImageCarousel/Bg-2.jpg";
import { MdComputer, MdPeople, MdLibraryBooks } from "react-icons/md";

const AboutSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { icon: <MdPeople />, value: "1,200+", label: "Học viên" },
    { icon: <MdComputer />, value: "80+", label: "Giảng viên" },
    { icon: <MdLibraryBooks />, value: "50+", label: "Khóa học trực tuyến" },
  ];

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-white to-blue-50">
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center opacity-90"
        style={{
          backgroundImage: `url(${image})`,
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover",
          y,
        }}
      ></motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-600/50"></div>

      {/* Content */}
      <div
        ref={ref}
        className="relative container mx-auto flex flex-col items-center text-center px-6 sm:px-10 py-32"
      >
        {/* Heading */}
        <motion.h2
          className="text-white text-4xl sm:text-5xl font-bold tracking-wide mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          E-Learning Platform for Modern Education
        </motion.h2>

        {/* Divider */}
        <motion.div
          className="w-20 h-1 bg-white mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        ></motion.div>

        {/* Description */}
        <motion.p
          className="text-blue-100 text-lg sm:text-xl max-w-3xl leading-relaxed mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Chào mừng bạn đến với <span className="text-white font-semibold">E-Learning Hub</span> —
          nền tảng học tập trực tuyến giúp bạn phát triển kỹ năng mọi lúc, mọi nơi.
          Với đội ngũ giảng viên chuyên nghiệp và hệ thống khóa học phong phú, 
          chúng tôi mang đến trải nghiệm học tập linh hoạt, hiện đại và hiệu quả.
        </motion.p>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 hover:bg-white/30 transition-all"
              variants={{
                hidden: { scale: 0.9, opacity: 0 },
                visible: { scale: 1, opacity: 1 },
              }}
            >
              <div className="text-white text-4xl mb-4">{stat.icon}</div>
              <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
              <p className="text-blue-100">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
