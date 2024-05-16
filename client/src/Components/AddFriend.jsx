import useSendFriendRequest from '../hooks/useSendFriendRequest'
import useFriend from '../zustand/useFriend';
import useMatching from '../zustand/useMatching';
import { useAuthContext } from '../context/AuthContext';
import useCancelFriendRequest from '../hooks/useCancelFriendRequest';
import DeclineButton from './DeclineButton';
import useAcceptRequest from '../hooks/useAcceptRequest';
import Unfriend from './Unfriend';

function AddFriend() { 
    const {requested,friendRequests,friends} = useFriend();
    const {loading,sendFriendRequest} = useSendFriendRequest();
    const {loadingCFR,cancelFriendRequest} = useCancelFriendRequest();
    const {loadingAccept,acceptRequest} = useAcceptRequest();
    const {authUser} = useAuthContext();
    const { room } = useMatching();
    const participantsArray = room?.participants.filter(participant => participant !== authUser._id);
    const receiverId = participantsArray ? participantsArray[0] : null;
    const isFriendRequestSent = receiverId && friendRequests.find(request => request.senderId === receiverId);
    const isAlreadyFriend = receiverId && friends.find(friend => friend._id === receiverId);
    const isAlreadyRequested = receiverId && requested.find(request => request.receiverId === receiverId)

  return (
    <>
      {!isFriendRequestSent && !isAlreadyFriend  &&  !isAlreadyRequested && 
      (<button type='button' className='btn btn-sm btn-primary' onClick={loading ? null : sendFriendRequest}>
        Add friend
      </button>)}
      {isAlreadyFriend && (<Unfriend friendId={isAlreadyFriend._id}/>)}
      {isAlreadyRequested  && !isAlreadyFriend &&
       (<button type='button' className='btn btn-sm btn-primary' onClick={() => (loadingCFR ? null : cancelFriendRequest(isAlreadyRequested._id))}>
        Cancel request
      </button>)}
      {isFriendRequestSent &&  (
        <div className='w-ful grid grid-cols-2 gap-1   '>
          <button className='btn btn-sm btn-primary' onClick={() =>(loadingAccept ? null : acceptRequest(isFriendRequestSent.id))}>Accept</button>
          <div className='btn btn-sm'>
            <DeclineButton friendRequestId={isFriendRequestSent.id} /> 
          </div>
        </div>
      )}
    </>
  )
}

export default AddFriend
