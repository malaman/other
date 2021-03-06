import Home from '../components/Home';
import MakersPage from '../pages/MakersPage';
import MakerPage from '../pages/MakerPage';
import SeriesPage from '../pages/SeriesPage';
import ModificationsPage from '../pages/ModificationsPage';
import {getMakersAction, getMakerAction, getSeriesAction,
  getModificationsAction} from '../actions/MakersActionCreators';

export default {
  catalog: {
    path: '/',
    method: 'get',
    page: 'catalog',
    title: 'Car Catalog',
    handler: MakersPage,
    action: getMakersAction
  },
  about: {
    path: '/about',
    method: 'get',
    page: 'about',
    title: 'About',
    handler: require('../components/About')
  },
  models: {
    path: '/catalog/:makerId',
    method: 'get',
    page: 'models',
    title: 'Models',
    handler: MakerPage,
    action:getMakerAction
  },
  series: {
    path: '/catalog/:makerId/:modelId',
    method: 'get',
    page: 'series',
    title: 'Series',
    handler: SeriesPage,
    action:getSeriesAction
  },
  modifications: {
    path: '/catalog/:makerId/:modelId/:seriaId',
    method: 'get',
    page: 'modifications',
    title: 'Modifications',
    handler: ModificationsPage,
    action:getModificationsAction


  }


};
