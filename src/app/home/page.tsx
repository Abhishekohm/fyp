import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      Homepage
      <Button>
        <Link
          className="ml-1 text-md text-blue-600 hover:underline"
          href="/login"
        >
          Log In!
        </Link>
      </Button>
    </>
  );
}
