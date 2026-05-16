import notfound from '../assets/404.png';
import { Link } from 'react-router-dom';
function NotFound() {
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
    flexDirection: "column",
    fontFamily: "'Poppins', sans-serif"

  };

  return (
    <div style={style}>
      <img src={notfound} alt="404 Page Not Found" width="400" />
      <h2>Page Not Found</h2>
      <Link to={'/'}>Go Back</Link>
    </div>
  );
}

export default NotFound;