import useSendFriendRequest from '../hooks/useSendFriendRequest'
import useFriend from '../zustand/useFriend';
import useMatching from '../zustand/useMatching';
import { useAuthContext } from '../context/AuthContext';
import useCheckRequest from '../hooks/useCheckRequest';
import useCancelFriendRequest from '../hooks/useCancelFriendRequest';
import DeclineButton from './DeclineButton';
import useAcceptRequest from '../hooks/useAcceptRequest';
import useUnfriend from '../hooks/useUnfriend';

function AddFriend() {
    useCheckRequest();
    const {requested,friendRequests,friends} = useFriend();
    const {loading,sendFriendRequest} = useSendFriendRequest();
    const {loadingCFR,cancelFriendRequest} = useCancelFriendRequest();
    const {loadingAccept,acceptRequest} = useAcceptRequest();
    const {loadingUnfriend,unfriend} = useUnfriend();
    const {authUser} = useAuthContext();
    const { room } = useMatching();
    const participantsArray = room?.participants.filter(participant => participant !== authUser._id);
    const receiverId = participantsArray ? participantsArray[0] : null;
    const isFriendRequestSent = receiverId && friendRequests.find(request => request.senderId === receiverId);
    const isAlreadyFriend = receiverId && friends.find(friend => friend._id === receiverId);
    
  return (
    <>
      {!isFriendRequestSent && !isAlreadyFriend  &&  requested  === "No requested yet" && 
      (<button type='button' className='btn btn-sm btn-primary' onClick={loading ? null : sendFriendRequest}>
        Add friend
      </button>)}
      {isAlreadyFriend && (<button type='button' className='btn btn-sm btn-primary' onClick={()=> (loadingUnfriend ? null : unfriend(isAlreadyFriend._id))}>Unfriend</button>)}
      {requested?.status === "pending"  &&
       (<button type='button' className='btn btn-sm btn-primary' onClick={loadingCFR ? null : cancelFriendRequest}>
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
