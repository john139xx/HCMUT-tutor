import { useEffect } from "react";
import { motion } from "framer-motion";
import { MdPeopleAlt, MdChat, MdSchool, MdLightbulb } from "react-icons/md";
import bgImage from "../assets/hImg2.png";

const SchAbout = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      icon: <MdPeopleAlt />,
      title: "Cộng đồng học tập",
      description: "Kết nối hàng trăm người học cùng nhau tiến bộ mỗi ngày.",
      image: bgImage,
    },
    {
      icon: <MdChat />,
      title: "Trao đổi & hỗ trợ",
      description: "Thảo luận, chia sẻ kinh nghiệm, giải đáp thắc mắc cùng bạn học.",
      image: bgImage,
    },
    {
      icon: <MdSchool />,
      title: "Đa dạng chủ đề",
      description: "Từ ngoại ngữ, công nghệ đến kỹ năng mềm – học gì bạn cần.",
      image: bgImage,
    },
    {
      icon: <MdLightbulb />,
      title: "Học vui – hiệu quả",
      description: "Không chỉ học, mà còn là hành trình truyền cảm hứng và phát triển bản thân.",
      image: bgImage,
    },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-blue-50 py-20">
      {/* Background Image with Light Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt="Buddy Study Background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sky-200/70 to-blue-100/50"></div>
      </div>

      {/* Content Container */}
      <motion.div
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-blue-800 mb-4"
          >
            Về Buddy Study
          </motion.h2>

          <motion.div
            className="w-20 h-1 bg-blue-400 mb-8 mx-auto"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          ></motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-blue-700/90 max-w-2xl mx-auto leading-relaxed"
          >
            Buddy Study là nơi mọi người cùng nhau học tập, chia sẻ kiến thức và tạo động lực cho nhau trên hành trình phát triển bản thân.
          </motion.p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all bg-white/80 border border-blue-100 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              {/* Background Image with light tint */}
              <div className="absolute inset-0">
                <img
                  src={feature.image}
                  alt="Background"
                  className="w-full h-full object-cover opacity-20"
                />
              </div>

              {/* Content */}
              <div className="relative z-10 p-8 h-full flex flex-col justify-end text-blue-900">
                <div className="text-4xl mb-4 text-blue-500">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                <p className="text-base text-blue-800/90">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing Text */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-lg text-blue-700/90 max-w-3xl mx-auto leading-relaxed">
            Chúng tôi tin rằng khi học cùng nhau, mỗi người sẽ mạnh mẽ hơn, tự tin hơn và đạt được nhiều thành công hơn – không chỉ trong học tập, mà cả trong cuộc sống.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SchAbout;
