import jwtDecode from 'jwt-decode';

export const checkTokenExpiration = () => {

  const token = sessionStorage.getItem('accessToken');
  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      // Token has expired
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
      sessionStorage.removeItem('isLogined');
      localStorage.removeItem('visited');
      return true;
    } else {
      // Token is still valid
      return false;
      // Set up timer to check for token expiration
    }
  }else{
    return true;
  }

  }

  export const checkAdminsession = () => {

    const token = sessionStorage.getItem('adminId');
    if (token) {
      return true;
    }else{
      return false;
    }
  
    }


  export const getType = (value, body) => {
    if (value.params) {
      return { params: body }
    } else if (value.query) {
      if (typeof body === 'object') {
        return { query: body.id }
      } else {
        return { query: body._id };
      }
    }
    return {};

  }


  export const logoutUser=()=>{
    sessionStorage.clear();
    localStorage.clear();
  }


  export const playDataReveal=()=>{
    document.getElementById('datareveal').play();
  }
  export const playclicksound=()=>{
    document.getElementById('clicksound').play();
  }
  export const playErrorsound=()=>{
    document.getElementById('errormusic').play();
  }
  export const playSuccesssound=()=>{
    document.getElementById('successmusic').play();
  }