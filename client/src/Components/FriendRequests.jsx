import { BsPersonFillAdd } from "react-icons/bs";
import useGetFriendRequests from "../hooks/useGetFriendRequests";
import useFriend from "../zustand/useFriend";
import DeclineButton from "./DeclineButton";

function FriendRequests() {
  const { loading,} = useGetFriendRequests();
  const {friendRequests} = useFriend();
  
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle z-0">
        <div className="indicator">
          <BsPersonFillAdd size={25} />
          <span className="badge badge-sm indicator-item text-red-500 bg-transparent border-none z-0">{friendRequests.length === 0 ? '' : friendRequests.length}</span>
        </div>
      </div>
      <div tabIndex={0} className="mt-3  card card-compact dropdown-content bg-base-100 shadow-lg w-80 h-80 ">
        <span className="font-bold text-lg py-2 border-b-2 border-base-300 mx-5">Friend requests</span>
        <div className="card-body overflow-auto">
          {friendRequests.length === 0 && <div className="text-center">No pending friend requests.</div>}
          {friendRequests.length > 0 && (
            <div className="card-actions">
              {friendRequests.map(request => (
                <div key={request.id} className="flex justify-between items-center w-full">
                  <div className="flex items-center py-1 mx-1">
                    <div className="avatar">
                      <div className="w-9 rounded-full">
                        <img src={request.avatar} alt="Avatar" />
                      </div>
                    </div>
                    <div className="px-2 overflow-ellipsis w-24 overflow-hidden">{request.username}</div>
                  </div>
                  <div className="flex gap-1">
                    <button className="btn btn-sm px-0 w-16 btn-primary">Accept</button>
                    <div className="btn btn-sm px-0 w-16">
                      <DeclineButton friendRequestId={request.id} />
                      </div> 
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FriendRequests;
