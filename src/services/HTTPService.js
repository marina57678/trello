const END_POINT = 'https://radiant-temple-07706.herokuapp.com';

class HTTPService {
  async request({ method = 'GET', path, data, userToken }) {
    const url = `${END_POINT}${path}`;

    const Authorization = userToken ? `Bearer ${userToken}` : '';

    const options = {
      method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization,
      },
    };

    try{
      const response = await fetch(url, options);
      const result = await response.json();

      return result;
    }
    catch(error){
        console.error(error);
    }
  }
}

export default new HTTPService();
