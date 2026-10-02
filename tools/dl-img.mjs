import fs from 'node:fs';
const UA={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36','Referer':'https://vocaloid.fandom.com/'};
const jobs=[
 ['hero_miku.png','https://static.wikia.nocookie.net/vocaloid/images/e/e4/MIKU_SP.png/revision/latest/scale-to-width-down/1400?cb=20241025033142'],
 ['miku_v3box.png','https://static.wikia.nocookie.net/vocaloid/images/5/50/Ofclboxart_cfm_Hatsune_Miku-illu.png/revision/latest/scale-to-width-down/1100?cb=20241115074835'],
 ['miku_v6.png','https://static.wikia.nocookie.net/vocaloid/images/1/11/Hatsune_miku_v6.png/revision/latest/scale-to-width-down/900?cb=20260309044249'],
 ['miku_chinese.png','https://static.wikia.nocookie.net/vocaloid/images/f/f9/Miku_Chinese.png/revision/latest/scale-to-width-down/700?cb=20220327221551'],
 ['miku_v3.png','https://static.wikia.nocookie.net/vocaloid/images/d/d0/MIKUV3_img1.png/revision/latest/scale-to-width-down/620?cb=20250122112010'],
 ['miku_pocket.png','https://static.wikia.nocookie.net/vocaloid/images/4/41/Pocket_Miku_Halfbody_transparent.png/revision/latest/scale-to-width-down/620?cb=20241230102119'],
 ['logo_word.png','https://static.wikia.nocookie.net/vocaloid/images/c/c6/HatsuneMiku_Logo.png/revision/latest?cb=20151212173330'],
];
const out='D:/developing/DSH-plugin/dsh-cosplay/miku/assets/img/';
for(const [name,url] of jobs){
  const r=await fetch(url,{headers:UA});
  if(!r.ok){console.log('FAIL',name,r.status);continue;}
  const b=Buffer.from(await r.arrayBuffer());
  fs.writeFileSync(out+name,b);
  console.log('OK',name,(b.length/1024).toFixed(0)+'KB');
}
