import axios from "axios";
import { NextResponse } from "next/server";

export async function GetUsers(){
  try {
    const response = await axios.get('/api/store/users',{
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    return response.data
  } catch (error:any) {
    throw new Error(error);
  }
}

export async function PostUser(data: any){
  try {
    await axios.post('/api/store/users', data ,{
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });

  } catch (error:any) {
    throw new Error(error);
  }
}