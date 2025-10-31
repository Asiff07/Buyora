import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import { Instagram, Github, Linkedin, FileUser } from 'lucide-react'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div className=''>
      {/* Header */}
      <div className='text-2xl text-center pt-8 border-t border-gray-300'>
        <Title text1={'ABOUT'} text2={'THE DEV'} />
      </div>

      {/* About section */}
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px] rounded-sm' src={assets.profile} alt="profile" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>
            I am a passionate and dedicated individual driven by curiosity and a desire to create meaningful impact through technology. 
            My journey began with a simple goal — to continuously learn, build, and grow while turning ideas into real-world solutions. 
            I believe in pushing boundaries, exploring new possibilities, and staying committed to excellence in everything I do.
          </p>
          <p>
            Over the years, I’ve worked hard to strengthen my skills in Full Stack Dev, React.js, Node.js, Express.js, MongoDB, SQL, 
            AWS EC2, CICD USING GitHub Actions, Vercel, and Render, & DevOps - Docker, Kubernetes & CICD Pipelines. I’m also well-versed in 
            Middlewares, Error handling, Sessions, Cookies, & MVC architecture, which helps me build efficient and scalable applications. 
            I believe, Regular LeetCode with a sip of Coffee is the secret to success!
          </p>
          <b className='text-gray-800'>
            My Mission 
            <hr className='text-gray-300 mt-5' />
          </b>
          <p>
            My mission is to land a role at a top tech company, learn from their workflow, and contribute meaningfully to their growth and innovation. 
            Along the way, I aim to keep exploring new technologies, refine my skills, and scale myself both professionally and personally to become 
            a well-rounded engineer capable of creating impactful solutions.
          </p>
        </div>
      </div>

      {/* Connect Section */}
      <div className='text-xl py-4'>
        <Title text1={"LET'S"} text2={'CONNECT'} />
      </div>

      <div>
        <p className='text-gray-600 w-1/3'>
          Feel free to reach out to me on any of the platforms below. I’m always open to discussing new opportunities, collaborations, 
          or simply connecting with like-minded individuals.
        </p>
      </div>

      {/* Social Media Section */}
      <div className='bg-gray-300 flex px-6 py-4 gap-6 mt-6 w-98 rounded-sm'>
        <a
          href="https://github.com/Asiff07"
          target="_blank"
          rel="noopener noreferrer"
          className='text-gray-600 hover:text-white transition-colors duration-300'
        >
          <Github size={28} />
          <p className='mr-3'>Github</p>
        </a>
        <a
          href="https://www.instagram.com/skasif_ahmed1/"
          target="_blank"
          rel="noopener noreferrer"
          className='text-gray-700 hover:text-pink-600 transition-colors duration-300'
        >
          <Instagram size={28} />
          <p className='mr-3'>Instagram</p>
        </a>
        <a
          href="https://www.linkedin.com/in/skasifahmed/"
          target="_blank"
          rel="noopener noreferrer"
          className='text-gray-700 hover:text-blue-600 transition-colors duration-300'
        >
          <Linkedin size={28} />
          <p className='mr-2'>LinkedIn</p>
        </a>
        <a
          href="https://skasifahmed.dev/"
          target="_blank"
          rel="noopener noreferrer"
          className='text-gray-600 hover:text-[#c50000] transition-colors duration-300'
        >
          <FileUser size={28} />
          <p className='mr-3'>PortFolio</p>
        </a>
      </div>

      {/* Signature */}
      <img className='mt-10 w-1/5' src={assets.signature} alt="signature" />
      <div className='my-20'>
        <NewsletterBox />
      </div>
    </div>
  )
}

export default About
