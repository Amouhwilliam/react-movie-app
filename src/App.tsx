import React, {Suspense} from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import MoviesProvider from "./context/movieContext";

const Home = React.lazy(() => import('./components/home'));
const Category = React.lazy(() => import('./components/category'));
const Movie = React.lazy(() => import('./components/movie'));


function App() {
    return (
        <Router>
            <MoviesProvider>
                <Suspense fallback={<div className="text-center">Loading...</div>}>
                    <Routes>
                        <Route path={'/'} element={<Home/>}/>
                        <Route path={'/category/:id'} element={<Category/>}/>
                        <Route path={'/movie/:id'} element={<Movie/>}/>
                        <Route path={'*'} element={<Navigate to="/"/>}/>
                    </Routes>
                </Suspense>
            </MoviesProvider>
        </Router>
);
}

export default App;
