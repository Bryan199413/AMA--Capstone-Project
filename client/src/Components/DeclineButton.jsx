import useDeclineRequest from "../hooks/useDeclineRequest";

function DeclineButton({friendRequestId}) {
    const {loading,declineRequest} = useDeclineRequest();

  return (
    <div onClick={() => (loading ? null : declineRequest(friendRequestId))}>Decline</div>
  )
}

export default DeclineButton
