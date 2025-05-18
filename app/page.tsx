import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LoginButton } from "@/components/auth/login-button";


const font=Poppins({
  subsets: ["latin"],
  weight: [ "600"],
})


export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <div className="space-y-6 text-center">
        <h1 className={cn("text-6xl font-semibold", font.className) }>Auth</h1>
        <p className="text-2xl">Simple Auth Service</p>
      </div>
      <div>
        <LoginButton mode="redirect" asChild>
          <Button variant={"secondary"} size={"lg"}>Sign In</Button>
        </LoginButton>
      </div>
    </main>
  );
}
