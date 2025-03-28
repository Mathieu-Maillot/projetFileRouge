import React from 'react'

const AppContainer = ({ children , classN}) => {
	return (
		<div id="appcontainer" className={classN}>
			{children}
		</div>
	)
}

export default AppContainer