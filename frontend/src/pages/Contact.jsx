import React from 'react'
import { assets } from '../assets/assets'
import { Instagram, Github, Linkedin, FileUser } from 'lucide-react'

const Contact = () => {
  return (
    <div className='bg-gray-100 min-h-screen flex flex-col items-center justify-center px-5 sm:px-10 lg:px-20 py-12'>
      
      {/* Header */}
      <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-10 text-center'>
        Contact Me
      </h1>

      {/* Profile & Info Section */}
      <div className='flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 w-full max-w-5xl'>
        
        {/* Profile Picture */}
        <div className='flex justify-center'>
          <img
            src={assets.profile}
            alt='Profile'
            className='w-40 h-40 sm:w-52 sm:h-52 lg:w-64 lg:h-64 rounded-md object-cover shadow-md border border-gray-200'
          />
        </div>

        {/* Contact Info */}
        <div className='flex flex-col items-center md:items-start text-center md:text-left gap-5 max-w-1/3'>
          <p className='text-gray-600 text-base sm:text-lg leading-relaxed'>
            I’m always open to discussing new opportunities, collaborations, or just saying hi. 
            Feel free to connect with me on any of the platforms below!
          </p>

          {/* Social Media Section */}
          <div className='bg-gray-200 shadow-sm border border-gray-200 p-4 sm:p-5 flex flex-wrap justify-center md:justify-start gap-6 rounded-xl w-full'>
            <a
              href="https://github.com/Asiff07"
              target="_blank"
              rel="noopener noreferrer"
              className='flex flex-col items-center text-gray-700 hover:text-green-500 transition-colors duration-300'
            >
              <Github size={30} />
              <span className='text-sm mt-1'>GitHub</span>
            </a>
            <a
              href="https://www.instagram.com/skasif_ahmed1/"
              target="_blank"
              rel="noopener noreferrer"
              className='flex flex-col items-center text-gray-700 hover:text-pink-600 transition-colors duration-300'
            >
              <Instagram size={30} />
              <span className='text-sm mt-1'>Instagram</span>
            </a>
            <a
              href="https://www.linkedin.com/in/skasifahmed/"
              target="_blank"
              rel="noopener noreferrer"
              className='flex flex-col items-center text-gray-700 hover:text-blue-600 transition-colors duration-300'
            >
              <Linkedin size={30} />
              <span className='text-sm mt-1'>LinkedIn</span>
            </a>
            <a
              href="https://skasifahmed.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className='flex flex-col items-center text-gray-700 hover:text-red-600 transition-colors duration-300'
            >
              <FileUser size={30} />
              <span className='text-sm mt-1'>Portfolio</span>
            </a>
          </div>

          {/* Button */}
          <button className='bg-black text-white px-8 py-3 mt-6 rounded-lg hover:bg-white hover:text-black hover:border hover:border-black transition-all duration-500'>
            Thank You!
          </button>
        </div>
      </div>
    </div>
  )
}

export default Contact
