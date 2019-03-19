import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import CourseDashBoardPage from '../components/CourseDashBoardPage';
import AddCoursePage from '../components/AddCoursePage';
import CoursesListPage from '../components/CoursesListPage';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';
import Header from '../components/Header';
import MakePacks from '../components/MakePacks';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        {/* Don't forget that switch only get the first route that matches. when BrowserRouter stacks every */}
        <Route path="/" component={CourseDashBoardPage} exact={true} />
        <Route path="/create" component={AddCoursePage} />
        <Route exact path="/courses/" component={CoursesListPage} />
        <Route exact path="/courses/:id/" component={CoursesListPage} />
        <Route path="/courses/:id/:name_of_the_course" component={CoursesListPage} />
        <Route path="/help" component={HelpPage} />
        <Route path="/makepacks" component={MakePacks} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
