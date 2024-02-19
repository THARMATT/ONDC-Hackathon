import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
function Thanku() {
    return (
        <div>
            <div class="jumbotron text-center">
  <h1 class="display-3">Thank You!</h1>
  <p class="lead"><strong>Thank You For Ordering </strong>And Enjoy You Grocery</p>
  <hr/>

  <p class="lead">


  <LinkContainer to='/'>

                <a class="btn btn-primary btn-sm"  role="button">Continue to homepage</a>

              </LinkContainer>

  </p>
</div>
        </div>
    )
}

export default Thanku
