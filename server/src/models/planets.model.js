const fs = require('fs')
const path = require('path')
const { parse } = require('csv-parse')

const planets = []

const options = {
  comment: '#',
  columns: true
}

function isHabitable(planet) {
  return (
    planet['koi_disposition'] === 'CONFIRMED' 
    && planet['koi_insol'] > 0.36
    && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6
  )
}

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'keplerData.csv'))
      .pipe(parse(options))
      .on('data', (planet) => isHabitable(planet) && planets.push(planet))
      .on('error', (error) => reject(error))
      .on('end', () => resolve())
  })
}

function getAllPlanets() {
  return planets
}

module.exports = {
  loadPlanetsData,
  getAllPlanets
}