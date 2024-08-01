'use client';

import { useFormState, useFormStatus } from "react-dom";
import requestPasswordResetAction from "./requestPasswordResetAction";
import { Button } from "@/components/ui/button";

type InputErrorsT = {
  email?: string[];
};

type NoErrorFormStateT = {
  error: false;
  message?: string;
};

type ErrorFormStateT = {
  error: true;
  message: string;
  inputErrors?: InputErrorsT;
};

export type RequestPasswordResetFormStateT =
  | NoErrorFormStateT
  | ErrorFormStateT;

const initialState: NoErrorFormStateT = {
  error: false,
};

export default function ForgotPassword() {
  const [state, formAction] = useFormState<RequestPasswordResetFormStateT, FormData>(requestPasswordResetAction, initialState);
  const { pending } = useFormStatus();

  if (!state.error && state.message === 'Success') {
    return (
      <div>
        <h2>Check your email</h2>
        <p>
          We sent you an email with a link. Open this link to reset your password.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2>
        Request a password reset
      </h2>
      <p>
        Forgot your password? Enter your account email here and we will send you a link you can use to reset your password.
      </p>
      <form action={formAction}>
        <div>
          <label htmlFor="email">
            Email *
          </label>
          <input
            type="email" 
            id="email"
            name="email"
            required
          />
          {state.error && state?.inputErrors?.email ? (
            <div className="text-red-500" aria-live="polite">
              {state.inputErrors.email[0]}
            </div>
          ) : null}
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={pending}
          aria-disabled={pending}
        >
          Submit
        </Button>
        {state.error && state.message ? (
          <div className="text-red-500" aria-live="polite">
            {state.message}
          </div>
        ) : null}
      </form>
    </div>
  )
}