"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as React from "react"
import { ModeToggle } from "@/components/ui/theme";
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner"
import { useRouter } from "next/navigation";
import logo from '../public/logo.png'
import darkLogo from '../public/logoDark.png'
import Image from "next/image";

export default function Home() {


const [randomRoom, setRandomRoom]=useState("")
const router=useRouter()

const [name,setName]=useState("")
const [room,setRoom]=useState("")

   const handleCreateRoom=()=>{
     let room=""
     for(let i=0; i<4; i++){
       room=room+Math.floor(Math.random()*10);
     }
     console.log("random room code" +room);
     setRandomRoom(room)
     toast("Room has been Created.")
   }

   const handleJoin=()=>{
    
    const data={
      type:"join",
      name:name,
      room:room
    }
    console.log(data);  

    if(name && room){
      toast("Room has been Joined.")
      router.push('/chat')
      
    }
    else{
      toast("Enter Details")
      console.log("enter all details");
    }    
}
   
   

  return (
    <>

    <Toaster/>
    <div className="w-full h-screen flex justify-center items-center ">

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

      <Button className="w-full cursor-pointer text-xl py-6" onClick={handleCreateRoom}>Create New Room</Button>
       <Input type="name" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter your name"/> 

       <div className="flex gap-3">
       <Input type="number" value={room} onChange={(e)=>setRoom(e.target.value)}  placeholder="Enter room name"/> 
       <Button className="cursor-pointer" onClick={handleJoin}>Join room</Button>
       </div>
      

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
     
    </>
  );
}
