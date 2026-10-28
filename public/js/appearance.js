// Appearance is local to the account, independent of workouts and campaigns.
const KEY = 'fitapp_appearance';
const defaults = () => ({version:1,theme:'system',effects:'full'});
export function readAppearance() {
    try {
        if (!globalThis.FitStore?.uid) return defaults();
        const value = JSON.parse(globalThis.FitStore.get(KEY) || 'null');
        return value?.version === 1 && ['system','light','dark'].includes(value.theme) && ['full','reduced'].includes(value.effects) ? value : defaults();
    } catch { return defaults(); }
}
export const effectsReduced = () => document.documentElement.dataset.effects === 'reduced' || matchMedia('(prefers-reduced-motion: reduce)').matches;

export function setupAppearance() {
    const dark = matchMedia('(prefers-color-scheme: dark)');
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const root = document.documentElement;
    const themeControl = document.getElementById('appearanceTheme');
    const effectsControl = document.getElementById('appearanceEffects');
    const status = document.getElementById('appearanceStatus');
    function apply() {
        const preference = readAppearance();
        const theme = preference.theme === 'system' ? (dark.matches ? 'dark' : 'light') : preference.theme;
        const effects = motion.matches || preference.effects === 'reduced' ? 'reduced' : 'full';
        const changed = root.dataset.theme !== theme || root.dataset.effects !== effects;
        root.dataset.theme = theme;
        root.dataset.effects = effects;
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#080d1b' : '#f5f7ff');
        if (themeControl) themeControl.value = preference.theme;
        if (effectsControl) effectsControl.value = preference.effects;
        if (status) status.textContent = motion.matches ? 'A redução de movimento do dispositivo está ativa.' : 'Preferências salvas apenas nesta conta e neste dispositivo.';
        if (changed) window.dispatchEvent(new Event('fitapp:appearancechange'));
    }
    function save() {
        try {
            if (!globalThis.FitStore?.uid) throw new Error('signed-out');
            globalThis.FitStore.set(KEY, JSON.stringify({version:1,theme:themeControl.value,effects:effectsControl.value}));
            apply();
        } catch {
            apply();
            if (status) status.textContent = 'Não foi possível salvar a aparência. A preferência anterior foi mantida.';
            globalThis.FitApp?.showToast('Não foi possível salvar a aparência neste dispositivo.');
        }
    }
    themeControl?.addEventListener('change', save);
    effectsControl?.addEventListener('change', save);
    dark.addEventListener('change', apply);
    motion.addEventListener('change', apply);
    window.addEventListener('storage', apply);
    window.addEventListener('fitapp:accountchange', apply);
    window.addEventListener('fitapp:datachange', event => {
        if (event.detail?.key === KEY || event.detail?.keys?.includes(KEY)) apply();
    });
    globalThis.firebase?.auth().onAuthStateChanged(apply);
    apply();
}
