import React from "react";
import { JobImg } from "../assets";

const About = () => {
  return (
    <div className='container mx-auto flex flex-col gap-8 2xl:gap-14 py-6 '>
      <div className='w-full flex flex-col-reverse md:flex-row gap-10 items-center p-5'>
        <div className='w-full md:2/3 2xl:w-2/4'>
          <h1 className='text-3xl text-blue-600 font-bold mb-5'>About Us</h1>
          <p className='text-justify leading-7'>
          Welcome to CrewTube, the premier platform designed to connect YouTube content creators with top-tier freelance talent. Whether you're a creator in need of a skilled video editor, a creative scriptwriter, or any other professional to elevate your content, CrewTube is your one-stop destination. Our mission is to empower creators by providing access to a diverse pool of experts who are passionate about helping you bring your vision to life. With a streamlined interface and a robust search system, finding the perfect match for your project has never been easier.
          </p>
        </div>
        <img src={JobImg} alt='About' className='w-auto h-[300px]' />
      </div>

      <div className='leading-8 px-5 text-justify'>
        <p>
        For talented freelancers seeking to collaborate with YouTube creators, CrewTube offers a vibrant marketplace where your skills are in high demand. We understand the unique demands of creating compelling YouTube content and strive to foster a community where creators and freelancers can collaborate seamlessly. Our platform ensures that every talent is vetted and verified, so you can trust that you're working with professionals who meet the highest standards of quality and reliability. Join us at CrewTube and take your career to the next level by connecting with creators who value your expertise.
        </p>
      </div>
    </div>
  );
};

export default About;
