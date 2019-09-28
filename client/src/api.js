import axios from 'axios';

export default function api(method, url, data, headers, callback){
  if (method == 'get'){
    axios.get(url, Object.assign({}, data, headers))
    .then(res => callback(res));
  }else if (method == 'post'){
    axios.post(url, data, headers)
    .then(res => callback(res));
  }
}
