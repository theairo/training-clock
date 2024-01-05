'use client'
import Link from "next/link";
import React, { useState } from 'react';

export default function Page() {

    const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = React.createRef();

  const PlaySound = () => {
    audioRef.current.play();
  };


    return (
    <div>
        
        <div className="pt-8 font-medium text-3xl flex justify-center">
            Training Clock
        </div>
        <div>
        </div>
        <div className="flex justify-center pt-8">
            <div className="flex flex-col gap-4 w-full px-4">
                <Link href="/cardio">
                    <div className="py-16 flex justify-center md:px-24  rounded-2xl bg-blue-100 font-medium text-2xl cursor-pointer hover:bg-blue-200">
                        Cardio
                    </div>
                </Link>
            </div>
            
        </div>
    </div>
  )
}
