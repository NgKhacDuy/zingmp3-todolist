import icons from "./icons"
const {MdOutlineLibraryMusic, MdOutlineFeed, HiOutlineChartPie, BsDisc} = icons
export const sidebarMenu = [
    {
        path : 'mymusic',
        text : 'Cá nhân',
        icon : <MdOutlineLibraryMusic size={24}/>
    },

    {
        path : '',
        text : 'Khám phá',
        end : true,
        icon : <BsDisc size={24}/>
    },

    {
        path : 'zing-chart',
        text : '#zing-chart',
        icon : <HiOutlineChartPie size={24}/>
    },

    {
        path : 'follow',
        text : 'Theo dõi',
        icon : <MdOutlineFeed size={24}/>
    },
]