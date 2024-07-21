# 2024-07-21 - Refactorying SignUp
---
## Objectives
- **Goal**: Complete the SignUp Pages and ensure robust validation on both client and server sides.


## Work Details
- **Progress**:
  - Validated schemas for both client and server components to ensure consistency and security.
  - Refactored the SignUp code.
  - Highlight the input box when an error occurs.

## Theoretical Study
- **Topic**: Validation
- **Summary**:
  - Validation must work on both client and server sides. Previously, the code only contained server-side validation. Modified and refactored the code to work on both sides.
  - This approach prevents invalid data from being processed on the server and provides immediate feedback to the user, improving the overall user experience.
- **References**:
  - [SignUp](https://dev.to/peterlidee/signing-up-with-nextauth-credentialsprovider-using-server-actions-and-useformstate-3d3p)

## Results
- Implemented comprehensive validation for the SignUp pages.
- Ensured secure handling of user data during the sign-up process.

## Next Steps
- Sending Email confirmations.

## Additional Notes
- Originally, private information such as passwords must be encrypted using appropriate tools. The Strapi (users-permissions) plugin supports automatic password encryption.