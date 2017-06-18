import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Users from '@/components/users';
import ListsIndex from '@/components/lists/LIstsIndex';
import Listnew from '@/components/lists/Listnew1';
import Listnewevnt from '@/components/lists/Listnew2';
import EventNew from '@/components/evnts/EventNew';
import EventsIndex from '@/components/evnts/EventsIndex';
import PostOffices from '@/components/pos/po/PostofficeIndex';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Hello',
            component: Hello
        },
        {
            path: '/users',
            name: 'Users',
            component: Users
            // props: {atitle: 'atcrew'}
        },
        {
            path: '/lists',
            name: 'ListsIndex',
            component: ListsIndex
            // props: {atitle: 'atcrew'}
        },
        {
            path: '/list-new',
            name: 'ListNew',
            component: Listnew
            // props: {atitle: 'atcrew'}
        },
        {
            path: '/list-new-evnt',
            name: 'Listnewevnt',
            component: Listnewevnt
        },
        {
            path: '/event-new',
            name: 'EventNew',
            component: EventNew
        },
        {
            path: '/events',
            name: 'EventsIndex',
            component: EventsIndex
        },
        {
            path: '/post-offices',
            name: 'PostOffices',
            component: PostOffices
        }
    ]
});
