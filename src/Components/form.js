import React, { Component } from 'react';
import logo from '../medical.svg';
import './form.css';
import Button from 'react-bootstrap/lib/Button';
import States from './states.js'

class Form extends Component {
  render() {
    return (
      <div className="container">
        <div className="col-md-6 col-md-offset-3">
            <div className="form-area">  
                <form role="form">
                <br className="br-style" />
                            <h3 >Personal Information</h3>
                  <div className="form-group">
                    <input type="text" className="form-control" id="username" name="username" placeholder="Username" required />
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
                            <textarea className="form-control" type="textarea" id="message" placeholder="Message" maxlength="140" rows="7"></textarea>
                                <span className="help-block"><p id="characterLeft" className="help-block ">You have reached the limit</p></span>                    
                            </div>
                    
                <button type="button" id="submit" name="submit" className="btn btn-primary pull-right">Submit Form</button>
                </form>
            </div>
        </div>
      </div>
    );
  }
}

export default Form;