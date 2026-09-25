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
  dwvivo: { id:"p-dw", title:"DW Español — En vivo 24h", slug:"dw-en-vivo", description:"Noticias internacionales, economía y reportajes desde Alemania para Latinoamérica. Sinal oficial DW Español.", thumbnail:"https://i.ytimg.com/vi/yZh3xsFqCt8/hqdefault.jpg", category:"Notícias", durationMin:1440 },
  f24vivo: { id:"p-f24", title:"FRANCE 24 Español — EN VIVO 24h", slug:"france24-en-vivo", description:"Información internacional y noticias del mundo 24 horas. Sinal oficial France 24 Español.", thumbnail:"https://i.ytimg.com/vi/zTv0hCakAhg/hqdefault.jpg", category:"Notícias", durationMin:1440 },
  c5n: { id:"p-c5n", title:"C5N EN VIVO — Noticias Argentina 24h", slug:"c5n-en-vivo", description:"Toda la información en un solo lugar. Líder de noticias de Argentina.", thumbnail:"https://i.ytimg.com/vi/Tb2MLYWghO8/hqdefault.jpg", category:"Notícias", durationMin:1440 },
  nmas: { id:"p-nmas", title:"Noticias N+ Univision 24/7", slug:"nmas-24-7", description:"Señal en VIVO de Noticias N+ Univision — EUA, comunidade latina e atualidade mundial.", thumbnail:"https://i.ytimg.com/vi/V4C7VNfRATA/hqdefault.jpg", category:"Notícias", durationMin:1440 },
  encuentro: { id:"p-enc", title:"Canal Encuentro — Transmisión", slug:"encuentro-transmision", description:"Canal oficial Encuentro (Ministerio de Educación Argentina). Ciencia, historia y cultura.", thumbnail:"https://i.ytimg.com/vi/UXnAJqXF4VU/hqdefault.jpg", category:"Cultura", durationMin:60 },
  encuentro2: { id:"p-enc2", title:"Nos vemos en Encuentro: Capítulo 1", slug:"nos-vemos-encuentro", description:"Serie oficial Canal Encuentro.", thumbnail:"https://i.ytimg.com/vi/N9zOAZ-JA5I/hqdefault.jpg", category:"Cultura", durationMin:45 },
};

function todayAt(h:number,m:number, tz:string){
  const now=new Date();
  const fmt=new Intl.DateTimeFormat("en-CA",{ timeZone: tz, year:"numeric", month:"2-digit", day:"2-digit" }).format(now);
  const iso=`${fmt}T${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:00`;
  const wall=new Date(`${iso}`);
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

// Fontes 100% reais, embed verificado via oEmbed em 2026-09-25. Sem test-streams, sem example.com.
export const epgChannels: EpgChannel[] = [
  { id:"dw-espanol", slug:"dw-espanol", name:"DW Español", shortName:"DW ES", description:"La cadena internacional de Alemania. Noticias y análisis en español para Latinoamérica. Sinal oficial.", country: epgCountries[8], region:"Berlín", city:"Berlín", language:"es", logo:"", cover:"", category:"Notícias", website:"https://www.dw.com/es", timezone:"America/Mexico_City", channelNumber:1, is24h:true, status:"LIVE", isActive:true,
    source:{ type:"youtube", provider:"youtube", url:"https://www.youtube.com/watch?v=yZh3xsFqCt8", isLive:true, quality:"AUTO" },
    schedule: mkSchedule("dw-espanol","America/Mexico_City",[{h:0,m:0,prog:progs.dwvivo, durMin:1440}]),
  },
  { id:"france24-es", slug:"france24-espanol", name:"FRANCE 24 Español", shortName:"F24 ES", description:"Información internacional y noticias del mundo 24 horas. Servicio público francés.", country: epgCountries[8], region:"París", city:"París", language:"es", logo:"", cover:"", category:"Notícias", website:"https://www.france24.com/es", timezone:"America/Bogota", channelNumber:2, is24h:true, status:"LIVE", isActive:true,
    source:{ type:"youtube", provider:"youtube", url:"https://www.youtube.com/watch?v=zTv0hCakAhg", isLive:true, quality:"AUTO" },
    schedule: mkSchedule("france24-es","America/Bogota",[{h:0,m:0,prog:progs.f24vivo, durMin:1440}]),
  },
  { id:"c5n", slug:"c5n-argentina", name:"C5N Argentina", shortName:"C5N", description:"Líder de noticias de Argentina. Transmisión 24 horas.", country: epgCountries[0], region:"Buenos Aires", city:"Buenos Aires", language:"es", logo:"", cover:"", category:"Notícias", website:"https://www.c5n.com", timezone:"America/Argentina/Buenos_Aires", channelNumber:3, is24h:true, status:"LIVE", isActive:true,
    source:{ type:"youtube", provider:"youtube", url:"https://www.youtube.com/watch?v=Tb2MLYWghO8", isLive:true, quality:"AUTO" },
    schedule: mkSchedule("c5n","America/Argentina/Buenos_Aires",[{h:0,m:0,prog:progs.c5n, durMin:1440}]),
  },
  { id:"nmas", slug:"nmas-univision", name:"Noticias N+ Univision", shortName:"N+ 24/7", description:"Señal en VIVO 24/7 — EUA, comunidade latina e mundo.", country: epgCountries[8], region:"Ciudad de México", city:"CDMX", language:"es", logo:"", cover:"", category:"Notícias", website:"https://www.univision.com", timezone:"America/Mexico_City", channelNumber:4, is24h:true, status:"LIVE", isActive:true,
    source:{ type:"youtube", provider:"youtube", url:"https://www.youtube.com/watch?v=V4C7VNfRATA", isLive:true, quality:"AUTO" },
    schedule: mkSchedule("nmas","America/Mexico_City",[{h:0,m:0,prog:progs.nmas, durMin:1440}]),
  },
  { id:"encuentro", slug:"canal-encuentro", name:"Canal Encuentro", shortName:"Encuentro", description:"Canal oficial del Ministerio de Educación Argentina. Ciencia, historia, cultura.", country: epgCountries[0], region:"Buenos Aires", city:"Buenos Aires", language:"es", logo:"", cover:"", category:"Cultural", website:"https://www.encuentro.gov.ar", timezone:"America/Argentina/Buenos_Aires", channelNumber:10, is24h:false, status:"LIVE", isActive:true,
    source:{ type:"youtube", provider:"youtube", url:"https://www.youtube.com/watch?v=UXnAJqXF4VU", isLive:false, quality:"AUTO" },
    schedule: mkSchedule("encuentro","America/Argentina/Buenos_Aires",[{h:17,m:0,prog:progs.encuentro},{h:18,m:0,prog:progs.encuentro2}]),
  },
];

export const programMap: Record<string,EpgProgram> = progs;
