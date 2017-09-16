import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { GoogleMaps,
         GoogleMap,
         GoogleMapsEvent,
         GoogleMapOptions,
         CameraPosition,
         MarkerOptions,
         Marker } from '@ionic-native/google-maps'; 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


   private _map        : GoogleMap;
   public mapElement   : HTMLElement;


   constructor(public navCtrl    : NavController,
               private _PLAT     : Platform,
               private _MAPS     : GoogleMaps) 
   {
      console.log('Loaded prior to platform being ready');

      this._PLAT.ready()
      .then(()=>
      {
         console.log('Loaded when platform is ready');
         this.mapElement = document.getElementById('map');

         let mapOptions: GoogleMapOptions = {
            'controls'         : {
               'compass'         : true,                  
               'myLocationButton'    : false,
               'indoorPicker'      : true
             },    
             'camera'          : {
               'target'        : { 
                                     lat: 51.5073509,
                                     lng: -0.1277583
                                 },
               'tilt'          : 90,
               'zoom'          : 5,
               'bearing'       : 50
             },    
             'styles'          : [],                    
             'gestures'        : {
               'scroll'        : true,
               'tilt'          : true,
               'rotate'        : true,
               'zoom'          : true
             },
             'preferences': {
                 'zoom': {
                    'minZoom'  : 3,
                    'maxZoom'  : 15,
                 }
             }
         };
        
         this._map = this._MAPS.create(this.mapElement, mapOptions);
         this._map.on(GoogleMapsEvent.MAP_READY)
         .subscribe(() => 
         {
            console.log('Inside Google Maps');
         });
      });
   }


   


}
