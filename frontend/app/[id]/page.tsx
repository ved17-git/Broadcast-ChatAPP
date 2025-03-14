
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ui/theme";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area"
import logo from '../../public/logo.png'
import darkLogo from '../../public/logoDark.png'
 
const tags = Array.from({ length: 5 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)
 


function Chat() {

  
  
  return (
    <>
    <div className="w-full h-screen flex justify-center items-center ">

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
     
     <h1 className="mt-3 bg-[#F5F5F5] dark:bg-[#262626] py-3 pl-4 rounded-md">Room Code: 4782</h1>

     <div className="w-full mt-5"> 
     <ScrollArea className="h-72 w-full rounded-md border">
      <div className="p-4 ">
         {
            tags.map((item)=>(
                <div key={item} className="">
                    <p className="text-md text-white bg-black dark:bg-white dark:text-black w-fit my-2 px-2 py-1 rounded-md ">{item} </p>
                </div>
            ))
         }
      </div>
    </ScrollArea>

    </div>

   
    <div className="flex gap-3 mt-5">
       <Input placeholder="Type a message" name="message"/>
       <Button className="cursor-pointer" type="submit">Send</Button>
    </div>

</div>     
</div>



    </>
  );
}

export default Chat;
