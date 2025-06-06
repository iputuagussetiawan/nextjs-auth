"use client";

import { UserRole } from "@prisma/client";
import { FormError } from "../form-error";
import { useCurrentRole } from "@/hooks/use-current-role";


interface RoleGateProps {
  allowedRole: UserRole;
  children: React.ReactNode;
}
export default function RoleGate({ allowedRole, children }: RoleGateProps) {
  const role = useCurrentRole();
  if(role !== allowedRole){
    return(
      <FormError message="You are not authorized to access this content" />
    )
  }


  return (
    <>{children}</>
  ) 
}