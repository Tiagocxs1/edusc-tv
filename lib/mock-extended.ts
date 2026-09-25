import { mockContents } from "./mock-data";
export const continueWatching = [
  { id:"1", title:"Cinema Novo — Glauber Rocha", thumb:"https://picsum.photos/seed/edusc1/640/360", progress: 62, duration:"52:14", remain:"19 min restantes" },
  { id:"3", title:"Música Andina — Charango ao vivo", thumb:"https://picsum.photos/seed/edusc3/640/360", progress: 38, duration:"28:40", remain:"17 min restantes" },
  { id:"5", title:"Aventuras do Sabiá", thumb:"https://picsum.photos/seed/edusc5/640/360", progress: 88, duration:"11:33", remain:"1 min restante" },
];
export const programacao = [
  { day:"Hoje", items:[ { time:"17:00", title:"Universidad y Cultura", channel:"Canal 10 Córdoba", live:true }, { time:"18:00", title:"Notícias Regionais", channel:"TV Brasil", live:false }, { time:"19:00", title:"Documentário: Memória do Sertão", channel:"Canal Futura", live:false }]},
  { day:"Amanhã", items:[ { time:"09:00", title:"Ciência na Escola", channel:"TV UNAM", live:false }, { time:"14:00", title:"Música Popular Colombiana", channel:"Señal Colombia", live:true }]},
];
