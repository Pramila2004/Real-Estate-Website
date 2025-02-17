import axios from 'axios'



const instance=axios.create({
    baseURL:'https://real-estate-website-backend.onrender.com',
    headers:{
        'Content-Type':'application/json'
    },
    withCredentials:true,
    timeout: 10000,
})


export const get = (url, params) => instance.get(url, { params });
export const post = (url, data) => instance.post(url, data);
export const put = (url, data) => instance.put(url, data);
export const deleteRequest = (url) => instance.delete(url);


// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });


instance.interceptors.response.use(function (response) {
    console.log('intercpert response : ',response)
    return response;
  }, function (error) {
    console.log('intercpert response : ',error)
    return Promise.reject(error);
  });
