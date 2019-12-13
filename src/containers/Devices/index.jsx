import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Table from './components/Table';

const MaterialTable = () => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">Admin</h3>
      </Col>
    </Row>
    <Row>
      <Table />
    </Row>
  </Container>
);

export default MaterialTable;
