import React from 'react'

import { LinkContainer } from 'react-router-bootstrap'
function Contactus() {
    return (
        <div>
           <div class="container">
  <div class="row justify-content-center pt-5 mt-5 pb-5">
    <div class="col-md-7">
      <h1 class="display-4">Contact us</h1>
      <hr class="bg-success"/>
      <p class="pb-0 mb-0">Just get in contact with us. We are happy to answer your questions.</p>
      <p class="text-danger small pt-0 mt-0">* All fields are required</p>
      <form>
        <div class="row form-group">
            <label for="name" class="col-form-label col-md-4">Name</label>
            <div class="col-md-8">
              <input type="text" name="name" id="name" class="form-control" required/>
            </div>
          </div>
       <div class="row form-group">
          <label for="email" class="col-form-label col-md-4">E-mail</label>
          <div class="col-md-8">
            <input type="email" name="email" id="email" class="form-control" required/>
          </div>
        </div>
        <div class="row form-group">
          <label for="options" class="col-form-label col-md-4">Subject</label>
          <div class="col-md-8">
            <select class="form-select form-control" required>
              <option selected>How can we help you?</option>
              <option value="products">Products</option>

              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div class="row form-group">
          <label for="message" class="col-form-label col-md-4">Message</label>
          <div class="col-md-8">
            <textarea name="message" id="message" class="form-control" rows="3" required></textarea>
          </div>
        </div>
        <div class="row form-group form-check">
          <label class="col-form-label form-check-label col-md-8">
             <input class="form-check-input" type="checkbox" name="remember" required/> I agree to the Terms of Service
          </label>
        </div>
        <LinkContainer to='/'>
        <div class="d-flex justify-content-center pt-3 mt-3">

          <button type="submit" class="btn btn-info btn-block btn-send">Send</button>

        </div>
        </LinkContainer>
      </form>
    </div>
  </div>
</div>
        </div>
    )
}

export default Contactus
