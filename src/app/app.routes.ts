import { Routes } from '@angular/router';
import { NoContentRoutes, TrelloListRouters } from './features';

export const ROUTES: Routes = [
    ...TrelloListRouters,
    ...NoContentRoutes
];
