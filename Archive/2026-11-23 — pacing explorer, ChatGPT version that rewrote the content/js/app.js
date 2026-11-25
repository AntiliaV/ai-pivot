/* Progressive enhancement only: the policy note is static, readable HTML. */
(function(){
  'use strict';
  var data=window.PACING_SITE,engine=window.PacingPackage;
  if(!data)return;
  var byId=Object.create(null);data.interventions.forEach(function(t){byId[t.id]=t;});
  function el(tag,attrs,children){
    var n=document.createElement(tag);Object.keys(attrs||{}).forEach(function(k){n.setAttribute(k,attrs[k]);});
    function append(c){if(c===null||c===undefined)return;if(Array.isArray(c)){c.forEach(append);return;}n.appendChild(typeof c==='string'||typeof c==='number'?document.createTextNode(String(c)):c);}
    append(children);return n;
  }
  function link(id,text){return el('a',{href:'tool-'+id+'.html'},text||byId[id].name);}
  function p(text,cls){return el('p',cls?{class:cls}:{},text);}
  function disclosure(title,children){var d=el('details',{class:'reading-details'},[el('summary',{},title),el('div',{class:'disclosure-body'},children)]);return d;}
  function word(t,key){return data.words[key==='burden'||key==='invasiveness'?'cost':'benefit'][t.scores[key].score-1];}
  function list(items){return el('ul',{},items.map(function(x){return el('li',{},x);}));}
  function labelFor(key){return data.criteria.filter(function(c){return c.id===key;})[0].label;}
  function explainExcluded(row){
    if(!row.feasible){
      var own=row.violations.indexOf(row.id)>=0;
      return own?'Its lab invasiveness is above the selected ceiling.':'Required supporting measure exceeds the ceiling: '+row.violations.map(function(id){return byId[id].name+' ('+word(byId[id],'invasiveness').toLowerCase()+')';}).join(', ')+'.';
    }
    return 'Its weighted score is below the illustrative selection threshold.';
  }
  function renderResult(choices){
    var result=engine.build(data,choices),box=document.getElementById('package-results');box.replaceChildren();
    var heading=result.empty?'No package meets the ceiling':result.belowThreshold?'Closest feasible option':'Illustrative package';
    box.appendChild(el('div',{class:'package-heading'},[el('h3',{},heading),el('span',{class:'result-tag'},result.priorities.length?'Your selected priorities':'All criteria weighted equally')]));
    box.appendChild(p(result.priorities.length?'Selected priorities count three times as much as the other criteria. The ceiling applies to each tool and all of its required support.':'With no priorities selected, each criterion counts equally. Change the choices to inspect how the selection responds.','small muted'));
    if(result.belowThreshold)box.appendChild(el('div',{class:'tradeoff-alert'},[el('strong',{},'No feasible tool reaches the score threshold.'),p('The highest-scoring feasible option is shown separately as a discussion starting point. It falls short of the selection rule.')]));
    if(!result.empty){
      box.appendChild(el('ol',{class:'package-layers'},result.layers.map(function(layer){
        var t=byId[layer.id];
        var reason=layer.role==='foundation'?'Required support for '+layer.supports.map(function(id){return byId[id].short;}).join(', ')+'.':(result.belowThreshold?'Highest score among feasible options.':'Meets the illustrative scoring rule.');
        return el('li',{class:'package-layer '+layer.role},[el('span',{class:'package-role'},layer.role==='foundation'?'Supporting measure':'Selected tool'),el('h4',{},link(t.id)),p(t.role+'. '+reason),p('Lab intrusion: '+word(t,'invasiveness').toLowerCase(),'cell-caption')]);
      })));
    }
    if(result.blocked.length){
      box.appendChild(el('div',{class:'tradeoff-alert'},[el('strong',{},'Supporting measures must also fit the ceiling.'),list(result.blocked.map(function(row){return [link(row.id),': ',explainExcluded(row)];})),p('These tools are omitted from the package. Relaxing the ceiling exposes the alternative; it is not added automatically.')]));
    }
    if(!result.empty){
      var gaps=[];var ids=result.layers.map(function(l){return l.id;});
      if(ids.indexOf('ledger')>=0)gaps.push('An inventory does not establish what registered chips compute, and omissions can leave hidden capacity.');
      if(ids.indexOf('metering')>=0)gaps.push('Metering requires project aggregation and reporting duties that cover relevant self-operated capacity.');
      if(ids.indexOf('bandwidth')>=0)gaps.push('Bandwidth limits leave within-pod training and lower-communication methods to be addressed.');
      if(ids.indexOf('evaluations')>=0)gaps.push('Evaluations see submitted models under test; a release gate can still permit internal development.');
      if(ids.indexOf('inspections')>=0)gaps.push('Periodic inspections require continuity measures and information about undeclared sites.');
      gaps.push('Combined detection, total cost and state acceptance have not been estimated. Shared blind spots may remain.');
      var costInfo=['burden','invasiveness'].map(function(key){var n=Math.max.apply(null,ids.map(function(id){return byId[id].scores[key].score;}));return (key==='burden'?'Government burden':'Lab invasiveness')+': '+data.words.cost[n-1].toLowerCase();});
      box.appendChild(el('div',{class:'package-limits'},[el('h4',{},'What this selection leaves unresolved'),list(gaps),el('div',{class:'package-costs'},[el('strong',{},'Heaviest included component'),p(costInfo.join(' · '))]),p('These are component maxima, not estimates of the package’s total costs.','small')]));
    }
    var excluded=result.excluded.map(function(row){return el('div',{class:'excluded-item'},[el('strong',{},link(row.id)),p(explainExcluded(row))]);});
    if(excluded.length)box.appendChild(disclosure('Why other tools are omitted',excluded));
    var terms=list(data.criteria.map(function(c){return c.label+': weight '+result.weights[c.id];}));terms.className='weight-list';
    var table=el('table',{class:'arithmetic'},[
      el('caption',{class:'sr-only'},'Selection arithmetic, with full dependency checks'),
      el('thead',{},el('tr',{},['Tool','Weighted score / 5','Score threshold','Full support within ceiling'].map(function(x){return el('th',{scope:'col'},x);}))),
      el('tbody',{},result.rows.map(function(row){return el('tr',{},[el('th',{scope:'row'},byId[row.id].short),el('td',{},row.num+' ÷ '+row.den+' = '+row.value.toFixed(2)),el('td',{},row.meetsThreshold?'Meets':'Below'),el('td',{},row.feasible?'Yes':'No')]);}))
    ]);
    var arithmetic=el('div',{class:'table-scroll',role:'region','aria-label':'Package selection arithmetic',tabindex:'0'},table);
    box.appendChild(disclosure('How this selection was worked out',[
      p('Scores run from one to five. Cost scores are reversed as 6 minus the score. The weighted average must be at least '+data.builder.threshold.toFixed(1)+' for selection. This is a convention, not an estimate of effectiveness.','small'),terms,
      p('Each candidate is checked together with its full chain of supporting tools before selection. Candidates with any component above the invasiveness ceiling are excluded.','small'),arithmetic
    ]));
    var sens=engine.sensitivity(data,choices);
    box.appendChild(disclosure('How sensitive is the selection to the scores?',[
      p('The displayed set changes in '+sens.changed+' of '+sens.total+' one-point score changes.','sensitivity-text'),
      p('Each check moves one of the thirty tool–criterion scores up or down by one, staying within the one-to-five scale, then reruns selection with your choices. All other scores stay fixed.','small muted'),
      p('This is a local sensitivity check, not a probability or confidence interval. It does not test simultaneous score changes, alternative dependencies or different policy objectives.','small muted')
    ]));
    document.getElementById('package-status').textContent=(result.empty?'No feasible package.':'Package updated: '+result.layers.map(function(l){return byId[l.id].name;}).join(', ')+'.')+(result.blocked.length?' A supporting measure exceeds your ceiling; the affected tool is omitted.':'');
  }
  var form=document.getElementById('package-form');
  if(form&&engine){
    document.getElementById('package-explorer').hidden=false;
    function choices(){return {priorities:Array.from(form.querySelectorAll('input[name="priority"]:checked')).map(function(i){return i.value;}),maxInvasiveness:form.querySelector('input[name="limit"]:checked').value};}
    function refresh(){
      var ch=choices(),max=data.builder.maxPicks;
      Array.from(form.querySelectorAll('input[name="priority"]')).forEach(function(i){i.disabled=!i.checked&&ch.priorities.length>=max;});
      document.getElementById('pick-count').textContent=ch.priorities.length+' of '+max+' selected'+(ch.priorities.length===max?' — deselect one to choose another.':'');
      renderResult(ch);
    }
    form.addEventListener('submit',function(e){e.preventDefault();});form.addEventListener('change',refresh);
    form.addEventListener('reset',function(e){e.preventDefault();form.querySelectorAll('input[name="priority"]').forEach(function(i){i.checked=false;i.disabled=false;});form.querySelector('input[value="any"]').checked=true;refresh();});refresh();
  }
  var search=document.getElementById('glossary-search');
  if(search){
    search.parentElement.hidden=false;var entries=Array.from(document.querySelectorAll('.glossary-entry'));
    search.addEventListener('input',function(){var q=search.value.trim().toLowerCase(),n=0;entries.forEach(function(e){e.hidden=e.dataset.search.indexOf(q)<0;if(!e.hidden)n++;});document.getElementById('glossary-count').textContent=n+' '+(n===1?'term':'terms')+' shown.';});
  }
  // Add definitions only to the first occurrence of selected terms. Without JS,
  // the underlying text remains intact, and the full glossary is still present.
  var definitions=Object.create(null);Object.keys(data.glossary).forEach(function(k){definitions[k.toLowerCase()]={term:k,text:data.glossary[k]};});
  var wanted=['verification','compute','inference','elicitation','FLOP','H100-equivalent','post-training','overhang','frontier AI','model weights'].filter(function(k){return definitions[k.toLowerCase()];});
  var pattern=new RegExp('\\b('+wanted.sort(function(a,b){return b.length-a.length;}).map(function(k){return k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}).join('|')+')\\b','gi'),seen=Object.create(null);
  document.querySelectorAll('[data-prose]').forEach(function(area){
    var walker=document.createTreeWalker(area,NodeFilter.SHOW_TEXT),nodes=[],node;
    while((node=walker.nextNode()))if(node.parentElement&&!node.parentElement.closest('a,button,h1,h2,h3,h4,strong,summary'))nodes.push(node);
    nodes.forEach(function(n){var s=n.textContent,start=0,m,frag=document.createDocumentFragment(),changed=false;pattern.lastIndex=0;
      while((m=pattern.exec(s))){var key=m[0].toLowerCase();if(seen[key])continue;seen[key]=true;changed=true;frag.appendChild(document.createTextNode(s.slice(start,m.index)));frag.appendChild(el('button',{type:'button',class:'term term-print','data-term':key,'aria-expanded':'false','aria-controls':'definition'},m[0]));start=m.index+m[0].length;}
      if(changed){frag.appendChild(document.createTextNode(s.slice(start)));n.replaceWith(frag);}
    });
  });
  var popup=document.getElementById('definition'),anchor=null;
  function close(restore){popup.hidden=true;if(anchor){anchor.setAttribute('aria-expanded','false');if(restore)anchor.focus();}anchor=null;}
  document.addEventListener('click',function(e){
    var button=e.target.closest('.term');
    if(button){
      if(anchor===button){close(true);return;}close(false);anchor=button;var definition=definitions[button.dataset.term];
      popup.querySelector('strong').textContent=definition.term;popup.querySelector('p').textContent=definition.text;
      popup.querySelector('a').href='index.html#glossary';popup.hidden=false;button.setAttribute('aria-expanded','true');
      var rect=button.getBoundingClientRect(),width=popup.offsetWidth,height=popup.offsetHeight;
      popup.style.left=Math.max(12,Math.min(rect.left,window.innerWidth-width-12))+'px';
      popup.style.top=Math.max(12,rect.bottom+height+20<window.innerHeight?rect.bottom+8:rect.top-height-8)+'px';return;
    }
    if(e.target.closest('.definition-close'))close(true);else if(!e.target.closest('#definition'))close(false);
  });
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!popup.hidden)close(true);});
  window.addEventListener('scroll',function(){if(!popup.hidden)close(false);},{passive:true});
  window.addEventListener('resize',function(){if(!popup.hidden)close(false);});
  // Keep the chapter guide useful on long desktop pages.
  var navLinks=Array.from(document.querySelectorAll('.contents a')).filter(function(a){return a.hash;});
  function updateNav(){var current=navLinks[0];navLinks.forEach(function(a){var n=document.getElementById(a.hash.slice(1));if(n&&n.getBoundingClientRect().top<window.innerHeight*.35)current=a;});navLinks.forEach(function(a){if(a===current)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}
  window.addEventListener('scroll',updateNav,{passive:true});updateNav();
  document.querySelectorAll('.print-button').forEach(function(b){b.addEventListener('click',function(){window.print();});});
  var opened=[];
  window.addEventListener('beforeprint',function(){close(false);opened=Array.from(document.querySelectorAll('details')).filter(function(d){return !d.open;});opened.forEach(function(d){d.open=true;});document.querySelectorAll('.glossary-entry').forEach(function(e){e.hidden=false;});});
  window.addEventListener('afterprint',function(){opened.forEach(function(d){d.open=false;});opened=[];if(search)search.dispatchEvent(new Event('input'));});
})();
