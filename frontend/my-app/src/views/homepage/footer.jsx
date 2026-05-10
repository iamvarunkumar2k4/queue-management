import React from "react";
import './footer.css';
function Footer(){
  return(
    <div>
      <div className="main">
        <div className="sub">
          <div className="heading">
            Real-time Updates
          </div>
          <div className="subheading">
            Instant updates for every change in the queue 
          </div>
        </div>
        <div className="sub">
          <div className="heading">
            send notification
          </div>
          <div className="subheading">
            get notified when its your turn
          </div>
        </div>
        <div className="sub">
          <div className="heading">
            QR Code join
          </div>
          <div className="subheading">
            Users can join the queue by scanning the qr
          </div>
        </div>
        <div className="sub">
          <div className="heading">
            easy Mangement
          </div>
          <div className="subheading">
            Admin can manage and call teh next user effortlessly
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;