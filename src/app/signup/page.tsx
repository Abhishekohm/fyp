import Signup from "../../components/component/signup";
import NotLoggedIn from "@/components/component/NotLoggedIn";
export default function Home() {
  return (
    <NotLoggedIn>
      <Signup />
    </NotLoggedIn>
  );
}
