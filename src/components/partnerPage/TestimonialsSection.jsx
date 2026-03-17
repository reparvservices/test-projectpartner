import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Project Partner has transformed my business. I now get consistent high-quality leads and the platform is incredibly easy to use.",
      name: "Rajesh Kumar",
      role: "Interior Designer • Mumbai",
      projects: 45,
      avatar: "https://i.pravatar.cc/100?img=12",
    },
    {
      quote:
        "The support team is amazing and payments are always on time. Best decision I made for my construction business.",
      name: "Priya Sharma",
      role: "Contractor • Delhi",
      projects: 67,
      avatar: "https://i.pravatar.cc/100?img=33",
    },
    {
      quote:
        "I doubled my monthly income within 3 months. The quality of projects and clients is outstanding.",
      name: "Amit Patel",
      role: "Architect • Pune",
      projects: 52,
      avatar: "https://i.pravatar.cc/100?img=20",
    },
    {
      quote:
        "Professional platform with genuine opportunities. The analytics help me track and grow my business effectively.",
      name: "Sneha Reddy",
      role: "Contractor • Hyderabad",
      projects: 38,
      avatar: "https://i.pravatar.cc/100?img=45",
    },
  ];

  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const container = sliderRef.current;
    const index = Math.round(container.scrollLeft / container.offsetWidth);
    setActiveIndex(index);
  };

  return (
    <section className="lg:py-20 bg-white w-full mt-10">
      {/* HEADING */}
      <div className="text-center mb-10 px-4">
        <h2 className="lg:text-[40px] md:text-[40px] text-[26px] font-semibold text-[#101828]">
          What Our Partners Say
        </h2>
        <p className="text-[#667085] mt-3 md:text-lg">
          Real stories from real partners who transformed their business with us
        </p>
      </div>

      {/* DOTS (MOBILE ONLY) */}
      <div className="flex justify-center gap-2 mb-6 md:hidden">
        {testimonials.map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full transition-all ${
              activeIndex === i ? "bg-[#5E23DC] w-5" : "bg-[#D0D5DD]"
            }`}
          />
        ))}
      </div>

      {/* MOBILE SLIDER */}
      {/* TESTIMONIAL SWIPER */}
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          speed={800}
          loop={true}
          centeredSlides={true}
          slidesPerView={1.1}
          spaceBetween={24}
          breakpoints={{
            640: { slidesPerView: 1.2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2.5 },
            1280: { slidesPerView: 3 },
          }}
          className="testimonial-swiper"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              {({ isActive }) => (
                <div
                  className={`transition-all duration-500 ${
                    isActive ? "scale-100 opacity-100" : "scale-90 opacity-60"
                  }`}
                >
                  <TestimonialCard item={item} isActive={isActive} />
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* BOTTOM CTA */}
      <div className="text-center mt-20 px-4">
        <p className="text-[#667085] text-lg">
          Join 500+ satisfied partners growing their business with us
        </p>

        <button
          onClick={() => {
            const el = document.getElementById("pricing");
            if (!el) return;

            const y = el.getBoundingClientRect().top + window.pageYOffset;

            window.scrollTo({
              top: y,
              behavior: "smooth",
            });
          }}
          className="
            mt-6 bg-[#5E23DC]
            text-white text-[15px] lg:text-lg
            font-medium whitespace-nowrap
            px-10 py-4 rounded-xl
            shadow-[0px_10px_15px_-3px_rgba(94,35,220,0.28)]
            flex items-center gap-2 mx-auto
            transition-all
          "
        >
          Become a Partner Today
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="white"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </section>
  );
}

/* CARD COMPONENT */
const TestimonialCard = ({ item, isActive }) => {
  return (
    <div className="relative  max-w-full bg-white border border-[#EAECF0] rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] p-5">
      {/* TOP RIGHT PURPLE CORNER */}
      {isActive && (
        <div className="absolute top-0 right-0 w-[68px] h-[61px] border-t-[6px] border-r-[6px] border-[#5E23DC] rounded-tr-2xl" />
      )}

      {/* BOTTOM LEFT PURPLE CORNER */}
      {isActive && (
        <div className="absolute bottom-0 left-0 w-[68px] h-[61px] border-b-[6px] border-l-[6px] border-[#5E23DC] rounded-bl-2xl" />
      )}
      {/* QUOTE ICON */}
      <div className="w-10 h-10 bg-[#5E23DC47] rounded-lg flex items-center justify-center">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 3C15.4696 3 14.9609 3.21071 14.5858 3.58579C14.2107 3.96086 14 4.46957 14 5V11C14 11.5304 14.2107 12.0391 14.5858 12.4142C14.9609 12.7893 15.4696 13 16 13C16.2652 13 16.5196 13.1054 16.7071 13.2929C16.8946 13.4804 17 13.7348 17 14V15C17 15.5304 16.7893 16.0391 16.4142 16.4142C16.0391 16.7893 15.5304 17 15 17C14.7348 17 14.4804 17.1054 14.2929 17.2929C14.1054 17.4804 14 17.7348 14 18V20C14 20.2652 14.1054 20.5196 14.2929 20.7071C14.4804 20.8946 14.7348 21 15 21C16.5913 21 18.1174 20.3679 19.2426 19.2426C20.3679 18.1174 21 16.5913 21 15V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3H16Z"
            stroke="#5E23DC"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5 3C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V11C3 11.5304 3.21071 12.0391 3.58579 12.4142C3.96086 12.7893 4.46957 13 5 13C5.26522 13 5.51957 13.1054 5.70711 13.2929C5.89464 13.4804 6 13.7348 6 14V15C6 15.5304 5.78929 16.0391 5.41421 16.4142C5.03914 16.7893 4.53043 17 4 17C3.73478 17 3.48043 17.1054 3.29289 17.2929C3.10536 17.4804 3 17.7348 3 18V20C3 20.2652 3.10536 20.5196 3.29289 20.7071C3.48043 20.8946 3.73478 21 4 21C5.5913 21 7.11742 20.3679 8.24264 19.2426C9.36786 18.1174 10 16.5913 10 15V5C10 4.46957 9.78929 3.96086 9.41421 3.58579C9.03914 3.21071 8.53043 3 8 3H5Z"
            stroke="#5E23DC"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      {/* STARS */}
      <div className="flex mt-2 gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            width="20"
            height="20"
            fill="#FEC84B"
            viewBox="0 0 24 24"
          >
            <path d="M12 .587l3.668 7.568L24 9.748l-6 5.84 1.416 8.479L12 19.896l-7.416 4.171L6 15.588 0 9.747l8.332-1.593z" />
          </svg>
        ))}
      </div>

      {/* TEXT */}
      <p className="mt-6 text-[#475467] text-[17px] font-normal">
        "{item.quote}"
      </p>

      {/* SEPARATOR */}
      <div className="border-t border-[#EAECF0] my-2" />

      {/* FOOTER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={item.avatar}
            alt={item.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h4 className="text-[16px] font-medium text-[#101828]">
              {item.name}
            </h4>
            <p className="text-[14px] text-[#667085]">{item.role}</p>
          </div>
        </div>

        {/* PROJECT BADGE */}
        <div className="bg-[#5E23DC47] w-[71px] h-[52px] rounded-xl flex flex-col items-center justify-center">
          <span className="text-[#5E23DC] text-[18px] font-semibold leading-[28px]">
            {item.projects}
          </span>
          <span className="text-[#5E23DC] text-[12px] leading-[16px]">
            Projects
          </span>
        </div>
      </div>
    </div>
  );
};
