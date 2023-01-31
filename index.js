// async function dadJokes() {
//   try {
//     const response = await fetch('https://icanhazdadjoke.com/slack')
//     const json = await response.json()
//     return json.attachments[0].text
//   } catch (error) {
//     console.error(error)
//   }
// }

const https = require('https')

function dadJokes() {
  return new Promise((resolve, reject) => {
    https
      .get('https://icanhazdadjoke.com/slack', (res) => {
        let data = ''

        res.on('data', (chunk) => {
          data += chunk
        })

        res.on('end', () => {
          try {
            const response = JSON.parse(data)
            resolve(response.attachments[0].text)
          } catch (error) {
            reject(error)
          }
        })
      })
      .on('error', (error) => {
        reject(error)
      })
  })
}

dadJokes()
  .then((joke) => {
    console.log(joke)
  })
  .catch((error) => {
    console.error(error)
  })

module.exports = dadJokes
