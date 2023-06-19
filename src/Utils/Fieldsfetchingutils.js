import axios from 'axios';

export const fetchCountries = async () => {

    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log(response);
        return response;
      })
      .catch(error => {    
        console.error(error);
        return [];
      });
  }