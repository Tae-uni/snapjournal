# New Features: `useFormState` and `useFormStatus` Hooks

I've been working on integrating the new features, specifically the `useFormState` and `useFormStatus` hooks, into my project. While these features offer streamlined management of form submissions and pending states within Server Actions, I encountered several challenges that necessitated a return to more traditional approaches.

## Problems Encountered
1. **Incompatibility with `onSubmit`:** The `useFormState` and `useFormStatus` hooks do not work effectively when using the `onSubmit` event handler. This is because these hooks are designed to operate with the `formAction` attribute directly, where they automatically manage the form's state, pending status, and error handling.
2. **Limited Customization for Client-Side Logic:** When using these hooks, it’s challenging to customize actions on the client side because they are tightly coupled with the `formAction` approach.

## What are `useFormState` and `useFormStatus`?
The `useFormState` and `useFormStatus` hooks are part of a newer approach designed to simplify the handling of form submissions in Next.js, particularly within Server Actions. They work seamlessly with the `formAction` attribute on forms, automating the management of form state, including pending states and error handling.

- **`useFormState`:** Manages the overall state of the form, including form data, errors, and success messages.
- **`useFormStatus`:** Specifically handles the pending state of a form, typically used to show a loading indicator when a form is being submitted.

### Example of Modern Approach Using `useFormState` and `useFormStatus`
```javascript
'use client';

import { useFormState, useFormStatus } from "react-dom";

export default function SignupForm() {
  const [state, formAction, pending] = useFormState(createUser, initialState);

  return (
    <form action={formAction}>
      <label htmlFor="email">Email</label>
      <input type="text" id="email" name="email" required />
      <button aria-disabled={pending} type="submit">
        {pending ? 'Submitting...' : 'Sign up'}
      </button>
      <p aria-live="polite">{state.message}</p>
    </form>
  );
}
```
