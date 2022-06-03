import React from "react";
import { Carousel } from 'react-responsive-carousel';

class ImageGalleryComponent extends React.Component {
    render() {
        return (
            <div style={{width: "40%"}}>
                <Carousel interval="500" transitionTime="500">
                {this.props.images ? this.props.images.map(image => {
                  return (
                    <div>
                        <img src={image.gatsbyImageData.images.fallback.src} />
                        {/**<p className="legend">My Classic Still 1</p>*/}
                    </div>
                  )
                })
                  :
                  <div>
                  </div>
                }
                </Carousel>
            </div>
        )
    };
}

export default ImageGalleryComponent;
