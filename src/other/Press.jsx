import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BsBoxArrowUpRight } from "react-icons/bs";
import Resource from "./../other/Resource.jsx"

import sp_thumbnail from './../images/silvopasture/pdf_thumbnail.jpg'
import ig_thumbnail from './../images/irrigation/pdf_thumbnail.jpg'
import tp_thumbnail from './../images/tarping/pdf_thumbnail.jpg'

function Press(props) {


const press = [

	["New research project to help small farms get needed climate adaptation information resources", "https://umaine.edu/news/blog/2018/10/31/new-research-project-to-help-small-farms-get-needed-climate-adaptation-information-resources/"]

];

	return (
		<>



<Container fluid >
<Row>
<Col xs={0} md={2}>
</Col>

<Col xs={12} md={8}>

  <Row>


  <Col xs={12} md={12}>
  	
    <hr/>
    <h2 className='display-4'>Publications</h2>
    <hr/>
  		<hr/>

      {press.map((d,idx) => (

        <span key={"navItem#"+idx}>
        <Row>

          <Col xs={10} className="d-flex text-start">
            {d[0]}
          </Col>
          <Col xs={2}>
            <a className="d-flex align-items-center align-middle" target="_blank" rel="noreferrer" href={d[1]}>
               <BsBoxArrowUpRight />
            </a>

          </Col>


        </Row>
                <hr/>
        </span>
      ))}



  </Col>



  </Row>

  <Row>


      <Resource format={"Farmer Advisor Brief"}
      date={"December 2019"}
      link={"https://womeninag.extension.org/wp-content/uploads/2020/01/Farmer-Advisor-Mental-Models-Brief_1_2020.pdf"}
      description={"What do Northern New England Farmers Need to Adapt to Climate Change?"} />

      <Resource format={"Academic Paper"} download
      date={"19 April 2021"}
      link={"/resources/Clements et al. - 2021 - Climate change in the context of whole-farming sys.pdf"}
      description={"Climate change in the context of whole-farming systems: opportunities for improved outreach"} />




      {/* <Resource format={"Practice Overview"} download
      link={"/resources/Silvopasture Two-Pager.pdf"}
      description={"Brief Silvopasture Overview"} /> */}

      <Resource format={"Silvopasture Practice Brief"} download
        thumbnail
        date={"March 2022"}
        link={"/resources/briefs/Silvopasture 3.2.22 website.pdf"}
        description={sp_thumbnail} />


      {/* <Resource format={"Practice Overview"} download
      link={"/resources/Pond and Irrigation Two-Pager.pdf"}
      description={"Brief Irrigation Overview"} /> */}

      <Resource format={"Irrigation Practice Brief"} download
        thumbnail
        date={"March 2022"}
        link={"/resources/briefs/Irrigation 3.2.22 website.pdf"}
        description={ig_thumbnail} />

      {/* <Resource format={"Practice Overview"} download
      link={"/resources/Tarping_No-till_Cover Cropping Two-pager.pdf"}
      description={"Brief Tarping Overview"} /> */}

      <Resource format={"Tarping Practice Brief"} download
          thumbnail
          date={"March 2022"}
          link={"/resources/briefs/Tarping 3.2.22 website.pdf"}
          description={tp_thumbnail} />


      </Row>






</Col>
<Col xs={0} md={2}>
</Col>
</Row>

</Container>


		</>
		)
}

export default Press;
