import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './home.css'
import lastestMessages from '../../services/Queries/lastestMessages';
import gql from 'graphql-tag';
import {Subscription} from 'react-apollo';
import { Link } from 'react-router-dom';
// import { OpenWeatherMap } from 'react-weather';
import ReactWeather from 'react-open-weather';
//Optional include of the default css styles
import 'react-open-weather/lib/css/ReactWeather.css';

const NEW_TEMPS_ADDED = gql`
subscription{
  newMessageAdded{
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
      sigfox: this.props.match.params.dev,
      temp_class: "",
      id_class: "",
      batery_marg: "",
      temp2: "Cargando...",
      temp3: "Cargando..."
     }
  }

  componentDidMount = () => {
    //console.log(window.screen.availWidth);
    if(window.screen.availWidth <= 500) {
      this.setState({
        temp_class: "text_temp_home_mobile",
        mobile: true,
        id_class: "display-4",
        batery_marg: "mt-3",
        background: "background_home_phone"
      });
    }else{
      this.setState({
        temp_class: "text_temp_home",
        mobile: false,
        id_class: "display-3",
        batery_marg: "mt-5",
        background: "background_home"
      });
    }
    let dev = {dev: this.state.sigfox}
    lastestMessages(dev).then((result) => {
      //console.log(result);
      let temps = result.data.data.lastestMessages
      if(temps[0] && temps[1] && temps[2]){
        let grados = temps[0].data.substring(1,3)
        let grados2 = temps[0].data.substring(3,4)
        let gradosTemp = temps[1].data.substring(1,3)
        let gradosTemp2 = temps[1].data.substring(3,4)
        let gradosT1 = temps[2].data.substring(1,3)
        let gradosT2 = temps[2].data.substring(3,4)
        this.setState({
          temp1: `${grados}.${grados2}º`,
          date1: temps[0].timestamp,
          temp2: `${gradosTemp}.${gradosTemp2}º`,
          date2: temps[1].timestamp,
          temp3: `${gradosT1}.${gradosT2}º`,
          date3: temps[2].timestamp
        });
      }else{
        if(temps[0] && temps[1]){
          let grados = temps[0].data.substring(1,3)
          let grados2 = temps[0].data.substring(3,4)
          let gradosTemp = temps[1].data.substring(1,3)
          let gradosTemp2 = temps[1].data.substring(3,4)
          this.setState({
            temp1: `${grados}.${grados2}º`,
            date1: temps[0].timestamp,
            temp2: `${gradosTemp}.${gradosTemp2}º`,
            date2: temps[1].timestamp,
            temp3: "Sin Datos",
            date3: "Sin Datos"
          });
        } else { 
          if(temps[0]){
            let grados = temps[0].data.substring(1,3)
            let grados2 = temps[0].data.substring(3,4)
            this.setState({
              temp1: `${grados}.${grados2}º`,
              date1: temps[0].timestamp,
              temp2: "Sin Datos",
              date2: "Sin Datos",
              temp3: "Sin Datos",
              date3: "Sin Datos"
            });
          }
        }
      }
    }).catch((err) => {
      console.log(err, "error");
    });
  }

  renderLastTempDate = () => {
    let fecha = ""
    let hora = ""
    if(this.state.date1){
      fecha = new Date(this.state.date1).toLocaleDateString()
      hora = new Date(this.state.date1).toLocaleTimeString()
    }
    if(this.state.mobile){
      return(
        <div className="col-md-12 col-sm-12">
          <h3>Fecha: {fecha}</h3>
          <h3>Hora: {hora}</h3>
        </div>
      )
    }else{
      return(
        <div className="col-md-12 col-sm-12">
          <h2>Fecha: {fecha}</h2>
          <h2>Hora: {hora}</h2>
        </div>
      )
    }
  }

  renderMobile = () => {
    let fecha1 = ""
    let hora1 = ""
    let fecha2 = ""
    let hora2 = ""
    if(this.state.date2){
      fecha1 = new Date(this.state.date2).toLocaleDateString()
      hora1 = new Date(this.state.date2).toLocaleTimeString()
    }
    if(this.state.date3){
      fecha2 = new Date(this.state.date3).toLocaleDateString()
      hora2 = new Date(this.state.date3).toLocaleTimeString()
    }
    if(this.state.mobile){
      return(
        <div className="col-md-9 col-sm-9 mt-4">
          <div className="row justify-content-center">
            <div className="text-center"><h4>Últimas Temperaturas: </h4></div>
            {/* <div className="col-md-4 col-sm-4"> */}
              <div className="col-md-12 col-sm-12 text-center">
                <div className="card card_color_home">
                  <div className="card-body text-center">
                    <h1 className="text_lasttemp_home">{this.state.temp2}</h1>
                    <h5 className="mt-4">{fecha1} {hora1}</h5>
                  </div>
                </div>
              </div>
            {/* </div> */}
            {/* <div className="col-md-4 col-sm-4 mt-3"> */}
              <div className="col-md-12 col-sm-12 text-center">
                <div className="card mt-3 card_color_home">
                  <div className="card-body text-center">
                    <h1 className="text_lasttemp_home">{this.state.temp3}</h1>
                    <h5 className="mt-4">{fecha2} {hora2}</h5>
                  </div>
                </div>
              </div>
            {/* </div> */}
          </div>
        </div>
      )
    }else{
      return(
        <div className="col-md-9 col-sm-9">
          <div className="row justify-content-center">
            <div className="col-md-2 col-sm-2 text-center"><h4>Últimas Temperaturas: </h4><br/><h5>Hora: </h5></div>
            <div className="col-md-4 col-sm-4">
              <div className="col-md-10 col-sm-10 text-center">
                <div className="card mr-2 card_color_home">
                  <div className="card-body text-center">
                    <h1 className="text_lasttemp_home">{this.state.temp2}</h1>
                  </div>
                </div>
                <h5 className="mt-4">{fecha1} {hora1}</h5>
              </div>
            </div>
            <div className="col-md-4 col-sm-4">
              <div className="col-md-10 col-sm-10 text-center">
                <div className="card ml-2 card_color_home">
                  <div className="card-body text-center">
                    <h1 className="text_lasttemp_home">{this.state.temp3}</h1>
                  </div>
                </div>
                <h5 className="mt-4">{fecha2} {hora2}</h5>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
  render() { 
    return ( 
      <div className={`container-fluid ${this.state.background}`}>
        <div className="row justify-content-center">
          <div className="col-md-4 col-sm-4 margin_topdate_home">
            <div className="col-md-12 col-sm-12">
              <h1 className={this.state.id_class}>ID: {this.state.sigfox}</h1>
            </div>
            {this.renderLastTempDate()}<br />
            <Link className="btn btn-light text-primary btn-block" to={`/records/${this.state.sigfox}`}>Descargar Historial</Link>
          </div>
          <div className="col-md-6 col-sm-6 margin_top_home">
            <div className="card card_color_home">
              <div className="card-body text-center">
                <h1 className={this.state.temp_class}>{this.state.temp1}</h1>
              </div>
            </div>
          </div>
        </div>
        <div className={`row justify-content-center ${this.state.batery_marg}`}>
          <div className="col-md-3 col-sm-3">
            <div className="row justify-content-center">
              <h4 className="mr-2 mt-2">Nivel de Bateria: </h4><span className="ml-2 btn porcent_batery_home">97%</span>
            </div>
          </div>
          {/* {this.renderMobile()} */}
          {/* <OpenWeatherMap
            appid="api.openweathermap.org/data/2.5/forecast?id=524901&APPID=42329e5afc8f646ceef98c4a33d7f184"
            city="Mexico City"
          /> */}
          <ReactWeather
            forecast="today"
            unit="imperial"
            apikey="42329e5afc8f646ceef98c4a33d7f184"
            type="city"
            city="Mexico City"
            lang="es"
          />
        </div>
        <Subscription 
          subscription={NEW_TEMPS_ADDED}
        >
          {
            ({data, loading}) => {
              if(loading) return <React.Fragment></React.Fragment>
              console.log(data);
              const device = data.newMessageAdded.device
              const time = data.newMessageAdded.timestamp
              const temp = data.newMessageAdded.data
              let temp2 = this.state.temp1
              let date2 = this.state.date1
              let temp3 = this.state.temp2
              let date3 = this.state.date2
              if(device === this.state.sigfox && time !== this.state.lastTime){
                let temperature = `${temp.substring(1,3)}.${temp.substring(3,4)}º`
                this.setState({
                  temp1: temperature,
                  date1: time,
                  temp2,
                  date2,
                  temp3,
                  date3,
                  lastTime: time
                });
              }
              return <React.Fragment></React.Fragment>
            }
          }
        </Subscription>
      </div>
     );
  }
}
 
export default Home;