import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Land() {
    return (<>
        Landing page
        <Button>
            <Link className="ml-1 text-md text-blue-600 hover:underline" href="/login">
                Log In!
            </Link>
        </Button>
    </> 
    );
}
