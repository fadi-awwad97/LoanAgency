import React, { Component } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import map from '../assets/map.png'


//Google Map needs Credit Card , I used a photo instead for now ;) but all configurations done 
export class MapContainer extends Component {

  render() {
    return (
        <div>
            <div style={{width:"100%",height:"1px",backgroundColor:"grey", textAlign:"center",fontFamily:"Times New Roman, Times, serif"}}>
             {/* <h3>You can reach us through Google Map </h3> */}

            </div>
      {/* <Map google={this.props.google} style={{height:'500px'}} initialCenter={{
        lat: 33.888630,
        lng: 35.495480
      }}
zoom={14}>
 
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} /> */}
        
        {/* <InfoWindow onClose={this.onInfoWindowClose}> */}
            {/* <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div> */}
        {/* </InfoWindow> */}
      {/* </Map> */}

      <img 
      src={map}
      alt="short"
      height="30%"
      style={{marginTop:'2px',cursor:'pointer'}}
      width="100%"    
      />
          <div style={{width:"100%",height:"50px",backgroundColor:"white",textAlign:'left'}}>           
          <div><TwitterIcon />  <FacebookIcon />   <LinkedInIcon /> </div>
          <p style={{fontFamily: "Lobster , cursive"}}> Copyright © 2021 by Fadi Awwad</p>
          
            </div>

      </div>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyAXKrbppdjtYj1tW8WrqiE59IYUJTQycB0')
})(MapContainer)

