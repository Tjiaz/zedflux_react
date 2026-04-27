import diamond from "../images/diamond.webp";
import eee1 from "./Portfolio_details/eee1.webp";
import eee2 from "./Portfolio_details/eee2.webp";
import eee3 from "./Portfolio_details/eee3.webp";
import eee4i from "./Portfolio_details/eee4i.webp";
import eee6 from "./Portfolio_details/eee6.webp";
import eee7 from "./Portfolio_details/eee7.webp";
import eee8 from "./Portfolio_details/eee8.webp";
import eee9 from "./Portfolio_details/eee9.webp";
import eee10 from "./Portfolio_details/eee10.webp";

export const portfolioStories = [
  {
    slug: "revolutionizing-ecommerce",
    title: "Revolutionizing eCommerce",
    image: diamond,
    description:
      "Unifying systems and enhancing customer experiences for Diamonds Direct",
    services: ["AI/ML", "TRANSFORMATION", "MODERNIZATION"],
    team: [
      "Thomas Riberio",
      "Sihye Ryu",
      "Ricairis Tejada",
      "Viraj Upadhyay",
    ],
    heroTitle: "Revolutionizing eCommerce",
    heroDescription:
      "A connected commerce transformation focused on customer experience, modernization, and scalable digital operations.",
    status: "coming-soon",
  },
  {
    slug: "bespoke-b2b-sales-portal",
    title: "Bespoke B2B Sales Portal",
    video: "/porfolio/cadence-cover.mp4",
    description:
      "Transforming sales through a custom-built sales portal and ERP integration",
    services: ["DESIGN", "DEVOPS", "INNOVATION"],
    team: ["Maryam Ghafoori", "Jingya Wang"],
    heroTitle: "Bespoke B2B Sales Portal",
    heroDescription:
      "A unified sales experience bringing together workflows, data, and ERP-connected operations.",
    status: "coming-soon",
  },
  {
    slug: "automated-invoice-processing",
    title: "Automated Invoice Processing",
    video: "/porfolio/automated-invoice.mp4",
    description: "Reducing manual tasks with machine learning models",
    services: ["AI/ML", "TRANSFORMATION", "INNOVATION"],
    team: ["Maryam Ghafoori", "Jingya Wang"],
    heroTitle: "Automated Invoice Processing",
    heroDescription:
      "Applying automation and machine learning to reduce repetitive financial operations at scale.",
    status: "coming-soon",
  },
  {
    slug: "sales-efficiency-and-engagement",
    title: "Sales Efficiency and Engagement",
    video: "/porfolio/sale_efficiency.mp4",
    description: "Re-imagining cold outreach through Design Sprint",
    services: ["INNOVATION", "DESIGN", "STRATEGY"],
    team: ["Maryam Ghafoori", "Jingya Wang"],
    heroTitle: "Sales Efficiency and Engagement",
    heroDescription:
      "A strategic redesign of outreach and engagement flows to improve sales productivity.",
    status: "coming-soon",
  },
  {
    slug: "ai-powered-personalization",
    title: "AI-Powered Personalization",
    video: "/porfolio/AI-Powered.mp4",
    description: "Enhancing eCommerce experiences",
    services: ["STRATEGY", "AI/ML", "COMMERCE"],
    team: ["Maryam Ghafoori", "Jingya Wang"],
    heroTitle: "Enhancing eCommerce Experiences",
    heroDescription:
      "Helping a major U.S. grocery retailer modernize digital shopping with intelligent recommendations and predictive decisioning for millions of daily customer interactions.",
    status: "published",
    detail: {
      coverImage: eee1,
      sectionNav: [
        { id: "overview", label: "Overview" },
        { id: "services", label: "Services" },
        { id: "how-we-did-it", label: "How we did it" },
        { id: "impact", label: "Impact" },
      ],
      overviewServices: [
        {
          label: "Data Analytics",
          path: "/data-services-details",
        },
        {
          label: "Generative AI",
          path: "/generative-ai-details",
        },
        {
          label: "Software Engineering",
          path: "/software-engineering-details",
        },
        {
          label: "Commerce Acceleration",
          path: "/services",
        },
      ],
      overview: [
        "A leading U.S. grocery business with thousands of stores across dozens of states needed its digital channels to feel as useful and intuitive as its physical footprint.",
        "Shoppers were not always seeing the right products at the right moment, which weakened engagement, reduced repeat purchases, and put loyalty at risk. The retailer had immense volumes of behavioral, customer, and transaction data, but it needed a better way to turn that information into relevant experiences across every channel.",
        "Zedflux stepped in to transform that data into practical intelligence, using advanced analytics and AI-led product thinking to make shopping faster, easier, and more personalized.",
      ],
      overviewGallery: [eee2, eee3],
      servicesCopy: [
        "Zedflux delivered an AI-enabled commerce solution built to improve product discovery and create a more responsive shopping journey. The work began with enterprise-scale data cleanup and the creation of a machine-learning foundation designed for retail complexity.",
        "Within a short delivery window, we launched a recommendation engine powered by collaborative and content-aware models. By learning from order patterns and customer behavior, the platform could surface live recommendations across more than 30 categories, including category standouts and trending products.",
        "We also upgraded search with natural language processing and machine-learning ranking, reducing dead-end searches and adding more helpful autocomplete behavior. On the operations side, we introduced inventory prediction models that blended reservations, pick activity, product velocity, seasonality, demand signals, and supply-chain inputs.",
      ],
      coreHighlightsTitle: "Core Highlights",
      coreHighlightsPlaceholder:
        "Motion creative for this section will be added here.",
      processSteps: [
        {
          title: "1. Personalized Recommendations",
          body:
            "After structuring and analyzing large-scale order and browsing data, Zedflux created a recommendation engine that used collaborative and content-aware modeling to match shoppers with products that fit their preferences, routines, and purchase intent.",
          image: eee4i,
          imagePosition: "right",
        },
        {
          title: "2. Product Listing Personalization",
          body:
            "Zedflux applied machine learning to live on-site behavior and contextual customer signals so product collections could be reordered around each shopper. The result was a more relevant category experience, supported by modules such as top picks and trending items that improved discovery and repeat engagement.",
          image: eee6,
          imagePosition: "left",
        },
        {
          title: "3. Dynamic Search Results",
          body:
            "Zedflux combined natural language processing, machine-learning ranking, and behavioral context to return more relevant search results in real time. Smarter autocomplete and fewer zero-result journeys made search feel more human and more effective for conversion.",
          image: eee7,
          imagePosition: "right",
        },
        {
          title: "4. Inventory Predictions",
          body:
            "To improve both fulfillment readiness and customer confidence, Zedflux built prediction models that brought together reservation patterns, picking activity, seasonal demand, product movement, forecasting data, and supply-chain signals. This gave the retailer a stronger view of stock risk while customers were still building baskets.",
          image: eee8,
          imagePosition: "left",
        },
      ],
      supportingImage: eee9,
      impactCopy: [
        "Zedflux combined product strategy, design thinking, data expertise, and engineering execution to move quickly from concept to a production-ready release plan.",
        "By pairing modern open-source technology with agile delivery practices, we created a durable platform for stronger retention, higher digital confidence, and long-term commerce growth.",
      ],
      impactStats: [
        { value: "10%", label: "Growth in daily orders" },
        { value: "1.5x", label: "Increase in customer loyalty" },
        { value: "30+", label: "Product categories analyzed" },
        { value: "1M+", label: "Customer records analyzed" },
      ],
      impactImage: eee10,
    },
  },
  {
    slug: "data-platform-for-real-time-insights",
    title: "Data Platform for Real-time insights",
    video: "/porfolio/Data.mp4",
    description: "Enabling data-backed decisions",
    services: ["INNOVATION", "ANALYTICS"],
    team: ["Maryam Ghafoori", "Jingya Wang"],
    heroTitle: "Data Platform for Real-time Insights",
    heroDescription:
      "Building a stronger analytics foundation for better, faster operating decisions.",
    status: "coming-soon",
  },
];

export function getPortfolioStoryBySlug(slug) {
  return portfolioStories.find((story) => story.slug === slug);
}
