import React, { Component } from 'react';
import './form.css';
import States from './states.js'
import { FormErrors} from './FormErrors.js'

class Form extends Component {

    constructor (props) {
      super(props);
      this.state = {
        username: '',
        first_name: '',
        last_name: '',
        address: '',
        city: '',
        stateUS: '',
        zicode: '',
        pharmacy: '',
        zipcodeValid: false,
        first_nameValid: false,
        last_nameValid: false,
        addressValid: false,
        requiredValid: false,
        cityValid: false,
        formValid: false,
        pharmacies: [],
        location: '',
        formErrors: {
          zipcode: '',
          state: '',
          first_name: '',
          last_name: '',
          address: '',
          city: '',
          state: ''
        }
      }
    }


    componentWillUpdate(nextProps, nextState)  {
      if (this.state.location === '' && this.state.pharmacies.length === 0) {
        fetch('https://api.foursquare.com/v2/venues/explore?ll='+nextProps.latitude+','+nextProps.longitude+'&query=Pharmacy&radiuis=16093.4&client_id=AMGMZBNJ5WXLS5AU1NAR5RYREWS2UCZVBMWK2MFT2Q5NQJAK&client_secret=Y03WFJZ4OCZISXDIWZ5AUTHHTR3QQMOEZRKHCDR10ZF53A3S&v=20170213')
                    .then(response => response.json())
                    .then(json => {
                      this.setState({location: json.response.headerFullLocation,
                        pharmacies: json.response.groups[0].items})
                    })
                    .catch(error => console.log(error))
      }

    }


    handleUserInput(e) {
      const name = e.target.name
      const value = e.target.value
      this.setState({[name]: value},
                  () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
      let fieldValidationErrors = this.state.formErrors;
      let zipcodeValid = this.state.zipcodeValid;
      let cityValid = this.state.cityValid;
      let first_nameValid = this.state.first_nameValid;
      let last_nameValid = this.state.last_nameValid;
      let addressValid = this.state.addressValid;
  

      switch(fieldName) {
        case 'zipcode':
          zipcodeValid = value.match(/(^\d{5}$)|(^\d{5}-\d{4}$)/);
          fieldValidationErrors.zipcode = zipcodeValid ? '' : ' is invalid';
          break;
        case 'city':
          cityValid = value.match(/^[A-Za-z]+$/);
          fieldValidationErrors.city = cityValid ? '' : ' is invalid';
          break;
        case 'first_name':
          first_nameValid = value.match(/^[A-Za-z]+$/);
          fieldValidationErrors.first_name = first_nameValid ? '' : ' is invalid';
          break;
        case 'last_name':
          last_nameValid = value.match(/^[A-Za-z]+$/);
          fieldValidationErrors.last_name = last_nameValid ? '' : ' is invalid';
          break;
        case 'address':
          addressValid = value.length > 0;
          fieldValidationErrors.address = addressValid ? '' : ' is required';
          break;
        default:
          break;
      }
      this.setState({formErrors: fieldValidationErrors,
                      zipcodeValid: zipcodeValid,
                      cityValid: cityValid,
                      first_nameValid: first_nameValid,
                      last_nameValid: last_nameValid,
                      addressValid: addressValid
                    }, this.validateForm);
    }

    validateForm() {
      this.setState({formValid: this.state.zipcodeValid && this.state.cityValid
        && this.state.first_nameValid && this.state.last_nameValid && this.state.addressValid});
    }

    submitForm() {
      const data = {
        "username": this.state.username,
        "first_name": this.state.first_name,
        "last_name": this.state.last_name,
        "address": this.state.address,
        "city": this.state.city,
        "stateUS": this.state.stateUS,
        "zipcode": this.state.zipcode,
        "pharmacy": this.state.pharmacy
      }

      fetch('https://localhost:3004/patients', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: JSON.stringify(data)
      })

      this.setState({
        username: '',
        first_name: '',
        last_name: '',
        address: '',
        city: '',
        stateUS: '',
        zicode: '',
        pharmacy: ''
      })
    }



  render() {
    return (
      <div className="container">
        <div className="col-md-6 col-md-offset-3">
          <div className="panel panel-default">
            <FormErrors formErrors={this.state.formErrors} />
          </div>
            <div className="form-area">  
                <form role="form">
                <br className="br-style" />
                            <h3 >Personal Information</h3>
                            {this.state.location}
                            
                  <div className="form-group">
                    <input type="text" className="form-control" id="username" value={this.state.username} onChange={(e) => this.handleUserInput(e)} name="username" placeholder="Username"  />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" id="first_name" value={this.state.first_name} onChange={(e) => this.handleUserInput(e)} name="first_name" placeholder="First Name"  />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" id="last_name" value={this.state.last_name} onChange={(e) => this.handleUserInput(e)} name="last_name" placeholder="Last Name"  />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" id="address" value={this.state.address} onChange={(e) => this.handleUserInput(e)} name="address" placeholder="Address"  />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" id="city" value={this.state.city} onChange={(e) => this.handleUserInput(e)} name="city" placeholder="City"  />
                  </div>
                  <div className="form-group">
                  < States handleUserInput={this.handleUserInput.bind(this)} />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" id="zipcode" value={this.state.zipcode} onChange={(e) => this.handleUserInput(e)} name="zipcode" placeholder="Zipcode"  />
                  </div>
                  <div className="form-group">
                    <select name="pharmacy" id="pharmacy" onChange={(e) => this.handleUserInput(e)} >
                      {this.state.pharmacies.map(pharmacy =>
                        <option key={pharmacy.venue.id} value={pharmacy.venue.name}>{pharmacy.venue.name} - {pharmacy.venue.location.address} - {((pharmacy.venue.location.distance) * 0.000621371).toFixed(2)}Miles</option>
                        )};
                    </select>
                  </div>
                <button disabled={!this.state.formValid} onClick={(e) => {this.submitForm()}} type="button" id="submit" name="submit" className="btn btn-primary">Submit Form</button>
                </form>
            </div>
        </div>
      </div>
    );
  }
}

export default Form;