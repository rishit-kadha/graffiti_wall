

const DATED = {
 
  "01-14": { prompt: "The sky is full of colour today. Draw something that drifts, soars, or catches the wind 🪁", emoji: "🪁", theme: "Kite Season" },
  "01-15": { prompt: "Something is being made with care — warmth, plenty, and a pattern on the ground 🌾", emoji: "🌾", theme: "Harvest" },
  "03-17": { prompt: "Every surface is a different colour. The air itself has changed. Draw what you see 🎨", emoji: "🎨", theme: "Colour Chaos" },
  "04-14": { prompt: "Gold fields, a new sky, a beginning. Draw something that feels like the first day 🌅", emoji: "🌅", theme: "New Beginning" },
  "10-02": { prompt: "Draw stillness — something that carries meaning without making a sound 🕊️", emoji: "🕊️", theme: "Stillness" },
  "10-24": { prompt: "The night is lit from below. Tiny flames everywhere. Draw what the dark looks like when it isn't dark ✨", emoji: "✨", theme: "A Thousand Lights" },
  "11-01": { prompt: "The sky still has colour in it. Trails of light, smoke, sparks. Draw the morning after 🎆", emoji: "🎆", theme: "After the Light" },
  "11-15": { prompt: "A warm glow moving through the night. Draw light on water, or light held in someone's hands 🏮", emoji: "🏮", theme: "Carried Light" },

  "01-01": { prompt: "A blank page. Draw what you want this year to feel like 🎉", emoji: "🎉", theme: "Year Zero" },
  "02-14": { prompt: "Draw something you'd give to someone without saying a word 💘", emoji: "💘", theme: "Without Words" },
  "03-08": { prompt: "Draw someone who holds things together without being asked 💜", emoji: "💜", theme: "Quiet Strength" },
  "03-14": { prompt: "Draw the most perfect curve you can. Then keep going 🥧", emoji: "🥧", theme: "Perfect Circle" },
  "04-01": { prompt: "Draw something that makes no sense at all. The stranger the better 🃏", emoji: "🃏", theme: "Makes No Sense" },
  "04-22": { prompt: "Draw the world you wish you lived on 🌍", emoji: "🌍", theme: "The World You Want" },
  "05-04": { prompt: "Space, swords, and something between good and evil. Draw what that looks like ⚔️", emoji: "⚔️", theme: "Between Stars" },
  "06-21": { prompt: "Draw what your favourite song looks like if it had a landscape 🎶", emoji: "🎶", theme: "Song as Place" },
  "07-04": { prompt: "Draw an explosion of colour — the bigger and louder the better 🎆", emoji: "🎆", theme: "Loud Colour" },
  "10-31": { prompt: "Draw something that unsettles. Not scary — just *off* 🎃", emoji: "🎃", theme: "Something Off" },
  "11-05": { prompt: "A face in smoke. A glow in the dark. Draw something hidden in fire 🔥", emoji: "🔥", theme: "Hidden in Fire" },
  "12-24": { prompt: "Draw the warmest corner of the coldest night 🎄", emoji: "🎄", theme: "Warm Corner" },
  "12-25": { prompt: "Draw joy — not the symbol of it, the feeling of it 🎁", emoji: "🎁", theme: "Pure Joy" },
  "12-31": { prompt: "Draw the last hour. The last colour. The last thing before something new ⏳", emoji: "⏳", theme: "Last Hour" },

  "03-03": { prompt: "Draw something delicate — something you'd be afraid to touch 🎎", emoji: "🎎", theme: "Delicate" },
  "05-05": { prompt: "Draw strength — not a person, just the feeling of it 🎏", emoji: "🎏", theme: "Strength" },
  "07-07": { prompt: "Draw two things separated by distance but still connected 🎋", emoji: "🎋", theme: "Across the Distance" },
};

const ROTATING = [
 
  { prompt: "Draw Zero Two 💘", emoji: "💘", theme: "Zero Two" },
  { prompt: "Draw Rem 💙", emoji: "💙", theme: "Rem" },
  { prompt: "Draw Makima 🐕", emoji: "🐕", theme: "Makima" },
  { prompt: "Draw Nezuko 🎍", emoji: "🎍", theme: "Nezuko" },
  { prompt: "Draw Miku Nakano 🎧", emoji: "🎧", theme: "Miku Nakano" },
  { prompt: "Draw Yor Forger 🗡️", emoji: "🗡️", theme: "Yor Forger" },
  { prompt: "Draw Levi Ackerman ⚔️", emoji: "⚔️", theme: "Levi Ackerman" },
  { prompt: "Draw Itadori Yuji 🩸", emoji: "🩸", theme: "Itadori" },
  { prompt: "Draw Gojo Satoru ♾️", emoji: "♾️", theme: "Gojo Satoru" },
  { prompt: "Draw Killua Zoldyck ⚡", emoji: "⚡", theme: "Killua" },
  { prompt: "Draw Hinata Hyuga 👁️", emoji: "👁️", theme: "Hinata" },
  { prompt: "Draw Mikasa Ackerman 🧣", emoji: "🧣", theme: "Mikasa" },
  { prompt: "Draw Power 😈", emoji: "😈", theme: "Power" },
  { prompt: "Draw Nami 🌩️", emoji: "🌩️", theme: "Nami" },
  { prompt: "Draw Violet Evergarden ✉️", emoji: "✉️", theme: "Violet Evergarden" },
  { prompt: "Draw Saber 🤺", emoji: "🤺", theme: "Saber" },
  { prompt: "Draw Asuka Langley 🔴", emoji: "🔴", theme: "Asuka" },
  { prompt: "Draw Erza Scarlet ⚔️", emoji: "⚔️", theme: "Erza" },
  { prompt: "Draw Toga Himiko ❤️‍🔥", emoji: "❤️‍🔥", theme: "Toga" },
  { prompt: "Draw Shanks 🎩", emoji: "🎩", theme: "Shanks" },
  { prompt: "Draw Zoro 🗡️", emoji: "🗡️", theme: "Zoro" },
  { prompt: "Draw Luffy 🌊", emoji: "🌊", theme: "Luffy" },
  { prompt: "Draw Naruto 🍥", emoji: "🍥", theme: "Naruto" },
  { prompt: "Draw Sasuke 🌙", emoji: "🌙", theme: "Sasuke" },
  { prompt: "Draw Saitama 👊", emoji: "👊", theme: "Saitama" },
  { prompt: "Draw Tanjiro 🌊", emoji: "🌊", theme: "Tanjiro" },
  { prompt: "Draw Inosuke 🐗", emoji: "🐗", theme: "Inosuke" },
  { prompt: "Draw Fubuki ❄️", emoji: "❄️", theme: "Fubuki" },
  { prompt: "Draw Hinata Shoyo 🏐", emoji: "🏐", theme: "Hinata Shoyo" },
  { prompt: "Draw Anya Forger 🥜", emoji: "🥜", theme: "Anya" },
  { prompt: "Draw Sakurajima Mai 🐰", emoji: "🐰", theme: "Sakurajima Mai" },

  { prompt: "Draw anything — but only in shades of blue 💙", emoji: "💙", theme: "Monochrome Blue" },
  { prompt: "Red only 🔴 — anything at all", emoji: "🔴", theme: "Monochrome Red" },
  { prompt: "Black and gold only 🖤 — make it feel rich", emoji: "🖤", theme: "Gold & Black" },
  { prompt: "Sunset tones only — no other colours 🌅", emoji: "🌅", theme: "Sunset Palette" },
  { prompt: "Neon on black ⚡ — any subject you like", emoji: "⚡", theme: "Neon on Black" },
  { prompt: "Pastels only 🍬 — soft and sweet", emoji: "🍬", theme: "Pastel" },
  { prompt: "Greens only 🌿 — any shade, any subject", emoji: "🌿", theme: "All Green" },
  { prompt: "Pick exactly three colours and draw anything 🎨", emoji: "🎨", theme: "Three Colours" },
  { prompt: "Greyscale only ⬛ — let shadow do the work", emoji: "⬛", theme: "Greyscale" },
  { prompt: "Warm tones only 🔥 — reds, oranges, deep yellows", emoji: "🔥", theme: "Warm Palette" },
  { prompt: "Purple and pink only 💜 — anything goes", emoji: "💜", theme: "Purple & Pink" },

  { prompt: "Draw loneliness 🌑", emoji: "🌑", theme: "Loneliness" },
  { prompt: "Draw 3 AM ⏰", emoji: "⏰", theme: "3 AM" },
  { prompt: "Draw your earliest memory 📷", emoji: "📷", theme: "Earliest Memory" },
  { prompt: "Draw the sound of rain 🌧️", emoji: "🌧️", theme: "Sound of Rain" },
  { prompt: "Draw something that doesn't exist yet but should 🔮", emoji: "🔮", theme: "Not Yet Real" },
  { prompt: "Draw what gravity looks like 🌀", emoji: "🌀", theme: "Gravity" },
  { prompt: "Draw a dream you can barely remember 🛌", emoji: "🛌", theme: "Half-Remembered Dream" },
  { prompt: "Draw time ⌛", emoji: "⌛", theme: "Time" },
  { prompt: "Draw silence 🤫", emoji: "🤫", theme: "Silence" },
  { prompt: "Draw the colour of nostalgia 🌫️", emoji: "🌫️", theme: "Nostalgia" },
  { prompt: "Draw fear — without a face 🕳️", emoji: "🕳️", theme: "Faceless Fear" },
  { prompt: "Draw what hunger feels like 🍂", emoji: "🍂", theme: "Hunger" },
  { prompt: "Draw the last thing you thought about before falling asleep 🌙", emoji: "🌙", theme: "Last Thought" },

  { prompt: "Draw a storm from inside it 🌪️", emoji: "🌪️", theme: "Eye of the Storm" },
  { prompt: "Draw an underground world 🐠", emoji: "🐠", theme: "Underground" },
  { prompt: "Draw the moment before sunrise 🌄", emoji: "🌄", theme: "Before Dawn" },
  { prompt: "Draw a forest at night 🌕", emoji: "🌕", theme: "Moonlit Forest" },
  { prompt: "Draw ash and embers 🔥", emoji: "🔥", theme: "Aftermath" },
  { prompt: "Draw a place no one has ever been 🪐", emoji: "🪐", theme: "Undiscovered Place" },
  { prompt: "Draw the bottom of the ocean 🌊", emoji: "🌊", theme: "Abyss" },
  { prompt: "Draw a sky you've never seen 🌌", emoji: "🌌", theme: "Unknown Sky" },

  { prompt: "Draw a video game boss 🎮", emoji: "🎮", theme: "Boss Fight" },
  { prompt: "Draw your favourite album cover as graffiti 🎵", emoji: "🎵", theme: "Album Art" },
  { prompt: "Draw something modern in pixel art 👾", emoji: "👾", theme: "Pixel Modern" },
  { prompt: "Draw a Ghibli landscape 🌾", emoji: "🌾", theme: "Ghibli" },
  { prompt: "Draw a scene from the last thing you watched 🎬", emoji: "🎬", theme: "Screen Memory" },
  { prompt: "Draw a weapon with a personality 🗡️", emoji: "🗡️", theme: "Weapon" },
  { prompt: "Draw a villain you secretly like 😏", emoji: "😏", theme: "Favourite Villain" },
];

function getTodayChallenge(dateStr) {
  const mmdd = dateStr.slice(5);

  if (DATED[mmdd]) {
    return { date: dateStr, ...DATED[mmdd] };
  }

  const [y, m, d] = dateStr.split("-").map(Number);
  const start = Date.UTC(y, 0, 1);
  const now = Date.UTC(y, m - 1, d);
  const dayOfYear = Math.floor((now - start) / 86_400_000);
  const challenge = ROTATING[dayOfYear % ROTATING.length];

  return { date: dateStr, ...challenge };
}

module.exports = { getTodayChallenge };
