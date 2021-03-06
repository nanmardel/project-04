import tokenService from './tokenService';

const BASE_URL = '/api/users/';




function signup(user) {
  return fetch(BASE_URL + 'signup', {
    method: 'POST',
     // If you are sending a file/photo over
    // what do datatype do you need to change this too?

    // multipart/form-data request! <- in our headers, this tells the server hey, there multi
    // parts of this request, one of them in our case is a photo!

    // The browser will detect that it is a multipart form/data request, 
    // we just have to make sure the object in the body, is formData not JSON


    body: user // <- user will be the contents of our form, in formdata format!
  })
  .then(res => {
    if (res.ok) return res.json();
    // Probably a duplicate email
    throw new Error('Email already taken!');
  })
  // Parameter destructuring!
  .then(({token}) => tokenService.setToken(token));
  // The above could have been written as
  //.then((token) => token.token);
}

function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

function login(creds) {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(creds)
  })
  .then(res => {
    // Valid login if we have a status of 2xx (res.ok)
    if (res.ok) return res.json();
    throw new Error('Bad Credentials!');
  })
  .then(({token}) => tokenService.setToken(token));
}

function getProfile(username){
  console.log(username, '<-- username,utils')
  return fetch(BASE_URL + username, {
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    }
  }).then(res => {
    if(res.ok) return res.json();
    throw new Error('Bad Credentials! CHECK THE SERVER TERMINAL!')
  })
}

const userService = {
  signup, 
  getUser,
  logout,
  login,
  getProfile
};

export default userService