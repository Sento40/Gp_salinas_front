import React, { Component } from 'react';
import './home.css'
import lastestMessages from '../../services/Queries/lastestMessages';
import gql from 'graphql-tag';
import {Subscription} from 'react-apollo';

const NEW_TEMPS = gql`
subscription{
  addMessage{
    device
    timestamp
    data
  }
}
`;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      sigfox: "45778A"
     }
  }

  componentDidMount = () => {
    lastestMessages().then((result) => {
      console.log(result);
    }).catch((err) => {
      console.log(err, "error");
    });
  }

  render() { 
    return ( 
      <div className="container-fluid background_home">
        <div className="row justify-content-center">
          <div className="col-md-4 margin_topdate_home">
            <div className="col-md-12">
              <h1 className="display-3">ID: 45778A</h1>
            </div>
            <div className="col-md-12">
              <h2>Fecha: 15/10/2019</h2>
              <h2>Hora: 10:00am</h2>
            </div>
          </div>
          <div className="col-md-6 margin_top_home">
            <div className="card card_color_home">
              <div className="card-body text-center">
                <h1 className="text_temp_home">27.9º</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center mt-5">
          <div className="col-md-3">
            <div className="row justify-content-center">
              <h4 className="mr-2 mt-2">Nivel de Bateria: </h4><span className="ml-2 btn porcent_batery_home">97%</span>
            </div>
          </div>
          <div className="col-md-9">
            <div className="row justify-content-center">
              <div className="col-md-2 text-center"><h4>Últimas Temperaturas: </h4><br/><h5>Hora: </h5></div>
              <div className="col-md-4">
                <div className="col-md-10 text-center">
                  <div className="card mr-2 card_color_home">
                    <div className="card-body text-center">
                      <h1 className="text_lasttemp_home">26.2</h1>
                    </div>
                  </div>
                  <h5 className="mt-4">09:40</h5>
                </div>
              </div>
              <div className="col-md-4">
                <div className="col-md-10 text-center">
                  <div className="card ml-2 card_color_home">
                    <div className="card-body text-center">
                      <h1 className="text_lasttemp_home">29.1</h1>
                    </div>
                  </div>
                  <h5 className="mt-4">09:30</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     );
  }
}
 
export default Home;