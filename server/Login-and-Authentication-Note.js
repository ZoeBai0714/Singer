/*
  Login
  
  Logic behind login:
  Hash the user password using bcrypt when they create themselves through sign and save the hashed password into db,
  when they login, post the username and password to backend, and find the user by username,
  and check against the found hashed db password with the new incoming password(hash it too with bcrypt.compare)
  if the response is true, then change login status to true and render page, else not.
 */


  /*
  JWT Authentication
  
  There are two ways, syn or async

  Login behind authentication:
    We need to generate a token with jwt in backend when user login, and send this token back to frontend page
    of which we want to protect, and then check against the localStorage.length 

  1. create token in the backend app.js using jwt.sign
  2. send this token using io.emit back to the frontend Home page and listen io.on in componentDidMount
  3. In componentDidmount create localStorage to remember userinfo and token
  4. In the frontend App.js where we do conditional rendering, add the localStorage.length as one of the conditions, so we can remember the user 
 */