import {
  makePagesFunction
} from 'vite-plugin-cloudflare-functions/worker';

export const onRequestGet = makePagesFunction(() => {
    fetch('https://api.live.bilibili.com/room/v1/Room/get_info?room_id=31914326').then((res) => res.json()).then((data) => {
        const isLive = data.data.live_status === 1;
        return {
            status: 0,
            body: JSON.stringify({
                live: isLive,
                title: data.data.title
            })
        };
    })
});