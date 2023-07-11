const { getAllLaunches, addLaunch } = require('../../models/launches.model')

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches())
}

function httpAddLaunch(req, res) {
  const launch = req.body 

  if (!launch.mission 
    || !launch.rocket 
    || !launch.destination 
    || !launch.launchDate
  ) {
    return res.status(400).json({error: 'Missing required property'})
  }

  launch.launchDate = new Date(launch.launchDate)

  if (isNaN(launch.launchDate)) {
    return res.status(400).json({error: 'Invalid Launch date'})
  }

  addLaunch(launch)

  return res.status(201).json(launch)
}

module.exports = {
  httpGetAllLaunches,
  httpAddLaunch
}