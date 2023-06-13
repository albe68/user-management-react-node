import React from 'react';
import { Card } from 'react-bootstrap';
import "./Home.css";

function Home() {
  return (
    <div className='main'>
      <Card className='card'>
        <Card.Body>
          <Card.Title className='card-title'>WELCOME TO DASHBOARD</Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Home;
