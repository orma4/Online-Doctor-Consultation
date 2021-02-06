import React from 'react';
import { connect } from 'react-redux';
import { Table } from "../DoctorComponent/Table";

const ReportsHistorty = (props) =>{
  console.log(props.appointments)
  function todayConvert() {
		var dateString = new Date();
        let month = dateString.toLocaleString('en-us', { month: 'short' });
        var day = String(dateString.getDate());
		return [month, parseInt(day)+",",dateString.getFullYear()].join(" ");
    }
    
     
    const dateComapre = (date) => { 
        var today = todayConvert();
        console.log(date)

        if (Date.parse(today) >= Date.parse(date) )
            return true;
        else
            return false;
    }
return(
  <div className="DoctorDetail-information container">
    <div className="content">
    <Table 
      rows={props.appointments.filter(appointment=>dateComapre(appointment.date))}
      columns={props.columns}
    />
    </div>
  </div>
);
}
const mapStateToProps = state => ({
  appointments: state.appointment.appointments,
  user: state.auth.user,
  columns: state.table.reportsTable.columns,

  
});

export default connect(mapStateToProps,null)(ReportsHistorty);
