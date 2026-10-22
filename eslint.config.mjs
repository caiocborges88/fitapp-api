import globals from 'globals';
export default [
  {ignores:['node_modules/**','functions/node_modules/**','public/vendor/**','audit/**','public/sw.js']},
  {files:['public/js/*.js'], languageOptions:{sourceType:'module',globals:{...globals.browser,firebase:'readonly',Chart:'readonly',html2canvas:'readonly',FitApp:'readonly',FitAPI:'readonly',FitGamification:'readonly',dictionaryData:'readonly',stickersDB:'readonly',dbWorkouts:'readonly',dbWorkoutsFeminino:'readonly',dbWorkoutsTatico:'readonly'}},rules:{'no-undef':'error','no-unreachable':'error','no-dupe-args':'error','no-dupe-keys':'error'}},
  {files:['functions/*.js','scripts/*.cjs'],languageOptions:{sourceType:'commonjs',globals:globals.node},rules:{'no-undef':'error','no-unreachable':'error'}}
];
