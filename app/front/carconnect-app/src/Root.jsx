import React from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import AppContainer from './display/AppContainer'
import App from './App';
import Footer from './display/components/ui/display/Footer';
import Header from './display/components/ui/display/Header';
import SearchTraject from './display/pages/routes/SearchTraject';
import PublishTraject from './display/pages/routes/PublishTraject';
import Check from './display/pages/auth/Check';

const AppRoutes = () => {
	const location = useLocation();

	return (
		<>
			{!location.pathname.startsWith("/auth") && <Header />}
			{!location.pathname.startsWith("/auth") ? (
				<AppContainer>
					<Routes>
						<Route exact path="/" element={<App />} />
						<Route exact path="/routes/search" element={<SearchTraject />} />
						<Route exact path="/routes/publish" element={<PublishTraject />} />
						<Route exact path="/auth/check" element={<Check />} />
					</Routes>
				</AppContainer>
			) : (
				<Routes>
					<Route exact path="/" element={<App />} />
					<Route exact path="/routes/search" element={<SearchTraject />} />
					<Route exact path="/routes/publish" element={<PublishTraject />} />
					<Route exact path="/auth/check" element={<Check />} />
				</Routes>
			)}
			<Footer />
		</>
	);
};

const Root = () => {
	return (
		<BrowserRouter>
			<AppRoutes />
		</BrowserRouter>
	);
};

export default Root;