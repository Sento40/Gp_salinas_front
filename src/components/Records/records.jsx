import React, { PureComponent } from 'react';
import { Customers } from './table_records';
import { ExportCSV } from './to_csv';
import './record.css'
import deviceMessages from '../../services/Queries/deviceMessages';
import arraySort from 'array-sort';

class Records extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { 
      sigfox: this.props.match.params.dev,
      filter: "Hoy",
      datenow: new Date().toLocaleDateString('es-MX')
     }
  }

  componentDidMount = () => {
    deviceMessages(this.state.sigfox).then((result) => {
      // console.log(result.data.data.deviceMessages);
      let data = result.data.data.deviceMessages
      let arrayTemps = []
      let now = new Date().toLocaleDateString('es-MX')
      console.log(now, "<-now");
      data.map( temps => {
        let tempsDate = new Date(temps.timestamp).toLocaleDateString('es-MX')

        if(tempsDate === now){
          let grados = temps.data.substring(1,3)
          let grados2 = temps.data.substring(3,4)
          let temp1 = `${grados}.${grados2}º`
  
          arrayTemps.push({dispositivo: temps.device, fecha: temps.timestamp, temperatura: temp1})
        }
        return true
      })

      function compare(prop) {
        return function(a, b) {
          return a[prop].localeCompare(b[prop]);
        };
      }
      const resultOrder = arraySort(arrayTemps, (d1, d2) => new Date(d1.fecha).getTime() - new Date(d2.fecha).getTime(), {reverse: true});
      this.setState({
        registros: data,
        customers: resultOrder
      });
      // this.setState({ customers: arrayTemps });
    }).catch((err) => {
      console.log(err, "err in deviceMessages");
    });
  }

  setFilter = (e, num) => {
    e.preventDefault()
    //--------- Filtro por dia --------------------------------------------------
    if( num === 1) {
      let arrayTemps = []
      let now = new Date().toLocaleDateString('es-MX')
      console.log(now, "<-now");
      this.state.registros.map( temps => {
        let tempsDate = new Date(temps.timestamp).toLocaleDateString('es-MX')

        if(tempsDate === now){
          let grados = temps.data.substring(1,3)
          let grados2 = temps.data.substring(3,4)
          let temp1 = `${grados}.${grados2}º`
  
          arrayTemps.push({dispositivo: temps.device, fecha: temps.timestamp, temperatura: temp1})
        }
        return true
      })

      function compare(prop) {
        return function(a, b) {
          return a[prop].localeCompare(b[prop]);
        };
      }
      const resultOrder = arraySort(arrayTemps, (d1, d2) => new Date(d1.fecha).getTime() - new Date(d2.fecha).getTime(), {reverse: true});
      this.setState({
        filter: "Hoy",
        customers: resultOrder
      });
    }
    //--------- Filtro por semana --------------------------------------------------
    if( num === 2) {
      let arrayTemps = []
      let now = new Date().toLocaleDateString('es-MX')
      console.log(now, "<-now");
      let sevenDays = new Date(Date.now() - (864e5 * 7))
      sevenDays = new Date(sevenDays).toLocaleDateString('es-MX')
      let times = new Date(sevenDays)
      console.log(sevenDays, "seven less");
      this.state.registros.map( temps => {
        let tempsDate = new Date(temps.timestamp).toLocaleDateString('es-MX')
        let times2 = new Date(tempsDate)
        if(times <= times2){
          console.log(sevenDays, tempsDate, "<- sevenDays menor que");
          let grados = temps.data.substring(1,3)
          let grados2 = temps.data.substring(3,4)
          let temp1 = `${grados}.${grados2}º`
  
          arrayTemps.push({dispositivo: temps.device, fecha: temps.timestamp, temperatura: temp1})
        }
        return true
      })

      function compare(prop) {
        return function(a, b) {
          return a[prop].localeCompare(b[prop]);
        };
      }
      const resultOrder = arraySort(arrayTemps, (d1, d2) => new Date(d1.fecha).getTime() - new Date(d2.fecha).getTime(), {reverse: true});
      this.setState({
        filter: "Semana",
        customers: resultOrder
      });
    }
    //--------- Filtro por mes --------------------------------------------------
    if (num === 3) {
      let arrayTemps = []
      let now = new Date().toLocaleDateString('es-MX')
      const subDateSend = now.split('/');
      const monthSend = `${subDateSend[1]}/${subDateSend[2]}`;
      this.state.registros.map( temps => {
        let tempsDate = new Date(temps.timestamp).toLocaleDateString('es-MX')
        const subDateTemp = tempsDate.split('/');
        const monthTemp = `${subDateTemp[1]}/${subDateTemp[2]}`;
        if(monthSend === monthTemp){
          let grados = temps.data.substring(1,3)
          let grados2 = temps.data.substring(3,4)
          let temp1 = `${grados}.${grados2}º`
  
          arrayTemps.push({dispositivo: temps.device, fecha: temps.timestamp, temperatura: temp1})
        }
        return true
      })

      function compare(prop) {
        return function(a, b) {
          return a[prop].localeCompare(b[prop]);
        };
      }
      const resultOrder = arraySort(arrayTemps, (d1, d2) => new Date(d1.fecha).getTime() - new Date(d2.fecha).getTime(), {reverse: true});
      this.setState({
        filter: "Mes",
        customers: resultOrder
      });
    }
    //--------- Filtro por año --------------------------------------------------
    if (num === 4) {
      let arrayTemps = []
      let now = new Date().toLocaleDateString('es-MX')
      const subDateSend = now.split('/');
      const monthSend = `${subDateSend[2]}`;
      this.state.registros.map( temps => {
        let tempsDate = new Date(temps.timestamp).toLocaleDateString('es-MX')
        const subDateTemp = tempsDate.split('/');
        const monthTemp = `${subDateTemp[2]}`;
        if(monthSend === monthTemp){
          let grados = temps.data.substring(1,3)
          let grados2 = temps.data.substring(3,4)
          let temp1 = `${grados}.${grados2}º`
  
          arrayTemps.push({dispositivo: temps.device, fecha: temps.timestamp, temperatura: temp1})
        }
        return true
      })

      function compare(prop) {
        return function(a, b) {
          return a[prop].localeCompare(b[prop]);
        };
      }
      const resultOrder = arraySort(arrayTemps, (d1, d2) => new Date(d1.fecha).getTime() - new Date(d2.fecha).getTime(), {reverse: true});
      this.setState({
        filter: "Año",
        customers: resultOrder
      });
    }
  }

  render() { 

    let renderTable = () => {
      console.log(this.state.customers)
      if(this.state.customers){
        return <Customers customers={this.state.customers} />
      }
    }

    return ( 
      <div className="container-fluid background_record">
        <div className="row justify-content-center">
          <h1 className="mt-5">Dispositivo: {this.state.sigfox}</h1>
        </div>
        <div className="row justify-content-center mt-5">
          <div className="col-md-2">
            <div className="dropdown">
              <button className="btn btn-light text-primary dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {this.state.filter}
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li className="dropdown-item text-primary" onClick={(e) => this.setFilter(e, 1)}>Hoy</li>
                <li className="dropdown-item text-primary" onClick={(e) => this.setFilter(e, 2)}>Semana</li>
                <li className="dropdown-item text-primary" onClick={(e) => this.setFilter(e, 3)}>Mes</li>
                <li className="dropdown-item text-primary" onClick={(e) => this.setFilter(e, 4)}>Año</li>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <ExportCSV csvData={this.state.customers} fileName={`${this.state.sigfox}-${this.state.filter}-${this.state.datenow}`} />
          </div>
        </div>
        <div className="row justify-content-center mt-5">
          <div className="col-md-8 text-center">
            <h4 className="mb-4">Historial filtrado por: <strong>{this.state.filter}</strong></h4>
            {renderTable()}
          </div>
        </div>
      </div>
     );
  }
}

export default Records;