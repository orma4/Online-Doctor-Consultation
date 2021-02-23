import React, { useState } from 'react';
import AppointmentModal from './AppointmentModal';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'
//import appointment from '../../../reducers/appointmentReducer';

const InsertField = ({ row, accessor, CustomFunction }) => {
 // const [modal,setModal]=useState(false);
  const [showModal,setModal]=useState(false);
 
	const closeChat = () => setModal(false)


switch(accessor){
  case 'name':
    if(row['patient']){
      return row['patient'][accessor]
    }
    return row[accessor]

  case 'email':
    if(row['patient']){
    const icon = CustomFunction({ email: row['patient'][accessor] });
    return <span>{ icon } { row['patient'][accessor] }</span>
    }
    const icon = CustomFunction({ email: row[accessor] });
    return <span>{ icon } { row[accessor] }</span>
    


  case 'phone':
    if(row['patient']){
    return row['patient'][accessor] 
    }
    return row[accessor]

  case 'image':
    
    const clicked = () =>{
      if(row['patient']){
      CustomFunction({ imageURL: row['patient'][accessor] });
      return;
    }
     CustomFunction({ imageURL: row[accessor] });
  }
    return <span style={{height: 200, width: 200, backgroundColor: 'grey'}}>
            <img onClick={ clicked } src={ row['patient']?row['patient'][accessor]:row[accessor] } className="img-fluid" width="200" height="200" alt=''/>
          </span>
    

  case 'action':
    return (
      <AppointmentModal id={"ap"+row['_id']} appointment={row} ></AppointmentModal> 
    )
      
    
  case 'join':   
    var url = row['_id'];
    if (row['status'] ==="approved"){
      return(
        <Link to={{pathname:`/${url}`,state:row}} variant="contained" color="primary" 
        style={{ margin: "20px" }}>
          Open Meeting
          </Link>
        )
    }
    else {
      return (<h3>Appointment is not approved yet!</h3>)
    }
   

    case 'report':
      return(
         <div>
               <Button variant="contained" color="primary" onClick={()=>setModal(true)} 
              style={{ margin: "20px" }}>View Report </Button>
              <Modal show={showModal} onHide={closeChat} style={{ zIndex: "999999" }}>
							<Modal.Header closeButton>
								<Modal.Title>enter Report</Modal.Title>
							</Modal.Header>
							<Modal.Body style={{ overflow: "auto", overflowY: "auto", height: "400px", textAlign: "left" }}>
                <p>{row['report']}</p>
							</Modal.Body>
            </Modal>

         </div>

      )

      case 'viewProfile':   
      return(
        <Link to={{pathname:`/userProfile`,state:row}} variant="contained" color="primary" 
        style={{ margin: "20px" }}>
          View Profile
          </Link>
        )


  default:
    return 0;
}


};

export default InsertField;
