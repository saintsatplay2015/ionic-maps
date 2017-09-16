1. Create project:

```bash
ionic start fyre-maps blank
```

2. installed iOS & Android

```bash
ionic cordova platorm add ios
ionic cordova platorm add android
```

3. Installed ONLY the GoogleMaps plugin as follows:

```bash
ionic cordova plugin add https://github.com/mapsplugin/cordova-plugin-googlemaps#multiple_maps --variable API_KEY_FOR_ANDROID="API_KEY_FOR_ANDROID" --variable API_KEY_FOR_IOS="API_KEY_FOR_IOS"
npm install --save @ionic-native/google-maps
```

The GoogleMaps API is enabled in the Google Developer Console and the API keys for each platform have been generated (with the correct API key associated to the platform it was created for)

4. Updated @ionic-native to 4.2.1

I do get the following output in the Terminal however
```
 npm install
fyre-maps@0.0.1 /Volumes//fyre-maps-latest/fyre-maps
├── UNMET PEER DEPENDENCY @ionic-native/core@4.2.1
├── @ionic-native/google-maps@4.2.1 
├── @ionic-native/splash-screen@3.12.1 
└── @ionic-native/status-bar@3.12.1 
```

According to this thread though such warnings shouldn't be an issue: https://forum.ionicframework.com/t/upgrade-to-ionic-native-3-x/84101/5

5. Added the GoogleMaps plugin to the project's root module:

```js
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GoogleMaps } from '@ionic-native/google-maps';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
```

6. Added the basic GoogleMap plugin initialisation and rendering code to the home.ts/home.html files:

home.ts
```js
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
```
The first console.log call displays but not the second one contained within the GoogleMaps plugin code block.

home.html
```html
<ion-header>
  <ion-navbar>
    <ion-title>
      Ionic Blank
    </ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding>
  <h1>Boo!</h1>
   <div id="map"></div>
</ion-content>
```
The heading tag displays its content but the Map does not render/display.

7. Run **ionic cordova build ios --prod** (NO build errors or problems)

8. Launched to iPad Air (iOS 10.3.3) with Xcode and received following output:

```
2017-09-16 01:29:45.902263+0100 MyApp[263:9612] [DYMTLInitPlatform] platform initialization successful
2017-09-16 01:29:45.978800+0100 MyApp[263:9560] DiskCookieStorage changing policy from 2 to 0, cookie file: file:///private/var/mobile/Containers/Data/Application/F4D727DF-E345-4AAA-A12F-AA3C7BFDBC58/Library/Cookies/Cookies.binarycookies
2017-09-16 01:29:46.118957+0100 MyApp[263:9560] Apache Cordova native platform version 4.4.0 is starting.
2017-09-16 01:29:46.120728+0100 MyApp[263:9560] Multi-tasking -> Device: YES, App: YES
2017-09-16 01:29:46.285492+0100 MyApp[263:9560] Using UIWebView
2017-09-16 01:29:46.288649+0100 MyApp[263:9560] [CDVTimer][handleopenurl] 0.209033ms
2017-09-16 01:29:46.296092+0100 MyApp[263:9560] [CDVTimer][intentandnavigationfilter] 7.268965ms
2017-09-16 01:29:46.296513+0100 MyApp[263:9560] [CDVTimer][gesturehandler] 0.209987ms
2017-09-16 01:29:46.300326+0100 MyApp[263:9560] [CDVTimer][cordovagooglemaps] 3.720045ms
2017-09-16 01:29:46.329902+0100 MyApp[263:9560] [CDVTimer][splashscreen] 29.408991ms
2017-09-16 01:29:46.345278+0100 MyApp[263:9560] [CDVTimer][statusbar] 15.083015ms
2017-09-16 01:29:46.348290+0100 MyApp[263:9560] [CDVTimer][keyboard] 2.653003ms
2017-09-16 01:29:46.348511+0100 MyApp[263:9560] [CDVTimer][TotalPluginStartup] 60.100019ms
2017-09-16 01:29:46.374642+0100 MyApp[263:9603] Metal GPU Frame Capture Enabled
2017-09-16 01:29:46.375941+0100 MyApp[263:9603] Metal API Validation Enabled
2017-09-16 01:29:46.451376+0100 MyApp[263:9603] libMobileGestalt MobileGestaltSupport.m:153: pid 263 (MyApp) does not have sandbox access for frZQaeyWLUvLjeuEK43hmg and IS NOT appropriately entitled
2017-09-16 01:29:46.451504+0100 MyApp[263:9603] libMobileGestalt MobileGestalt.c:550: no access to InverseDeviceID (see <rdar://problem/11744455>)
2017-09-16 01:29:46.982053+0100 MyApp[263:9560] Resetting plugins due to page load.
2017-09-16 01:29:47.501576+0100 MyApp[263:9560] Finished load of: file:///var/containers/Bundle/Application/643B485D-5A08-4AD5-AF0B-C6BE29647128/MyApp.app/www/index.html
2017-09-16 01:29:47.929721+0100 MyApp[263:9560] Ionic Native: deviceready event fired after 603 ms
2017-09-16 01:29:47.936174+0100 MyApp[263:9560] Loaded when platform is ready
2017-09-16 01:29:47.942799+0100 MyApp[263:9560] ERROR: Plugin 'map_0_491246558907' not found, or is not a CDVPlugin. Check your plugin mapping in config.xml.
2017-09-16 01:29:47.942961+0100 MyApp[263:9560] -[CDVCommandQueue executePending] [Line 142] FAILED pluginJSON = ["map_0_491246558907415155928","map_0_491246558907","resizeMap",[]]
```

My system environment is as follows:

```
cli packages: (/usr/local/lib/node_modules)

    @ionic/cli-utils  : 1.10.2
    ionic (Ionic CLI) : 3.10.3

global packages:

    Cordova CLI : 7.0.1 

local packages:

    @ionic/app-scripts : 2.1.4
    Cordova Platforms  : android 6.2.3 ios 4.4.0
    Ionic Framework    : ionic-angular 3.6.1

System:

    Android SDK Tools : 25.2.5
    ios-deploy        : 1.9.0 
    ios-sim           : 5.0.8 
    Node              : v7.4.0
    npm               : 4.0.5 
    OS                : macOS Sierra
    Xcode             : Xcode 8.3.3 Build version 8E3004b 
```
