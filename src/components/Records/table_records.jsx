import React from 'react'
import {Table} from 'react-bootstrap';

export const Customers = ({customers}) => {

    const CustomerRow = (customer,index) => {

        return(
              <tr key = {index} className='even'>
                  <td> {index + 1} </td>
                  <td>{customer.fecha}</td>
                  <td>{customer.temperatura}</td>
              </tr>
          )
      }

      const CustomerTable = customers.map((cust,index) => CustomerRow(cust,index))

      const tableHeader = <thead className='bgvi'>
                            <tr>
                                <th>#</th>
                                <th>Fecha</th>
                                <th>Temperatura</th>
                            </tr>
                        </thead>
    
    return (
        <Table className="background_table" striped bordered hover responsive>
            {tableHeader}
            <tbody>
                {CustomerTable}
            </tbody>
        </Table>
    )
}