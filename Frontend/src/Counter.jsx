import React, { useState, useEffect } from "react";

const Counter = () => {
  const [clients, setClients] = useState(5);
  const [projects, setProjects] = useState(7);
  const [supportHours, setSupportHours] = useState(2);

  // Simulate the counter animation on component mount
   useEffect(() => {
    const updateCounters = () => {
      const clientsEnd = 232;
      const projectsEnd = 521;
      const supportHoursEnd = 453;

      // Increment counters if they are not at their final values
      if (clients < clientsEnd) {
        setClients((prevClients) => prevClients + 1);
      }
      if (projects < projectsEnd) {
        setProjects((prevProjects) => prevProjects + 1);
      }
      if (supportHours < supportHoursEnd) {
        setSupportHours((prevSupportHours) => prevSupportHours + 1);
      }
    };

    // Update the counters every hour (3600000 milliseconds)
    const interval = setInterval(updateCounters, 3600000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to run the effect only once on component mount

 

  return (
    <section id="stats-counter" className="stats-counter">
      <div className="container" data-aos="fade-up">
        <div className="row gy-4 align-items-center">
          <div className="col-lg-6">
            <img src="assets/img/hero2.svg" alt="" className="img-fluid" />
          </div>
          <div className="col-lg-6">
            <div className="stats-item d-flex align-items-center">
              <span className="purecounter">{clients}</span>
              <p>
                <strong>Happy Clients</strong> make our success complete."
              </p>
            </div>
            <div className="stats-item d-flex align-items-center">
              <span className="purecounter">{projects}</span>
              <p>
                <strong>Projects</strong> that inspire innovation and drive
                success
              </p>
            </div>
            <div className="stats-item d-flex align-items-center">
              <span className="purecounter">{supportHours}</span>
              <p>
                <strong>Hours Of Support</strong> to assist around
                the clock, ensuring your peace of mind
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Counter;
