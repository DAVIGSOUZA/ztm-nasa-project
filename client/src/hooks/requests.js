const API_BASE_URL = 'http://localhost:8000'

async function httpGetPlanets() {
  const res = await fetch(`${API_BASE_URL}/planets`)

  return await res.json()
}

async function httpGetLaunches() {
  const res = await fetch(`${API_BASE_URL}/launches`)

  const launches = await res.json().sort((a, b) => a.flightNumber - b.flightNumber)
  
  return await launches
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};