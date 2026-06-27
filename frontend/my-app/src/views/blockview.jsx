import React from "react";
import styles from "../views/blockview.module.css";
function Blockview(props) {
  const { user_id,name,email, onApprove,onReject} = props;

  const handleApprove = async () => {
    await onApprove(user_id); 
  };

  const handleReject = async() => {
    await onReject(user_id); 
  };

  return (
    <div className={styles.blockview}>
      <h2 >{name}</h2>
      <h2>{email}</h2>
      <button onClick={handleApprove}>Accept</button>
      <button onClick={handleReject}>Reject</button>
    </div>
  );
}
export default Blockview;