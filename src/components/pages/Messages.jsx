import img from "./../../assets/me.png";
import Message from "../Message";
import Search from "../SearchMsg";

export default function Messages() {
  return (
    <>
      <Search />
      <Message
        img={img}
        name={"Jubayer"}
        lastMsg="Lsta messaga"
        time="10:00 PM"
      />
    </>
  );
}
