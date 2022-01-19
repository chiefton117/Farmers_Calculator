/**
 * 
 * ImageSlider - Contains multiple sliders of visualizations, a slider to gradually change one in focus
 * and a button group to toggle between them
 * 
 **/

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Card } from 'react-bootstrap';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as d3 from "d3";

// Marks on slider for concrete images
let marks = [];

// Initial opacity state for the fist slider image
let def = [1];


function ImageSlider(props) {


    function setHeight() {
      d3.select("#imgContain")
        .style("height", (imgRef.current ? (imgRef.current.clientHeight+50) : 500))  

      imgStyle = {
        height: (imgRef.current ? (imgRef.current.clientHeight) : 500)
        }  
    }

    useEffect(() => {
        setHeight();
    }, [])

    const imgRef = React.useRef(null);

    //console.log(props.groups[0][1].default);
    var imgStyle = {
        height: (imgRef.current ? (imgRef.current.clientHeight) : 500)
    };

    // What value the opacity slider is at
    const [timeSl, setTimeSl] = useState(0);


    // Which image array is active?
    const [active, setActive] = useState(props.groups);
    //if(typeof props.groups[0] == 'object') setActive(props.groups[0]);

    // Opacity container for images
    const [opacity, setOpacity] = useState(def);

    const [closest, setClosest] = useState(0)

    // Create an updated array for slider marks
    function createMarks(arr) {

        marks = [];

        arr.forEach((d,idx) => {
            
            def.push(0);

            marks.push({
               value: idx/(arr.length-1)
            });

        });

        return marks;
       
    }

    // event - mouesevent
    // idx - slider index
    // arr - what array of images are we modifying
    function handleChange(event,idx) {
        
        

        // Value from slider
        setTimeSl(event.target.value);

        // Number of pictures to divide into
        let divs = (active.length)-1;

        // Scaled number with range
        let scaled = idx*divs;

        // Local copy of opacity array
        let opac = {opacity};

        // Which element should be entirely opaque
        let visible = (Math.round(scaled));

        // These two opacity values will be modified
        let floor = Math.floor(scaled);
        let ceil = Math.ceil(scaled);


        // Iterate to update opacity of each image
        active.forEach((d,idx) => {

            opac[idx] = 0;


            // Set accordingly to opacity layering
            opac[floor] = (ceil-scaled)+0.2;
            opac[ceil] = (scaled-floor);


            });
            if(parseFloat(scaled-floor)%floor === 0 || scaled === 0) opac[visible] = 1;
            setClosest(Math.round(scaled));
            setOpacity(opac);

    }


	return (
	<Container className="position-relative py-5 d-block h-auto">
        <hr/>        
        <Card.Title className="mt-5 mb-5">{props.title}</Card.Title>



        <Row>

        <Col xs={6} lg={4}>
         {active.length > 1 && 

            <Box sx={{ width: "100%" }}>
                <Typography className="text-center text-muted small" gutterBottom>Slide to Implement Practice</Typography>
            
                <Slider
                    getAriaLabel={() => 'Image Slider'}
                    min={0}
                    marks={createMarks(active)}
                    max={1}
                    step={0.01}
                    value={timeSl}
                    style={{position: "relative"}}
                    onChange={(event,idx) => handleChange(event,idx)}
                />
            </Box>
                
               }

        </Col>
        </Row>



{/*        <Col xs={6} lg={8} className="d-flex ml-0 pl-0 align-items-end">*/}
        <Row className="mb-5 position-relative">
        {props.lbls &&
            <>

        {(typeof props.lbls[0] == 'string') && 
            <>

                {/* Map the active image labels */}
                {props.lbls.map((lbl,idy) => (

                <p key={idy}
                className="position-absolute text-muted"
                style={{'opacity': idy === closest ? 1 : 0}}>
                    {lbl}
                </p>

                ))}
  
            </>

        }
        {(typeof props.lbls[0] == 'object') && 
            <>

                {/* Map the active image labels */}
                {props.lbls[props.groups.indexOf(active)].map((lbl,idy) => (

                <Card.Title key={idy}
                className="text-justify position-absolute pl-5 mb-0 pb-0 pt-3"
                style={{'opacity': idy === closest ? 1 : 0}}>
                    {lbl}
                </Card.Title>

                ))}
  
            </>

        }
{/*            <ButtonToolbar aria-label="Slideshow Selection Toolbar">
              <ButtonGroup className="mt-5">

                <ListGroup.Item>Select Images</ListGroup.Item>
                {props.labels.map((d,idx) => (
                        <Button
                            key={d+idx}
                            className="flat-butt"
                            onClick={function(d) {
                                    // Manually set active image set on select
                                    setActive(props.groups[idx]);

                                    // Reset opacity / slider settings
                                    setTimeSl(0);
                                    setOpacity(() => {def[0]=1; return def;});
                                }}
                            >{d}</Button>
                    ))}

              </ButtonGroup>
            </ButtonToolbar>*/}


          

            </>
        }
        </Row>

    {/* style={imgStyle} */}
         {/*style={{'minHeight': '700px'}}*/}
        <Container fluid onLoad={() => setHeight()} className="clearfix position-relative pb75" id="imgContain">
        {/* Fading images accompanying slider */}

{/*          <Box className="position-relative w-100 h-100" style={{'minHeight': '800px'}}>*/}
                {/* Map the active image set to screen */}

                {active.map((d,idx) => (

                        <Image
                        className="absImg"
                        rounded
                        key={d+idx}
                        ref={imgRef}
                        className="d-block position-absolute h-100 w-100 clearfix"
                        style={{'opacity': opacity[idx]}}
                        src={d[1].default} 
                        alt={d[0]} />

                    ))}
{/*
          </Box>*/}
        </Container>
        
	</Container>
		)
}

export default ImageSlider;
