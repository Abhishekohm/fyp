import Login from "../../components/component/login";
import NotLoggedIn from "@/components/component/NotLoggedIn";
export default function Home() {
  return (
    <NotLoggedIn>
      <Login />
    </NotLoggedIn>
  );
}
