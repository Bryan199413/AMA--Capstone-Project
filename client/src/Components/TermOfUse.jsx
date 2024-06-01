import React from 'react'
import useNotifications from '../zustand/useNotifications'

function TermOfUse() {
  const {termOfUse,setTermOfUse} = useNotifications();
  return (
    <>
      {termOfUse && (
         <dialog  className="modal modal-open">
         <div className="modal-box">
           <h3 className="font-bold text-lg text-center">TERMS OF USE</h3>
             <div className="py-4 space-y-4">
                 <div>
                     <h4 className="font-semibold">I. Introduction</h4>
                     <p>
                     The use of our website is subject to the following terms and conditions of use, as amended from time to time (the “Terms”). The Terms are to be read together by you with any terms, conditions or disclaimers provided in the pages of our website. Please review the Terms carefully. The Terms apply to all users of our website, including without limitation, users who are browsers, customers, merchants, vendors and/or contributors of content. If you access and use this website, you accept and agree to be bound by and comply with the Terms and our Privacy Policy. If you do not agree to the Terms or our Privacy Policy, you are not authorized to access our website, use any of our website’s services or place an order on our website.
                     </p>
                 </div>
                 <div>
                     <h4 className="font-semibold">II. Use of our Website</h4>
                     <p>
                     You agree to use our website for legitimate purposes and not for any illegal or unauthorized purpose, including without limitation, in violation of any intellectual property or privacy law. By agreeing to the Terms, you represent and warrant that you are at least the age of majority in your state or province of residence and are legally capable of entering into a binding contract.
                     </p>
                     <p>
                     You agree to not use our website to conduct any activity that would constitute a civil or criminal offence or violate any law. You agree not to attempt to interfere with our website’s network or security features or to gain unauthorized access to our systems.
                     </p>
                 </div>
                 <div>
                     <h4 className="font-semibold">III. General Conditions</h4>
                     <p>
                     We reserve the right to refuse service to anyone, at any time, for any reason. We reserve the right to make any modifications to the website, including terminating, changing, suspending or discontinuing any aspect of the website at any time, without notice. We may impose additional rules or limits on the use of our website. You agree to review the Terms regularly and your continued access or use of our website will mean that you agree to any changes.
                     </p>
                     <p>
                     You agree that we will not be liable to you or any third party for any modification, suspension or discontinuance of our website or for any service, content, feature or product offered through our website.
                     </p>
                 </div>
             </div>
             <div className="modal-action justify-center">
                 <form method="dialog">
                 <button className="btn" onClick={() => setTermOfUse(false)}>OK</button>
                 </form>
             </div>
          </div>
       </dialog>
      )}
    </>
  )
}

export default TermOfUse
