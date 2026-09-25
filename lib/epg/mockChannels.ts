import type { EpgChannel, EpgCountry, EpgProgram, ScheduleItem } from "./types";

export const epgCountries: EpgCountry[] = [
  { id:"ar", name:"Argentina", slug:"argentina", code:"AR", flag:"🇦🇷", description:"Cultura, universidades e TV pública" },
  { id:"br", name:"Brasil", slug:"brasil", code:"BR", flag:"🇧🇷" },
  { id:"cl", name:"Chile", slug:"chile", code:"CL", flag:"🇨🇱" },
  { id:"uy", name:"Uruguai", slug:"uruguai", code:"UY", flag:"🇺🇾" },
  { id:"py", name:"Paraguai", slug:"paraguai", code:"PY", flag:"🇵🇾" },
  { id:"bo", name:"Bolívia", slug:"bolivia", code:"BO", flag:"🇧🇴" },
  { id:"pe", name:"Peru", slug:"peru", code:"PE", flag:"🇵🇪" },
  { id:"co", name:"Colômbia", slug:"colombia", code:"CO", flag:"🇨🇴" },
  { id:"mx", name:"México", slug:"mexico", code:"MX", flag:"🇲🇽" },
  { id:"cu", name:"Cuba", slug:"cuba", code:"CU", flag:"🇨🇺" },
];

const progs: Record<string, EpgProgram> = {
  culto: { id:"p1", title:"Cultura em Movimento", slug:"cultura-em-movimento", description:"Revista cultural com música e território.", thumbnail:"https://picsum.photos/seed/epg1/400/225", category:"Cultura", durationMin:60 },
  cinema: { id:"p2", title:"Cinema Latino", slug:"cinema-latino", description:"Filmes e entrevistas do cinema independente.", thumbnail:"https://picsum.photos/seed/epg2/400/225", category:"Cinema", durationMin:120 },
  noticias: { id:"p3", title:"Notícias Regionais", slug:"noticias-regionais", description:"Informação local e comunitária.", thumbnail:"https://picsum.photos/seed/epg3/400/225", category:"Notícias", durationMin:30 },
  musica: { id:"p4", title:"Música del Sur", slug:"musica-del-sur", description:"Shows e festivais.", thumbnail:"https://picsum.photos/seed/epg4/400/225", category:"Música", durationMin:60 },
  doc: { id:"p5", title:"Documentários da América", slug:"documentarios-america", description:"Docs que percorrem o continente.", thumbnail:"https://picsum.photos/seed/epg5/400/225", category:"Documentários", durationMin:52 },
  univ: { id:"p6", title:"Universidad y Territorio", slug:"universidad-territorio", description:"Extensão universitária na prática.", thumbnail:"https://picsum.photos/seed/epg6/400/225", category:"Educativo", durationMin:45 },
};

// helper to make ISO for today at HH:MM in channel timezone — simplified: store as local today using wall time + timezone offset via Intl (approx)
function todayAt(h:number,m:number, tz:string){
  const now=new Date();
  // create date at h:m in tz then convert to ISO UTC via locale trick
  const fmt=new Intl.DateTimeFormat("en-CA",{ timeZone: tz, year:"numeric", month:"2-digit", day:"2-digit" }).format(now);
  // fmt YYYY-MM-DD
  const iso=`${fmt}T${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:00`;
  // interpret as wall time in tz -> to UTC
  const wall=new Date(`${iso}`);
  // crude: get offset by comparing UTC vs tz at that moment
  const tzOffset = (()=>{ try{ const a=new Date(wall.toLocaleString("en-US",{timeZone:tz})); const b=new Date(wall.toLocaleString("en-US",{timeZone:"UTC"})); return b.getTime()-a.getTime(); }catch{ return 0; }})();
  return new Date(wall.getTime()+tzOffset).toISOString();
}

function mkSchedule(channelId:string, tz:string, items: { h:number;m:number; prog:EpgProgram; durMin?:number }[]): ScheduleItem[]{
  return items.map((it,i)=>{
    const start=todayAt(it.h,it.m,tz);
    const endDate=new Date(new Date(start).getTime() + (it.durMin ?? it.prog.durationMin)*60000);
    return { id:`${channelId}-${i}`, channelId, programId: it.prog.id, start, end: endDate.toISOString(), timezone: tz };
  });
}

export const epgChannels: EpgChannel[] = [
  { id:"cordoba-cultural", slug:"canal-cultural-cordoba", name:"Canal Cultural Córdoba", shortName:"Cultural CBA", description:"TV pública e universitária de Córdoba.", country: epgCountries[0], region:"Córdoba", city:"Córdoba", language:"es", logo:"", cover:"", category:"Cultural", website:"https://example.com", timezone:"America/Argentina/Buenos_Aires", channelNumber:10, is24h:false, status:"LIVE", isActive:true,
    source:{ type:"hls", provider:"hls", url:"https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8", isLive:true },
    schedule: mkSchedule("cordoba-cultural","America/Argentina/Buenos_Aires",[{h:17,m:0,prog:progs.culto},{h:18,m:0,prog:progs.cinema},{h:20,m:0,prog:progs.doc}]),
  },
  { id:"tv-brasil", slug:"tv-brasil", name:"TV Brasil", shortName:"TV Brasil", description:"Empresa Brasil de Comunicação.", country: epgCountries[1], region:"Distrito Federal", city:"Brasília", language:"pt", logo:"", cover:"", category:"Público", timezone:"America/Sao_Paulo", channelNumber:2, is24h:true, status:"LIVE", isActive:true,
    source:{ type:"youtube", provider:"youtube", url:"https://www.youtube.com/watch?v=jNQXAC9IVRw", isLive:true },
    schedule: mkSchedule("tv-brasil","America/Sao_Paulo",[{h:17,m:30,prog:progs.noticias},{h:18,m:0,prog:progs.doc},{h:19,m:0,prog:progs.musica}]),
  },
  { id:"unam-tv", slug:"tv-unam", name:"TV UNAM", shortName:"TV UNAM", description:"Universidad Nacional Autónoma de México.", country: epgCountries[8], region:"Ciudad de México", city:"CDMX", language:"es", logo:"", cover:"", category:"Universitário", timezone:"America/Mexico_City", channelNumber:20, is24h:false, status:"LIVE", isActive:true,
    source:{ type:"vimeo", provider:"vimeo", url:"https://vimeo.com/76979871", isLive:false },
    schedule: mkSchedule("unam-tv","America/Mexico_City",[{h:17,m:0,prog:progs.univ},{h:18,m:0,prog:progs.culto}]),
  },
  { id:"uchile-tv", slug:"uchile-tv", name:"UChile TV", shortName:"UChile", description:"Universidad de Chile.", country: epgCountries[2], region:"Santiago", city:"Santiago", language:"es", logo:"", cover:"", category:"Universitário", timezone:"America/Santiago", channelNumber:11, is24h:false, status:"LIVE", isActive:true,
    source:{ type:"hls", provider:"hls", url:"https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8", isLive:true },
    schedule: mkSchedule("uchile-tv","America/Santiago",[{h:16,m:0,prog:progs.doc},{h:17,m:0,prog:progs.culto}]),
  },
  { id:"senial-co", slug:"senial-colombia", name:"Señal Colombia", shortName:"Señal CO", description:"TV cultural pública.", country: epgCountries[7], region:"Bogotá", city:"Bogotá", language:"es", logo:"", cover:"", category:"Cultural", timezone:"America/Bogota", channelNumber:5, is24h:true, status:"LIVE", isActive:true,
    source:{ type:"html5", provider:"html5", url:"https://test-videos.co.uk/vids/sintel/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4", isLive:false },
    schedule: mkSchedule("senial-co","America/Bogota",[{h:17,m:0,prog:progs.musica},{h:19,m:0,prog:progs.cinema}]),
  },
  { id:"cubavision", slug:"cubavision", name:"Cubavisión", shortName:"Cubavisión", description:"Televisión Cubana — sinal ao vivo via YouTube oficial.", country: epgCountries[9], region:"La Habana", city:"La Habana", language:"es", logo:"", cover:"", category:"Público", timezone:"America/Havana", channelNumber:6, is24h:true, status:"LIVE", isActive:true,
    source:{ type:"youtube", provider:"youtube", url:"https://www.youtube.com/watch?v=9bZkp7q19f0", isLive:false },
    schedule: mkSchedule("cubavision","America/Havana",[{h:17,m:0,prog:progs.culto},{h:18,m:30,prog:progs.musica}]),
  },
  { id:"musica-sur", slug:"musica-del-sur", name:"Música del Sur", shortName:"Música Sur", description:"Música latina independente — ao vivo verificado.", country: epgCountries[0], region:"Buenos Aires", city:"Buenos Aires", language:"es", logo:"", cover:"", category:"Música", timezone:"America/Argentina/Buenos_Aires", channelNumber:12, is24h:true, status:"LIVE", isActive:true,
    source:{ type:"youtube", provider:"youtube", url:"https://www.youtube.com/watch?v=aqz-KE-bpKQ", isLive:false },
    schedule: mkSchedule("musica-sur","America/Argentina/Buenos_Aires",[{h:19,m:0,prog:progs.musica}]),
  },
  { id:"patagonia-cultura", slug:"patagonia-cultura", name:"Patagonia Cultura", shortName:"Patagonia", description:"Cultura da Patagônia — transmissão verificada.", country: epgCountries[3], region:"Montevideo", city:"Montevideo", language:"es", logo:"", cover:"", category:"Regional", timezone:"America/Montevideo", channelNumber:3, is24h:false, status:"LIVE", isActive:true,
    source:{ type:"hls", provider:"hls", url:"https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8", isLive:true },
    schedule: mkSchedule("patagonia-cultura","America/Montevideo",[{h:17,m:0,prog:progs.doc}]),
  },
];

export const programMap: Record<string,EpgProgram> = progs;
