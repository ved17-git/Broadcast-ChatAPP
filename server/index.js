import { WebSocketServer } from "ws";
import 'dotenv/config'

const port=process.env.PORT
const wss=new WebSocketServer({port:port})

const data = []

wss.on("connection",(socket)=>{
    console.log(`Connected to ws server port:${port}`);
 
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
                    x.socket.send(e.toString())
                }
            })
         }
     
    })

})

         
