"use server"

export async function joinRoom(formData:FormData){

    const data={
        type:"join",
        name:formData.get("name"),
        room:formData.get("room")
    }
     
    // if(!data.name || !data.room){
    //     console.log("enter all details");
    // }else{
    //     redirect(`/${data.room}`)
    // }
    console.log(data);
}