import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as apis from "../apis";
import icons from "../ultis/icons";
import * as actions from "../store/actions";
import moment from "moment";
const {
  AiOutlineHeart,
  AiFillHeart,
  BsThreeDots,
  CiRepeat,
  BiSkipNext,
  BiSkipPrevious,
  CiShuffle,
  BsFillPlayFill,
  BsFillPauseFill,
} = icons;
var intervalId;
const Player = () => {
  const [audio, setAudio] = useState(new Audio());
  const { curSongId, isPlaying } = useSelector((state) => state.music);
  const [songInfo, setSongInfo] = useState(null);
  const [curSeconds, setCurSeconds] = useState(0);
  const dispatch = useDispatch();
  const thumbRef = useRef();
  // const [isPlaying, setIsPlaying] = useState(false)
  useEffect(() => {
    const fetchDetailSong = async () => {
      const [res1, res2] = await Promise.all([
        apis.apiGetDetailSong(curSongId),
        apis.apiGetSong(curSongId),
      ]);
      if (res1.data.err === 0) {
        setSongInfo(res1.data.data);
      }
      if (res2.data.err === 0) {
        audio.pause();
        setAudio(new Audio(res2.data.data["128"]));
      }
    };

    fetchDetailSong();
  }, [curSongId]);

  useEffect(() => {
    if (isPlaying) {
      intervalId = setInterval(() => {
        let precent =
          Math.round((audio.currentTime * 10000) / songInfo.duration) / 100;
        thumbRef.current.style.cssText = `right: ${100 - precent}%`;
        setCurSeconds(Math.round(audio.currentTime));
      }, 200);
    } else {
      intervalId && clearInterval(intervalId);
    }
  }, [isPlaying]);

  useEffect(() => {
    audio.load();
    if (isPlaying) audio.play();
  }, [audio]);

  const handleTogglePlayMusic = () => {
    if (isPlaying) {
      audio.pause();
      dispatch(actions.play(false));
    } else {
      audio.play();
      dispatch(actions.play(true));
    }
  };
  return (
    <div className="bg-main-400 px-5 h-full flex">
      <div className="w-[30%] flex-auto flex gap-3 items-center">
        <img
          src={songInfo?.thumbnail}
          alt="thumbnail"
          className="w-16 h-16 object-cover rounded-md"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-gray-700 text-sm">
            {songInfo?.title}
          </span>
          <span className="text-xs text-gray-500 ">
            {songInfo?.artistsNames}
          </span>
        </div>

        <div className="flex gap-4 pl-2">
          <span>
            <AiOutlineHeart size={16} />
          </span>
          <span>
            <BsThreeDots size={16} />
          </span>
        </div>
      </div>
      <div className="w-[40%] flex-auto flex items-center justify-center gap-2 flex-col border border-red-500 py-2">
        <div className="flex gap-8 justify-center items-center">
          <span className="cursor-pointer" title="B???t ph??t ng???u nhi??n">
            {" "}
            <CiShuffle size={24} />{" "}
          </span>
          <span className="cursor-pointer">
            {" "}
            <BiSkipPrevious size={24} />{" "}
          </span>
          <span
            className="p-1 border border-gray-700 cursor-pointer hover:text-main-500 rounded-full"
            onClick={handleTogglePlayMusic}
          >
            {isPlaying ? (
              <BsFillPauseFill size={30} />
            ) : (
              <BsFillPlayFill size={30} />
            )}
          </span>
          <span className="cursor-pointer">
            {" "}
            <BiSkipNext size={24} />{" "}
          </span>
          <span className="cursor-pointer" title="B???t ph??t l???i t???t c???">
            {" "}
            <CiRepeat size={24} />{" "}
          </span>
        </div>
        <div className="w-full flex items-center justify-center gap-3 text-xs">
          <span>{moment.utc(curSeconds * 1000).format("mm:ss")}</span>
          <div className="w-3/5 h-[3px] rounded-l-full rounded-r-full relative bg-[rgba(0,0,0,0.1)]">
            <div
              ref={thumbRef}
              className="absolute rounded-l-full rounded-r-full top-0 left-0 h-[3px] bg-[#0e8080]"
            ></div>
          </div>
          <span>{moment.utc(songInfo?.duration * 1000).format("mm:ss")}</span>
        </div>
      </div>
      <div className="w-[30%] flex-auto border border-red-500">Volume</div>
    </div>
  );
};

export default Player;
