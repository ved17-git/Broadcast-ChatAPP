import { WebSocketServer } from "ws";

const wss=new WebSocketServer({port:8080})

const data = []

wss.on("connection",(socket)=>{
    console.log("Connected to ws server");
 
    socket.on("message",(e)=>{
         const userData=JSON.parse(e);
         console.log(userData);
         
         if(userData.type=="join"){
            data.push(
                {
                name:userData.name,
                room:userData.room,
                socket:socket,
                }
            )
         }



         if(userData.type=="chat"){
             
            data.forEach((x)=>{
                if(x.room==userData.room){
                    x.socket.send(userData.message)
                }
            })
           socket.send(userData.message)
         }
     
    })

})

         
