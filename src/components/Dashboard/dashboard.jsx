import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './dashboard.css'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { 

    }
  }
  render() { 
    return (
      <div className="container-fluid background_home">
        <div className="row justify-content-center">
          <img className="img_sento mt-5" src="/images/sento.png" alt=""/>
        </div>
        <div className="row justify-content-center mt-5">
          <h3>Sensores de temperatura registrados: </h3>
        </div>
        <div className="row justify-content-center mt-5">
          <div className="col-md-2">
            <Link to="/4575DE">
              <div className="card card_back_dash text-center">
                <div className="card-body">
                  <img className="img_wnd" src="/images/WND.png" alt=""/>
                  <h5>4575DE</h5>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-md-2">
            <Link to="/45776B">
              <div className="card card_back_dash text-center">
                <div className="card-body">
                  <img className="img_wnd" src="/images/WND.png" alt=""/>
                  <h5>45776B</h5>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
 
export default Dashboard;