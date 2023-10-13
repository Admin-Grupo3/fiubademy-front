import axios from 'axios';
export { signup, signin };
const url = 'http://localhost:3300/users';

// Replace with your desired payload

function signup(email: any, password: any, setSigninFailed: any){
    let payload = {
        email: email,
        password: password,
      };
    axios.post(`${url}/signup`, payload)
  .then(response => {
    console.log(response.data);
    if(response.status == 201){
        window.location.href = "/";
    }
    else{
      setSigninFailed(true);
    }
  })
  .catch(error => {
    console.error(error);
    setSigninFailed(true);
  });
}

function signin(email: any, password: any, setSigninFailed: any){
    let payload = {
        email: email,
        password: password,
      };
    axios.post(`${url}/signin`, payload)
  .then(response => {
    if(response.status == 201){
      window.location.href = "/";
  }
  else{
    setSigninFailed(true);
  }
  })
  .catch(error => {
    console.error(error);
    setSigninFailed(true);
  });
}

