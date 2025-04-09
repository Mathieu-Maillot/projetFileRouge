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
import DetailsTraject from './display/pages/routes/auth/TrajectDetails/DetailsTraject';
import ProfileDetails from './display/pages/public/ProfileDetails';
import AuthPublish from './display/pages/routes/auth/AuthPublish';
import { useAuthStore } from './cfg/store/AuthStore';
import Popup from './display/components/utils/Popup';
const AppRoutes = () => {
	const location = useLocation();
	const isAuthRoute = location.pathname.startsWith("/auth");
	const { popup } = useAuthStore();

	return (
		<>
			{!isAuthRoute && <Header />}
			{popup.isOpen && (
				<Popup
					isOpen={popup.isOpen}
					message={popup.message}
					type={popup.type}
				/>
			)}
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
						<Route path="/user/profile/:id" element={<ProfileDetails />} />
						<Route path="*" element={<NotFound />} />
						<Route element={<AuthGuard />}>
							{/* Account */}
							<Route exact path="/account/settings" element={<Profile />} />
							<Route exact path="/account/profile" element={<Profile />} />
							<Route exact path="/account/reviews" element={<Profile />} />
							<Route exact path="/account/messages" element={<Profile />} />
							<Route exact path="/account/bookings" element={<Profile />} />
							<Route exact path="/account/rides" element={<Profile />} />

							{/* Rides */}
							<Route exact path="/routes/publish/traject/" element={<AuthPublish />} />
							<Route exact path="/rides/:id" element={<DetailsTraject />} />

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