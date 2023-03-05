import { lazy, Suspense } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";

const Page404 = lazy(() => import("../pages/404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SingleComicLayout = lazy(() => import('../pages/singleComicLayout/SingleComicLayout'));
const SingleCharacterLayout = lazy(() => import('../pages/singleCharacterLayout/SingleCharacterLayout'));
const SinglePage = lazy(() => import('../pages/SinglePage'));

const App = () => {

        return (
           <Router>
                 <div className="app">
                    <AppHeader/>
                    <main>
                        <Suspense fallback={<span>Loading</span>}>
                            <Routes>
                                <Route path="/marvel/" element={<MainPage/>} />
                                <Route path="/marvel/comics" element={<ComicsPage/>} />
                                <Route path="*" element={<Page404/>} />
                                <Route 
                                    path="/marvel/comics/:id" 
                                    element={<SinglePage 
                                        Component={SingleComicLayout} 
                                        dataType ='comic' />} 
                                />
                                <Route 
                                    path="/marvel/characters/:id" 
                                    element={<SinglePage 
                                            Component={SingleCharacterLayout} 
                                            dataType ='character' />}
                                    />
                            </Routes>
                        </Suspense>
                    </main>
                </div>
           </Router>
        )
}

export default App;