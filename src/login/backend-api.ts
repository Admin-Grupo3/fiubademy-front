import axios from 'axios';
export { signup, signin, getCategories, createCourse };
//const url = 'http://localhost:3300';

const instance = axios.create({
  baseURL: 'http://localhost:3300',
  withCredentials: true,
});

function convertToISO6391(language: string): string | null {
  const languageMap: { [key: string]: string } = {
    'English': 'en',
    'Spanish': 'es'
    // Agrega más mapeos según sea necesario
  };

  return languageMap[language] || null;
}

// Replace with your desired payload

function signup(email: any, password: any, setSigninFailed: any){
    let payload = {
        email: email,
        password: password,
      };
    instance.post(`/users/signup`, payload)
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
    instance.post(`/users/signin`, payload)
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

function getCategories(): Promise<{ id: number; name: string }[]> {
  return instance.get('/categories', ).then(response => {
    console.log(response)
    if (response.status == 200) {
      return response.data;
    }
    else {
      return [];
    }
  }).catch(error => {
    console.error('Error al obtener categorías:', error);
    return [];
  });
  
}

function createCourse(title: any, language: any, categoryIds: any) {
  let payload = {
    title: title,
    language: convertToISO6391(language),
    categoryIds: categoryIds
  };
  instance.post(`/courses`, payload)
  .then(response => {
  console.log(response.data);
  if(response.status == 201){
    window.location.href = "/";
  }
  else{
    console.error('Error al crear el curso:');
  }
  })
  .catch(error => {
    console.error('Error al crear el curso:', error);
  });
}

