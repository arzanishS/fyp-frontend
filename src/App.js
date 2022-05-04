import './App.scss'
import 'antd/dist/antd.css'
import { IonApp, IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Ads from './pages/Ads'
import AdDetail from './pages/AdDetail'
import PostAd from './pages/PostAd'
import MyAds from './pages/MyAds'
import SignIn from './pages/Landing/SignIn'
import SignUp from './pages/Landing/SignUp'
import ProtectedRoute from './Routes/protectedRoutes'
import { Offline } from 'react-detect-offline'
import EditUser from './pages/EditUser'

const App = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Offline>
            <div style={{ backgroundColor: 'red', padding: 10 }}>
              <h3 style={{ textAlign: 'center', color: 'white' }}>No Internet Connnection !</h3>
            </div>
          </Offline>
          <Switch>

            <Route exact path='/login' component={SignIn} />
            <Route exact path='/register' component={SignUp} />

            <Route exact path='/'>
              <Dashboard>
                <Ads />
              </Dashboard>
            </Route>

            <Route exact path='/search/:query'>
              <Dashboard>
                <Ads />
              </Dashboard>
            </Route>

            <Route path='/ad-detail' exact>
              <ProtectedRoute>
                <Dashboard>
                  <AdDetail />
                </Dashboard>
              </ProtectedRoute>
            </Route>

            <Route path='/my-ads' exact>
              <ProtectedRoute>
                <Dashboard>
                  <MyAds />
                </Dashboard>
              </ProtectedRoute>
            </Route>

            <Route path='/add-ad' exact>
              <ProtectedRoute>
                <Dashboard>
                  <PostAd />
                </Dashboard>
              </ProtectedRoute>
            </Route>

            <Route path='/edit-profile' exact>
              <ProtectedRoute>
                <Dashboard>
                  <EditUser />
                </Dashboard>
              </ProtectedRoute>
            </Route>

            <Route exact path='/:cat'>
              <Dashboard>
                <Ads />
              </Dashboard>
            </Route>

          </Switch>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
}

export default App
