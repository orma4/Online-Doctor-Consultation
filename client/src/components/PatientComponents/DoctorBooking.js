import React, { Component } from 'react';
import InfiniteCalendar from 'react-infinite-calendar';
import TimePicker from 'rc-time-picker';
import moment from 'moment';

import 'rc-time-picker/assets/index.css';
import 'react-infinite-calendar/styles.css';
import like from '../../assets/images/like.png';
import Navbar from './../GeneralComponents/AppNavbar'
import { object } from 'prop-types';
import { Date } from 'core-js';

class DoctorBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: new Date(),
      selectedDate: new Date(),
      time: null,
    };
  }

  handleDateSelect = date => {
    console.log(moment(date).format('ll'))
    this.setState({ selectedDate: date,time:null });
    
  };

  handleTimeChange = time => {
    this.setState({ time });
  };

  handleSubmit = () => {
    const { time, selectedDate } = this.state;
    const { location, history } = this.props;
    const { doctor } = location.state;
    if (!time || !selectedDate) {
      // eslint-disable-next-line no-alert
      alert('Selecting date and time is manadatory');
    } else {
      history.push({
        pathname: '/confirm-booking',
        state: {
          doctor,
          date: moment(selectedDate).format('ll'),
          time: time.format('HH:mm'),
        },
      });
    }
  };
   generateOptions( excludedOptions=[15]) {
    const arr = [];
    for (let value = 0; value < 60; value=value+15) {
      if (excludedOptions.indexOf(value) < 0) {
        arr.push(value);
      }
    }
    return arr;
  }

  disabledHours=()=>{
    
    const disabledHours=[]
    const {today}=this.state
    console.log(disabledHours)    
    if(this.state.today===this.state.selectedDate){
      for(var i=today.getHours();i===0;i--){
      disabledHours.push(i)
     
    }
    
    }
    return disabledHours;
    

  }


  render() {
    
    
    const { today } = this.state;
    console.log(this.state.today)
    console.log(this.state.today.getTime()===this.state.selectedDate.getTime())
    const { location } = this.props;
    const { doctor } = location.state;
    console.log(this.generateOptions()) 
    var date=moment(this.state.selectedDate).format('ll');
    const disabledHours=()=>{
    
      const disabledHours=[]
      const {today}=this.state
      console.log(today.getHours()) 
      if(this.state.today.getDay()===this.state.selectedDate.getDay()){
        for(var i=today.getHours();i>=0;i--){
        disabledHours.push(i)
        console.log(disabledHours)
       
      }
      
      }
      return disabledHours;
      
  
    }
  



    function disabledMinutes(h) {
      doctor.takenAppointments.forEach(object => {
        if(object.date===date)
       {
         var index=object.time.indexOf(":")
          console.log( (object.time).replaceAt(index,''))
        
      }
        
      });
    
    }
    // disabledHours();
    return (
      
      <div className="DoctorBooking">
        <Navbar
          bg="#266a61"
          title="Confirm Timing"
          backBtn={`/doctors/${doctor.id}`}
        />
        <div className="container">
          <div className="time mt-5">
            <p>Select Time & Date:</p>
            <TimePicker
              showSecond={false}
              defaultValue={moment()
                .hour(0)
                .minute(0)}
              className="time-picker"
              onChange={this.handleTimeChange}
              format="h:mm a"
              minuteStep={15}
              disabledHours={disabledHours}
              // disabledMinutes={disabledMinutes}
              inputReadOnly
              
            />
          </div>
          <InfiniteCalendar
            theme={{
              selectionColor: '#47b7a7',
              textColor: {
                default: '#333',
                active: '#FFF',
              },
              weekdayColor: '#266a61',
              headerColor: '#47b7a7',
              floatingNav: {
                background: '#266a61',
                color: '#FFF',
                chevron: '#FFF',
              },
            }}
            width="100%"
            height={300}
            selected={today}
            minDate={moment().toDate()}
            onSelect={this.handleDateSelect}
          />

          <div className="detail">
            <button type="submit" onClick={this.handleSubmit} className="book-btn">
              Book Appointment
            </button>
            <h5 className="title">{`Dr ${doctor.name}`}</h5>
            <p className="category">{doctor.category}</p>
            <p className="address">{doctor.address}</p>
            <div className="d-flex exp">
              <p>{`$${doctor.fee}`}</p>
              <p>{`${doctor.exp} yrs of experience`}</p>
              <p>
                <img src={like} alt="likes" />
                <span>{doctor.likes}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default DoctorBooking;
