import React, { useState, useEffect } from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant, children, hideAfter, dismissible }) => {
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    let interval = null
    if (hideAfter && isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1)
      }, 1000)
    }
    if (seconds === hideAfter) {
      clearInterval(interval)
      setIsActive(false)
    }
    return () => clearInterval(interval)
  }, [isActive, seconds, hideAfter])

  return (
    <Alert 
      onClose={() => setIsActive(false)} 
      variant={variant} 
      transition={true} 
      show={isActive} 
      dismissible={dismissible}
    >
      {children}
    </Alert>  
  )
}

Message.defaultProps = {
  variant: 'danger',
  dismissible: true
}

export default Message
