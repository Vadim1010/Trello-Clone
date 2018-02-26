import { NgModule } from '@angular/core';
import { NoContentModule } from './no-content';
import { TrelloListModule } from './trello-list';

@NgModule({
    imports: [
        NoContentModule,
        TrelloListModule,
    ],
    exports: [
        NoContentModule,
        TrelloListModule,
    ]
})
export class FeaturesModule {
}
