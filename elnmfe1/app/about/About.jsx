import React from "react";
import { styles } from "../styles/style";

const About = () => {
  return (
    <div className="text-black dark:text-white">
      <br />
      <h1 className={`${styles.title} 800px:!text-[45px]`}>
        What is <span className="text-gradient">Elearning?</span>
      </h1>
      
      <br />
      <div className="w-[95%] 800px:w-[85%] m-auto">
        <p className="text-[18px] font-Poppins">
          Are you ready to enhance your programming skills? Look no further!
          Elearning stands as the premier programming community dedicated
          to helping aspiring coders achieve their goals and unleash their full potential.
          <br />
          <br />
          As the founder and CEO of Elearning, I bring firsthand knowledge of the
          challenges inherent in learning and progressing in the programming field.
          This motivation drove the creation of Elearning, with the aim of providing
          aspiring programmers with essential resources and support for their success.
          <br />
          <br />
          Our YouTube channel serves as a valuable archive of educational videos spanning a
          diverse array of topics, ranging from fundamental programming concepts to advanced
          techniques. However, this is only the beginning. Our affordably priced courses are
          meticulously designed to offer you high-quality education crucial for success in the
          industry, all while remaining budget-friendly.
          <br />
          <br />
          At Elearning, we firmly hold the belief that financial constraints should never
          impede the pursuit of one&apos;s dreams. That&apos;s why we&apos;ve established our course prices at an
          affordable level, ensuring that everyone, regardless of their financial circumstances, can
          access the tools and knowledge essential for success.
          <br />
          <br />
          At Elearning, we transcend the conventional notion of a community – we are a
          family. Our supportive community comprises individuals with shared goals, prepared
          to guide you at every juncture of your journey, regardless of whether you are a novice
          or seeking to advance your skills.
          <br />
          <br />
          Having Elearning by your side means there are no barriers standing in the way
          of realizing your dream job. Our courses and community are ready to provide you with
          the guidance, support, and inspiration needed to unlock your full potential and transform
          into a skilled programmer.
          <br />
          <br />
          Don&apos;t delay any further! Join the Elearning community today and let&apos;s
          conquer the programming industry together! With our budget-friendly courses,
          educational videos, and supportive community, the possibilities are boundless.
        </p>
        <br />
        <span className="text-[22px]">Duc&apos;s</span>
        <h5 className="text-[18px] font-Poppins">
          Founder and CEO of Elearning
        </h5>
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default About;
