import React from "react";
import "./Clients.css";

import accessBank from "./images/clients/access-bank-600x172.webp";
import cwg from "./images/clients/cwg-600x172.webp";
import cummins from "./images/clients/cummins-600x172.webp";
import fbNquest from "./images/clients/fbnquest-600x172.webp";
import lagosState from "./images/clients/lagosstate-2-600x172.webp";
import nationalSafetyCouncil from "./images/clients/nationalsaftetycouncil-1-600x172.webp";
import yabaPsychiatric from "./images/clients/yaba-psychiatric-1-600x172.webp";

const clientLogos = [
  { name: "Access Bank", src: accessBank },
  { name: "CWG", src: cwg },
  { name: "Cummins", src: cummins },
  { name: "FBNQuest", src: fbNquest },
  { name: "Lagos State", src: lagosState },
  { name: "National Safety Council", src: nationalSafetyCouncil },
  { name: "Yaba Psychiatric Hospital", src: yabaPsychiatric },
];

const Clients = () => (
  <section className="clients-trust" aria-labelledby="clients-trust-title">
    <div className="container">
      <div className="clients-trust__intro">
        <p className="clients-trust__eyebrow">Trusted partnerships</p>
        <h2 id="clients-trust-title">
          Trusted to bring our clients’ most important projects to life
        </h2>
        <p>Their satisfaction is how we measure our success.</p>
      </div>

      <div className="clients-marquee" aria-label="Our clients">
        <div className="clients-marquee__track">
          {[0, 1].map((copy) => (
            <div
              className="clients-marquee__group"
              key={copy}
              aria-hidden={copy === 1 ? "true" : undefined}
            >
              {clientLogos.map((client) => (
                <div className="clients-marquee__logo" key={client.name}>
                  <img src={client.src} alt={copy === 0 ? client.name : ""} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Clients;
