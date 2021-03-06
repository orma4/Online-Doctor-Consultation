import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getDoctors, setSearchFilter, setDoctorsFilter } from '../../actions/patientActions';

import Doctor from './Doctor';
import filterImg from '../../assets/images/filter.png';
import FilterPop from '../PatientComponents/FilterPop';       
import Navbar from './../GeneralComponents/AppNavbar'

const DoctorsList = ({ doctors, getDoctors, setSearchFilter,filterSearch,filterDoctors,location }) => {
  const {state}=location
  const [filterObj, setSearchFilterObj] = useState(state.filterObj);
  const [filterDoctorsObj, setFilterDoctorsObj] = useState({});
  
  useEffect(() => { 
    if(filterSearch.category){
      setSearchFilterObj(filterSearch)
      getDoctors(filterSearch);
    }
    else{
      getDoctors(filterObj);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterSearch]);



  useEffect(() => { 
      if(filterDoctors.category){
        setFilterDoctorsObj(filterDoctors)
        getDoctors(filterDoctors);
      }
      else{
        getDoctors(filterDoctorsObj);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterDoctors]);

  const [filterOption, setSearchFilterOpen] = useState(false);

  const handleClick = () => setSearchFilterOpen(!filterOption);
  return (
    <div className="DoctorList">
      <Navbar title="Doctors" bg="#e0fdf7" backBtn="/" />     

      <div className="filter">
        <button type="submit" onClick={handleClick}>
          <img src={filterImg} alt="filter button" />
        </button>
      </div>
      <div className="container">
        {filterOption && <FilterPop />}              

        <h4 className="result-title">
          {doctors.length === 0
            ? 'There are No doctors for this search'
            : 'Results showing Doctors'}
        </h4>
        <div>
          {doctors.map(doctor => (
            <Doctor key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>
    </div>
  );
};

DoctorsList.propTypes = {
  doctors: PropTypes.array.isRequired,
  getDoctors: PropTypes.func.isRequired,
  setSearchFilter: PropTypes.func.isRequired,
  filter: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  doctors: state.doctor.doctors,
  filterSearch: state.doctor.filter,
  filterDoctors: state.doctor.filterDoctors,
});

export default connect(mapStateToProps, { getDoctors,setSearchFilter,setDoctorsFilter })(DoctorsList);
