import React from 'react'
import { Card, Placeholder } from 'react-bootstrap';

const SkeletonLoading = () => {
  return (
    <div>
      <div>
        <Card style={{border:"none", padding:"none"}}>
          <Card.Body>
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={3} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow">
              <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
            </Placeholder>

            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={2} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow">
              <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
            </Placeholder>

            <Placeholder.Button variant="primary" xs={1} />
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default SkeletonLoading