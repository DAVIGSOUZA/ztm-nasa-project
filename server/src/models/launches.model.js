const launches = new Map()

let latestFlightNumber = 100

const launch = {
  flightNumber: 100,
  mission: 'Test 1',
  rocket: 'Explorer Mark I',
  launchDate: new Date('December 12, 2030'),
  destination: 'Kepler-62 f',
  customer: ['ZTM'],
  upcoming: true,
  success: true,
}

launches.set(launch.flightNumber, launch)

function existsLaunchWithId(launchId) {
  return launches.has(launchId)
}

function getAllLaunches() {
  return Array.from(launches.values())
}

function addLaunch(launch) {
  latestFlightNumber++
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      success: true,
      upcoming: true,
      customer: ['ZTM'],
      flightNumber: latestFlightNumber
    })
  )
}

function abortLaunchById(launchId) {
  const aborted = launches.get(launchId)
  aborted.upcoming = false
  aborted.success = false

  return aborted
}


module.exports = {
  getAllLaunches,
  addLaunch,
  existsLaunchWithId,
  abortLaunchById
}