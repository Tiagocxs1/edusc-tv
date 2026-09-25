// Extraído do HTML público de https://libreflix.org/ em 2026-09-25. Obras com licenças livres.
// Sem MP4 estático no HTML (app JS) → link-only para a plataforma com atribuição por licença.
export interface LibreTitle { title:string; director:string; year:number; duration:number; synopsis:string; tags:string; }
export const libreTitles: LibreTitle[] = [
  { title:"Eskawata Kayawai — O Espírito da Transformação", director:"Lara Jacoski", year:2023, duration:70, synopsis:"Povo Huni Kuin no Acre. Exclusividade Libreflix no Brasil. Sete anos de projeto, retorno ao modo ancestral.", tags:"docs indigenismo" },
  { title:"A Educação Proibida", director:"German Doin", year:2012, duration:145, synopsis:"Questiona a escolarização moderna. Experiências educativas não-convencionais.", tags:"docs educação" },
  { title:"Linha de Montagem", director:"Renato Tapajós", year:1980, duration:87, synopsis:"Greves metalúrgicos 1978-80. Ascensão de Lula. História do sindicalismo.", tags:"docs história" },
  { title:"Hotel Laide", director:"Debora Diniz", year:2017, duration:24, synopsis:"Hotel social da Cracolândia SP. Redução de danos vs prisão.", tags:"curtas docs" },
  { title:"Comandante Arian", director:"Alba Sotorra", year:2018, duration:85, synopsis:"Comandante curda de 30 anos contra o ISIS. Guerra na Síria.", tags:"docs guerra" },
  { title:"Legado Negado", director:"Icles Rodrigues", year:2019, duration:83, synopsis:"Análise do Guia politicamente incorreto. Escravidão no Brasil.", tags:"docs história" },
  { title:"O Menino da Internet — Aaron Swartz", director:"Brian Knappenberger", year:2014, duration:105, synopsis:"RSS, Reddit, cultura livre. Prisão e ativismo.", tags:"docs tech" },
  { title:"The Pirate Bay AFK", director:"Simon Klose", year:2013, duration:82, synopsis:"Fundadores do Pirate Bay.", tags:"docs tech" },
  { title:"Gambiarra — O HD de Espadas", director:"Gustavo Colombo", year:2019, duration:30, synopsis:"Cyberpunk no Rio. Jornalista e HD misterioso.", tags:"sci-fi" },
  { title:"Tchau, Querida", director:"Gustavo Aranda", year:2019, duration:66, synopsis:"Impeachment 2016. Vontade popular vs projeto derrotado.", tags:"docs política" },
];
