import React from "react";
import "./services.css";
import ServiceInquiryForm from "./ServiceInquiryForm";

const SoftwareEngineeringDetails = () => {
  return (
    <div className="container">
      <main>
        <section className="intro-section">
          <h1>Software Engineering</h1>
          <p>
            Premium-quality engineering to build future-proof products, platforms and solutions
          </p>
        </section>

        <section className="description-section">
          <p>
            In today's fast-paced digital landscape, exceptional software engineering is the foundation 
            of successful businesses. We deliver premium-quality engineering services that transform your 
            vision into robust, scalable, and future-proof digital products. Our expert team combines 
            cutting-edge technologies with best practices to build solutions that not only meet your 
            current needs but also adapt to future challenges and opportunities.
          </p>
          <p>
            From enterprise-grade applications to innovative consumer platforms, we provide end-to-end 
            software development services that drive business growth and competitive advantage. Our 
            comprehensive approach covers everything from initial architecture design to deployment, 
            maintenance, and continuous improvement.
          </p>
        </section>

        <section className="services-section">
          <h2>Our Services</h2>
          <div className="services-list">
            <div className="service-item">
              <h3>Web Development</h3>
              <p>
                Build powerful web applications with modern frameworks including React.js, Angular.js, 
                Node.js, Java, and Python. We develop SaaS platforms, enterprise portals, and eCommerce 
                solutions that deliver exceptional user experiences and drive business results.
              </p>
            </div>
            <div className="service-item">
              <h3>Cloud & DevOps</h3>
              <p>
                Leverage the power of cloud computing with AWS, GCP, and Azure. We design scalable cloud 
                architectures, implement Kubernetes orchestration, and automate deployment pipelines for 
                seamless operations and continuous delivery.
              </p>
            </div>
            <div className="service-item">
              <h3>Mobile Development</h3>
              <p>
                Create native and cross-platform mobile applications for iOS and Android. Our expertise 
                includes Flutter, React Native, Progressive Web Apps (PWA), and responsive web solutions 
                that provide consistent experiences across all devices.
              </p>
            </div>
            <div className="service-item">
              <h3>Enterprise Integrations</h3>
              <p>
                Seamlessly connect and integrate your systems with ERP, CRM, eCommerce platforms, and 
                other enterprise applications. We provide custom integrations and system customizations 
                that streamline operations and enhance productivity.
              </p>
            </div>
            <div className="service-item">
              <h3>API Development</h3>
              <p>
                Design and build robust RESTful and GraphQL APIs that enable seamless data exchange 
                between systems. We create scalable API architectures that support microservices and 
                modern application architectures.
              </p>
            </div>
            <div className="service-item">
              <h3>Quality Assurance & Testing</h3>
              <p>
                Ensure reliability and performance through comprehensive testing strategies including 
                unit testing, integration testing, end-to-end testing, and performance optimization. 
                We maintain high code quality standards throughout the development lifecycle.
              </p>
            </div>
          </div>
        </section>

        <section className="customer-stories">
          <h2>Customer Stories</h2>
          <div className="stories-list">
            <div className="story-item">
              <h3>Enterprise Platform Modernization</h3>
              <p>Transformed legacy systems into modern, cloud-native applications</p>
              <button>Learn more</button>
            </div>
            <div className="story-item">
              <h3>Scalable E-Commerce Solution</h3>
              <p>Built a high-performance eCommerce platform handling millions of transactions</p>
              <button>Learn more</button>
            </div>
          </div>
        </section>

        <ServiceInquiryForm serviceType="Software Engineering" />

        <section className="testimonial-section">
          <p>
            "Zedflux delivered exceptional software engineering that transformed our business operations. 
            Their technical expertise and attention to detail ensured we got a robust, scalable solution 
            that exceeded our expectations."
          </p>
        </section>
      </main>
    </div>
  );
};

export default SoftwareEngineeringDetails;
