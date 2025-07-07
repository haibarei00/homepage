
import { FaXTwitter, FaBilibili, FaYoutube, FaQq } from 'react-icons/fa6';
// @ts-expect-error
import behindImage from "../marshmallow.jpg?w=60&h=60";
const official = [
    {
        "title": "Twitter",
        "image": <FaXTwitter size={'100%'}/>,
        "description": "日常",
        "href": "https://twitter.com/haibarei0"
    },
    {
        "title": "Bilibili",
        "image": <FaBilibili size={'100%'}/>,
        "description": "I stream and upload videos here",
        "href": "https://space.bilibili.com/3546593798129891"
    },
    {
        "title": "マシュマロ",
        "image": behindImage,
        "description": "I'd LOVE to eat!",
        "href": "https://pome.vip/haibarei"
    },
    {
        "title": "YouTube",
        "image": <FaYoutube size={'100%'}/>,
        "description": "",
        "href": "https://www.youtube.com/@haibarei"
    },
    {
        "title": "QQ 群",
        "image": <FaQq size={'100%'}/>,
        "description": "",
        "href": "https://qm.qq.com/cgi-bin/qm/qr?k=1DIwZWnPr_OHPd-Rm4cug0uP2hluMenk&jump_from=webapi&authKey=j0cdh1WHRl3VMN83Nc8UTyjRG/PmT00X+QMvxZc2j3raDzjb02sYhs3OM6WZOwMo"
    }
]

export default official;