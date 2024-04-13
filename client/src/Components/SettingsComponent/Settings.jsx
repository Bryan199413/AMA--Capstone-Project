
function Settings({toggleMenu}) {
  return (
    <>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Settings</h3>
          <div method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={toggleMenu} >✕</button>
          </div>
          <p className="py-4">Press ESC key or click outside to close</p>
        </div>
        <div method="dialog" className="modal-backdrop" onClick={toggleMenu}>   
        </div>
      </dialog>
    </>
  )
}
        
export default Settings

