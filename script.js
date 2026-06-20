
const SHEET_ID='12sl4qtRuxadkUYeF7KIFEiBPxfnyotkAbh0zoiShvcQ';
const SHEET_NAME='시트1';
const csvUrl=`https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(SHEET_NAME)}`;
const listEl=document.getElementById('list');
const searchInput=document.getElementById('searchInput');
let data=[];

fetch(csvUrl)
.then(r=>r.text())
.then(csv=>{
 data=parseCSV(csv);
 render(data);
});

function parseCSV(csv){
 const rows=csv.trim().split('\n').map(r=>r.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g)?.map(c=>c.replace(/^"|"$/g,''))||[]);
 const headers=rows.shift();
 return rows.map(row=>{
   const obj={};
   headers.forEach((h,i)=>obj[h]=row[i]||'');
   return obj;
 });
}

function render(items){
 listEl.innerHTML='';
 items.forEach(item=>{
   const first=Object.keys(item)[0];
   const div=document.createElement('div');
   div.className='item';
   div.innerHTML=`<div class="item-title">🪼 ${item[first]}</div>`+
   Object.entries(item).slice(1).map(([k,v])=>`<div class="item-row"><b>${k}</b> : ${v}</div>`).join('');
   listEl.appendChild(div);
 });
}

searchInput.addEventListener('input',()=>{
 const q=searchInput.value.toLowerCase();
 render(data.filter(x=>Object.values(x).some(v=>String(v).toLowerCase().includes(q))));
});
