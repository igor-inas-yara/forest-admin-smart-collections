const PLANETS = [
    {id: "00001", name: "Mercury"},
    {id: "00002", name: "Venus"},
    {id: "00003", name: "Earth"},
    {id: "00004", name: "Mars"},
];

const COUNTRIES = [
    {id: "00001", name: "USA", planet: PLANETS.find(planet => planet.id === "00003")},
    {id: "00002", name: "Russia", planet: PLANETS.find(planet => planet.id === "00003")},
    {id: "00003", name: "China", planet: PLANETS.find(planet => planet.id === "00003")},
    {id: "00004", name: "Musktopia", planet: PLANETS.find(planet => planet.id === "00004")},
];

module.exports = {COUNTRIES, PLANETS}
