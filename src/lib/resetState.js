export default function resetState(state, setState) {
  const resetState = Object.keys(state).reduce((acc, key) => {
    acc[key] = ""; // Tüm alanların değerini boş yapıyoruz
    return acc;
  }, {});

  setState(resetState);
}
