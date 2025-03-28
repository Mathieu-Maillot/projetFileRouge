import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppContainer from './display/AppContainer'
import App from './App';
import Footer from './display/components/ui/display/Footer';
import Header from './display/components/ui/display/Header';
import SearchTraject from './display/pages/routes/SearchTraject';
import PublishTraject from './display/pages/routes/PublishTraject';

const Root = () => {
	return (
		<BrowserRouter>
			<Header />
			<AppContainer>
				<Routes>
					<Route exact path="/" element={<App />} />
					<Route exact path="/routes/search" element={<SearchTraject />} />
					<Route exact path="/routes/publish" element={<PublishTraject />} />
					<Route exact path="/" element={<App />} />
					<Route exact path="/" element={<App />} />
				</Routes>
			</AppContainer>
			<Footer></Footer>
		</BrowserRouter>
	)
}

export default Root;

