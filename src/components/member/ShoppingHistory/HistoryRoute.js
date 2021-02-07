import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ShoppingHistory from './ShoppingHistory'
import Detail from './Detail'

function HistiryRoute() {
  return (
    <Switch>
      <Route path="/myAccount/historyOrder/:orderId">
        <Detail />
      </Route>
      <Route exact path="/myAccount/historyOrder">
        <ShoppingHistory />
      </Route>
    </Switch>
  )
}

export default HistiryRoute
