"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import LoginForm from "./login-form";


interface LoginButtonProps {
  children: React.ReactNode;
  mode:"modal" | "redirect"
  asChild?: boolean;
}

export const LoginButton=({
  children,
  mode ='redirect',
}:LoginButtonProps)=>{
  const router=useRouter();
  const onClick=()=>{
    router.push("/auth/login");
  }

  if(mode=="modal"){
    return(
      <Dialog>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="p-0 w-auto bg-transparent border-none">
          <LoginForm/>
        </DialogContent>
      </Dialog>
    )
  }
  return(
    <div onClick={onClick} className="cursor-pointer ">
      {children}
    </div>
  )
}
