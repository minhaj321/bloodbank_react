import MarkersOnMap from 'markers-on-map-react';
import React,{useEffect} from 'react';
// import { useParams } from 'react-router';
// import GoogleMapReact from 'google-map-react';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;


const SimpleMap = (props) => {
  var {long,lati} = props.location.state;
  console.log(lati)
  useEffect(()=>{
        MarkersOnMap.Init({
 
            googleApiKey:'AIzaSyCynBZZ9s3-726-LF3cwyJ-_s_yocevg6I',
            markerObjects: [
              {
                markerLat: lati, // marker latitude as number
                markerLong: long, // marker longitude as number
              },
            ],
          });
       
          MarkersOnMap.Run('div#GoogleMap');
    },[long,lati])
    return ( 
        <div id="GoogleMap"></div>

    //     <div style={{ height: '100vh', width: '100%' }}>
    //     <GoogleMapReact
    //     bootstrapURLKeys={{key:'AIzaSyAk_buZjKqp5kO5a_Hju6Avaopvfr-oBPs'}}
    //       defaultCenter={{
    //         lat: 59.95,
    //         lng: 30.33
    //       }}
    //       defaultZoom={11}
    //     >
    //       <AnyReactComponent
    //         lat={59.955413}
    //         lng={30.337844}
    //         text="My Marker"
    //       />
    //     </GoogleMapReact>
    //   </div>

     );
}
 
export default SimpleMap;

