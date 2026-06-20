const SHEET_ID="12sl4qtRuxadkUYeF7KIFEiBPxfnyotkAbh0zoiShvcQ";
const SHEET_NAME="시트1";
const csvUrl=`https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(SHEET_NAME)}`;
const listEl=document.getElementById("list");
const searchInput=document.getElementById("searchInput");
let sheetData=[];
fetch(csvUrl).then(r=>r.text()).then(csv=>{sheetData=parseCSV(csv);renderList(sheetData);}).catch(e=>{listEl.innerHTML="데이터를 불러오지 못했습니다.";console.error(e);});
function parseCSV(csv){const rows=csv.trim().split("\n").map(row=>row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g)?.map(cell=>cell.replace(/^"|"$/g,"").replace(/""/g,'"'))||[]);const headers=rows.shift();return rows.map(row=>{const obj={};headers.forEach((h,i)=>obj[h]=row[i]||"");return obj;});}
function renderList(data){listEl.innerHTML="";if(!data.length){listEl.innerHTML="표시할 데이터가 없습니다.";return;}data.forEach(item=>{const div=document.createElement("div");div.className="item";const firstKey=Object.keys(item)[0];div.innerHTML=`<div class="item-title">${item[firstKey]}</div>${Object.entries(item).slice(1).map(([k,v])=>`<div class="item-row"><b>${k}</b> : ${v}</div>`).join("")}`;listEl.appendChild(div);});}
searchInput.addEventListener("input",()=>{const keyword=searchInput.value.toLowerCase();renderList(sheetData.filter(item=>Object.values(item).some(v=>String(v).toLowerCase().includes(keyword))));});