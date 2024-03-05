import React from 'react'
import Typewriter from 'typewriter-effect';

function Banner() {
  return (
    <div>
     <h1 className="text-[28px] xl:text-[41px] font-bold p-3 font-aclonica text-gray-500">Experience and chat with strangers.</h1>
     <div className='text-2xl px-3 xl:text-3xl font-aclonica text-gray-600'>
        <Typewriter options ={{strings: [
        'Express Yourself Freely!',
        'Break Free from Judgement!',
        'Be Heard, Be Free!',
        'Your Thoughts, Your Space!',
        'No Filters, No Judgement!',
        'Anonymity Empowers Expression!',
        'Connect Anonymously, Share Your Story!',
        'Connect and Share Without Fear!'],autoStart: true,loop: true,}}/>
     </div>
    </div>
  )
}

export default Banner
