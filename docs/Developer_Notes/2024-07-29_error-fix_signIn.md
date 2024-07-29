# 2024-07-29 - Fix the error (SignIn)

## Objectives
- **Goal**: Resolve the sign-in error for accounts created via the signup page.

## Work Details
- **Progress**:
  - Refactored `auth.js` (controllers).
  - Fixed the SignIn error using Credential login.

## Issues and Solutions
- **Issues**:
  - SignIn error: `POST /api/auth/callback/credentials 401 in 20ms` for accounts created via the signup page.
  
- **Solutions**:
  - Identified the missing `provider` field when adding users via the signup page.
  - Added `provider: 'local'` in `emailServices.js` to ensure proper authentication.

## Theoretical Study
- **Topic**: Strapi Provider
- **Summary**:
  - The `provider` field in Strapi indicates the method used for user registration, such as `local` for email/password. This field is crucial for authentication strategies, especially when using libraries like next-auth.

- **References**:
  - [Strapi Providers Documentation](https://docs.strapi.io/dev-docs/providers)

## Results
- Successfully fixed the sign-in error.

## Next Steps
- Implement functionality to resend the email validation link.