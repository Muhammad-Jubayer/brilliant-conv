import { useAuth } from "../../contexts/AuthContext";
import { LogoutButton } from "../Authenticate";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

function MainHeading() {
  const [contrac, setContrac] = useState(true);
  const { currentUser } = useAuth();
  return (
    <div>
      {!contrac && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginBottom: "10px",
          }}
        >
          <p>{currentUser.displayName}</p>
          <p>{currentUser.uid}</p>
          <LogoutButton />
        </div>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <img src={logo} style={{ margin: "5px" }} height="40px" alt="Logo" />
          <h6>Brilliant Conversation</h6>
        </div>
        {contrac ? (
          <MdArrowDropDown
            size="25"
            color="black"
            onClick={() => setContrac(false)}
          />
        ) : (
          <MdArrowDropUp
            size="25"
            color="black"
            onClick={() => setContrac(true)}
          />
        )}
      </div>
    </div>
  );
}
export default MainHeading;
