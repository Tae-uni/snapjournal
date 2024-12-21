import { signIn } from "next-auth/react";

const buttonBaseClasses = "flex items-center space-between w-full py-2 px-7 rounded-lg text-sm font-medium transition duration-300 mb-1 gap-6";

export function GoogleSignInButton() {
  return (
    <button
      type="button"
      onClick={() => signIn("google")}
      className={`${buttonBaseClasses} border border-gray-300 bg-white text-gray-700 hover:bg-gray-100`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 mr-2"
        viewBox="0 0 48 48"
      >
        <path
          fill="#4285F4"
          d="M24 9.5c3.43 0 6.45 1.22 8.86 3.21l6.64-6.64C34.84 2.13 29.77 0 24 0 14.63 0 6.75 5.61 3.42 13.72l7.75 6.02C13.06 14.01 18.1 9.5 24 9.5z"
        />
        <path
          fill="#34A853"
          d="M46.36 24.56c0-1.43-.13-2.81-.36-4.16H24v7.87h12.77c-.57 2.9-2.16 5.36-4.5 7.02l7.01 5.43c4.07-3.76 6.38-9.28 6.38-16.16z"
        />
        <path
          fill="#FBBC05"
          d="M10.33 28.48c-1.2-3.5-1.2-7.46 0-10.96l-7.75-6.02C.6 15.1 0 19.46 0 24s.6 8.9 1.58 12.5l7.75-6.02z"
        />
        <path
          fill="#EA4335"
          d="M24 48c6.48 0 11.91-2.15 15.88-5.82l-7.01-5.43c-2 1.34-4.54 2.14-7.43 2.14-5.9 0-10.94-4.51-12.83-10.72l-7.75 6.02C6.75 42.39 14.63 48 24 48z"
        />
        <path fill="none" d="M0 0h48v48H0z" />
      </svg>
      {/* <span className="text-center">Continue with Google</span> */}
      Continue with Google
    </button>
  );
}

export function FacebookSignInButton() {
  return (
    <button
      type="button"
      onClick={() => signIn("facebook")}
      className={`${buttonBaseClasses} border border-blue-600 bg-blue-600 text-white hover:bg-blue-700`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 mr-2"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M22 12.07C22 6.49 17.52 2 12 2S2 6.49 2 12.07c0 5.04 3.66 9.24 8.44 10.01v-7.07H7.89V12h2.55v-1.83c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.62.77-1.62 1.56V12h2.77l-.44 2.99h-2.33v7.07C18.34 21.3 22 17.1 22 12.07z" />
      </svg>
      Continue with Facebook
    </button>
  );
}