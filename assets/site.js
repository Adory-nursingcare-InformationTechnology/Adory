/* Adory 共通スクリプト */
(function(){
  // 旧URL（index.html#about / #message / #contact）からの転送
  var h=location.hash;
  if(/index\.html$|\/$/.test(location.pathname)||location.pathname===''){
    if(h==='#about'||h==='#message'){location.replace('company.html'+h);return}
    if(h==='#contact'){location.replace('contact.html');return}
  }

  var hdr=document.getElementById('hdr'),stb=document.getElementById('stb');
  window.addEventListener('scroll',function(){var y=window.scrollY;if(hdr)hdr.classList.toggle('scrolled',y>50);if(stb)stb.classList.toggle('show',y>400)});
  if(stb)stb.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})});

  var hamburger=document.getElementById('hamburger'),navMenu=document.getElementById('navMenu');
  if(hamburger&&navMenu){
    hamburger.addEventListener('click',function(){hamburger.classList.toggle('open');navMenu.classList.toggle('active')});
    navMenu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){hamburger.classList.remove('open');navMenu.classList.remove('active')})});
  }

  var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting)e.target.classList.add('v')})},{threshold:.08,rootMargin:'0px 0px -30px 0px'});
  document.querySelectorAll('.rv').forEach(function(el){obs.observe(el)});

  document.querySelectorAll('a[href^="#"]').forEach(function(link){link.addEventListener('click',function(e){var id=link.getAttribute('href');if(id==='#')return;var t=document.querySelector(id);if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'})}})});

  document.querySelectorAll('.faq-item').forEach(function(item){var q=item.querySelector('.faq-q'),a=item.querySelector('.faq-a');q.addEventListener('click',function(){var o=item.classList.contains('open');document.querySelectorAll('.faq-item.open').forEach(function(x){x.classList.remove('open');x.querySelector('.faq-a').style.maxHeight='0'});if(!o){item.classList.add('open');a.style.maxHeight=a.scrollHeight+'px'}})});

  // イベントレポートの開閉
  document.querySelectorAll('.report-card').forEach(function(card){var btn=card.querySelector('.toggle-btn'),detail=card.querySelector('.report-detail');if(!btn||!detail)return;btn.addEventListener('click',function(){var ex=btn.getAttribute('aria-expanded')==='true';btn.setAttribute('aria-expanded',String(!ex));detail.style.maxHeight=ex?'0':(detail.scrollHeight+'px')})});

  // お問い合わせフォーム
  var form=document.getElementById('contactForm');
  if(form){
    var params=new URLSearchParams(location.search),sel=form.querySelector('#inquiry_type');
    if(sel&&params.get('type')==='doc')sel.value='資料請求';
    if(sel&&params.get('type')==='demo')sel.value='無料相談・デモを希望';
    form.addEventListener('submit',function(){
      var redirect=form.querySelector('input[name="redirect"]');
      var isDoc=sel&&sel.value==='資料請求';
      if(redirect)redirect.value='https://adory.co.jp/thanks.html?type='+(isDoc?'doc':'contact');
      var btn=form.querySelector('.submit-btn');if(btn){btn.textContent='送信中...';btn.disabled=true}
    });
  }

  // サンクスページの出し分け
  var ty=document.getElementById('thanksDoc'),tc=document.getElementById('thanksContact');
  if(ty&&tc){var t=new URLSearchParams(location.search).get('type');ty.hidden=(t!=='doc');tc.hidden=(t==='doc')}
})();
