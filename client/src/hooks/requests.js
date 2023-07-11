const API_BASE_URL = 'http://localhost:8000'

async function httpGetPlanets() {
  const res = await fetch(`${API_BASE_URL}/planets`)

  return await res.json()
}

async function httpGetLaunches() {
  const res = await fetch(`${API_BASE_URL}/launches`)

  const launches = await res.json()

  return launches.sort((a, b) => a.flightNumber - b.flightNumber)
}

async function httpSubmitLaunch(launch) {
  try {
    const res = await fetch(`${API_BASE_URL}/launches`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(launch)
    })
  
    return res
  } catch (error) {
    return {ok: false}
  }
}

async function httpAbortLaunch(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/launches/${id}`, {
      method: 'delete'
    })
  
    return res
  } catch (error) {
    return {ok: false}
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};