// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { FormEvent, useState } from "react"

import { SignInForm } from "@/components/forms/signInForm";

// const SignIn = () => {
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const router = useRouter();

//   const handleLogin = async (e: FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3000/auth')
//     } catch {
      
//     }
//   } 
// }

export default function SignInPage () {
  return <SignInForm />
}