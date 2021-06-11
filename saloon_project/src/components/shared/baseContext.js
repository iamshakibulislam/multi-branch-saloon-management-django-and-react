import React from 'react'


let BaseContext = React.createContext(
	{'baseUrl':'http://127.0.0.1:8000',
	'reactBase':'http://localhost:3000'})


export default BaseContext