# 07.25~07.27 - VerifyEmailMessages

## Objectives
- **Goal**: Fix the error when click the email validation link


## Work Details
- **Progress**:
  - Created Error Message page and SuccessMessage page after clicking the email link
  - Worked on process (User validation through Email)

## Issues and Solutions
- **Issues**:
  - After SignUp, can’t validate the email link. 400 Error:  

>POST /signup 303 in 3374ms
 GET /verify-email?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTQsImlhdCI6MTcyMjAxNjg4MSwiZXhwIjoxNzIyMDIwNDgxfQ.ONcKBIusZ7NX5N6-kmU_2Y_YvJtiEhUYvDRA0EbqWlQ 200 in 22ms
 GET /api/auth/verify?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTQsImlhdCI6MTcyMjAxNjg4MSwiZXhwIjoxNzIyMDIwNDgxfQ.ONcKBIusZ7NX5N6-kmU_2Y_YvJtiEhUYvDRA0EbqWlQ 400 in 5ms
 GET /api/auth/verify?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTQsImlhdCI6MTcyMjAxNjg4MSwiZXhwIjoxNzIyMDIwNDgxfQ.ONcKBIusZ7NX5N6-kmU_2Y_YvJtiEhUYvDRA0EbqWlQ 400 in 3ms  
 

- **Solutions**:
  - The frontend address to backend was incorrect. 

  ```js
  It must be axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/verify?token=${token}`)
  ```
- **Issues**:
	- Strapi's handler Error. 	

## Theoretical Study
- **Topic**: Understanding routes.js in Strapi
- **Summary**:  

```js
module.exports = {
  routes: [
    {
      method: "POST",
      path: "/auth/local/register",
      handler: "auth.register",
      config: {
        "policies": []
      }
    },
    {
      method: "GET",
      path: "/auth/local/verify",
      handler: "auth.verifyEmail",
      config: {
        "policies": []
      }
    }
  ],
};
```  

- `Method`: Method associated to the route(i.e. `GET`, `POST`, `PUT`, `DELETE` or `PATCH`) - String
- `path`: Path to reach, starting with a forward-leading slash (e.g. `/articles`) EndPoint
- `handler`: Controller such as auth.js file's register function and auth.js file's verifyEmail function. <br />Function to execute when the route is reached. Should follow this syntax: `<controllerName>.<actionName>`
- `config(Optional)`: Optional configurations like policies and middlewares - Object


- **References**:
  - [Creating custom routers](https://docs.strapi.io/dev-docs/backend-customization/routes#creating-custom-routers)


## Results
- Implemented Error/Success pages after clicking the email validation link.

## Next Steps
- Resolve server errors (routes, handler)