export default class NavigatorHelper{

    static getLocation(): Promise <any>{
        /* let option:any = {
           timeOut : 1;
         }*/

         return new Promise((resolve,reject) => {
            navigator.geolocation.getCurrentPosition( pos => {
                resolve(pos)
               //console.log('respuesta: ',pos);
             }, 
             error => {
                reject(error)
              // console.log("error: ",error);
             })
         }) 
         
       }

        static getLocationCall(sucess: (key:any) => void , error: (key:any) => void){
            navigator.geolocation.getCurrentPosition( position => {
                sucess(position)
            }, 
            err =>{
                error(err)
            })

       }

       static startRecord(video: HTMLVideoElement,btn:HTMLElement){
        navigator.mediaDevices.getUserMedia({
            video:{
                width:800,
                height:600,
                deviceId:{
                    exact:'00880665e841f91d59619764d2ed62c286f28c4350861619c1ddad2c8e7aff99' //aca va el devideId del telefono aparecen muchos numeros debe estar conectado
                }
                
            },
            //audio: true

        }).then(media =>{
            //console.log(media);
            video.srcObject = media;
            video.onloadedmetadata = resp => {
                video.play()
                let data : any[] = [];
                const record = new MediaRecorder( media,{
                    mimeType: 'video/webm'
                })
                record.ondataavailable = eve => {
                    console.log("onDataAvailable");
                    
                    data.push(eve.data)
                }
                record.onstop = () => {
                    console.log("Onstop");
                    const blob = new Blob(data,{
                        type: 'video/webm'
                        })

                   /* const reader  = new FileReader()
                    reader.readAsDataURL(blob)
                    reader.onloadend = () => {
                        console.log('Reader.result', reader.result);
                        
                    }*/
                    const url = URL.createObjectURL(blob)
                    const elA = document.createElement('a');
                    document.body.appendChild(elA);
                    elA.href = url
                    elA.download = 'video/webm'
                    elA.click()
                    console.log(URL.createObjectURL(blob))
                    
                }

                setTimeout( ()=>{
                    console.log("toStart");
                    
                    record.start()
                },10)
                btn.addEventListener('click' , () => {
                    console.log("to stop ");
                    record.stop()
             
                })
             
                    
            }
        })
       }

       static getDevices(){
        navigator.mediaDevices.enumerateDevices()
        .then( response => {
            response.forEach( item => {
                if(item.kind === "videoinput"){
                    console.log(item);
                }
                
                
            })
        })
       }

}