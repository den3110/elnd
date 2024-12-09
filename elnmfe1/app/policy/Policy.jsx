import React from "react"
import { styles } from "../styles/style"

const Policy = props => {
  return (
    <div>
      <div
        className={
          "w-[95%] 800px:w-[92%] m-auto py-2 text-black dark:text-white px-3"
        }
      >
        <h1 className={`${styles.title} !text-start pt-2`}>
          Platform Terms and Condition
        </h1>
        <ul style={{ listStyle: "unset", marginLeft: "15px" }}>
          <p className="py-2 ml-[-15px] text-[18px] font-Poppins leading-8 whitespace-pre-line">
            This e-learning platform provides online courses and educational
            resources. By accessing and using our platform, you agree to comply
            with the following terms and conditions:
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[18px] font-Poppins leading-8 whitespace-pre-line">
            <b>Account Creation:</b> You must use your real information to
            create an account. Accounts registered by <b>bot&apos;s</b> or other
            automated methods are not permitted. You are responsible for
            maintaining the security of your account and password.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[18px] font-Poppins leading-8 whitespace-pre-line">
            <b>Intellectual Property:</b> All course content and materials are
            the intellectual property of the platform and/or course instructors.
            You may not reproduce, distribute or publicly display course
            materials without express written consent.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[18px] font-Poppins leading-8 whitespace-pre-line">
            <b>User Conduct:</b> You agree to use the platform only for lawful
            purposes. Prohibited conduct includes harassment, threatening
            behavior, impersonation, and copyright infringement. We reserve the
            right to terminate accounts violating these rules.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[18px] font-Poppins leading-8 whitespace-pre-line">
            <b>Purchases:</b> All sales are final. We do not provide refunds for
            course purchases, except in cases of platform malfunction preventing
            course participation. Any refund requests must be made within 7 days
            of purchase.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[18px] font-Poppins leading-8 whitespace-pre-line">
            <b>Privacy:</b> We respect your privacy and use data only in
            accordance with our{" "}
            <a href="/privacy-policy">
              <b>Privacy Policy</b>
            </a>
            . We do not sell or rent user data to third parties.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[18px] font-Poppins leading-8 whitespace-pre-line">
            <b>Disclaimer:</b> We strive to provide accurate and up-to-date
            information, but make no warranties regarding course content. We are
            not liable for any errors, omissions, loss of data or damage
            resulting from use of the platform.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[18px] font-Poppins leading-8 whitespace-pre-line">
            <b>Links:</b> We may provide third-party links as supplemental
            resources. However, we do not endorse nor are we responsible for
            third-party content.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[18px] font-Poppins leading-8 whitespace-pre-line">
            <b>Termination:</b> We may suspend or terminate access to the
            platform at any time for violation of these terms, prolonged
            inactivity or other reasons. Course purchases are non-refundable in
            the event of account termination.
          </p>
        </ul>
      </div>
    </div>
  )
}

export default Policy
