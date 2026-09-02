const $=(s,el=document)=>el.querySelector(s);
const $$=(s,el=document)=>[...el.querySelectorAll(s)];
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2400)}

// monument switch
$$('.m-btn').forEach(b=>{
  b.addEventListener('click',()=>{
    $$('.m-btn').forEach(x=>x.classList.remove('active')); b.classList.add('active');
    const v=b.dataset.m; $('#monumentEl').dataset.style=v;
    const mb=$('.mini-body');
    if(!mb) return;
    if(v==='granite'){mb.style.background='linear-gradient(180deg,#ece9e4,#d5d1cc)';mb.style.borderColor='#b8b5ae';mb.style.color='var(--ink)'}
    if(v==='limestone'){mb.style.background='linear-gradient(180deg,#faf6ef,#e8e0d1)';mb.style.borderColor='#c9bdaa';mb.style.color='var(--ink)'}
    if(v==='bronze'){mb.style.background='linear-gradient(180deg,#6b5a3a,#3d3522)';mb.style.borderColor='#2a2416';mb.style.color='#f5e6c8'}
  })
});

// chart
const svg=$('#chartSvg'), areaPath=$('#areaPath'), linePath=$('#linePath'), dotGroup=$('#dotGroup');
function buildChart(years){
  if(!svg) return;
  const W=640,H=180,padL=12,padR=12,padT=16,padB=24;
  const cur=5.8,tgt=33;
  const pts=[]; for(let i=0;i<=years;i++){const t=i/years,e=0.3*t+0.7*Math.pow(t,1.35); pts.push(cur+(tgt-cur)*e)}
  const x=i=>padL+(W-padL-padR)*(i/years), y=v=>padT+(H-padT-padB)*(1-(v-0)/(36-0));
  const grid=svg.querySelector('.grid'); grid.innerHTML='';
  [0,10,20,30].forEach(v=>{const yy=y(v);const l=document.createElementNS('http://www.w3.org/2000/svg','line');l.setAttribute('x1',padL);l.setAttribute('x2',W-padR);l.setAttribute('y1',yy);l.setAttribute('y2',yy);l.setAttribute('stroke','#e8ddd0');l.setAttribute('stroke-dasharray','3 4');grid.appendChild(l);const t=document.createElementNS('http://www.w3.org/2000/svg','text');t.setAttribute('x',W-padR-2);t.setAttribute('y',yy-4);t.setAttribute('text-anchor','end');t.setAttribute('font-size','9');t.setAttribute('fill','#9aa8a3');t.textContent=v+'萬';grid.appendChild(t)});
  const nat=[]; for(let i=0;i<=years;i++) nat.push(cur*Math.pow(1.008,i));
  const lineD=pts.map((v,i)=>`${i===0?'M':'L'} ${x(i)} ${y(v)}`).join(' ');
  const natD=nat.map((v,i)=>`${i===0?'M':'L'} ${x(i)} ${y(v)}`).join(' ');
  const areaD=lineD+` L ${x(years)} ${y(0)} L ${x(0)} ${y(0)} Z`;
  linePath.setAttribute('d',lineD); areaPath.setAttribute('d',areaD);
  let natEl=$('#natLine'); if(!natEl){natEl=document.createElementNS('http://www.w3.org/2000/svg','path');natEl.id='natLine';natEl.setAttribute('fill','none');natEl.setAttribute('stroke','#1e3a3a');natEl.setAttribute('stroke-width','1.6');natEl.setAttribute('stroke-dasharray','6 5');natEl.setAttribute('opacity','.35');svg.insertBefore(natEl,dotGroup)}
  natEl.setAttribute('d',natD);
  dotGroup.innerHTML=''; [0,Math.round(years/2),years].forEach(i=>{const cx=x(i),cy=y(pts[i]);const c=document.createElementNS('http://www.w3.org/2000/svg','circle');c.setAttribute('cx',cx);c.setAttribute('cy',cy);c.setAttribute('r','4.5');c.setAttribute('fill','white');c.setAttribute('stroke','#9e2b2b');c.setAttribute('stroke-width','2');dotGroup.appendChild(c);const lb=document.createElementNS('http://www.w3.org/2000/svg','text');lb.setAttribute('x',cx);lb.setAttribute('y',cy-10);lb.setAttribute('text-anchor','middle');lb.setAttribute('font-size','10');lb.setAttribute('font-weight','700');lb.setAttribute('fill','#1e3a3a');lb.textContent=Math.round(pts[i]*10)/10+'萬';dotGroup.appendChild(lb)});
  const add=(tgt-cur)/years;
  const aa=$('#annualAdd'), gh=$('#growthHint'), ml=$('#midLabel');
  if(aa) aa.textContent='+'+Math.round(add*10000).toLocaleString('zh-TW');
  if(gh) gh.textContent='年均 +'+Math.round(add*10000).toLocaleString('zh-TW')+' 人';
  if(ml) ml.textContent=`${2025+Math.round(years/2)} · ${Math.round(pts[Math.round(years/2)]*10)/10}萬`;
}
$('#yearSelect')?.addEventListener('change',e=>buildChart(Number(e.target.value))); buildChart(15);

// hero pop count
const hp=$('#heroPop'); let done=false;
if(hp && 'IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>{if(es[0].isIntersecting&&!done){done=true;let s=performance.now();const tgt=330000;function tick(t){const p=Math.min(1,(t-s)/1400),e=1-Math.pow(1-p,3);hp.textContent=Math.round(tgt*e).toLocaleString('zh-TW'); if(p<1)requestAnimationFrame(tick); else hp.textContent='330,000'; }requestAnimationFrame(tick)}},{threshold:.5}); io.observe(hp);
}

// share/print/download
$('#printBtn')?.addEventListener('click',()=>window.print());
$('#printMonument')?.addEventListener('click',()=>window.print());
$('#shareBtn')?.addEventListener('click', async()=>{
  const url=location.href, text='Muse City 33 — 新豐省轄市升格願景 · 紀念黃馨鋒同志';
  if(navigator.share){try{await navigator.share({title:document.title,text,url})}catch{}} else if(navigator.clipboard){await navigator.clipboard.writeText(url);toast('連結已複製')}
  else prompt('複製連結',url);
});
$('#downloadInscr')?.addEventListener('click',()=>{
  const c=`新豐省轄市升格紀念碑 碑文擬稿 — 署名 黃馨鋒同志\n\n維新豐之地，枕山面海，居桃竹之要衝。昔為鄉治，今願為市。黃馨鋒同志倡無條件升格之議，謂城市當以願景為先，不以門檻自限。眾感其誠，議乃成。\n爰以人口三十三萬為期，擘劃交通、產業、居住、文教之宏圖，冀新豐得省轄市之位階，行完整都市之治理。謹立此碑，誌其緣起，以垂來茲。\n\n中華民國一一五年\n署名：黃馨鋒 同志 謹誌\nMuse City 33 — XINFENG\n`;
  const b=new Blob([c],{type:'text/plain;charset=utf-8'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='新豐升格紀念碑碑文-黃馨鋒同志.txt';a.click();URL.revokeObjectURL(a.href);toast('碑文稿已下載');
});
const pd=$('#printDate'); if(pd) pd.textContent='列印 '+new Date().toLocaleDateString('zh-TW',{year:'numeric',month:'long',day:'numeric'});

// ===== BMI =====
const bmiH=$('#bmiHeight'), bmiW=$('#bmiWeight'), bmiVal=$('#bmiValue'), bmiCatEl=$('#bmiCat'), bmiBar=$('#bmiBar'), bmiAdv=$('#bmiAdvice');
function calcBMI(){
  const h=parseFloat(bmiH.value), w=parseFloat(bmiW.value);
  if(!h||!w||h<50||w<10){toast('請輸入正確身高體重');return}
  const m=h/100, bmi=w/(m*m), v=bmi.toFixed(1);
  let cat='',color='',adv='',pct=0;
  if(bmi<18.5){cat='過輕';color='#3a8fb7';adv='建議增加營養攝取，均衡飲食與適度肌力訓練。';pct=(bmi/18.5)*22}
  else if(bmi<24){cat='正常';color='#2a7a4a';adv='體位健康，請保持規律作息與運動。';pct=22+((bmi-18.5)/5.5)*36}
  else if(bmi<27){cat='過重';color='#c9a96a';adv='建議調整飲食與增加有氧運動，注意腰圍管理。';pct=58+((bmi-24)/3)*18}
  else {cat='肥胖';color='#9e2b2b';adv='建議諮詢醫療專業，制定體重管理計畫。';pct=76+Math.min(24,((bmi-27)/8)*24)}
  bmiVal.textContent=v; bmiCatEl.textContent=cat; bmiCatEl.style.color=color; bmiCatEl.style.borderColor=color;
  bmiBar.style.width=pct+'%'; bmiBar.style.background=color;
  bmiAdv.textContent=adv+' （'+cat+'）';
}
$('#bmiCalc')?.addEventListener('click',calcBMI);
$('#bmiReset')?.addEventListener('click',()=>{bmiH.value=170;bmiW.value=65;bmiVal.textContent='—';bmiCatEl.textContent='輸入後計算';bmiCatEl.style.color='';bmiCatEl.style.borderColor='';bmiBar.style.width='0';bmiAdv.textContent='BMI = 體重(kg) ÷ 身高²(m²)，以衛福部成人標準判定。'});
[bmiH,bmiW].forEach(el=>el?.addEventListener('keydown',e=>{if(e.key==='Enter')calcBMI()}));
// init bar
if(bmiBar) bmiBar.style.width='0';

// ===== Calculator =====
let calcExpr='', calcJustEq=false;
const disp=$('#calcDisplay'), hist=$('#calcHistory');
function updateCalc(){ disp.textContent=calcExpr||'0'; }
function inputCalc(k){
  if(k==='AC'){ calcExpr=''; hist.textContent=''; updateCalc(); return; }
  if(k==='DEL'){ calcExpr=calcExpr.slice(0,-1); updateCalc(); return; }
  if(k==='='){
    if(!calcExpr) return;
    try{
      let e=calcExpr.replace(/×/g,'*').replace(/÷/g,'/').replace(/−/g,'-').replace(/＋/g,'+');
      // handle % : convert number% to number/100
      e=e.replace(/(\d+(\.\d+)?)%/g,'($1/100)');
      // safe eval: only allow digits and operators
      if(!/^[0-9+\-*/.()%\s]+$/.test(e.replace(/\*\*/g,''))) throw 0;
      const res=Function('"use strict";return ('+e+')')();
      if(!isFinite(res)) throw 0;
      hist.textContent=calcExpr+' =';
      calcExpr=String(Math.round(res*1e10)/1e10);
      calcJustEq=true; updateCalc();
    }catch{ toast('算式有誤'); }
    return;
  }
  if(calcJustEq && /[0-9.]/.test(k)){ calcExpr=k; calcJustEq=false; updateCalc(); return; }
  if(calcJustEq && /[+\-*/%]/.test(k)){ calcJustEq=false; }
  // prevent double operators
  if(/[+\-*/.]/.test(k) && /[+\-*/.]$/.test(calcExpr) && k!=='.') calcExpr=calcExpr.slice(0,-1)+k;
  else calcExpr+=k;
  updateCalc();
}
$$('.ckey').forEach(b=>b.addEventListener('click',()=>inputCalc(b.dataset.k)));
document.addEventListener('keydown',e=>{
  if(!$('#tools')) return;
  const k=e.key;
  if(k==='Escape'){ inputCalc('AC'); }
  else if(k==='Enter'||k==='='){ e.preventDefault(); inputCalc('='); }
  else if(k==='Backspace'){ inputCalc('DEL'); }
  else if('0123456789+-*/.%'.includes(k)){ inputCalc(k==='*'?'*':k==='/'?'/':k); }
});
updateCalc();

// ===== Weather (1 week) =====
const wxTemp=$('#wxTemp'), wxCond=$('#wxCond'), wxHighLow=$('#wxHighLow'), wxExtra=$('#wxExtra'), wxWeek=$('#wxWeek'), wxUpdate=$('#wxUpdate');
const WCODE={0:'晴',1:'晴',2:'多雲',3:'陰',45:'霧',48:'霧',51:'毛毛雨',53:'毛毛雨',55:'毛毛雨',61:'小雨',63:'雨',65:'大雨',71:'小雪',73:'雪',75:'大雪',80:'陣雨',81:'陣雨',82:'大雨',95:'雷雨',96:'雷雹'};
function wxIcon(code){
  if([0,1].includes(code)) return '☀';
  if([2,3].includes(code)) return '⛅';
  if([45,48].includes(code)) return '🌫';
  if([51,53,55,61,63,65,80,81,82].includes(code)) return '🌧';
  if([71,73,75].includes(code)) return '❄';
  if([95,96].includes(code)) return '⛈';
  return '☁';
}
async function loadWeather(){
  if(!wxWeek) return;
  wxCond.textContent='載入中...';
  const lat=24.92, lon=121.00;
  const url=`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&current_weather=true&timezone=Asia%2FTaipei&forecast_days=7`;
  try{
    const r=await fetch(url);
    if(!r.ok) throw 0;
    const d=await r.json();
    const cur=d.current_weather;
    const daily=d.daily;
    const cond=WCODE[cur.weathercode]||'—';
    wxTemp.textContent=Math.round(cur.temperature)+'°';
    wxCond.textContent=cond+' · 風速 '+Math.round(cur.windspeed)+'km/h';
    wxHighLow.textContent=`今日 ${Math.round(daily.temperature_2m_max[0])}° / ${Math.round(daily.temperature_2m_min[0])}°`;
    wxExtra.textContent=`降雨機率 ${daily.precipitation_probability_max[0]??0}%`;
    wxWeek.innerHTML='';
    const days=['日','一','二','三','四','五','六'];
    for(let i=0;i<7;i++){
      const date=new Date(daily.time[i]);
      const isToday=i===0;
      const label=isToday?'今天':`${date.getMonth()+1}/${date.getDate()} 週${days[date.getDay()]}`;
      const div=document.createElement('div');
      div.className='wx-day'+(isToday?' today':'');
      div.innerHTML=`<b>${label}</b><div class="wx-icon">${wxIcon(daily.weathercode[i])}</div><div class="wx-hi">${Math.round(daily.temperature_2m_max[i])}°</div><div class="wx-lo">${Math.round(daily.temperature_2m_min[i])}°</div><div style="font-size:10px;color:var(--muted);margin-top:2px">${WCODE[daily.weathercode[i]]||''} · ${daily.precipitation_probability_max[i]??0}%</div>`;
      wxWeek.appendChild(div);
    }
    wxUpdate.textContent='更新：'+new Date().toLocaleString('zh-TW',{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'});
  }catch{
    // fallback mock
    const mock=[{code:1,hi:28,lo:20},{code:2,hi:27,lo:19},{code:3,hi:26,lo:18},{code:61,hi:25,lo:18},{code:2,hi:27,lo:19},{code:1,hi:29,lo:20},{code:0,hi:30,lo:21}];
    wxTemp.textContent='27°'; wxCond.textContent='多雲 · 模擬資料'; wxHighLow.textContent='今日 28° / 20°'; wxExtra.textContent='降雨機率 20% (離線模擬)';
    wxWeek.innerHTML='';
    const days=['日','一','二','三','四','五','六'];
    const base=new Date();
    mock.forEach((m,i)=>{
      const d=new Date(base); d.setDate(base.getDate()+i);
      const label=i===0?'今天':`${d.getMonth()+1}/${d.getDate()} 週${days[d.getDay()]}`;
      const div=document.createElement('div');
      div.className='wx-day'+(i===0?' today':'');
      div.innerHTML=`<b>${label}</b><div class="wx-icon">${wxIcon(m.code)}</div><div class="wx-hi">${m.hi}°</div><div class="wx-lo">${m.lo}°</div><div style="font-size:10px;color:var(--muted);margin-top:2px">${WCODE[m.code]} · 20%</div>`;
      wxWeek.appendChild(div);
    });
    wxUpdate.textContent='離線模擬資料';
    toast('天氣載入失敗，顯示模擬資料');
  }
}
$('#weatherRefresh')?.addEventListener('click',loadWeather);
loadWeather();

// ===== Tic Tac Toe =====
const boardEl=$('#tttBoard'), turnEl=$('#tttTurn'), scoreEl=$('#tttScore'), aiChk=$('#tttAI');
let board=Array(9).fill(''), turn='O', scoreO=0, scoreX=0, gameOver=false;
const wins=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
function renderTTT(){
  [...boardEl.children].forEach((b,i)=>{
    b.textContent=board[i];
    b.disabled=!!board[i]||gameOver;
    b.classList.remove('win');
  });
  turnEl.textContent=gameOver ? (turnEl.textContent.includes('獲勝')||turnEl.textContent.includes('平手')?turnEl.textContent:`輪到：${turn}`) : `輪到：${turn}`;
  scoreEl.textContent=`○ ${scoreO} : ${scoreX} ×`;
}
function checkWin(bd){
  for(const w of wins){ if(bd[w[0]]&&bd[w[0]]===bd[w[1]]&&bd[w[0]]===bd[w[2]]) return w; }
  return null;
}
function aiMove(){
  // win if possible, block, else random
  const empty=board.map((v,i)=>v===''?i:null).filter(v=>v!==null);
  if(empty.length===0) return;
  // try win
  for(const i of empty){ const c=[...board]; c[i]='X'; if(checkWin(c)) { board[i]='X'; return; } }
  // block
  for(const i of empty){ const c=[...board]; c[i]='O'; if(checkWin(c)) { board[i]='X'; return; } }
  // center
  if(board[4]==='') { board[4]='X'; return; }
  // random
  board[empty[Math.floor(Math.random()*empty.length)]]='X';
}
function handleMove(i){
  if(board[i]||gameOver) return;
  board[i]=turn;
  let w=checkWin(board);
  if(w){ w.forEach(idx=>boardEl.children[idx].classList.add('win')); gameOver=true; turnEl.textContent=`${turn} 獲勝！`; if(turn==='O') scoreO++; else scoreX++; renderTTT(); toast(`${turn} 獲勝！`); return; }
  if(board.every(v=>v)){ gameOver=true; turnEl.textContent='平手！'; renderTTT(); toast('平手！'); return; }
  turn=turn==='O'?'X':'O';
  renderTTT();
  if(aiChk.checked && turn==='X' && !gameOver){
    setTimeout(()=>{
      aiMove();
      let w2=checkWin(board);
      if(w2){ w2.forEach(idx=>boardEl.children[idx].classList.add('win')); gameOver=true; turnEl.textContent=`X 獲勝！`; scoreX++; renderTTT(); toast('X 獲勝！'); return; }
      if(board.every(v=>v)){ gameOver=true; turnEl.textContent='平手！'; renderTTT(); toast('平手！'); return; }
      turn='O'; renderTTT();
    }, 280);
  }
}
boardEl?.addEventListener('click',e=>{
  const b=e.target.closest('button'); if(!b) return; handleMove(Number(b.dataset.i));
});
$('#tttReset')?.addEventListener('click',()=>{ board=Array(9).fill(''); turn='O'; gameOver=false; turnEl.textContent='輪到：○'; renderTTT(); });
$('#tttResetScore')?.addEventListener('click',()=>{ scoreO=0;scoreX=0; board=Array(9).fill(''); turn='O'; gameOver=false; renderTTT(); });
renderTTT();
