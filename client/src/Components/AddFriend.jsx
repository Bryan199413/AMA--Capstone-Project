import useSendFriendRequest from '../hooks/useSendFriendRequest'
import useFriend from '../zustand/useFriend';
import useMatching from '../zustand/useMatching';
import { useAuthContext } from '../context/AuthContext';
import useCheckRequest from '../hooks/useCheckRequest';
import useCancelFriendRequest from '../hooks/useCancelFriendRequest';

function AddFriend() {
    useCheckRequest();
    const {requested} = useFriend();
    const {loading,sendFriendRequest} = useSendFriendRequest();
    const {loadingCFR,cancelFriendRequest} = useCancelFriendRequest();
    const {friendRequests} = useFriend();
    const {authUser} = useAuthContext();
    const { room } = useMatching();
    const participantsArray = room?.participants.filter(participant => participant !== authUser._id);
    const receiverId = participantsArray ? participantsArray[0] : null;
    const isFriendRequestSent = receiverId && friendRequests.some(request => request.senderId === receiverId);
  return (
    <>
      {!isFriendRequestSent && requested === "No requested yet" && (<button type='button' className='btn btn-sm btn-primary' onClick={loading ? null : sendFriendRequest}>Add friend</button>)}
      {requested?.status === "pending"  && (<button type='button' className='btn btn-sm btn-primary' onClick={loadingCFR ? null : cancelFriendRequest}>Cancel request</button>)}
      {isFriendRequestSent && (
        <div className='w-ful grid grid-cols-2 gap-1   '>
          <button className='btn btn-sm btn-primary' >Accept</button>
          <button className='btn btn-sm' >Decline</button>
        </div>
      )}
    </>
  )
}

export default AddFriend
