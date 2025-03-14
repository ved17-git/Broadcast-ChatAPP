"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as React from "react"
import { ModeToggle } from "@/components/ui/theme";
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner"
import logo from '../public/logo.png'
import darkLogo from '../public/logoDark.png'
import Image from "next/image";
import { joinRoom } from "./actions";
import { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area"



export default function Home() {


const [name,setName]=useState("")
const [room,setRoom]=useState("")

const [randomRoom, setRandomRoom]=useState("")
const [socket,setSocket]=useState<WebSocket>()

const [message,setMessage]=useState("")

const [allMessages, setAllMessages] = useState<{ message: string; sender: string }[]>([]);

const [isJoined, setIsJoined]=useState(false)


const keydownHandler=(e:React.KeyboardEvent<HTMLInputElement>)=>{
 if(e.key=="Enter"){
  sendMessage()
 }
}


const sendMessage=()=>{
 const data={
  type:"chat",
  message:message,
  sender:name,
  room:room
 }

 socket?.send(JSON.stringify(data))
 setMessage("")
}


const handleSubmit=()=>{
  const data={
    type:"join",
    name:name,
    room:room
  }

    if(!data.name || !data.room){
      toast("enter all details")
    }
    else{
      setIsJoined(true)
      socket?.send(JSON.stringify(data))
    }

  }
   

   useEffect(()=>{
     const ws=new WebSocket ("wss://broadcast-chatapp.onrender.com/")
     
     setSocket(ws)
     ws.onmessage=(e)=>{
      const parsedData = JSON.parse(e.data); 
      setAllMessages((m) => [...m, parsedData]);
     }
   },[])



   const handleCreateRoom=()=>{
    let room=""
    for(let i=0; i<4; i++){
      room=room+Math.floor(Math.random()*10);
    }
    setRandomRoom(room)
    toast("Room has been Created.")
  }
 

  return (
    <>

    <Toaster/>
   

{
  isJoined ? (<div className="w-full h-screen flex justify-center items-center ">

    <div className=" w-[90%] lg:w-[40%] px-[2vh] py-[4vh] shadow-2xs rounded-2xl border-[1px]">
    
      <div className="flex gap-2.5 items-center justify-between">
         <div className="flex gap-2.5 items-center">
          <div className="w-[5%]">
            <Image src={logo} alt="logo" className="dark:hidden"/>
            <Image src={darkLogo} alt="logo" className="hidden dark:block"/>
          </div>
          <h1 className="font-semibold text-2xl">Real Time Chat App</h1>
         </div>
       
       <div>
       <ModeToggle/>
       </div>
       </div>
    
    
    <h1 className="text-gray-500"> temporary room that expires after all users exit</h1>
    
    <h1 className="mt-3 bg-[#F5F5F5] dark:bg-[#262626] py-3 pl-4 rounded-md">Room Code: {room}</h1>
    
    <div className="w-full mt-5 "> 
    <ScrollArea className="h-72 w-full rounded-md border">
    <div className="p-4 space-y-5">
       {
          allMessages?.map((item,idx)=>(
              <div key={idx} className="">
                  <h1 className="text-gray-400 text-xs pl-0.5"> {item?.sender}</h1>
                  <p className="text-md text-white bg-black dark:bg-white dark:text-black w-fit my-2 px-2 py-1 rounded-md mt-[-0.01px]">{item?.message} </p>
              </div>
          ))
       }
    </div>
    </ScrollArea>
    
    </div>
    
    
    <div className="flex gap-3 mt-5">
     <Input placeholder="Type a message" name="message" value={message} onChange={(e)=>setMessage(e.target.value)}  onKeyDown={(e)=>{keydownHandler(e)}}/>
     <Button className="cursor-pointer" type="submit" onClick={sendMessage} >Send</Button>
    </div>
    
    </div>     
    </div>):( <div className="w-full h-screen flex justify-center items-center ">

<div className="w-[90%] lg:w-[40%] px-[2vh] py-[4vh] space-y-5 shadow-2xs rounded-2xl border-[1px]">

  <div className="flex gap-2.5 items-center justify-between">
  <div className="flex gap-2.5 items-center">
      <div className="w-[5%]">
        <Image src={logo} alt="logo" className="dark:hidden"/>
        <Image src={darkLogo} alt="logo" className="hidden dark:block"/>
      </div>
      <h1 className="font-semibold text-2xl">Real Time Chat App</h1>
     </div>
  
  <div>
  <ModeToggle/>
  </div>
  </div>


<h1 className="text-gray-500"> temporary room that expires after all users exit</h1>

<form action={joinRoom} className="space-y-4">
<Button className="w-full cursor-pointer text-xl py-6" onClick={handleCreateRoom}>Create New Room</Button>
 <Input type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter your name"/> 

 <div className="flex gap-3">
 <Input type="number" name="room" value={room} onChange={(e)=>setRoom(e.target.value)}  placeholder="Enter room name"/> 
 <Button className="cursor-pointer" onClick={handleSubmit}>Join room</Button>
 </div>
</form>

<div className={randomRoom.length==0 ? "": "w-full bg-[#F5F5F5] dark:bg-[#262626] h-40 grid place-items-center rounded-2xl"}>
  {
    randomRoom.length!=0 && ( <div className={randomRoom.length==0 ? "":"block" }>
      <h1 className="text-[#606776]">Share this code with your friend</h1>
      <h1 className="text-center text-5xl font-bold">{randomRoom} </h1>
      </div>) 
  }
 
  
</div>

</div>     
</div>
)
}



     
    </>
  );
}
