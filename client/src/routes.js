import React from "react";
import {
    Switch,
    Route,
    Redirect,
    useLocation
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NoMatch from "./pages/NoMatch";
import PracticePage from "./pages/PracticePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import DashboardPage from "./pages/DashboardPage";
import RegistrationPage from "./pages/RegistrationPage";
import StatisticsPage from "./pages/StatisticsPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import TipsPage from "./pages/TipsPage";


export default function useRoutes(isAuthenticated) {
    const location = useLocation();

    return(
        <Switch>
            <Route path="/" exact render={
                () => (
                    isAuthenticated ? (
                        <Redirect to="/dashboard" />
                    ) : (
                        <HomePage />
                    )
                )
            } />
            <Route path="/account/login" exact render={
                () => (
                    isAuthenticated ? (
                        <Redirect to="/dashboard" />
                    ) : (
                        <LoginPage />
                    )
                )
            } />
            <Route path="/practice" exact>
                <PracticePage />
            </Route>
            <Route path="/privacy-policy" exact>
                <PrivacyPolicyPage />
            </Route>
            <Route path="/dashboard" exact render={
                () => (
                    !isAuthenticated ? (
                        <Redirect to={
                            {
                                pathname: "/account/login",
                                state: { referer: location.pathname }
                            }
                        }/>
                    ) : (
                        <DashboardPage />
                    )
                )
            } />
            <Route path="/account/registration" exact render={
                () => (
                    isAuthenticated ? (
                        <Redirect to="/dashboard" />
                    ) : (
                        <RegistrationPage />
                    )
                )
            } />
            <Route path="/statistics" exact render={
                () => (
                    !isAuthenticated ? (
                        <Redirect to={
                            {
                                pathname: "/account/login",
                                state: { referer: location.pathname }
                            }
                        }/>
                    ) : (
                        <StatisticsPage />
                    )
                )
            } />
            <Route path="/terms-of-service" exact>
                <TermsOfServicePage />
            </Route>
            <Route path="/tips" exact>
                <TipsPage />
            </Route>
            <Route path="*">
                <NoMatch />
            </Route>
        </Switch>
    );
}