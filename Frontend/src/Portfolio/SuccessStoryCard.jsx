import React from "react";
import ServicePill from "./ServicePill";

const SuccessStoryCard = ({ story }) => {
  return (
    <div className="success-story-card">
      <div>
        <img src={story.image} alt={story.title} />
      </div>
      <h3>{story.title}</h3>
      <p>{story.description}</p>
      <div className="service-pills">
        {story.services.map((service, index) => (
          <ServicePill key={index} service={service} />
        ))}
      </div>
      <div className="team-members">
        {story.team.map((member, index) => (
          <span key={index} className="team-member">
            {member}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SuccessStoryCard;
