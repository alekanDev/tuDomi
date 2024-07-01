
const selectServer = (enviroment) => {
  switch(enviroment){
    case 'LOCAL_SUSY':
      return 'http://192.168.100.85:5500'
    case 'LOCAL_SAMY':
      return 'http://10.10.0.246:5500'
  }
}

const API_SERVER = selectServer('LOCAL_SAMY')

export const login_auth = async (dataRequest) => {
  return await fetch(`${API_SERVER}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataRequest)
  })
  .then(response => response.json())
  .then(data => {
    return data
  })
  .catch(err => {
    return err
  })
}