import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './dashboard.css'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { 

    }
  }

  componentDidMount = () => {
    if(window.screen.availWidth <= 500) {
      this.setState({
        mobile: true,
        classSento: "img_sento_phone",
        classWnd: "img_wnd_phone",
        classCard: "card_back_dash_phone"
      });
    }else{
      this.setState({
        mobile: false,
        classSento: "img_sento",
        classWnd: "img_wnd",
        classCard: "card_back_dash"
      });
    }
  }

  render() { 
    return (
      <div className="container-fluid background_home">
        <div className="row justify-content-center">
          <img className={`${this.state.classSento} mt-5`} src="/images/sento.png" alt=""/>
        </div>
        <div className="row justify-content-center text-center mt-5">
          <h3>Sensores de temperatura registrados: </h3>
        </div>
        <div className="row justify-content-center mt-5">
          <div className="col-md-2">
            <Link to="/4575DE">
              <div className={`card ${this.state.classCard} text-center`}>
                <div className="card-body">
                  <img className={this.state.classWnd} src="/images/WND.png" alt=""/>
                  <h5>4575DE</h5>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-md-2">
            <Link to="/45776B">
              <div className={`card ${this.state.classCard} text-center`}>
                <div className="card-body">
                  <img className={this.state.classWnd} src="/images/WND.png" alt=""/>
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