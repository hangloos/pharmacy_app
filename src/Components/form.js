import React, { Component } from 'react';
import logo from '../medical.svg';
import './form.css';
import Button from 'react-bootstrap/lib/Button';
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
        state: '',
        zicode: '',
        zipcodeValid: false,
        formValid: false,
        formErrors: {
          zipcode: ''
        }
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
      let zipcodeValid = this.state.emailValid;

      switch(fieldName) {
        case 'zipcode':
          zipcodeValid = value.match(/(^\d{5}$)|(^\d{5}-\d{4}$)/);
          fieldValidationErrors.zipcode = zipcodeValid ? '' : ' is invalid';
          break;
        default:
          break;
      }
      this.setState({formErrors: fieldValidationErrors,
                      zipcodeValid: zipcodeValid
                    }, this.validateForm);
    }

    validateForm() {
      this.setState({formValid: this.state.zipcodeValid});
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
                  <div className="form-group">
                    <input type="text" className="form-control" id="username" value={this.state.username} onChange={(e) => this.handleUserInput(e)} name="username" placeholder="Username" required />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" id="first_name" name="first_name" placeholder="First Name" required />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" id="last_name" name="last_name" placeholder="Last Name" required />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" id="address" name="address" placeholder="Address" required />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" id="city" name="city" placeholder="City" required />
                  </div>
                  <div className="form-group">
                  < States />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" id="zipcode" value={this.state.zipcode} onChange={(e) => this.handleUserInput(e)} name="zipcode" placeholder="Zipcode" required />
                  </div>
                <button disabled={!this.state.formValid} type="button" id="submit" name="submit" className="btn btn-primary">Submit Form</button>
                </form>
            </div>
        </div>
      </div>
    );
  }
}

export default Form;