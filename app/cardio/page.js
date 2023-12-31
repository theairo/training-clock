'use client'
import './page.css'

import { faCheck, faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link';
import React, { useEffect, useState } from "react"

export default function Page() {
    const numberOfSets = 4;
    const [cardioState, setCardioState] = useState(0) //0 -> nothing, 1 -> cardio, 2 -> rest
    const [setCount, setSetCount] = useState(1);
    const [seconds, setSeconds] = useState(2);

    useEffect(() => {
        if (seconds <= 0) {
          return;
        }
        const interval = setInterval(() => {
            setSeconds(current => {
              if (current <= 1) {
                clearInterval(interval); // Clear the interval when seconds reach 0
                if (cardioState===1) {
                    if (setCount===numberOfSets) {
                        setCardioState(0)
                        PlaySound();
                        return 0;
                    }
                    PlaySound();
                    setCardioState(2);
                    return 120
                }
                else if (cardioState===2) {
                    PlaySound();
                    setCardioState(1)
                    setSetCount(prev => prev+1)
                    return 60
                }
                return 0; // Set seconds to 0
              } else {
                return current - 1; // Decrement seconds by 1
              }
            });
          }, 1000);
        return () => clearInterval(interval);
      }, [seconds]);

      const audioRef = React.createRef();

    const PlaySound = () => {
        audioRef.current.play();
    };

    return (
      <div className={`h-screen ${cardioState===1 ? 'blob' : cardioState===2 ? 'bg-blue-100' : 'bg-white'}`}>
        <audio ref={audioRef} src="/sound.mp3" />
        <div className='text-center font-medium text-4xl pt-16'>Cardio {cardioState===1 && <FontAwesomeIcon className="text-yellow-400" icon={faFire}/>}
        </div>
        <div className='text-center font-medium text-xl mt-5'>Interval {setCount} {cardioState===0 && setCount===numberOfSets && <FontAwesomeIcon className="text-green-400" icon={faCheck}/>}</div>
        {cardioState===1 && <div className='text-center font-medium text-5xl mt-14'>GRIND</div>}
        {cardioState===2 && <div className='text-center font-medium text-5xl mt-14'>Rest</div>}
        <div className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center">
            {cardioState===0 && setCount===numberOfSets && <div className="rounded-full bg-gray-100 shadow-lg w-64 h-64 flex justify-center items-center">
                <div className='font-medium text-3xl'>Well Done!</div>
            </div>}
            {cardioState===0 && setCount!==numberOfSets && <div onClick={() => {setCardioState(1); setSeconds(60)}}className="transition-all cursor-pointer hover:bg-gray-200 rounded-full bg-gray-100 shadow-lg w-64 h-64 flex justify-center items-center">
                <div className='font-medium text-3xl'>Click to start</div>
            </div>}
            {cardioState>0 && <div className={`mt-10 font-medium text-8xl mb-6`}>{Math.floor(seconds/60)%60<10 ? `0${Math.floor(seconds/60) % 60}` : Math.floor(seconds/60)%60}:{seconds%60<10 ? `0${seconds % 60}` : seconds%60}</div>}
            
        </div>
        <div className="fixed h-48 md:h-64 bottom-0 right-0 left-0 flex justify-center items-center">
        {cardioState===0 && setCount!==numberOfSets && 
        <Link href="/">
        <div className="transition-all cursor-pointer hover:bg-gray-200 rounded-full bg-gray-100 shadow-lg w-24 h-24 flex justify-center items-center">
            
                <div className='font-medium text-xl'>Back</div>
        </div></Link>}
        </div>
      </div>
    )
  }
  