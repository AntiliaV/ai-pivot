/* Pure package selection. A ceiling applies to the full dependency closure. */
(function (root) {
  'use strict';
  function validate(data) {
    var map=Object.create(null);
    data.interventions.forEach(function(t){
      if(map[t.id])throw Error('Duplicate tool: '+t.id);
      map[t.id]=t;
      data.criteria.forEach(function(c){var n=t.scores[c.id].score;if(!Number.isInteger(n)||n<1||n>5)throw Error('Invalid score');});
    });
    var done=Object.create(null),active=Object.create(null);
    function visit(id){
      if(!map[id])throw Error('Missing dependency: '+id);
      if(active[id])throw Error('Dependency cycle: '+id);
      if(done[id])return;
      active[id]=true;(map[id].dependsOn||[]).forEach(visit);active[id]=false;done[id]=true;
    }
    Object.keys(map).forEach(visit);return map;
  }
  function closure(id,map){
    var out=[];
    function visit(key){(map[key].dependsOn||[]).forEach(visit);if(out.indexOf(key)<0)out.push(key);}
    visit(id);return out;
  }
  function build(data,raw){
    raw=raw||{};var map=validate(data),cfg=data.builder;
    var valid=data.criteria.map(function(c){return c.id;});
    var priorities=(raw.priorities||[]).filter(function(x,i,a){return valid.indexOf(x)>=0&&a.indexOf(x)===i;}).slice(0,cfg.maxPicks);
    var limitName=Object.prototype.hasOwnProperty.call(cfg.invasivenessLimits,raw.maxInvasiveness)?raw.maxInvasiveness:'any';
    var limit=cfg.invasivenessLimits[limitName],weights={},den=0;
    data.criteria.forEach(function(c){weights[c.id]=priorities.indexOf(c.id)>=0?cfg.pickedWeight:cfg.baseWeight;den+=weights[c.id];});
    var rows=data.interventions.map(function(t){
      var terms=data.criteria.map(function(c){var raw=t.scores[c.id].score;return {id:c.id,raw:raw,oriented:c.kind==='cost'?6-raw:raw,weight:weights[c.id]};});
      var num=terms.reduce(function(n,c){return n+c.oriented*c.weight;},0);
      var required=closure(t.id,map),violations=required.filter(function(id){return map[id].scores.invasiveness.score>limit;});
      return {id:t.id,value:num/den,num:num,den:den,terms:terms,required:required,violations:violations,feasible:violations.length===0,meetsThreshold:num>=cfg.threshold*den-1e-9};
    });
    var selected=rows.filter(function(r){return r.feasible&&r.meetsThreshold;}).map(function(r){return r.id;});
    var belowThreshold=false;
    if(!selected.length){
      var feasible=rows.filter(function(r){return r.feasible;}).sort(function(a,b){return b.value-a.value;});
      if(feasible.length){selected=[feasible[0].id];belowThreshold=true;}
    }
    var ids=[];selected.forEach(function(id){closure(id,map).forEach(function(k){if(ids.indexOf(k)<0)ids.push(k);});});
    var layers=ids.map(function(id){return {id:id,role:selected.indexOf(id)>=0?'selected':'foundation',supports:ids.filter(function(k){return (map[k].dependsOn||[]).indexOf(id)>=0;})};});
    return {priorities:priorities,limitName:limitName,limit:limit,weights:weights,rows:rows,selected:selected,layers:layers,belowThreshold:belowThreshold,empty:!layers.length,excluded:rows.filter(function(r){return ids.indexOf(r.id)<0;}),blocked:rows.filter(function(r){return !r.feasible&&map[r.id].scores.invasiveness.score<=limit;})};
  }
  function sensitivity(data,choices){
    var base=build(data,choices).layers.map(function(l){return l.id;}).sort().join(','),changed=0,total=0;
    data.interventions.forEach(function(t,index){data.criteria.forEach(function(c){[-1,1].forEach(function(delta){
      var n=t.scores[c.id].score+delta;if(n<1||n>5)return;
      var copy=JSON.parse(JSON.stringify(data));copy.interventions[index].scores[c.id].score=n;
      var signature=build(copy,choices).layers.map(function(l){return l.id;}).sort().join(',');total++;if(signature!==base)changed++;
    });});});return {changed:changed,total:total};
  }
  var api={build:build,sensitivity:sensitivity,validate:validate};
  root.PacingPackage=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
