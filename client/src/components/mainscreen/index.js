import React from 'react'
import { Container, Row } from 'react-bootstrap'
import '../mainscreen/mainscreen.css'

const MainScreen = ({title,children}) => {
  return (
    <div className='mainback'>
        <Container>
            <Row>
                <div className="page">
                    {
                        title && (
                            <>
                                <div className="heading">{title}</div>
                                <hr />
                            </>
                        )
                    }    
                    
                </div>
                {children}
            </Row>
        </Container>
    </div>
  )
}

export default MainScreen