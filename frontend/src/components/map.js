import React, { Component } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

export class MapContainer extends Component {

  render() {
    return (
        <div>
            <div style={{width:"100%",height:"100px",backgroundColor:"grey", textAlign:"center",fontFamily: "Lobster , cursive"}}>
             <h3>You Can reach us through Social Media or Google Map </h3>
              <TwitterIcon />  <FacebookIcon />   <LinkedInIcon /> 
              <br></br>
              <p>Copyright © 2021 by Fadi Awwad</p>
            </div>
      <Map google={this.props.google} style={{height:'500px'}} initialCenter={{
        lat: 33.888630,
        lng: 35.495480
      }}
zoom={14}>
 
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
        
        {/* <InfoWindow onClose={this.onInfoWindowClose}> */}
            {/* <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div> */}
        {/* </InfoWindow> */}
      </Map>
      </div>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyAXKrbppdjtYj1tW8WrqiE59IYUJTQycB0')
})(MapContainer)



