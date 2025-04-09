import React from "react";
import ServicePill from "./ServicePill";

const SuccessStoryCard = ({ story }) => {
return (
    <div className="success-story-card">
        <img
            src={story.image}
            alt="story"
            style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                borderRadius: "8px",
            }}
        />
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
