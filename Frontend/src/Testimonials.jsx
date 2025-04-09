import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper as SwiperCore } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./index.css";
import testimonialsData from "./Data"

// Initialize modules
SwiperCore.use([Navigation, Pagination, Autoplay]);

const Testimonials = () => {
  return (
    <section id="testimonials" className="testimonials">
      <div className="container" data-aos="fade-up">
        <div className="section-header">
          <hr />
          <p>Words from our clients</p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
            1200: {
              slidesPerView: 3,
            },
          }}
        >
          {testimonialsData.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="testimonial-wrap">
                <div className="testimonial-item">
                  <div className="d-flex align-items-center">
                    <img
                      src={testimonial.image}
                      className="testimonial-img flex-shrink-0"
                      alt={testimonial.name}
                    />
                    <div>
                      <h3>{testimonial.name}</h3>
                      <h4>{testimonial.title}</h4>
                      <div className="stars">
                        {Array.from({ length: testimonial.stars }).map(
                          (_, i) => (
                            <i key={i} className="bi bi-star-fill"></i>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                  <p>
                    <i className="bi bi-quote quote-icon-left"></i>
                    {testimonial.feedback}
                    <i className="bi bi-quote quote-icon-right"></i>
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
