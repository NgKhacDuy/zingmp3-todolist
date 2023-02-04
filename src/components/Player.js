import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import * as apis from '../apis'
import icons from '../ultis/icons'
const {AiOutlineHeart,AiFillHeart,BsThreeDots,CiRepeat,BiSkipNext,BiSkipPrevious,CiShuffle,BsFillPlayFill,BsFillPauseFill} = icons
const Player = () => {
    const audioEl = new Audio()
    const { curSongId, isPlaying} = useSelector(state => state.music)
    const [songInfo, setSongInfo] = useState(null)
    // const [isPlaying, setIsPlaying] = useState(false)
    useEffect(() => {
        const fetchDetailSong = async () => {
            const response = await apis.getDetailSong(curSongId)
            if (response.data.err === 0){
                setSongInfo(response.data.data)
            }
        }

        fetchDetailSong()
    },[curSongId])

    useEffect(()=>{
        audioEl.play()
    })
    const handleTogglePlayMusic = () => {
    }
  return (
    <div className='bg-main-400 px-5 h-full flex'>
        <div className='w-[30%] flex-auto flex gap-3 items-center'>
            <img src={songInfo?.thumbnail} alt="thumbnail" className='w-16 h-16 object-cover rounded-md' />
            <div className='flex flex-col'>
                <span className='font-semibold text-gray-700 text-sm'>{songInfo?.title}</span>
                <span className='text-xs text-gray-500 '>{songInfo?.artistsNames}</span>
            </div>

            <div className='flex gap-4 pl-2'>
                <span> 
                    <AiOutlineHeart size={16}/> 
                </span>
                <span>
                    <BsThreeDots size={16}/>
                </span>
            </div>
        </div>
        <div className='w-[40%] flex-auto flex items-center justify-center gap-2 flex-col border border-red-500 py-2'>
            <div className='flex gap-8 justify-center items-center'>
                <span className='cursor-pointer' title='Bật phát ngẫu nhiên'> <CiShuffle size={24}/> </span>
                <span className='cursor-pointer'> <BiSkipPrevious size={24}/> </span>
                <span 
                    className='p-1 border border-gray-700 cursor-pointer hover:text-main-500 rounded-full'
                    onClick={handleTogglePlayMusic}
                >
                    {isPlaying ? <BsFillPauseFill size={30}/> : <BsFillPlayFill size={30}/>}
                </span>
                <span className='cursor-pointer'> <BiSkipNext size={24}/> </span>
                <span className='cursor-pointer' title='Bật phát lại tất cả'> <CiRepeat size={24}/> </span>
            </div>
            <div>
                progessbar
            </div>
        </div>
        <div className='w-[30%] flex-auto border border-red-500'>
            Volume
        </div>
    </div>
  )
}

export default Player