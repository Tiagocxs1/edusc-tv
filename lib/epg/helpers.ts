import type { ScheduleItem, EpgProgram } from "./types";
import { programMap } from "./mockChannels";

export function getCurrentItem(schedule: ScheduleItem[], now=new Date()){
  const t=now.getTime();
  return schedule.find(s=> t>= new Date(s.start).getTime() && t < new Date(s.end).getTime()) || null;
}
export function getNextItem(schedule: ScheduleItem[], now=new Date()){
  const t=now.getTime();
  const future = schedule.filter(s=> new Date(s.start).getTime() > t).sort((a,b)=> new Date(a.start).getTime()-new Date(b.start).getTime());
  return future[0] || null;
}
export function getProgram(id:string): EpgProgram | undefined { return programMap[id]; }

export function progressOf(item: ScheduleItem | null, now=new Date()){
  if(!item) return { pct:0, elapsed:0, remaining:0, duration:0 };
  const s=new Date(item.start).getTime(), e=new Date(item.end).getTime(), n=now.getTime();
  const dur=Math.max(1, e-s), elapsed=Math.max(0, Math.min(dur, n-s)), pct=Math.round((elapsed/dur)*100);
  return { pct, elapsed, remaining: dur-elapsed, duration: dur };
}

export function formatInTimezone(iso:string, tz:string){
  try{
    return new Intl.DateTimeFormat("pt-BR", { timeZone: tz, hour:"2-digit", minute:"2-digit" }).format(new Date(iso));
  }catch{ return new Date(iso).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}); }
}
