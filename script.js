function createParticles() {
    const c = document.getElementById('particles');
    if(!c) return;
    for(let i=0;i<100;i++){
        let s = document.createElement('span');
        let size = Math.random()*6+2;
        s.style.width = size+'px';
        s.style.height = size+'px';
        s.style.left = Math.random()*100+'%';
        s.style.animationDelay = Math.random()*8+'s';
        s.style.animationDuration = Math.random()*5+5+'s';
        c.appendChild(s);
    }
}
createParticles();

function initHamburger(){
    const h = document.getElementById('hamburger');
    const s = document.getElementById('sidebar');
    if(h&&s){
        h.onclick = ()=>s.classList.toggle('open');
        document.addEventListener('click',(e)=>{
            if(!s.contains(e.target)&&!h.contains(e.target)&&s.classList.contains('open')) s.classList.remove('open');
        });
    }
    const hd = document.getElementById('hamburger-dash');
    const sd = document.getElementById('sidebar-dash');
    if(hd&&sd){
        hd.onclick = ()=>sd.classList.toggle('open');
        document.addEventListener('click',(e)=>{
            if(!sd.contains(e.target)&&!hd.contains(e.target)&&sd.classList.contains('open')) sd.classList.remove('open');
        });
    }
}
initHamburger();

const loginForm = document.getElementById('loginForm');
if(loginForm){
    loginForm.addEventListener('submit',function(e){
        e.preventDefault();
        const u = document.getElementById('username').value;
        const p = document.getElementById('password').value;
        if(u==='admin' && p==='vxtoolkit'){
            localStorage.setItem('loggedIn','true');
            window.location.href='dashboard.html';
        } else {
            document.getElementById('errorMsg').innerText = 'Invalid username or password';
        }
    });
}

if(window.location.pathname.includes('dashboard.html')){
    if(localStorage.getItem('loggedIn')!=='true') window.location.href='index.html';
    document.getElementById('logoutBtn').onclick = ()=>{
        localStorage.removeItem('loggedIn');
        window.location.href='index.html';
    };
    const modal = document.getElementById('toolModal');
    const modalBody = document.getElementById('modalBody');
    const closeSpan = document.querySelector('.close');
    function closeModal(){ modal.style.display='none'; }
    closeSpan.onclick = closeModal;
    window.onclick = function(e){ if(e.target==modal) closeModal(); };
    document.querySelectorAll('.tool-card').forEach(card=>{
        card.addEventListener('click',()=>{
            const tool = card.dataset.tool;
            let html='';
            if(tool==='ransomware'){
                html='<h3>Ransomware Builder</h3><label>WhatsApp Number:</label><input id="ow" placeholder="6281234567890"><label>Password:</label><input id="pw" type="password"><label>Expiry (days):</label><input id="exp" value="7"><label>Ransom Note:</label><textarea id="note" rows="4">Your files are encrypted!</textarea><button id="genBtn">Generate</button>';
            } else if(tool==='telegram_rat'){
                html='<h3>Telegram RAT</h3><label>Bot Token:</label><input id="bt" placeholder="123456:ABC"><label>Chat ID:</label><input id="cid"><label>Persistence:</label><select id="pers"><option value="true">Yes</option><option value="false">No</option></select><button id="genBtn">Generate</button>';
            } else {
                html='<h3>'+card.querySelector('h3').innerText+'</h3><p>Tool not implemented in this demo.</p>';
            }
            modalBody.innerHTML = html;
            modal.style.display='block';
            const gen = document.getElementById('genBtn');
            if(gen) gen.onclick = ()=>{ alert('Script generation simulated.'); closeModal(); };
        });
    });
}
