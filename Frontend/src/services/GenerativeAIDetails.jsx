import React from "react";
import "./services.css";
import ServiceInquiryForm from "./ServiceInquiryForm";

const GenerativeAIDetails = () => {
  return (
    <div className="container">
      <main>
        <section className="intro-section">
          <h1>Generative AI</h1>
          <p>
            Build your own AI models and apps like ChatGPT for next-level growth
          </p>
        </section>

        <section className="description-section">
          <p>
            Generative AI is revolutionizing how businesses create content, automate processes, and 
            engage with customers. We help organizations harness the power of generative AI to unlock 
            new possibilities and drive unprecedented growth. Whether you need custom AI models, 
            ChatGPT integrations, or AI-powered applications, we provide end-to-end solutions that 
            transform your business operations.
          </p>
          <p>
            Our team specializes in developing tailored generative AI solutions that understand your 
            business context and deliver meaningful results. From content generation to code automation, 
            we build AI systems that learn, adapt, and continuously improve to meet your evolving needs.
          </p>
        </section>

        <section className="services-section">
          <h2>Our Services</h2>
          <div className="services-list">
            <div className="service-item">
              <h3>Content Generation</h3>
              <p>
                Automate content creation across multiple channels including marketing copy, social media 
                posts, blog articles, and product descriptions. Boost your brand visibility and engagement 
                while reducing content creation time and costs.
              </p>
            </div>
            <div className="service-item">
              <h3>Custom Generative AI Models</h3>
              <p>
                Develop tailored AI models trained on your specific data and business requirements. 
                Create proprietary AI solutions that understand your industry, brand voice, and unique 
                business needs for competitive advantage.
              </p>
            </div>
            <div className="service-item">
              <h3>ChatGPT Integration</h3>
              <p>
                Seamlessly integrate ChatGPT and other large language models into your existing systems. 
                Build AI-powered chatbots, virtual assistants, and intelligent automation tools that 
                enhance customer experiences and streamline operations.
              </p>
            </div>
            <div className="service-item">
              <h3>Code Generation</h3>
              <p>
                Accelerate software development with AI-powered code generation tools. Improve efficiency, 
                reduce manual errors, and enable developers to focus on complex problem-solving while AI 
                handles routine coding tasks.
              </p>
            </div>
            <div className="service-item">
              <h3>Image & Video Generation</h3>
              <p>
                Create stunning visuals and videos using generative AI. From product images to marketing 
                materials, generate high-quality visual content that aligns with your brand identity and 
                messaging.
              </p>
            </div>
            <div className="service-item">
              <h3>AI-Powered Analytics</h3>
              <p>
                Leverage generative AI to extract insights from unstructured data, generate reports, 
                and provide intelligent recommendations. Transform data into actionable intelligence that 
                drives strategic decision-making.
              </p>
            </div>
          </div>
        </section>

        <section className="customer-stories">
          <h2>Customer Stories</h2>
          <div className="stories-list">
            <div className="story-item">
              <h3>AI Content Platform</h3>
              <p>Built a generative AI platform that automated content creation for marketing teams</p>
              <button>Learn more</button>
            </div>
            <div className="story-item">
              <h3>Intelligent Virtual Assistant</h3>
              <p>Developed a ChatGPT-powered assistant that transformed customer support operations</p>
              <button>Learn more</button>
            </div>
          </div>
        </section>

        <ServiceInquiryForm serviceType="Generative AI" />

        <section className="testimonial-section">
          <p>
            "Zedflux helped us implement generative AI solutions that transformed our content creation 
            process. The results exceeded our expectations and delivered significant time and cost savings."
          </p>
        </section>
      </main>
    </div>
  );
};

export default GenerativeAIDetails;
