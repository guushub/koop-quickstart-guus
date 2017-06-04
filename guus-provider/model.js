const request = require('request');

module.exports = function () {
  this.getData= function(req, callback) {

    // Not using id and host
    request(`http://ec2-52-58-96-117.eu-central-1.compute.amazonaws.com/`, (err, res, body) => {
      // if the http request fails stop processing and return and call back with an error
      if (err) return callback(err)
      // translate the raw response from Craigslist into GeoJSON
      const geojson = translate(res.body)
      // add a little bit of metadata to enrich the geojson
      // metadata is handled by the output plugin that is responding to the request. 
      // e.g. https://github.com/koopjs/koop-output-geoservices
      geojson.metadata = {
        name: `guus-provider`,
        description: `Guus' golf en winddata proxy van RWS Waterinfo`
      }
      
      // hand the geojson back to Koop
      callback(null, geojson)
    })
  }
}

function translate (data) {
  const dataParsed = JSON.parse(data)
  const featureCollection = {
    type: 'FeatureCollection',
    features: []
  }
  if (dataParsed && dataParsed.features) {
    featureCollection.features = dataParsed.features.map(formatFeature)
  }
  return featureCollection
}

function formatFeature (record) {
  const feature =  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [record.location.lon, record.location.lat]
    },
    properties: {
      loc: record.loc,
      locatienaam: record.locatienaam,
      par: record.par,
      locationSlug: record.locationSlug,
      expertParameter: record.expertParameter,
      waarde: record.waarde,
      meettijd: record.meettijd
    }
  }

 return feature
}

