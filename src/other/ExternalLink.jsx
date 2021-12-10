import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { BsBoxArrowUpRight } from "react-icons/bs";

function ExternalLink(props) {


	return (

        <>
        <Row className="px-5 mx-5 d-flex align-content-center justify-content-center">

          <Col xs={props.link ? 11 : 12} className="text-center">
            {props.label}
          </Col>
          <Col xs={1}>
            {props.link &&
            <a className="mx-auto" target="_blank" rel="noreferrer" href={props.link}>
               <BsBoxArrowUpRight />
            </a>
            }

          </Col>
        </Row>
        <hr className="mx-auto w-75" />
        </>





		)
}

export default ExternalLink;
