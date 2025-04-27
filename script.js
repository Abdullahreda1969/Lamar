// Planet Quiz with visual feedback
// When clicking a planet, show its info
fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
  .then(response => response.json())
  .then(data => {
    document.getElementById('fact-text').innerHTML = `
      <strong>${data.title}</strong>: ${data.explanation} 
      <img src="${data.url}" width="200">
    `;
  });
document.querySelectorAll('.planet').forEach(planet => {
    planet.addEventListener('click', () => {
      alert(`You clicked ${planet.alt}! Fun fact: ${getPlanetFact(planet.alt)}`);
    });
  });
  
  function getPlanetFact(planetName) {
    const facts = {
      'Mercury': 'A day here is longer than a year!',
      'Venus': 'Spins backwards compared to Earth.'
      // Add more
    };
    return facts[planetName] || 'No fact yet!';
  }
document.getElementById('quiz-btn').addEventListener('click', startQuiz);

function startQuiz() {
  const planets = [
    { name: "Jupiter", fact: "Has 92 known moons!", emoji: "🪐" },
    { name: "Saturn", fact: "Famous for its rings", emoji: "🪐" },
    { name: "Mars", fact: "Home to Olympus Mons", emoji: "🔴" }
  ];
  
  const answer = planets[Math.floor(Math.random() * planets.length)];
  const guess = prompt(`Which planet has the most moons? (${planets.map(p => p.name).join(', ')})`);

  const resultEl = document.getElementById('quiz-result');
  resultEl.classList.remove('hidden');

  if (guess && guess.toLowerCase() === answer.name.toLowerCase()) {
    resultEl.innerHTML = `
      <h3>Correct! ${answer.emoji}</h3>
      <p>${answer.name} ${answer.fact}</p>
      <img src="images/${answer.name.toLowerCase()}.png" width="100">
    `;
  } else {
    resultEl.innerHTML = `
      <h3>Nice try! It was ${answer.name}</h3>
      <p>${answer.fact}</p>
      <button onclick="startQuiz()">Try Again</button>
    `;
  }
}