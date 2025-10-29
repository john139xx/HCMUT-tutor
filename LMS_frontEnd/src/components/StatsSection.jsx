import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { MdPeopleAlt, MdChat, MdLibraryBooks } from "react-icons/md";

const StatsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const statItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="z-20 py-16 bg-gradient-to-b from-white to-blue-50">
      <div ref={ref} className="container mx-auto px-8 font-inter">
        {/* Grid Container */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-14 max-w-5xl">
            {/* Thành viên */}
            <motion.div
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all text-center border border-blue-100"
              variants={statItemVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <MdPeopleAlt className="text-3xl text-blue-500" />
                </div>
              </div>
              <h3 className="text-4xl font-bold text-blue-700 mb-2">
                {inView && <CountUp end={800} duration={2.5} separator="," />}+
              </h3>
              <p className="text-blue-800 text-lg font-semibold">
                Thành viên học tập
              </p>
            </motion.div>

            {/* Nhóm học */}
            <motion.div
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all text-center border border-blue-100"
              variants={statItemVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ delay: 0.2 }}
            >
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <MdChat className="text-3xl text-blue-500" />
                </div>
              </div>
              <h3 className="text-4xl font-bold text-blue-700 mb-2">
                {inView && <CountUp end={120} duration={2.5} />}+
              </h3>
              <p className="text-blue-800 text-lg font-semibold">Nhóm học Buddy</p>
            </motion.div>

            {/* Tài liệu */}
            <motion.div
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all text-center border border-blue-100"
              variants={statItemVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ delay: 0.4 }}
            >
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <MdLibraryBooks className="text-3xl text-blue-500" />
                </div>
              </div>
              <h3 className="text-4xl font-bold text-blue-700 mb-2">
                {inView && <CountUp end={500} duration={2.5} separator="," />}+
              </h3>
              <p className="text-blue-800 text-lg font-semibold">
                Tài liệu chia sẻ
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
