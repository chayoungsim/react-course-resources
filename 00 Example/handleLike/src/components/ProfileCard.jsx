import { useState } from 'react'

const ProfileCard = ({name, role, emoji, initialLikes}) => {

    const [likes, setLikes] = useState(initialLikes);
    const [isFollowing, setIsFollowing] = useState(false);
    const [liked, setLiked] = useState(false)

    function handleLike() {
        if(!liked) {
            setLikes(likes + 1);            
            setLiked(true)
            
        } else {
            setLikes(likes - 1);
            setLiked(false)
        }        
    }
    function handleFollow() {
        setIsFollowing(!isFollowing)
    }

  return (
    <div className="border rounded-xl p-6 flex flex-col items-center gap-3">
      <div className="text-5xl">{emoji}</div>       {/* Props 사용 */}
      <h3 className="font-semibold text-lg">{name}</h3>
      <p className="text-gray-500 text-sm">{role}</p>

      <div className="flex gap-2 w-full mt-2">
        {/* onClick에 이벤트 핸들러 연결 */}
        <button onClick={handleLike}
          className="flex-1 py-2 border rounded-lg text-sm hover:bg-red-50">
           {liked ? '♥' :'♡'}{likes}
        </button>
        <button onClick={handleFollow}
          className={`flex-1 py-2 border rounded-lg text-sm ${
            isFollowing ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-50'
          }`}>
          {isFollowing ? '✓ 팔로잉' : '+ 팔로우'}
        </button>
      </div>
    </div>
  )
}

export default ProfileCard