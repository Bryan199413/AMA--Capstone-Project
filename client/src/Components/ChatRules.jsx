import React from 'react'
import useNotifications from '../zustand/useNotifications'

function ChatRules() {
    const {chatRules,setChatRules} = useNotifications();
  return (
    <>   
       {chatRules && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-[800px]">
            <h1 className="font-bold text-2xl text-center">Community Guidelines</h1>
            <div className="py-4 space-y-4">
              <p>
                Welcome to MachiMachi, a platform where you can:
              </p>
              <ul className="list-disc list-inside">
                <li>Connect with others and form friendships.</li>
                <li>Engage in conversations with people who share your interests.</li>
                <li>Enjoy a safe and respectful environment where everyone is welcome.</li>
              </ul>
              <p className="font-bold">Note:</p>
              <p>
                You must be 18 years of age or older to create an account and use our platform. Accounts of users found to be under 18 will be terminated.
              </p>
              <h4 className="font-bold">What We Don’t Allow</h4>
              <p>
                Engaging in any of the following actions will result in a warning and may lead to account suspension:
              </p>
              <ul className="list-disc list-inside">
                <li>Soliciting money, promoting sales, or selling items.</li>
                <li>Redirecting users to other social platforms without prior meaningful conversations.</li>
                <li>Communicating with minors. Report any underage users immediately.</li>
                <li>Using the service with malicious intent, including exploiting our servers or attempting Denial of Service attacks.</li>
                <li>Creating or using accounts to send unsolicited advertisements or harass individuals.</li>
                <li>Buying or selling Machimachi accounts.</li>
              </ul>
              <p>
                To report any of the above activities, report directly the user in the app.
              </p>
              <h4 className="font-bold">What We Can’t Allow</h4>
              <p>
                Engaging in any of the following will result in immediate account termination and potential blacklisting:
              </p>
              <ul className="list-disc list-inside">
                <li>Sharing or requesting content that promotes, encourages, or glorifies self-harm or suicide.</li>
                <li>Attempts to hack or gain unauthorized access to our service or another person's account.</li>
                <li>Distributing pirated software or malware.</li>
                <li>Sharing content designed to harass, degrade, or threaten someone’s physical, mental, or financial state.</li>
              </ul>
              <p>
                To report any of the above activities, report directly the user in the app.
              </p>
              <h4 className="font-bold">How To Avoid Getting Banned</h4>
              <ul className="list-disc list-inside">
                <li>MachiMachi is not a dating platform. Do not send unsolicited sexual advances.</li>
                <li>Do not ask other users to add you on other platforms without a meaningful reason.</li>
                <li>If you encounter minors, do not interact with them. Report them instead.</li>
                <li>Avoid spamming the same messages repeatedly.</li>
              </ul>
              <p>
                By using our services, you agree to these guidelines and the current report system. Let's work together to maintain a respectful and enjoyable community.
              </p>
            </div>
            <div className="modal-action justify-center">
              <form method="dialog">
                <button type="button" className="btn" onClick={() => setChatRules(false)}>OK</button>
              </form>
            </div>
          </div>
        </dialog>
       )}
    </>
  )
}

export default ChatRules
