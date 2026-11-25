'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const engine=require('../js/package.js');
const data=JSON.parse(fs.readFileSync(path.join(__dirname,'../data/assessments.json'),'utf8'));
const byId=Object.fromEntries(data.interventions.map(t=>[t.id,t]));
const criteria=data.criteria.map(c=>c.id);
let combinations=[];
function choose(start,selected){combinations.push(selected);if(selected.length===3)return;for(let i=start;i<criteria.length;i++)choose(i+1,selected.concat(criteria[i]));}
choose(0,[]);
let cases=0;
for(const priorities of combinations){
  for(const maxInvasiveness of ['low','medium','any']){
    const r=engine.build(data,{priorities,maxInvasiveness});
    const included=new Set(r.layers.map(l=>l.id));
    for(const id of included){
      assert.ok(byId[id].scores.invasiveness.score<=r.limit,`Ceiling breach: ${id}`);
      for(const dependency of byId[id].dependsOn)assert.ok(included.has(dependency),`Missing support: ${dependency}`);
    }
    for(const row of r.rows){
      if(row.feasible&&row.meetsThreshold)assert.ok(included.has(row.id));
      if(row.violations.length)assert.ok(!included.has(row.id));
    }
    cases++;
  }
}
const low=engine.build(data,{priorities:[],maxInvasiveness:'low'});
assert.deepEqual(low.layers.map(l=>l.id).sort(),['ledger','metering']);
assert.deepEqual(low.rows.find(r=>r.id==='bandwidth').violations,['inspections']);
const all=engine.build(data,{});assert.ok(all.layers.some(l=>l.id==='inspections'&&l.role==='foundation'));
const immutable=JSON.stringify(data);const sens=engine.sensitivity(data,{maxInvasiveness:'low'});
assert.ok(sens.total>0&&sens.changed>=0&&sens.changed<=sens.total);assert.equal(JSON.stringify(data),immutable);
const bad=JSON.parse(immutable);bad.interventions[0].dependsOn=['bandwidth'];assert.throws(()=>engine.build(bad,{}),/cycle/);
const missing=JSON.parse(immutable);missing.interventions[0].dependsOn=['missing'];assert.throws(()=>engine.build(missing,{}),/Missing dependency/);
const none=JSON.parse(immutable);none.interventions.forEach(t=>t.scores.invasiveness.score=5);assert.equal(engine.build(none,{maxInvasiveness:'low'}).empty,true);
const weak=JSON.parse(immutable);weak.interventions.forEach(t=>Object.keys(t.scores).forEach(k=>t.scores[k].score=['burden','invasiveness'].includes(k)?5:1));assert.equal(engine.build(weak,{}).belowThreshold,true);
console.log(`PASS: ${cases} priority/ceiling combinations; dependency conflicts; empty and below-threshold results; sensitivity immutability; invalid graphs.`);
