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
	const isAuthRoute = location.pathname.startsWith("/auth");

	return (
		<>
			{!isAuthRoute && <Header />}

			{isAuthRoute ? (
				<Routes>
					<Route path="/auth/check" element={<Check />} />
					<Route path="/auth/login" element={<Check />} />
					<Route path="/auth/register" element={<Check />} />
					<Route path="*" element={<App />} />
				</Routes>
			) : (
				<AppContainer>
					<Routes>
						<Route path="/" element={<App />} />
						<Route path="/routes/search" element={<SearchTraject />} />
						<Route path="/routes/publish" element={<PublishTraject />} />
					</Routes>
				</AppContainer>
			)}

			<Footer />
		</>
	);
};

const Root = () => (
	<BrowserRouter>
		<AppRoutes />
	</BrowserRouter>
);

export default Root;