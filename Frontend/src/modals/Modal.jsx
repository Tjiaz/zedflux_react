import React from "react";

const Modal = () => {
  return (
    <div id="customModal" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <h2>Hold up!</h2>
        <p>Couldn't find what you were looking for?</p>
        <p>
          Book a free consultation, and together, we'll craft personalized
          solutions that align perfectly with your goals.
        </p>
        <form>
          <input type="text" placeholder="Full Name*" required />
          <input type="email" placeholder="Work Email*" required />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
