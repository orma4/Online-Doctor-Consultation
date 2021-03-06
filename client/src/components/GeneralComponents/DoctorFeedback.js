import React, { useState} from 'react';

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { addDoctorFeedback } from "../../actions/doctorActions"; 
import { connect } from 'react-redux';

const DoctorFeedback = (props) =>{
  // const { errors, register } = useForm();


 const [feedback, setFeedback] = useState({feedback:"",id:props.singleDoctor._id,name:props.user.name});
  const [modal, setModal] = useState(false);

//   var doctor = {...props.user};
//   const {id} = props.user;
//   const {userType} = props.user;
 
  const onChange = (e) => {

    setFeedback({...feedback, [e.target.name]: e.target.value});
    }
      const onSubmit = (data, e) => {
        // setAppointment({ ...appointment })
        console.log(feedback);
         props.addDoctorFeedback(feedback);
        //  props.getSingleDoctor(doctor.id);
         //if(userType==="doctor")
           // props.getDoctorAppointments(id);
        //   if(userType==="patient")
        //     props.getPatientAppointments(id)
         toggle();
         
      
      };
      const toggle = () => {
        //Clear Errors
        // props.clearErrors();
        console.log(modal);
        setModal(!modal);
    };



return(
  

 <div className="DoctorDetail-feedback container">
  { props.user.userType === "patient" &&<button data-toggle="modal" onClick={toggle} className="btn btn-warning text-light"> 
    <span className="fa fa-plus btn btn-warning text-light"/> 
    </button> 
}

    <Modal
                isOpen={modal}
                toggle={toggle}>
                    <ModalHeader 
                    toggle={toggle}>
                    Add Feedback
                    </ModalHeader>
                        <ModalBody>
                        <Form onSubmit={onSubmit}>
                              <FormGroup >
                              <Label for='feedback'>
                                      feedback
                                  </Label>
                                  <Input
                                  type='text'
                                  name='feedback'
                                  id="feedback"
                                  className="mb-3"
                                  onChange={onChange}
                                  placeholder="Enter doctor's Feedback"
                                  />
                                    <div>
                                  <Button
                                  color="primary"
                                  // style = {{marginTop: '2rem'}}
                                  onClick={onSubmit}
                                  // className={classes.button}
                                  // startIcon={<SaveIcon />}
                                  variant="contained"
                                  size="large"
                                  
                                  block
                                  >
                                  Update Details</Button>
                                  </div>

                                  </FormGroup>
                              </Form>
                        </ModalBody>
                        </Modal>
                        {console.log(props.singleDoctor.feedbacks)}
    {
      
      props.singleDoctor.feedbacks.map((feedback)=>{return(
        <div className="Doctor">
        <div className="d-flex">
          <div className="Doctor-img">
            <img src={props.user.image} alt="Avatar" />
          </div>
          <div className="Doctor-info d-flex justify-content-between w-100">
            <div>
            <h6 className="Feedback-title"> {feedback.patientName}</h6>

              <p className="Doctor-feedback"> {feedback.feedback}</p>
            </div>
            
          </div>
        </div>
        
      </div>


    //   <div className="content">
    //   <p className="date">10 days ago</p>
    //   <h6>Verified User - {feedback.patientName}</h6>
    //   <p>
    //    
    //   </p>
    // </div>


      ) 
      }
        
        )
    }
    
  </div>
)} ;
const mapStateToProps = state => ({
  user: state.auth.user,
  singleDoctor:state.doctor.singleDoctor
});

export default connect (mapStateToProps,{addDoctorFeedback})(DoctorFeedback);
