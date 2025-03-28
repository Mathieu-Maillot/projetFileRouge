import React from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import AppContainer from './display/AppContainer'
import App from './App';
import Footer from './display/components/ui/display/Footer';
import Header from './display/components/ui/display/Header';
import SearchTraject from './display/pages/routes/SearchTraject';
import PublishTraject from './display/pages/routes/PublishTraject';
import Check from './display/pages/auth/Check';

const Root = () => {
	const location = useLocation();

	return (
		<BrowserRouter>
					{!location.pathname.startsWith("/auth") && <Header />}

			<AppContainer>
				<Routes>
					<Route exact path="/" element={<App />} />
					<Route exact path="/routes/search" element={<SearchTraject />} />
					<Route exact path="/routes/publish" element={<PublishTraject />} />
					<Route exact path="/routes/check" element={<Check />} />
				</Routes>
			</AppContainer>
			<Footer></Footer>
		</BrowserRouter>
	)
}

export default Root;

