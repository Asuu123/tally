import axios from 'axios';
import cookie from 'js-cookie'

const axiosInstance = axios.create({
  baseURL: `${process.env.API}`,
  timeout:9000
});



export const emailContactForm = async(data)=>{
    let emailEndpoint;
    if (data.authorEmail) {
      emailEndpoint = `api/product`;
    } else {
      emailEndpoint = `api/product`;
    }
     return  await axiosInstance
    .post(emailEndpoint, data,)
    .then((response) => response.data)
    .catch(error=> error.response.data);
   
}