'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useFormState } from "react-dom";
import resetPasswordAction from "./resetPasswordAction";

type Props = {
  code: string | undefined;
};

type InputErrorsT = {
  password?: string[];
  passwordConfirmation?: string[];
};

export type ResetPasswordFormStateT = {
  error: boolean;
  message?: string;
  inputErrors?: InputErrorsT;
  code?: string;
};

export default function ResetPassword({ code }: Props) {
  const initialState: ResetPasswordFormStateT = {
    error: false,
    code: code || '',
  };
  const [state, formAction] = useFormState<ResetPasswordFormStateT, FormData>(
    resetPasswordAction,
    initialState
  );

  if (!code) return <p>Error, please use the link we mailed you.</p>
  if (!state.error && 'message' in state && state.message === 'Success') {
    return (
      <div>
        <h2>Password was reset</h2>
        <p>
          Your password was reset. You can now{' '}
          <Link href='/signin' className="underline">
            sign in
          </Link>{' '}
          with your new password.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2>
        Reset your password
      </h2>
      <p>
        To reset your password, enter your new password, confirm it by entering it again and then click send.
      </p>
      <form action="formAction">
        <div>
          <label htmlFor="password">
            Password *
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
          />
          {state.error && state?.inputErrors?.password ? (
            <div className="text-red-500" aria-live="polite">
              {state.inputErrors.password[0]}
            </div>
          ) : null}
        </div>
        <div>
          <label htmlFor="passwordConfirmation">
            confirm your password *
          </label>
          <input
            type="password" 
            id="passwordConfirmation"
            name="passwordConfirmation"
            required
          />
          {state.error && state?.inputErrors?.passwordConfirmation ? (
            <div className="text-red-500" aria-live="polite">
              {state.inputErrors.passwordConfirmation[0]}
            </div>
          ) : null}
        </div>
        <div>
          <Button>Submit</Button>
        </div>
        {state.error && state.message ? (
          <div className="text-red-500" aria-live="polite">
            Error: {state.message}
          </div>
        ) : null}
      </form>
    </div>
  );
}