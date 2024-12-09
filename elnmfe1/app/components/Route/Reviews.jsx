import { styles } from "@/app/styles/style"
import Image from "next/image"
import React from "react"
import ReviewCard from "../Review/ReviewCard"

export const reviews = [
  {
    name: "Johnson Smith",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
    // profession: "Student | Cambridge University",
    comment:
      "I had the opportunity to explore Elearning, a website offering a diverse array of courses covering a wide range of tech-related subjects. My experience was truly impressive, as the platform provides an extensive variety of courses tailored to various skill levels and interests. If you're seeking to elevate your understanding and abilities in the tech field, I strongly suggest exploring what Elearning has to offer!"
  },
  {
    name: "Emily Johnson",
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
    // profession: "Full stack developer | Quarter ltd.",
    comment:
      "I appreciate your fantastic programming tutorial channel! Your teaching approach is exceptional, and the tutorials' quality is excellent. Your skill in simplifying intricate subjects into manageable segments and addressing a variety of programming languages and topics is genuinely remarkable. The inclusion of practical applications and real-world examples reinforces theoretical knowledge and offers valuable insights. Your interaction with the audience creates a nurturing learning atmosphere. Thank you for your commitment, expertise, and enthusiasm for teaching programming, and continue the outstanding work!"
  },
  {
    name: "Michael Davis",
    avatar: "https://randomuser.me/api/portraits/men/20.jpg",
    // profession: "computer systems engineering student | Zimbabwe",
    comment:
      "Thank you for your incredible programming tutorial channel! Your teaching approach is exceptional, and the tutorials' quality is of the highest standard. Your skill in simplifying intricate subjects into manageable segments and addressing a variety of programming languages and topics is truly noteworthy. The inclusion of practical applications and real-world examples strengthens theoretical knowledge and imparts valuable insights. Your interaction with the audience cultivates a supportive learning atmosphere. Appreciate your dedication, expertise, and enthusiasm for teaching programming, and continue the fantastic work!"
  },
  {
    name: "Jessica Anderson",
    avatar: "https://randomuser.me/api/portraits/women/20.jpg",
    // profession: "Junior Web Developer | Indonesia",
    comment:
      "I had the opportunity to explore Elearning, a website offering a wide array of courses covering various technology-related subjects. I was genuinely impressed with my experience."
  },
  {
    name: "Chloe Turner",
    avatar: "https://randomuser.me/api/portraits/women/30.jpg",
    // profession: "Full stack web developer | Algeria",
    comment:
      "Your content is truly exceptional. What I appreciate the most is the substantial length of the videos, allowing for in-depth coverage of all aspects. This feature ensures that even someone at a beginner level can successfully complete a comprehensive project by following your tutorials. Thank you immensely. I'm eagerly anticipating your upcoming videos. Please continue with this outstanding work!"
  },
  {
    name: "Laura Mckenzie",
    avatar: "https://randomuser.me/api/portraits/women/40.jpg",
    // profession: "Full stack web developer | Canada",
    comment:
      "Enroll in Elearning! The emphasis at Elearning is on practical applications, going beyond mere theoretical instruction in programming languages or frameworks. I recently participated in a tutorial on building a web marketplace using React JS, and it proved invaluable in guiding me through the various stages of project development from inception to completion. In summary, I wholeheartedly endorse Elearning for individuals seeking to enhance their programming expertise and undertake hands-on projects. It serves as an excellent resource to elevate your skills to the next level."
  }
]

const Reviews = props => {
  return (
    <div className="w-[90%] 800px:w-[85%] m-auto">
      <div className="w-full 800px:flex items-center">
        <div className="800px:w-[50%] w-full">
          <Image
            src={require("../../../public/assests/business-img.png")}
            alt="business"
            width={700}
            height={700}
          />
        </div>
        <div className="800px:w-[50%] w-full">
          <h3 className={`${styles.title} 800px:!text-[40px]`}>
            Our Students Are <span className="text-gradient">Our Strength</span>{" "}
            <br /> See What They Say About Us
          </h3>
          <br />
          {/*<p className={styles.label}>*/}
          {/*  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque unde*/}
          {/*  voluptatum dignissimos, nulla perferendis dolorem voluptate nemo*/}
          {/*  possimus magni deleniti natus accusamus officiis quasi nihil*/}
          {/*  commodi, praesentium quidem, quis doloribus?*/}
          {/*</p>*/}
        </div>
        <br />
        <br />
      </div>
      <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*:nth-child(3)]:!mt-[-60px] md:[&>*:nth-child(6)]:!mt-[-20px]">
        {reviews &&
          reviews.map((i, index) => <ReviewCard item={i} key={index} />)}
      </div>
    </div>
  )
}

export default Reviews
