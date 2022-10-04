import { Component, OnInit } from '@angular/core';
import NavigatorHelper from 'src/app/libs/helpers/navigator.helper';

@Component({
  selector: 'app-uno',
  templateUrl: './uno.component.html',
  styleUrls: ['./uno.component.scss']
})
export class UnoComponent implements OnInit {

  position: any = {};
  time: any = '';

  constructor() { }

  ngOnInit(): void {
    NavigatorHelper.getDevices();
  }

  getLocation(){
   /*NavigatorHelper.getLocation().then( position => {
    console.log("position: ",position);
   }).catch( error => {
    console.log("error: ",error);
    
   })*/

   NavigatorHelper.getLocationCall( position => {
    console.log("position: ",position);
    this.position = {
      lat : position.coords.latitude,
      lon : position.coords.longitude
    }
    this.time = position.timestamp ;
    //this.time = new Date(position.timestamp).toLocaleDateString();
   }, error => {
      console.log(error);
      
   })
  }

  onSubmit(){
    console.log("Position: " ,this.position,"Time: ", this.time);
  
  }

  starRecord(video: HTMLVideoElement, btn:HTMLElement){
    NavigatorHelper.startRecord(video,btn);
    console.log("video" , video);
    
  }

  getDevices(){
    console.log(navigator.mediaDevices);
    NavigatorHelper.getDevices();
    
   }

   startAudio(audio:HTMLAudioElement,btn:HTMLElement){
    NavigatorHelper.startAudio(audio,btn);
    console.log("audio" , audio);
    
   }

}
