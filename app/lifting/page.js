'use client'
import './page.css'

import { faCheck, faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link';
import React, { useEffect, useState } from "react"

export default function Page() {
    const numberOfSets = 3;
    const [liftingState, setLiftingState] = useState(0) //0 -> nothing, 1 -> lifting, 2 -> rest
    const [setCount, setSetCount] = useState(1);
    const [exerciseCount, setExerciseCount] = useState(1)
    const [seconds, setSeconds] = useState(2);

    useEffect(() => {
        if (seconds <= 0 || liftingState===1) {
          return;
        }
        const interval = setInterval(() => {
            setSeconds(current => {
              if (current <= 1) {
                clearInterval(interval); // Clear the interval when seconds reach 0
                if (liftingState===2) {
                    if (exerciseCount===6) {
                        if (setCount===numberOfSets) {
                            setLiftingState(0)
                            PlaySound();
                            return 0;
                        }
                        else {
                            setExerciseCount(1)
                            setSetCount(prev => prev+1)
                            setLiftingState(1)
                            PlaySound();
                            return 0
                        }
                    }
                    else {
                        setExerciseCount(prev => prev+1)
                        setLiftingState(1)
                        PlaySound();
                        return 0
                    }
                }
                return 0; // Set seconds to 0
              } else {
                return current - 1; // Decrement seconds by 1
              }
            });
          }, 1000);
        return () => clearInterval(interval);
      }, [seconds], [liftingState]);

      const audioRef = React.createRef();

    const PlaySound = () => {
        audioRef.current.play();
    };



    return (
      <div className={`h-screen ${liftingState===1 ? 'blob' : liftingState===2 ? 'bg-blue-100' : 'bg-white'}`}>
        <audio ref={audioRef} src="/sound.mp3" />
        <div className='text-center font-medium text-4xl pt-12 md:pt-16'>Workout {liftingState===1 && <FontAwesomeIcon className="text-yellow-400" icon={faFire}/>}
        </div>
        <div className='text-center font-medium text-xl mt-4 md:mt-5'>Set {setCount} {liftingState===0 && setCount===numberOfSets && exerciseCount===6 && <FontAwesomeIcon className="text-green-400" icon={faCheck}/>}</div>
        <div className='text-center font-medium text-lg mt-1 md:mt-2'>Exercise {exerciseCount}</div>
        {liftingState===2 && <div className='text-center font-medium text-5xl mt-8'>Rest</div>}
        <div className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center">
            {liftingState===0 && setCount===numberOfSets && exerciseCount===6  && <div className="rounded-full bg-gray-100 shadow-lg w-64 h-64 flex justify-center items-center">
                <div className='font-medium text-3xl'>Well Done!</div>
            </div>}
            {liftingState===0 && !(setCount===numberOfSets && exerciseCount===6)  && <div onClick={() => {setLiftingState(1); setSeconds(3)}}className="transition-all cursor-pointer hover:bg-gray-200 rounded-full bg-gray-100 shadow-lg w-64 h-64 flex justify-center items-center">
                <div className='font-medium text-3xl'>Click to start</div>
            </div>}
            
            {liftingState===1 && <div onClick={() => {setLiftingState(2); 
                if (exerciseCount===6) setSeconds(120)
                else setSeconds(60)
                }} className="transition-all cursor-pointer hover:bg-blue-200 rounded-full bg-blue-100 shadow-lg w-64 h-64 flex justify-center items-center">
                <div className='font-medium text-5xl'>Rest</div>
            </div>}
            {liftingState===2 && <div className={`mt-10 font-medium text-8xl mb-6`}>{Math.floor(seconds/60)%60<10 ? `0${Math.floor(seconds/60) % 60}` : Math.floor(seconds/60)%60}:{seconds%60<10 ? `0${seconds % 60}` : seconds%60}</div>}
            
        </div>
        <div className="fixed h-48 md:h-64 bottom-0 right-0 left-0 flex justify-center items-center">
        {liftingState===0 && !(setCount===numberOfSets && exerciseCount===6)  && 
        <Link href="/">
        <div className="transition-all cursor-pointer hover:bg-gray-200 rounded-full bg-gray-100 shadow-lg w-24 h-24 flex justify-center items-center">
            
                <div className='font-medium text-xl'>Back</div>
        </div></Link>}
        </div>
        
      </div>
    )
  }
  