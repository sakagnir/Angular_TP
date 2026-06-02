import { inject } from "@angular/core";
import { InMemoryCache } from "@apollo/client";
import { APOLLO_OPTIONS } from "apollo-angular";
import { HttpLink } from "apollo-angular/http";

const uri = 'http://localhost:4000/';

export function provideApollo() {
    return {
        provide: APOLLO_OPTIONS,
        useFactory: () => {
            const httpLink = inject(HttpLink);
            return {
                link: httpLink.create({ uri }),
                cache: new InMemoryCache(),
            }
        }
    }
}