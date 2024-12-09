import React from "react"
import { styles } from "../styles/style"

const PrivacyPolicy = props => {
  return (
    <div>
      <div
        className={
          "w-[95%] 800px:w-[92%] m-auto py-2 text-black dark:text-white px-3"
        }
      >
        <h1 className={`${styles.title} !text-start pt-2`}>
          Platform Privacy Policy
        </h1>
        <ul style={{ listStyle: "unset", marginLeft: "15px" }}>
          <p className="py-2 ml-[-15px] text-[18px] font-Poppins leading-8 whitespace-pre-line">
            This Privacy Policy outlines how we collect, use, disclose, and
            protect your personal information when you use our educational
            e-learning platform. By accessing and using our platform, you
            consent to the terms outlined in this policy.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[18px] font-Poppins leading-8 whitespace-pre-line">
            <b>Information Collection:</b> We may collect personal information,
            including but not limited to, your name, email address, and IP
            address. This information is collected for the purpose of providing
            and improving our e-learning services.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[18px] font-Poppins leading-8 whitespace-pre-line">
            <b>Use of Information:</b> Personal information may be used for
            communication, account management, personalized learning
            experiences, and platform improvement. We do not sell or share your
            information with third parties without your explicit consent.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[18px] font-Poppins leading-8 whitespace-pre-line">
            <b>Data Security:</b> We employ industry-standard security measures
            to protect your personal information from unauthorized access,
            disclosure, alteration, and destruction. However, no method of
            transmission over the internet or electronic storage is entirely
            secure, and we cannot guarantee absolute security.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[18px] font-Poppins leading-8 whitespace-pre-line">
            <b>Your Rights:</b> You have the right to access, correct, or delete
            your personal information. If you have any concerns or requests
            regarding your data, please contact us through the provided
            channels.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[18px] font-Poppins leading-8 whitespace-pre-line">
            <b>Policy Changes:</b> We reserve the right to update and modify
            this Privacy Policy. Any changes will be effective upon posting the
            revised policy on our platform. It is your responsibility to review
            this policy periodically.
          </p>
        </ul>
      </div>
    </div>
  )
}

export default PrivacyPolicy
