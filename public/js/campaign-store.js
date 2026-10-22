// Commit metadata first and the complete plan last. No intermediate events are emitted.
export function commitWorkoutPlan(store,campaign,{resetCount=false}={}){
    const values={
        ...(resetCount?{fitapp_campaign_count:'0'}:{}),
        fitapp_main_method:campaign.method,fitapp_profile:campaign.profile,fitapp_level:campaign.level,
        fitapp_onboarding_done:'true',fitapp_campaign_data:JSON.stringify(campaign)
    };
    if(store.setMany(values)!==true)throw new Error('Não foi possível gravar o plano. O plano anterior foi mantido.');
}
