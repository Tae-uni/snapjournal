// "use client"

// import axios from "axios";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useState } from "react"

// const SignUpPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [username, setUsername] = useState('');
//   const [error, setError] = useState('');
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const response = await axios.post(`${process.env.STRAPI_API_URL}/api/auth/local/signUp`, {
//         username,
//         email,
//         password,
//       });

//       if (response.data.user) {
//         await signIn('credentials', { email, password, callbackUrl: '/' });
//         router.push('/');
//       }
//     } catch (error) {
//       setError('Failed to signUp');
//       console.error('SignUp error:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>SignUp Page</h1>
//       <form onSubmit={handleSubmit}>
//         <input type="text" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
//         <br />
//         <input type="email" value={email} placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} />
//         <br />
//         <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
//         <br />
//         <button type="submit">Submit</button>
//         {error && <p>{error}</p>}
//       </form>
//     </div>
//   );
// };

// export default SignUpPage;

import { SignUpForm } from "@/components/forms/signUpForm";

export default function SignUpPage() {
  return <SignUpForm />
}