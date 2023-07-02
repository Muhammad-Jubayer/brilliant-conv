import circle from "../assets/circle.png";
import "./css/loading.css";

const Loading = () => {
  return (
    <div className="loading">
      <img src={circle} alt="Loading" className="circle" />
    </div>
  );
};

export default Loading;
