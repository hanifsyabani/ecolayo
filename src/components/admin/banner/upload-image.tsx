'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import { CldUploadButton } from 'next-cloudinary';
import { console } from "inspector";

interface UploadImageProps{
  disabled? : boolean,
  onChange : (value: string) => void
  onRemove: (value: string) => void
  value: string[]
}


export default function UploadImage(props: UploadImageProps){

   const [isMounted, setIsMounted] = useState(false);
  
    useEffect(() => {
      setIsMounted(true);
    }, []);
  

    function onUpload(){
      console.log('upload');
    }
    if (!isMounted) return null;
  return(
    <div className="px-8 mt-10">
      {props.value.map((url, i) => (
        <div key={i} className="w-[200px] h-[200px]">
          
          <Image fill src={url} alt="Image" width={200} height={200}/>
        </div>

      ))}

      <CldUploadButton onSuccess={onUpload} uploadPreset="ecoshop">

      </CldUploadButton>
    </div>
  )
}