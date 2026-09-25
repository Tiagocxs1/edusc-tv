"use client";
import { useEffect, useState } from "react";
export function useFavorites(){
  const [fav,setFav]=useState<string[]>([]);
  useEffect(()=>{ try{ setFav(JSON.parse(localStorage.getItem("edusc:fav")||"[]")); }catch{} },[]);
  const toggle=(id:string)=>{
    setFav(prev=>{
      const next=prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id];
      localStorage.setItem("edusc:fav", JSON.stringify(next));
      return next;
    });
  };
  return { fav, toggle, isFav:(id:string)=>fav.includes(id) };
}
export function useRecentChannels(){
  const [recent,setRecent]=useState<string[]>([]);
  useEffect(()=>{ try{ setRecent(JSON.parse(localStorage.getItem("edusc:recent")||"[]")); }catch{} },[]);
  const push=(id:string)=>{
    setRecent(prev=>{
      const next=[id, ...prev.filter(x=>x!==id)].slice(0,8);
      localStorage.setItem("edusc:recent", JSON.stringify(next));
      localStorage.setItem("edusc:lastChannel", id);
      return next;
    });
  };
  return { recent, push };
}
