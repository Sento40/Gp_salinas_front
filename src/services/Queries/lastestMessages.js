import axios from 'axios';
import constante from '../../components/Constante/constante';

export default (data) => {
  // console.log(data);
  return axios({
    url: constante.url+'graphql',
    method: 'post',
    data: {
      query: `
        query{
          lastestMessages(dev: "${data.dev}"){
            device
            timestamp
            data
          }
        }
      `,
    }
  });
};
