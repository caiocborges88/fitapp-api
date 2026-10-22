const paths={
    share:'M12 16V3 M7 8l5-5 5 5 M4 13v7h16v-7',
    trash:'M3 6h18 M9 6V3h6v3 M6 6l1 15h10l1-15 M10 10v7 M14 10v7',
    swap:'M4 7h15l-4-4 M20 17H5l4 4',
    close:'M6 6l12 12 M18 6L6 18',
    clock:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18 M12 7v5l3 2',
    copy:'M9 9h12v12H9z M15 9V3H3v12h6',
    note:'M4 3h16v18H4z M8 7h8 M8 11h8 M8 15h5',
    video:'M3 5h18v14H3z M10 9l5 3-5 3z',
    gift:'M3 8h18v5H3z M5 13v8h14v-8 M12 8v13 M12 8C4 8 5 1 9 3l3 5c8 0 7-7 3-5z'
};
export function icon(name){
    return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="${paths[name]||paths.note}" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}
