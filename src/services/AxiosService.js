import axios from 'axios';

class AxiosService {
  get(url,data,headers){
    return axios({
        method:'get',
        url:url,
        data:data,
        headers:headers,
    })
  }

  post(url,data,headers){
    return axios({
        method:'post',
        url:url,
        data:data,
        headers:headers,
    }) 
 }

  put(url,data,headers){
    return axios({
        method:'put',
        url:url,
        data:data,
        headers: headers 
    }) 
 }

 delete(url,data,headers){
  return axios({
      method:'delete',
      url:url,
      data:data,
      headers: headers,
  }) 
}


}

export default AxiosService;