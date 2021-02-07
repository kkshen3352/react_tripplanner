import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import ItinRoute from '../Itinerary/ItinRoute'
import Member from '../../pages/Member'
import ProductsRoute from '../../pages/ProductList/ProductsRoute'
import LineChart from '../../pages/LineChart '
import TravelBuddiesRoute from '../TravelBuddies/TravelBuddiesRoute'

function MainRoute({ setAuth }) {
  function PrivateRoute({ component: Component, authed, setAuth, ...rest }) {
    return (
      <Route
        {...rest}
        setAuth={setAuth}
        render={(props) =>
          authed === true ? (
            <Component setAuth={setAuth} {...props} />
          ) : (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          )
        }
      />
    )
  }

  return (
    <>
      <Switch>
        <PrivateRoute
          authed={localStorage.getItem('userData') && true}
          path="/myAccount"
          component={Member}
          setAuth={setAuth}
        />
        <Route path="/itinerary">
          <ItinRoute />
        </Route>
        <Route path="/productList">
          <ProductsRoute />
        </Route>
        <Route path="/LineChart">
          <LineChart />
        </Route>
        <Route path="/travelBuddies">
          <TravelBuddiesRoute />
        </Route>
      </Switch>
    </>
  )
}

export default MainRoute
