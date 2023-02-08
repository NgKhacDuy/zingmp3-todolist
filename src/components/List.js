import moment from "moment";
import React, { memo } from "react";
import icons from "../ultis/icons";
import { useDispatch } from "react-redux";
import * as action from "../store/actions";
const { BsMusicNoteBeamed } = icons;
const List = ({ songData }) => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        dispatch(action.setCurSongId(songData?.encodeId));
        dispatch(action.play(true));
      }}
      className="flex justify-between items-center p-[10px] border-t border-[rgba(0,0,0,0.05)] hover:bg-[#DDE4E4] cursor-pointer"
    >
      <div className="flex items-center gap-3 flex-1">
        <span>
          {" "}
          <BsMusicNoteBeamed />{" "}
        </span>
        <img
          src={songData?.thumbnail}
          alt="thumbnail"
          className="w-10 h-10 object-cover rounded-md"
        />
        <span className="flex flex-col w-full">
          <span className="text-sm font-semibold">
            {songData?.title?.length > 30
              ? `${songData?.title?.slice(0, 30)}...`
              : songData?.title}
          </span>
        </span>
      </div>
      <div className="flex-1 flex items-center justify-center">
        {songData?.album?.title?.length > 30
          ? `${songData?.album?.title?.slice(0, 30)}...`
          : songData?.album?.title}
      </div>
      <div className="flex-1 flex justify-end">
        {moment.utc(songData?.duration * 1000).format("mm:ss")}
      </div>
    </div>
  );
};

export default memo(List);
