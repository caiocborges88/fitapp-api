import test from 'node:test';
import assert from 'node:assert/strict';
import {emptyCampaign,mergeCampaign} from '../public/js/sync-domain.js';
const template=(name='Original')=>({id:'one',name,routine:[{title:'Bloco',exercises:[{id:'exercise',name:'Supino',sets:3}]}]});
const campaign=(templates=[template()],extra={})=>({...emptyCampaign(),custom_workouts:JSON.stringify(templates),...extra});
const records=result=>JSON.parse(result.payload.custom_workouts);
test('edições concorrentes conservam versões independentes e cópia estável',()=>{
    const base=campaign(),local=campaign([template('Local')]),remote=campaign([template('Remota')]);
    const merged=mergeCampaign(base,local,remote),again=mergeCampaign(base,local,merged.payload);
    assert.equal(records(merged).length,2);assert.equal(records(merged)[0].name,'Remota');
    const copy=records(merged)[1];assert.match(copy.name,/Local/);assert.notEqual(copy.routine[0].exercises[0].id,'exercise');
    assert.deepEqual(records(again),records(merged));
});
test('exclusão vence cópia antiga e preserva edição simultânea como ficha independente',()=>{
    const base=campaign(),deleted=campaign([],{deleted_templates:'["one"]'});
    assert.deepEqual(records(mergeCampaign(base,base,deleted)),[]);
    const edited=mergeCampaign(base,campaign([template('Nova edição')]),deleted);
    assert.equal(records(edited).length,1);assert.notEqual(records(edited)[0].id,'one');
    assert.deepEqual(records(mergeCampaign(emptyCampaign(),base,deleted)),[]);
});
test('preferências e plano conflitantes mantêm versão recuperável com contagem',()=>{
    const base=campaign([]),local=campaign([],{campaign_data:'{"id":"local"}',campaign_count:'3'}),remote=campaign([],{campaign_data:'{"id":"remote"}',campaign_count:'8'});
    const merged=mergeCampaign(base,local,remote);
    assert.equal(merged.payload.campaign_data,remote.campaign_data);assert.equal(merged.conflicts[0].local.campaign_count,'3');
});
test('progresso do mesmo plano soma apenas diferenças e preserva adições distintas',()=>{
    const base=campaign([],{campaign_data:'{"id":"plan"}',campaign_count:'4'});
    const local={...base,campaign_count:'5',custom_workouts:JSON.stringify([template('Local')])};
    const remote={...base,campaign_count:'6',custom_workouts:JSON.stringify([{...template('Remota'),id:'two'}])};
    const merged=mergeCampaign(base,local,remote);assert.equal(merged.payload.campaign_count,'7');assert.equal(records(merged).length,2);
});
