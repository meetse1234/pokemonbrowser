const types = [
  '', 'fire', 'water', 'grass', 'electric', 'bug', 'normal', 'poison',
  'ground', 'fairy', 'fighting', 'psychic', 'rock', 'ghost', 'ice', 'dragon'
];

const emojiMap = {
  fire: '🔥', water: '💧', grass: '🌿', electric: '⚡', bug: '🐛', normal: '🙂',
  poison: '☠️', ground: '🌍', fairy: '🧚', fighting: '🥊', psychic: '🔮',
  rock: '🪨', ghost: '👻', ice: '❄️', dragon: '🐉'
};

const TypeFilter = ({ setType }) => (
  <select onChange={(e) => setType(e.target.value)} className="type-filter">
    <option value=""> All types</option>
    {types.filter(Boolean).map(t => (
      <option key={t} value={t}>
        {emojiMap[t] || ''} {t.charAt(0).toUpperCase() + t.slice(1)}
      </option>
    ))}
  </select>
);

export default TypeFilter;
