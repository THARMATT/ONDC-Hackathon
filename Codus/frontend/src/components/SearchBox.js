import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'


const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form  className="form" onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='input'
      ></Form.Control>
      <Button type='submit'>
      <i className="fa fa-search"></i>
      </Button>
    </Form>
  )
}

export default SearchBox
