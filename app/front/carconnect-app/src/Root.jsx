import React from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import AppContainer from './display/AppContainer'
import App from './App';
import Footer from './display/components/ui/display/Footer';
import Header from './display/components/ui/display/Header';
import SearchTraject from './display/pages/routes/SearchTraject';
import PublishTraject from './display/pages/routes/PublishTraject';
import Check from './display/pages/auth/Check';
import Profile from './display/pages/user/Profile';
import AuthGuard from './display/guards/AuthGuard';
import NotFound from './display/pages/NotFound';

const AppRoutes = () => {
	const location = useLocation();
	const isAuthRoute = location.pathname.startsWith("/auth");

	return (
		<>
			{!isAuthRoute && <Header />}

			{isAuthRoute ? (
				<Routes>
					<Route exact path="/auth/check" element={<Check />} />
					<Route exact path="/auth/login" element={<Check />} />
					<Route exact path="/auth/register" element={<Check />} />
					<Route exact path="/auth/driver" element={<Check />} />
				</Routes>
			) : (
				<AppContainer>
					<Routes>
						<Route path="/" element={<App />} />
						<Route path="*" element={<NotFound />} />
						<Route element={<AuthGuard />}>

							<Route exact path="/user/profile/informations" element={<Profile />} />
							<Route exact path="/user/profile/reviews" element={<Profile />} />
							<Route exact path="/user/profile/messages" element={<Profile />} />
						</Route>
						<Route exact path="/routes/search" element={<SearchTraject />} />
						<Route exact path="/routes/publish" element={<PublishTraject />} />
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