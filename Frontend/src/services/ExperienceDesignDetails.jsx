import React from "react";
import "./services.css";
import ServiceInquiryForm from "./ServiceInquiryForm";

const ExperienceDesignDetails = () => {
  return (
    <div className="container">
      <main>
        <section className="intro-section">
          <h1>Experience Design</h1>
          <p>
            Create simple and engaging digital experiences that delight customers and fuel growth
          </p>
        </section>

        <section className="description-section">
          <p>
            Great design is more than aesthetics—it's about creating intuitive, engaging experiences 
            that solve real problems and delight users. Our experience design services combine user 
            research, strategic thinking, and creative excellence to craft digital products that 
            people love to use and that drive measurable business results.
          </p>
          <p>
            We believe in human-centered design that puts users at the heart of every decision. Through 
            rigorous research, iterative prototyping, and user testing, we create experiences that are 
            not only beautiful but also functional, accessible, and aligned with your business goals. 
            From mobile apps to enterprise platforms, we design solutions that engage, convert, and 
            retain users.
          </p>
        </section>

        <section className="services-section">
          <h2>Our Services</h2>
          <div className="services-list">
            <div className="service-item">
              <h3>User Research</h3>
              <p>
                Deep dive into user needs, behaviors, and motivations through comprehensive research. 
                We conduct user interviews, behavior tracking, analytics analysis, and journey mapping 
                to uncover insights that inform exceptional design decisions.
              </p>
            </div>
            <div className="service-item">
              <h3>UX/UI Design</h3>
              <p>
                Create intuitive interfaces and seamless user experiences through wireframing, information 
                architecture, and interaction design. We design interfaces that are both beautiful and 
                functional, ensuring users can accomplish their goals effortlessly.
              </p>
            </div>
            <div className="service-item">
              <h3>Product Design</h3>
              <p>
                Design complete digital products including mobile apps, web applications, data 
                visualizations, IoT interfaces, and wearables. We take products from concept to launch, 
                ensuring every touchpoint delivers exceptional user experiences.
              </p>
            </div>
            <div className="service-item">
              <h3>Design Systems</h3>
              <p>
                Build scalable design systems and component libraries that ensure consistency across 
                platforms and accelerate development. Create design standards that maintain quality while 
                enabling rapid iteration and scaling.
              </p>
            </div>
            <div className="service-item">
              <h3>Prototyping & Testing</h3>
              <p>
                Validate design concepts through interactive prototypes and user testing. We iterate 
                quickly based on real user feedback, ensuring your product meets user needs before 
                development begins.
              </p>
            </div>
            <div className="service-item">
              <h3>Accessibility Design</h3>
              <p>
                Design inclusive experiences that are accessible to all users, regardless of abilities. 
                We ensure compliance with WCAG guidelines and create interfaces that are usable by 
                everyone, expanding your potential user base.
              </p>
            </div>
          </div>
        </section>

        <section className="customer-stories">
          <h2>Customer Stories</h2>
          <div className="stories-list">
            <div className="story-item">
              <h3>Mobile App Redesign</h3>
              <p>Redesigned mobile experience increased user engagement by 150%</p>
              <button>Learn more</button>
            </div>
            <div className="story-item">
              <h3>Enterprise Platform UX</h3>
              <p>Transformed complex enterprise software into an intuitive user experience</p>
              <button>Learn more</button>
            </div>
          </div>
        </section>

        <ServiceInquiryForm serviceType="Experience Design" />

        <section className="testimonial-section">
          <p>
            "Zedflux's design team created a user experience that completely transformed how our 
            customers interact with our platform. The results speak for themselves—increased engagement, 
            higher conversions, and happier users."
          </p>
        </section>
      </main>
    </div>
  );
};

export default ExperienceDesignDetails;
